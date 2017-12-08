import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { DataService } from './DataService';
import { Ng2Storage } from '../services/storage';
import { ILogin, ILoginResponse } from '../app.interface';
import { Observable } from 'rxjs/Rx';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';

@Injectable()
export class LiveDataService extends DataService {
    
    public profilePercentage : EventEmitter<number> = new EventEmitter();
    private readonly basePath = 'http://172.16.28.27:8080/';
    private readonly basePath1 = 'http://172.16.28.27:8080/';
    private readonly MyTrUrl = 'rmg/mytr/';
    private readonly userLoginUrl = this.getBaseURI() + 'authenticate';
    private readonly employeeDetails = this.getBaseURI() + 'employeedetails';
    private readonly skillDetails = this.getBaseURI() + 'skillDtls';
    private readonly masterSkillData = this.getBaseURI() + 'skillLookUp';
    private readonly projectDetails = this.getBaseURI() + 'projectDtls';
    private readonly uploadImage = this.getBaseURI1() + 'insertImage';

    private readonly REQUEST_HEADERS: Headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
    });
    private readonly REQUEST_HEADERS1: Headers = new Headers({
        'Content-Type': false,
        'processData': false
    });

    private readonly REQUEST_OPTIONS: RequestOptionsArgs = new RequestOptions({ headers: this.REQUEST_HEADERS });
    private readonly REQUEST_OPTIONS1: RequestOptionsArgs = new RequestOptions({ headers: this.REQUEST_HEADERS1 });

    private getBaseURI() {
        return this.basePath + this.MyTrUrl;
    }
    private getBaseURI1() {
        return this.basePath1 + this.MyTrUrl;
    }

    constructor(private http: Http, private storage: Ng2Storage) {
        super();
    }

    public loginUser(obj: ILogin): Observable<ILoginResponse> {
        return this.http.post(`${this.userLoginUrl}`, obj, this.REQUEST_OPTIONS).map((response: Response) => {
            let resp = response.json();
            if (resp.employeeId) {
                this.storage.setSession('user_data', resp);
            }
            return response.json();
        })
    }

    public getEmployeeDetails(empId: string): Observable<any> {
        return this.http.get(`${this.employeeDetails}?empId=${empId}`, this.REQUEST_OPTIONS).map((response: Response) => {
            return response.json();
        })
    }

    public getProjectDetails(empId: string): Observable<any> {
        return this.http.get(`${this.projectDetails}?empId=${empId}`, this.REQUEST_OPTIONS).map((response: Response) => {
            return response.json();
        })
    }

    public getAllSkillData(empId: string): Observable<any> {
        return Observable.forkJoin([
            this.http.get(`${this.skillDetails}?empId=${empId}`, this.REQUEST_OPTIONS).map((res: Response) => res.json()),
            this.http.get(`${this.masterSkillData}`, this.REQUEST_OPTIONS)
                .map((res: Response) => {
                    const items = <any[]>res.json();
                    let data = {
                        categoryList: [],
                        skillCategoriesList: []
                    }
                    for (var key in items) {
                        let i = Object.keys(items).indexOf(key);
                        data.skillCategoriesList.push({
                            label: key,
                            value: key
                        })
                        data.categoryList.push({
                            category: key,
                            skillSet: new Array()
                        })
                        for(var j=0; j<items[key].length; j++){
                            data.categoryList[i]['skillSet'].push({
                                label: items[key][j],
                                value: items[key][j]
                            })
                        }
                    }
                   return data;
                })
        ]);
    }

    public uploadProfileImage(obj): Observable<any> {
        return this.http.post(`${this.uploadImage}`, obj, this.REQUEST_OPTIONS1).map((response: Response) => {
            return response.json();
        })
    }
}


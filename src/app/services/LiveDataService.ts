import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptionsArgs,RequestOptions } from '@angular/http';
import { DataService } from './DataService';
import { Ng2Storage } from '../services/storage';
import { ILogin, ILoginResponse} from '../app.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LiveDataService extends DataService {

    private readonly basePath = 'http://172.16.28.27:8080/';
    private readonly MyTrUrl = 'rmg/mytr/';
    private readonly userLoginUrl =  this.getBaseURI()+'authenticate';
    private readonly employeeDetails =  this.getBaseURI()+'employeedetails';

    private readonly REQUEST_HEADERS: Headers = new Headers({ 
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json'
     });
    private readonly REQUEST_OPTIONS: RequestOptionsArgs = new RequestOptions({ headers: this.REQUEST_HEADERS });

    private getBaseURI(){
       return this.basePath +  this.MyTrUrl;
    }

    constructor(private http: Http, private storage:Ng2Storage) {
        super();
    }
    
    public loginUser(obj: ILogin): Observable<ILoginResponse>{
        return this.http.post(`${this.userLoginUrl}`, obj, this.REQUEST_OPTIONS).map((response: Response) => {
            let resp = response.json();
            if( resp.employeeId ){
                this.storage.setSession('user_data', resp);
            }
            return response.json();
        })
    }

    public getEmployeeDetails(empId:string): Observable<any>{
        return this.http.get(`${this.employeeDetails}?empId=${empId}`, this.REQUEST_OPTIONS).map((response: Response) => {
            return response.json();
        })
    }
}


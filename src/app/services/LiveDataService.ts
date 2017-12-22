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

    public profilePercentage: EventEmitter<number> = new EventEmitter();
    private readonly basePath = 'http://172.16.28.27:8080/';
    private readonly MyTrUrl = 'rmg/mytr/';
    private readonly userLoginUrl = this.getBaseURI() + 'authenticate';
    private readonly employeeDetails = this.getBaseURI() + 'employeedetails';
    private readonly skillDetails = this.getBaseURI() + 'skillDtls';
    private readonly masterSkillData = this.getBaseURI() + 'skillLookUp';
    private readonly domainData = this.getBaseURI() + 'domains';
    private readonly subDomainData = this.getBaseURI() + 'subDomains';
    private readonly childDomainData = this.getBaseURI() + 'childDomains';
    private readonly projectDetails = this.getBaseURI() + 'projectDtls';
    private readonly getAllThemes = this.getBaseURI() + 'themesLookUp';
    private readonly saveTheme = this.getBaseURI() + 'updateTheme';
    private readonly insertContactAndExp = this.getBaseURI() + 'empContactAndExp';
    private readonly uploadImage = this.getBaseURI() + 'uploadImage';
    private readonly uploadResume = this.getBaseURI() + 'uploadResume';
    private readonly saveSkillUrl = this.getBaseURI() + 'addEmployeeSkill';
    private readonly saveDomainUrl = this.getBaseURI() + 'addEmployeeDomain';
    private readonly visaDetails = this.getBaseURI() + 'visaDetails';
    private readonly deleteDomainUrl = this.getBaseURI() + 'deleteEmployeeDomain';
    private readonly certificationTechUrl = this.getBaseURI() + 'certTechnologies';
    private readonly certificationNamesUrl = this.getBaseURI() + 'certificationNames';
    private readonly certificationInstitutesUrl = this.getBaseURI() + 'certificateInstitutes';
    private readonly saveCertificationUrl = this.getBaseURI() + 'saveOrUpdateEmplCert';
    private readonly deleteCertificationUrl = this.getBaseURI() + 'deleteEmplCertification';
    private readonly REQUEST_HEADERS: Headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
    });

    private readonly REQUEST_OPTIONS: RequestOptionsArgs = new RequestOptions({ headers: this.REQUEST_HEADERS });


    private getBaseURI() {
        return this.basePath + this.MyTrUrl;
    }

    constructor(private http: Http, private storage: Ng2Storage) {
        super();
    }

    public getMatchedDomain(name, data) {
        let found = data.find(obj => obj.label === name);
        if (found) {
            return found.value;
        }
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

    public getSubDomainDetails(domainId: string): Observable<any> {
        return this.http.get(`${this.subDomainData}?domainId=${domainId}`, this.REQUEST_OPTIONS).map((res: Response) => {
            const items = <any[]>res.json();
            let subDomainData = [];
            items.forEach((subDomain) => {
                subDomainData.push({
                    label: subDomain.subDomaineName,
                    value: {
                        domainId: subDomain.domainId,
                        subDomainId: subDomain.id,
                        subDomaineName: subDomain.subDomaineName
                    }
                })
            })
            return subDomainData;
        })
    }

    public getChildDomainDetails(domainId: string, subDomainId: string): Observable<any> {
        return this.http.get(`${this.childDomainData}?domainId=${domainId}&subDomainId=${subDomainId}`, this.REQUEST_OPTIONS).map((res: Response) => {
            const items = <any[]>res.json();
            let childDomainData = [];
            items.forEach((childDomain) => {
                childDomainData.push({
                    label: childDomain.chilDomainName,
                    value: {
                        domainId: childDomain.domainId,
                        subDomainId: childDomain.subDomainId,
                        childDomainId: childDomain.id,
                        childDomaineName: childDomain.chilDomainName
                    }
                })
            })
            return childDomainData;
        })
    }

    public getCertificationNamesInstitutes(cTechId: string): Observable<any> {
        return Observable.forkJoin([
            this.http.get(`${this.certificationNamesUrl}?cert_tech_id=${cTechId}`, this.REQUEST_OPTIONS).map((res: Response) => {
                const items = <any[]>res.json().details;
                let data = [];
                items.forEach((cert) => {
                    data.push({
                        label: cert.cert_name,
                        value: {
                            certTechId: cert.cert_tech_id,
                            certNameId: cert.cert_id,
                            name: cert.cert_name
                        }
                    })
                });
                return data;
            }),
            this.http.get(`${this.certificationInstitutesUrl}?cert_tech_id=${cTechId}`, this.REQUEST_OPTIONS).map((res: Response) => {
                const items = <any[]>res.json().details;
                let data = [];
                items.forEach((cert) => {
                    data.push({
                        label: cert.certification_institute_name,
                        value: {
                            certTechId: cert.cert_tech_id,
                            certInstId: cert.id,
                            name: cert.certification_institute_name
                        }
                    })

                });
                return data;
            })
        ]);

    }

    public getProfessionalDetails(empId: string): Observable<any> {
        return this.http.get(`${this.skillDetails}?empId=${empId}`, this.REQUEST_OPTIONS).map((response: Response) => {
            return response.json();
        })
    }

    public getMasterDomainDetails(): Observable<any> {
        return this.http.get(`${this.domainData}`, this.REQUEST_OPTIONS).map((res: Response) => {
            const items = <any[]>res.json();
            let domainData = [];
            items.forEach((domain) => {
                domainData.push({
                    label: domain.domainName,
                    value: {
                        domainId: domain.id,
                        domainName: domain.domainName
                    }
                })
            })
            return domainData;
        })
    }
    public getMasterSkillDetails(): Observable<any> {
        return this.http.get(`${this.masterSkillData}`, this.REQUEST_OPTIONS)
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
                    for (var j = 0; j < items[key].length; j++) {
                        data.categoryList[i]['skillSet'].push({
                            label: items[key][j],
                            value: items[key][j]
                        })
                    }
                }
                return data;
            })
    }
    public getCertificationTechnologies(): Observable<any> {
        return this.http.get(`${this.certificationTechUrl}`, this.REQUEST_OPTIONS).map((res: Response) => {
                const items = <any[]>res.json().details;
                let data = [];
                items.forEach((cert) => {
                    data.push({
                        label: cert.vert_technology_name,
                        value: {
                            certTechId: cert.cert_tech_id,
                            name: cert.vert_technology_name
                        }
                    })

                });
                return data;
            });
    }

    public getThemes(): Observable<any> {
        return this.http.get(`${this.getAllThemes}`, this.REQUEST_OPTIONS).map((res: Response) => {
            const items = <any[]>res.json();
            let themeData = {
                label: 'Themes',
                icon: 'palette',
                badge: '3',
                items: []
            };

            items['details'].forEach((theme) => {
                themeData.items.push({
                    label: theme.themeName,
                    id: theme.themeId,
                    icon: 'brush'
                })
            })
            return themeData;
        })
    }

    public updateTheme(obj): Observable<any> {
        return this.http.post(`${this.saveTheme}`, obj, this.REQUEST_OPTIONS).map((response: Response) => {
            return response.json();
        })
    }

    public saveContactAndExpDetails(paramObj): Observable<any> {
        return this.http.post(`${this.insertContactAndExp}`, paramObj, this.REQUEST_OPTIONS).map((response: Response) => {
            return response.json();
        })
    }

    public uploadProfileImage(obj): Observable<any> {
        return this.http.post(`${this.uploadImage}`, obj).map((response: Response) => {
            return response.json();
        })
    }
    public uploadProfileResume(obj): Observable<any> {
        return this.http.post(`${this.uploadResume}`, obj).map((response: Response) => {
            return response.json();
        })
    }

    public addUpdateSkill(obj, progressbarValue): Observable<any> {
        return this.http.post(`${this.saveSkillUrl}?progressbar=${progressbarValue}`, obj).map((response: Response) => {
            return response.json();
        })
    }

    public addUpdateDomain(obj, progressbarValue): Observable<any> {
        return this.http.post(`${this.saveDomainUrl}?progressbar=${progressbarValue}`, obj).map((response: Response) => {
            return response.json();
        })
    }

    public addUpdateCertification(obj): Observable<any> {
        return this.http.post(`${this.saveCertificationUrl}`, obj).map((response: Response) => {
            return response.json();
        })
    }

    public getVisaDetails(id): Observable<any> {
        return this.http.get(`${this.visaDetails}?empId=${id}`, this.REQUEST_OPTIONS).map((response: Response) => {
            return response.json();
        })
    }

    public deleteDomain(obj, progressbarValue): Observable<any> {
        return this.http.post(`${this.deleteDomainUrl}?progressbar=${progressbarValue}`, obj).map((response: Response) => {
            return response.json();
        })
    }

    public deleteCertification(obj): Observable<any> {
        return this.http.post(`${this.deleteCertificationUrl}`, obj).map((response: Response) => {
            return response.json();
        })
    }

}


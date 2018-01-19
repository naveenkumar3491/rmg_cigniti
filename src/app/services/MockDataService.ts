import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './DataService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as mockData from './mockData/app.mockData';
import { Ng2Storage } from "./storage";
import { ILogin, ILoginResponse } from "../app.interface";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MockDataService extends DataService {

    public profilePercentage: EventEmitter<number> = new EventEmitter();
    private readonly basePath = 'http://172.16.28.27:8080/';
    private readonly MyTrUrl = 'rmg/mytr/';
    private readonly countriesUrl = '../../assets/data/countries.json';

    private getBaseURI() {
        return this.basePath + this.MyTrUrl;
    }

    constructor(private http: HttpClient, private storage: Ng2Storage) {
        super();
    }

     public getCountriesList() {
        return this.http.get(`${this.countriesUrl}`).map((response) => {
            return response;
        });
    }

    public loginUser(obj: ILogin): Observable<ILoginResponse> {
        var data = mockData.allUsers;
        return Observable.create(observer => {
            setTimeout(() => {
                let filterData = data.find((objs) => {
                    return objs.employeeId.toLowerCase() === obj.userId.toLowerCase();
                });
                this.storage.setSession('user_data', {
                    employeeId: filterData.userId,
                    employeeName: filterData.userName,
                    employeeRoleId: filterData.employeeRoleId,
                    employeeRoleName: filterData.employeeRoleName,
                    deliveryUnit: filterData.deliveryUnit,
                    themeCol: filterData.themeCol
                });
                observer.next(filterData);
                observer.complete();
            }, 1000)
        });
    }

    public getEmployeeDetails(empId: string): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next([mockData.empDetails, mockData.designationData, mockData.locationData, mockData.duData, mockData.buData]);
                observer.complete();
            }, 1000)
        });

        
    }

    
    public getProjectDetails(empId: string): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.projectDetails);
                observer.complete();
            }, 1000)
        });
    }

    
    public getSubDomainDetails(domainId: string): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.subDomainDetails);
                observer.complete();
            }, 1000)
        });
    }

    public getChildDomainDetails(domainId: string, subDomainId: string): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.childDomainDetails);
                observer.complete();
            }, 1000)
        });
    }

    public getCertificationNamesInstitutes(cTechId: string): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next([mockData.certificationNames, mockData.certificationInstitutes]);
                observer.complete();
            }, 1000)
        });
    }

    public getProfessionalDetails(empId: string): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.professionalDetails);
                observer.complete();
            }, 1000)
        });
    }

    public getMasterDomainDetails(): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.masterDomainDetails);
                observer.complete();
            }, 1000)
        });
    }

    public getMasterSkillDetails(): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                const items = mockData.masterSkillData;
                const data = {
                    categoryList: [],
                    skillCategoriesList: []
                };
                for (const key in items) {
                    const i = Object.keys(items).indexOf(key);
                    data.skillCategoriesList.push({
                        label: key,
                        value: key
                    });
                    data.categoryList.push({
                        category: key,
                        skillSet: new Array()
                    });
                    for (let j = 0; j < items[key].length; j++) {
                        data.categoryList[i]['skillSet'].push({
                            label: items[key][j],
                            value: items[key][j]
                        });
                    }
                }
                observer.next(data);
                observer.complete();
            }, 1000)
        });
    }

    public getCertificationTechnologies(): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.certificationTechnoligies);
                observer.complete();
            }, 1000)
        });
    }

    public getSkillCategories(): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.skillCategories);
                observer.complete();
            }, 1000)
        });
    }

    public getSkillsByCategory(): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.skillsByCategories);
                observer.complete();
            }, 1000)
        });
    }

    public getThemes(): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                const items = mockData.themeData;
                const themeData = {
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
                    });
                });
                observer.next(themeData);
                observer.complete();
            }, 1000)
        });
    }

    public updateTheme(obj): Observable<any> {
       return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public saveContactAndExpDetails(paramObj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public uploadProfileImage(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }
    public uploadProfileResume(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public addUpdateSkill(obj, progressbarValue): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public addUpdateDomain(obj, progressbarValue): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public addUpdateCertification(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public addUpdateBuDtls(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public getVisaDetails(id): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(mockData.visaDetails);
                observer.complete();
            }, 1000)
        });
    }

    public deleteDomain(obj, progressbarValue): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public deleteSkill(obj, progressbarValue): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public deleteCertification(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public addUpdateProject(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public deleteProject(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public deleteVisa(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public addUpdateEmployee(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }

    public addUpdateVisa(obj): Observable<any> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 1000)
        });
    }
}


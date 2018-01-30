import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from './DataService';
import { Ng2Storage } from '../services/storage';
import { ILogin, ILoginResponse } from '../app.interface';
import { Observable } from 'rxjs/Rx';
import { forkJoin } from 'rxjs/observable/forkJoin';
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
    private readonly saveProjectUrl = this.getBaseURI() + 'saveUpdateEmpProject';
    private readonly deleteProjectUrl = this.getBaseURI() + 'deleteEmpProject';
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
    private readonly countriesUrl = '../../assets/data/countries.json';
    private readonly designationMasterUrl = this.getBaseURI() + 'designationMaster';
    private readonly locationMasterUrl = this.getBaseURI() + 'locationMaster';
    private readonly duMasterUrl = this.getBaseURI() + 'duDtls';
    private readonly buMasterUrl = this.getBaseURI() + 'buDtls';
    private readonly updateEmployeeUrl = this.getBaseURI() + 'updateEmployee';
    private readonly updateBuDtlsUrl = this.getBaseURI() + 'updateBuDtls';
    private readonly skillCategoriesUrl = this.getBaseURI() + 'skillCategories';
    private readonly skillByCategoriesUrl = this.getBaseURI() + 'skillsBycategory';
    private readonly deleteSkillUrl = this.getBaseURI() + 'deleteEmployeeSkill';
    private readonly deleteVisaUrl = this.getBaseURI() + 'deleteEmpVisa';
    private readonly saveVisaUrl = this.getBaseURI() + 'addUpdateVisa';
    private readonly savePassportUrl = this.getBaseURI() + 'updatePassport';
    private readonly domainDataUrl = this.getBaseURI() + 'getDomainDtlsById';

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
        return this.http.post(`${this.userLoginUrl}`, obj).map((response) => {
            const resp = response;
            if (resp['employeeId']) {
                this.storage.setSession('user_data', resp);
            }
            return response;
        });
    }

    public getEmployeeDetails(empId: string): Observable<any> {
        // return this.http.get(`${this.employeeDetails}?empId=${empId}`).map((response) => {
        //     return response;
        // });
        return Observable.forkJoin([
            this.http.get(`${this.employeeDetails}?empId=${empId}`).map((res) => {
                return res;
            }),
            this.http.get(`${this.designationMasterUrl}`).map((res) => {
                const items = res;
                const designationData = [];
                items['details'].forEach((designation) => {
                    designationData.push({
                        label: designation.desg_name,
                        value: designation.desg_id
                    });
                });
                return designationData;
            }),
            this.http.get(`${this.locationMasterUrl}`).map((res) => {
                const items = res;
                const locationData = [];
                items['details'].forEach((location) => {
                    locationData.push({
                        label: location.location_name,
                        value: location.loc_id
                    });
                });
                return locationData;
            }),
            this.http.get(`${this.duMasterUrl}`).map((res) => {
                const items = res;
                const duData = [];
                items['details'].forEach((du) => {
                    duData.push({
                        label: du.du_name,
                        value: du.du_id
                    });
                });
                return duData;
            }),
            this.http.get(`${this.buMasterUrl}`).map((res) => {
                const items = res;
                const buData = [];
                items['details'].forEach((bu) => {
                    buData.push({
                        label: bu.bu_name,
                        value: bu.bu_id
                    });
                });
                return buData;
            })
        ]);
    }

    public getSkillCategories(): Observable<any> {
        return this.http.get(`${this.skillCategoriesUrl}`).map((response) => {
            const items = response;
            const categoriesData = [];
            items['details'].forEach((cat) => {
                categoriesData.push({
                    label: cat.name,
                    value: cat.skill_category_id
                });
            });
            return categoriesData;
        });
    }

    public getSkillsByCategory(id): Observable<any> {
        return this.http.get(`${this.skillByCategoriesUrl}?skill_catg_id=${id}`).map((response) => {
            const items = response;
            const skillsData = [];
            items['details'].forEach((skill) => {
                skillsData.push({
                    label: skill.skill_name,
                    value: skill.skill_id
                });
            });
            return skillsData;
        });
    }

    public addUpdateEmployee(obj): Observable<any> {
        return this.http.post(`${this.updateEmployeeUrl}`, obj).map((response) => {
            return response;
        });
    }

    public addUpdateBuDtls(obj): Observable<any> {
        return this.http.post(`${this.updateBuDtlsUrl}`, obj).map((response) => {
            return response;
        });
    }

    public getProjectDetails(empId: string): Observable<any> {
        return this.http.get(`${this.projectDetails}?empId=${empId}`).map((response) => {
            return response;
        });
    }

    public addUpdateProject(obj): Observable<any> {
        return this.http.post(`${this.saveProjectUrl}`, obj).map((response) => {
            return response;
        });
    }

    public addUpdateVisa(obj): Observable<any> {
        return this.http.post(`${this.saveVisaUrl}`, obj).map((response) => {
            return response;
        });
    }

    public addUpdatePassport(obj): Observable<any> {
        return this.http.post(`${this.savePassportUrl}`, obj).map((response) => {
            return response;
        });
    }

    public deleteProject(obj): Observable<any> {
        return this.http.post(`${this.deleteProjectUrl}`, obj).map((response) => {
            return response;
        });
    }

    public deleteVisa(obj): Observable<any> {
        return this.http.post(`${this.deleteVisaUrl}`, obj).map((response) => {
            return response;
        });
    }

    public deletePassport(obj): Observable<any> {
        return this.http.post(`${this.deleteVisaUrl}`, obj).map((response) => {
            return response;
        });
    }

    public deleteSkill(obj, progressbarValue, lastUpdated): Observable<any> {
        return this.http.post(`${this.deleteSkillUrl}?progressbar=${progressbarValue}&lastUpdate=${lastUpdated}`, obj).map((response) => {
            return response;
        });
    }

    public getSubDomainDetails(domainId: string): Observable<any> {
        return this.http.get(`${this.subDomainData}?domainId=${domainId}`).map((res: any[]) => {
            const items = res;
            const subDomainData = [];
            items.forEach((subDomain) => {
                subDomainData.push({
                    label: subDomain.subDomaineName,
                    value: {
                        domainId: subDomain.domainId,
                        subDomainId: subDomain.id,
                        subDomaineName: subDomain.subDomaineName
                    }
                });
            });
            return subDomainData;
        });
    }

    public getChildDomainDetails(domainId: string, subDomainId: string): Observable<any> {
        return this.http.get(`${this.childDomainData}?domainId=${domainId}&subDomainId=${subDomainId}`).map((res) => {
            const items = <any[]>res;
            const childDomainData = [];
            items.forEach((childDomain) => {
                childDomainData.push({
                    label: childDomain.chilDomainName,
                    value: {
                        domainId: childDomain.domainId,
                        subDomainId: childDomain.subDomainId,
                        childDomainId: childDomain.id,
                        childDomaineName: childDomain.chilDomainName
                    }
                });
            });
            return childDomainData;
        });
    }

    public getCertificationNamesInstitutes(cTechId: string): Observable<any> {
        return Observable.forkJoin([
            this.http.get(`${this.certificationNamesUrl}?cert_tech_id=${cTechId}`).map((res) => {
                const items = <any[]>res['details'];
                const data = [];
                items.forEach((cert) => {
                    data.push({
                        label: cert.cert_name,
                        value: {
                            certTechId: cert.cert_tech_id,
                            certNameId: cert.cert_id,
                            name: cert.cert_name
                        }
                    });
                });
                return data;
            }),
            this.http.get(`${this.certificationInstitutesUrl}?cert_tech_id=${cTechId}`).map((res) => {
                const items = <any[]>res['details'];
                const data = [];
                items.forEach((cert) => {
                    data.push({
                        label: cert.certification_institute_name,
                        value: {
                            certTechId: cert.cert_tech_id,
                            certInstId: cert.id,
                            name: cert.certification_institute_name
                        }
                    });
                });
                return data;
            })
        ]);
    }

    public getProfessionalDetails(empId: string): Observable<any> {
        return this.http.get(`${this.skillDetails}?empId=${empId}`).map((response) => {
            return response;
        });
    }

    public getDomainDetails(empId: string): Observable<any> {
        return this.http.get(`${this.domainDataUrl}?empId=${empId}`).map((res) => {
            const items = <any[]>res['details'];
            const domainResultSet = [];
            const check =[];
            for(let i=0; i<items.length; i++){
                let currItem = items[i];
                if(check.indexOf(currItem.rowid) === -1){
                    domainResultSet.push(currItem);
                    check.push(currItem.rowid);
                }else{
                    let found = domainResultSet.find(obj => obj.rowid === currItem.rowid);
                    found.child_domain_name = `${found.child_domain_name},${currItem.child_domain_name}`;
                }
            }
            return domainResultSet;
        });
    }

    public getMasterDomainDetails(): Observable<any> {
        return this.http.get(`${this.domainData}`).map((res) => {
            const items = <any[]>res;
            const domainData = [];
            items.forEach((domain) => {
                domainData.push({
                    label: domain.domainName,
                    value: {
                        domainId: domain.id,
                        domainName: domain.domainName
                    }
                });
            });
            return domainData;
        });
    }
    public getCertificationTechnologies(): Observable<any> {
        return this.http.get(`${this.certificationTechUrl}`).map((res) => {
            const items = <any[]>res['details'];
            const data = [];
            items.forEach((cert) => {
                data.push({
                    label: cert.vert_technology_name,
                    value: {
                        certTechId: cert.cert_tech_id,
                        name: cert.vert_technology_name
                    }
                });
            });
            return data;
        });
    }

    public getThemes(): Observable<any> {
        return this.http.get(`${this.getAllThemes}`).map((res) => {
            const items = <any[]>res;
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
            return themeData;
        });
    }

    public updateTheme(obj): Observable<any> {
        return this.http.post(`${this.saveTheme}`, obj).map((response) => {
            return response;
        });
    }

    public saveContactAndExpDetails(paramObj): Observable<any> {
        return this.http.post(`${this.insertContactAndExp}`, paramObj).map((response) => {
            return response;
        });
    }

    public uploadProfileImage(obj): Observable<any> {
        return this.http.post(`${this.uploadImage}`, obj).map((response) => {
            return response;
        });
    }
    public uploadProfileResume(obj): Observable<any> {
        return this.http.post(`${this.uploadResume}`, obj).map((response) => {
            return response;
        });
    }

    public addUpdateSkill(obj, progressbarValue, lastUpdated): Observable<any> {
        return this.http.post(`${this.saveSkillUrl}?progressbar=${progressbarValue}&lastUpdate=${lastUpdated}`, obj).map((response) => {
            return response;
        });
    }

    public addUpdateDomain(obj, progressbarValue, lastUpdated): Observable<any> {
        return this.http.post(`${this.saveDomainUrl}?progressbar=${progressbarValue}&lastUpdate=${lastUpdated}`, obj).map((response) => {
            return response;
        });
    }

    public addUpdateCertification(obj): Observable<any> {
        return this.http.post(`${this.saveCertificationUrl}`, obj).map((response) => {
            return response;
        });
    }

    public getVisaDetails(id): Observable<any> {
        return this.http.get(`${this.visaDetails}?empId=${id}`).map((response) => {
            return response;
        });
    }

    public deleteDomain(obj, progressbarValue, lastUpdated): Observable<any> {
        return this.http.post(`${this.deleteDomainUrl}?progressbar=${progressbarValue}&lastUpdate=${lastUpdated}`, obj).map((response) => {
            return response;
        });
    }

    public deleteCertification(obj): Observable<any> {
        return this.http.post(`${this.deleteCertificationUrl}`, obj).map((response) => {
            return response;
        });
    }

}


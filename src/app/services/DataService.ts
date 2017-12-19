import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ILogin, ILoginResponse} from '../app.interface';
export abstract class DataService {
    public abstract loginUser( obj: ILogin): Observable<ILoginResponse>;
    public abstract getEmployeeDetails( id ): Observable<any>;
    public abstract uploadProfileImage( obj ): Observable<any>;
    public abstract uploadProfileResume( obj ): Observable<any>;
    public abstract getAllSkillData( id ): Observable<any>;
    public abstract getProjectDetails( id ): Observable<any>;
    public abstract getSubDomainDetails( id ): Observable<any>;
    public abstract getChildDomainDetails( dId, sId ): Observable<any>;
    public abstract getThemes(): Observable<any>;
    public abstract updateTheme( paramObj ): Observable<any>;
    public abstract saveContactAndExpDetails( paramObj ): Observable<any>;
    public abstract profilePercentage: EventEmitter<number>;
    public abstract addUpdateSkill(obj, value): Observable<any>;
    public abstract addUpdateDomain(obj, value): Observable<any>;
    public abstract deleteDomain(obj, value): Observable<any>;
    public abstract getVisaDetails(id) : Observable<any>;
}
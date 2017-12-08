import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ILogin, ILoginResponse} from '../app.interface';
export abstract class DataService {
    public abstract loginUser( obj: ILogin): Observable<ILoginResponse>;
    public abstract getEmployeeDetails( id ): Observable<any>;
    public abstract uploadProfileImage( obj ): Observable<any>;
    public abstract getAllSkillData( id ): Observable<any>;
    public abstract getProjectDetails( id ): Observable<any>;
    public abstract profilePercentage: EventEmitter<number>;
}
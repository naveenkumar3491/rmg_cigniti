import { Observable } from 'rxjs/Observable';
import {ILogin, ILoginResponse} from '../app.interface';
export abstract class DataService {
    public abstract loginUser( obj: ILogin): Observable<ILoginResponse>;
    public abstract getEmployeeDetails( id ): Observable<any>;
}
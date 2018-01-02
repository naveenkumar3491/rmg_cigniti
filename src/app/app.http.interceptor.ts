import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.indexOf('uploadImage') !== -1 || req.url.indexOf('uploadResume') !== -1) {
             console.log("Sending request with out header ...");
            return next.handle(req)
                .catch((error, caught) => {
                    return Observable.throw(error);
                }) as any;
        } else {
            const authReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json; charset=utf-8').set('Accept', 'application/json') });
            console.log("Sending request with new header now ...");
            return next.handle(authReq)
                .catch((error, caught) => {
                    return Observable.throw(error);
                }) as any;
        }
    }
}
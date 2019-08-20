import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AYTokenStorageService } from '../ay-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    errorMsg : string = "";

    constructor(private tokenStorage: AYTokenStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.tokenStorage.signOut();
                //location.reload(true); //TODO This reloads the login screen after Login Failure 401
                this.errorMsg = "Unable to Authorise";
            }
            else if (err.status === 400)
            {
                //console.log("API 400 :", err);
                /* AYRESXXX is the custom response code from API */
                if (err.error && err.error.message && err.error.message.startsWith('AYRES'))
                {
                    let str : string[] = err.error.message.split('$'); /* $ is the seperator (Code $ Message) from API */
                    this.errorMsg = (str && str[1]) ? str[1] : "(API400) Check Input values. Contact Admin for assistance.";
                }
                else
                {
                    this.errorMsg = "(API400) Check Input values. Contact Admin for assistance.";
                }
            }
            //const errorMsg = err.error.message || err.statusText;
            return throwError(this.errorMsg);
        }))
    }
}

export const httpErrorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
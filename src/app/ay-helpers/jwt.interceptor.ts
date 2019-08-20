import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AYTokenStorageService } from '../ay-service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private tokenStorage: AYTokenStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let authReq = request;
        const authToken = this.tokenStorage.getToken();
        if (authToken != null) {
            authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + authToken) });
        }
        return next.handle(authReq);
    }
}

export const httpJwtInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];

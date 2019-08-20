import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, JwtResponse } from '../ay-model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AYAuthenticationService {
    
    private loginUrl = 'http://localhost:8080/WeWinAPI/api/auth/signin';
    private signupUrl = 'http://localhost:8080/WeWinAPI/api/auth/signup';

//    private currentUserSubject: BehaviorSubject<User>;
//    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
//        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
//        this.currentUser = this.currentUserSubject.asObservable();
    }

//    public get currentUserValue(): User {
//        return this.currentUserSubject.value;
//    }

    register(user: User) : Observable<string> {
        return this.http.post<string>(this.signupUrl, user, httpOptions);
    }

    login(username: string, password: string) {
        return this.http.post<JwtResponse>(this.loginUrl, { "username" : username, "password" : password }, httpOptions);
    }

//    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
//        this.currentUserSubject.next(null);
//    }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AYAlertService, AYAuthenticationService, AYTokenStorageService, AYNavService } from '../ay-service';
import { login_error_msgs } from '../ay-error/ay-error.interface' 

@Component({
  selector: 'app-ay-login',
  templateUrl: './ay-login.component.html',
  styleUrls: ['./ay-login.component.scss']
})

export class AYLoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    roles: string[] = [];
    lem = login_error_msgs; /** To access error msgs **/
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AYAuthenticationService,
        private alertService: AYAlertService,
        private tokenStorage: AYTokenStorageService,
        private navService: AYNavService
    ) {
        // redirect to home if already logged in
        if (this.tokenStorage.getToken()) {
            this.roles = this.tokenStorage.getAuthorities(); 
            this.router.navigate(['/']);
        }
    }


    ngOnInit() {
        this.giveMeACleanForm();
        this.navService.setNavElements(false,'',false,'',false,'');
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    giveMeACleanForm()
    {
        this.loginForm = this.formBuilder.group({
            username:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
            password:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    /** Validation Function **/
    showErrorMsgIf(fieldCtrlName: string, validationType: string) {
        if(this.loginForm.get(fieldCtrlName).hasError(validationType)
            && (this.loginForm.get(fieldCtrlName).dirty
                && this.loginForm.get(fieldCtrlName).touched))
                {
                    return "error-alert";
                }
        return "";
    }

    setErrorStyle()
    {
        const controls = this.loginForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                //controls[name].
            }
        }
    }
    /** END of Validation Function **/
    
    onSubmit() {
        
        //this.alertService.error("Test Error Message Test Error Message Test Error Message Test Error Message Test Error Message Test Error Message ");

        this.loginForm.get('username').setValue("WeWinAdmin"); //TODO Remove before build
        this.loginForm.get('password').setValue("Welcome0!"); //TODO Remove before build

        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    // login successful if there's a jwt token in the response
                    if (data.username && data.accessToken) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        this.tokenStorage.saveToken(data.accessToken);
                        this.tokenStorage.saveUsername(data.username);
                        this.tokenStorage.saveAuthorities(data.authorities);
                        
                        this.roles = this.tokenStorage.getAuthorities();
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                    console.log("Login error : ",error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}

import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AYAlertService, AYAuthenticationService, AYTokenStorageService, AYNavService } from '../ay-service';
import { register_error_msgs } from '../ay-error/ay-error.interface'
import { Role } from '../ay-model/user';

//const roleEnum = Role;
//const roleKeys = Object.keys(Role);

@Component({
    selector: 'app-ay-register',
    templateUrl: './ay-register.component.html',
    styleUrls: ['../ay-login/ay-login.component.scss'],
  // Encapsulation has to be disabled in order for the
  // component style to apply to the select panel.    
    encapsulation: ViewEncapsulation.None, 
  })

export class AYRegisterComponent implements OnInit, AfterViewInit {

    roleEnum = Role;
    roleKeys = Object.keys(this.roleEnum);
    rem = register_error_msgs; /** To access error msgs **/
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AYAuthenticationService,
        private alertService: AYAlertService,
        private tokenStorage: AYTokenStorageService,
        private navService: AYNavService
    ) { 
        // redirect to home if already logged in
        if (this.tokenStorage.getToken()) {
            //this.roles = this.tokenStorage.getAuthorities(); 
            this.router.navigate(['/']);
        }
                
    }

    ngOnInit() {
        this.giveMeACleanSignUpForm();
        this.navService.setNavElements(false,'',false,'',false,'');
    }

    ngAfterViewInit() {
        //this.alertService.error("Test Error");
    }

    giveMeACleanSignUpForm()
    {
        this.submitted = false;
        this.loading = false;
        this.registerForm = this.formBuilder.group({
            firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            lastname:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            /* Username - (lower case OR upper case) AND number */
            username:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]], 
            /* Password - lower case AND upper case AND number */
            password:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]], 
            confirmPassword:  ['', [Validators.required]],
            email:     ['', [Validators.required, Validators.email]],
            mobile:    ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^(?=.*[0-9])[0-9]+$')]],
            role:      ['']            
        },{
            validator: MustMatch('password', 'confirmPassword')
        });
    }


    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    /** Validation Function **/ //TODO NotUsed
    showErrorMsgIf(fieldCtrlName: string, validationType: string) {
        return (this.registerForm.get(fieldCtrlName).hasError(validationType)
            && (this.registerForm.get(fieldCtrlName).dirty
                || this.registerForm.get(fieldCtrlName).touched));
    }
    /** END of Validation Function **/

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        
        //console.log("Register : ", this.registerForm.value);

        this.loading = true;
        this.authenticationService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log("Registration Success");
                    this.alertService.success('Registration successful', true);
                    this.giveMeACleanSignUpForm();
                    //this.router.navigate(['/login']);
                },
                error => {
                    console.log("Registration Error : ",error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    signOut()
    {
        this.tokenStorage.signOut();
        this.router.navigate(['/login']);
    }
}

export function MustMatch(controlName: string, matchingControlName: string) 
{
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
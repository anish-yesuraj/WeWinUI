import { Component, OnInit, OnDestroy } from '@angular/core';
import { AYTokenStorageService } from '../ay-service';
import { Router } from '@angular/router';
import { AYNavService } from '../ay-service/ay-nav.service';
import { NAVITEM } from '../ay-model';

@Component({ templateUrl: 'ay-home.component.html' })
export class AYHomeComponent implements OnInit, OnDestroy {

    myToken : string;

    constructor(private router: Router, private tokenStorage: AYTokenStorageService, private navService: AYNavService) {
    }

    ngOnInit() {
        this.myToken = this.tokenStorage.getToken();
        this.navService.setNavElements(true,NAVITEM.HOME,true,NAVITEM.HOME,true,'');
    }

    ngOnDestroy() {
        this.navService.clear();
    }

    signOut()
    {
        this.tokenStorage.signOut();
        this.router.navigate(['/login']);
    }


}
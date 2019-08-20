import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AYAlertService } from '../ay-service';

@Component({ 
    selector: 'alert', 
    templateUrl: 'ay-alert.component.html', 
    styleUrls: ['./ay-alert.component.scss'] 
})

export class AYAlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
    
    constructor(private alertService: AYAlertService) {
    }
    
    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }
                this.message = message;
            });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
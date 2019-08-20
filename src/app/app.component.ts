import { Component, OnInit } from '@angular/core';

import { AYTokenStorageService } from './ay-service';
import { Router } from '@angular/router';
import { AYNavService } from './ay-service/ay-nav.service';
import { Subscription } from 'rxjs';
import { startWith, delay, tap } from 'rxjs/operators';
import { NAVITEM } from './ay-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  
  title = 'WeWinUI';
  private roles: string[];
  private authority: string;
  cpyRgt : Date = new Date();
  private subscription: Subscription;
  navElements : any;
  currentUser: any;
  
  constructor(private router : Router, private tokenStorage: AYTokenStorageService, private navService: AYNavService) {
  }

  ngOnInit() {

    this.currentUser = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      role: this.tokenStorage.getAuthorities()
    };

    // if (this.tokenStorage.getToken()) {
    //   this.roles = this.tokenStorage.getAuthorities();
    //   this.roles.every(role => {
    //     if (role === 'ROLE_ADMIN') {
    //       this.authority = 'admin';
    //       return false;
    //     } else if (role === 'ROLE_SME') {
    //       this.authority = 'sme';
    //       return false;
    //     } else if (role === 'ROLE_DE') {
    //       this.authority = 'de';
    //       return false;
    //     }
    //     this.authority = 'user';
    //     return true;
    //   });
    // }

  }

  ngAfterViewInit ()
  {
    this.navService.getNavElements().pipe(
          startWith(null),
          delay(0),
          tap(element => this.navElements=element)
        ).subscribe();  
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  signOut()
  {
      this.tokenStorage.signOut();
      this.router.navigate(['/login']);
  }


}

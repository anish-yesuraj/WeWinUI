import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AYNavService {
    private navElements = new Subject<any>();

    getNavElements(): Observable<any> {
        return this.navElements.asObservable();
    }
    
    setNavElements(topNavStatus: boolean, topNavElement: string, 
                    sideNavStatus: boolean, sideNavElement: string,
                    footNavStatus: boolean, footNavElement: string) {
        this.navElements.next({ 
                        topNavStatus:  topNavStatus,  topNavElement:  topNavElement,
                        sideNavStatus: sideNavStatus, sideNavElement: sideNavElement,
                        footNavStatus: footNavStatus, footNavElement: footNavElement,
                        });
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.navElements.next();
    }
}
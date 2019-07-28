import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'WeWinUI';
  
  showHead = false;
  showLeft = false;
  showFoot = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
 
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHead = this.activatedRoute.firstChild.snapshot.data.showHead !== false;
        this.showLeft = this.activatedRoute.firstChild.snapshot.data.showLeft !== false;
        this.showFoot = this.activatedRoute.firstChild.snapshot.data.showFoot !== false;
      }
    });
  }
  
}

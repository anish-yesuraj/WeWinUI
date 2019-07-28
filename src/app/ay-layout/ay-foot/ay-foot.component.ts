import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ay-foot',
  templateUrl: './ay-foot.component.html',
  styleUrls: ['./ay-foot.component.scss']
})
export class AYFootComponent implements OnInit {
  cpyRgt : Date = new Date();
  constructor() { }

  ngOnInit() {
  }

}

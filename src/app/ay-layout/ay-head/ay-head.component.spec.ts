import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyHeadComponent } from './ay-head.component';

describe('AyHeadComponent', () => {
  let component: AyHeadComponent;
  let fixture: ComponentFixture<AyHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

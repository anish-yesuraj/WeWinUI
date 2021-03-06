import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AYLoginComponent } from './ay-login.component';

describe('AyLoginComponent', () => {
  let component: AYLoginComponent;
  let fixture: ComponentFixture<AYLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AYLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AYLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

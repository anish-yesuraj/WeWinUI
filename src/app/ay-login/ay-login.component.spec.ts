import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyLoginComponent } from './ay-login.component';

describe('AyLoginComponent', () => {
  let component: AyLoginComponent;
  let fixture: ComponentFixture<AyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

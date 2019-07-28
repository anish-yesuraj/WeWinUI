import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyLeftComponent } from './ay-left.component';

describe('AyLeftComponent', () => {
  let component: AyLeftComponent;
  let fixture: ComponentFixture<AyLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

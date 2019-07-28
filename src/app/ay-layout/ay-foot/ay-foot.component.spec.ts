import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyFootComponent } from './ay-foot.component';

describe('AyFootComponent', () => {
  let component: AyFootComponent;
  let fixture: ComponentFixture<AyFootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyFootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

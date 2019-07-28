import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AYQuestionComponent } from './ay-question.component';

describe('AYQuestionComponent', () => {
  let component: AYQuestionComponent;
  let fixture: ComponentFixture<AYQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AYQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AYQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

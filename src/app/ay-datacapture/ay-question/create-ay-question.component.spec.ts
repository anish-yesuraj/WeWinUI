import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AYCreateQuestionComponent } from "./create-ay-question.component";

describe('AYCreateQuestionComponent', () => {
  let component: AYCreateQuestionComponent;
  let fixture: ComponentFixture<AYCreateQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AYCreateQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AYCreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

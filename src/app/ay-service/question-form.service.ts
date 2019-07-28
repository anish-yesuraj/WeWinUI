import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionValidatorService } from '../ay-service/question-validator.service'
import { IQuestionForm, IQuestion, IAnswerChoice, ISubject} from '../ay-model/question-form.interface'

@Injectable()
export class QuestionFormService {

    public form: FormGroup;

    constructor(
        private questionValidatorService: QuestionValidatorService,
        private fb: FormBuilder) {
        this.form = this.fb.group({
            selQuestion: this.fb.group(
                {
                    subject: [null, Validators.required],
                    topic: [null],
                    level: [null],
                    text: [null, Validators.required],
                    tip: [null],
                    active: [true, Validators.required],
                    imagePath: [null],
                    imageTip: [null],
                    answerExplanation: [null],
                    sourceId: [null, Validators.required],
                    examTag: [null],
                    answerChoices: this.fb.array([])
                }
            ),

            selAnswerChoice: null

        },
            {
                //validator: this.questionValidatorService.formValidator()
            });

    }

    get isValid(): boolean {
        if (!this.form.valid) {
            this.questionValidatorService.validateAllFormFields(this.form);
            return false;
        }
        return true;
    }

    get answerChoicesArray(): FormArray {
        return this.form.get('answerChoices') as FormArray;
    }

    selectAnswerChoicesForEdit(index: number) {
        this.form.get('selAnswerChoice').setValue(index);
    }

    addAnswerChoice(): FormGroup {
        const answerChoiceGroup = this.getAnswerChoiceFormGroup();
        this.answerChoicesArray.push(this.getAnswerChoiceFormGroup());

        this.form.markAsDirty();
        return answerChoiceGroup;
    }

    delAnswerChoice(index: number): void {
        this.answerChoicesArray.removeAt(index);
        this.form.markAsDirty();
    }

    getAnswerChoiceFormGroup(): FormGroup {
        return this.fb.group(
            {
                text: [null, Validators.required],
                tip: [null],
                result: [false, Validators.required],
                active: [true],
                imagePath: [null],
                imageTip: [null]
            },
            {
                //validator: this.questionValidatorService.validateAnswerChoice()
            }
        );
    }

    resetForm() {
        while (this.answerChoicesArray.length) {
          this.answerChoicesArray.removeAt(0);
        }
        this.form.reset();
      }
}
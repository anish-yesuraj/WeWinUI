import { Injectable } from '@angular/core';
import { IQuestionForm, IQuestion, IAnswerChoice, ISubject} from '../ay-model/question-form.interface';
import { QuestionFormService } from './question-form.service';

@Injectable()
export class QuestionLoaderService {
    constructor (private questionFormService : QuestionFormService)
    {
        
    }
}
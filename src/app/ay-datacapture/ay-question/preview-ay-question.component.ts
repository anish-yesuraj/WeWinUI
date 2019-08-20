import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AYDataService, AYNavService } from 'src/app/ay-service';
import { IQuestion, NAVITEM } from 'src/app/ay-model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-preview-ay-question',
    templateUrl: './preview-ay-question.component.html',
    styleUrls: ['./ay-question.component.scss']
  })

export class AYPreviewQuestionComponent implements OnInit {
    
    previewQuestionData : IQuestion;

    constructor (
                private router: Router,
                private route: ActivatedRoute, 
                private _dataService : AYDataService,
                private navService: AYNavService,
                private sanitizer:DomSanitizer)
    {

    }
    
    ngOnInit()
    {
        this.navService.setNavElements(true,NAVITEM.DE,true,NAVITEM.DE,true,'');
        this.route.paramMap.subscribe(params =>  {
            const id = params.get('id');
            if (id)
            {
                this.getQuestionByID(id);
            }
        });
    }

    getQuestionByID (id : string)
    {
        this._dataService.getQuestionByID(id).subscribe(
            (question : IQuestion) => this.previewQuestion(question),
            (error : any) => {console.log("Error Loading Question for preview", error)}
        );
    }

    previewQuestion(question : IQuestion)
    {
        this.previewQuestionData = question;
    }

    decodeAndLoadImage(imageCode : string)
    {
        return this.sanitizer.bypassSecurityTrustResourceUrl(imageCode);
    }


    /** Screen Actions */
    createNewQuestion()
    {
        this.router.navigate(['/createquestion']);
    }

    editQuestion(id : string)
    {
        if (id)
        {
            this.router.navigate(['/editquestion',id]);
        }
    }
    /** Screen Actions */

}
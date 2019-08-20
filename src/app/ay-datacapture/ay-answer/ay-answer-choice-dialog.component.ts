import { Component, OnInit, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { IAnswerChoice } from '../../ay-model/question-form.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-ay-answer-choice-dialog',
    templateUrl: 'ay-answer-choice-dialog.html',
    styleUrls: ['../ay-question/ay-question.component.scss']  
  })
  export class AYAnswerChoiceDialog implements OnInit  {
    
    public showMessage : string;
    answerChoiceForm : FormGroup;

    action : string;
    selAnswerChoice : any;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AYAnswerChoiceDialog>,
        //@Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: IAnswerChoice) {

            this.selAnswerChoice = {...data};
            this.action = this.selAnswerChoice.action;
            this.selAnswerChoice.imageSrc = data.imageSrc;

        }
    

    ngOnInit() {
        //console.log('From parent :',this.selAnswerChoice);
        this.answerChoiceForm = this.fb.group({
            id : [this.selAnswerChoice.id,[]],
            result : [this.selAnswerChoice.result,[]],
            text : [this.selAnswerChoice.text,[]],
            tip : [this.selAnswerChoice.tip,[]],
            imageSrc : [this.selAnswerChoice.imageSrc],
            //imageFile : [this.selAnswerChoice.imageFile,[]],
            //imageName : [this.selAnswerChoice.imageName,[]],
            imageTip : [this.selAnswerChoice.imageTip,[]]
        });

        
    }

    ngAfterViewInit()
    {
            //console.log('Test  :',this._choiceImagePreview);
            if (this.action==="UPDATE" 
                    && this.selAnswerChoice!=null 
                    && this.selAnswerChoice.imageSrc!=null
                    && this.selAnswerChoice.imageSrc.length>0)
            {
                this._choiceImagePreview.nativeElement.src = this.selAnswerChoice.imageSrc;
            }
    }

    doAction() {
        this.dialogRef.close({ event: this.action, data: this.answerChoiceForm.value });
    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }    


    /** Image Capturing Functions **/

    @ViewChild('_choiceImagePreview', {static: false}) _choiceImagePreview: ElementRef;
 
    onPaste(event: any) {
        const items = event.clipboardData.items;
        let blob = null;
        for (const item of items) {
            if (item.type.indexOf('image') === 0) {
                blob = item.getAsFile();
            }
        }
        // load image if there is a pasted image
        if (blob !== null) {
            //var date = new Date();
            //var pasteFileName = `ay_${date.getTime().toString()}.jpg`;
            //const fileFromBlob: File = new File([blob], pasteFileName);
            const reader = new FileReader();
            reader.onload = (_evt: any) => {
                //console.log('target.result :: ', _evt.target.result); // data url!
                //console.log('fileFromBlob :: ', fileFromBlob); // data url!
                this._choiceImagePreview.nativeElement.src = _evt.target.result;
                this.answerChoiceForm.patchValue({
                    imageSrc: _evt.target.result//,
                    //imageFile: fileFromBlob,
                    //imageName: fileFromBlob.name
                });
                //this.selAnswerChoice.imageFile = fileFromBlob;
                //this.selAnswerChoice.imageName = fileFromBlob.name;
            };
            reader.readAsDataURL(blob);
        }
    }
  
    fileToUpload : File = null ;

    handleFileInput(file: FileList) {
        if (file == null || file.length === 0) { return; }

        this.fileToUpload = file.item(0);

        if (this.fileToUpload != null && this.fileToUpload.type != null && this.fileToUpload.type.match(/image\/*/) == null) 
        { this.showMessage = "Only images are supported."; return; }

        //Show Preview
        var reader = new FileReader();
        reader.onload = (_evt: any) => {
            this._choiceImagePreview.nativeElement.src = _evt.target.result;
            this.answerChoiceForm.patchValue({
                imageSrc: _evt.target.result//,
                //imageFile: this.fileToUpload,
                //imageName: this.fileToUpload.name
            });
            //this.selAnswerChoice.imageFile = this.fileToUpload;
            //this.selAnswerChoice.imageName = this.fileToUpload.name;
            //console.log('upload-target.result :: ', _evt.target.result); // data url!
            //console.log('upload-file :: ', this.fileToUpload.name); // data url!
            //console.log('upload-fileToUpload :: ', this.fileToUpload); // data url!
        }
        reader.readAsDataURL(this.fileToUpload);
    }

    clearChoiceImage()
    {
      this._choiceImagePreview.nativeElement.src = '../../../assets/img/dummy-bg-filtered.png';
      this.answerChoiceForm.patchValue({ 
        imageSrc  : ''//,
        //imageFile : '',
        //imageName : ''
      });
    }


   /* createImageFromBlob(image: Blob) { //TODO Check if this function is used ?
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this._choiceImagePreview.nativeElement.src = reader.result;
        }, false);
     
        if (image) {
           reader.readAsDataURL(image);
        }
    } */

    /** END of Image Capturing Functions **/
  



  } //END of Component
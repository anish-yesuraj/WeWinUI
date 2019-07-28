import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { IDropDownMaster, DropDownTypeEnum, IQuestion } from '../../ay-model/question-form.interface';
import { AYDataService } from '../../ay-service/ay-data.service';
import { IAnswerChoice } from '../../ay-model/question-form.interface';
import { MatDialog, MatTable, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AYAnswerChoiceDialog } from '../ay-answer/ay-answer-choice-dialog.component';
import { of } from 'rxjs';

let ELEMENT_DATA: IAnswerChoice[] = [
  {
    "id": "A000009",
    "text": "C1 : H2O",
    "tip": "Hydrogen and Oxide",
    "result": true,
    "active": true,
    "imageSrc": "",
    "imageFile": "",
    "imageName": "1.jpg",
    "imageTip": "H2O Image Tip"
  },
  {
    "id": "A000010",
    "text": "C2 : H2O2",
    "tip": "Hydrogen and Oxygen",
    "result": false,
    "active": true,
    "imageSrc": "",
    "imageFile": "",
    "imageName": "2.jpg",
    "imageTip": "H2O2 Image Tip"
  },
  {
    "id": "A000011",
    "text": "C3 : HO",
    "tip": "Hydrogen and Oxygen",
    "result": false,
    "active": true,
    "imageSrc": "",
    "imageFile": "",
    "imageName": "3.jpg",
    "imageTip": "HO Image Tip"
  }
];


@Component({
  selector: 'app-ay-question',
  templateUrl: './ay-question.component.html',
  styleUrls: ['./ay-question.component.scss']
})
export class AYQuestionComponent implements OnInit {

  public showMessage : string;
  public questionForm: FormGroup;

  public gradeMaster: IDropDownMaster[];
  public subjectMaster: IDropDownMaster[];
  public topicMaster: IDropDownMaster[];
  public levelMaster: IDropDownMaster[];
  public examMaster: IDropDownMaster[];
  public sourceMaster: IDropDownMaster[];

  selQuestion : IQuestion;

  displayedColumns: string[] = ['clmAnswerResult', 'clmAnswerText', 'clmAnswerImageName', 'clmAnswerImagePreview', 'clmAction'];
  answerChoices = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) answerChoicesTable: MatTable<IAnswerChoice>;

  constructor(private formBuilder: FormBuilder,
    private ayDataService: AYDataService,
    private dialog: MatDialog) {
    
    this.questionForm = this.formBuilder.group(
      {
        id: [''],
        active: [true],
        grade: [''],
        subject: [''],
        topic: [''],
        level: [''],
        examTag: [''],
        sourceId: [''],
        text: [''],
        tip: [''],
        answerExplanation: [''],
        imageSrc: [''],
        imageTip: [''],
        selAnswerChoices: ['']
      }
    );

  } // End of Constructor

  ngOnInit() {

    //TODO Rethink if multiple API calls are required to load the DropDown
    //TODO Is there a way to load once and use multiple method for the DropDown values 
    /* Async call to load the DropDown master values - Start */
    this.ayDataService.getDropDownMasterValues(DropDownTypeEnum.GRADE).subscribe(grades => {
      this.gradeMaster = grades;
    });

    this.ayDataService.getDropDownMasterValues(DropDownTypeEnum.SUBJECT).subscribe(subjects => {
      this.subjectMaster = subjects;
      //this.questionForm.controls.selSubject.patchValue(this.subjectMaster[3].optionId); /** To default an option **/
    });

    this.ayDataService.getDropDownMasterValues(DropDownTypeEnum.TOPIC).subscribe(topics => {
      this.topicMaster = topics;
    });

    this.ayDataService.getDropDownMasterValues(DropDownTypeEnum.LEVEL).subscribe(levels => {
      this.levelMaster = levels;
    });

    this.ayDataService.getDropDownMasterValues(DropDownTypeEnum.EXAM).subscribe(exams => {
      this.examMaster = exams;
    });

    this.ayDataService.getDropDownMasterValues(DropDownTypeEnum.SOURCE).subscribe(sources => {
      this.sourceMaster = sources;
    });
    /* Async call to load the drop down master values - End */


  } // End of ngInit



  /** Fucntion to Open AnswerChoice Dialog and perform ADD/DELETE/UPDATE  **/
  openAnswerChoice(action: string, inpObj: any) {

    inpObj.action = action;

    /** Custom MatDialog Config **/
    const matDialogConfig = new MatDialogConfig();
    if ('DELETE' == action) {
      matDialogConfig.width = '450px';
      matDialogConfig.height = '200px';
    } else {
      matDialogConfig.width = '850px';
      matDialogConfig.height = '330px';
    }
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.restoreFocus = false;
    matDialogConfig.hasBackdrop = true;
    matDialogConfig.data = inpObj;
    /** END of Custom MatDialog Config **/

    const dialogRef = this.dialog.open(AYAnswerChoiceDialog, matDialogConfig);

    dialogRef.beforeClosed().subscribe(result => {
      console.log("From Dialog ==> ", result) //TODO Remove before build
      if (result.event == 'ADD') {
        this.addRowData(result.data);
      } else if (result.event == 'UPDATE') {
        this.updateRowData(result.data);
      } else if (result.event == 'DELETE') {
        this.deleteRowData(result.data);
      }
      console.log("After Dialog ==> ", this.answerChoices) //TODO Remove before build
    });
  } /** END of Open AnswerChoice Dialog **/


  addRowData(row_obj: IAnswerChoice) {
    var d = new Date();
    row_obj.id = d.getTime().toString(); //TODO Introduce logic to add index for new rows
    this.answerChoices.push(row_obj);
    this.answerChoicesTable.renderRows();
  }

  updateRowData(row_obj: IAnswerChoice) {
    this.answerChoices = this.answerChoices.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.text = row_obj.text;
        value.tip = row_obj.tip;
        value.result = row_obj.result;
        value.imageSrc = row_obj.imageSrc;
        value.imageFile = row_obj.imageFile;
        value.imageName = row_obj.imageName;
        value.imageTip = row_obj.imageTip;
      }
      return true;
    });
  }

  deleteRowData(row_obj: IAnswerChoice) {
    this.answerChoices = this.answerChoices.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }


  /** Image Capturing Functions **/

  @ViewChild('_questionImagePreview', { static: false }) _questionImagePreview: ElementRef;

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
      var date = new Date();
      var pasteFileName = `ay_${date.getTime().toString()}.jpg`;
      const fileFromBlob: File = new File([blob], pasteFileName);
      const reader = new FileReader();
      reader.onload = (_evt: any) => {
        //console.log('target.result :: ', evt.target.result); // data url!
        //console.log('fileFromBlob :: ', fileFromBlob); // data url!
        this._questionImagePreview.nativeElement.src = _evt.target.result;
        this.questionForm.patchValue({ imageSrc: _evt.target.result });
        this.selQuestion.imageFile = fileFromBlob;
        this.selQuestion.imageName = fileFromBlob.name;
      };
      reader.readAsDataURL(blob);
    }
  }

  fileToUpload: File = null;

  handleFileInput(file: FileList) {
    if (file == null || file.length === 0) { return; }

    this.fileToUpload = file.item(0);

    if (this.fileToUpload != null && this.fileToUpload.type != null && this.fileToUpload.type.match(/image\/*/) == null) 
    { this.showMessage = "Only images are supported."; return; }

    //Show Preview
    var reader = new FileReader();
    reader.onload = (_evt: any) => {
      this._questionImagePreview.nativeElement.src = _evt.target.result;
      this.questionForm.patchValue({imageSrc: _evt.target.result});
      this.selQuestion.imageFile = this.fileToUpload;
      this.selQuestion.imageName = this.fileToUpload.name;
      //this.questionForm.patchValue({imagePath: event.target.result});
      //console.log('upload-target.result :: ', event.target.result); // data url!
      //console.log('upload-file :: ', file); // data url!
      //console.log('upload-fileToUpload :: ', this.fileToUpload); // data url!
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  
  /** END of Image Capturing Functions **/

} // End of Component



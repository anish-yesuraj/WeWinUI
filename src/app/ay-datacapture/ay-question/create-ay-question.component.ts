import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropDownMaster, DropDownTypeEnum, IQuestion } from '../../ay-model/question-form.interface';
import { AYDataService } from '../../ay-service/ay-data.service';
import { IAnswerChoice } from '../../ay-model/question-form.interface';
import { MatDialog, MatTable, MatDialogConfig } from '@angular/material';
import { AYAnswerChoiceDialog } from '../ay-answer/ay-answer-choice-dialog.component';
import { question_error_msgs } from '../../ay-error/ay-error.interface';
import { AYNavService } from '../../ay-service';
import { NAVITEM, DE_ACTION } from '../../ay-model';
import { ActivatedRoute, Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { first } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-ay-question',
  templateUrl: './create-ay-question.component.html',
  styleUrls: ['./ay-question.component.scss']
})
export class AYCreateQuestionComponent implements OnInit {

  public qem = question_error_msgs; /** To access error msgs **/
  public questionForm: FormGroup;
  public showMessage: string;
  public submitted = false;
  public gradeMaster: IDropDownMaster[];
  public subjectMaster: IDropDownMaster[];
  public topicMaster: IDropDownMaster[];
  public levelMaster: IDropDownMaster[];
  public examMaster: IDropDownMaster[];
  public sourceMaster: IDropDownMaster[];
  
  questionId : string;

  displayedColumns: string[] = ['clmAnswerResult', 'clmAnswerText', 'clmAnswerImagePreview', 'clmAction'];
  answerChoicesTableData : IAnswerChoice[] = [];
  @ViewChild('answerChoicesTable', { static: true }) answerChoicesTable: MatTable<IAnswerChoice>;
  constructor(private formBuilder: FormBuilder,
    private _dataService: AYDataService,
    private navService: AYNavService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private sanitizer:DomSanitizer) {
  } // End of Constructor



  ngOnInit() {
    this.navService.setNavElements(true,NAVITEM.DE,true,NAVITEM.DE,true,'');
    this.loadTheQuestionScreen();
  }
  
  ngOnDestroy() {
  }

  
  loadTheQuestionScreen ()
  {
    this.giveMeACleanForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadQuestionByIDForEdit(id);
      }
    });
  }

  loadQuestionByIDForEdit(id : string)
  {
    this._dataService.getQuestionByID(id).subscribe(
      (question : IQuestion) => this.loadQuestionInTheFormForEdit(question),
      (error : any) => {console.log("Error Loading Question for preview", error)}
    );
  }

  loadQuestionInTheFormForEdit(question : IQuestion)
  {
    this.questionId = question.id;
    this.questionForm.patchValue({
      id: question.id,
      active: question.active,
      grade: question.grade,
      subject: question.subject,
      topic: question.topic,
      level: question.level,
      examTag: question.examTag,
      sourceId: question.sourceId,
      text: question.text,
      tip: question.tip,
      answerExplanation: question.answerExplanation,
      imageTip: question.imageTip,
      //imageName: question.imageName,
      //imageFile: question.imageFile,
      answerChoices: this.loadChoiceDataDuringEdit(question.answerChoices),
      imageSrc: question.imageSrc
    });
    this._questionImagePreview.nativeElement.src = question.imageSrc;
  }

  loadChoiceDataDuringEdit(choices: IAnswerChoice[]) {
    this.answerChoicesTableData.push(...choices);
    this.answerChoicesTable.dataSource = this.answerChoicesTableData;
    this.answerChoicesTable.renderRows();
    return this.answerChoicesTableData;
  }

  giveMeACleanForm()
  {
    this.questionForm = this.formBuilder.group(
      {
        id: [''],
        active: [true],
        grade: ['', Validators.required],
        subject: ['', Validators.required],
        topic: [''],
        level: [''],
        examTag: [''],
        sourceId: ['', Validators.required],
        text: ['', Validators.required],
        tip: [''],
        answerExplanation: [''],
        imageTip: [''],
        //imageName: [''],
        //imageFile: [''],
        answerChoices: [this.answerChoicesTableData, Validators.required],
        imageSrc: ['']
      }
    );
    this.loadDropDownMasterValues();
  }

  // convenience getter for easy access to form fields
  get f() { return this.questionForm.controls; }

  /* Async call to load the DropDown master values - Start */
  loadDropDownMasterValues() {
    //TODO Rethink if multiple API calls are required to load the DropDown
    //TODO Is there a way to load once and use multiple method for the DropDown values 
    this._dataService.getDropDownMasterValues(DropDownTypeEnum.GRADE).subscribe(grades => {
      this.gradeMaster = grades;
    });

    this._dataService.getDropDownMasterValues(DropDownTypeEnum.SUBJECT).subscribe(subjects => {
      this.subjectMaster = subjects;
      //this.questionForm.controls.selSubject.patchValue(this.subjectMaster[3].optionId); /** To default an option **/
    });

    this._dataService.getDropDownMasterValues(DropDownTypeEnum.TOPIC).subscribe(topics => {
      this.topicMaster = topics;
    });

    this._dataService.getDropDownMasterValues(DropDownTypeEnum.LEVEL).subscribe(levels => {
      this.levelMaster = levels;
    });

    this._dataService.getDropDownMasterValues(DropDownTypeEnum.EXAM).subscribe(exams => {
      this.examMaster = exams;
    });

    this._dataService.getDropDownMasterValues(DropDownTypeEnum.SOURCE).subscribe(sources => {
      this.sourceMaster = sources;
    });
  }
  /* END of Async call to load the drop down master values */


  /** Function to Open AnswerChoice Dialog and perform ADD/DELETE/UPDATE  **/
  openAnswerChoice(action: string, inpObj: any) 
  {
    inpObj.action = action;

    /** Custom MatDialog Config **/
    const matDialogConfig = new MatDialogConfig();
    if ('DELETE' == action) {
      matDialogConfig.width = '450px';
      matDialogConfig.height = '250px';
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
      //console.log("From Dialog ==> ", result) //TODO Remove before build
      if (result.event == 'ADD') {
        this.addRowData(result.data);
      } else if (result.event == 'UPDATE') {
        this.updateRowData(result.data);
      } else if (result.event == 'DELETE') {
        this.deleteRowData(result.data);
      }
      //console.log("After Dialog ==> ", this.answerChoicesTableData) //TODO Remove before build
    });
  } /** END of Open AnswerChoice Dialog **/


  addRowData(row_obj: IAnswerChoice) {
    var d = new Date();
    row_obj.id = d.getTime().toString(); //TODO Introduce logic to add index for new rows
    this.answerChoicesTableData.push(row_obj);
    this.answerChoicesTable.dataSource = this.answerChoicesTableData;
    this.answerChoicesTable.renderRows();
    this.questionForm.patchValue({answerChoices : this.answerChoicesTableData});
  }
  
  updateRowData(row_obj: IAnswerChoice) {
    this.answerChoicesTableData = this.answerChoicesTableData.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.text = row_obj.text;
        value.tip = row_obj.tip;
        value.result = row_obj.result;
        value.imageSrc = row_obj.imageSrc;
        //value.imageFile = row_obj.imageFile;
        //value.imageName = row_obj.imageName;
        value.imageTip = row_obj.imageTip;
      }
      this.questionForm.patchValue({answerChoices : this.answerChoicesTableData});
      return true;
    });
  }
  
  deleteRowData(row_obj: IAnswerChoice) {
    this.answerChoicesTableData = this.answerChoicesTableData.filter((value, key) => {
      return value.id != row_obj.id;
    });
    this.questionForm.patchValue({answerChoices : this.answerChoicesTableData});
  }
  /** END of Function to Open AnswerChoice Dialog and perform ADD/DELETE/UPDATE  **/



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
      //var date = new Date();
      //var pasteFileName = `ay_${date.getTime().toString()}.jpg`;
      //const fileFromBlob: File = new File([blob], pasteFileName);
      const reader = new FileReader();
      reader.onload = (_evt: any) => {
        //console.log('target.result :: ', evt.target.result); // data url!
        //console.log('fileFromBlob :: ', fileFromBlob); // data url!
        this._questionImagePreview.nativeElement.src = _evt.target.result;
        this.questionForm.patchValue({ 
          imageSrc  : _evt.target.result//,
          //imageFile : fileFromBlob,
          //imageName : fileFromBlob.name
        });
      };
      reader.readAsDataURL(blob);
    }
  }

  fileToUpload: File = null;

  handleFileInput(file: FileList) 
  {
    if (file == null || file.length === 0) { return; }

    this.fileToUpload = file.item(0);

    if (this.fileToUpload != null && this.fileToUpload.type != null && this.fileToUpload.type.match(/image\/*/) == null) 
    { this.showMessage = "Only images are supported."; return; }

    //Show Preview
    var reader = new FileReader();
    reader.onload = (_evt: any) => {
      this._questionImagePreview.nativeElement.src = _evt.target.result;
      this.questionForm.patchValue({ 
        imageSrc  : _evt.target.result//,
        //imageFile : this.fileToUpload,
        //imageName : this.fileToUpload.name
      });
      //console.log('upload-target.result :: ', event.target.result); // data url!
      //console.log('upload-file :: ', file); // data url!
      //console.log('upload-fileToUpload :: ', this.fileToUpload); // data url!
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  clearQuestionImage()
  {
    this._questionImagePreview.nativeElement.src = '../../../assets/img/dummy-bg-filtered.png';
    this.questionForm.patchValue({ 
      imageSrc  : ''//,
      //imageFile : '',
      //imageName : ''
    });
  }

  /** END of Image Capturing Functions **/

  
  /** Validation Function **/
  showErrorMsgIf(fieldCtrlName : string, validationType : string)
  {
    return (this.questionForm.get(fieldCtrlName).hasError(validationType) 
              && (this.questionForm.get(fieldCtrlName).dirty 
                    || this.questionForm.get(fieldCtrlName).touched));
  }
  /** END of Validation Function **/


  /**  Question Screen Functions - Submit / Update / Exit / Reload / Reset **/
  submitQuestion() 
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.questionForm.invalid) { return; }
    //console.log("Ready to Submit - ", this.questionForm.value);
    this._dataService.createNewQuestion(this.questionForm.value)
                  .subscribe(question => {
                    //console.log("Submit success - ", question);
                    this.router.navigate(['/previewquestion', question.id]);
                  });
  }

  updateQuestion(id : string)
  {
    this.submitted = true;
    if (this.questionForm.invalid) { return; }

    //console.log("Ready to Update - ", this.questionForm.value);
    this._dataService.updateQuestionByID(this.questionForm.value)
                  .subscribe(question => {
                    //console.log("Update success - ", question);
                    this.router.navigate(['/previewquestion', question.id]);
                  });
  }

  exitQuestion() 
  {
    this.router.navigate(['/home']);
  }

  //TODO Reload doesnot work since same url does not refresh
  reloadQuestion(id : string) 
  {
    if (id)
    {
      console.log("Reload -",id);
      this.router.navigate(['/editquestion',id]); 
    }
  }

  //TODO Reset is not clearing the Qimage and AnswerTable
  resetQuestion() 
  {
    this.submitted = false;
    this.questionForm.reset();
  }

  /**  END of Question Screen Functions - Submit / Cancel / Reload / Reset **/


} // End of Component



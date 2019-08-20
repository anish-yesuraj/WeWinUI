export interface IQuestionForm {
    selQuestion : IQuestion;
    selAnswerChoice : IAnswerChoice;
}

export interface IQuestion {
	id : string;
	grade : string;
    subject : string;
    topic : string;
	level : string;
	text : string;
	tip : string;
	active : boolean; //TODO Activate (Slide toggle) by default for new Question
	imageSrc: string; //TODO Load a default image background
	//imageFile: any;
	//imageName: string;
    imageTip : string;
    answerExplanation : string;
    sourceId : string;
    examTag : string;
    answerChoices : IAnswerChoice[];
}

export interface IAnswerChoice {
	id: string;
	text: string;
	tip: string;
	result: boolean;  //TODO Set default isCorrectAnswer as false
	active: boolean;  //TODO Default active true
	imageSrc: string; //TODO Load a default image background
	//imageFile: any;
	//imageName: string;
	imageTip: string;
}

export interface ISubject {
    subjectId : string;
	subjectName : string;
	subjectDesc : string;
	applicableExams : string;
	active : boolean;
	createdId : string;
	updatedId : string;
}


export interface IDropDownMaster {
	optionType : string;
	optionId : string;
	optionName : string;
}

export enum DropDownTypeEnum {
	SUBJECT = "SUBJECT",
	SOURCE = "SOURCE",
	TOPIC = "TOPIC",
	LEVEL = "LEVEL",
	EXAM = "EXAM",
	GRADE = "GRADE"
}


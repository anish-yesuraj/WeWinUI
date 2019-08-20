import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators'
import { IDropDownMaster, IQuestion } from '../ay-model/question-form.interface';


@Injectable()
export class AYDataService {

    private WeWinAPIUrl : string = "http://localhost:8080/WeWinAPI";

    private WeWinAPIUrl_DDM : string = `${this.WeWinAPIUrl}/GetDropDownMaster`;
    private WeWinAPIUrl_NEWQUES : string = `${this.WeWinAPIUrl}/CreateNewQuestion`;
    private WeWinAPIUrl_GETQUESBYID : string = `${this.WeWinAPIUrl}/GetQuestion`;
    private WeWinAPIUrl_UPDQUESBYID : string = `${this.WeWinAPIUrl}/UpdateQuestion`;

    constructor (private _httpService:HttpClient){}

    /**  LOAD DROP DOWN VALUES - START **/
    getDropDownMasterValues(ddmType : string) : Observable<IDropDownMaster[]>
    {
        return this._httpService.get<IDropDownMaster[]>
                    (`${this.WeWinAPIUrl_DDM}/${ddmType}`)
                    .pipe(catchError(this.handleErrorAndDontReport));
    }
    /**  LOAD DROP DOWN VALUES - END **/


    /**  CREATE NEW QUESTION - START **/
    createNewQuestion(newQuestion : IQuestion) : Observable<IQuestion>
    {
        let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpService.post<IQuestion>
                    (`${this.WeWinAPIUrl_NEWQUES}`, newQuestion, {headers: httpHeaders})
                    .pipe(catchError(this.handleErrorAndDontReport));
    }
    /**  CREATE NEW QUESTION - END **/


    /**  GET A QUESTION BY ID - START **/
    getQuestionByID(questionID : string) : Observable<IQuestion>
    {
        return this._httpService.get<IQuestion>
                                (`${this.WeWinAPIUrl_GETQUESBYID}/${questionID}`)
                                .pipe(catchError(this.handleErrorAndDontReport));
    }
    /**  GET A QUESTION BY ID - END **/


    /**  UPDATE A QUESTION BY ID - START **/
    updateQuestionByID(updQuestion : IQuestion)
    {
        let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpService.put<IQuestion>
                    (`${this.WeWinAPIUrl_UPDQUESBYID}`, updQuestion, {headers: httpHeaders})
                    .pipe(catchError(this.handleErrorAndDontReport));
    }
    /**  UPDATE A QUESTION BY ID - END **/





    // Error handling and report to user
    private handleErrorAndReport<T> (operation = 'operation', result?: T)
    {
        return (error: any): Observable<T> => {
                // TODO: send the error to remote logging infrastructure
                console.error(error); // log to console instead
                // TODO: better job of transforming error for user consumption
                this.log(`${operation} failed: ${error.message}`);
                // Let the app keep running by returning an empty result.
                return of(result as T);
        };
    }

    private log(message: string) {
        //this.messageService.add(`AYDataService: ${message}`);
    }
    
    // Error handling and Do not report to user
    private handleErrorAndDontReport(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = `Client Side Error: \nMessage: ${error.error.message}`;
        } else {
            // Get server-side error
            errorMessage = `Server Side Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
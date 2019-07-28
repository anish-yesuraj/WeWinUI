import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators'
import { IDropDownMaster } from '../ay-model/question-form.interface';
import { AYMessageService } from './ay-message.service';


@Injectable()
export class AYDataService {

    WeWinAPIUrl : string = "http://localhost:8080/WeWinAPI";

    WeWinAPIUrl_DDM : string = `${this.WeWinAPIUrl}/GetDropDownMaster`;

    constructor (private _httpService:HttpClient, private messageService: AYMessageService){}

    /**  LOAD DROP DOWN VALUES - START **/
    getDropDownMasterValues(ddmType : string) : Observable<IDropDownMaster[]>
    {
        return this._httpService.get<IDropDownMaster[]>(`${this.WeWinAPIUrl_DDM}/${ddmType}`)
            .pipe( 
                catchError(this.handleErrorAndDontReport)
            );
    }
    /**  LOAD DROP DOWN VALUES - END **/











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
        this.messageService.add(`AYDataService: ${message}`);
    }
    
    // Error handling and Do not report to user
    private handleErrorAndDontReport(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
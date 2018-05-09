
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class QuotesService {

    constructor(private http: HttpClient) {}

    getQuotes(keyword: string): Observable<any> {
        let requestUrl;
        switch(keyword) {
            case "no emotion":
            requestUrl = 'https://favqs.com/api/qotd';
            break;

            case "neutral":
            requestUrl = 'https://favqs.com/api/quotes/'
            break;

            default: 
            requestUrl = `https://favqs.com/api/quotes/?filter=${keyword}&type=tag`;

        }
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization" : 'Token token="e2cd0fe8241af684e00a5daa54ac041c"'
            })
        }

        return this.http
        .get(requestUrl, httpOptions)
        .pipe(catchError((error: any) => observableThrowError(error.json)));
    }
}
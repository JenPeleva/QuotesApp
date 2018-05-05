import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class QuotesService {

    constructor(private http: Http) {}

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

        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization" : 'Token token="e2cd0fe8241af684e00a5daa54ac041c"'
        });

        const options = new RequestOptions({
            headers: headers
        });
        return this.http
        .get(requestUrl, options)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json));
    }
}
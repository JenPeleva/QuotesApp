
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const CV_URL = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceLandmarks=false&returnFaceAttributes=emotion';

@Injectable()
export class EmotionService {

    constructor(private http: HttpClient) {}

    getEmotions(file): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': '262f6d57ecd04189a5e3b00f299e86c9'
            })
        }
        //const data = `{"url: "${file}"}`;
        const data = this.makeblob(file);
        return this.http
        .post(CV_URL, data, httpOptions)
        .pipe(catchError((error: any) => observableThrowError(error.json)));
    }

    makeblob(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);
            return new Blob([raw], { type: contentType });
        }
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }
   
}
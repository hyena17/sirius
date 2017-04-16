import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Translation } from '../models/translation';
import { Language } from '../models/language';

@Injectable()
export class TranslationService {


    private translationUrl = 'http://localhost:8080/poetryAPI/translations/';  // URL to web API
    constructor(private http: Http) { }

    getTranslations(poemId: number): Observable<Translation[]> {
        return this.http.get(this.translationUrl + poemId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    searchTranslations(searchKey: string): Observable<Translation[]> {
        return this.http.get(this.translationUrl + 'search/' + searchKey)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createTranslation(content: string, language: Language, poem_id: number, translated_title: string, translated_collection: string): Observable<Translation> {
        let translation = new Translation();
        translation.language = language;
        translation.content = content;
        translation.poem_id = poem_id;
        translation.translated_title = translated_title;
        translation.translated_collection = translated_collection;
        let bodyString = JSON.stringify(translation); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.translationUrl + 'create', bodyString, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

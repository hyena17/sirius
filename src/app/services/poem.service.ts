import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Writer } from '../models/writer';
import { Observable }     from 'rxjs/Observable';
import { Poem } from '../models/poem';

@Injectable()
export class PoemService {
    private poemUrl = 'http://localhost:8080/poetryAPI/poems/';  // URL to web API
    constructor(private http: Http) { }

    getPoems(id: number): Observable<Poem[]> {
        return this.http.get(this.poemUrl + id)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getPoemsByCollection(collectionId: number): Observable<Poem[]> {
        return this.http.get(this.poemUrl + 'collection/' + collectionId)
            .map(this.extractData)
            .catch(this.handleError);
    }


    searchPoems(searchKey: string): Observable<Poem[]> {
        return this.http.get(this.poemUrl + 'search/' + searchKey)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createPoem(title: string, writeId: number, collectionId: number): Observable<Poem> {
        let poem = new Poem();
        poem.title = title;
        poem.writer_id = writeId;
        poem.collection_id = collectionId;
        let bodyString = JSON.stringify(poem); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.poemUrl + 'create', bodyString, options) // ...using post request
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

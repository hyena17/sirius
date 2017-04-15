import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Writer } from '../models/writer';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class WriterService {
    private writerUrl = 'http://localhost:8080/poetryAPI/writers/';  // URL to web API
    constructor(private http: Http) { }

    getWriters(): Observable<Writer[]> {
        return this.http.get(this.writerUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    searchWriters(searchKey: string): Observable<Writer[]> {
        return this.http.get(this.writerUrl + 'search/' + searchKey)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createWriter(name: string): Observable<Writer> {
        let writer = new Writer();
        writer.name = name;
        let bodyString = JSON.stringify(writer); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.writerUrl + 'create', bodyString, options) // ...using post request
            .map(this.extractData) // ...and calling .json() on the response to return data
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

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Collection } from '../models/collection';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class CollectionService {
    private collectionUrl = 'http://localhost:8080/poetryAPI/collections/';  // URL to web API
    constructor(private http: Http) { }

    getCollections(id: number): Observable<Collection[]> {
        return this.http.get(this.collectionUrl + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createCollection(name: string, id: number): Observable<Collection> {
        let collection = new Collection();
        collection.name = name;
        collection.writer_id = id;
        let bodyString = JSON.stringify(collection); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.collectionUrl + 'create', bodyString, options) // ...using post request
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

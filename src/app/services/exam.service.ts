import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Exam } from '../models/exam';
import { Period } from '../models/period';
import { Course } from '../models/course';


import { Observable }     from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ExamService {
  private collectionUrl = environment.apiHost + '/api/exams';  // URL to web API
  constructor(private http: Http) { }

  getExams(): Observable<Exam[]> {
    return this.http.get(this.collectionUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getExamsByCourse(course): Observable<Exam[]> {
    return this.http.get(this.collectionUrl + "?filter[where][course]=" + course + "&filter[order][0]=period%20DESC&filter[order][1]=type%20ASC")
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPeriods(): Observable<Period[]> {
    return this.http.get(this.collectionUrl + "?filter[fields][period]=true").map(this.extractData)
      .catch(this.handleError);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get(this.collectionUrl + "/courses").map(this.extractData)
      .catch(this.handleError);
  }

  getCourse(codeId, universityId): Observable<Course[]> {
    return this.http.get(this.collectionUrl + "/course?code=" + codeId + "&university=" + universityId).map(this.extractData)
      .catch(this.handleError);
  }

  getExam(examId): Observable<Exam> {
    return this.http.get(this.collectionUrl + "/" + examId).map(this.extractData)
      .catch(this.handleError);
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

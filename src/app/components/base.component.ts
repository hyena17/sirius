import { Component, OnInit, EventEmitter, Input, Output, AfterViewChecked, ElementRef, ViewChild, QueryList, SimpleChanges} from '@angular/core';
import { Exam } from '../models/exam';
import { Course } from '../models/course';


import '../rxjs-operators';

@Component({
  selector: 'base-list',
  template: `
  <div class="row eq-height">
    <div class="panel col-md-6 eq-box-md panel-bordered">
        <course-list [(selectedCourse)]="selectedCourse"></course-list>
    </div>

    <div class="panel col-md-6  eq-box-md panel-bordered" >
      <div *ngIf="selectedCourse">
        <exams-list [selectedCourse]="selectedCourse" [(selectedExam)]="selectedExam"></exams-list>
      </div>
    </div>
  </div>
  <br>
  <br>
  <div *ngIf="selectedExam" class="row">
    <question-container #questioncontainerItem [selectedExam]="selectedExam" [selectedQuestions]='selectedExam.questionContainer'></question-container>
  </div>

        `,
})

export class BaseComponent implements OnInit {
  selectedCourse: Course;
  selectedExam: Exam;

  constructor() { }

  ngOnInit(): void {
  }

}

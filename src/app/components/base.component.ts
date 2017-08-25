import { Component, OnInit, EventEmitter, Input, Output, AfterViewChecked, ElementRef, ViewChild, QueryList, SimpleChanges} from '@angular/core';
import { Exam } from '../models/exam';
import { Course } from '../models/course';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExamService } from '../services/exam.service';
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
  <div *ngIf="selectedExam" class="row">
    <question-container #questioncontainerItem [selectedExam]="selectedExam" [selectedQuestions]='selectedExam.questionContainer'></question-container>
  </div>

        `,
  providers: [ExamService]
})

export class BaseComponent implements OnInit {
  selectedCourse: Course;
  selectedExam: Exam;
  errorMessage: string;


  constructor(private activatedRoute: ActivatedRoute, private examService: ExamService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let codeId = params['codeId'];
      let universityId = params['universityId'];
      let examId = params['examId'];


      if (examId === undefined) {
        this.getCourse(codeId, universityId);
      } else if (examId !== undefined) {
        this.getCourse(codeId, universityId);
        this.getExam(examId);
      }
    });
  }

  getCourse(codeId: string, universityId: string): void {
    let courses: Course[];
    this.examService.getCourse(codeId, universityId).subscribe(
      course => this.selectedCourse = course[0],
      error => this.errorMessage = <any>error
    );
    //console.log(courses);

  }

  getExam(examId: string): void {
    this.examService.getExam(examId).subscribe(
      exam => this.selectedExam = exam,
      error => this.errorMessage = <any>error
    );
  }

}

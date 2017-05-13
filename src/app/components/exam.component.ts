import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Exam } from '../models/exam';
import { Question } from '../models/question';
import { Period } from '../models/period';
import { Course } from '../models/course';

import { ExamService } from '../services/exam.service';
import '../rxjs-operators';

@Component({
  selector: 'exams-list',
  template: `

  <table class="table table-bordered table-hover ">
  <thead>
    <tr>
      <th class="text-center">#</th>
      <th >Course</th>
    </tr>
  </thead>
  <tbody>
  <tr *ngFor="let course of courses;let index = index" (click)="onSelectCourse(course)">
    <td class="text-center">{{index}}</td>
    <td >{{course._id}}</td>
  </tr>
  </tbody>
  </table>

  <div *ngIf="selectedCourse">
  <table class="table table-bordered table-hover ">
  <thead>
    <tr>
      <th class="text-center">#</th>
      <th>Period</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
  <tr *ngFor="let exam of exams;let index = index" (click)="onSelect(exam)">
    <td class="text-center">{{index}}</td>
    <td >{{exam.period}}</td>
    <td >{{exam.type}}</td>
  </tr>
  </tbody>
  </table>
  </div>

  <div  *ngIf="selectedExam">

  <div class="panel panel-colorful panel-mint">
  <div  align="center" class="panel-heading">
                 <ul>
                 <label class="panel-title">{{selectedExam.period}} : {{selectedExam.course}} - {{selectedExam.type}}</label><br/>
                 </ul>
  </div>
  </div>


  <div class="form-group panel panel-bordered panel-mint" *ngFor="let question of selectedQuestions;let index = index">
  <div class="panel-heading">
  <h3 class="panel-title"><strong>{{index+1}}) </strong>{{question.question}}</h3>
  </div>
  <div class="panel-body">
    <div *ngIf="question.image" >
      <div *ngFor="let image of question.imageUrl">
      <img id="image" class="img-fluid" alt="Responsive image" src="{{image}}" >
      </div>
      </div>

    <div class="radio" *ngFor="let answer of question.options;let indexe=index">
      <div  [(ngClass)]="selectedClass[index][indexe]">
      <input class="magic-radio" type="radio"  id="{{index}}:{{indexe}}" [(ngModel)]="selectedAnswer[index]" value="{{answer}}" name="{{question.question}}">
        <label for="{{index}}:{{indexe}}">
        <strong>{{getLetter(indexe)}}) </strong> {{answer}}</label>
      </div>
    </div>
  </div>
  </div>
  <div  align="text-right">
    <button class="btn btn-success"  (click)="evaluateExam();">Submit</button>
  </div>

  </div>
        `,
  providers: [ExamService]
})

export class ExamComponent implements OnInit {
  exams: Exam[];
  periods: Period[];
  courses: Course[];

  selectedExam: Exam;
  selectedCourse: Course;
  selectedQuestions: Question[];

  selectedAnswer: string[];
  selectedClass: string[][];

  errorMessage: string;
  mode = 'Observable';
  clase = 'has-success'

  @Output() eventListenWriter = new EventEmitter<Exam>();

  constructor(private examService: ExamService) { }

  getExams(): void {
    this.examService.getExams().subscribe(
      exams => this.exams = exams,
      error => this.errorMessage = <any>error);
  }
  getExamsByCourse(course: string): void {
    this.examService.getExamsByCourse(course).subscribe(
      exams => this.exams = exams,
      error => this.errorMessage = <any>error);
  }
  getPeriods(): void {
    this.examService.getPeriods().subscribe(
      periods => this.periods = periods,
      error => this.errorMessage = <any>error
    );
  }
  getCourses(): void {
    this.examService.getCourses().subscribe(
      courses => this.courses = courses,
      error => this.errorMessage = <any>error
    );
  }


  ngOnInit(): void {
    this.getCourses();
    this.selectedAnswer = [];
    this.selectedClass = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  }

  onSelect(exam: Exam): void {
    this.selectedExam = exam;
    this.selectedQuestions = exam.questions;
    this.selectedAnswer = [];
    this.selectedClass = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

  }
  onSelectCourse(course: Course): void {
    this.selectedCourse = course;
    this.selectedExam = null;
    this.getExamsByCourse(this.selectedCourse._id);
    this.selectedAnswer = [];
    this.selectedClass = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

  }

  getLetter(index): string {
    return String.fromCharCode(97 + index);
  }

  evaluateExam(): void {
    var contador = 0;
    var indice = 0;
    var verdadero = 0;

    for (var question of this.selectedQuestions) {
      indice = 0;
      verdadero = 0;
      for (var answer of question.options) {
        if (question.answer == answer) {
          verdadero = indice;
        }
        if (question.answer == this.selectedAnswer[contador] && this.selectedAnswer[contador] == answer) {
          this.selectedClass[contador][indice] = "text-success";


        } else if (answer == this.selectedAnswer[contador]) {
          this.selectedClass[contador][indice] = "text-danger";
        }

        indice++;
      }
      this.selectedClass[contador][verdadero] = "text-success";
      contador++;
    }
  }

}

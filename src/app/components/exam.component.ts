import { Component, OnInit, EventEmitter, Output, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { Exam } from '../models/exam';
import { Question } from '../models/question';
import { Period } from '../models/period';
import { Course } from '../models/course';

import { ExamService } from '../services/exam.service';
import '../rxjs-operators';

@Component({
  selector: 'exams-list1',
  template: `
  <div class="panel">
    <div class="panel-heading">
      <h3 class="panel-title">Lista de cursos</h3>
    </div>
    <div class="panel-body">
      <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
      <div class="row">
          <label> Search : <input #myInput type="input" placeholder="Course name..." (input)="filterItem(myInput.value)"></label>
      </div>
      <div class="row">
      <table class="table table-bordered table-hover table-striped">
      <thead>
      <tr>
        <th class="text-center">#</th>
        <th >Code</th>
        <th >Course</th>
        <th >University</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let course of filteredCourses;let index = index" (click)="onSelectCourse(course)" class="index">
          <td class="text-center">{{index}}</td>
          <td class="text-center">{{course.code}}</td>
          <td >{{course._id}}</td>
          <td class="text-center">{{course.university}}</td>
        </tr>
      </tbody>
      </table>
      </div>
      </div>
    </div>
  </div>




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
      <td>{{exam.period}}</td>
      <td>{{exam.type}}</td>
    </tr>
  </tbody>
  </table>
  </div>



  <!-- TITTLE OF EXAMEN -->
  <!-- @TODO move to another component -->
  <div  *ngIf="selectedExam"  #scrollMe>

  <div class="panel panel-colorful panel-primary">
  <div  align="center" class="panel-heading">
                 <ul>
                 <label class="panel-title">{{selectedExam.period}} : {{selectedExam.course}} - {{selectedExam.type}}</label><br/>
                 </ul>
  </div>
  </div>
  <div *ngIf="gradeClass!==undefined">
  <div [(ngClass)]="gradeClass">
  <div  align="center" class="panel-heading">
                 <ul>
                 <label class="panel-title">{{gradeMessage}} {{goodAnswers}} de {{gradeTotal}}</label><br/>
                 </ul>
  </div>
  </div>
  </div>

  <!-- DISPLAYING QUESTIONS FOR NEW JSON-->
  <div *ngIf="selectedExam.new!==undefined">
  <div class="form-group panel panel-bordered panel-mint" *ngFor="let question of selectedQuestions;let index = index">
  <div class="panel-heading">
  <h3 class="panel-title"><strong>Pregunta {{index+1}}: </strong></h3>
  </div>
  <div class="panel-body">
    <div class="angular-with-newlines" >
      {{question.question}}
    </div>
    <br>
    <div *ngIf="question.image" >
      <div *ngFor="let image of question.imageUrl">
      <img id="image" class="img-fluid" alt="Responsive image" src="{{image}}" >
      </div>
    </div>

    <div *ngIf="question.type==0">
    <div class="radio" *ngFor="let answer of question.options;let indexe=index">
      <div  [(ngClass)]="selectedClass[index][indexe]">
      <input class="magic-radio" type="radio"  id="{{index}}:{{indexe}}" [(ngModel)]="selectedAnswer[index]" value="{{answer}}" name="{{question.question}}">
        <label for="{{index}}:{{indexe}}">
        <strong>{{getLetter(indexe)}}) </strong> {{answer}}</label>
      </div>
    </div>
    </div>

    <div *ngIf="question.type==1">
    <div class="radio" *ngFor="let answer of question.options;let indexe=index">
      <div  [(ngClass)]="selectedClass[index][indexe]">
      <strong>{{getLetter(indexe)}}) </strong>
      <input type="input"  id="{{index}}:{{indexe}}" [(ngModel)]="selectedArrayAnswers[index][indexe]" value="{{answer}}" name="{{question.question}}">
      <label for="{{index}}:{{indexe}}">
       {{answer}}</label>
      </div>
    </div>
    </div>

    <div *ngIf="question.type==2" class="form-group" [(ngClass)]="selectedClass[index][0]">
      <input type="text" class="form-control" [(ngModel)]="selectedAnswer[index]" placeholder="type your answer">
    </div>
  </div>
  </div>
  <div  align="text-right">
    <button class="btn btn-success"  (click)="evaluateExam();">Submit</button>
  </div>

  </div>




  <!-- DISPLAYING QUESTIONS FOR OLD JSON-->
  <div *ngIf="selectedExam.new==undefined">
  <div class="form-group panel panel-bordered panel-mint" *ngFor="let question of selectedQuestions;let index = index">
  <div class="panel-heading">
  <h3 class="panel-title"><strong>Pregunta {{index+1}}: </strong></h3>
  </div>
  <div class="panel-body">
    <div class="angular-with-newlines" >
      {{question.question}}
    </div>
    <br>
    <div *ngIf="question.image" >
      <div *ngFor="let image of question.imageUrl">
      <img id="image" class="img-fluid" alt="Responsive image" src="{{image}}" >
      </div>
    </div>

    <div *ngIf="question.type==0">
    <div class="radio" *ngFor="let answer of question.options;let indexe=index">
      <div  [(ngClass)]="selectedClass[index][indexe]">
      <input class="magic-radio" type="radio"  id="{{index}}:{{indexe}}" [(ngModel)]="selectedAnswer[index]" value="{{answer}}" name="{{question.question}}">
        <label for="{{index}}:{{indexe}}">
        <strong>{{getLetter(indexe)}}) </strong> {{answer}}</label>
      </div>
    </div>
    </div>

    <div *ngIf="question.type==1">
    <div class="radio" *ngFor="let answer of question.options;let indexe=index">
      <div  [(ngClass)]="selectedClass[index][indexe]">
      <strong>{{getLetter(indexe)}}) </strong>
      <input type="input"  id="{{index}}:{{indexe}}" [(ngModel)]="selectedArrayAnswers[index][indexe]" value="{{answer}}" name="{{question.question}}">
      <label for="{{index}}:{{indexe}}">
       {{answer}}</label>
      </div>
    </div>
    </div>

    <div *ngIf="question.type==2" class="form-group" [(ngClass)]="selectedClass[index][0]">
      <input type="text" class="form-control" [(ngModel)]="selectedAnswer[index]" placeholder="type your answer">
    </div>
  </div>
  </div>
  <div  align="text-right">
    <button class="btn btn-success"  (click)="evaluateExam();">Submit</button>
  </div>

  </div>
  </div>



        `,
  providers: [ExamService]
})

export class ExamComponent implements OnInit {
  exams: Exam[];
  periods: Period[];
  courses: Course[];
  filteredCourses: Course[];

  selectedExam: Exam;
  selectedCourse: Course;
  selectedQuestions: Question[];

  selectedAnswer: string[];
  selectedArrayAnswers: string[][];
  selectedClass: string[][];

  goodAnswers: number;
  badAnswers: number;
  gradeClass: string;
  gradeMessage: string;
  gradeTotal: number;

  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  errorMessage: string;
  mode = 'Observable';

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
  getfilteredCourses(): void {
    this.examService.getCourses().subscribe(
      courses => this.filteredCourses = courses,
      error => this.errorMessage = <any>error
    );
  }


  ngOnInit(): void {
    this.getCourses();
    this.getfilteredCourses();


    this.selectedAnswer = [];
    this.selectedArrayAnswers = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.selectedClass = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  }

  onSelect(exam: Exam): void {
    this.selectedExam = exam;
    if (exam.new == false) {
      this.selectedQuestions = exam.questions;
    } else {
      this.selectedQuestions = exam.questions;
    }
    this.selectedAnswer = [];
    this.selectedArrayAnswers = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.selectedClass = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.goodAnswers = 0;
    this.badAnswers = 0;
    this.gradeClass = undefined;
    this.gradeMessage = undefined;
    this.gradeTotal = 0;
  }
  onSelectCourse(course: Course): void {
    this.selectedCourse = course;
    this.selectedExam = null;
    this.getExamsByCourse(this.selectedCourse._id);
    this.selectedAnswer = [];
    this.selectedArrayAnswers = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.selectedClass = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.goodAnswers = 0;
    this.badAnswers = 0;
    this.gradeClass = undefined;
    this.gradeMessage = undefined;
  }

  getLetter(index): string {
    return String.fromCharCode(97 + index);
  }

  evaluateExam(): void {
    var contador = 0;
    var indice = 0;
    var verdadero = 0;
    this.goodAnswers = 0;
    this.badAnswers = 0;
    for (var question of this.selectedQuestions) {
      indice = 0;
      verdadero = 0;
      //Pregunta con opciones para que el alumno elija una respuesta
      if (question.type == 0) {
        for (var answer of question.options) {
          if (question.answer == answer) {
            verdadero = indice;
          }
          if (question.answer == this.selectedAnswer[contador] && this.selectedAnswer[contador] == answer) {
            this.selectedClass[contador][indice] = "text-success";
            this.goodAnswers = this.goodAnswers + question.points;
          } else if (answer == this.selectedAnswer[contador]) {
            this.selectedClass[contador][indice] = "text-danger";
            this.badAnswers = this.badAnswers + question.points;
          }
          indice++;
        }
        this.selectedClass[contador][verdadero] = "text-success";
      }

      if (question.type == 1) {
        let indiceQuestion1 = 0;
        for (var option of question.options) {
          if (question.answers[indiceQuestion1].toLowerCase() == this.selectedArrayAnswers[contador][indiceQuestion1].toLowerCase()) {
            this.selectedClass[contador][indiceQuestion1] = "text-success";
            this.goodAnswers = this.goodAnswers + (question.points / question.answers.length);
          } else {
            this.selectedClass[contador][indiceQuestion1] = "text-danger";
            this.badAnswers = this.badAnswers + (question.points / question.answers.length);
          }
          indiceQuestion1++;
        }
        indice++;
      }

      //Pregunta con input para que el alumno escriba su respuesta
      //para ponerlo rojo o verde asumimos que el input siempre sera la primera opcion
      if (question.type == 2) {
        if (question.answer.toLowerCase() == this.selectedAnswer[contador].toLowerCase()) {
          this.selectedClass[contador][0] = "has-success";
          this.goodAnswers = this.goodAnswers + question.points;
        } else {
          this.selectedClass[contador][0] = "has-error";
          this.badAnswers = this.badAnswers + question.points;
        }
      }
      contador++;
    }




    var note = this.goodAnswers / (this.goodAnswers + this.badAnswers) * 100;
    this.gradeTotal = (this.goodAnswers + this.badAnswers);

    if (note >= 75) {
      this.gradeClass = "panel panel-colorful panel-success";
      this.gradeMessage = "Muy bien :D Sacaste ";
    }
    else if (note >= 50 && note < 75) {
      this.gradeClass = "panel panel-colorful panel-warning";
      this.gradeMessage = "Estudia un poco mas vas en buen camino :). Sacaste ";

    } else if (note >= 25 && note < 50) {
      this.gradeClass = "panel panel-colorful panel-danger";
      this.gradeMessage = "Estudia mas :(. Sacaste ";
    } else {
      this.gradeClass = "panel panel-colorful panel-dark";
      this.gradeMessage = "TROLOLOL . Sacaste ";
    }

    this.myScrollContainer.nativeElement.scrollIntoView(true);

  }
  assignCopy() {
    this.filteredCourses = Object.assign([], this.courses);
  }

  filterItem(value) {
    if (!value) this.assignCopy(); //when nothing has typed
    this.filteredCourses = Object.assign([], this.courses).filter(
      course => course._id.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }
}

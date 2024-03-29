import { Component, OnInit, EventEmitter, Output, AfterViewChecked, SimpleChanges, ElementRef, ViewChild, Input, QueryList} from '@angular/core';
import { Exam } from '../models/exam';
import { Question } from '../models/question';
import { Period } from '../models/period';
import { Course } from '../models/course';
import { QuestionContainer} from '../models/questionContainer';


import { ExamService } from '../services/exam.service';

import {QuestionComponent} from '../components/question.component';

import '../rxjs-operators';

@Component({
  selector: 'question-container',
  template: `
  <!-- TITTLE OF EXAMEN -->
  <!-- @TODO move to another component -->
  <div  *ngIf="selectedExam"  class="panel" >
    <div class="panel-colorful panel-mint" #scrollMe>
      <div  align="center" class="panel-heading">
          <label class="panel-title">{{selectedExam.course}}</label>
      </div>
      <div  align="center" class="panel-body">
          <p class="text-bold">{{selectedExam.period}} {{selectedExam.type}}</p>
      </div>
    </div>
    <div *ngIf="gradeClass!==undefined" [(ngClass)]="gradeClass" >
      <div   align="center" class="panel-heading">
            <label class="panel-title">{{gradeMessage}} {{goodAnswers}} de {{gradeTotal}}</label>
      </div>
    </div>
    <!-- DISPLAYING QUESTIONS FOR NEW JSON-->
    <div *ngIf="selectedExam.new!==undefined" >
      <div class="panel-bordered panel-info" *ngFor="let questionContainer of listQuestionContainer;let index = index">
        <div class="panel-heading">
          <h3 class="panel-title"><strong>Pregunta {{index+1}}: </strong></h3>
        </div>
        <div class="panel-body">
          <div>
            <label [MathJax]="questionContainer.description" style="text-align:justify">{{questionContainer.description}}</label>
          </div>
          <br>
          <div *ngFor="let image of questionContainer.imageUrl">
            <img id="image" class="img-fluid" alt="Responsive image" src="{{image}}" width="540" height="400">
          </div>
          <br>
          <div *ngFor="let question of questionContainer.questions; let indexQuestion=index">
            <question [question]="question" [indexQuestion]="indexQuestion" [totalQuestion]="questionContainer.questions.length"></question>
          </div>
        </div>
      </div>
      <div  align="text-right" style="position:fixed;bottom: 50px;right:20px">
        <button class="btn btn-rounded btn-floating btn-success" (click)="evaluateExam();">Enviar Respuestas</button>
      </div>
    </div>
  </div>

        `,
  providers: [ExamService]
})

export class QuestionContainerComponent implements OnInit {
  @Input() selectedExam: Exam;
  @Input() listQuestionContainer: QuestionContainer[];

  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  goodAnswers: number;
  badAnswers: number;
  gradeClass: string;
  gradeMessage: string;
  gradeTotal: number;

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.gradeClass = undefined;
  }

  evaluateExam(): void {
    var contador = 0;
    var indice = 0;
    var verdadero = 0;
    var statementIndex = 0;

    this.goodAnswers = 0;
    this.badAnswers = 0;

    for (var questionContainer of this.listQuestionContainer) {
      indice = 0;
      verdadero = 0;
      for (var question of questionContainer.questions) {
        statementIndex = 0;
        if (question.statements == undefined) {
          question.statements = [""];
          this.evaluateQuestion(question, statementIndex);
          question.statements = undefined;
          this.showRightAnswer(question, statementIndex);
        } else {
          for (var statement of question.statements) {
            //Pregunta con input para que el alumno escriba su respuesta
            //para ponerlo rojo o verde asumimos que el input siempre sera la primera opcion
            this.evaluateQuestion(question, statementIndex);
            this.showRightAnswer(question, statementIndex);
            statementIndex++;
          }
        }
      }
      contador++;
    }
    this.displayGrade();

  }

  showRightAnswer(question: Question, statementIndex: number): void {
    var verdadero = 0;
    var indice = 0;
    if (question.type == 0) {
      for (var option of question.options) {
        if (question.answer == option) {
          verdadero = indice;
        }
        if (question.answer == question.answerSelected && question.answerSelected == option) {
          question.selectedClass[indice] = "text-success";
        } else if (option == question.answerSelected) {
          question.selectedClass[indice] = "text-danger";
        } else {
          question.selectedClass[indice] = "";
        }
        indice++;
      }
      question.selectedClass[verdadero] = "text-success";
    }
  }

  evaluateQuestion(question: Question, statementIndex: number): void {


    if (question.partialAnswer[statementIndex] == undefined) {
      question.partialAnswer[statementIndex] = "";
    }

    if (question.type == 0) {
      if (question.answerSelected == undefined) {
        question.answerSelected = "";
      }


      if (question.answerSelected.toLowerCase() == question.answer.toLowerCase()) {
        //this.selectedClass[contador][0] = "has-success";
        this.goodAnswers = this.goodAnswers + (question.points / question.statements.length);
      } else {
        //this.selectedClass[contador][0] = "has-error";
        this.badAnswers = this.badAnswers + (question.points / question.statements.length);
      }
    }

    if (question.type == 2) {
      if (question.answers[statementIndex].toLowerCase() == question.partialAnswer[statementIndex].toLowerCase()) {
        //this.selectedClass[contador][0] = "has-success";
        this.goodAnswers = this.goodAnswers + (question.points / question.statements.length);
      } else {
        //this.selectedClass[contador][0] = "has-error";
        this.badAnswers = this.badAnswers + (question.points / question.statements.length);
      }
    }
    if (question.type == 5) {
      var temporatido = 0;

      for (let indexParcial = 0; indexParcial < question.partialAnswerFormatted[statementIndex].length; indexParcial++) {


        if (question.partialAnswerFormatted[statementIndex][indexParcial] != undefined) {
          if (question.answersPartials[statementIndex][temporatido].toLowerCase() == question.partialAnswerFormatted[statementIndex][indexParcial].toLowerCase()) {
            //this.selectedClass[contador][0] = "has-success";
            this.goodAnswers = this.goodAnswers + ((question.points / question.statements.length) / question.answersPartials.length);
          } else {
            //this.selectedClass[contador][0] = "has-error";
            this.badAnswers = this.badAnswers + (question.points / question.statements.length);
          }
          temporatido++;
        }
      }
    }
  }

  displayGrade(): void {
    var note = this.goodAnswers / (this.goodAnswers + this.badAnswers) * 100;
    this.gradeTotal = (this.goodAnswers + this.badAnswers);

    if (note >= 75) {
      this.gradeClass = "panel-colorful panel-success";
      this.gradeMessage = "Muy bien :D Sacaste ";
    }
    else if (note >= 50 && note < 75) {
      this.gradeClass = "panel-colorful panel-warning";
      this.gradeMessage = "Estudia un poco mas vas en buen camino :). Sacaste ";

    } else if (note >= 25 && note < 50) {
      this.gradeClass = "panel-colorful panel-danger";
      this.gradeMessage = "Estudia mas :(. Sacaste ";
    } else {
      this.gradeClass = "panel-colorful panel-dark";
      this.gradeMessage = "TROLOLOL . Sacaste ";
    }
    this.myScrollContainer.nativeElement.scrollIntoView(false);
  }
}

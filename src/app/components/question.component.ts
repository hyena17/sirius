import { Component, OnInit, EventEmitter, Output, AfterViewChecked, ElementRef, ViewChild, Input} from '@angular/core';
import { Exam } from '../models/exam';
import { Question } from '../models/question';
import { Period } from '../models/period';
import { Course } from '../models/course';
import { QuestionContainer} from '../models/questionContainer';

import { ExamService } from '../services/exam.service';

import '../rxjs-operators';

@Component({
  selector: 'question',
  template: `
  <div *ngIf="question">

  <label *ngIf="question.statements!==undefined" >{{getLetter(indexQuestion)}})</label>
  <!--<div [innerHTML]="question.question"></div>-->
  <div [MathJax]="question.question">{{question.question}}</div>
  <br>
  <div *ngIf="question.imageUrl" >
    <div *ngFor="let image of question.imageUrl">
      <img id="image" class="img-fluid" alt="Responsive image" src="{{image}}" >
    </div>
  </div>

    <div *ngIf="question.type==0" >
      <md-radio-group  class="example-radio-group" [(ngModel)]="question.answerSelected" >
        <div  *ngFor="let answer of question.options;let indexe=index" >
          <md-radio-button class="example-radio-button"[value]="answer">
            <strong>{{getLetter(indexe)}}) </strong> {{answer}}
          </md-radio-button>
        </div>
      </md-radio-group>
    </div>

    <div *ngIf="question.type==2" >
      <div *ngFor="let statement of question.statements; let indexStatement = index">
        <label class="control-label" [innerHTML]="statement"></label>
        <input type="text" class="form-control" name="question.{{indexStatement}}.answer" [(ngModel)]="question.partialAnswer[indexStatement]">
        <br>
      </div>
    </div>

    <div *ngIf="question.type==5"  >
      <div *ngFor="let statement of question.statements; let indexStatement = index">
      <form class="form-inline">
        <div class="row">
          <div  class="form-group" *ngFor="let statementPartial of question.statementsFormatted[indexStatement];let indexStatementPartial = index">
            <div   *ngIf="statementPartial!='_____'" >
              <label class="control-label">{{statementPartial}}</label>
            </div>
            <div *ngIf="statementPartial=='_____'">
              <input  type="text"  name="question.{{indexStatement}}.answer" [(ngModel)]="question.partialAnswerFormatted[indexStatement][indexStatementPartial]">
            </div>
          </div>
        </div>
      </form>

      <br>

      </div>
    </div>
  </div>
  `,
  providers: [ExamService]
})

export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() indexQuestion: number;

  errorMessage: string;

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.question.partialAnswer = [];
    this.question.partialAnswerFormatted = [[], [], [], [], [], []];
  }

  getLetter(index): string {
    return String.fromCharCode(97 + index);
  }


}

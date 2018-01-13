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

  <div *ngIf="question.statements!==undefined" class="row container">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-1"  *ngIf="getNumberForStatements()">
          <label> <strong>{{getNumber()}}</strong></label>
        </div>
        <div class="col-md-11">
          <label [MathJax]="question.question" style="text-align:justify">{{question.question}}</label>
        </div>
      </div>
      <div class="row" *ngIf="question.type==2">
            <div *ngFor="let statement of question.statements; let indexStatement = index">
              <div class="col-md-1">
              </div>
              <div class="col-md-1">
                {{getLetter(indexStatement)}}
              </div>
              <div class="col-md-10">
                  <div class="row">
                    <label class="control-label" [innerHTML]="statement"></label>
                  </div>
                  <div class="row">
                    <textarea type="text" class="form-control" name="question.{{indexStatement}}.answer"  [(ngModel)]="question.partialAnswer[indexStatement]"></textarea>
                    <br>
                  </div>
              </div>

            </div>
            <br>
      </div>
    </div>
    <div class="col-md-6">
    </div>
  </div>

  <div *ngIf="question.statements===undefined">
    <label [MathJax]="question.question" style="text-align:justify">{{question.question}}</label>
  </div>
  <br>

  <div *ngIf="question.imageUrl" >
    <div *ngFor="let image of question.imageUrl">
      <img id="image" class="img-fluid" alt="Responsive image" src="{{image}}" width="540" height="400">
    </div>
  </div>

    <div *ngIf="question.type==0" >
      <md-radio-group  class="example-radio-group" [(ngModel)]="question.answerSelected" >
        <div  *ngFor="let answer of question.options;let indexe=index" [(ngClass)]="question.selectedClass[indexe]" >
          <mat-radio-button class="example-radio-button"[value]="answer">
            {{getLetter(indexe)}} {{answer}}
          </mat-radio-button>
        </div>
      </md-radio-group>
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
  @Input() totalQuestion: number;

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.question.partialAnswer = [];
    this.question.partialAnswerFormatted = [[], [], [], [], [], []];
    this.question.selectedClass = ["", "", "", "", "", "", ""];

  }

  getStatement(statement, indexStatement): string {
    return String.fromCharCode(97 + indexStatement) + ") " + statement;
  }
  getLetter(index): string {
    return String.fromCharCode(97 + index) + ")";
  }

  getNumber(): string {
    return String.fromCharCode(49 + this.indexQuestion) + ")";
  }

  getNumberForStatements(): boolean {
    return true;
  }


}

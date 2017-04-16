import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Exam } from '../models/exam';
import { Question } from '../models/question';
import { ExamService } from '../services/exam.service';
import '../rxjs-operators';

@Component({
    selector: 'exams-list',
    template: `
              <div class="list-group">
              <ul >
              <li *ngFor="let exam of exams" class="list-group-item list-group-item-action" (click)="onSelect(exam)">
                <span class="badge">{{exam.university}}</span> {{exam.period}}
              </li>
              </ul>
              </div>

              <div class="list-group">
                <div *ngIf="selectedExam">
                <label>{{selectedExam.university}}</label><br/>
                <label>{{selectedExam.period}}</label><br/>
                <label>{{selectedExam.course}}</label><br/>
                </div>
                <div *ngIf="selectedExam">
                <ul >
                <li *ngFor="let question of selectedQuestions;let index = index" class="list-group-item list-group-item-action">
                  <span class="badge">{{question.question}}</span>
                  <div class="form-check"  *ngFor="let answer of question.options;let indexe=index"  >
                    <div [(ngClass)]="selectedClass[index][indexe]">
                        <label class="form-check-label"  >
                          <input type="radio"  [(ngModel)]="selectedAnswer[index]" value="{{answer}}" name="{{question.question}}"
                          class="form-check-input">
                            {{answer}}
                        </label>
                      </div>
                  </div>

                </li>
                </ul>
                <button class="btn btn-primary"  (click)="evaluateExam();">Submit</button>
                </div>

              </div>


              `,
    providers: [ExamService]
})

export class ExamComponent implements OnInit {
    exams: Exam[];
    selectedExam: Exam;
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
    ngOnInit(): void {
        this.getExams();
        this.selectedAnswer = [];
        this.selectedClass = [[], [], [], [], []];
    }

    onSelect(exam: Exam): void {
        this.selectedExam = exam;
        this.selectedQuestions = exam.questions;
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
                    this.selectedClass[contador][indice] = "has-success";

                } else if (answer == this.selectedAnswer[contador]) {
                    this.selectedClass[contador][indice] = "has-danger";
                }

                indice++;
            }
            this.selectedClass[contador][verdadero] = "has-success";
            contador++;
        }

        //  alert(this.selectedAnswer);
    }

}

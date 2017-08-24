import { Component, OnInit, EventEmitter, Input, Output, AfterViewChecked, ElementRef, ViewChild, QueryList, SimpleChanges} from '@angular/core';
import { Exam } from '../models/exam';
import { Question } from '../models/question';
import { Period } from '../models/period';
import { Course } from '../models/course';
import { QuestionContainer } from '../models/questionContainer';

import { QuestionContainerComponent } from '../components/questionContainer.component';

import { ExamService } from '../services/exam.service';

import '../rxjs-operators';

@Component({
  selector: 'exams-list',
  template: `
    <div class="panel-heading">
      <h3 class="panel-title">Lista de examenes >> {{selectedCourse._id}}</h3>
    </div>
    <br><br><br><br>
    <div class="panel-body">
      <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
      <div class="row table-responsive">
        <table class="table table-bordered table-hover table-striped" [mfData]="exams" #mf="mfDataTable" [mfRowsOnPage]="6">
          <thead>
            <tr>
              <th class="text-center min-width col-md-0">#</th>
              <th class="text-center min-width col-md-0">Periodo</th>
              <th class="text-center min-width col-md-3">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let exam of mf.data;let index=index" (click)="onSelectExam(exam)">
              <td class="text-center col-md-0">{{index+1}}</td>
              <td class="text-center col-md-0"><div [ngClass]="periodClass(exam.period)">{{exam.period}}</div></td>
              <td class="text-center col-md-3">{{exam.type}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">
                <mfBootstrapPaginator class="pull-right"></mfBootstrapPaginator>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  </div>
        `,
  providers: [ExamService]
})

export class ExamComponent implements OnInit {
  @Input() selectedCourse: Course;

  @Input() selectedExam: Exam;
  @Output() selectedExamChange = new EventEmitter<Exam>();

  exams: Exam[];

  errorMessage: string;

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getExamsByCourse(this.selectedCourse._id);
  }

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


  onSelectExam(exam: Exam): void {
    this.selectedExam = exam;
    this.selectedExamChange.emit(exam);
  }

  periodClass(period: string): string {
    var periodClass;
    switch (period) {
      case "2012-0":
        periodClass = "label label-table label-purple";
        break;
      case "2012-1":
        periodClass = "label label-table label-success";
        break;
      case "2012-2":
        periodClass = "label label-table label-pink";
        break;

      case "2013-0":
        periodClass = "label label-table label-warning";
        break;
      case "2013-1":
        periodClass = "label label-table label-info";
        break;
      case "2013-2":
        periodClass = "label label-table label-mint";
        break;

      case "2014-0":
        periodClass = "label label-table label-primary";
        break;
      case "2014-1":
        periodClass = "label label-table label-danger";
        break;
      case "2014-2":
        periodClass = "label label-table label-warning";
        break;

      case "2015-0":
        periodClass = "label label-table label-purple";
        break;
      case "2015-1":
        periodClass = "label label-table label-success";
        break;
      case "2015-2":
        periodClass = "label label-table label-pink";
        break;

      case "2016-0":
        periodClass = "label label-table label-warning";
        break;
      case "2016-1":
        periodClass = "label label-table label-info";
        break;
      case "2016-2":
        periodClass = "label label-table label-mint";
        break;

      case "2017-0":
        periodClass = "label label-table label-primary";
        break;
      case "2017-1":
        periodClass = "label label-table label-danger";
        break;
      case "2017-2":
        periodClass = "label label-table label-warning";
        break;
      default:
        periodClass = "label label-table label-default";
    }
    return periodClass;
  }

}

import { Component, OnInit, EventEmitter, Input, Output, AfterViewChecked, ElementRef, ViewChild, QueryList} from '@angular/core';
import { Exam } from '../models/exam';
import { Question } from '../models/question';
import { Period } from '../models/period';
import { Course } from '../models/course';
import { QuestionContainer } from '../models/questionContainer';

import { QuestionContainerComponent } from '../components/questionContainer.component';

import { ExamService } from '../services/exam.service';

import '../rxjs-operators';

@Component({
  selector: 'course-list',
  template: `
    <div class="panel-heading">
      <h3 class="panel-title col-md-12">Lista de cursos</h3>
    </div>
    <div class="panel-body">

      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-md-1 control-label"> Buscar:</label>
          <div class="col-md-11">
            <input #myInput type="input" class="form-control input-md" (input)="filterItem(myInput.value)">
          </div>
        </div>
      </form>

      <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">

      <br/>
      <div class="row  table-responsive">
        <table class="table table-bordered table-hover table-striped"  [mfData]="filteredCourses" #mf="mfDataTable" [mfRowsOnPage]="6">
          <thead>
            <tr>
              <th class="text-center col-md-1">Codigo</th>
              <th class="col-md-3">Curso</th>
              <th class="text-center col-md-1">Universidad</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let course of mf.data" (click)="onSelectCourse(course)">
              <td class="text-center">{{course.code}}</td>
              <td >{{course._id}}</td>
              <td class="text-center">{{course.university}}</td>
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

export class CourseComponent implements OnInit {
  @Input() selectedCourse: Course;
  @Output() selectedCourseChange = new EventEmitter<Course>();

  courses: Course[];
  filteredCourses: Course[];
  errorMessage: string;

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.getCourses();
    this.getfilteredCourses();
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

  onSelectCourse(course: Course): void {
    this.selectedCourse = course;
    console.log(course);
    this.selectedCourseChange.emit(course);
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

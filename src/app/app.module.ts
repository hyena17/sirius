import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { MdRadioModule } from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTableModule} from "angular2-datatable";

import { AppComponent }   from './app.component';
import { BaseComponent} from './components/base.component';
import { CourseComponent} from './components/course.component';
import { ExamComponent} from './components/exam.component';
import { QuestionComponent} from './components/question.component';
import { QuestionContainerComponent } from './components/questionContainer.component';

import {MathJaxDirective} from './components/mathjax.directive';


@NgModule({
  imports: [NgbModule, DataTableModule, BrowserModule, FormsModule, HttpModule, JsonpModule, MdRadioModule,
    RouterModule.forRoot([
      {
        path: 'exam',
        component: BaseComponent
      },
      {
        path: '',
        redirectTo: '/exam',
        pathMatch: 'full'
      },
    ])],
  exports: [MathJaxDirective],
  declarations: [AppComponent, ExamComponent, QuestionComponent, QuestionContainerComponent, CourseComponent, BaseComponent, MathJaxDirective],
  bootstrap: [AppComponent]
})
export class AppModule {

}

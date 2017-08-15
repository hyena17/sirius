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
import { ExamNewComponent} from './components/examNew.component';
import { QuestionComponent} from './components/question.component';
import { QuestionContainerComponent } from './components/questionContainer.component';


@NgModule({
  imports: [NgbModule, DataTableModule, BrowserModule, FormsModule, HttpModule, JsonpModule, MdRadioModule,
    RouterModule.forRoot([
      {
        path: 'exam',
        //component: ExamComponent
        component: BaseComponent
      },
      {
        path: '',
        redirectTo: '/exam',
        pathMatch: 'full'
      },
    ])],
  declarations: [AppComponent, ExamNewComponent, QuestionComponent, QuestionContainerComponent, CourseComponent, BaseComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}

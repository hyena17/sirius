import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }   from './app.component';
import { ExamComponent} from './components/exam.component';


@NgModule({
  imports: [NgbModule, BrowserModule, FormsModule, HttpModule, JsonpModule,
    RouterModule.forRoot([
      {
        path: 'exam',
        component: ExamComponent
      },
      {
        path: '',
        redirectTo: '/exam',
        pathMatch: 'full'
      },
    ])],
  declarations: [AppComponent, ExamComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}

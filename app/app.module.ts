import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2CompleterModule } from "ng2-completer";

import { AppComponent }   from './app.component';
import { WriterDetailsComponent } from './components/writer-details.component';
import { WriterListComponent } from './components/writer-list.component';
import { WriterComponent } from './components/writer.component';
import { TranslationComponent} from './components/translation.component';
import { DashboardComponent} from './components/dashboard.component';
import { SearchComponent} from './components/search.component';
import { ExamComponent} from './components/exam.component';

@NgModule({
    imports: [NgbModule, BrowserModule, Ng2CompleterModule, FormsModule, HttpModule, JsonpModule,
        RouterModule.forRoot([
            {
                path: 'writer',
                component: WriterComponent
            },
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
    declarations: [AppComponent, WriterDetailsComponent, TranslationComponent, WriterListComponent, DashboardComponent, WriterComponent, SearchComponent, ExamComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

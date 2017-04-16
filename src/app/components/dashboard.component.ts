import { Component, OnInit } from '@angular/core';
import { Writer } from '../models/writer';
import { Poem } from '../models/poem';
import { WriterService } from '../services/writer.service';
import '../rxjs-operators';

@Component({
    selector: 'dashboard',
    template: `
    <div class="row">
      <search></search>
    </div>
    <br/>
    <div class="row">
    <div class="col-md-4">
    
    <writers-list (eventListenWriter)="eventListenWriter($event)"></writers-list>
    </div>

    <div class="col-md-8">
      <div *ngIf="selectedWriter">
        <writer-detail [writer]="selectedWriter"></writer-detail>
      </div>
    </div>
    </div>
    `
})

export class DashboardComponent {
    selectedWriter: Writer;
    title = 'I am the poet of the body, I am the poet of the soul';
    eventListenWriter(writer: Writer): void {
        this.selectedWriter = writer;
    }
}

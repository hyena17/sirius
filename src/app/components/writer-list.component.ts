import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Writer } from '../models/writer';
import { Poem } from '../models/poem';
import { WriterService } from '../services/writer.service';
import '../rxjs-operators';

@Component({
    selector: 'writers-list',
    template: `
              <div class="list-group">
              <ul >
              <li *ngFor="let writer of writers" class="list-group-item list-group-item-action" (click)="onSelect(writer)">
                <span class="badge">{{writer.id}}</span> {{writer.name}}
              </li>
              </ul>
              </div>
              `,
    providers: [WriterService]
})

export class WriterListComponent implements OnInit {
    writers: Writer[];
    selectedWriter: Writer;
    errorMessage: string;
    mode = 'Observable';

    @Output() eventListenWriter = new EventEmitter<Writer>();

    constructor(private writerService: WriterService) { }

    getWriters(): void {
        this.writerService.getWriters().subscribe(
            writers => this.writers = writers,
            error => this.errorMessage = <any>error);
    }
    ngOnInit(): void {
        this.getWriters();
    }
    onSelect(writer: Writer): void {
        this.selectedWriter = writer;
        this.eventListenWriter.emit(writer);
    }
}

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Writer } from '../models/writer';
import { Poem } from '../models/poem';
import { PoemService } from '../services/poem.service';
import { TranslationService } from '../services/translation.service';
import '../rxjs-operators';

@Component({
    selector: 'writer-detail',
    template: `
          <div *ngIf="writer">
            <h2 style="margin-left: 40px;">{{writer.name}}</h2>
            <div class="list-group">
              <ul >
              <li *ngFor="let poem of poems" (click)="onSelect(poem)"  class="list-group-item list-group-item-action">
                <span  >{{poem.id}}</span> {{poem.title}}
              </li>
              </ul>
            </div>
            <div *ngIf="selectedPoem">
              <translation-component [poem]="selectedPoem"></translation-component>
            </div>
        </div>`
    ,
    providers: [PoemService]
})
export class WriterDetailsComponent {
    @Input()
    writer: Writer;

    selectedPoem: Poem;
    poems: Poem[];
    errorMessage: string;
    mode = 'Observable';

    constructor(private poemService: PoemService) {
    }

    findPoems(writerId): void {
        this.poemService.getPoems(writerId).subscribe(
            poems => this.poems = poems,
            error => this.errorMessage = <any>error);
    }
    ngOnInit(): void {
        this.findPoems(this.writer.id);
    }
    onSelect(poem: Poem): void {
        this.selectedPoem = poem;
    }
    ngOnChanges(changes: any) {
        this.findPoems(changes.writer.currentValue.id);
        this.selectedPoem = null;
    }
}

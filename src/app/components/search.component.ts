import { Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import { Writer } from '../models/writer';
import { Poem } from '../models/poem';
import { Translation } from '../models/translation';
import { WriterService } from '../services/writer.service';
import { PoemService } from '../services/poem.service';
import { TranslationService } from '../services/translation.service';

import '../rxjs-operators';


@Component({
    selector: 'search',
    template: `
      <div class="col-md-4" style="margin-left: 40px;">
      <input #search>
      <button  (click)="searchWriters(search.value);">search</button>
      </div>

      <div class="col-md-8">
      <div class="list-group" *ngIf="writers">
      <h2 style="margin-left: 40px;">Writers</h2>
      <ul >
      <li *ngFor="let writer of writers" class="list-group-item list-group-item-action" >
        <span class="badge">{{writer.id}}</span> {{writer.name}}
      </li>
      </ul>
      </div>

      <div class="list-group" *ngIf="poems">
        <h2 style="margin-left: 40px;">Poems</h2>
        <ul >
        <li *ngFor="let poem of poems" (click)="onSelect(poem)"  class="list-group-item list-group-item-action">
          <span  >{{poem.id}}</span> {{poem.title}}
        </li>
        </ul>
      </div>

      <div class="list-group" *ngIf="translations">
      <h2 style="margin-left: 40px;">Translations</h2>
      <ul >
      <li *ngFor="let translation of Translations" class="list-group-item list-group-item-action" >
        <span class="badge">{{translation.id}}</span> {{translation.content}}
      </li>
      </ul>
      </div>
      </div>

    `,
    providers: [WriterService, PoemService, TranslationService]
})

export class SearchComponent {
    selectedWriter: Writer;
    writers: Writer[];
    poems: Poem[];
    translations: Translation[];
    errorMessage: string;

    @ViewChild('search') private searchInput = null;
    constructor(private writerService: WriterService, private poemService: PoemService, private translationService: TranslationService) {
    }

    eventListenWriter(writer: Writer): void {
        this.selectedWriter = writer;
    }
    searchWriters(searchKey: string): void {
        this.writerService.searchWriters(searchKey).subscribe(
            writers => this.writers = writers,
            error => this.errorMessage = <any>error,
            () => this.searchPoems(this.searchInput.nativeElement.value));
    }

    searchPoems(searchKey: string): void {
        this.poemService.searchPoems(searchKey).subscribe(
            poems => this.poems = poems,
            error => this.errorMessage = <any>error,
            () => this.searchTranslations(this.searchInput.nativeElement.value));
    }

    searchTranslations(searchKey: string): void {
        this.translationService.searchTranslations(searchKey).subscribe(
            translations => this.translations = translations,
            error => this.errorMessage = <any>error);
    }
}

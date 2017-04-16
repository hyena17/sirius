import { Component, Input, OnInit, OnChanges, SimpleChanges, NgModule } from '@angular/core';
import { Poem } from '../models/poem';
import { Translation } from '../models/translation';
import { TranslationService } from '../services/translation.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import '../rxjs-operators';

@Component({
    selector: 'translation-component',
    template: `
    <div class="row" style="margin-left: 40px;">
      <div class="col-md-4" >
        <div class="d-inline-block dropdown" ngbDropdown>
          <button aria-haspopup="true" aria-expanded="false" class="btn btn-outline-primary dropdown-toggle"  ngbDropdownToggle>
            Language From:
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item"  *ngFor="let translation of translations" (click)="onSelectTranslationFrom(translation)">{{translation.language.code}}</button>
          </div>
        </div>
        <div  *ngIf="translationFrom">
          <span>Language: {{translationFrom.language.language_name}}</span>
          <br/>
          {{translationFrom.content}}
        </div>
      </div>
      <div class="col-md-4">
        <div class="d-inline-block dropdown" ngbDropdown>
          <button aria-haspopup="true" aria-expanded="false" class="btn btn-outline-primary dropdown-toggle"  ngbDropdownToggle>
            Language To:
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item"  *ngFor="let translation of translations" (click)="onSelectTranslationTo(translation)">{{translation.language.code}}</button>
          </div>
        </div>
        <div  *ngIf="translationTo">
          <span>Language: {{translationTo.language.language_name}}</span>
          <br/>
          {{translationTo.content}}
        </div>
      </div>
    </div>
  `,
    providers: [TranslationService]
})

export class TranslationComponent {
    @Input()
    poem: Poem;
    errorMessage: string;
    mode = 'Observable';
    translations: Translation[];

    translationFrom: Translation;
    translationTo: Translation;

    constructor(private translationService: TranslationService) { }

    getTranslations(poemId): void {
        this.translationService.getTranslations(poemId).subscribe(
            translations => this.translations = translations,
            error => this.errorMessage = <any>error);
    }
    ngOnInit(): void {
        this.getTranslations(this.poem.id);
    }
    ngOnChanges(changes: any) {
        this.getTranslations(changes.poem.currentValue.id);
    }
    onSelectTranslationFrom(translation: Translation): void {
        this.translationFrom = translation;
    }
    onSelectTranslationTo(translation: Translation): void {
        this.translationTo = translation;
    }
}

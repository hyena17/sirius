import { Component, OnInit, EventEmitter, Input, Output, ViewChild, forwardRef} from '@angular/core';
import { Writer } from '../models/writer';
import { Collection } from '../models/collection';
import { Poem } from '../models/poem';
import { Language } from '../models/language';
import { Translation } from '../models/translation';

import { WriterService } from '../services/writer.service';
import { PoemService } from '../services/poem.service';
import { TranslationService } from '../services/translation.service';
import { LanguageService } from '../services/language.service';
import { CollectionService } from '../services/collection.service';

import { CompleterService, CompleterData } from 'ng2-completer';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import '../rxjs-operators';

// creates an ngModel accessor to be used in components providers




@Component({
    selector: 'writer',
    template: `
      <div class="form-group" >
        <label >Writer Name</label>
        <ng2-completer class="form-control"  name="writerName" [(ngModel)]="writerName" #writerNameModel="ngModel"  [dataService]="dataServiceWriter" [minSearchLength]="0" (selected)="onWriterSelected($event)" placeholder="Enter writer name"></ng2-completer>
      </div>

      <div class="form-group">
        <label for="collectionName">Collection Name</label>
        <ng2-completer class="form-control"  name="collectionName"   [(ngModel)]="collectionName" #collectionNameModel="ngModel"  [dataService]="dataServiceCollection" [minSearchLength]="0" (selected)="onCollectionSelected($event)" placeholder="Enter collection name"></ng2-completer>
      </div>

      <div class="form-group">
        <label for="poemName">Poem Name</label>
        <ng2-completer class="form-control"  name="poemName"   [(ngModel)]="poemName" #poemNameModel="ngModel"  [dataService]="dataServicePoem" [minSearchLength]="0" (selected)="onPoemSelected($event)" placeholder="Enter poem name"></ng2-completer>
      </div>

      <div class="form-group">
        <label for="languageCode" >Language select</label>
        <select class="form-control" ng-model="languageCode1" #languageCode>
           <option *ngFor="let language of languages">{{language.code}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="poemTranslatedTitle">Translated Title</label>
        <input class="form-control"  rows="20" #poemTranslatedTitle/>
      </div>
      <div class="form-group">
        <label for="poemTranslatedCollection">Translated Collection</label>
        <input class="form-control"  rows="20" #poemTranslatedCollection/>
      </div>
      <div class="form-group">
        <label for="poemContent">Poem Content</label>
        <textarea class="form-control"  rows="20" #poemContent></textarea>
      </div>
      <button class="btn btn-primary"  (click)="createWriter();">Submit</button>

    `,
    providers: [WriterService, PoemService, TranslationService, LanguageService, CollectionService]
})

export class WriterComponent implements OnInit {
    errorMessage: string;
    mode = 'Observable';

    languages: Language[];
    translations: Translation[];

    private dataServicePoem: CompleterData;
    private dataServiceCollection: CompleterData;
    private dataServiceWriter: CompleterData;
    private completerService: CompleterService

    selectedWriter: Writer;
    selectedPoem: Poem;
    selectedCollection: Collection;
    // Local properties
    translation: Translation;

    @ViewChild('writerNameModel') private writerNameModel = null;
    @ViewChild('poemNameModel') private poemNameModel = null;
    @ViewChild('collectionNameModel') private collectionNameModel = null;
    @ViewChild('languageCode') private languageInput = null;
    @ViewChild('poemContent') private poemContentInput = null;
    @ViewChild('poemTranslatedTitle') private poemTranslatedTitle = null;
    @ViewChild('poemTranslatedCollection') private poemTranslatedCollection = null;

    constructor(private writerService: WriterService, private poemService: PoemService, private translationService: TranslationService, private languageService: LanguageService, private collectionService: CollectionService, completerService: CompleterService) {
        this.dataServiceWriter = completerService.local(writerService.getWriters(), 'name', 'name');
        this.completerService = completerService;
    }

    createWriter(): void {
        if (this.selectedWriter == undefined) {
            this.writerService.createWriter(this.writerNameModel.valueAccessor.searchStr).subscribe(
                writer => this.selectedWriter = writer,
                error => this.errorMessage = <any>error,
                () => this.createPoem(this.poemNameModel));
        } else {
            this.createPoem(this.poemNameModel.valueAccessor.searchStr);
        }
    }

    createPoem(poemName: string) {
        if (this.selectedPoem == undefined) {
            this.poemService.createPoem(poemName, this.selectedWriter.id, this.selectedCollection.id).subscribe(
                poem => this.selectedPoem = poem,
                error => this.errorMessage = <any>error,
                () => this.createTranslation(this.languageInput.nativeElement.value, this.poemContentInput.nativeElement.value));
        }
        else {
            this.createTranslation(this.languageInput.nativeElement.value, this.poemContentInput.nativeElement.value);
        }
    }
    createTranslation(languageCode: string, poemContent: string) {
        var language = new Language();
        language.code = languageCode;

        this.translationService.createTranslation(poemContent, language, this.selectedPoem.id, this.poemTranslatedTitle.nativeElement.value, this.poemTranslatedCollection.nativeElement.value).subscribe(
            translation => this.translation = translation,
            error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {
        this.getLanguages();
    }
    getLanguages(): void {
        this.languageService.getLanguage().subscribe(
            languages => this.languages = languages,
            error => this.errorMessage = <any>error);
    }

    onWriterSelected(selected: any) {
        this.selectedWriter = selected.originalObject;
        this.dataServiceCollection = this.completerService.local(this.collectionService.getCollections(this.selectedWriter.id), 'name', 'name');
        this.dataServicePoem = this.completerService.local(this.poemService.getPoems(this.selectedWriter.id), 'title', 'title');
    }

    onCollectionSelected(selected: any) {
        this.selectedCollection = selected.originalObject;
        this.dataServicePoem = this.completerService.local(this.poemService.getPoems(this.selectedCollection.id), 'title', 'title');
    }

    onPoemSelected(selected: any) {
        this.selectedPoem = selected.originalObject;
        this.translationService.getTranslations(this.selectedPoem.id).subscribe(
            translations => this.translations = translations,
            error => this.errorMessage = <any>error,
            () => this.updateLanguageCodes());
    }

    updateLanguageCodes() {
        let newLanguages = this.languages;
        let translationsCopy = this.translations;
        for (var i = 0, l = translationsCopy.length; i < l; i++) {
            newLanguages = newLanguages.filter(function(el) {
                return el.code !== translationsCopy[i].language.code;
            });
        }
        this.languages = newLanguages;
    }
}

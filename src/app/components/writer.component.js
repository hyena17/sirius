"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var language_1 = require("../models/language");
var writer_service_1 = require("../services/writer.service");
var poem_service_1 = require("../services/poem.service");
var translation_service_1 = require("../services/translation.service");
var language_service_1 = require("../services/language.service");
var collection_service_1 = require("../services/collection.service");
var ng2_completer_1 = require("ng2-completer");
require("../rxjs-operators");
// creates an ngModel accessor to be used in components providers
var WriterComponent = (function () {
    function WriterComponent(writerService, poemService, translationService, languageService, collectionService, completerService) {
        this.writerService = writerService;
        this.poemService = poemService;
        this.translationService = translationService;
        this.languageService = languageService;
        this.collectionService = collectionService;
        this.mode = 'Observable';
        this.writerNameModel = null;
        this.poemNameModel = null;
        this.collectionNameModel = null;
        this.languageInput = null;
        this.poemContentInput = null;
        this.poemTranslatedTitle = null;
        this.poemTranslatedCollection = null;
        this.dataServiceWriter = completerService.local(writerService.getWriters(), 'name', 'name');
        this.completerService = completerService;
    }
    WriterComponent.prototype.createWriter = function () {
        var _this = this;
        if (this.selectedWriter == undefined) {
            this.writerService.createWriter(this.writerNameModel.valueAccessor.searchStr).subscribe(function (writer) { return _this.selectedWriter = writer; }, function (error) { return _this.errorMessage = error; }, function () { return _this.createPoem(_this.poemNameModel); });
        }
        else {
            this.createPoem(this.poemNameModel.valueAccessor.searchStr);
        }
    };
    WriterComponent.prototype.createPoem = function (poemName) {
        var _this = this;
        if (this.selectedPoem == undefined) {
            this.poemService.createPoem(poemName, this.selectedWriter.id, this.selectedCollection.id).subscribe(function (poem) { return _this.selectedPoem = poem; }, function (error) { return _this.errorMessage = error; }, function () { return _this.createTranslation(_this.languageInput.nativeElement.value, _this.poemContentInput.nativeElement.value); });
        }
        else {
            this.createTranslation(this.languageInput.nativeElement.value, this.poemContentInput.nativeElement.value);
        }
    };
    WriterComponent.prototype.createTranslation = function (languageCode, poemContent) {
        var _this = this;
        var language = new language_1.Language();
        language.code = languageCode;
        this.translationService.createTranslation(poemContent, language, this.selectedPoem.id, this.poemTranslatedTitle.nativeElement.value, this.poemTranslatedCollection.nativeElement.value).subscribe(function (translation) { return _this.translation = translation; }, function (error) { return _this.errorMessage = error; });
    };
    WriterComponent.prototype.ngOnInit = function () {
        this.getLanguages();
    };
    WriterComponent.prototype.getLanguages = function () {
        var _this = this;
        this.languageService.getLanguage().subscribe(function (languages) { return _this.languages = languages; }, function (error) { return _this.errorMessage = error; });
    };
    WriterComponent.prototype.onWriterSelected = function (selected) {
        this.selectedWriter = selected.originalObject;
        this.dataServiceCollection = this.completerService.local(this.collectionService.getCollections(this.selectedWriter.id), 'name', 'name');
        this.dataServicePoem = this.completerService.local(this.poemService.getPoems(this.selectedWriter.id), 'title', 'title');
    };
    WriterComponent.prototype.onCollectionSelected = function (selected) {
        this.selectedCollection = selected.originalObject;
        this.dataServicePoem = this.completerService.local(this.poemService.getPoems(this.selectedCollection.id), 'title', 'title');
    };
    WriterComponent.prototype.onPoemSelected = function (selected) {
        var _this = this;
        this.selectedPoem = selected.originalObject;
        this.translationService.getTranslations(this.selectedPoem.id).subscribe(function (translations) { return _this.translations = translations; }, function (error) { return _this.errorMessage = error; }, function () { return _this.updateLanguageCodes(); });
    };
    WriterComponent.prototype.updateLanguageCodes = function () {
        var newLanguages = this.languages;
        var translationsCopy = this.translations;
        for (var i = 0, l = translationsCopy.length; i < l; i++) {
            newLanguages = newLanguages.filter(function (el) {
                return el.code !== translationsCopy[i].language.code;
            });
        }
        this.languages = newLanguages;
    };
    return WriterComponent;
}());
__decorate([
    core_1.ViewChild('writerNameModel'),
    __metadata("design:type", Object)
], WriterComponent.prototype, "writerNameModel", void 0);
__decorate([
    core_1.ViewChild('poemNameModel'),
    __metadata("design:type", Object)
], WriterComponent.prototype, "poemNameModel", void 0);
__decorate([
    core_1.ViewChild('collectionNameModel'),
    __metadata("design:type", Object)
], WriterComponent.prototype, "collectionNameModel", void 0);
__decorate([
    core_1.ViewChild('languageCode'),
    __metadata("design:type", Object)
], WriterComponent.prototype, "languageInput", void 0);
__decorate([
    core_1.ViewChild('poemContent'),
    __metadata("design:type", Object)
], WriterComponent.prototype, "poemContentInput", void 0);
__decorate([
    core_1.ViewChild('poemTranslatedTitle'),
    __metadata("design:type", Object)
], WriterComponent.prototype, "poemTranslatedTitle", void 0);
__decorate([
    core_1.ViewChild('poemTranslatedCollection'),
    __metadata("design:type", Object)
], WriterComponent.prototype, "poemTranslatedCollection", void 0);
WriterComponent = __decorate([
    core_1.Component({
        selector: 'writer',
        template: "\n      <div class=\"form-group\" >\n        <label >Writer Name</label>\n        <ng2-completer class=\"form-control\"  name=\"writerName\" [(ngModel)]=\"writerName\" #writerNameModel=\"ngModel\"  [dataService]=\"dataServiceWriter\" [minSearchLength]=\"0\" (selected)=\"onWriterSelected($event)\" placeholder=\"Enter writer name\"></ng2-completer>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"collectionName\">Collection Name</label>\n        <ng2-completer class=\"form-control\"  name=\"collectionName\"   [(ngModel)]=\"collectionName\" #collectionNameModel=\"ngModel\"  [dataService]=\"dataServiceCollection\" [minSearchLength]=\"0\" (selected)=\"onCollectionSelected($event)\" placeholder=\"Enter collection name\"></ng2-completer>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"poemName\">Poem Name</label>\n        <ng2-completer class=\"form-control\"  name=\"poemName\"   [(ngModel)]=\"poemName\" #poemNameModel=\"ngModel\"  [dataService]=\"dataServicePoem\" [minSearchLength]=\"0\" (selected)=\"onPoemSelected($event)\" placeholder=\"Enter poem name\"></ng2-completer>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"languageCode\" >Language select</label>\n        <select class=\"form-control\" ng-model=\"languageCode1\" #languageCode>\n           <option *ngFor=\"let language of languages\">{{language.code}}</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"poemTranslatedTitle\">Translated Title</label>\n        <input class=\"form-control\"  rows=\"20\" #poemTranslatedTitle/>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"poemTranslatedCollection\">Translated Collection</label>\n        <input class=\"form-control\"  rows=\"20\" #poemTranslatedCollection/>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"poemContent\">Poem Content</label>\n        <textarea class=\"form-control\"  rows=\"20\" #poemContent></textarea>\n      </div>\n      <button class=\"btn btn-primary\"  (click)=\"createWriter();\">Submit</button>\n\n    ",
        providers: [writer_service_1.WriterService, poem_service_1.PoemService, translation_service_1.TranslationService, language_service_1.LanguageService, collection_service_1.CollectionService]
    }),
    __metadata("design:paramtypes", [writer_service_1.WriterService, poem_service_1.PoemService, translation_service_1.TranslationService, language_service_1.LanguageService, collection_service_1.CollectionService, ng2_completer_1.CompleterService])
], WriterComponent);
exports.WriterComponent = WriterComponent;
//# sourceMappingURL=writer.component.js.map
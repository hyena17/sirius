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
var writer_service_1 = require("../services/writer.service");
var poem_service_1 = require("../services/poem.service");
var translation_service_1 = require("../services/translation.service");
require("../rxjs-operators");
var SearchComponent = (function () {
    function SearchComponent(writerService, poemService, translationService) {
        this.writerService = writerService;
        this.poemService = poemService;
        this.translationService = translationService;
        this.searchInput = null;
    }
    SearchComponent.prototype.eventListenWriter = function (writer) {
        this.selectedWriter = writer;
    };
    SearchComponent.prototype.searchWriters = function (searchKey) {
        var _this = this;
        this.writerService.searchWriters(searchKey).subscribe(function (writers) { return _this.writers = writers; }, function (error) { return _this.errorMessage = error; }, function () { return _this.searchPoems(_this.searchInput.nativeElement.value); });
    };
    SearchComponent.prototype.searchPoems = function (searchKey) {
        var _this = this;
        this.poemService.searchPoems(searchKey).subscribe(function (poems) { return _this.poems = poems; }, function (error) { return _this.errorMessage = error; }, function () { return _this.searchTranslations(_this.searchInput.nativeElement.value); });
    };
    SearchComponent.prototype.searchTranslations = function (searchKey) {
        var _this = this;
        this.translationService.searchTranslations(searchKey).subscribe(function (translations) { return _this.translations = translations; }, function (error) { return _this.errorMessage = error; });
    };
    return SearchComponent;
}());
__decorate([
    core_1.ViewChild('search'),
    __metadata("design:type", Object)
], SearchComponent.prototype, "searchInput", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        template: "\n      <div class=\"col-md-4\" style=\"margin-left: 40px;\">\n      <input #search>\n      <button  (click)=\"searchWriters(search.value);\">search</button>\n      </div>\n\n      <div class=\"col-md-8\">\n      <div class=\"list-group\" *ngIf=\"writers\">\n      <h2 style=\"margin-left: 40px;\">Writers</h2>\n      <ul >\n      <li *ngFor=\"let writer of writers\" class=\"list-group-item list-group-item-action\" >\n        <span class=\"badge\">{{writer.id}}</span> {{writer.name}}\n      </li>\n      </ul>\n      </div>\n\n      <div class=\"list-group\" *ngIf=\"poems\">\n        <h2 style=\"margin-left: 40px;\">Poems</h2>\n        <ul >\n        <li *ngFor=\"let poem of poems\" (click)=\"onSelect(poem)\"  class=\"list-group-item list-group-item-action\">\n          <span  >{{poem.id}}</span> {{poem.title}}\n        </li>\n        </ul>\n      </div>\n\n      <div class=\"list-group\" *ngIf=\"translations\">\n      <h2 style=\"margin-left: 40px;\">Translations</h2>\n      <ul >\n      <li *ngFor=\"let translation of Translations\" class=\"list-group-item list-group-item-action\" >\n        <span class=\"badge\">{{translation.id}}</span> {{translation.content}}\n      </li>\n      </ul>\n      </div>\n      </div>\n\n    ",
        providers: [writer_service_1.WriterService, poem_service_1.PoemService, translation_service_1.TranslationService]
    }),
    __metadata("design:paramtypes", [writer_service_1.WriterService, poem_service_1.PoemService, translation_service_1.TranslationService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map
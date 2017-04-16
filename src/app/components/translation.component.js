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
var poem_1 = require("../models/poem");
var translation_service_1 = require("../services/translation.service");
require("../rxjs-operators");
var TranslationComponent = (function () {
    function TranslationComponent(translationService) {
        this.translationService = translationService;
        this.mode = 'Observable';
    }
    TranslationComponent.prototype.getTranslations = function (poemId) {
        var _this = this;
        this.translationService.getTranslations(poemId).subscribe(function (translations) { return _this.translations = translations; }, function (error) { return _this.errorMessage = error; });
    };
    TranslationComponent.prototype.ngOnInit = function () {
        this.getTranslations(this.poem.id);
    };
    TranslationComponent.prototype.ngOnChanges = function (changes) {
        this.getTranslations(changes.poem.currentValue.id);
    };
    TranslationComponent.prototype.onSelectTranslationFrom = function (translation) {
        this.translationFrom = translation;
    };
    TranslationComponent.prototype.onSelectTranslationTo = function (translation) {
        this.translationTo = translation;
    };
    return TranslationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", poem_1.Poem)
], TranslationComponent.prototype, "poem", void 0);
TranslationComponent = __decorate([
    core_1.Component({
        selector: 'translation-component',
        template: "\n    <div class=\"row\" style=\"margin-left: 40px;\">\n      <div class=\"col-md-4\" >\n        <div class=\"d-inline-block dropdown\" ngbDropdown>\n          <button aria-haspopup=\"true\" aria-expanded=\"false\" class=\"btn btn-outline-primary dropdown-toggle\"  ngbDropdownToggle>\n            Language From:\n          </button>\n          <div class=\"dropdown-menu\">\n            <button class=\"dropdown-item\"  *ngFor=\"let translation of translations\" (click)=\"onSelectTranslationFrom(translation)\">{{translation.language.code}}</button>\n          </div>\n        </div>\n        <div  *ngIf=\"translationFrom\">\n          <span>Language: {{translationFrom.language.language_name}}</span>\n          <br/>\n          {{translationFrom.content}}\n        </div>\n      </div>\n      <div class=\"col-md-4\">\n        <div class=\"d-inline-block dropdown\" ngbDropdown>\n          <button aria-haspopup=\"true\" aria-expanded=\"false\" class=\"btn btn-outline-primary dropdown-toggle\"  ngbDropdownToggle>\n            Language To:\n          </button>\n          <div class=\"dropdown-menu\">\n            <button class=\"dropdown-item\"  *ngFor=\"let translation of translations\" (click)=\"onSelectTranslationTo(translation)\">{{translation.language.code}}</button>\n          </div>\n        </div>\n        <div  *ngIf=\"translationTo\">\n          <span>Language: {{translationTo.language.language_name}}</span>\n          <br/>\n          {{translationTo.content}}\n        </div>\n      </div>\n    </div>\n  ",
        providers: [translation_service_1.TranslationService]
    }),
    __metadata("design:paramtypes", [translation_service_1.TranslationService])
], TranslationComponent);
exports.TranslationComponent = TranslationComponent;
//# sourceMappingURL=translation.component.js.map
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
var writer_1 = require("../models/writer");
var poem_service_1 = require("../services/poem.service");
require("../rxjs-operators");
var WriterDetailsComponent = (function () {
    function WriterDetailsComponent(poemService) {
        this.poemService = poemService;
        this.mode = 'Observable';
    }
    WriterDetailsComponent.prototype.findPoems = function (writerId) {
        var _this = this;
        this.poemService.getPoems(writerId).subscribe(function (poems) { return _this.poems = poems; }, function (error) { return _this.errorMessage = error; });
    };
    WriterDetailsComponent.prototype.ngOnInit = function () {
        this.findPoems(this.writer.id);
    };
    WriterDetailsComponent.prototype.onSelect = function (poem) {
        this.selectedPoem = poem;
    };
    WriterDetailsComponent.prototype.ngOnChanges = function (changes) {
        this.findPoems(changes.writer.currentValue.id);
        this.selectedPoem = null;
    };
    return WriterDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", writer_1.Writer)
], WriterDetailsComponent.prototype, "writer", void 0);
WriterDetailsComponent = __decorate([
    core_1.Component({
        selector: 'writer-detail',
        template: "\n          <div *ngIf=\"writer\">\n            <h2 style=\"margin-left: 40px;\">{{writer.name}}</h2>\n            <div class=\"list-group\">\n              <ul >\n              <li *ngFor=\"let poem of poems\" (click)=\"onSelect(poem)\"  class=\"list-group-item list-group-item-action\">\n                <span  >{{poem.id}}</span> {{poem.title}}\n              </li>\n              </ul>\n            </div>\n            <div *ngIf=\"selectedPoem\">\n              <translation-component [poem]=\"selectedPoem\"></translation-component>\n            </div>\n        </div>",
        providers: [poem_service_1.PoemService]
    }),
    __metadata("design:paramtypes", [poem_service_1.PoemService])
], WriterDetailsComponent);
exports.WriterDetailsComponent = WriterDetailsComponent;
//# sourceMappingURL=writer-details.component.js.map
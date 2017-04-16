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
require("../rxjs-operators");
var WriterListComponent = (function () {
    function WriterListComponent(writerService) {
        this.writerService = writerService;
        this.mode = 'Observable';
        this.eventListenWriter = new core_1.EventEmitter();
    }
    WriterListComponent.prototype.getWriters = function () {
        var _this = this;
        this.writerService.getWriters().subscribe(function (writers) { return _this.writers = writers; }, function (error) { return _this.errorMessage = error; });
    };
    WriterListComponent.prototype.ngOnInit = function () {
        this.getWriters();
    };
    WriterListComponent.prototype.onSelect = function (writer) {
        this.selectedWriter = writer;
        this.eventListenWriter.emit(writer);
    };
    return WriterListComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], WriterListComponent.prototype, "eventListenWriter", void 0);
WriterListComponent = __decorate([
    core_1.Component({
        selector: 'writers-list',
        template: "\n              <div class=\"list-group\">\n              <ul >\n              <li *ngFor=\"let writer of writers\" class=\"list-group-item list-group-item-action\" (click)=\"onSelect(writer)\">\n                <span class=\"badge\">{{writer.id}}</span> {{writer.name}}\n              </li>\n              </ul>\n              </div>\n              ",
        providers: [writer_service_1.WriterService]
    }),
    __metadata("design:paramtypes", [writer_service_1.WriterService])
], WriterListComponent);
exports.WriterListComponent = WriterListComponent;
//# sourceMappingURL=writer-list.component.js.map
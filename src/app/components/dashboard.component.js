"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("../rxjs-operators");
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.title = 'I am the poet of the body, I am the poet of the soul';
    }
    DashboardComponent.prototype.eventListenWriter = function (writer) {
        this.selectedWriter = writer;
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        template: "\n    <div class=\"row\">\n      <search></search>\n    </div>\n    <br/>\n    <div class=\"row\">\n    <div class=\"col-md-4\">\n    \n    <writers-list (eventListenWriter)=\"eventListenWriter($event)\"></writers-list>\n    </div>\n\n    <div class=\"col-md-8\">\n      <div *ngIf=\"selectedWriter\">\n        <writer-detail [writer]=\"selectedWriter\"></writer-detail>\n      </div>\n    </div>\n    </div>\n    "
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
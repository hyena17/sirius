"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng2_completer_1 = require("ng2-completer");
var app_component_1 = require("./app.component");
var writer_details_component_1 = require("./components/writer-details.component");
var writer_list_component_1 = require("./components/writer-list.component");
var writer_component_1 = require("./components/writer.component");
var translation_component_1 = require("./components/translation.component");
var dashboard_component_1 = require("./components/dashboard.component");
var search_component_1 = require("./components/search.component");
var exam_component_1 = require("./components/exam.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [ng_bootstrap_1.NgbModule, platform_browser_1.BrowserModule, ng2_completer_1.Ng2CompleterModule, forms_1.FormsModule, http_1.HttpModule, http_1.JsonpModule,
            router_1.RouterModule.forRoot([
                {
                    path: 'writer',
                    component: writer_component_1.WriterComponent
                },
                {
                    path: 'exam',
                    component: exam_component_1.ExamComponent
                },
                {
                    path: '',
                    redirectTo: '/exam',
                    pathMatch: 'full'
                },
            ])],
        declarations: [app_component_1.AppComponent, writer_details_component_1.WriterDetailsComponent, translation_component_1.TranslationComponent, writer_list_component_1.WriterListComponent, dashboard_component_1.DashboardComponent, writer_component_1.WriterComponent, search_component_1.SearchComponent, exam_component_1.ExamComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
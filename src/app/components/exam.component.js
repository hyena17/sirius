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
var exam_service_1 = require("../services/exam.service");
require("../rxjs-operators");
var ExamComponent = (function () {
    function ExamComponent(examService) {
        this.examService = examService;
        this.mode = 'Observable';
        this.clase = 'has-success';
        this.eventListenWriter = new core_1.EventEmitter();
    }
    ExamComponent.prototype.getExams = function () {
        var _this = this;
        this.examService.getExams().subscribe(function (exams) { return _this.exams = exams; }, function (error) { return _this.errorMessage = error; });
    };
    ExamComponent.prototype.ngOnInit = function () {
        this.getExams();
        this.selectedAnswer = [];
        this.selectedClass = [[], [], [], [], []];
    };
    ExamComponent.prototype.onSelect = function (exam) {
        this.selectedExam = exam;
        this.selectedQuestions = exam.questions;
    };
    ExamComponent.prototype.evaluateExam = function () {
        var contador = 0;
        var indice = 0;
        var verdadero = 0;
        for (var _i = 0, _a = this.selectedQuestions; _i < _a.length; _i++) {
            var question = _a[_i];
            indice = 0;
            verdadero = 0;
            for (var _b = 0, _c = question.options; _b < _c.length; _b++) {
                var answer = _c[_b];
                if (question.answer == answer) {
                    verdadero = indice;
                }
                if (question.answer == this.selectedAnswer[contador] && this.selectedAnswer[contador] == answer) {
                    this.selectedClass[contador][indice] = "has-success";
                }
                else if (answer == this.selectedAnswer[contador]) {
                    this.selectedClass[contador][indice] = "has-danger";
                }
                indice++;
            }
            this.selectedClass[contador][verdadero] = "has-success";
            contador++;
        }
        //  alert(this.selectedAnswer);
    };
    return ExamComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ExamComponent.prototype, "eventListenWriter", void 0);
ExamComponent = __decorate([
    core_1.Component({
        selector: 'exams-list',
        template: "\n              <div class=\"list-group\">\n              <ul >\n              <li *ngFor=\"let exam of exams\" class=\"list-group-item list-group-item-action\" (click)=\"onSelect(exam)\">\n                <span class=\"badge\">{{exam.university}}</span> {{exam.period}}\n              </li>\n              </ul>\n              </div>\n\n              <div class=\"list-group\">\n                <div *ngIf=\"selectedExam\">\n                <label>{{selectedExam.university}}</label><br/>\n                <label>{{selectedExam.period}}</label><br/>\n                <label>{{selectedExam.course}}</label><br/>\n                </div>\n                <div *ngIf=\"selectedExam\">\n                <ul >\n                <li *ngFor=\"let question of selectedQuestions;let index = index\" class=\"list-group-item list-group-item-action\">\n                  <span class=\"badge\">{{question.question}}</span>\n                  <div class=\"form-check\"  *ngFor=\"let answer of question.options;let indexe=index\"  >\n                    <div [(ngClass)]=\"selectedClass[index][indexe]\">\n                        <label class=\"form-check-label\"  >\n                          <input type=\"radio\"  [(ngModel)]=\"selectedAnswer[index]\" value=\"{{answer}}\" name=\"{{question.question}}\"\n                          class=\"form-check-input\">\n                            {{answer}}\n                        </label>\n                      </div>\n                  </div>\n\n                </li>\n                </ul>\n                <button class=\"btn btn-primary\"  (click)=\"evaluateExam();\">Submit</button>\n                </div>\n\n              </div>\n\n\n              ",
        providers: [exam_service_1.ExamService]
    }),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamComponent);
exports.ExamComponent = ExamComponent;
//# sourceMappingURL=exam.component.js.map
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
var http_1 = require("@angular/http");
var writer_1 = require("../models/writer");
var Observable_1 = require("rxjs/Observable");
var WriterService = (function () {
    function WriterService(http) {
        this.http = http;
        this.writerUrl = 'http://localhost:8080/poetryAPI/writers/'; // URL to web API
    }
    WriterService.prototype.getWriters = function () {
        return this.http.get(this.writerUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WriterService.prototype.searchWriters = function (searchKey) {
        return this.http.get(this.writerUrl + 'search/' + searchKey)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WriterService.prototype.createWriter = function (name) {
        var writer = new writer_1.Writer();
        writer.name = name;
        var bodyString = JSON.stringify(writer); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.writerUrl + 'create', bodyString, options) // ...using post request
            .map(this.extractData) // ...and calling .json() on the response to return data
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    WriterService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    WriterService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    return WriterService;
}());
WriterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WriterService);
exports.WriterService = WriterService;
//# sourceMappingURL=writer.service.js.map
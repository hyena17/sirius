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
var Observable_1 = require("rxjs/Observable");
var poem_1 = require("../models/poem");
var PoemService = (function () {
    function PoemService(http) {
        this.http = http;
        this.poemUrl = 'http://localhost:8080/poetryAPI/poems/'; // URL to web API
    }
    PoemService.prototype.getPoems = function (id) {
        return this.http.get(this.poemUrl + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PoemService.prototype.getPoemsByCollection = function (collectionId) {
        return this.http.get(this.poemUrl + 'collection/' + collectionId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PoemService.prototype.searchPoems = function (searchKey) {
        return this.http.get(this.poemUrl + 'search/' + searchKey)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PoemService.prototype.createPoem = function (title, writeId, collectionId) {
        var poem = new poem_1.Poem();
        poem.title = title;
        poem.writer_id = writeId;
        poem.collection_id = collectionId;
        var bodyString = JSON.stringify(poem); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.poemUrl + 'create', bodyString, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    PoemService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    PoemService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    return PoemService;
}());
PoemService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PoemService);
exports.PoemService = PoemService;
//# sourceMappingURL=poem.service.js.map
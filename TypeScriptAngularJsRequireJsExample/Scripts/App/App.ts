import angular = require("angular");

export class Config {

    static $inject = ["$httpProvider"];

    constructor($httpProvider: ng.IHttpProvider) {
        // Set Ajax XMLHttpRequest Header
        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    }
}
angular.module("ExampleApp.Controllers", []);
angular.module("ExampleApp.Directives", []);
angular.module("ExampleApp.Services", []);
angular
    .module("ExampleApp", ["ExampleApp.Controllers", "ExampleApp.Directives", "ExampleApp.Services"])
    .config(Config);
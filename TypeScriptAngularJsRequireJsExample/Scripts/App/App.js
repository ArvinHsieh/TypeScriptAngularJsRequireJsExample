define(["require", "exports", "angular"], function (require, exports, angular) {
    var Config = (function () {
        function Config($httpProvider) {
            // Set Ajax XMLHttpRequest Header
            $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        }
        Config.$inject = ["$httpProvider"];
        return Config;
    })();
    exports.Config = Config;
    angular.module("ExampleApp.Controllers", []);
    angular.module("ExampleApp.Directives", []);
    angular.module("ExampleApp.Services", []);
    angular
        .module("ExampleApp", ["ExampleApp.Controllers", "ExampleApp.Directives", "ExampleApp.Services"])
        .config(Config);
});
//# sourceMappingURL=App.js.map
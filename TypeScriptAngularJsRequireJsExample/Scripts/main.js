require.config({
    baseUrl: "/Scripts/",
    paths: {
        domReady: "domReady",
        jquery: "lib_jquery/jquery-2.1.4",
        angular: "lib_angular/angular"
    },
    shim: {
        angular: {
            exports: "angular"
        },
        jquery: {
            exports: "$"
        }
    }
});
function RequireBootstrap(module) {
    require(["angular", "domReady!", "app/common/Common.Enum", "app/app", "app/common/Common.Directive", module], function (angular, document) {
        angular.bootstrap(document, ["ExampleApp"]);
    });
}
//# sourceMappingURL=main.js.map
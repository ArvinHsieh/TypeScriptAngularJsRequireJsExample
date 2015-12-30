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

function RequireBootstrap(module: string) {
    require(
        ["angular", "domReady!", "app/common/Common.Enum", "app/app", "app/common/Common.Directive", module],
        (angular: ng.IAngularStatic, document) => {
            angular.bootstrap(document, ["ExampleApp"]);
        });
}
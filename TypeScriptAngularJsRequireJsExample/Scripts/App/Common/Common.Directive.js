define(["require", "exports", "angular"], function (require, exports, angular) {
    var AutoDisabled = (function () {
        function AutoDisabled() {
        }
        AutoDisabled.DirectiveFactory = function () {
            return {
                restrict: "A",
                require: "ngModel",
                link: function (scope, element, attrs, ngModel) {
                    var watchFunction = scope.$watch(function () {
                        return ngModel.$modelValue;
                    }, function (newVal, oldVal) {
                        if (newVal == null)
                            return;
                        if (newVal) {
                            element.attr("disabled", "true");
                        }
                        else {
                            element.removeAttr("disabled");
                        }
                    });
                    scope.$on("destroy", function () {
                        // release watch
                        watchFunction();
                    });
                }
            };
        };
        AutoDisabled.$name = "autoDisabled";
        AutoDisabled.$inject = [AutoDisabled.DirectiveFactory];
        return AutoDisabled;
    })();
    exports.AutoDisabled = AutoDisabled;
    angular
        .module("ExampleApp.Directives")
        .directive(AutoDisabled.$name, AutoDisabled.$inject);
});
//# sourceMappingURL=Common.Directive.js.map
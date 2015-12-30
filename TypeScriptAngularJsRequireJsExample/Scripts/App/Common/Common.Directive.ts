import angular = require("angular");

export class AutoDisabled {
    static $name = "autoDisabled";
    static $inject = [AutoDisabled.DirectiveFactory];
    static DirectiveFactory(): ng.IDirective {
        return {
            restrict: "A",
            require: "ngModel",
            link: (scope, element, attrs, ngModel: ng.INgModelController) => {
                var watchFunction = scope.$watch(
                    () => {
                        return ngModel.$modelValue;
                    },
                    (newVal: boolean, oldVal: boolean) => {
                        if (newVal == null) return;
                        if (newVal) {
                            element.attr("disabled", "true");
                        } else {
                            element.removeAttr("disabled");
                        }
                    });

                scope.$on("destroy", () => {
                    // release watch
                    watchFunction();
                });
            }
        }
    }
}

angular
    .module("ExampleApp.Directives")
    .directive(AutoDisabled.$name, AutoDisabled.$inject);
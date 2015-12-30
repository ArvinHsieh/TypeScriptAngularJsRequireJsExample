define(["require", "exports", "angular", "jquery"], function (require, exports, angular, $) {
    var DataProvider = (function () {
        function DataProvider($http, $q) {
            this.httpSvc = $http;
            this.qSvc = $q;
        }
        DataProvider.prototype.Get = function (url, method, data) {
            var defer = this.qSvc.defer();
            if (method == HttpMethodEnum.Get) {
                this.httpSvc.get(url, {
                    headers: {
                        'RequestVerificationToken': this.GetRequestVerificationToken()
                    }
                })
                    .success(function (result, status, headers, config) {
                    defer.resolve(result);
                })
                    .error(function (result, status, headers, config) {
                    defer.reject(result);
                });
            }
            else if (method == HttpMethodEnum.Post) {
                this.httpSvc.post(url, data, {
                    headers: {
                        'RequestVerificationToken': this.GetRequestVerificationToken()
                    }
                })
                    .success(function (result, status, headers, config) {
                    defer.resolve(result);
                })
                    .error(function (result, status, headers, config) {
                    defer.reject(result);
                });
            }
            else {
                console.error("DataProvider not specified HTTP Method.");
            }
            return defer.promise;
        };
        /**
         * Get Ajax Token value, In the page used <ajax-anti-forgery-token token="@Html.AjaxAntiForgeryToken()"></ajax-anti-forgery-token>
         */
        DataProvider.prototype.GetRequestVerificationToken = function () {
            if ($("ajax-anti-forgery-token") != null && $("ajax-anti-forgery-token").attr("token") != null) {
                return $("ajax-anti-forgery-token").attr("token");
            }
            return "";
        };
        DataProvider.$name = "DataProvider";
        DataProvider.$inject = ["$http", "$q"];
        return DataProvider;
    })();
    exports.DataProvider = DataProvider;
    angular
        .module("ExampleApp.Services")
        .service(DataProvider.$name, DataProvider);
});
//# sourceMappingURL=DataProvider.js.map
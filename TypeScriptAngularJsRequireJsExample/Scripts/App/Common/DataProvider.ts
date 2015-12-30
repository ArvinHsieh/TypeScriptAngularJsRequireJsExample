import angular = require("angular");
import $ = require("jquery");

export interface IDataProvider {
    /**
     * Get Server Api Data
     * @param url: API Url
     * @param method: HTTP Method, Use the HttpMethodEnum
     * @param data: Data content
     */
    Get<TModel>(url: string, method: HttpMethodEnum, data?: any): ng.IPromise<TModel>;
}

export class DataProvider implements IDataProvider {
    static $name = "DataProvider";
    static $inject = ["$http", "$q"];

    private httpSvc: ng.IHttpService;
    private qSvc: ng.IQService;

    constructor($http: ng.IHttpService, $q: ng.IQService) {
        this.httpSvc = $http;
        this.qSvc = $q;
    }

    public Get<TModel>(url: string, method: HttpMethodEnum, data?: any): ng.IPromise<TModel> {
        var defer: ng.IDeferred<TModel> = this.qSvc.defer();

        if (method == HttpMethodEnum.Get) {
            this.httpSvc.get(url,
                {
                    headers: {
                        'RequestVerificationToken': this.GetRequestVerificationToken()
                    }
                })
                .success((result: any, status, headers, config) => {
                    defer.resolve(result);
                })
                .error((result: any, status, headers, config) => {
                    defer.reject(result);
                });
        } else if (method == HttpMethodEnum.Post) {
            this.httpSvc.post(url, data, {
                headers: {
                    'RequestVerificationToken': this.GetRequestVerificationToken()
                }
            })
                .success((result: any, status, headers, config) => {
                    defer.resolve(result);
                })
                .error((result: any, status, headers, config) => {
                    defer.reject(result);
                });
        } else {
            console.error("DataProvider not specified HTTP Method.");
        }

        return defer.promise;
    }

    /**
     * Get Ajax Token value, In the page used <ajax-anti-forgery-token token="@Html.AjaxAntiForgeryToken()"></ajax-anti-forgery-token>
     */
    private GetRequestVerificationToken(): string {
        if ($("ajax-anti-forgery-token") != null && $("ajax-anti-forgery-token").attr("token") != null) {
            return $("ajax-anti-forgery-token").attr("token");
        }
        return "";
    }

}

angular
    .module("ExampleApp.Services")
    .service(DataProvider.$name, DataProvider);
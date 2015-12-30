///  <amd-dependency path="app/common/Common.Model" />
///  <amd-dependency path="app/book/BookManager.ViewModel" />
///  <amd-dependency path="app/common/DataProvider" />
define(["require", "exports", "angular", "app/common/Common.Model", "app/book/BookManager.ViewModel", "app/common/DataProvider"], function (require, exports, angular) {
    var BookManagerService = (function () {
        function BookManagerService(dataProvider) {
            this.dataProvider = dataProvider;
        }
        BookManagerService.prototype.GetBooks = function (callback) {
            this.dataProvider.Get("GetBooks", HttpMethodEnum.Get)
                .then(function (result) {
                if (result.Code == ApiResultTypeEnum.Success) {
                    callback(result.Data, null);
                }
                else {
                    callback(null, null);
                }
            })
                .catch(function (error) {
                callback(null, error);
            });
        };
        BookManagerService.prototype.AddBook = function (data, callback) {
            this.dataProvider.Get("AddBook", HttpMethodEnum.Post, data)
                .then(function (result) {
                if (result.Code == ApiResultTypeEnum.Success) {
                    callback(true, null);
                }
                else {
                    callback(false, null);
                }
            })
                .catch(function (error) {
                callback(null, error);
            });
        };
        BookManagerService.prototype.UpdateBook = function (data, callback) {
            this.dataProvider.Get("UpdateBook", HttpMethodEnum.Post, data)
                .then(function (result) {
                if (result.Code == ApiResultTypeEnum.Success) {
                    callback(true, null);
                }
                else {
                    callback(false, null);
                }
            })
                .catch(function (error) {
                callback(null, error);
            });
        };
        BookManagerService.prototype.DeleteBook = function (data, callback) {
            this.dataProvider.Get("DeleteBook", HttpMethodEnum.Post, data)
                .then(function (result) {
                if (result.Code == ApiResultTypeEnum.Success) {
                    callback(true, null);
                }
                else {
                    callback(false, null);
                }
            })
                .catch(function (error) {
                callback(null, error);
            });
        };
        BookManagerService.$name = "BookManagerSvc";
        BookManagerService.$inject = ["DataProvider"];
        return BookManagerService;
    })();
    exports.BookManagerService = BookManagerService;
    angular
        .module("ExampleApp.Services")
        .service(BookManagerService.$name, BookManagerService);
});
//# sourceMappingURL=BookManager.Service.js.map
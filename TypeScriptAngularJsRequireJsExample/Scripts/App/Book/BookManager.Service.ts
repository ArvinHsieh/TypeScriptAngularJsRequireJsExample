///  <amd-dependency path="app/common/Common.Model" />
///  <amd-dependency path="app/book/BookManager.ViewModel" />
///  <amd-dependency path="app/common/DataProvider" />

import angular = require("angular");
import CommonModel = require("app/common/Common.Model");
import ViewModel = require("app/book/BookManager.ViewModel");
import DataProvider = require("app/common/DataProvider");

export class BookManagerService {
    static $name = "BookManagerSvc";
    static $inject = ["DataProvider"];

    private dataProvider: DataProvider.IDataProvider;

    constructor(dataProvider: DataProvider.IDataProvider) {
        this.dataProvider = dataProvider;
    }

    public GetBooks(callback: (data: Array<ViewModel.Book>, error: Error) => void): void {
        this.dataProvider.Get("GetBooks", HttpMethodEnum.Get)
            .then((result: CommonModel.IApiResult<Array<ViewModel.Book>>) => {
                if (result.Code == ApiResultTypeEnum.Success) {
                    callback(result.Data, null);
                } else {
                    callback(null, null);
                }
            })
            .catch((error) => {
                callback(null, error);
            });
    }

    public AddBook(data: ViewModel.Book, callback: (isSuccess: boolean, error: Error) => void): void {
        this.dataProvider.Get("AddBook", HttpMethodEnum.Post, data)
            .then((result: CommonModel.IApiResult<any>) => {
                if (result.Code == ApiResultTypeEnum.Success) {
                    callback(true, null);
                } else {
                    callback(false, null);
                }
            })
            .catch((error) => {
                callback(null, error);
            });
    }

    public UpdateBook(data: ViewModel.Book, callback: (isSuccess: boolean, error: Error) => void): void {
        this.dataProvider.Get("UpdateBook", HttpMethodEnum.Post, data)
            .then((result: CommonModel.IApiResult<any>) => {
                if (result.Code == ApiResultTypeEnum.Success) {
                    callback(true, null);
                } else {
                    callback(false, null);
                }
            })
            .catch((error) => {
                callback(null, error);
            });
    }

    public DeleteBook(data: ViewModel.Book, callback: (isSuccess: boolean, error: Error) => void): void {
        this.dataProvider.Get("DeleteBook", HttpMethodEnum.Post, data)
            .then((result: CommonModel.IApiResult<any>) => {
                if (result.Code == ApiResultTypeEnum.Success) {
                    callback(true, null);
                } else {
                    callback(false, null);
                }
            })
            .catch((error) => {
                callback(null, error);
            });
    }
}

angular
    .module("ExampleApp.Services")
    .service(BookManagerService.$name, BookManagerService);
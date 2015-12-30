///  <amd-dependency path="app/book/BookManager.Service" />

import angular = require("angular");
import ViewModel = require("app/book/BookManager.ViewModel");
import Service = require("app/book/BookManager.Service");

export interface IBookManagerScope extends ng.IScope {
    model: ViewModel.BookManagerViewModel;

    timeout: ng.ITimeoutService;
    bookManagerSvc: Service.BookManagerService;

    ChangeActionModel(actionModel: ActionModelEnum, book?: ViewModel.Book): void;
    GetBooks(): void;
    SaveBook(): void;
    DeleteBook(book: ViewModel.Book): void;
}

export class BookManagerCtrl {
    static $name = "BookManagerCtrl";
    static $inject = ["$scope", "$timeout", "BookManagerSvc"];

    private scope: IBookManagerScope;

    constructor(
        $scope: IBookManagerScope,
        $timeout: ng.ITimeoutService,
        bookManagerSvc: Service.BookManagerService) {
        
        this.scope = $scope;

        this.scope.timeout = $timeout;
        this.scope.bookManagerSvc = bookManagerSvc;

        this.scope.ChangeActionModel = this.ChangeActionModel;
        this.scope.GetBooks = this.GetBooks;
        this.scope.SaveBook = this.SaveBook;
        this.scope.DeleteBook = this.DeleteBook;

        this.InitializeViewModel();
    }

    private InitializeViewModel(): void {
        var model = new ViewModel.BookManagerViewModel();
        model.ActionModel = ActionModelEnum.ListView;
        model.IsBlock = false;
        this.scope.model = model;
    }

    public ChangeActionModel(actionModel: ActionModelEnum, member?: ViewModel.Book): void {
        var scope: IBookManagerScope = <any>this;

        scope.model.ActionModel = actionModel;

        if (member) {
            scope.model.EditModel = member;
        } else {
            scope.model.EditModel = new ViewModel.Book();
        }
    }

    public GetBooks(): void {
        var scope: IBookManagerScope = <any>this;
        scope.model.IsBlock = true;
        scope.bookManagerSvc.GetBooks(
            (data) => {
                if (data == null) {
                    scope.model.Message = "Not found data.";
                }
                scope.timeout(() => {
                    scope.model.Books = data;
                });
                scope.model.IsBlock = false;
            });
    }

    public SaveBook(): void {
        var scope: IBookManagerScope = <any>this;

        var hasBook: boolean = false;
        scope.model.Books.forEach((book, index) => {
            if (book.ID == scope.model.EditModel.ID) {
                hasBook = true;
                return;
            }
        });

        if (hasBook) {
            scope.bookManagerSvc.UpdateBook(
                scope.model.EditModel,
                (isSuccess) => {
                    if (isSuccess) {
                        scope.GetBooks();
                        scope.timeout(() => {
                            scope.model.Message = "success";
                            scope.model.ActionModel = ActionModelEnum.ListView;
                        });
                    } else {
                        scope.timeout(() => {
                            scope.model.Message = "fail";
                        });
                    }
                });
        } else {
            scope.bookManagerSvc.AddBook(
                scope.model.EditModel,
                (isSuccess) => {
                    if (isSuccess) {
                        scope.GetBooks();
                        scope.timeout(() => {
                            scope.model.Message = "success";
                            scope.model.ActionModel = ActionModelEnum.ListView;
                        });
                    } else {
                        scope.timeout(() => {
                            scope.model.Message = "fail";
                        });
                    }
                });
        }
    }

    public DeleteBook(book: ViewModel.Book): void {
        var scope: IBookManagerScope = <any>this;

        scope.bookManagerSvc.DeleteBook(
            book,
            (isSuccess) => {
                if (isSuccess) {
                    scope.GetBooks();
                    scope.timeout(() => {
                        scope.model.Message = "success";
                    });
                } else {
                    scope.timeout(() => {
                        scope.model.Message = "fail";
                    });
                }
            });
    }

}

angular
    .module("ExampleApp.Controllers")
    .controller(BookManagerCtrl.$name, BookManagerCtrl);

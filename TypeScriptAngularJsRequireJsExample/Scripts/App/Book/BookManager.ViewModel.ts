export class BookManagerViewModel {
    public ActionModel: ActionModelEnum;
    public EditModel: Book;
    public Books: Array<Book>;
    public IsBlock: boolean;
    public Message: string;
}

export class Book {
    public ID: string;
    public BookName: string;
    public BookAuthor: string;
}
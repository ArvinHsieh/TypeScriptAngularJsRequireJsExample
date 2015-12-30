using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using TypeScriptAngularJsRequireJsExample.Models;

namespace TypeScriptAngularJsRequireJsExample.Controllers
{
    public class BookController : WebControllerBase
    {
        //private string Server.MapPath("~/App_Data/BookDB.xml");

        public BookController()
        {
            //Server.MapPath("~/App_Data/BookDB.xml") = Server.MapPath("~/App_Data/BookDB.xml");
        }
        
        public ActionResult BookManager()
        {
            return View();
        }

        [HttpGet]
        [OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)]
        public JsonResult GetBooks()
        {
            System.Threading.Thread.Sleep(1000);

            var xDoc = XDocument.Load(Server.MapPath("~/App_Data/BookDB.xml"));
            var Books = xDoc.Root.Elements("book").Select(s =>
                                new Book()
                                {
                                    ID = s.Element("id").Value,
                                    BookName = s.Element("bookname").Value,
                                    BookAuthor = s.Element("bookauthor").Value
                                }).ToList();
            return Json(MvcStatusTypeEnum.Success, Books);
        }
    
        [HttpPost]
        public JsonResult AddBook(string id, string bookname, string bookauthor)
        {
            var Book = new XElement("book");
            Book.Add(new XElement("id") { Value = id });
            Book.Add(new XElement("bookname") { Value = bookname });
            Book.Add(new XElement("bookauthor") { Value = bookauthor });
            var xDoc = XDocument.Load(Server.MapPath("~/App_Data/BookDB.xml"));
            xDoc.Root.Add(Book);
            xDoc.Save(Server.MapPath("~/App_Data/BookDB.xml"));
            return Json(MvcStatusTypeEnum.Success, null);
        }
        
        [HttpPost]
        public JsonResult UpdateBook(string id, string bookname, string bookauthor)
        {
            var xDoc = XDocument.Load(Server.MapPath("~/App_Data/BookDB.xml"));

            var Book = xDoc.Root.Elements("book")
                        .Where(p => p.Element("id").Value == id).FirstOrDefault();
            if (Book == null)
                return Json(MvcStatusTypeEnum.Fail, null);

            Book.Element("bookname").Value = bookname;
            Book.Element("bookauthor").Value = bookauthor;

            xDoc.Save(Server.MapPath("~/App_Data/BookDB.xml"));
            return Json(MvcStatusTypeEnum.Success, null);
        }
        
        [HttpPost]
        public JsonResult DeleteBook(string id)
        {
            var xDoc = XDocument.Load(Server.MapPath("~/App_Data/BookDB.xml"));

            var Book = xDoc.Root.Elements("book").Where(p => p.Element("id").Value == id).FirstOrDefault();
            if (Book == null)
                return Json(MvcStatusTypeEnum.Fail, null);

            Book.Remove();
            xDoc.Save(Server.MapPath("~/App_Data/BookDB.xml"));
            return Json(MvcStatusTypeEnum.Success, null);
        }
    }
}
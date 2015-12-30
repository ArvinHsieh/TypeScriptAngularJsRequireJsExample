using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using TypeScriptAngularJsRequireJsExample.Models;

namespace TypeScriptAngularJsRequireJsExample.Controllers
{
    public class WebControllerBase : Controller
    {
        protected JsonResult Json(MvcStatusTypeEnum code, object data = null)
        {
            return new MvcApiJsonResult()
            {
                Code = (int)code,
                Data = data,
                ContentType = "application/json",
                ContentEncoding = Encoding.UTF8,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

    }
}
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TypeScriptAngularJsRequireJsExample.Models
{
    public class MvcApiJsonResult : JsonResult
    {
        public int Code { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            HttpResponseBase response = context.HttpContext.Response;
            response.ContentType = !String.IsNullOrEmpty(ContentType) ? ContentType : "application/json";

            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }

            var jsonResult = JsonConvert.SerializeObject(
                                new MvcApiResult()
                                {
                                    Code = Code,
                                    Data = Data
                                });

            response.Write(jsonResult);
        }
    }

    public class MvcApiResult
    {
        /// <summary>
        /// 回應狀態碼
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int? Code { get; set; }
        /// <summary>
        /// 回應資料
        /// </summary>
        public object Data { get; set; }
    }

    public enum MvcStatusTypeEnum
    {
        Success = 1,
        Fail = 0,
    }
}
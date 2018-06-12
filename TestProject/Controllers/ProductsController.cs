using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestProject.Controllers
{
    public class ProductsController : Controller
    {
        public ActionResult Products()
        {
            return View();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestProject.Models;


namespace TestProject.Controllers
{
    public class FormController : Controller
    {
        private TestDatabaseEntities db = new TestDatabaseEntities();

        // GET: Form
        public ActionResult Subscribe()
        {
            return View();
        }

        //GET upon successful submit
        public ActionResult Complete()
        {
            return View();
        }

        public ActionResult ViewSubscribers()
        {
            return View();
        }

        // POST: /Form/Subscribe
        //[ValidateAntiForgeryToken]
        public ActionResult AddToDatabase(SubscribeViewModel formData)
        {
           try
            {
                //Set form variables to a new entry into the database
                Subscriber subscriber = new Subscriber()
                {
                    Email = formData.email,
                    FirstName = formData.firstName,
                    LastName = formData.lastName
                };
                db.Subscribers.Add(subscriber);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }

            //Redirect to different view
            return Redirect("Complete");
        }

        public JsonResult GetSubscribersData()
        {
            //Selects all subscribers from the database and passes them to jquerydatagrid.js
            var subscribers = db.Subscribers.ToList();
            return Json(subscribers, JsonRequestBehavior.AllowGet);
        }

        /*public void EditDatabase(SubscribeViewModel changes)
        {
            Subscriber subscriber = db.Subscribers.First(a => a.ID == changes.id);
            if (subscriber.Email != changes.email)
                subscriber.Email = changes.email;
            if (subscriber.FirstName != changes.firstName)
                subscriber.FirstName = changes.firstName;
            if (subscriber.LastName != changes lastName)
                subscriber.LastName = changes lastName;
            db.SaveChanges();
        }*/

        public void RemoveFromDatabase(SubscribeViewModel entry)
        {
            try
            {
                Subscriber subscriber = db.Subscribers.Find(entry.id);
                db.Subscribers.Remove(subscriber);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
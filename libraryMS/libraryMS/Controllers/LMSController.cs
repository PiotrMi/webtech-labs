using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using libraryMS.Models;
using libraryMS.DAL;

namespace libraryMS.Controllers
{
    /**
     * Main controller of the application.
     * 
     * @author Junior
     */
    //Note: I added a default user with ID 1 and I am using it.
    // If you provide login, please keep track of the user ID and
    // inject it, where you find the corresponding TODO.
    public class LMSController : Controller
    {
        private DataAccess dtAccess = new DataAccess();

        // GET: /LMS/
        public ActionResult LibraryMS()
        {
            //store user Id and 
            //TODO change this with id of real user..
            ViewBag.UserID = 1;
            return View();
        }

        
        /**
         * Retrieve the data based on the parameter.
         * 
         */
        public ActionResult GetData(string param)
        {
            
            if ("AllBook" == param)
            {
                List<BookWithCategoryName> all = dtAccess.GetAllBooks();
                return Json(all, JsonRequestBehavior.AllowGet);
            }
            else if ("AvailableBook" == param)
            {
                List<BookWithCategoryName> list = dtAccess.GetAvailableBook();
                return Json(list,JsonRequestBehavior.AllowGet);
            }
            else if ("BorrowedBook" == param)
            {

                List<BookWithCategoryName> list = dtAccess.GetBorrowedBook(1);//TODO retrieve userID and sent it
                return Json(list, JsonRequestBehavior.AllowGet);
            }

            else if ("Categogry" == param)
            {
                List<CategoryNameWrapper> list = dtAccess.GetAllCategories();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else if ("History" == param)
            {
                List<HistoryItem> list = dtAccess.GetUserHistory(1); //TODO retrieve user ID
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return new EmptyResult();
            }
        }

        /**
         * Called when user want to borrow some books
         */
        public ActionResult Borrow(string[] isbns)
        {
            bool result = false;
            if(isbns != null)
            {
                result = dtAccess.HandleBorrowBookRequest(isbns,1); //TODO retrieve userID and send it...
            }
            return new EmptyResult();
        }

        public ActionResult Return(string[] isbns)
        {
            if(isbns != null)
            {
                dtAccess.HandleReturnBookRequest(isbns,1); //TODO retrieve UserId and send it...
            }
            return new EmptyResult();
        }
    }
}

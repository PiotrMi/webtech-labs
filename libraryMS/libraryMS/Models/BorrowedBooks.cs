using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace libraryMS.Models
{
    /**
     * @author Junior
     */ 
    public class BorrowedBooks
    {
        public virtual int ID { get; set; }

        public virtual int UserID { get; set; }

        public virtual int BookID { get; set; }

        //TODO delete me....
        public virtual string BookISBN { get; set; }

    }
}
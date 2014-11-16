using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace libraryMS.Models
{
    /**
     * An item in the history of they user.
     */
    public class HistoryItem
    {
        public virtual int ID { get; set; }

        public virtual int BookID { get; set; }

        public virtual string BookISBN { get; set; }

        public virtual int UserID { get; set; }

        public string Type { get; set; }

        public string Date { get; set; }
        
        /**
         * A book has been borrowed.
         */
        public const string BORROW = "BORROW";
        
        /**
         * A book has been returned
         */
        public const string RETURN = "RETURN";

        
        public HistoryItem SetIsBorrow()
        {
            Type = BORROW;
            return this;
        }

        public HistoryItem SetIsReturn()
        {
            Type = RETURN;
            return this;
        }

    }
}
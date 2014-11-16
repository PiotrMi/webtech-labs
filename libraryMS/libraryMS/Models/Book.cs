using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace libraryMS.Models
{
    /**
     * Default implementation.
     * 
     * @author: Junior
     */
    public class Book
    {
        public int ID { get; set; }

        public string Author { get; set; }

        public string Publisher { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }

        public string ISBN { get; set; }

        public int TotalCount { get; set; }

        public int Count { get; set; }

        public int CategoryID { get; set; }
    }
}
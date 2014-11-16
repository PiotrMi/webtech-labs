using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace libraryMS.Models
{
    /**
     * @author Junior
     */
    public class BookWithCategoryName  : Book
    {
        public string Name;

        public BookWithCategoryName() { }
        public BookWithCategoryName(Book b, string name)
        {
            this.Name = name;
            this.Author = b.Author;
            this.Publisher = b.Publisher;
            this.Title = b.Title;
            this.SubTitle = b.SubTitle;
            this.ISBN = b.ISBN;
        }

    }
}
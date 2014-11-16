using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace libraryMS.Models
{
    /**
     * Encapsulates the name of a category.
     * 
     * @author Junior
     */
    public class CategoryNameWrapper
    {
        public int ItemCount;
        public string Name;

        public CategoryNameWrapper(string catName, int count)
        {
            this.Name = catName;
            this.ItemCount = count;
        }
    }
}
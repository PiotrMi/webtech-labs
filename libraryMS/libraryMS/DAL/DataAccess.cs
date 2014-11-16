using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

using libraryMS.Models;

namespace libraryMS.DAL
{
    /**
     * Data access point.
     * 
     * @author Junior
     */
    public class DataAccess : DbContext
    {


        public DataAccess() : base("DataAccess")
        {
            Database.SetInitializer<DataAccess>(new CreateDatabaseIfNotExists<DataAccess>());
        }
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categorys { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<HistoryItem> HistoryItems { get; set; }
        public DbSet<BorrowedBooks> BorrowedBooks { get; set; }

        public List<BookWithCategoryName> GetAllBooks()
        {
            List<BookWithCategoryName> resList = new List<BookWithCategoryName>();
           List<Book> list = Books.ToList();
            Category cat;
            foreach(Book b in list){
                cat = this.Categorys.Single<Category>(c => c.ID == b.CategoryID);
                resList.Add(new BookWithCategoryName(b,cat.Name));
            }
            
            return resList;
        }

        public List<CategoryNameWrapper> GetAllCategories()
        {
            List<Category> list = Categorys.ToList();
            List<CategoryNameWrapper> wrapperList = new List<CategoryNameWrapper>();
            foreach(Category category in list){
                wrapperList.Add(GetCategoryWrapper(category));
            }
            return wrapperList;

        }

        private CategoryNameWrapper GetCategoryWrapper(Category category)
        {
            //what about caching???
            //compute the number of book in category c;
            IQueryable<Book> q = this.Books.Where<Book>(book => book.CategoryID == category.ID);
            int count = 0;
            foreach(Book b in q){
                count += b.Count;
            }
            return new CategoryNameWrapper(category.Name, count);
        }

        public List<BookWithCategoryName> GetAvailableBook()
        {
            List<BookWithCategoryName> resList = new List<BookWithCategoryName>();
            List<Book> books = this.Books.Where<Book>(book => book.Count > 0).ToList();
            Category cat;
            foreach (Book b in books)
            {
                cat = this.Categorys.Single<Category>(c => c.ID == b.CategoryID);
                resList.Add(new BookWithCategoryName(b, cat.Name));
            }
            return resList;
        }

        // All books the users has borrowed so far
        public List<BookWithCategoryName> GetBorrowedBook(int userId)
        {
            List<BookWithCategoryName> resList = new List<BookWithCategoryName>();
            IQueryable<BorrowedBooks> q = this.BorrowedBooks.Where<BorrowedBooks>(b => b.UserID == userId);
            Book tmpB;
            string name;
            foreach(BorrowedBooks bb  in q){
                tmpB = this.Books.Single<Book>(bo => bo.ID == bb.BookID);
                name = this.Categorys.Single<Category>(c => c.ID == tmpB.CategoryID).Name;
                resList.Add(new BookWithCategoryName(tmpB, name));
            }
            return resList;
        }

        public List<HistoryItem> GetUserHistory(int userId)
        {
            return  this.HistoryItems.Where<HistoryItem>(i => i.UserID == userId).ToList();
        }

        /**
         * A user can not borrow more than one exemplar of a book. 
         */
        private bool CanBorrowBook(Book b, int userId)
        {
            int c = this.BorrowedBooks.Count<BorrowedBooks>(p => p.UserID == userId && p.BookID == b.ID);
            return c == 0;
        }
        
        public bool HandleBorrowBookRequest(string[] isbns, int userId)
        {
            bool result = true;
            Book book;
            int itemId;
            HistoryItem item;
            BorrowedBooks bb;
            int bbId;

            foreach(string isbn in isbns){
                try
                {
                    //find the corresponding book
                    book = this.Books.Single<Book>(b => b.ISBN == isbn);
                    if(!CanBorrowBook(book,userId)){
                        continue;
                    }
                    //decrease the number of exemplar
                    book.Count--;
                    this.Entry<Book>(book).State = EntityState.Modified;
                    this.SaveChanges();
                    
                    //keep track of the history
                    itemId = this.HistoryItems.Count<HistoryItem>() + 1;
                    item = new HistoryItem { ID = itemId, UserID= userId,BookID = book.ID, BookISBN = book.ISBN, Date =  DateTime.Today.ToString("g")};
                    item.SetIsBorrow();
                    this.HistoryItems.Add(item);
                    this.SaveChanges();
                    //mark the book as borrowed.
                    bbId = this.BorrowedBooks.Count<BorrowedBooks>() + 1;
                    bb = new BorrowedBooks { ID = bbId, BookID= book.ID, UserID= userId,BookISBN= book.ISBN};
                    this.BorrowedBooks.Add(bb);
                    this.SaveChanges();
                }
                catch
                {
                    result = false;
                }               
            }

            return result;
        }

        public bool HandleReturnBookRequest(string[] isbns,int userId)
        {
            bool result = true;
            Book book;
            int itemId;
            HistoryItem item;
            BorrowedBooks bb;
            try
            {
                foreach(string isbn in isbns){
                    //find the corresponding book
                    book = this.Books.Single<Book>(b => b.ISBN == isbn);
                    book.Count++; // one examplar avaible
                    this.Entry<Book>(book).State = EntityState.Modified;
                    this.SaveChanges();

                    //keep track of the history
                    itemId = this.HistoryItems.Count<HistoryItem>();
                    item = new HistoryItem { ID = itemId, UserID = userId, BookID = book.ID, BookISBN = book.ISBN, Date = DateTime.Today.ToString("g") };
                    item.SetIsReturn();
                    this.HistoryItems.Add(item);
                    this.SaveChanges();

                    //remove the book from the set of borrowed books
                    bb = this.BorrowedBooks.Single<BorrowedBooks>(p => p.BookID == book.ID && p.UserID == userId);
                    this.BorrowedBooks.Remove(bb);
                    this.SaveChanges();
                }
            }
            catch
            {
                result = false;
            }
            return result;
        }
    }
}
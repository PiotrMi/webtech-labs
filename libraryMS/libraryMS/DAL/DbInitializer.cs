using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using libraryMS.Models;

namespace libraryMS.DAL
{
    /**
     * Responsible for initializing the DB.
     * 
     * @author Junior
     */
    public class DbInitializer: System.Data.Entity.DropCreateDatabaseIfModelChanges<DataAccess>
    {
        protected override void Seed(DataAccess context)
        {
            base.Seed(context);
            
            var categorys = new List<Category>
            {
                new Category{ID=1,Name="Sport"},
                new Category{ID=2,Name="IT"},
                new Category{ID=3,Name="Mathematics"},
                new Category{ID=4,Name="Chemistry"},
                new Category{ID=5,Name="Physics"},
                new Category{ID=6,Name="Cooking"}
            };
            categorys.ForEach(c => context.Categorys.Add(c));
            context.SaveChanges();

            var books = new List<Book>{ 
                new Book{ID=1,CategoryID=2,Author="Michael Huth",Publisher="Cambridge University Press",Title="Logic in computer science",SubTitle="",ISBN="0 521 54310",TotalCount=5,Count=5},
                new Book{ID=2,CategoryID=1,Author="Hans-Wilhelm",Publisher="Limpert",Title="Tischtennis",SubTitle="",ISBN="3785312571",TotalCount=5,Count=5},
                new Book{ID=3,CategoryID=3,Author="Huckle Thomas",Publisher="Springer",Title="Numerik fuer Informatiker",SubTitle="",ISBN="3540423877",TotalCount=5,Count=5},
                new Book{ID=4,CategoryID=5, Author="Wannier Gregory H",Publisher="Wiley",Title="Statistical Physics", SubTitle="",ISBN="1004680041",TotalCount=5,Count=5}
            };
            books.ForEach(s => context.Books.Add(s));
            context.SaveChanges();

            var users = new List<User>{
                new User{ID=1,EmailAddress="no-reply@myCompany.com", Password="SystemUser"},
            };
            users.ForEach(u => context.Users.Add(u));
            context.SaveChanges();
        }
    }
}
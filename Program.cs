using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    var database = new Database();

    if (!database.Catagories.Any()) {
      database.Catagories.Add(new Catagory("Fruits & Vegtables"));
      database.Products.Add(new Product("Apple", 1));
      database.Products.Add(new Product("Banana", 1));
      database.Products.Add(new Product("Strawberry", 1));
      database.Products.Add(new Product("Lettuce", 1));
      database.Products.Add(new Product("Cucamber", 1));

      database.Catagories.Add(new Catagory("Snacks"));
      database.Products.Add(new Product("Bamba", 2));
      database.Products.Add(new Product("Pringles", 2));
      database.Products.Add(new Product("Biscuits", 2));
      database.Products.Add(new Product("Doritos", 2));

      database.Catagories.Add(new Catagory("Dairy Products"));
      database.Products.Add(new Product("Milk", 3));
      database.Products.Add(new Product("Cheese", 3));
      database.Products.Add(new Product("Butter", 3));
      database.Products.Add(new Product("Yogurt", 3));
      database.Products.Add(new Product("Cream", 3));

      database.Catagories.Add(new Catagory("Bevereges"));
      database.Products.Add(new Product("Coca Cola", 4));
      database.Products.Add(new Product("Fanta", 4));
      database.Products.Add(new Product("Grape Juice", 4));
      database.Products.Add(new Product("Orange Juice", 4));
      database.Products.Add(new Product("Beer", 4));
      database.Products.Add(new Product("Root Beer", 4));

      database.Catagories.Add(new Catagory("Cosmetics"));
      database.Products.Add(new Product("Soap", 5));
      database.Products.Add(new Product("Lotion Cream", 5));
      database.Products.Add(new Product("Shampoo", 5));

      database.SaveChanges();
    }

    while (true)
    {
      (var request, var response) = server.WaitForRequest();

      Console.WriteLine($"Recieved a request with the path: {request.Path}");

      if (File.Exists(request.Path))
      {
        var file = new File(request.Path);
        response.Send(file);
      }
      else if (request.ExpectsHtml())
      {
        var file = new File("website/pages/404.html");
        response.SetStatusCode(404);
        response.Send(file);
      }
      else
      {
        try
        {
          /*──────────────────────────────────╮
          │ Handle your custome requests here │
          ╰──────────────────────────────────*/
          if (request.Path == "getCatagories") {
            Catagory[] catagories = database.Catagories.ToArray();

            response.Send(catagories);
          }
          if (request.Path == "getCatagoryTitle") {
            int catagoryId = request.GetBody<int>();

            Catagory catagory = database.Catagories.Find(catagoryId)!;

            string catagoryTitle = catagory.Title;

            response.Send(catagoryTitle);
          }
          else
          {
            response.SetStatusCode(405);
          }

          database.SaveChanges();
        }
        catch (Exception exception)
        {
          Log.WriteException(exception);
        }
      }

      response.Close();
    }
  }
}


class Database() : DbBase("database")
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
  public DbSet<Catagory> Catagories { get; set; } = default!;
  public DbSet<Product> Products { get; set; } = default!;
}

class Catagory(string title)
{
  [Key] public int Id { get; set; } = default!;
  public string Title { get; set; } = title;
}

class Product(string title, int catagoryId)
{
  [Key] public int Id { get; set; } = default!;
  public string Title { get; set; } = title;
  public int CatagoryId { get; set; } = catagoryId;
  [ForeignKey("CatagoryId")] public Catagory Catagory { get; set; } = default!;
}
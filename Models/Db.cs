namespace webApi.Models;

public class Db
{
  public Db()
  {
    Addresses = new List<Address>() {
      new Address() { Id = 1, Street = "Byalsvagen", City = "Stockholm", Postcode = 1234 },
      new Address() { Id = 2, Street = "Ridley Road", City = "London", Postcode = 12838  },
    };
  }
  public List<Address> Addresses { get; set; }
}
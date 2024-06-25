namespace webApi.Models;

public class Address
{
    public int Id { get; set; }
    public string? Street { get; set; }
    public string? City { get; set; }
    public int Postcode { get; set; }
}
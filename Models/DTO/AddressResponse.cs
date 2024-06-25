using System.ComponentModel.DataAnnotations;
namespace webApi.Models.DTO;

public class AddressResponse
{
    public int Id { get; set; }
    public string? Street { get; set; }
    public string? City { get; set; }
    public int Postcode { get; set; }

}

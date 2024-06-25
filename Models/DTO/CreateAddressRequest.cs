using System.ComponentModel.DataAnnotations;
namespace webApi.Models.DTO;

public class CreateAddressRequest
{
    [Required]
    [MaxLength(20)]
    public string Street { get; set; }

    [Required]
    public string City { get; set; }

    [Required]
    [Range(10000, 99999, ErrorMessage = "Postcode must be a valid 5-digit number.")]

    public int Postcode { get; set; }
}

using Microsoft.AspNetCore.Mvc;
using System.Data.Common;
using webApi.Models;
using webApi.Models.DTO;

namespace webApi.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AddressesController : ControllerBase
{
    private Db _db;

    public AddressesController(Db db)
    {
        _db = db;

    }

    [HttpGet]
    // public List<Address> GetAllAddresses()
    // {
    //     return _db.Addresses;
    // }

    public ActionResult<List<AddressResponse>> GetAllAddresses()
    {
        var addresses = _db.Addresses.Select(a => new AddressResponse
        {
            Id = a.Id,
            Street = a.Street,
            City = a.City,
            Postcode = a.Postcode
        }).ToList();
        return Ok(addresses);
    }



    [HttpGet("{id}")]
    // public Address? GetAddressById(int id)
    // {
    //     return _db.Addresses.Find(a => a.Id == id);
    // }

    public ActionResult<AddressResponse> GetAddressById(int id)
    {
        var address = _db.Addresses.Find(d => d.Id == id);
        if (address == null)
        {
            return NotFound();
        }

        var response = new AddressResponse
        {
            Id = address.Id,
            Street = address.Street,
            City = address.City,
            Postcode = address.Postcode
        };

        return Ok(response);
    }



    [HttpPost]
    public IActionResult CreateNewAddress(CreateAddressRequest request)
    {

        var nextId = _db.Addresses.Count + 1;
        var newAddress = new Address()
        {
            Id = nextId,
            Street = request.Street,
            City = request.City,
            Postcode = (int)request.Postcode,
        };

        _db.Addresses.Add(newAddress);

        return CreatedAtAction(nameof(GetAddressById), new { id = nextId }, newAddress);
        //parameters Action Name, Route Values, Value we just addres 

    }

    [HttpPut("{id}")]

    public ActionResult<AddressResponse> UpdateAddressById(int id, [FromBody] CreateAddressRequest request)
    {
        var address = _db.Addresses.Find(a => a.Id == id);
        if (address == null)
        {
            return NotFound();
        }

        address.Street = request.Street;
        address.City = request.City;
        address.Postcode = request.Postcode;

        var updatedAddress = new AddressResponse
        {
            Id = address.Id,
            Street = address.Street,
            City = address.City,
            Postcode = address.Postcode
        };

        return Ok(updatedAddress);

    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAddress(int id)
    {

        var address = _db.Addresses.Find(a => a.Id == id);
        if (address == null)
        {
            return NotFound();
        }

        _db.Addresses.Remove(address);

        return NoContent();

    }

}
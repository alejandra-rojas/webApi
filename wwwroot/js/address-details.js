document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const addressId = urlParams.get("id");

  if (addressId) {
    fetchAddressDetails(addressId);
  }
});

function fetchAddressDetails(id) {
  fetch(`/api/Addresses/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("street").innerText = data.street;
      document.getElementById("city").innerText = data.city;
      document.getElementById("postcode").innerText = data.postcode;
    })
    .catch((error) => console.error("Error fetching address details:", error));
}

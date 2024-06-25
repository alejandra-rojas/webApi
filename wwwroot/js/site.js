const uri = "api/addresses";
let addresses = [];

function getAddresses() {
  fetch(uri)
    .then((response) => response.json())
    .then((data) => {
      addresses = data;
      displayAddresses(addresses);
    })
    .catch((error) => console.error("Unable to get addresses.", error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: "DELETE",
  })
    .then(() => getAddresses())
    .catch((error) => console.error("Unable to delete item.", error));
}

function displayEditForm(id) {
  const address = addresses.find((address) => address.id === id);

  document.getElementById("edit-Street").value = address.street;
  document.getElementById("edit-City").value = address.city;
  document.getElementById("edit-Postcode").value = address.postcode;
  document.getElementById("edit-id").value = address.id;
  document.getElementById("editForm").style.display = "block";
}

function updateItem() {
  const addressId = document.getElementById("edit-id").value;
  const addPostcodeTextbox = document.getElementById("edit-Postcode");

  const address = {
    id: parseInt(addressId, 10),
    street: document.getElementById("edit-Street").value.trim(),
    city: document.getElementById("edit-City").value.trim(),
    postcode: parseInt(addPostcodeTextbox.value.trim(), 10),
  };

  fetch(`${uri}/${addressId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then(() => getAddresses())
    .catch((error) => console.error("Unable to update item.", error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById("editForm").style.display = "none";
}

function _displayCount(itemCount) {
  const name = itemCount === 1 ? "address" : "addresses";

  document.getElementById("counter").innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  console.log(data);
  const tBody = document.getElementById("addresses");
  tBody.innerHTML = "";

  _displayCount(data.length);

  const button = document.createElement("button");

  data.forEach((item) => {
    let editButton = button.cloneNode(false);
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", `deleteItem(${item.id})`);

    let tr = tBody.insertRow();

    // Insert cells starting from index 0 to fill the row without leaving gaps
    let td1 = tr.insertCell(0);
    let link = document.createElement("a");
    link.href = `address-details.html?id=${item.id}`; // Set the href to the desired URL
    link.innerText = item.street; // Set the link text to the street
    link.title = "View address details"; // Optional: Set a title for the link
    td1.appendChild(link); // Append the link to the cell

    let td2 = tr.insertCell(1);
    let cityNode = document.createTextNode(item.city);
    td2.appendChild(cityNode);

    let td3 = tr.insertCell(2);
    let postcodeNode = document.createTextNode(item.postcode);
    td3.appendChild(postcodeNode);

    let td4 = tr.insertCell(3);
    td4.appendChild(editButton);

    let td5 = tr.insertCell(4);
    td5.appendChild(deleteButton);
  });

  addresses = data;
}

function displayAddresses(addresses) {
  const tBody = document.getElementById("addresses");
  tBody.innerHTML = "";

  addresses.forEach((address) => {
    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    let streetText = document.createTextNode(address.street);
    td1.appendChild(streetText);

    let td2 = tr.insertCell(1);
    let cityText = document.createTextNode(address.city);
    td2.appendChild(cityText);

    let td3 = tr.insertCell(2);
    let postcodeText = document.createTextNode(address.postcode);
    td3.appendChild(postcodeText);

    let td4 = tr.insertCell(3);
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", `displayEditForm(${address.id})`);
    td4.appendChild(editButton);

    let td5 = tr.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", `deleteItem(${address.id})`);
    td5.appendChild(deleteButton);
  });
}

function filterAddresses() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredAddresses = addresses.filter((address) => {
    return (
      address.street.toLowerCase().includes(searchInput) ||
      address.city.toLowerCase().includes(searchInput) ||
      address.postcode.toString().includes(searchInput)
    );
  });
  displayAddresses(filteredAddresses);
}

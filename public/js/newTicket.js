var modal = new bootstrap.Modal(document.getElementById("errorModal"))
const socket = io()

const ticketFormHandler = async () => {

  const title = document.querySelector('#title').value.trim();
  const carMake = document.querySelector('#carMake').value.trim();
  const carModel = document.querySelector('#carModel').value.trim();
  const modelYear = document.querySelector('#modelYear').value.trim();
  const issue = document.querySelector('#issue').value.trim();
  const street = document.querySelector("#street").value.trim()
  const city = document.querySelector("#city").value.trim()
  const state = document.querySelector("#state").value.trim()
  const zipCode = document.querySelector("#zip").value.trim()

  if (title && carMake && carModel && modelYear && issue && street && city && state && zipCode) {
    const response = await fetch('/tickets', {
      method: 'POST',
      body: JSON.stringify({ title, carMake, carModel, modelYear, issue, location: `${street}, ${city}, ${state} ${zipCode}` }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      var { id } = await response.json()
      socket.emit("ticket", {
        id: id,
        title: title,
        carMake: carMake,
        carModel: carModel,
        modelYear: modelYear,
        issue: issue
      })
      document.location.replace('/dashboard');
    } else {
      response.json().then((data) => {
        modal._element.querySelector(".modal-body").textContent = data
        modal.show()
        var close = modal._element.querySelectorAll(".close")
        close.forEach(close => close.addEventListener("click", () => modal.hide()))
      })
    }
  } else {
    modal._element.querySelector(".modal-body").textContent = "Invaild format"
    modal.show()
    var close = modal._element.querySelectorAll(".close")
    close.forEach(close => close.addEventListener("click", () => modal.hide()))
  }
}

document.querySelector('.btn-primary').addEventListener('click', ticketFormHandler);


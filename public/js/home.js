const socket = io()

socket.on("newTicket", (data) => {
  data = JSON.parse(data)
  var mainDiv = $("#main")
  const mechanic = $("#bidBtn").attr("mechanic");
  const card = $(`<div id='${data.id}' class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${data.username}</h5>
        <p class="card-text">${data.modelYear} ${data.carMake} ${data.carModel}</p>
        <p class="card-text">${data.title}</p>`)
  mainDiv.append(card)
  const cardBody = $(".card-body").last()
  if (document.querySelector('script[src="/js/newBid.js"]')) {
    cardBody.append(`<button href="#offcanvasExample${data.id}" id="bidCanvas" class="btn btn-primary"
          data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample">Place Bid</button>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample${data.id}"
          aria-labelledby="offcanvasExampleLabel">
          <div data-bs-theme="dark" class="offcanvas-header text-center">
            <div class="rows">
              <h5 class="offcanvas-user" id="offcanvasUser">${data.username}'s problem</h5>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div>
              <h5 class="offcanvas-title" id="ticket">${data.title}</h5>
              <div id="ticketissue">
                <div class="offcanvas-issue">${data.issue}</div>
                <form class="form bid-form">
                  <div class="mt-3 mb-3">
                    <label for="bidAmount" class="form-label">Expected Compensation</label>
                    <input type="number" placeholder="$" class="form-control" id="bidAmount${data.id}"
                      name="bidAmount">
                  </div>
                  <div class="mb-3">
                    <label for="bidMessage" class="form-label">Message to ${data.username}</label>
                    <textarea class="form-control" placeholder="Make yourself stand out and good luck!"
                      id="bidMessage${data.id}" name="bidMessage"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary submitBidBtn" id="bidBtn" mechanic="${mechanic}"
                    ticketId="${data.id}">Submit Bid</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`)
  }
})

socket.on("ticketDelete", (data) => {
  var offcanvas = $(`#offcanvasExample${data}`)
  var offcanvasBtn = $('> button', offcanvas)
  var ticket = $(`#${data}`)
  var ticketBtn = $('> button', ticket)
 offcanvasBtn.off()
 ticketBtn.off()
 offcanvas.remove()
 ticket.remove()
})
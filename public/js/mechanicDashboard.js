const socket = io()

const deleteBidHandler = async (element) => {

  const bid_id = element.getAttribute('bidId');

  if (bid_id) {
    const response = await fetch(`/bids/${bid_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete bid');
    }
  }
};

const deleteBidBtn = document.querySelectorAll('.deleteBid');

deleteBidBtn.forEach(function (element) {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    deleteBidHandler(element);
  })
});

socket.on("newTicketWinner", (data) => {
  data = JSON.parse(data)
  if (!$(`#${data.ticketId}`)) {
    return
  }
  const ticket = $(`#${data.ticketId}`)
  const ticketChildern = ticket.children()
  const ticketGranchildern = ticketChildern.children()
  const btn = ticketGranchildern.children(".btn")
  const bidId = btn.data("bidid")
  if (bidId == data.bidId) {
    var wonTickets = $("#wonTicketsHeader")
    if (wonTickets.length > 0) {
      var wonTicketList = $("#wonTicketList")
      wonTicketList.append(ticket)
    } else {
      var mainDiv = $(".my-view")
      var wonTicketsHeader = `<div id="wonTicketsHeader" class="container p-2 text-center mx-auto">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <h2>Your Won Bids</h2>
            </div>
          </div>
        </div>
      </div>
    </div>`
      mainDiv.append(wonTicketsHeader)
      const divEl = `<div class="container">
    <div id="wonTicketList" class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
    </div>
    </div>`
      mainDiv.append(divEl)
      const wonTicketList = $("#wonTicketList")
      wonTicketList.append(ticket)
      btn.off()
      btn.remove()
    }
  }
})
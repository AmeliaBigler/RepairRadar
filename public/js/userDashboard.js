import { socket } from "/js/socket.js";

const acceptBidHandler = async (element) => {

  const winner = element.getAttribute('mechanicId');
  const ticket_id = element.getAttribute('ticketId');
  const bid_id = element.getAttribute("bidId")

  if (winner) {
    const response = await fetch(`/tickets/${ticket_id}`, {
      method: 'PUT',
      body: JSON.stringify({ winner: winner }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log("Winner received")
      const ticketWinnerData = JSON.stringify({ ticketId: ticket_id, bidId: bid_id })
      socket.emit("ticketWinner", ticketWinnerData)
      socket.emit("ticketDelete", ticket_id)
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 1000)

    } else {
      alert('Failed to accept bid');
    }
  }
};

const acceptBidBtn = document.querySelectorAll('.acceptBid');

acceptBidBtn.forEach(function (element) {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    acceptBidHandler(element);
  })
});

const deleteTicketHandler = async (element) => {

  const ticket_id = element.getAttribute('ticketId');

  if (ticket_id) {
    const response = await fetch(`/tickets/${ticket_id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: ticket_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      socket.emit("ticketDelete", ticket_id)
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete ticket');
    }
  }
};

const deleteTicketBtn = document.querySelectorAll('.deleteTicket');

deleteTicketBtn.forEach(function (element) {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    deleteTicketHandler(element);
  })
});

socket.on("newBid", (data) => {
  console.log(data)
})
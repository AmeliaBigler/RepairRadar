import { socket } from "/js/socket.js";
const newBidHandler = async (element) => {

  const username = element.getAttribute('mechanic');
  const ticketId = element.getAttribute('ticketId');

  const amount = document.querySelector(`#bidAmount${ticketId}`).value.trim();
  const content = document.querySelector(`#bidMessage${ticketId}`).value.trim();

  if (amount && content && username) {
    const response = await fetch(`/bids/${ticketId}`, {
      method: 'POST',
      body: JSON.stringify({ amount, content, username }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create bid');
    }
  }
};

const submitBidBtns = document.querySelectorAll('.submitBidBtn');

submitBidBtns.forEach(function (element) {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    newBidHandler(element);
  })
});
const deleteBidHandler = async (element) => {

    const bid_id = element.getAttribute('bidId');
  
    if (bid_id) {
      const response = await fetch(`/bids/${bid_id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id: bid_id }),
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
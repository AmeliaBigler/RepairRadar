const ticketFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const carMake = document.querySelector('#carMake').value.trim();
  const carModel = document.querySelector('#carModel').value.trim();
  const modelYear = document.querySelector('#modelYear').value.trim();
  const issue = document.querySelector('#issue').value.trim();

  if (title && carMake && carModel && modelYear && issue) {
    const response = await fetch('/tickets', {
      method: 'POST',
      body: JSON.stringify({ title, carMake, carModel, modelYear, issue }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to publish');
    }
  }
};

document.querySelector('.ticket-form').addEventListener('submit', ticketFormHandler);
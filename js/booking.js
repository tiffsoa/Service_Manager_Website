document.getElementById('booking-form').addEventListener('submit', async function(event) {
    event.preventDefault(); //to stop default form behaviour like reloading the page

    //take the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('tel').value;
    const message = document.getElementById('message').value;
    const frequency = document.getElementById('frequency').value;
    const serviceDate = document.getElementById('serviceDate').value;
    const comments = document.getElementById('comments').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;    

    const bookingData = {
        // customerId: 1, // how do we dynamically change the customerId 
        name,
        email,
        phoneNumber: tel,
        address,
        frequency,
        date: serviceDate,
        comments,
        payment,
        terms: true 
    };

    try {
        const response = await fetch('/bookings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error('Failed to save booking');
        }

        const newBooking = await response.json();

        // Fetch the booking details to display for confirmation
        const bookingResponse = await fetch(`/bookings/${newBooking.id}`);
        if (!bookingResponse.ok) {
            throw new Error('Failed to fetch booking details');
        }

        const booking = await bookingResponse.json();

        //display confirmation with form input values
        document.getElementById('confirmName').textContent = `Name: ${name}`;
        document.getElementById('confirmEmail').textContent = `Email: ${email}`;
        document.getElementById('confirmTel').textContent = `Phone: ${tel}`;
        document.getElementById('confirmMessage').textContent = `Address: ${message}`;
        document.getElementById('confirmFrequency').textContent = `Frequency: ${frequency}`;
        document.getElementById('confirmServiceDate').textContent = `Service Date: ${serviceDate}`;
        document.getElementById('confirmComments').textContent = `Comments: ${comments}`;
        document.getElementById('confirmPayment').textContent = `Payment by: ${payment}`;

        //show the confirmation section and hide the form
        document.getElementById('booking-form').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';
    } catch (error) {
        console.error(error);
        alert('An error occurred while processing your booking.');
    }
});

function resetForm() {
    //button that hides the confirmation section and returns to the form
    document.getElementById('confirmation').style.display = 'none';
    document.getElementById('booking-form').style.display = 'block';
    document.getElementById('booking-form').reset(); 
}

document.addEventListener('DOMContentLoaded', function(){
    const requestedService = document.querySelector('#manage-services h2');
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService){
        requestedService.textContent = `Requested Service: ${selectedService}`;
    }
});
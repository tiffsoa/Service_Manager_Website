//put the name of the service in h2:

// function displayServiceBooked(serviceArray){
//     serviceArray.forEach(service => {
//         <h2>${service.name}</h2>
//     })
// }

// displayServiceBooked(services);


document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); //to stop default form behaviour like reloading the page

    //take the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('tel').value;
    const message = document.getElementById('message').value;
    const frequency = document.getElementById('frequency').value;
    const serviceDate = document.getElementById('serviceDate').value;
    const comments = document.getElementById('comments').value;
    const payment = document.getElementById('card').value;
    

    //display confirmation with form input values
    document.getElementById('confirmName').textContent = `Name: ${name}`;
    document.getElementById('confirmEmail').textContent = `Email: ${email}`;
    document.getElementById('confirmTel').textContent = `Phone: ${tel}`;
    document.getElementById('confirmMessage').textContent = `Address: ${message}`;
    document.getElementById('confirmFrequency').textContent = `Frequency: ${frequency}`;
    document.getElementById('confirmServiceDate').textContent = `Service Date: ${serviceDate}`;
    document.getElementById('confirmComments').textContent = `Comments: ${comments}`;
    document.getElementById('confirmPayment').textContent = `Payment by card: ${payment}`;

    //show the confirmation section and hide the form
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
});

function resetForm() {
    //button that hides the confirmation section and returns to the form
    document.getElementById('confirmation').style.display = 'none';
    document.getElementById('booking-form').style.display = 'block';
    document.getElementById('booking-form').reset(); 
}



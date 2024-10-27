//put the name of the service in h2:

// function displayServiceBooked(serviceArray){
//     serviceArray.forEach(service => {
//         <h2>${service.name}</h2>
//     })
// }

// displayServiceBooked(services);

bookButtons.forEach(button => {
    button.addEventListener("click", function() {
        alert("You have successfully booked the service! :).");
        window.location.href = "customer_dashboard.html";
    });
});
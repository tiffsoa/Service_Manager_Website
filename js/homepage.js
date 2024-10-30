let companyName = "AllHomia";

function updateCompanyName(name) {
    const elements = document.querySelectorAll(".company");
    elements.forEach(element => {
        element.innerText = name;
    });
}

updateCompanyName(companyName);
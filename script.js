// This code updates the footer year automatically.
// It helps keep the portfolio updated without changing the HTML every year.

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();


// This code adds a small active effect to the navigation links when clicked.

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.forEach(function (item) {
            item.classList.remove("active-link");
        });

        link.classList.add("active-link");
    });
});
// This code updates the footer year automatically.
// It helps keep the portfolio updated without changing the HTML every year.

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

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

// This code controls the carousel sections.
// It works for both Certifications and Projects.

const carouselWrappers = document.querySelectorAll(".carousel-wrapper");

carouselWrappers.forEach(function (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const prevButton = carousel.querySelector(".prev-btn");
    const nextButton = carousel.querySelector(".next-btn");
    const cards = carousel.querySelectorAll(".card");

    let currentIndex = 0;

    function getCardsPerView() {
        if (window.innerWidth <= 520) {
            return 1;
        }

        if (window.innerWidth <= 950) {
            return 2;
        }

        return 3;
    }

    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        const cardWidth = cards[0].offsetWidth;
        const gap = 24;

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }

    nextButton.addEventListener("click", function () {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, cards.length - cardsPerView);

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        updateCarousel();
    });

    prevButton.addEventListener("click", function () {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, cards.length - cardsPerView);

        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }

        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
});



// This code controls the light/dark theme toggle.
// The initial theme is set by a small script in <head> (saved choice,
// otherwise the system setting); this only handles clicks and keeps
// following the system while the visitor hasn't picked a theme.

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        );
    }
}

function getSavedTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (error) {
        return null;
    }
}

applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

        applyTheme(nextTheme);

        try {
            localStorage.setItem("theme", nextTheme);
        } catch (error) {
            // Storage blocked (private mode) — the theme still switches for this visit.
        }
    });
}

systemDark.addEventListener("change", function (event) {
    if (!getSavedTheme()) {
        applyTheme(event.matches ? "dark" : "light");
    }
});

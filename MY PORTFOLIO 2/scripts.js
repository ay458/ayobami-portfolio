
/* =========================================
   1. SELECT HTML ELEMENTS
========================================= */

const themeButton = document.getElementById("theme-toggle");
const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const scrollTopButton = document.getElementById("scroll-top");

const welcomeButton = document.getElementById("welcome-btn");
const welcomeMessage = document.getElementById("welcome-message");

const yearElement = document.getElementById("year");

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");


/* =========================================
   2. DARK AND LIGHT MODE
========================================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-mode");

    themeButton.textContent = isDark ? "☀️" : "🌙";

    themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

updateThemeButton();

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
});


/* =========================================
   3. MOBILE NAVIGATION MENU
========================================= */

menuButton.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    menuButton.textContent = isOpen ? "✕" : "☰";

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the mobile menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");

        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});

// Close the menu when Escape is pressed
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        navLinks.classList.remove("active");

        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});


/* =========================================
   4. WELCOME BUTTON
========================================= */

welcomeButton.addEventListener("click", function () {
    welcomeMessage.textContent =
        "Hello! 👋 Thanks for visiting my portfolio. Feel free to explore my projects!";
});


/* =========================================
   5. SCROLL-TO-TOP BUTTON
========================================= */

function updateScrollButton() {
    scrollTopButton.classList.toggle(
        "visible",
        window.scrollY > 350
    );
}

window.addEventListener("scroll", updateScrollButton, {
    passive: true
});

updateScrollButton();

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================================
   6. AUTOMATIC COPYRIGHT YEAR
========================================= */

yearElement.textContent = new Date().getFullYear();


/* =========================================
   7. CONTACT FORM VALIDATION
========================================= */

contactForm.addEventListener("submit", function (event) {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Read the form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Clear the previous status message
    formStatus.textContent = "";
    formStatus.style.color = "";

    // Check for empty fields
    if (!name || !email || !subject || !message) {
        showFormStatus(
            "Please fill in all the fields.",
            "error"
        );
        return;
    }

    // Check the email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showFormStatus(
            "Please enter a valid email address.",
            "error"
        );
        return;
    }

    // Check that the message is meaningful
    if (message.length < 10) {
        showFormStatus(
            "Please write a message with at least 10 characters.",
            "error"
        );
        return;
    }

    /*
       Validation passed.

       This form does not send an email yet.
       A backend or form service is needed for delivery.
    */

    showFormStatus(
        "Your details look good! The form is validated, but message delivery has not been configured yet.",
        "success"
    );
});


function showFormStatus(message, type) {
    formStatus.textContent = message;

    if (type === "error") {
        formStatus.style.color = "#dc2626";
    } else {
        formStatus.style.color = "#16a34a";
    }
}


const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .detail-card, " +
    ".skill-card, .project-card, .contact-info, .contact-form"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
    revealElements.forEach(function (element) {
        element.classList.add("revealed");
    });
} else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("revealed");
    });
}

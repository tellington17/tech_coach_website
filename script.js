// -----------------------------
// Inject header, then wire navbar
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(r => r.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;

            // After header is injected, wire up Bootstrap navbar behaviors
            setupNavbar();
            highlightActiveNav();
            adjustBodyPadding(); // set correct top padding under fixed navbar

            // Re-adjust padding when window resizes or navbar opens/closes
            window.addEventListener('resize', adjustBodyPadding);
        })
        .catch(err => console.error('Error loading header:', err));
});

// -----------------------------
// Inject footer (unchanged)
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html')
        .then(r => r.text())
        .then(html => {
            document.getElementById('footer').innerHTML = html;
        })
        .catch(err => console.error('Error loading footer:', err));
});

// -----------------------------
// EmailJS form handling (unchanged)
// -----------------------------
document.addEventListener("DOMContentLoaded", function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("DLMola9AEmeTtDNly");
    }
    const contactForm = document.getElementById("contact-form");
    if (contactForm && typeof emailjs !== 'undefined') {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            emailjs.sendForm("service_byuo014", "template_ghrdyjm", this)
                .then(() => {
                    alert("Message sent successfully!");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    alert("Failed to send message. Please try again later.");
                });
        });
    }
});

// -----------------------------
// Highlight current page in navbar
// -----------------------------
// Highlight current page in navbar (handles GitHub Pages root)
function highlightActiveNav() {
    let current = window.location.pathname.split('/').pop();

    // Handle root path (e.g., https://thetechguy.github.io/)
    if (current === '' || current === '/') {
        current = 'index.html';
    }

    document.querySelectorAll('.nav-link').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === current);
    });
}


// -----------------------------
// Bootstrap navbar behaviors
// - Close on link click / outside click / scroll
// - Keep hamburger ↔︎ X animation in sync
// - Keep items right aligned (handled by CSS), here we only manage state
// -----------------------------
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggler = document.querySelector('.navbar-toggler');
    const collapseEl = document.getElementById('navbarNav');

    if (!navbar || !toggler || !collapseEl) return;

    // Create a Collapse controller we can programmatically close
    const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });

    // Ensure initial icon state (hamburger)
    toggler.classList.add('collapsed');

    // Sync the icon on show/hide
    collapseEl.addEventListener('shown.bs.collapse', () => {
        toggler.classList.remove('collapsed');
      });
      collapseEl.addEventListener('hidden.bs.collapse', () => {
        toggler.classList.add('collapsed');
      });
      

    // Close when a nav link is clicked
    collapseEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            bsCollapse.hide();
        }
    });

    // Close when clicking outside the navbar
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && collapseEl.classList.contains('show')) {
            bsCollapse.hide();
        }
    });

    // Close when scrolling
    window.addEventListener('scroll', () => {
        if (collapseEl.classList.contains('show')) {
            bsCollapse.hide();
        }
    });
}

// -----------------------------
// Keep body content from hiding under fixed navbar
// (handles wrapping/two-line titles as well)
// -----------------------------
function adjustBodyPadding() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const h = nav.offsetHeight || 66;
    document.body.style.paddingTop = `${h}px`;
}

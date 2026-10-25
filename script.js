// =====================================================
// SITE SETTINGS — edit these in one place
// =====================================================
// Paste your Square Appointments (or Calendly) booking link here.
// While it's empty, every "Book a Free Call" button goes to the contact page.
const BOOKING_URL = "";

// =====================================================
// Inject header + footer, then wire everything up
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(r => r.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
            setupNavbar();
            highlightActiveNav();
            applyBookingLinks();
            adjustBodyPadding();
            window.addEventListener('resize', adjustBodyPadding);
        })
        .catch(err => console.error('Error loading header:', err));

    fetch('footer.html')
        .then(r => r.text())
        .then(html => {
            document.getElementById('footer').innerHTML = html;
            // Scripts inside injected HTML don't run, so set the year here
            const yr = document.getElementById('current-year');
            if (yr) yr.textContent = new Date().getFullYear();
            applyBookingLinks();
        })
        .catch(err => console.error('Error loading footer:', err));

    applyBookingLinks();   // buttons that live in the page itself
    preselectService();    // contact.html?service=...
    setupContactForm();
});

// =====================================================
// Booking buttons: any element with data-book
// =====================================================
function applyBookingLinks() {
    document.querySelectorAll('[data-book]').forEach(a => {
        if (BOOKING_URL) {
            a.href = BOOKING_URL;
            a.target = '_blank';
            a.rel = 'noopener';
        } else {
            a.href = 'contact.html#contact-form';
        }
    });
}

// =====================================================
// Contact form: pre-select a service from the URL
// e.g. contact.html?service=Wi-Fi%20Setup
// =====================================================
function preselectService() {
    const select = document.getElementById('service');
    if (!select) return;
    const wanted = new URLSearchParams(window.location.search).get('service');
    if (!wanted) return;
    const match = [...select.options].find(o => o.value === wanted);
    if (match) select.value = wanted;
}

// =====================================================
// EmailJS form handling
// =====================================================
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form || typeof emailjs === 'undefined') return;

    emailjs.init({ publicKey: "DLMola9AEmeTtDNly" });
    const status = document.getElementById('form-status');
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        button.disabled = true;
        button.textContent = 'Sending…';

        emailjs.sendForm("service_byuo014", "template_ghrdyjm", this)
            .then(() => {
                showStatus(status, 'success', "Thanks! Your message is on its way. I'll get back to you within one business day.");
                form.reset();
            })
            .catch(error => {
                console.error("EmailJS Error:", error);
                showStatus(status, 'danger', "Sorry, something went wrong. Please call or text 703-901-2781 instead.");
            })
            .finally(() => {
                button.disabled = false;
                button.textContent = 'Send Message';
            });
    });
}

function showStatus(el, type, msg) {
    if (!el) { alert(msg); return; }
    el.className = `alert alert-${type} mt-3 mb-0`;
    el.textContent = msg;
    el.classList.remove('d-none');
}

// =====================================================
// Highlight current page in navbar (handles site root)
// =====================================================
function highlightActiveNav() {
    let current = window.location.pathname.split('/').pop();
    if (current === '' || current === '/') current = 'index.html';

    document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === current);
    });
}

// =====================================================
// Bootstrap navbar behaviors
// =====================================================
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggler = document.querySelector('.navbar-toggler');
    const collapseEl = document.getElementById('navbarNav');
    if (!navbar || !toggler || !collapseEl || typeof bootstrap === 'undefined') return;

    const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });
    toggler.classList.add('collapsed');

    collapseEl.addEventListener('shown.bs.collapse', () => toggler.classList.remove('collapsed'));
    collapseEl.addEventListener('hidden.bs.collapse', () => toggler.classList.add('collapsed'));

    collapseEl.addEventListener('click', e => {
        if (e.target.classList.contains('nav-link') || e.target.classList.contains('btn')) bsCollapse.hide();
    });

    document.addEventListener('click', e => {
        if (!navbar.contains(e.target) && collapseEl.classList.contains('show')) bsCollapse.hide();
    });

    window.addEventListener('scroll', () => {
        if (collapseEl.classList.contains('show')) bsCollapse.hide();
    });
}

// =====================================================
// Keep content from hiding under the fixed navbar
// =====================================================
function adjustBodyPadding() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    document.body.style.paddingTop = `${nav.offsetHeight || 66}px`;
}

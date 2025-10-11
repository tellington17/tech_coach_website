// Dynamically load the header into the #header div
document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // Attach navbar behavior after header loads
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('open');
                });

                let lastScrollY = window.scrollY;
                window.addEventListener('scroll', () => {
                    if (navMenu.classList.contains('open') && window.scrollY > lastScrollY) {
                        navMenu.classList.remove('open');
                    }
                    lastScrollY = window.scrollY;
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));
});


function updateNavbarLogo() {
    const logoImg = document.getElementById('nav-logo-img');
    if (!logoImg) return; // in case header hasn't loaded yet

    const existingLogoText = document.querySelector('.nav-logo');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // MOBILE VIEW
        logoImg.src = 'images/logo-white-no-text.png';

        // Add text if not already present
        if (!existingLogoText) {
            const logoTextLink = document.createElement('a');
            logoTextLink.href = 'index.html';
            logoTextLink.classList.add('nav-logo');
            logoTextLink.textContent = 'The Tech Guy';
            logoImg.insertAdjacentElement('afterend', logoTextLink);
        }
    } else {
        // DESKTOP VIEW
        logoImg.src = 'images/logo-white-text.png';
        if (existingLogoText) existingLogoText.remove();
    }
}

// This function ensures logo updates AFTER header loads dynamically
function ensureLogoUpdates() {
    updateNavbarLogo();
    window.addEventListener('resize', updateNavbarLogo);
}

// Run immediately (for static pages)
window.addEventListener('load', ensureLogoUpdates);

// If your header loads dynamically (for example, via fetch or AJAX)
document.addEventListener('DOMContentLoaded', () => {
    // MutationObserver watches for header content being replaced
    const headerObserver = new MutationObserver(() => {
        ensureLogoUpdates();
    });

    const headerContainer = document.querySelector('header, #header');
    if (headerContainer) {
        headerObserver.observe(headerContainer, { childList: true, subtree: true });
    }
});


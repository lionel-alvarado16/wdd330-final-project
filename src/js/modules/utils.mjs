// DOM Selector Helper
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// Initialize Header Mobile Menu and Dynamic Footer
export function initHeaderAndFooter() {
    const menuButton = qs('#menu-button');
    const nav = qs('#primary-nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('open');
            nav.classList.toggle('open');
            menuButton.innerHTML = menuButton.classList.contains('open') ? '&times;' : '&#9776;';
        });
    }

    const yearSpan = qs('#currentYear');
    const lastModSpan = qs('#lastModified');

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan) lastModSpan.textContent = document.lastModified;
}
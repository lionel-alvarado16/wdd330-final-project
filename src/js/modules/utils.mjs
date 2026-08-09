// DOM Selector Utility Helper
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}
// Fetch and return template HTML as text
export async function loadTemplate(path) {
    const response = await fetch(path);
    if (response.ok) {
        return await response.text();
    }
    throw new Error(`Failed to load template at: ${path}`);
}

// Load Header and Footer Partials dynamically
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");

    const headerElement = qs('#main-header');
    const footerElement = qs('#main-footer');

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    initHeaderMenu();
    initFooterData();
}

function initHeaderMenu() {
    const menuButton = qs('#menu-button');
    const nav = qs('#primary-nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('open');
            nav.classList.toggle('open');
            menuButton.innerHTML = menuButton.classList.contains('open') ? '&times;' : '&#9776;';
        });
    }
}

function initFooterData() {
    const yearSpan = qs('#currentYear');
    const lastModSpan = qs('#lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (lastModSpan) {
        lastModSpan.textContent = document.lastModified;
    }
}
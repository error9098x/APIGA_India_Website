// Main JavaScript File 

// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Load header and footer
    const headerContainer = document.getElementById('header');
    const footerContainer = document.getElementById('footer');

    if (headerContainer) {
        fetch('/components/header.html')
            .then(response => response.text())
            .then(html => {
                headerContainer.innerHTML = html.replace(/APIGA Nepal 2024/g, 'APIGA India 2025');
            });
    }

    if (footerContainer) {
        fetch('/components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html.replace(/APIGA Nepal 2024/g, 'APIGA India 2025');
            });
    }
}); 

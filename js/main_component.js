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
        fetch('../components/header.html')
            .then(response => response.text())
            .then(html => {
                headerContainer.innerHTML = html;

                // Reinitialize mobile menu button after loading header
                const newMobileMenuButton = document.getElementById('mobile-menu-button');
                const newMobileMenu = document.getElementById('mobile-menu');

                if (newMobileMenuButton && newMobileMenu) {
                    newMobileMenuButton.addEventListener('click', () => {
                        newMobileMenu.classList.toggle('hidden');
                    });
                }
            });
    }

    if (footerContainer) {
        fetch('../components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
            });
    }
});

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

                // Initialize mobile dropdown toggles
                const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
                mobileDropdowns.forEach(dropdown => {
                    const trigger = dropdown.querySelector('.mobile-dropdown-trigger');
                    const menu = dropdown.querySelector('.mobile-dropdown-menu');
                    
                    if (trigger && menu) {
                        trigger.addEventListener('click', (e) => {
                            e.preventDefault();
                            dropdown.classList.toggle('active');
                            menu.classList.toggle('hidden');
                        });
                    }
                });

                // Initialize desktop click-based dropdown
                const navDropdowns = document.querySelectorAll('.nav-item-dropdown');
                navDropdowns.forEach(dropdown => {
                    const trigger = dropdown.querySelector('.dropdown-trigger');
                    
                    if (trigger) {
                        trigger.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Close other dropdowns
                            navDropdowns.forEach(other => {
                                if (other !== dropdown) {
                                    other.classList.remove('active');
                                }
                            });
                            
                            // Toggle current dropdown
                            dropdown.classList.toggle('active');
                        });
                    }
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.nav-item-dropdown')) {
                        navDropdowns.forEach(dropdown => {
                            dropdown.classList.remove('active');
                        });
                    }
                });
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

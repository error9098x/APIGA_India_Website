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

    // Hero Section Interactive Grid Logic
    const heroSection = document.querySelector('.hero-section');
    const heroGrid = document.querySelector('.hero-bg-grid');
    
    if (heroSection && heroGrid) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Efficiently update CSS variables
            requestAnimationFrame(() => {
                heroGrid.style.setProperty('--mouse-x', `${x}px`);
                heroGrid.style.setProperty('--mouse-y', `${y}px`);
            });
        });
        
        // Handle mouse leaving the section (reset center)
        heroSection.addEventListener('mouseleave', () => {
            heroGrid.style.setProperty('--mouse-x', '50%');
            heroGrid.style.setProperty('--mouse-y', '50%');
        });
    }

    if (headerContainer) {
        fetch('components/header.html')
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
            });
    }

    if (footerContainer) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
            });
    }
});

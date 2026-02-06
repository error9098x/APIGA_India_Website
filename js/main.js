document.addEventListener('DOMContentLoaded', function() {
    const deadlineCountdown = document.getElementById('deadline-countdown');
    const appBanner = document.getElementById('app-banner');

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
        fetch('components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
            });
    }

    if (deadlineCountdown && appBanner) {
        const deadlineUtc = Date.UTC(2026, 1, 8, 18, 29, 59);
        const urgentThresholdMs = 72 * 60 * 60 * 1000;

        const formatCountdown = (milliseconds) => {
            const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
        };

        const updateCountdown = () => {
            const nowUtc = Date.now();
            const remaining = deadlineUtc - nowUtc;

            if (remaining <= 0) {
                deadlineCountdown.textContent = 'Closed';
                appBanner.classList.remove('is-urgent');
                appBanner.classList.add('is-closed');
                return false;
            }

            deadlineCountdown.textContent = formatCountdown(remaining);
            if (remaining <= urgentThresholdMs) {
                appBanner.classList.add('is-urgent');
            } else {
                appBanner.classList.remove('is-urgent');
            }

            return true;
        };

        updateCountdown();
        const countdownInterval = setInterval(() => {
            if (!updateCountdown()) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer');

    if (headerContainer) {
        fetch('../components/header.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load header');
                return response.text();
            })
            .then(html => {
                headerContainer.innerHTML = html;

                const newMobileMenuButton = document.getElementById('mobile-menu-button');
                const newMobileMenu = document.getElementById('mobile-menu');

                if (newMobileMenuButton && newMobileMenu) {
                    newMobileMenuButton.addEventListener('click', () => {
                        newMobileMenu.classList.toggle('hidden');
                    });
                }

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

                const navDropdowns = document.querySelectorAll('.nav-item-dropdown');
                navDropdowns.forEach(dropdown => {
                    const trigger = dropdown.querySelector('.dropdown-trigger');
                    
                    if (trigger) {
                        trigger.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            navDropdowns.forEach(other => {
                                if (other !== dropdown) {
                                    other.classList.remove('active');
                                }
                            });
                            
                            dropdown.classList.toggle('active');
                        });
                    }
                });

                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.nav-item-dropdown')) {
                        navDropdowns.forEach(dropdown => {
                            dropdown.classList.remove('active');
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Error loading header:', error);
                headerContainer.innerHTML = '<nav class="bg-blue-600 p-4 text-white text-center">Navigation unavailable</nav>';
            });
    }

    if (footerContainer) {
        fetch('../components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load footer');
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerContainer.innerHTML = '<footer class="bg-gray-800 p-4 text-white text-center">Footer unavailable</footer>';
            });
    }
});

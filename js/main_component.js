// Shared header/footer loader used by every page. Components are fetched with
// root-absolute paths so the same script works from / and /pages/.
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer');

    initHeroGrid();

    if (headerContainer) {
        fetch('/components/header.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load header');
                return response.text();
            })
            .then(html => {
                headerContainer.innerHTML = html;
                initHeader();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                headerContainer.innerHTML = '<nav class="bg-blue-600 p-4 text-white text-center">Navigation unavailable</nav>';
            });
    }

    if (footerContainer) {
        fetch('/components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load footer');
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
                const year = footerContainer.querySelector('[data-current-year]');
                if (year) year.textContent = new Date().getFullYear();
                lazyLoadFooterGlobe(footerContainer);
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerContainer.innerHTML = '<footer class="bg-gray-800 p-4 text-white text-center">Footer unavailable</footer>';
            });
    }
});

function initHeader() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
        });
    }

    document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
        const trigger = dropdown.querySelector('.mobile-dropdown-trigger');
        const menu = dropdown.querySelector('.mobile-dropdown-menu');

        if (trigger && menu) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
                const isOpen = !menu.classList.toggle('hidden');
                trigger.setAttribute('aria-expanded', String(isOpen));
            });
        }
    });

    const navDropdowns = document.querySelectorAll('.nav-item-dropdown');
    const closeAll = (except) => navDropdowns.forEach(other => {
        if (other !== except) {
            other.classList.remove('active');
            const t = other.querySelector('.dropdown-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
        }
    });

    navDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeAll(dropdown);
                const isOpen = dropdown.classList.toggle('active');
                trigger.setAttribute('aria-expanded', String(isOpen));
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-dropdown')) closeAll();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAll();
    });

    markActiveNav();
}

// Fetches the dotted-globe script only when the footer is about to scroll into view.
function lazyLoadFooterGlobe(footer) {
    if (!footer.querySelector('canvas[data-dotted-globe]') || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const script = document.createElement('script');
        script.src = '/js/footer-globe.js';
        script.defer = true;
        document.body.appendChild(script);
    }, { rootMargin: '400px' });
    observer.observe(footer);
}

// Highlights the nav entry (or the dropdown that contains it) for the current page.
function markActiveNav() {
    const current = window.location.pathname.replace(/\/index\.html$/, '/') || '/';

    document.querySelectorAll('#header a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        if (href !== current) return;

        link.classList.add('active');
        link.setAttribute('aria-current', 'page');

        const dropdown = link.closest('.nav-item-dropdown');
        if (dropdown) {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) trigger.classList.add('active');
        }
    });
}

// Spotlight effect on the homepage hero grid that follows the cursor.
function initHeroGrid() {
    const heroSection = document.querySelector('.hero-section');
    const heroGrid = document.querySelector('.hero-bg-grid');
    if (!heroSection || !heroGrid) return;

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        requestAnimationFrame(() => {
            heroGrid.style.setProperty('--mouse-x', `${x}px`);
            heroGrid.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        heroGrid.style.setProperty('--mouse-x', '50%');
        heroGrid.style.setProperty('--mouse-y', '50%');
    });
}

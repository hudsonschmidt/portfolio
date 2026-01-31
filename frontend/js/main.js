// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggler = document.getElementById('navToggler');
    const navbarNav = document.getElementById('navbarNav');

    if (navToggler && navbarNav) {
        navToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });

        // Close menu when clicking a nav link (mobile)
        const navLinks = navbarNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991) {
                    navbarNav.classList.remove('show');
                }
            });
        });
    }
});

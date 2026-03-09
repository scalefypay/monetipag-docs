// Navigation and scroll behavior
document.addEventListener('DOMContentLoaded', function () {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.section');

        // Smooth scroll and active state
        navItems.forEach(item => {
                item.addEventListener('click', function (e) {
                        e.preventDefault();

                        // Remove active class from all items
                        navItems.forEach(nav => nav.classList.remove('active'));

                        // Add active class to clicked item
                        this.classList.add('active');

                        // Scroll to section
                        const targetId = this.getAttribute('href').substring(1);
                        const targetSection = document.getElementById(targetId);

                        if (targetSection) {
                                targetSection.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                });
                        }
                });
        });

        // Scroll spy - update active nav item based on scroll position
        function updateActiveNav() {
                let current = '';

                sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.clientHeight;

                        if (window.pageYOffset >= sectionTop - 100) {
                                current = section.getAttribute('id');
                        }
                });

                navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === '#' + current) {
                                item.classList.add('active');
                        }
                });
        }

        // Throttle scroll event for performance
        let scrollTimeout;
        window.addEventListener('scroll', function () {
                if (scrollTimeout) {
                        window.cancelAnimationFrame(scrollTimeout);
                }

                scrollTimeout = window.requestAnimationFrame(function () {
                        updateActiveNav();
                });
        });

        // Initial call to set active nav on page load
        updateActiveNav();
});

// Copy to clipboard functionality
function copyCode(button) {
        const codeBlock = button.closest('.code-block');
        const code = codeBlock.querySelector('code').textContent;

        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);

        // Select and copy
        textarea.select();
        document.execCommand('copy');

        // Remove textarea
        document.body.removeChild(textarea);

        // Visual feedback
        const originalText = button.textContent;
        button.textContent = 'Copiado!';
        button.style.background = 'rgba(16, 185, 129, 0.2)';
        button.style.borderColor = '#10b981';
        button.style.color = '#10b981';

        setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.style.borderColor = '';
                button.style.color = '';
        }, 2000);
}

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
}

// Add keyboard navigation
document.addEventListener('keydown', function (e) {
        // Press '/' to focus search (if implemented)
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                // Future: focus search input
        }

        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape') {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar.classList.contains('open')) {
                        sidebar.classList.remove('open');
                }
        }
});

// Add animation to sections on scroll (optional enhancement)
const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
                if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                }
        });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
});

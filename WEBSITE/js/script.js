// Mobile Menu Toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function () {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    this.innerHTML = navMenu.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Back to Top Button
window.addEventListener('scroll', function () {
    const backToTop = document.getElementById('backToTop');
    backToTop.classList.toggle('visible', window.pageYOffset > 300);
});

document.getElementById('backToTop').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loading Bar Animation
window.addEventListener('load', function () {
    const loadingBar = document.querySelector('.loading-bar');
    loadingBar.style.width = '100%';
    setTimeout(() => {
        loadingBar.style.opacity = '0';
        setTimeout(() => loadingBar.style.display = 'none', 300);
    }, 500);
});

// Scroll Animation
function checkVisibility() {
    document.querySelectorAll('.fade-in').forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Dark Mode Toggle
document.getElementById('themeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
}

// Current Time Display
function updateTime() {
    document.getElementById('currentTime').textContent =
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
updateTime();
setInterval(updateTime, 60000);

// Set dates for blog posts and articles
const now = new Date();
document.getElementById('post1-date').textContent = now.toLocaleDateString();
document.getElementById('post2-date').textContent = new Date(now - 86400000 * 2).toLocaleDateString();
document.getElementById('post3-date').textContent = new Date(now - 86400000 * 5).toLocaleDateString();

// Language Selector
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
let currentLanguage = localStorage.getItem('language') || 'en';

// Set initial language
updateLanguage(currentLanguage);

languageBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    languageDropdown.classList.toggle('show');
});

document.querySelectorAll('.language-dropdown a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        updateLanguage(lang);
        languageDropdown.classList.remove('show');

        // Update button text
        languageBtn.innerHTML = `<i class="fas fa-globe"></i> ${lang.toUpperCase()}`;
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', function () {
    languageDropdown.classList.remove('show');
});

function updateLanguage(lang) {
    document.querySelectorAll('[data-en], [data-id]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute(`data-${lang}`);
            } else {
                element.textContent = element.getAttribute(`data-${lang}`);
            }
        }
    });
}

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert(currentLanguage === 'en' ? 'Thanks for your submission! We\'ll be in touch soon.' : 'Terima kasih atas kiriman Anda! Kami akan segera menghubungi Anda.');
        this.reset();
    });
});

// Create water drop animations
function createWaterDrops() {
    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.className = 'water-drop';
        drop.style.left = `${Math.random() * 100}vw`;
        const size = Math.random() * 10 + 5;
        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.animationDuration = `${Math.random() * 5 + 3}s`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(drop);
    }
}
createWaterDrops();

// Add animation to logo text on hover
const logoText = document.querySelector('.logo-text');
if (logoText) {
    logoText.addEventListener('mouseenter', () => {
        logoText.style.animationDuration = '3s';
    });
    logoText.addEventListener('mouseleave', () => {
        logoText.style.animationDuration = '8s';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.getElementById('mobileMenuBtn').innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});
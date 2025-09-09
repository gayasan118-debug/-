// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.mobile-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = '전송 중...';
        submitButton.disabled = true;
        
        // Simulate network delay
        setTimeout(() => {
            alert('메시지가 성공적으로 전송되었습니다!');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
    
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Lazy loading for performance (if images were added)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle orientation change for mobile devices
    window.addEventListener('orientationchange', function() {
        // Close mobile menu on orientation change
        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Recalculate viewport height
        setTimeout(() => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 500);
    });
    
    // Set initial viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Performance optimization: debounce scroll events
    let ticking = false;
    
    function updateScrollPosition() {
        // Add scroll-based functionality here if needed
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    });
    
    // Add swipe gesture support for mobile
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!startX || !startY) {
            return;
        }
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Prevent horizontal scrolling when swiping vertically
        if (Math.abs(diffY) > Math.abs(diffX)) {
            return;
        }
        
        // Close mobile menu when swiping left
        if (diffX > 100 && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    document.addEventListener('touchend', function() {
        startX = 0;
        startY = 0;
    });
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
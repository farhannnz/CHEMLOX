// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // License Modal Functionality
    const licenseModal = document.getElementById('licenseModal');
    const licenseModalImage = document.getElementById('licenseModalImage');
    const closeLicenseModal = document.getElementById('closeLicenseModal');
    
    // Form A2 Card
    const formA2Card = document.getElementById('formA2Card');
    if (formA2Card) {
        formA2Card.addEventListener('click', function() {
            licenseModalImage.src = './lisence/a2.webp';
            licenseModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Form F Card
    const formFCard = document.getElementById('formFCard');
    if (formFCard) {
        formFCard.addEventListener('click', function() {
            licenseModalImage.src = './lisence/f.webp';
            licenseModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Form O Card
    const formOCard = document.getElementById('formOCard');
    if (formOCard) {
        formOCard.addEventListener('click', function() {
            licenseModalImage.src = './lisence/o.webp';
            licenseModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close License Modal
    if (closeLicenseModal) {
        closeLicenseModal.addEventListener('click', function() {
            licenseModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close Modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === pdfModal) {
            pdfModal.style.display = 'none';
            pdfViewer.src = '';
            document.body.style.overflow = '';
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
                
                // Close other open FAQs
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
            });
        });
    }

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    // Product Detail Toggle
    const productDetails = document.querySelectorAll('.product-detail');
    
    if (productDetails) {
        productDetails.forEach(product => {
            product.addEventListener('click', () => {
                product.classList.toggle('expanded');
            });
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                
                // Email validation
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        valid = false;
                        input.classList.add('error');
                    }
                }
            });
            
            if (valid) {
                // In a real application, you would send the form data to a server
                // For now, just show a success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank you for your message!</h3>
                        <p>We have received your inquiry and will get back to you shortly.</p>
                    </div>
                `;
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }

    // Product Image Hover Effect
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards) {
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Testimonial Slider (if exists)
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        let currentSlide = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const totalSlides = testimonials.length;
        
        // Auto slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
        
        function updateSlider() {
            testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }
});
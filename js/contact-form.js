document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show sending status
            formStatus.innerHTML = '<div class="alert alert-info">Sending your message...</div>';
            formStatus.style.display = 'block';
            
            // Get form data
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const phoneEl = document.getElementById('phone');
            const subjectEl = document.getElementById('subject');
            const messageEl = document.getElementById('message');
            
            // Check if all elements exist before accessing their values
            if (!nameEl || !emailEl || !phoneEl || !subjectEl || !messageEl) {
                formStatus.innerHTML = '<div class="alert alert-danger">Form elements not found. Please refresh the page and try again.</div>';
                return;
            }
            
            const formData = {
                name: nameEl.value,
                email: emailEl.value,
                phone: phoneEl.value,
                subject: subjectEl.value,
                message: messageEl.value
            };
            
            // Send data to Firebase
            saveContactForm(formData)
                .then(function(result) {
                    if (result.success) {
                        // Show success message
                        formStatus.innerHTML = '<div class="alert alert-success">Your message has been sent successfully!</div>';
                        // Reset form
                        contactForm.reset();
                    } else {
                        // Show error message
                        formStatus.innerHTML = `<div class="alert alert-danger">Failed to send message: ${result.error}</div>`;
                    }
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    formStatus.innerHTML = '<div class="alert alert-danger">An error occurred. Please try again later.</div>';
                });
        });
    }
});
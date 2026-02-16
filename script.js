// script.js – handles form submission + email sending (using EmailJS)
// Replace "YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", "YOUR_PUBLIC_KEY" with actual EmailJS credentials.

(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('coachingForm');

        // Load EmailJS library (if not already present)
        if (typeof emailjs === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
            script.onload = initEmailJS;
            document.head.appendChild(script);
        } else {
            initEmailJS();
        }

        function initEmailJS() {
            // ⚠️ REPLACE WITH YOUR ACTUAL PUBLIC KEY (from EmailJS)
            emailjs.init('YOUR_PUBLIC_KEY');   // <-- IMPORTANT: set your public key
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(form);
            const data = {
                fullName: formData.get('fullName'),
                age: formData.get('age'),
                height: formData.get('height'),
                weight: formData.get('weight'),
                goal: formData.get('goal'),
                obstacle: formData.get('obstacle')
            };

            // Basic validation (just in case)
            for (let key in data) {
                if (!data[key]) {
                    alert('Please fill all required fields.');
                    return;
                }
            }

            // Disable button to prevent double submission
            const submitBtn = form.querySelector('.ready-btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;

            // --- SEND EMAIL via EmailJS ---
            // ⚠️ REPLACE WITH YOUR SERVICE ID AND TEMPLATE ID
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: data.fullName,
                fullName: data.fullName,
                age: data.age,
                height: data.height,
                weight: data.weight,
                goal: data.goal,
                obstacle: data.obstacle,
                reply_to: 'admin@athithyafitness.in', // optional, or collect email if you add field
                to_email: 'your-email@gmail.com'       // <-- REPLACE WITH YOUR DESIRED EMAIL
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Application sent successfully! We’ll contact you soon.');
                form.reset();   // optional: clear form
                // Show a fake success message ID (like in UI)
                const msgDiv = document.getElementById('successMsg');
                if (msgDiv) {
                    msgDiv.style.visibility = 'visible';
                    msgDiv.style.height = 'auto';
                    msgDiv.style.padding = '10px';
                    msgDiv.style.background = '#1a2a1a';
                    msgDiv.style.color = '#b0e57c';
                    msgDiv.style.borderRadius = '40px';
                    msgDiv.style.marginTop = '1rem';
                    msgDiv.style.textAlign = 'center';
                    msgDiv.innerText = '✓ ID: APP-' + Math.floor(Math.random()*90000+10000);
                }
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                alert('Oops! Something went wrong. Please try again later.\n' + error);
            })
            .finally(function() {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    });
})();
// Contact Form Handler with Notifications
// Handles form submission and sends notifications

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // API endpoint - CRM with Telegram notifications
    apiEndpoint: 'https://viseyyon-website2.vercel.app/api/crm-submit',

    // Fallback email if API fails
    fallbackEmail: 'hello@viseyyon.in',
  };

  // Initialize form
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
  }

  // Handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.75"/>
      </svg>
      Sending...
    `;

    try {
      // Collect form data
      const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        company: form.company.value,
        companySize: form.companySize.value,
        interest: form.interest.value,
        message: form.message.value,
        timestamp: new Date().toISOString(),
      };

      // Send to API
      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success!
        showSuccessMessage(form, result.message);
        form.reset();
      } else {
        // API failed, try fallback email
        console.warn('API failed, using fallback:', result);
        fallbackToEmail(formData);
        showSuccessMessage(form, 'Message sent! We\'ll get back to you soon.');
        form.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);

      // Fallback to mailto
      const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        message: form.message.value,
        company: form.company.value,
      };
      fallbackToEmail(formData);

      showSuccessMessage(form, 'Opening email client... Please send the pre-filled email.');
    } finally {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  }

  // Show success message
  function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-top: 1rem;
      text-align: center;
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
    `;
    successDiv.innerHTML = `
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <path d="M22 4L12 14.01l-3-3"/>
      </svg>
      ${message}
    `;

    form.parentElement.appendChild(successDiv);

    // Remove after 5 seconds
    setTimeout(() => {
      successDiv.style.opacity = '0';
      successDiv.style.transition = 'opacity 0.3s';
      setTimeout(() => successDiv.remove(), 300);
    }, 5000);
  }

  // Fallback to email
  function fallbackToEmail(formData) {
    const subject = `Contact Form: ${formData.firstName} ${formData.lastName}`;
    const body = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company || 'N/A'}

Message:
${formData.message}

---
Sent from Viseyyon Contact Form
    `.trim();

    const mailtoLink = `mailto:${CONFIG.fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }

  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateY(-10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', function () {
	const form = document.forms['contact'];

	form.addEventListener('submit', function (e) {
		let isValid = true;

		// Validate required fields
		isValid = validateRequiredField('firstName') && isValid;
		isValid = validateRequiredField('lastName') && isValid;
		isValid = validateRequiredField('live') && isValid;
		isValid = validateRequiredField('message') && isValid;

		// Email: if empty, catch on submit
		const emailField = document.getElementById('email');
		const emailValue = emailField.value.trim();
		const emailError = document.getElementById('email-error');

		emailError.textContent = '';
		emailField.removeAttribute('aria-invalid');

		if (emailValue === '') {
			showError(emailField, 'Email is required.');
			isValid = false;
		}

		// Prevent form submission if there are errors
		if (!isValid) {
			e.preventDefault();
		}

		// Set dynamic subject
		const subjectField = document.querySelector('input[name="subject"]');
		if (subjectField) {
			const firstName = document.getElementById('firstName').value.trim();
			const lastName = document.getElementById('lastName').value.trim();
			const email = emailField.value.trim();
			subjectField.value = `ArtisanKitchenAndBath.ca - Inquiry from ${firstName} ${lastName} at ${email}`;
		}
	});

	// Real-time email format check on blur (only if not empty)
	const emailInput = document.getElementById('email');
	emailInput.addEventListener('blur', function () {
		const value = this.value.trim();
		if (value !== '' && !isValidEmail(value)) {
			showError(this, 'Please provide a valid email address.');
		} else if (value !== '') {
			clearError(this);
		}
	});

	// Validate required fields by ID
	function validateRequiredField(id) {
		const field = document.getElementById(id);
		const value = field.value.trim();
		const errorField = document.getElementById(`${id}-error`);
		errorField.textContent = '';
		field.removeAttribute('aria-invalid');

		// Strip the " (required)" part from the label
		let labelText = field.labels[0].textContent.replace(/\s*\(required\)/i, '');

		if (value === '') {
			showError(field, `${labelText} is required.`);
			return false;
		}

		return true;
	}

	// Show error with ARIA support
	function showError(field, message) {
		const errorField = document.getElementById(`${field.id}-error`);
		errorField.textContent = message;
		errorField.setAttribute('aria-live', 'polite');
		field.setAttribute('aria-invalid', 'true');
	}

	function clearError(field) {
		const errorField = document.getElementById(`${field.id}-error`);
		errorField.textContent = '';
		field.removeAttribute('aria-invalid');
	}

	function isValidEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	}
});

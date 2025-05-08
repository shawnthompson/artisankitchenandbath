document.addEventListener('DOMContentLoaded', function () {
	// Form submit event to validate required fields at once
	const form = document.forms['contact'];
	form.addEventListener('submit', function (e) {
		let isValid = true;

		// Validate required fields when form is submitted
		isValid = validateRequiredField(document.getElementById('firstName')) && isValid;
		isValid = validateRequiredField(document.getElementById('lastName')) && isValid;
		isValid = validateRequiredField(document.getElementById('live')) && isValid;
		isValid = validateRequiredField(document.getElementById('message')) && isValid;

		// Validate email on submission if empty
		const emailField = document.getElementById('email');
		if (emailField.value.trim() === '') {
			showError(emailField, 'Email is required.');
			isValid = false;
		}

		if (!isValid) {
			e.preventDefault(); // Prevent form submission if not valid
		}

		// Set the email subject dynamically
		const firstName = document.getElementById('firstName').value;
		const lastName = document.getElementById('lastName').value;
		const email = document.getElementById('email').value;
		const subjectField = document.querySelector('input[name="subject"]');
		subjectField.value = `ArtisanKitchenAndBath.ca - Inquiry from ${firstName} ${lastName} at ${email}`;
	});

	// Add blur event listener for real-time email validation
	document.getElementById('email').addEventListener('blur', function () {
		if (this.value.trim() !== '' && !isValidEmail(this.value.trim())) {
			showError(this, 'Please provide a valid email address.');
		} else {
			clearError(this);
		}
	});

	// Helper function to validate required fields on form submission
	function validateRequiredField(field) {
		const value = field.value.trim();
		const errorField = document.getElementById(`${field.id}-error`);
		let valid = true;

		// Reset any previous error message
		errorField.textContent = '';
		field.removeAttribute('aria-invalid');

		if (value === '') {
			showError(field, `${field.labels[0].textContent} is required.`);
			valid = false;
		}

		return valid;
	}

	// Helper function to show error messages
	function showError(field, message) {
		const errorField = document.getElementById(`${field.id}-error`);
		errorField.textContent = message;
		errorField.setAttribute('aria-live', 'polite');
		field.setAttribute('aria-invalid', 'true');
	}

	// Helper function to clear error messages
	function clearError(field) {
		const errorField = document.getElementById(`${field.id}-error`);
		errorField.textContent = '';
		field.removeAttribute('aria-invalid');
	}

	// Helper function to validate email format
	function isValidEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	}
});

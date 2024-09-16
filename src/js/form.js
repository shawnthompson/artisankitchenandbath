document.forms['contact'].addEventListener('submit', function (e) {
	// Collect form values
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const email = document.getElementById('email').value;

	// Set the email subject dynamically
	const subjectField = document.querySelector('input[name="subject"]');
	subjectField.value = `ArtisanKitchenAndBath.ca - Inquiry from ${firstName} ${lastName} at ${email}`;
});

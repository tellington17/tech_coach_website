document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            // Example using fetch to POST data to a backend or email service
            const response = await fetch('https://your-backend-or-email-service.com/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                console.error('Failed to send message', response.statusText);
                alert('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Error occurred while sending the message', error);
            alert('An error occurred. Please try again.');
        }
    });
});
import '../scss/custom.scss';

// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'

// Import the Bootstrap plugins individually as needed
// import { Tooltip, Toast, Popover } from 'bootstrap';

// || Custom JS for Form Submission
const handleFormSubmit = async (event: Event) => {
  event.preventDefault();
  // const apiEndpoint: URL = new URL('https://api.philiplane.io/contact');
  try {
    // const apiEndpoint: URL = new URL('http://localhost:3000/contact');
    const apiEndpoint: URL = new URL('https://api.philiplane.io/contact');
    
    const formSubmitted = event.target as HTMLFormElement;
    const formData: FormData = new FormData(formSubmitted);

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // const data = await response.json();
    // console.log('data >> ', data);
    console.log('response.ok >> ', response.ok);

    // Reset the form after submission
    formSubmitted.reset(); /* Under Construction */
  } catch (error) {
    console.error('error', error);
  }
};

const form = document.querySelector('form[name="contact"]');

if (form) {
  // Handle form submission
  form.addEventListener('submit', handleFormSubmit);
}

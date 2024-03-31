// TODO: Update the modal body content and title to reflect the actual status of the form submission
import { Modal } from 'bootstrap';

// The form input/textarea elements
const FIRST_NAME_INPUT = document.querySelector('[name="firstName"]') as HTMLInputElement;
const LAST_NAME_INPUT = document.querySelector('[name="lastName"]') as HTMLInputElement;
const EMAIL_INPUT = document.querySelector('[name="email"]') as HTMLInputElement;
const MESSAGE_TEXT_AREA = document.querySelector('[name="message"]') as HTMLTextAreaElement;

// The submit button
const SUBMIT_BUTTON = document.querySelector('button[type="submit"]') as HTMLButtonElement;

// The Bootstrap Modal where the user will be notified re: the status of the form submission
const FORM_STATUS_MODAL = new Modal('#formStatusModal', {
  backdrop: true,
});

// Utility to determine the API endpoint based on the current environment
function _getAPIEndpoint(): URL {
  const apiEndpoint: URL =
    window.location.hostname === 'localhost'
      ? new URL('http://localhost:3000/contact') /* Verify the PORT (Lambda default is 3000) */
      : new URL('https://api.philiplane.io/contact');

  return apiEndpoint;
}

function _disableFormElements(): void {
  FIRST_NAME_INPUT.disabled = true;
  LAST_NAME_INPUT.disabled = true;
  EMAIL_INPUT.disabled = true;
  MESSAGE_TEXT_AREA.disabled = true;
  // Most importantly, disable the submit button to prevent multiple submissions
  SUBMIT_BUTTON.disabled = true;
}

function _enableFormElements(): void {
  FIRST_NAME_INPUT.disabled = false;
  LAST_NAME_INPUT.disabled = false;
  EMAIL_INPUT.disabled = false;
  MESSAGE_TEXT_AREA.disabled = false;
  SUBMIT_BUTTON.disabled = false;
}

// Custom logic for handling/processing the form submission and updating the UI
export default async function handleFormSubmit(event: Event) {
  // Prevent the browser-default form submission as we are handling this programatically
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData: FormData = new FormData(form);
  const apiEndpoint: URL = _getAPIEndpoint();

  // Disable the form elements while the submission is in progress (ie) waiting for Lambda to process the request
  _disableFormElements();

  try {
    // Send the form data to the Contacts API
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!response.ok) {
      throw new Error(`Error during form submission: ${response.status}`);
    }

    // Reset the form after submission
    form.reset();
    FORM_STATUS_MODAL.show();

    // Re-enable all of the form elements after submission
    _enableFormElements();
  } catch (error) {
    console.error('error', error);
    _enableFormElements();
  }
}

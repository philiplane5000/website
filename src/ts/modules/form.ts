// TODO: Update the modal body content and title to reflect the actual status of the form submission
import { Modal } from 'bootstrap';

type FormStatus = 'success' | 'error';

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

function _updateFormModalContent(status: FormStatus): void {
  const modalTitleEl = document.querySelector('.modal-title') as HTMLElement;
  const modalBodyEl = document.querySelector('.modal-body') as HTMLElement;
  const myEmailAddress: string = 'philip@philiplane.io';

  const statusMessages = {
    success: {
      title: 'Thank you!',
      body: 'Your inquiry has been received and you can expect to hear back from me soon.',
    },
    error: {
      title: 'Something went wrong...',
      body: `I'm sorry, it looks like there's something wrong the inquiry form at the moment. Until this is resolved, please reach out directly via email at <a href="mailto:${myEmailAddress}" class="text-dark">${myEmailAddress}</a>.`,
    },
  };

  modalTitleEl.textContent = statusMessages[status].title;
  modalBodyEl.innerHTML = statusMessages[status].body;
}

// Utility to determine the API endpoint based on the current environment
function _getAPIEndpoint(): URL {
  const PORT: number = 3000; /* Verify the PORT (default for locally running Lambda is currently 3000) */

  const apiEndpoint: URL =
    window.location.hostname === 'localhost'
      ? new URL(`http://localhost:${PORT}/contact`)
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
    const response: Response = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!response.ok) {
      throw new Error(`Error during form submission: ${response.status}`);
    }

    // Update the modal to inform the user of successful submission
    _updateFormModalContent('success');
    FORM_STATUS_MODAL.show();
    // Clear and re-enable the form after submission
    form.reset();
    _enableFormElements();
  } catch (error) {
    // Log the error to the console for debugging purposes
    console.error('error', error);
    // Update the modal to inform the user of error during submission
    _updateFormModalContent('error');
    FORM_STATUS_MODAL.show();
    // Clear and re-enable the form after submission
    form.reset();
    _enableFormElements();
  }
}

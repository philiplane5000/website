import '../scss/custom.scss';
import handleFormSubmit from './modules/form';

const inquiryForm = document.querySelector('form[name="inquiry"]');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', handleFormSubmit);
}

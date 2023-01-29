import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

const input = document.querySelector('[name="email"]');
const textArea = document.querySelector('[name="message"]');
const localStorageFeedbackFormDataKey = 'feedback-form-state';

feedbackForm.addEventListener(
  'input',
  throttle(() => {
    const formData = {
      email: input.value,
      message: textArea.value,
    };
    localStorage.setItem(
      localStorageFeedbackFormDataKey,
      JSON.stringify(formData)
    );
  }, 500)
);

const localStorageFormData = localStorage.getItem(
  localStorageFeedbackFormDataKey
);

if (localStorageFormData) {
  const parsedFormData = JSON.parse(localStorageFormData);

  if (parsedFormData.email) input.value = parsedFormData.email;
  if (parsedFormData.message) textArea.value = parsedFormData.message;
}

feedbackForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = {
    email: input.value,
    message: textArea.value,
  };

  console.log(formData);

  localStorage.clear();

  input.value = '';
  textArea.value = '';
});

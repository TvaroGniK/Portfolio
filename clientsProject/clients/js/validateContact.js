export const validateContact = (contactType, contactInput) => {
  const writeValue = document.getElementById('writeName');
  const onlyNum = /[^0-9]+$/g;
  const onlyEmail = /[^a-zA-Z|@|.]+$/g;

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--grey-color)';
        writeValue.textContent = '';
    });
  };

  const showErrorMessage = (message, block, input) => {
    block.textContent = message;
    input.style.borderColor = 'var(--warring-color)';
  };

  onInputValue(contactInput);

  if (!contactInput.value) {
    showErrorMessage('заполните все открытые поля контактов', writeValue, contactInput)
        return false;
  };

  switch  (contactType.innerHTML) {
    case 'Телефон':
      if (onlyNum.test(contactInput.value)){
        showErrorMessage('Только цифры', writeValue, contactInput);
          return false;
      } else if (contactInput.value.length !== 11) {
        showErrorMessage('11 цифр', writeValue, contactInput);
        return false;
      } return true;
    case 'Email':
    if (onlyEmail.test(contactInput.value)){
      showErrorMessage('Используйте a-zA-Z, @ и .', writeValue, contactInput);
        return false;
    } return true;
    default:
      return true;
  };
};
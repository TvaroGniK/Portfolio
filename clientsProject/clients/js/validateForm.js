export const validateClientForm = () => {
  const userSurName = document.getElementById('floatingSurName'),
        userName = document.getElementById('floatingName'),
        userLastName = document.getElementById('floatingLastName'),
        writeSurName = document.getElementById('writeSurName'),
        writeName = document.getElementById('writeName'),
        writeLastName = document.getElementById('writeLastName'),
        mainError = document.getElementById('mainError'),
        requiredValue = document.getElementById('requiredValue');

  const validateArray = [mainError, writeSurName, writeName, writeLastName, requiredValue];
  const regexp = /[^а-яА-яёЁ]+$/g;

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--grey-color)';
      for (const item of validateArray) {
        item.textContent = '';
      };
    });


    input.oncut = input.oncopy = input.onpast = () => ('input', () => {
      input.style.borderColor = 'var(--grey-color)';
      for (const item of validateArray) {
        item.textContent = '';
      };
    });

    input.onchange = () => {
      input.style.borderColor = 'var(--grey-color)';
      if (userSurName.value && userName.value && userLastName.value) {
        for (const item of validateArray) {
          item.textContent = '';
        };
      };
    };
  };

  onInputValue(userSurName);
  onInputValue(userName);
  onInputValue(userLastName);

  const checkRequiredName = (input, message, name) => {
    if(!input.value) {
      console.log(input.value.length)
      input.style.borderColor = 'var(--warring-color)';
      message.textContent = `Введите ${name}`;
      return false;
    } else {
      message.textContent = '';
      return true;
    };
  }

  const checkByRegexp = (input, regexp) => {
    if(regexp.test(input.value)) {
      input.style.borderColor = 'var(--warring-color)';
      mainError.textContent = `используйте а-яА-яёЁ`;
      return false;
    } else {
      return true;
    };
  };

  if(!checkRequiredName(userSurName, writeSurName, 'Фамилию')){return false};
  if(!checkRequiredName(userName, writeName, 'Имя')){return false};
  // if(!checkRequiredName(userLastName, writeLastName, 'Отчество')){return false};
  if(!checkByRegexp(userSurName, regexp)){return false};
  if(!checkByRegexp(userName, regexp)){return false};
  if(!checkByRegexp(userLastName, regexp)){return false};

  return true;
};
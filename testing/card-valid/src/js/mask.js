import Inputmask from 'inputmask';

export const inputMask = () => {
  const inputCardNumber = document.getElementById('number');
  const inputCardDate = document.getElementById('date');
  const inputCardCode = document.getElementById('code');
  const email = document.getElementById('email');
  Inputmask({ mask: '9999 9999 9999 9999 [99]', placeholder: '' }).mask(
    inputCardNumber
  );
  Inputmask({ mask: '99[/99]', placeholder: '' }).mask(inputCardDate);
  Inputmask({ mask: '999', placeholder: '' }).mask(inputCardCode);

  return {
    inputCardNumber,
    inputCardDate,
    inputCardCode,
    email,
  };
};

import { renderCard } from '../src/js/veiwCrad.js';

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, Email.', () => {
  const placeholderCard = 'Номер карты';
  const placeholderDate = 'ММ/ГГ';
  const placeholderCVC = 'CVV/CVC';
  const placeholderEmail = 'Email';
  const form = renderCard();
  expect(form.form).toBeInstanceOf(HTMLFormElement);

  const inputsArray = form.form.querySelectorAll('input');
  expect(inputsArray.length).toBe(4);
  expect(inputsArray[0].placeholder).toBe(placeholderCard);
  expect(inputsArray[1].placeholder).toBe(placeholderDate);
  expect(inputsArray[2].placeholder).toBe(placeholderCVC);
  expect(inputsArray[3].placeholder).toBe(placeholderEmail);
});

import { validNumber, validCodeCVV } from '../src/js/validateInputCard.js';

test('Валидация номера карты пропускает корректный номер карты.', () => {
  expect(validNumber('4893 4703 3104 1845')).toBe(true);
  expect(validNumber('53682902 0110 1112')).toBe(true);
  expect(validNumber('4916108926268679')).toBe(true);
  expect(validNumber('6390 0230 9005 7121 77')).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
  expect(validNumber('йцук 4703 3104 1845')).toBe(false);
  expect(validNumber('qwer2902 0110 1112')).toBe(false);
  expect(validNumber('....108926268679')).toBe(false);
  expect(validNumber('6390 0230 9005 7121 **')).toBe(false);
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  expect(validNumber('4893 4703 3104 184')).toBe(false);
  expect(validNumber('53682902 0110 111 ')).toBe(false);
  expect(validNumber('49161089262686')).toBe(false);
  expect(validNumber('6390')).toBe(false);
});

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр (больше, 18)', () => {
  expect(validNumber('4893 4703 3104 1845 545')).toBe(false);
  expect(validNumber('4893 4703 3104 1845 54544444444')).toBe(false);
  expect(validNumber('491610892626869684131866431321')).toBe(false);
  expect(validNumber('489347033103205545')).toBe(false);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами.', () => {
  expect(validCodeCVV('489')).toBe(true);
  expect(validCodeCVV('123')).toBe(true);
  expect(validCodeCVV('951')).toBe(true);
  expect(validCodeCVV('753')).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами.', () => {
  expect(validCodeCVV('48')).toBe(false);
  expect(validCodeCVV('12')).toBe(false);
  expect(validCodeCVV('9')).toBe(false);
  expect(validCodeCVV('7')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами.', () => {
  expect(validCodeCVV('48775')).toBe(false);
  expect(validCodeCVV('1234')).toBe(false);
  expect(validCodeCVV('951554')).toBe(false);
  expect(validCodeCVV('7756')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания).', () => {
  expect(validCodeCVV('4q.')).toBe(false);
  expect(validCodeCVV('1f*')).toBe(false);
  expect(validCodeCVV('фыв')).toBe(false);
  expect(validCodeCVV('ф5с')).toBe(false);
});

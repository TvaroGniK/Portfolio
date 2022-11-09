import { el, setChildren } from 'redom';

export const renderCard = () => {
  const formWrapper = el('div.form-wrapper');
  const form = el('form.form', '');
  const inputCardNumberCreate = el('div.input-item', [
    el('div.input-item-title', 'Введите номер карты'),
    el(
      'label',
      { for: 'number' },
      el('input.input.input-card.input-number#number', {
        autocomplete: 'off',
        placeholder: 'Номер карты',
      })
    ),
  ]);
  const inputCardDateCreate = el('div.input-item', [
    el('div.input-item-title', 'Введите срок действия карты'),
    el(
      'label',
      el('input.input.input-card.input-date#date', {
        autocomplete: 'off',
        placeholder: 'ММ/ГГ',
      })
    ),
  ]);
  const inputCardCodeCreate = el('div.input-item', [
    el('div.input-item-title', 'Введите cvv карты'),
    el(
      'label',
      el('input.input.input-card.input-code#code', {
        autocomplete: 'off',
        placeholder: 'CVV/CVC',
      })
    ),
  ]);
  const inputEmailCreate = el('div.input-item', [
    el('div.input-item-title', 'Введите email'),
    el(
      'label',
      el('input.input.input-card.input-email#email', {
        placeholder: 'Email',
      })
    ),
  ]);
  const btnForm = el('button.button.btn-reset.btn-pay#btn-pay', 'Оплатить', {
    disabled: 'true',
  });

  setChildren(form, [
    inputCardNumberCreate,
    inputCardDateCreate,
    inputCardCodeCreate,
    inputEmailCreate,
    btnForm,
  ]);

  setChildren(formWrapper, form);

  return {
    form,
    formWrapper,
    btnForm,
  };
};

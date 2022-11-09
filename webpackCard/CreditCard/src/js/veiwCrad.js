import {
    el, mount, setChildren
} from "redom";

export const renderCard = () => {
    const formWrapper = el('div.form-wrapper')
    const form = el('form.form', '')
    const inputCardNumberCreate = el('div.input-item', [el('div.input-item-title', 'Введите номер карты'), el('label', {for: 'number'}, el('input.input.input-card.input-number#number', {autocomplete: 'off', placeholder: 'e.g. 1234 5678 9123 0000'}))]);
    const inputCardDateCreate = el('div.input-item', [el('div.input-item-title', 'Введите срок действия карты'), el('label', el('input.input.input-card.input-date#date', {autocomplete: 'off', placeholder: '12/24'}))]);
    const inputCardCodeCreate = el('div.input-item', [el('div.input-item-title', 'Введите cvv карты'), el('label', el('input.input.input-card.input-code#code', {autocomplete: 'off', placeholder: '123'}))]);
    const inputEmailCreate = el('div.input-item', [el('div.input-item-title', 'Введите email'), el('label', el('input.input.input-card.input-email#email', {placeholder: 'JohnDone@gmail.com'}))]);
    const btnForm = el('button.button.btn-reset.btn-pay#btn-pay', 'Оплатить', {disabled: 'true'});

    setChildren(form, [inputCardNumberCreate, inputCardDateCreate, inputCardCodeCreate, inputEmailCreate, btnForm]);
    setChildren(formWrapper, form);

    return {
        formWrapper,
        btnForm
    }
}


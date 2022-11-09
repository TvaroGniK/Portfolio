import { svgContactDefault, svgEl, svgSpiner } from "./svg.js";
import { svgContactHover } from "./svg.js";
import { createContactItem } from "./createContact.js"

export const createClientModal = () => {
  const modalTitle = document.createElement('h2'),
        form = document.createElement('form'),
        inputSurName = document.createElement('input'),
        labelSurName = document.createElement('label'),
        requireSurName = document.createElement('span'),
        inputName = document.createElement('input'),
        labelName = document.createElement('label'),
        requireName = document.createElement('span'),
        inputLastName = document.createElement('input'),
        labelLastName = document.createElement('label'),
        // addContactBtn = document.createElement('button'),
        addContactBtn = document.createElement('a'),
        contactBtnSvgDefault = document.createElement('span'),
        contactBtnSvgHover = document.createElement('span'),
        contactBtnEl = document.createElement('span'),
        contactsBlock = document.createElement('div'),
        contactBlockItem = document.createElement('div'),
        formFloatingName = document.createElement('div'),
        formFloatingSurName = document.createElement('div'),
        formFloatingLastName = document.createElement('div'),
        saveBtn = document.createElement('button'),
        cancelBtn = document.createElement('button'),
        modalClose = document.createElement('button');

  // validate
  const errorBlock = document.createElement('p'),
        mainError = document.createElement('span'),
        writeName = document.createElement('span'),
        writeSurName = document.createElement('span'),
        writeLastName = document.createElement('span'),
        requiredValue = document.createElement('span'),
        requiredContacts = document.createElement('span');

  // loadSpiner
  const saveSpiner = document.createElement('span');
  saveSpiner.classList.add('modal__spiner');
  saveSpiner.innerHTML = svgSpiner
  //
  errorBlock.classList.add('modal__error');
  mainError.id = 'mainError';
  writeName.id = 'writeName';
  writeSurName.id = 'writeSurName';
  writeLastName.id = 'writeLastName';
  requiredValue.id = 'requiredValue';
  requiredContacts.id = 'requiredContacts';
  //

  modalTitle.classList.add('modal__title');
  form.classList.add('modal__form');
  formFloatingName.classList.add('modal-floating');
  formFloatingSurName.classList.add('modal-floating');
  formFloatingLastName.classList.add('modal-floating');
  inputSurName.classList.add('modal__input');
  inputName.classList.add('modal__input');
  inputLastName.classList.add('modal__input');
  labelSurName.classList.add('modal__label');
  labelName.classList.add('modal__label');
  labelLastName.classList.add('modal__label');
  requireSurName.classList.add('modal__label');
  requireName.classList.add('modal__label');
  addContactBtn.classList.add('modal__btn-contact', 'modal__btn-contact--active', 'btn-reset');
  contactBtnSvgDefault.classList.add('btn-contact__svg', 'btn-contact__svg--default', 'btn-contact__svg--active');
  contactBtnSvgHover.classList.add('btn-contact__svg', 'btn-contact__svg--hover');
  contactsBlock.classList.add('modal__contact');
  contactBlockItem.classList.add('modal__contact-item');

  contactBtnEl.classList.add('btn-contact__svg', 'btn-contact__svg--el', 'btn-contact__svg--active');

  saveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
  cancelBtn.classList.add('modal__btn-cancel', 'btn-reset');
  modalClose.classList.add('modal__close', 'btn-reset');

  labelSurName.for = 'floatingSurName';
  labelName.for = 'floatingName';
  labelLastName.for = 'floatingLastName';

  inputSurName.id = 'floatingSurName';
  inputName.id = 'floatingName';
  inputLastName.id = 'floatingLastName';
  inputSurName.type = 'text';
  inputName.type = 'text';
  inputLastName.type = 'text';
  inputSurName.placeholder = 'Фамилия';
  inputName.placeholder = 'Имя';
  inputLastName.placeholder = 'Отчество';

  modalTitle.textContent = 'Новый клиент';
  labelSurName.textContent = 'Фамилия';
  labelName.textContent = 'Имя';
  labelLastName.textContent = 'Отчество';
  addContactBtn.textContent = 'Добавить контакт';
  saveBtn.textContent = 'Сохранить';
  cancelBtn.textContent = 'Отмена';
  requireSurName.textContent = '*';
  requireName.textContent = '*';
  // contactBtnSvgDefault.innerHTML = svgContactDefault;
  // contactBtnSvgHover.innerHTML = svgContactHover;
  contactBtnEl.innerHTML = svgEl;



  labelSurName.append(requireSurName);
  labelName.append(requireName);
  formFloatingSurName.append(inputSurName, labelSurName);
  formFloatingName.append(inputName, labelName);
  formFloatingLastName.append(inputLastName,  labelLastName);
  contactsBlock.append(contactBlockItem, addContactBtn);
  addContactBtn.append(contactBtnSvgDefault, contactBtnSvgHover, contactBtnEl);
  errorBlock.append(writeSurName, writeName, writeLastName, requiredValue, requiredContacts, mainError);
  saveBtn.append(saveSpiner);
  form.append (
    formFloatingSurName,
    formFloatingName,
    formFloatingLastName,
    contactsBlock,
    errorBlock,
    saveBtn,
    cancelBtn
  );

  // событие для добавления контакта клиента
  addContactBtn.addEventListener('click', (e) => {
    e.preventDefault;
    const contactsItems = document.getElementsByClassName('contact');
    if (contactsItems.length < 9) {
      const contactItem = createContactItem();
      contactBlockItem.append(contactItem.contact);
      if (contactsItems.length >= 5) {
        document.querySelector('.site-modal').style.alignItems = 'flex-start';
        document.querySelector('.site-modal').style.paddingTop = '120px';
      }
    } else {
      const contactItem = createContactItem();
      contactBlockItem.append(contactItem.contact);
      addContactBtn.classList.remove('modal__btn-contact--active');
    };
  });

  // иконка кнопки (можно удалить)
  addContactBtn.addEventListener('mousemove', ()=> {
    contactBtnSvgDefault.classList.remove('btn-contact__svg--active');
    contactBtnSvgHover.classList.add('btn-contact__svg--active');
  });

  addContactBtn.addEventListener('mouseleave', ()=> {
    contactBtnSvgDefault.classList.add('btn-contact__svg--active');
    contactBtnSvgHover.classList.remove('btn-contact__svg--active');
  });

  return {
    form,
    modalClose,
    modalTitle,
    cancelBtn,
    labelName,
    labelSurName,
    labelLastName,
    inputSurName,
    inputName,
    inputLastName,
    contactsBlock,
    addContactBtn,
  }


}
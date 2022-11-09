import { svgDelete } from "./svg.js";

export const createContactItem = () => {
  const contact = document.createElement('div'),
        contactType = document.createElement('div'),
        contactName = document.createElement('button'),
        contactList = document.createElement('ul'),
        contactPhone = document.createElement('li'),
        contactVK = document.createElement('li'),
        contactFB = document.createElement('li'),
        contactEmail = document.createElement('li'),
        contactOther = document.createElement('li'),
        contactInput = document.createElement('input'),
        contactDelete = document.createElement('button'),
        contactDeleteToiltip = document.createElement('span');

  contact.classList.add('contact');
  contactType.classList.add('contact__type');
  contactName.classList.add('contact__name', 'btn-reset');
  contactList.classList.add('contact__list', 'list-reset');
  contactPhone.classList.add('contact__item');
  contactVK.classList.add('contact__item');
  contactFB.classList.add('contact__item');
  contactEmail.classList.add('contact__item');
  contactOther.classList.add('contact__item');
  contactInput.classList.add('contact__input');
  contactDelete.classList.add('contact__delete', 'btn-reset');
  contactDeleteToiltip.classList.add('contact__tooltip', 'site-tooltip');

  contactName.textContent = 'Телефон';
  contactPhone.textContent = 'Телефон';
  contactVK.textContent = 'VK';
  contactFB.textContent = 'FaceBook';
  contactEmail.textContent = 'Email';
  contactOther.textContent = 'Другое';
  contactInput.placeholder = 'Введите данные контакта';
  contactInput.type = 'text';
  contactDeleteToiltip.textContent = 'Удалить данные';
  contactDelete.innerHTML = svgDelete;

  contact.append(contactType, contactInput, contactDelete);
  contactType.append(contactName, contactList);
  contactList.append(contactPhone, contactEmail, contactVK, contactFB, contactOther);
  contactDelete.append(contactDeleteToiltip);


// логика удаления контакта
  contactDelete.addEventListener('click', (e)=> {
    e.preventDefault();
    contact.remove();
    document.querySelector('.modal__btn-contact').classList.add('modal__btn-contact--active');
    const contactsItems  = document.getElementsByClassName('contact');
    if (contactsItems.length < 5 ) {
        document.querySelector('.site-modal').style.alignItems = 'center';
        document.querySelector('.site-modal').style.paddingTop = '0px';
    };
  });

// выпадающий список

  contactName.addEventListener('click', (e)=> {
    e.preventDefault();
    contactList.classList.toggle('contact__list--active');
    contactName.classList.toggle('contact__list--active');
  });

  // contactType.addEventListener('mouseleave', ()=> {
  //   contactList.classList.remove('contact__list--active');
  //   contactName.classList.remove('contact__list--active');
  // });

//Селекты

    const setType = (type) => {
      type.addEventListener('click', () => {
          contactName.textContent = type.textContent;
          contactList.classList.remove('contact__list--active');
          contactName.classList.remove('contact__list--active');
      });
    };

    const typesArrey = [contactEmail, contactVK, contactPhone, contactFB, contactOther];

    for (const type of typesArrey) {
      setType(type);
    };

  return {
    contact,
    contactName,
    contactInput,
    contactDelete,
  };
}
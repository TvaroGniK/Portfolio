import { createClientModal } from "./createClientModal.js"
import { sendClientData } from "./clientApi.js"
import { validateClientForm } from "./validateForm.js";
import { validateContact } from "./validateContact.js";
import { createClientItem } from "./createClientItem.js";

export const addClientModal = ()  => {
  const createForm = createClientModal();
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');

  modal.classList.add('modal', 'site-modal', 'modal-active');
  modalContent.classList.add('modal__content', 'site-modal__content', 'modal-active');
  createForm.form.classList.add('add-client');

  modal.append(modalContent);
  modalContent.append(createForm.modalTitle, createForm.form, createForm.modalClose);

  createForm.form.addEventListener('submit', async (e)=> {
    e.preventDefault();
    // console.log(validateClientForm())
    if (!validateClientForm()) {
      return;
      };
    let contacts = [];
    let clientObj = {};

    const contactType = document.querySelectorAll('.contact__name');
    const contactValue = document.querySelectorAll('.contact__input');
    // console.log(contactType)

    for (let i = 0; i < contactType.length; i++) {
      if(!validateContact(contactType[i], contactValue[i])){
        return;
      }
      contacts.push({
        type: contactType[i].innerHTML,
        value: contactValue[i].value,
      });
    };

    clientObj.surname = createForm.inputSurName.value.length == 0 ? '' : createForm.inputSurName.value.trim().toLowerCase().split(' ').map((word) => word[0].toUpperCase() + word.substr(1).toLocaleLowerCase()).join('');
    clientObj.name = createForm.inputName.value.length == 0 ? '' : createForm.inputName.value.trim().toLowerCase().split(' ').map((word) => word[0].toUpperCase() + word.substr(1).toLocaleLowerCase()).join('');
    clientObj.lastName = createForm.inputLastName.value.length == 0 ? '' : createForm.inputLastName.value.trim().toLowerCase().split(' ').map((word) => word[0].toUpperCase() + word.substr(1).toLocaleLowerCase()).join('');
    clientObj.contacts = contacts;
    // console.log(createForm.inputLastName.value)
    console.log(clientObj);
    const saveSpiner = document.querySelector('.modal__spiner');

    try {
      saveSpiner.style.display = 'block'
      const data = await sendClientData(clientObj, 'POST');
      setTimeout(()=> {
        document.querySelector('.clients__tbody').append(createClientItem(data));
        document.querySelector('.modal').remove();
      }, 1000)
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        saveSpiner.style.display = 'none';
      }, 1000);
    };
  });

  createForm.modalClose.addEventListener('click', () => {
    modal.remove();
  });

  createForm.cancelBtn.addEventListener ('click', (e)=> {
    e.preventDefault();
    modal.remove();
  });

  document.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.remove();
    };
  });

  return modal;
}

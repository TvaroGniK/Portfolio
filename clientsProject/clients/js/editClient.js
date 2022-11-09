import { sendClientData } from "./clientApi.js";
import { createClientModal } from "./createClientModal.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClientItem } from "./createClientItem.js";
import { validateClientForm } from "./validateForm.js";
import { validateContact } from "./validateContact.js";

export const editClientModal = (data) => {
  const editModal = document.createElement('div');
  const editModalContent = document.createElement('div');
  const createForm = createClientModal();
  const titleID = document.createElement('span')

  editModal.classList.add('modal-edit', 'site-modal', 'modal-active');
  editModalContent.classList.add('edit-modal__content', 'site-modal__content', 'modal-active');
  titleID.classList.add('modal__id');

  createForm.modalTitle.textContent = 'Изменить данные';
  createForm.cancelBtn.textContent = 'Удалить клиента';
  titleID.textContent = `ID:` + data.id.substr(-6, 6);

  createForm.modalTitle.append(titleID);
  editModalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);
  editModal.append(editModalContent);

  //
  createForm.modalClose.addEventListener('click', () => {
    editModal.remove();
  });

  //Удаление клиента
   createForm.cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal);

    import('./clientApi.js').then(({deleteClientItem}) => {
      deleteModal.deleteModalDelete.addEventListener('click', () => {
      deleteClientItem(data.id);
      document.getElementById(data.id).remove();
      });
    });
  });

  //
  createForm.inputName.value = data.name;
  createForm.inputSurName.value = data.surname;
  createForm.inputLastName.value = data.lastName;

  for (const contact of data.contacts) {
    const createContact = createContactItem();
    createContact.contactName.textContent = contact.type;
    createContact.contactInput.value = contact.value;
    createForm.contactsBlock.prepend(createContact.contact);
  };

  if (data.contacts.length === 10) {
    createForm.addContactBtn.classList.remove('modal__btn-contact--active');
  };

  // patch
  createForm.form.addEventListener('submit', async (e)=> {
    e.preventDefault();
    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let client = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if(!validateContact(contactTypes[i], contactValues[i])){
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      })
    }

    client.name = createForm.inputName.value;
    client.surname = createForm.inputSurName.value;
    client.lastName = createForm.inputLastName.value;
    client.contacts = contacts;

    // const editedData = await sendClientData(client, 'PATCH', data.id)
    // document.getElementById(editedData.id).remove();
    // document.querySelector('.clients__tbody').append(createClientItem(editedData));
    // document.querySelector('.modal-edit').remove();
    const saveSpiner = document.querySelector('.modal__spiner');
    try {
      saveSpiner.style.display = 'block';
      const editedData = await sendClientData(client, 'PATCH', data.id);
      setTimeout(()=> {
        document.getElementById(editedData.id).remove();
        document.querySelector('.clients__tbody').append(createClientItem(editedData));
        document.querySelector('.modal-edit').remove();
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        saveSpiner.style.display = 'none'
      }, 1000);
    };
  });

  //
  window.addEventListener('click', (e)=> {
    if (e.target === editModal) {
      editModal.remove();
    }
  })

  return{
    editModal,
    editModalContent,
  }
}
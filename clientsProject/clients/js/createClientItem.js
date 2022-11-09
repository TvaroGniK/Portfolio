// import { linkCardClient } from "./cardClient.js";
import { deleteClientItem, getClients } from "./clientApi.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { svgSpiner } from "./svg.js";
import { createContactItemByType, formatDate } from "./util.js";
import { formatTime } from "./util.js";

export const createClientItem = (data) => {
  const clientTr = document.createElement('tr'),
        clientIdTd = document.createElement('td'),
        clientId = document.createElement('span'),
        clientFullName = document.createElement('td'),
        clientName = document.createElement('span'),
        clientSurName = document.createElement('span'),
        clientLastName = document.createElement('span'),
        clientCreated = document.createElement('td'),
        createdTime = document.createElement('span'),
        createdDate = document.createElement('span'),
        clientChanged = document.createElement('td'),
        changeTime = document.createElement('span'),
        changedDate = document.createElement('span'),
        clientContacts = document.createElement('td'),
        clientContactsItem = document.createElement('span'),
        clientActions = document.createElement('td'),
        clientEdit = document.createElement('button'),
        clientDelete = document.createElement('button');

  // spiners
  const editSpiner = document.createElement('span');
  const deleteSpiner = document.createElement('span');

  editSpiner.classList.add('actions__spiner');
  deleteSpiner.classList.add('actions__spiner');

  editSpiner.innerHTML = svgSpiner;
  deleteSpiner.innerHTML = svgSpiner;

  const deleteClient = deleteClientModal();
  const editClient = editClientModal(data);

  clientTr.classList.add('client__item');
  clientTr.id = data.id;
  clientIdTd.classList.add('client__id');
  clientFullName.classList.add('client__full-name');
  clientName.classList.add('client__name');
  clientSurName.classList.add('client__surname');
  clientLastName.classList.add('client__lastname');

  clientCreated.classList.add('client__created');
  createdDate.classList.add('created__date');
  createdTime.classList.add('created__time');
  clientChanged.classList.add('client__changed');
  changeTime.classList.add('changed__time');
  changedDate.classList.add('changed__date');
  clientContacts.classList.add('client__contacts');
  clientContactsItem.classList.add('client__contacts');
  clientActions.classList.add('client__action');
  clientEdit.classList.add('client__edit', 'btn-reset');
  clientDelete.classList.add('client__delete', 'btn-reset');

  ///
  for (const contact of data.contacts) {
      createContactItemByType(contact.type, contact.value, clientContacts);
  }
  ///удаление с сервера
  const deleteById = () => {
    deleteClient.deleteModalDelete.addEventListener ('click', async ()=> {
      try {
        deleteClient.deleteSpiner.style.display = 'block';
        await deleteClientItem(data.id);
        setTimeout(()=> {
          document.getElementById(data.id).remove();
          deleteClient.deleteModal.remove();
        }, 1000);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          deleteClient.deleteSpiner.style.display = 'none';
        }, 1000);
      };
    });
  };

  /// корректное отображение добавленных контактов (зависит от кол-ва контактов)
  function contactItem() {
    const contactsItems  = document.getElementsByClassName('contact');

    if (contactsItems.length >= 5 ) {
      document.querySelector('.site-modal').style.alignItems = 'flex-start';
      document.querySelector('.site-modal').style.paddingTop = '30px';
    }
    editSpiner.style.display = 'none';
    clientEdit.classList.remove('action-wait');
  }
///
  clientDelete.addEventListener('click', ()=> {
    deleteSpiner.style.display = 'block';
    clientDelete.classList.add('action-wait');
    setTimeout(() => {
      deleteById();
      document.body.append(deleteClient.deleteModal);
      deleteSpiner.style.display = 'none';
      clientDelete.classList.remove('action-wait');
    }, 1000);
  })

  clientEdit.addEventListener('click', ()=> {
    editSpiner.style.display = 'block';
    clientEdit.classList.add('action-wait');
    setTimeout(() => {
      const url = window.location;
      url.hash = data.id;
      deleteById();
      document.body.append(editClient.editModal);
      contactItem();
    }, 1000);
  })

  clientId.textContent = data.id.substr(-6, 6);
  clientName.textContent = data.name;
  clientSurName.textContent = data.surname;
  clientLastName.textContent = data.lastName;
  clientEdit.textContent = 'Изменить';
  clientDelete.textContent = 'Удалить';

  createdDate.textContent = formatDate(data.createdAt);
  createdTime.textContent = formatTime(data.createdAt);
  changedDate.textContent = formatDate(data.updatedAt);
  changeTime.textContent = formatTime(data.updatedAt);
  clientIdTd.append(clientId);
  clientFullName.append(clientSurName, clientName, clientLastName);
  clientCreated.append(createdDate, createdTime);
  clientChanged.append(changedDate, changeTime);
  clientActions.append( clientEdit, clientDelete);
  clientEdit.append(editSpiner);
  clientDelete.append(deleteSpiner);
  clientTr.append(clientIdTd, clientFullName, clientCreated, clientChanged, clientContacts, clientActions);

  const url = window.location
  if (url.hash.slice(1) == data.id) {
    setTimeout(() => {
      document.body.append(editClient.editModal);
      contactItem();
    }, 1500);
  };

  return clientTr
}
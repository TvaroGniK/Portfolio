import { svgSpiner } from "./svg.js";

export const deleteClientModal = () => {
  const deleteModal = document.createElement('div'),
        deleteModalContent = document.createElement('div'),
        modalClose = document.createElement('button'),
        deleteModalTitle = document.createElement('h2'),
        deleteModalText = document.createElement('p'),
        deleteModalDelete = document.createElement('button'),
        deleteModalBack = document.createElement('button');

  //deleteSpiner

  const deleteSpiner = document.createElement('span');
  deleteSpiner.classList.add('modal__spiner');
  deleteSpiner.innerHTML = svgSpiner;


  deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active');
  deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active');
  deleteModalText.classList.add('delete-modal__text');
  deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
  deleteModalDelete.classList.add('delete-modal__delete', 'btn-reset', 'site-btn');
  deleteModalBack.classList.add('delete-modal__back','btn-reset');
  modalClose.classList.add('modal__close','btn-reset');


  deleteModalTitle.textContent = 'Удалить клиента';
  deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
  deleteModalDelete.textContent = 'Удалить';
  deleteModalBack.textContent = 'Отмена';

  deleteModalDelete.append(deleteSpiner);
  deleteModalContent.append(
    modalClose,
    deleteModalTitle,
    deleteModalText,
    deleteModalDelete,
    deleteModalBack
  )
  deleteModal.append(deleteModalContent);

  //
  window.addEventListener('click', (e)=> {
    if (e.target === deleteModal) {
       deleteModal.remove();
    };
  });

  modalClose.addEventListener('click', () => {
    deleteModal.remove();
  });
  deleteModalBack.addEventListener('click', () => {
    deleteModal.remove();
  });


  return {
    deleteModal,
    deleteModalContent,
    deleteModalDelete,
    deleteSpiner
  }
};
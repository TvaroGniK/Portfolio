// import { async } from "q";
import { addClientModal } from "./addClientModal.js";
import { preloader } from "./preloader.js";
import { addClientsIcon } from "./svg.js";

export const createClientsSection = () => {
  // create sectionElements
  const section = document.createElement('section'),
        main = document.createElement('main'),
        container = document.createElement('div'),
        mainTitle = document.createElement('h1'),
        tableWrapper = document.createElement('div'),
        tableClients = document.createElement('table'),
        thead = document.createElement('thead'),
        trHead = document.createElement('tr'),
        thId = document.createElement('th'),
        thName = document.createElement('th'),
        thNameSpan = document.createElement('span'),
        thCreateDate = document.createElement('th'),
        thChangeDate = document.createElement('th'),
        thContacts = document.createElement('th'),
        thAction = document.createElement('th'),
        thSpanELements = document.createElement('span'),
        tbody = document.createElement('tbody'),
        trBody = document.createElement('tr'),
        td = document.createElement('td'),
        createSpan = document.createElement('span'),
        changeSpan = document.createElement('span'),
        addClient = document.createElement('button'),
        btnSpanElement = document.createElement('span');

  //Listener
  addClient.addEventListener('click', ()=> {
    document.body.append(addClientModal());
  })

  //add classList
  section.classList.add('clients');
  main.classList.add('main');
  container.classList.add('container', 'clients__container');
  mainTitle.classList.add('clients__title');
  tableWrapper.classList.add('clients__wrapper');
  tableClients.classList.add('clients__table');
  tableClients.id = `caltbl`
  tbody.classList.add('clients__tbody');
  thead.classList.add('clients__thead', 'thead-info');
  trHead.classList.add('clients__tr')
  thId.classList.add('thead-info__item', 'thead-info__item--id', 'arrow-up');

  thName.classList.add('thead-info__item', 'thead-info__item--name', 'arrow-down');
  thNameSpan.classList.add('name-sort');
  thCreateDate.classList.add('thead-info__item', 'thead-info__item--create-date', 'arrow-down');
  thChangeDate.classList.add('thead-info__item', 'thead-info__item--change-date', 'arrow-down');
  thContacts.classList.add('thead-info__item', 'thead-info__item--contacts');
  thAction.classList.add('thead-info__item', 'thead-info__item--action');
  thSpanELements.classList.add('thead-info__arrow');
  addClient.classList.add('clients__btn','btn-reset');
  btnSpanElement.classList.add('btn-span');


  //data-type для сортировки
  // thId.dataset.type = 'id'
  // thName.dataset.type = 'full-name'
  // thCreateDate.dataset.type = 'created'
  // thChangeDate.dataset.type = 'changed'
  thId.setAttribute('data-type', 'id');
  thName.setAttribute('data-type', 'full-name');
  thCreateDate.setAttribute('data-type', 'created');
  thChangeDate.setAttribute('data-type', 'changed');

  // filling content
  mainTitle.textContent = 'Клиенты';
  thId.textContent = 'id';
  thName.textContent = 'Фамилия Имя Отчество';
  thNameSpan.textContent = ' а-я'
  thCreateDate.textContent = 'Дата и время создания';
  thChangeDate.textContent = 'Последние изменения';
  thContacts.textContent = 'Контакты';
  thAction.textContent = 'Действия';
  addClient.textContent = 'Добавить клиента';
  btnSpanElement.innerHTML = addClientsIcon;

  // create DOM
  main.append(section);
  section.append(container);
  container.append(mainTitle, tableWrapper, addClient);
  tableWrapper.append(tableClients);
  tableClients.append(thead, tbody);
  thead.append(trHead)
  trHead.append(
    thId,
    thName,
    thCreateDate,
    thChangeDate,
    thContacts,
    thAction
  )

  // thId.appendChild(thIdSpan);
  thName.appendChild(thNameSpan);
  thCreateDate.append(createSpan);
  thChangeDate.append(changeSpan);
  addClient.append(btnSpanElement);
  //preload
  tbody.append(preloader());

  return {
    main,
    tableClients,
    tbody,
    thId,
  };
};
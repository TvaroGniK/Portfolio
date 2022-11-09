import { fiendClien } from "./clientApi.js"
import { createClientItem } from "./createClientItem.js"

export const searchClient = (clients) => {
  const findList = document.querySelector('.find-list');
  const input = document.querySelector('.header__input');

  clients.forEach(client => {
    const findItem = document.createElement('li');
    const findLink = document.createElement('a');

    findItem.classList.add('find-list__item');
    findLink.classList.add('find-list__link');

    findLink.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    findLink.href = `#${client.id}`;

    findItem.append(findLink);
    findList.append(findItem);
  });


  const rewriteTable = async (str) => {
    const response = await fiendClien(str);
    // console.log(response)
    const tbody = document.querySelector('.clients__tbody');
    // console.log(tbody.innerHTML)
    tbody.innerHTML='';
    for (const client of response) {
      tbody.append(createClientItem(client));
      // console.log(client)
    };
  };

    input.addEventListener('input', async ()=> {
    const value = input.value.trim();
    const foundItems = document.querySelectorAll('.find-list__link');
    const foundTable = document.querySelectorAll('.client__full-name');

    if( value !== '') {
      foundTable.forEach ( elem => {
        let fullName = elem.childNodes[0].innerHTML + ' ' + elem.childNodes[1].innerHTML + ' ' + elem.childNodes[2].innerHTML;
          if( fullName.search(value) == -1) {
            elem.classList.remove('bg');
          } else {
              elem.classList.add('bg');
            }
       });
      // rewriteTable(value)
        foundItems.forEach(link => {
          if( link.innerText.search(value) == -1) {
            link.classList.add('hide');
            link.innerHTML = link.innerText;
          } else {
            link.classList.remove('hide');
            findList.classList.remove('hide');
            let str = link.innerText;
            link.innerHTML = insertMark(str, link.innerText.search(value), value.length);
          };
        });
    } else {
      foundItems.forEach( link => {
        const tbody = document.querySelector('.clients__tbody');
        tbody.innerHTML = '';
        clients.forEach(client => {
          tbody.append(createClientItem(client));
        });
        link.classList.remove('hide');
        findList.classList.add('hide');
        link.innerHTML = link.innerText;
      });
    };
  });
  function insertMark (str, pos, len) {
    return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len)
  };
};
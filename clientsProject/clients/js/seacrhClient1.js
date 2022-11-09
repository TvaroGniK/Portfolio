
// import { link } from "fs"
// import { async } from "q"
import { fiendClien } from "./clientApi.js"
import { createClientItem } from "./createClientItem.js"

export const searchClient = (clients) => {
  const findList = document.querySelector('.find-list')
  console.log(findList)
  const input = document.querySelector('.header__input')
  console.log(input)

  clients.forEach(client => {
    const findItem = document.createElement('li');
    const findLink = document.createElement('a');

    findItem.classList.add('find-list__item');
    findLink.classList.add('find-list__list');

    findLink.textContent = `${client.name} ${client.surname} ${client.lastName}`;
    findLink.href = `#`

    findItem.append(findLink);
    findList.append(findItem);
  });


  const rewriteTable = async (str) => {
    const response = await fiendClien(str);
    const tbody = document.querySelector('.clients__tbody')
    tbody.innerHTML='';

    for (const client of response) {
      tbody.append(createClientItem(client))
    }
  }

  input.addEventListener('input', async () => {
    const value = input.value.trim();
    const foundItem = document.querySelectorAll('.find-list__list')

    if (value !== '') {
      rewriteTable(value)
      foundItem.forEach(link => {
        if ( link.innerText.search(value) == -1){
          link.classList.add('hide');
          link.innerHTML = link.innerText;
        } else {
          link.classList.remove('hide');
          findList.classList.remove('hide');
          let str = link.innerText;

          //
          link.innerHTML = insertMark(str, link.innerText.search(value), value.length)
        }
      })
    } else {
      foundItem.forEach(link => {
        const tbody = document.querySelector('.clients__tbody')
        tbody.innerHTML= ''

        clients.forEach(client => tbody.append(createClientItem(client)))

        link.classList.remove('hide')
        findList.classList.add('hide')
        link.innerHTML = link.innerText
      })
    }
  });

  const insertMark = (str, pos, len) => str.slice(0, pos)+`<mark>`+str.slice(pos, pos, len)+`</mark>`+str.slice(pos + len);


}
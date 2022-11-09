import {createHeaderWrapper} from "./view-header.js";
import { createLoader } from "./loader.js";
import { getData } from "./api.js";
import { getDataEpisode } from "./api.js";
//подцепляемся к html
const appContainer = document.getElementById('todo-app');
// Рисуем хедер + лоадер
appContainer.append(createHeaderWrapper());
appContainer.append(createLoader());
// вперед/назад для истории браузера
window.addEventListener('popstate', renderPage);
// основная ссылка
const url = 'https://swapi.dev/api/films/';
// перерисовываем контент при переходах
function deleteList(list) {
  while (list.childNodes.length != 2) {
    list.removeChild(list.lastChild);
    };
}
// основная функция отрисовки на страницаъ
export function renderPage() {
  // хеш
  const searchParams = new URLSearchParams(window.location.search);
  const episodeId = searchParams.get('filmEpisode');
  // если в url есть нужный хеш рисуем детальную страницу
  if (episodeId) {
    deleteList(appContainer);
    document.querySelector('.spinner-box').classList.remove('loaded');
    getDataEpisode(url, episodeId).then(resolve => {
       // отключаем спинер, когда получили все данные
      document.querySelector('.spinner-box').classList.add('loaded');
      appContainer.append(resolve);
    });

  }
  // основная страница
  else {
    deleteList(appContainer);
    getData(url).then(resolve => {
      // отключаем спинер, когда получили все данные
      document.querySelector('.spinner-box').classList.add('loaded');
      appContainer.append(resolve);
    });
  }
};

renderPage();







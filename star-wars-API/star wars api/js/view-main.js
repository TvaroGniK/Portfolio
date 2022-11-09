import { renderPage } from "./main.js";

export async function render(data) {
  const container = document.createElement('div');
  const contentWraper = document.createElement('div');
  // console.log(data);

  container.classList = 'container';
  contentWraper.classList = 'card-wrapper';

  for ( let film of data){
    // console.log(film.title)
    const episodWrapper = document.createElement('div');
    const title = document.createElement('h2');
    const linkDetails = document.createElement('a');
    const episodDescription = document.createElement('p');

    episodWrapper.classList  = 'card';
    title.classList  = 'card__title';
    linkDetails.classList.add('card__link');
    episodWrapper.style.backgroundImage = `url('../img/main/${film.episode_id}.jpg')`;
    episodDescription.classList.add('card__text');

    if (film.episode_id > 3) {
      linkDetails.href = `?filmEpisode=${film.episode_id - 3}`;
    } else if (film.episode_id <= 3) {
      linkDetails.href = `?filmEpisode=${film.episode_id + 3}`;
    }
    // pushState
    linkDetails.addEventListener('click', (e) => {
      e.preventDefault();
      if (film.episode_id > 3) {
        history.pushState({'page_id': `${film.episode_id - 3}`}, '', `?filmEpisode=${film.episode_id - 3}`);
      } else if (film.episode_id <= 3) {
        history.pushState({'page_id': `${film.episode_id + 3}`}, '', `?filmEpisode=${film.episode_id + 3}`);
      }
      renderPage();
    })

    title.append(linkDetails);
    episodWrapper.append(title);
    episodWrapper.append(episodDescription);

    linkDetails.textContent = film.title + " " + film.episode_id;
    episodDescription.textContent = film.opening_crawl;

    contentWraper.append(episodWrapper);
    container.append(contentWraper);
  }
  return container;
}


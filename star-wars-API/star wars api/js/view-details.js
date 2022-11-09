//функция заголовка + описание
export function episodeDescription(data, episodeId) {
  const wrapperEpisodeDescription = document.createElement('div');
  const episodeDescription = document.createElement('p');
  const titleEpisode = document.createElement('h3');

  wrapperEpisodeDescription.classList.add('episod-wrapper', 'episod');
  titleEpisode.classList = 'episod__title';
  episodeDescription.classList = 'episod__description'

  if (episodeId > 3) {
    episodeId = +episodeId - 3;
    titleEpisode.textContent = data.title + ` эпизод ` + episodeId;
  } else if (episodeId <= 3) {
    episodeId = +episodeId + 3;
    titleEpisode.textContent = data.title + ` эпизод ` + episodeId;
  }

  titleEpisode.textContent = data.title + ` эпизод ` + episodeId;
  episodeDescription.textContent = data.opening_crawl;

  wrapperEpisodeDescription.append(titleEpisode);
  wrapperEpisodeDescription.append(episodeDescription);
  return wrapperEpisodeDescription;
}

// функция парсинга для планет/рас в массив
export function renderDrtailsEpisodes (detailName, className) {
  const wrapDetails = document.createElement('div');
  const wrapDetal = document.createElement('ul');
  const titleDetails = document.createElement('h3');

  wrapDetal.classList =  `${className}__list`;
  wrapDetails.classList.add (`${className}-wrapper`, `${className}`);
  titleDetails.classList = `${className}__title`;

  titleDetails.textContent = className[0].toUpperCase() + className.slice(1);

  detailName.forEach(element => {
    let li = document.createElement('li');
    let span = document.createElement('span');
    li.style.backgroundImage = `url('../img//${className}/${element.replace(`'`, '').replace(`/`, '').replace('-II', '--')}.jpg')`;
    li.classList =  `${className}__item`;
    span.classList =  `${className}__text`;
    span.textContent = element;
    li.append(span);
    // console.log(element)
    wrapDetal.append(li)
  })

  wrapDetails.append(titleDetails);
  wrapDetails.append(wrapDetal);

  return wrapDetails;
}

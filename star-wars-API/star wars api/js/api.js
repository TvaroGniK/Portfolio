import { render } from "./view-main.js";
import {episodeDescription} from "./view-details.js";
import {renderDrtailsEpisodes} from "./view-details.js";

// данные для основной страницы
export async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  const dataInfo = data.results
  const dataInfoSort = dataInfo.sort((prev, next) => prev.episode_id - next.episode_id)
  return render(dataInfoSort)
}
// данные для детальной страницы в main
export async function getDataEpisode (url, episodeId) {
  const response = await fetch(url + `/${episodeId}`);
  const data = await response.json();
  console.log(data);
  return  renderEpisode(data, episodeId);
}
// данные для детальной страницы
export async function getDetails(dataDetails, arrDetails) {
  for (const iter of dataDetails) {
    const planetData = await fetch(iter).then(res => res.json());
    arrDetails.push(planetData.name);
    // console.log(iter);
  }
  return arrDetails;
}


async function renderEpisode(data, episodeId) {
  const container = document.createElement('div');
  container.classList = 'container';
  // дублируем аргументы, будем переиспользовать в колбеке, можно вынести это в отдельную фунукцию в main, но решил так не делать
  const dataEpisode = data;
  const episodeId1 = episodeId;
  // console.log(dataEpisode)
  // обертки для данных, которые будет рендерить в блоки на странице
  const planet = [];
  const species = [];
  const vehicle = [];
  // параллельно получаем необходимые данные
  await Promise.all([getDetails(data.planets, planet), getDetails(data.species, species), getDetails(data.vehicles, vehicle)]).then((allInfo, planet, species, vehicle) => {
    // console.log(allInfo)
    planet = allInfo[0];
    species = allInfo[1];
    vehicle = allInfo[2];
  });

  // console.log(vehicle)
  const planets = 'planets';
  const specieses = 'specieses';
  const vehicles = 'vehicles';

  container.append(episodeDescription(dataEpisode, episodeId1));
  container.append( renderDrtailsEpisodes (planet, planets));
  container.append( renderDrtailsEpisodes (species, specieses));
  container.append( renderDrtailsEpisodes (vehicle, vehicles));

  return container;
}
import { createClientsHeader} from "./createHeader.js"
import { createClientsSection } from "./createClientsSection.js";
import { getClients } from "./clientApi.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClientTable.js";
import { searchClient } from "./seacrhClient.js";

const createApp = async () => {
  const header = createClientsHeader();
  const clientsSection = createClientsSection();
  document.body.append(header, clientsSection.main);
  const preloader = document.querySelector('.preload');
  try {
    const clients =  await getClients();
    // сортивка по id при первой отрисовки страницы
    const temp = JSON.parse(JSON.stringify(clients));
    function compare (a, b) {
      const idA = a.id.substr(-6, 6);
      const idB = b.id.substr(-6, 6);
      let comparison = 0;
      if (idA > idB) {
        comparison = 1;
      } else if (idA < idB) {
        comparison = -1;
      }
      return comparison;
    };

    searchClient(clients);
    for (let client of temp.sort(compare)) {
      document.querySelector('.clients__tbody').append(createClientItem(client));
    };
  } catch (error) {
    console.log(error);
  } finally {
   setTimeout(()=>  preloader.remove(), 1500);
  }
};

createApp();
document.addEventListener('DOMContentLoaded', sortTable());




import { createClientsSection } from "./createClientsSection.js";

export const defaultSort = () => {
  const table = document.getElementById('caltbl');
  // const idArrow2 = table.getElementsByClassName('thead-info__item--id')
  // console.log(idArrow2)
  let sortedRows = Array.from(table.rows)
  console.log(sortedRows)
  // console.log(table)
//   .slice(1)
//   .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);

// table.tBodies[0].append(...sortedRows);
}
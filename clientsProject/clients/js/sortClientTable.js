
export const sortTable = () => {
  const table = document.querySelector('table');
  const tbody = table.querySelector('tbody');
  // логика положения стрелок при сортировке
  const nameArrow = table.getElementsByClassName('thead-info__item--name');
  const idArrow = table.getElementsByClassName('thead-info__item--id');
  const createArrow = table.getElementsByClassName('thead-info__item--create-date');
  const changeArrow = table.getElementsByClassName('thead-info__item--change-date');
  const thArrow = table.getElementsByClassName('thead-info__item');

  let arr = [];
  const deleteArrow = () => {
    for (let i = 0; i < 4; i++ ) {
      arr.push(thArrow[i]);
    };

    for (const item of arr) {
      item.classList.remove('arrow-down');
      item.classList.remove('arrow-up');
      item.classList.add('arrow-down');
    };
  };

  const arrowUp = (name) => {
    for (let item of name) {
      item.classList.add('arrow-up');
      item.classList.remove('arrow-down');
    };
  };

  const arrowDown = (name) => {
    for (let item of name) {
      item.classList.remove('arrow-up');
      item.classList.add('arrow-down');
    };
  };

  let colIndex = -1;
  const sortTable = function (index, type, isSorted) {
    const compare = function( rowA, rowB) {
      // обявляем ячейки для сравнения
      const rowDateA = rowA.querySelectorAll('td')[index].textContent;
      const rowDateB = rowB.querySelectorAll('td')[index].textContent;
      // console.log(index)
      // добавляем условие для сортировки разным типам данных по атрибуту
      switch (type) {
        case 'id':
          deleteArrow()
          if (colIndex != -1) {
            arrowUp(idArrow);
          } else {
            arrowDown(idArrow);
          }
          if (parseInt(rowDateA) > parseInt(rowDateB)) {
            return 1;
          } else if (parseInt(rowDateA) < parseInt(rowDateB)) {
            return -1;
          } else {
            return 0;
          }
        case 'full-name':
          deleteArrow();
          if (colIndex != -1) {
            arrowUp(nameArrow);
          } else {
            arrowDown(nameArrow);
          }
          if (rowDateA > rowDateB) {
              return 1;
            } else if (rowDateA < rowDateB) {
              return -1;
            } else {
              return 0;
            }
        case 'created':
          deleteArrow()
          const dataAcreated = rowDateA.slice(0, 10).split('.').reverse().join('-') + ` ` + rowDateA.slice(10);
          const dataBcreated = rowDateB.slice(0, 10).split('.').reverse().join('-') + ` ` + rowDateB.slice(10);
          if (colIndex != -1) {
            arrowUp(createArrow)
          } else {
            arrowDown(createArrow)
          }
          if (new Date(dataAcreated).getTime() > new Date(dataBcreated).getTime()) {
            return 1;
          } else if (new Date(dataAcreated).getTime() < new Date(dataBcreated).getTime()) {
            return -1;
          } else {
            return 0;
          }
        case 'changed':
          deleteArrow();
          const dataA = rowDateA.slice(0, 10).split('.').reverse().join('-') + ` ` + rowDateA.slice(10);
          const dataB = rowDateB.slice(0, 10).split('.').reverse().join('-') + ` ` + rowDateB.slice(10);
          if (colIndex != -1) {
            arrowUp(changeArrow);
          } else {
            arrowDown(changeArrow);
          }
          if (new Date(dataA).getTime() > new Date(dataB).getTime()) {
            return 1;
          } else if (new Date(dataA).getTime() < new Date(dataB).getTime()) {
            return -1;
          } else {
            return 0;
          }
      };
    };

    // записываем каждую строку в массив
    let rows = [].slice.call(tbody.rows);
    // сортируем строки
    rows.sort(compare);
    // переворачиваем строки при повторном клике
    if (isSorted) rows.reverse();
    // удаляем строки тела таблицы
    table.removeChild(tbody);
    // проходимся по сортированным строкам и записываем в тело таблицы
    for (let i = 1; i < rows.length; i++) {
      tbody.appendChild(rows[i]);
      // console.log(rows[i]);
     }
     // перересовываем таблицу и добавляем новое тело
     table.appendChild(tbody);
  };

  table.addEventListener('click', (e)=> {
    const el = e.target;
    const type = el.getAttribute('data-type');
    if (type === null) return
    // if( el.nodeName != 'TH' ) return;
    const index = el.cellIndex;

    sortTable(index, type, colIndex);
    // переключение сортировки таблицы по возрастанию/убыванию
    colIndex = (colIndex >= 0) ? -1 : 0;
  });

};
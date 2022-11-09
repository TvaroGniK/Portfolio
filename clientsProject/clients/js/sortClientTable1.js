export const sortTable = () => {
  const table = document.querySelector('table');
  const headers = table.querySelectorAll('th')
  const tbody = table.querySelector('tbody')
  // const direction = Array.from(headers)
  // console.log(direction)
  // console.log(headers)

  let colIndex = -1;
  const sortTable = function (index, type, isSorted) {

    const tbody = table.querySelector('tbody');
    const compare = function( rowA, rowB) {
      // обявляем ячейки для сравнения
      const rowDateA = rowA.cells[index].innerHTML;
      const rowDateB = rowB.cells[index].innerHTML;
      const rowDateC = rowA.cells[index].childNodes[0].innerHTML;
      const rowDateD = rowB.cells[index].childNodes[1].innerHTML;


      // добавляем условие для сортировки разным типам данных по атрибуту
      if ( type == 'id') {
        parseInt(rowDateA) - parseInt(rowDateB);
        console.log( (rowDateA), (rowDateB))
        if (parseInt(rowDateA) < parseInt(rowDateB)) {
          return -1
        } else if (parseInt(rowDateA)> parseInt(rowDateB)) {
          return 1
        } else {
          return 0
        }

      } else if ( type =='full-name') {
          if (rowDateA < rowDateB) {
                  return -1
                } else if (rowDateA > rowDateB) {
                  return 1
                } else {
                  return 0
                }
      }
      else if ( type == 'created' ) {
          // const dataA = rowDateA.slice(0, 10).split('.').reverse().join('-');
          const dataA = rowDateC
          const dataD = rowDateD
          console.log(dataA)
          console.log(dataD)
          console.log(new Date(dataA).getTime())
          console.log(new Date(dataD).getTime())
          // const dataB = rowDateB.slice(0, 10).split('.').reverse().join('-');
          const dataB = rowDateB

          console.log(dataB)
          const time = new Date(dataA).getTime() - new Date(dataB).getTime()
          console.log(time)
          return new Date(dataA).getTime() - new Date(dataB).getTime();
      }
    };

    // записываем каждую строку в массив
    let rows = [].slice.call(tbody.rows);
    // сортируем строки
    rows.sort(compare);
    // console.log(isSorted);
     // переворачиваем строки при повторном клике
    if (isSorted) rows.reverse();
    // console.log(rows);
    // удаляем строки тела таблицы
    table.removeChild(tbody);

    // проходимся по сортированным строкам и записываем в тело таблицы
    for (let i = 1; i < rows.length; i++) {
      tbody.appendChild(rows[i]);
      // console.log(rows[i]);
    }

    // перересовываем таблицу и добавляем новое тело
    table.appendChild(tbody);
    // console.log(rows)
  }



  table.addEventListener('click', (e)=> {

    const el = e.target;
    // console.log(el.nodeName)
    if( el.nodeName != 'TH') return;

    const index = el.cellIndex;
    // console.log(index)
    const type = el.getAttribute('data-type');
    // console.log(type)

    sortTable(index, type, colIndex === index);
    // переключение сортировки таблицы по возрастанию/убыванию
    colIndex = (colIndex === index) ? -1 : index;
  })


  // function defSort () {

  //   let rows = [].slice.call(tbody.rows);
  //   // table.removeChild(tbody);
  //   return rows
  // }


  // console.log(defSort())
  // table.addEventListener('onload', ()=> {
  //   sortTable(0, `id`, colIndex);






  // const directions = Array.from(headers).map(()=>'');
  // console.log(directions)

  // const transform = (type, content) => {
  //   switch (type) {
  //     case 'id':
  //       return parseInt(content);
  //     case 'created':
  //     case 'changed':
  //       return content.split('.').reverse().join('-');
  //       case 'full-name':
  //         return content;
  //   }
  // }

  // const sortColumn = (index) => {
  //   const type = headers[index].getAttribute('data-type')
  //   // console.log(type)

  //   const rows = tbody.querySelectorAll('tr');
  //   const direction = directions[index] || 'sortUp';
  //   const multiply = direction === 'sortUp' ? 1 : -1;
  //   console.log(multiply)
  //   console.log(directions)
  //   const newRows = Array.from(rows)

  //   newRows.sort((row1, row2)=> {
  //     const cellA = row1.querySelectorAll('td')[index].textContent;
  //     const cellB = row2.querySelectorAll('td')[index].textContent;
  //     // console.log(cellA,cellB)


  //     const a = transform(type, cellA)
  //     const b = transform(type, cellB)
  //     // console.log(a,b)

  //     switch (true) {
  //       case a > b:
  //         return 1 * multiply;
  //       case b > a:
  //         return -1 * multiply;
  //       case a === b:
  //           return 0;
  //     }
  //   });

  //   [].forEach.call(rows, (row) => {
  //     tbody.removeChild(row)
  //   });

  //   directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

  //   newRows.forEach(newRow => {
  //     tbody.appendChild(newRow)
  //   })


  // }


  // [].forEach.call(headers, (header, index) => {
  //   header.addEventListener('click', ()=> {
  //     sortColumn(index)
  //   })
  // })

}
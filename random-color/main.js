//работа с хешом (отдаем цвета)
const getColorsFromHash = () => {
 if( document.location.hash.length > 1 ) {
  return document.location.hash.substring(1).split('-').map( color => '#' + color);
 }
 return [];
}

//работа с хешом (забираем цвета)
const updateColorsHash = (colors = []) => {
  // console.log(colors)
  document.location.hash = colors.map(col => col.toString().substring(1)).join('-');
}

// копирка элемента
const copyToClickBoard = (text) => {
  return navigator.clipboard.writeText(text)
}

//случайный цвет
const generateRandomColor = () => {
  const hexCodes = '0123456789ABCDF';
  let randomColor = '';

  for ( let i = 0; i < 6; i ++) {
    randomColor += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }

  return '#' + randomColor;
}


const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

// получаем случ цвет на каждой колонке и отрисовываем
const setRandomColors = (col, isInitial = false) => {

  const colorsArray = isInitial ? getColorsFromHash() : [];

  col.forEach((element, index) => {

    const h2 = element.querySelector('h2');
    const icon = element.querySelector('i')
    const isLocked = icon.classList.contains('fa-lock');


    if (isLocked) {
      colorsArray.push(h2.textContent);
      return;
    }

    // const color = isInitial ? colorsArray[index] ? colorsArray[index] :  chroma.random() : chroma.random()
    const color = isInitial ? colorsArray[index] ? colorsArray[index] : generateRandomColor() : generateRandomColor();

    if(!isInitial) {
      colorsArray.push(color);
    }

    h2.textContent = color;
    element.style.backgroundColor = color;

    setTextColor(h2, color);
    setTextColor(icon, color);
  });

 updateColorsHash(colorsArray)
}

// создание и отрисовка элеметнов страницы
const renderPage = (elCount) => {
  const container = document.querySelector('.container')
  const ul = document.createElement('ul');

  ul.classList.add('color-list');

  for( let i = 0; i < elCount; i ++) {
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    const button = document.createElement('button');
    const iconLock = document.createElement('i');
    const iconOpen = document.createElement('i');

    h2.setAttribute('data-type','copy')
    button.setAttribute('data-type','lock');
    iconOpen.setAttribute('data-type','lock');

    iconLock.classList.add('fa-solid', 'fa-lock');
    iconOpen.classList.add('fa-solid', 'fa-lock-open');

    li.classList.add('col');
    h2.textContent = 'Text';
    button.append(iconOpen)

    li.append(h2, button);
    ul.append(li);

  }

  // true при первой загрузке и обновлении старницы без хеша
  setRandomColors(ul.childNodes, true);

  container.append(ul);
  return container;
}

// обновление цветом при клике на пробел
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if( e.code.toLowerCase() === 'space') {
    const reset = document.querySelector('ul');
    setRandomColors(reset.childNodes);
  }
});

// лок иконки и копирка цвета при клике
document.addEventListener('click', (e) => {

  const type = e.target.dataset.type

  if(type === 'lock') {
    const node = e.target.tagName.toLowerCase() === 'i'
    ? e.target : e.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  }

  if (type === 'copy') {
    copyToClickBoard(e.target.textContent)
  }
})

renderPage(5)


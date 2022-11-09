const container = document.getElementById('board');
const colors = ['#ff1900', '#b514fa', '#008eec', '#f57709', '#0dff72', '#fbff00', '#fafae2']
const SQUARE_NUMBER = 800;

for(let i = 0; i < SQUARE_NUMBER; i++) {
  const square = document.createElement('div');
  square.classList.add('square');

	const span = document.createElement("span")

  square.addEventListener('mouseover', () => {
    setColor(square);
  })

  square.addEventListener('mouseleave', () => {
    removeColor(square)
  })


  // square.addEventListener('click', (e) => {
  //   console.log(e.target)
  //   if (e.target.classList.contains('active')) {
  //     e.target.classList.remove('active');
  //     e.target.style = '';
  //     return;
  //   }
  //   e.target.classList.add('active')
  //   setColor(square);
  // })



  container.append(square);
  square.append(span)
}

function setColor(el) {
  const color = getRandomColor();
  el.classList.remove("hide")
  el.style.background = color;
  el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`;
  el.style.transform = `scale(1.2)`;


}

function removeColor(el) {
  el.style.background = '#1d1d1d'
  el.style.boxShadow = '0 0 0';
  el.style.transform = `scale(1)`;

}

function getRandomColor() {
  const i = Math.floor(Math.random() * colors.length)
  return colors[i];
}



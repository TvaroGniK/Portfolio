const btnStart = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');
const colors = ['#ff1900', '#b514fa', '#008eec', '#f57709', '#0dff72', '#fbff00', '#fafae2']
let time = 10;
let score = 0;
let scoreMiss = 0;
let timer


btnStart.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');

});

timeList.addEventListener('click', (e) => {
  if(!e.target.classList.contains('time-btn')) {
    return;
  }
  // time = Number(e.target.dataset.time)
  time = parseInt(e.target.getAttribute('data-time'));

  stratGame(time);
});


board.addEventListener('click', (e) => {
  if (!e.target.classList.contains('circle')) {
    scoreMiss ++
    return
  };
  e.target.remove();
  score ++;
  createRandomCircle();
  // if (e.target.classList.contains('circle')) {
  //   e.target.remove();
  //   score ++;
  //   createRandomCircle();
  // };
});

function stratGame(time) {
  screens[1].classList.add('up');
  board.innerHTML = ''
  setTime(time);
  createRandomCircle();
  //  setInterval(decreaseTime, 1000)
  const resetGameTime = time
  decreaseTime(resetGameTime);
};

function decreaseTime (resetGameTime) {
  timer = setInterval(() => {
    let current =  --time;
    if ( time === 0 ) {
      finishGame(resetGameTime);
      timer = clearInterval(timer)
    } else {
      if (current < 10) {
        current = `0${current}`
      }
      setTime(current)
    }
  },1000)
};

function setTime (value) {
  timeEl.innerHTML = `00:${value}`;
};

function finishGame(resetGameTime) {
  timeEl.parentNode.classList.add('hide');
  let someText = '';

  const procent = score === 0 ? 0 : (score/(scoreMiss + score)) * 100;

  if(procent > 85) {
    someText = 'Стеклянная пушка!!!'
  }
  if(procent > 85 && procent < 100 ) {
    someText = 'Снайпер!!!'
  }
  if(procent > 60 && procent < 85) {
    someText = 'Хорошая точность!'
  }
  if(procent > 40 && procent < 60) {
    someText = 'Попробуйте еще раз'
  }

  if(procent > 20 && procent < 40) {
    someText = 'Нужно еще размяться'
  }

  if(procent > 10 && procent < 20) {
    someText = 'Кликать нужно по кружочкам)))'
  }
  if( procent < 10) {
    someText = 'Кажется нужно протрезветь'
  }


  board.innerHTML = `<h2>Попаданий в цель !: <span class ="primary">${score}</span></h2>
                      <br>
                    <h2>Промахов: <span class ="primary">${scoreMiss}</span></h2>
                      <br>
                    <h2>Точность: <span class ="primary">${procent.toFixed(1)}%</span></h2>
                      <br>
                    <h2>Итог: <span class ="primary">${someText}</span></h2>
                      <br>
                    <div class ="btn-wrap">
                    <button id="play-again" class ="time-btn game-reset"> Сыграть еще </button>
                    <button id="back-to-time" class ="time-btn game-reset"> Выбрать время </button>
                    </div>
                    `

    resetTime('back-to-time');
    testBtn('play-again', resetGameTime);

};

function resetTime(resetTime) {
  const gameAgain = document.getElementById(resetTime);
  gameAgain.addEventListener('click', ()=> {
    screens[1].classList.remove('up');
    console.log(scoreMiss);
    time = 0;
    score = 0;
    scoreMiss = -1;
    timeEl.parentNode.classList.remove('hide');
  })
}
function testBtn(newGame, resetGameTime) {
  const playAgain = document.getElementById(newGame);
  playAgain.addEventListener('click', ()=> {
    timeEl.parentNode.classList.remove('hide');
    time = resetGameTime;
    scoreMiss = -1;
    score = 0;
    board.innerHTML = '';
    stratGame(time);
  })
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size =  getRandomNumber(10, 60);
  const color = getRandomColor (colors);

  const {width, height} = board.getBoundingClientRect();

  const positionX = getRandomNumber(0, width - size);
  const positionY =  getRandomNumber(0, height - size);

  circle.classList.add('circle');

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${positionY}px`;
  circle.style.left = `${positionX}px`;
  circle.style.background = color;
  circle.style.boxShadow =`0 0 2px ${color}`;

  board.append(circle);
};

function getRandomNumber(min, max) {
 return Math.round(Math.random() * (max - min) + min);
};
function getRandomColor (colors) {
  return colors[Math.floor(Math.random() * colors.length)];
};



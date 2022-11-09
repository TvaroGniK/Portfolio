const btnUp = document.querySelector('.up-button');
const btnDown = document.querySelector('.down-button');
const container = document.querySelector('.container');

const sideBar = document.querySelector('.sidebar');
const mainSlide = document.querySelector('.main-slide');
const slideCounts = mainSlide.querySelectorAll('div');
console.log(slideCounts)
sideBar.style.top = `-${(slideCounts.length - 1) * 100}vh`;

let activeSlideIndex = 0;

btnUp.addEventListener('click', () => {
  changeSlide ('up')
});
btnDown.addEventListener('click', () => {
  changeSlide ('down')
});

function changeSlide (direction) {
  if(direction === 'up') {
    activeSlideIndex++ ;
    if (activeSlideIndex === slideCounts.length) {
      activeSlideIndex = 0;
    }
  }

  if (direction === 'down') {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slideCounts.length - 1;
    }
  }

  const height = container.clientHeight;
  // console.log(height)

  mainSlide.style.transform = `translateY(-${(activeSlideIndex) * height}px)`;
  sideBar.style.transform = `translateY(${(activeSlideIndex) * height}px)`;

}
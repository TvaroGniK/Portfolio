const slideAll = document.querySelectorAll('.slide');
const slideAnimated = () => {

  slideAll.forEach((slide) => {
    slide.addEventListener('click', ()=> {
      clearActiveClasses();
      slide.classList.add('active')
    });
  });
};

const clearActiveClasses = () => {
  slideAll.forEach(slider => {
    slider.classList.remove('active')
  });
};

slideAnimated();
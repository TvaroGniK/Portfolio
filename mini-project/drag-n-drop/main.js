const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

const dragstart = (event) => {
  event.target.classList.add('hold');

  setTimeout(() => {
    event.target.classList.add('hide');
  },0);
}

const dragend = (event) => {
  // event.target.classList.remove('hold')
  // event.target.classList.remove('hide');
  //
  // event.target.classList.remove('hold', 'hide')

  event.target.classList = 'item';
}

const dragOver = (event) => {
  event.preventDefault();
};

const dragEnter = (event) => {
  event.target.classList.add('hovered');
};

const dragLeave = (event) => {
  event.target.classList.remove('hovered');
};

const dragDrop = (event) => {
  event.target.classList.remove('hovered');
 event.target.append(item);
};

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragOver);
  placeholder.addEventListener('dragenter', dragEnter);
  placeholder.addEventListener('dragleave', dragLeave);
  placeholder.addEventListener('drop', dragDrop);
}

item.addEventListener('dragstart', dragstart);

item.addEventListener('dragend', dragend);



//создаем и возвращаем заголовок приложения
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.id = ('jsTitle')
  appTitle.innerHTML = title;
  return appTitle;
};

//создаем и возвращаем форму для создания дела
function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');
  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);
  button.disabled = true;

  input.addEventListener('input', function() {
    if (!input.value == '') {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
   });

  return {
    form,
    input,
    button,
  };
};

//создаем и возвращаем список элементов
function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
};


function createTodoItemElement(todoItem, {onDone, onDelete}) {
  const doneClass = 'list-group-item-success';
  let item = document.createElement('li');
  // кнопки пометим в элемент, который покажет их в одной группе
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  // установка стилей списка, а также кнопок и их расположения через flex
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if (todoItem.done) {
    item.classList.add(doneClass);
  }

  // console.log(todoItem)

  item.textContent = todoItem.name;
  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-list', 'btn-success');
  doneButton.textContent = `Готово`;
  deleteButton.classList.add('btn', 'btn-list', 'btn-danger');
  deleteButton.textContent = `Удалить`;

  // добавляем обработчики к кнопкам
  doneButton.addEventListener('click', () => {
    onDone({todoItem, element : item})
    item.classList.toggle(doneClass, todoItem.done);
  });

  deleteButton.addEventListener('click', () => {
    onDelete({todoItem, element : item})
  });

  // помещаем кнопки в отдельный элемент, чтобы обхединить в блок
  buttonGroup.append(doneButton);

  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  // даем доступ к самому элементу списка и кнопкам, чтобы обрабатывать нажатия
  return item

};

async function createTodoApp( container, {
  title,
  owner,
  todoItemList,
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick
}) {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = {onDone: onDoneClick, onDelete: onDeleteClick}

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  // console.log(todoItemList)
  todoItemList.forEach(todoItem  => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement)
  })

  todoItemForm.form.addEventListener('submit', async e =>{
    e.preventDefault();

    // игонорируем создание события если поле для ввода пустое
    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
    });

    const todoItemElement =  createTodoItemElement(todoItem, handlers);

    // создаем и добавляем в список новое дело с название их поля ввода
    todoList.append(todoItemElement);

    // обнуляем поле ввода дела
    todoItemForm.input.value = '';
    // todoItemForm.button.disabled = true;
  })
}



export { createTodoApp };



// этот скрипт не используется, можно удалять

//создаем и возвращаем заголовок приложения
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
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
  // let btnDis = document.querySelector('.btn-disabled')
  // console.log(button.btnDis)

  // button.disabled = true;


  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  // input.addEventListener('input', function() {
  //   if (!input.value == '') {
  //     button.disabled = false;
  //   } else {
  //     button.disabled = true;
  //   }
  //   console.log(input.value )
  //  });

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
  // let processButton = document.createElement('button');
  // let asideButton = document.createElement('button')


  // установка стилей списка, а также кнопок и их расположения через flex
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if (todoItem.done) {
    item.classList.add(doneClass);
  }
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
    // if (confirm('Вы уверены?')) {
    //   item.remove();
    // };
  });

  // помещаем кнопки в отдельный элемент, чтобы обхединить в блок
  buttonGroup.append(doneButton);

  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  // даем доступ к самому элементу списка и кнопкам, чтобы обрабатывать нажатия
  return item
  // return {
  //   item,
  //   doneButton,
  //   deleteButton,
  // }
};

async function createTodoApp( container, title, owner) {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = {
    onDone({todoItem}) {
      todoItem.done = !todoItem.done;
      fetch(`http://localhost:3000/api/todos/${todoItem.id}`,{
            method: 'PATCH',
            body: JSON.stringify({done : todoItem.done}),
            headers: {
              'Content-Type': 'application/json',
            }
      });
    },
    onDelete({todoItem, element}) {
      if (!confirm('Вы уверены?')){
        return
      }
      element.remove();
      fetch(`http://localhost:3000/api/todos/${todoItem.id}`,{
            method: 'DELETE',
      });
    },
  };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

// проверка есть ли события на сервере
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  const todoItemList = await response.json();

  todoItemList.forEach(todoItem  => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement)
  })

  todoItemForm.form.addEventListener('submit', async e =>{
    e.preventDefault();

    // игонорируем создание события если поле для ввода пустое
    if (!todoItemForm.input.value) {
      return
    }

    // создаем событие и отправляем на сервер
    const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          name: todoItemForm.input.value.trim(),
          owner,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })

    const todoItem = await response.json();
    const todoItemElement =  createTodoItemElement(todoItem, handlers);



    // создаем и добавляем в список новое дело с название их поля ввода
    todoList.append(todoItemElement)

    // обнуляем поле ввода дела
    todoItemForm.input.value = '';
    // todoItemForm.button.disabled = true;
  })
}



export { createTodoApp };



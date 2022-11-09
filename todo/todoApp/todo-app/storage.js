
// ServerLS ()
import {createTodoApp} from './view.js';

// local
import {
  getTodoListFromLs,
  createTodoItemFromLs,
  switchTodoItemDoneFromLs,
  deleteTodoItemFromLs
} from './local.js';

//api
import {
  getTodoList,
  createTodoItem,
  switchTodoItemDone,
  deleteTodoItem
} from './api.js';

function deleteList(list) {
  while (list.childNodes.length != 2) {
      list.removeChild(list.lastChild);
      };
}

export  function switchStorage( buttonStorage, storage, keyLS, owner ) {
    buttonStorage.addEventListener('click', ()=> {
      if (storage ){
        buttonStorage.innerHTML = 'Перейти на локальное хранилище';
        storage = !storage;
        localStorage.setItem("isLocale", storage);
        let list =document.getElementById('todo-app')
        deleteList(list);
        // console.log(storage)
      (async()=> {
        const todoItemList = await getTodoList(owner);
        createTodoApp(document.getElementById('todo-app'), {
        title: keyLS,
        owner,
        todoItemList,
        onCreateFormSubmit: createTodoItem,
        onDoneClick: switchTodoItemDone,
        onDeleteClick: deleteTodoItem,
      })
      })();
      } else {
        buttonStorage.innerHTML = 'Перейти на серверное хранилище';
        storage = !storage;
        localStorage.setItem("isLocale", storage);
        let list =document.getElementById('todo-app')
        deleteList(list);
        (async()=> {
        const todoItemList = await getTodoListFromLs(keyLS);
        createTodoApp(document.getElementById('todo-app'), {
        title: keyLS,
        owner,
        todoItemList: todoItemList,
        onCreateFormSubmit: createTodoItemFromLs,
        onDoneClick: switchTodoItemDoneFromLs,
        onDeleteClick: deleteTodoItemFromLs,
      })
      })();
      }
    })
}
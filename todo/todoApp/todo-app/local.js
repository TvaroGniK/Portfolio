function getNewId(arr) {
  let max = 0;
  for (const item of arr) {
    if ( item.id > max) max = item.id;
  };
  return max + 1;
};

function saveList(keyName, arr) {
  localStorage.setItem(keyName, JSON.stringify(arr));
};

export  function getTodoListFromLs(key) {
	let listArray = [];
	if (localStorage.getItem(key) !== null) {
		listArray = JSON.parse(localStorage.getItem(key));
	};
	return listArray;
};

export function createTodoItemFromLs ({owner, name, done}) {
  const keyLS = document.getElementById('jsTitle').textContent;
  const listArray = getTodoListFromLs(keyLS) || [];
  let todoItem = {owner: owner, name, id : getNewId(listArray), done: done || false,};
  listArray.push(todoItem);
  // console.log(listArray);
  saveList(keyLS, listArray);
  return todoItem;
};

export  function switchTodoItemDoneFromLs ({todoItem}) {
  const keyLS = document.getElementById('jsTitle').textContent;
  const listArray = getTodoListFromLs(keyLS);
  for (const item of listArray) {
    if (item.id == todoItem.id) {
      item.done =! item.done;
      todoItem.done =! todoItem.done;
    };
  };
  saveList(keyLS, listArray);
};

export  function deleteTodoItemFromLs ({ element, todoItem }) {
  const keyLS = document.getElementById('jsTitle').textContent;
  const listArray = getTodoListFromLs(keyLS);
    if (!confirm('Вы уверены?')) {
      return;
    } else {
    for (let i = 0; i < listArray.length; i++) {
      if(listArray[i].id == todoItem.id) listArray.splice(i, 1);
     }
     element.remove();
     saveList(keyLS, listArray);
  };
};
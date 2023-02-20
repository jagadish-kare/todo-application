import { TodoListView } from "./view.js";
import { CloudStorage, URL, DataStructure } from "./cloud_store.js";
import { LocalStore } from "./local_store.js";
const todoInput = document.querySelector(".todoInput");
const select = document.querySelector(".select");
const addBtn = document.querySelector(".addBtn");
const todoContainer = document.querySelector(".todoContainer");
const mainDiv = document.querySelector(".main");
const deleteAllItem = document.querySelector(".deleteAll");
const { addEvent, append, prepareSaveBtn } = TodoListView();
const { getTodo, createTodo, deleteItem, deleteAll, editTodo } = CloudStorage();
const {get, setTodo, deleteAlltodoItem, deletetodoItem, editTodoItem} = LocalStore();

todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (mainDiv.innerText === "ADD") {
      event.preventDefault();
      createEvent();
    }
  }
});

function checkEventLocal(checkText, display, status, Text, todolist) {
  checkText.style.textDecoration = display;
  for (let i = 0; i < todolist.length; i++) {
    if (todolist[i].name === Text) {
      editTodoItem(i, new DataStructure(todolist[i].name, status), todolist);
    }
  }
}

async function selectMethod(method) {
  const array = await method;
  todoContainer.innerHTML = "";
  array.map((obj) => {
    addEvent(obj);
  });
}

async function checkEventCloud(checkText, display, id, Text, status) {
  checkText.style.textDecoration = display;
  await editTodo(id, Text, status);
}

export function controller() {
  return {
    deleteEvent: async function (deleteBtn, delId) {
      const dele = deleteBtn.parentElement;
      const text = dele.firstChild.innerText;
      if (select.value === "CLOUD - STORAGE") {
        const deleteRes = await deleteItem(delId);
        deleteRes.status === 204 && todoContainer.removeChild(dele);
      } else if (select.value === "LOCAL - STORAGE") {
        const todolist = get();
        for (let i = 0; i < todolist.length; i++) {
          if (todolist[i].name === text) {
            deletetodoItem(i, todolist);
            todoContainer.removeChild(dele);
          }
        }
      }
    },

    editEvent: function (editBtn, editId) {
      const edit = editBtn.parentElement;
      const edittext = edit.firstChild.innerText;
      todoInput.value = edittext;
      todoContainer.removeChild(edit);
      mainDiv.removeChild(addBtn);
      const save = prepareSaveBtn(editId, edittext);
      save.className = "saveBtn";
      append(mainDiv, save);
    },

    saveEvent: async function (saveBtn, oldText, savId) {
      if (todoInput.value === "") {
        alert("ENTER YOUR TASK...");
      } else {
        const text = todoInput.value;
        if (select.value === "CLOUD - STORAGE") {
          const editResponse = await editTodo(savId, text);
          if (editResponse.status === 204) {
            addEvent(new DataStructure(text,false, savId));
          }
        } else {
          const todolist = get();
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i].name === oldText) {
              editTodoItem(i, new DataStructure(text), todolist);
              addEvent(new DataStructure(text));
            }
          }
        }
        mainDiv.removeChild(saveBtn);
        mainDiv.appendChild(addBtn);
        todoInput.value = "";
      }
    },

    checkEvent: async function (checkBox, id) {
      const checkText = checkBox.parentElement.firstChild;
      const Text = checkBox.parentElement.firstChild.innerText;
      if (select.value === "CLOUD - STORAGE") {
        if (checkBox.checked) {
          checkEventCloud(checkText, "line-through", id, Text, true);
        } else {
          checkEventCloud(checkText, "none", id, Text);
        }
      } else {
        const todolist = get();
        if (checkBox.checked) {
          checkEventLocal(checkText, "line-through", true, Text, todolist);
        } else {
          checkEventLocal(checkText, "none", false, Text, todolist);
        }
      }
    },
  };
}

async function createEvent() {
  if (todoInput.value === "") {
    alert("ENTER YOUR TASK...");
  } else {
    const text = todoInput.value;
    if (select.value === "CLOUD - STORAGE") {
      const response = await createTodo(text);
      const result = await response.json();
      addEvent(result);
      todoInput.value = "";
    } else {
      const todolist = get();
      todolist.push(new DataStructure(text));
      setTodo(todolist);
      addEvent(new DataStructure(text));
      todoInput.value = "";
    }
  }
}

function deleteAllTask() {
  if (todoContainer.firstChild) {
    const confirmation = confirm("ALL YOUR TASKS WILL BE DELETED...");
    if (confirmation === true) {
      if (select.value === "CLOUD - STORAGE") {
        deleteAll();
      } else {
        deleteAlltodoItem();
      }
      todoContainer.innerHTML = "";
    }
  } else {
    alert("NO... ITEMS... TO... DELETE");
  }
}

async function refreshEvent() {
  alert("CLOUD-STORAGE IS YOUR DEFAULT STORAGE");
  const arrTodo = await getTodo(URL);
  arrTodo.map((result) => {
    addEvent(result);
  });
}

select.addEventListener("change", async () => {
  if (select.value === "CLOUD - STORAGE") {
    selectMethod(getTodo(URL));
  } else {
    selectMethod(get());
  }
});

addBtn.addEventListener("click", () => {
  createEvent();
});

deleteAllItem.addEventListener("click", () => {
  deleteAllTask();
});

refreshEvent();
export { todoContainer };

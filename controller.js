import { todoListView } from "./index.js";
import { cloudStorage, localStore } from "./store.js";
const todoInput = document.querySelector(".todoInput");
const url = "https://mk-ap-todo-webapi.azurewebsites.net/api/JagadishTodoItems";
const addBtn = document.querySelector(".addBtn");
const todoContainer = document.querySelector(".todoContainer");
const mainDiv = document.querySelector(".main");
const deleteAllItem = document.querySelector(".deleteAll");
const todoArr = localStorage.getItem("todo")? JSON.parse(localStorage.getItem("todo")): [];

export function controller() {
  return {
    addEvent: function (nodetext, delId) {
      const para = todoListView().prepareTodoPara();
      const node = todoListView().prepareTodoItem(nodetext);
      const dBtn = todoListView().prepareDeleteBtn(delId);
      const eBtn = todoListView().prepareEditBtn(delId);
      todoListView().append(para, node);
      todoListView().append(para, eBtn);
      todoListView().append(para, dBtn);
      todoListView().append(todoContainer, para);
    },

    createEvent: async function () {
      if (todoInput.value == "") {
        alert("ENTER YOUR TASK...");
      } else {
        const text = todoInput.value;
        const response = await cloudStorage().createTodo(text);
        const result = await response.json();
        todoArr.push(text);
        localStore().setTodo(todoArr);
        this.addEvent(text, result.id);
        todoInput.value = "";
      }
    },

    deleteEvent: function (deleteBtn) {
      const dele = deleteBtn.parentElement;
      const id = deleteBtn.id;
      todoContainer.removeChild(dele);
      cloudStorage().deleteItem(id);
      const todolist = localStore().get();
      for (let i = 0; i < todolist.length; i++) {
        if (todolist[i] == dele.innerText) {
          localStore().deletetodoItem(i, todolist);
        }
      }
    },
    editEvent: function (editBtn) {
      const edit = editBtn.parentElement;
      const text = edit.firstChild.innerText;
      todoInput.value = text;
      todoContainer.removeChild(edit);
      mainDiv.removeChild(addBtn);
      const id = editBtn.id;
      const save = todoListView().prepareSaveBtn(id);
      save.className = "saveBtn";
      todoListView().append(mainDiv, save);
    },

    saveEvent: async function (saveBtn) {
      if (todoInput.value == "") {
        alert("ENTER YOUR TASK...");
      } else {
        const text = todoInput.value;
        const id = saveBtn.id;
        await cloudStorage().editTodo(id, text);
        // localStore().editTodoItem(index , textValue)
        todoArr.push(text);
        localStore().setTodo(todoArr);
        this.addEvent(text, id);
        mainDiv.removeChild(saveBtn);
        mainDiv.appendChild(addBtn);
        todoInput.value = "";
      }
    },

    deleteAll: function () {
      const confirmation = confirm("ALL YOUR TASKS WILL BE DELETED...");
      if (confirmation == true) {
        cloudStorage().deleteAll();
        localStore().deleteAlltodoItem();
        todoContainer.innerHTML = "";
      }
    },
    refreshEvent: async function () {
      const arrTodo = await cloudStorage().getTodo(url);
      arrTodo.map(({ name, id }) => {
        this.addEvent(name, id);
      });
    },
  };
}

addBtn.addEventListener("click", () => {
  controller().createEvent();
});

deleteAllItem.addEventListener("click", () => {
  controller().deleteAll();
});

controller().refreshEvent();

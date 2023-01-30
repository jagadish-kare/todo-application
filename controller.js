import { todoListView } from "./index.js";
import { cloudStorage, localStore } from "./store.js";
const todoInput = document.querySelector(".todoInput");
const url = "https://mk-ap-todo-webapi.azurewebsites.net/api/JagadishTodoItems";
const addBtn = document.querySelector(".addBtn");
const todoContainer = document.querySelector(".todoContainer");
const mainDiv = document.querySelector(".main");
const deleteAllItem = document.querySelector(".deleteAll");


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
        const todolist = localStore().get()
        todolist.push(text);
        localStore().setTodo(todolist);
        this.addEvent(text, result.id);
        todoInput.value = "";
      }
    },

    deleteEvent: function (deleteBtn) {
      const dele = deleteBtn.parentElement;
      const text = dele.firstChild.innerText
      const id = deleteBtn.id;
      todoContainer.removeChild(dele);
      cloudStorage().deleteItem(id);
      const todolist = localStore().get()
      for (let i = 0; i < todolist.length; i++) {
        if (todolist[i] == text) {
          localStore().deletetodoItem(i, todolist);
        }
      }
    },
    editEvent: function (editBtn) {
      const edit = editBtn.parentElement;
      const edittext = edit.firstChild.innerText;
      todoInput.value = edittext;
      todoContainer.removeChild(edit);
      mainDiv.removeChild(addBtn);
      const id = editBtn.id;
      const save = todoListView().prepareSaveBtn(id , edittext);
      save.className = "saveBtn";
      todoListView().append(mainDiv, save);
    },

    saveEvent: async function (saveBtn , oldText) {
      if (todoInput.value == "") {
        alert("ENTER YOUR TASK...");
      } else {
        const text = todoInput.value;
        const id = saveBtn.id;
        await cloudStorage().editTodo(id, text);
        const todolist = localStore().get()
        for (let i = 0; i < todolist.length; i++) {
            if (todolist[i] == oldText) {
                localStore().editTodoItem(i , text , todolist)
            }
        }       
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

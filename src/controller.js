import { TodoListView } from "./view.js";
import { CloudStorage, LocalStore } from "./modal.js";
const todoInput = document.querySelector(".todoInput");
const url = "https://mk-todo-web-api.azurewebsites.net/api/JagadishTodoItems";
const addBtn = document.querySelector(".addBtn");
const todoContainer = document.querySelector(".todoContainer");
const mainDiv = document.querySelector(".main");
const deleteAllItem = document.querySelector(".deleteAll");
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (mainDiv.innerText === "ADD") {
      event.preventDefault();
      controller().createEvent();
    }
  }
});

export function controller() {
  const {prepareTodoPara, prepareTodoItem,prepareDeleteBtn,prepareEditBtn, prepareCheckBox, append, prepareSaveBtn} = TodoListView();
  const {getTodo, createTodo, deleteItem, deleteAll, editTodo} = CloudStorage();
  const {get, setTodo, deleteAlltodoItem, deletetodoItem, editTodoItem} = LocalStore()
  return {
    
    addEvent: function (nodetext, Id, stat) {
      const para = prepareTodoPara();
      const node = prepareTodoItem(nodetext);
      const dBtn = prepareDeleteBtn(Id);
      const eBtn = prepareEditBtn(Id);
      let cBox = prepareCheckBox(Id);
      append(para, node);
      append(para, cBox);
      if (stat === true) {
        cBox.checked = true;
        node.style.textDecoration = "line-through";
      }
      append(para, eBtn);
      append(para, dBtn);
      append(todoContainer, para);
    },

    createEvent: async function () {
      if (todoInput.value === "") {
        alert("ENTER YOUR TASK...");
      } else {
        const text = todoInput.value;
        const response = await createTodo(text);
        const result = await response.json();
        const todolist = get();
        todolist.push(text);
        setTodo(todolist);
        this.addEvent(text, result.id);
        todoInput.value = "";
      }
    },

    deleteEvent: function (deleteBtn) {
      const dele = deleteBtn.parentElement;
      const text = dele.firstChild.innerText;
      const id = deleteBtn.id;
      todoContainer.removeChild(dele);
      deleteItem(id);
      const todolist = get();
      for (let i = 0; i < todolist.length; i++) {
        if (todolist[i] === text) {
          deletetodoItem(i, todolist);
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
      const save = prepareSaveBtn(id, edittext);
      save.className = "saveBtn";
      append(mainDiv, save);
    },

    saveEvent: async function (saveBtn, oldText) {
      if (todoInput.value === "") {
        alert("ENTER YOUR TASK...");
      } else {
        const text = todoInput.value;
        const id = saveBtn.id;
        await editTodo(id, text);
        const todolist = get();
        for (let i = 0; i < todolist.length; i++) {
          if (todolist[i] === oldText) {
            editTodoItem(i, text, todolist);
          }
        }
        this.addEvent(text, id);
        mainDiv.removeChild(saveBtn);
        mainDiv.appendChild(addBtn);
        todoInput.value = "";
      }
    },

    deleteAll: function () {
      if (todoContainer.firstChild) {
        const confirmation = confirm("ALL YOUR TASKS WILL BE DELETED...");
        if (confirmation === true) {
          deleteAll();
          deleteAlltodoItem();
          todoContainer.innerHTML = "";
        }
      } else {
        alert("NO... ITEMS... TO... DELETE");
      }
    },

    checkEvent: async function (checkBox) {
      const id = checkBox.id;
      const checkText = checkBox.parentElement.firstChild;
      const Text = checkBox.parentElement.firstChild.innerText;
      if (checkBox.checked) {
        checkText.style.textDecoration = "line-through";
        await editTodo(id, Text, true);
      } else {
        checkText.style.textDecoration = "none";
        await editTodo(id, Text);
      }
    },

    refreshEvent: async function () {
      const arrTodo = await getTodo(url);
      arrTodo.map(({ name, id, isCompleted }) => {
        this.addEvent(name, id, isCompleted);
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

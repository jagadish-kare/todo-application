import {todoContainer, controller } from "./controller.js";
const {saveEvent, editEvent, deleteEvent, checkEvent} = controller()

export function TodoListView() {
  return {
    addEvent: function (result) {
      const para = prepareTodoPara();
      const node = prepareTodoItem(result.name);
      const dBtn = prepareDeleteBtn(result.id);
      const eBtn = prepareEditBtn(result.id);
      let cBox = prepareCheckBox(result.id);
      TodoListView().append(para, node);
      TodoListView().append(para, cBox);
      if (result.isCompleted === true) {
        cBox.checked = true;
        node.style.textDecoration = "line-through";
      }
      TodoListView().append(para, eBtn);
      TodoListView().append(para, dBtn);
      TodoListView().append(todoContainer, para);
    },

    append: function (parent, child) {
      parent.appendChild(child);
    },
    
    prepareSaveBtn: function (savId, edittext) {
      const saveBtn = createElement("button", "saveBn");
      saveBtn.innerText = "SAVE";
      addAttributeEventListener(saveBtn, savId, () => {
        saveEvent(saveBtn, edittext, savId);
      });
      return saveBtn;
    },
  };
}

function createElement(element, elementClassName) {
  let task = document.createElement(element);
  task.className = elementClassName;
  return task;
}

function addAttributeEventListener(element, id, onClickFunction) {
  element.setAttribute("id", id);
  element.addEventListener("click", onClickFunction);
  return element;
}

function prepareTodoPara() {
  const taskPara = createElement("p", "task-para");
  return taskPara;
}

function prepareCheckBox(checkId) {
  const checkBox = createElement("input", "check");
  checkBox.type = "checkbox";
  addAttributeEventListener(checkBox, checkId, () => {
    checkEvent(checkBox);
  });
  return checkBox;
}

function prepareTodoItem(taskName) {
  const taskNode = createElement("span", "task-span");
  taskNode.innerText = taskName;
  return taskNode;
}

function prepareEditBtn(editId) {
  const editBtn = createElement("button", "editBn");
  editBtn.innerText = "EDIT";
  addAttributeEventListener(editBtn, editId, () => {
    editEvent(editBtn, editId);
  });
  return editBtn;
}

function prepareDeleteBtn(delId) {
  const deleteBtn = createElement("button", "deleteBn");
  deleteBtn.innerText = "DELETE\n";
  addAttributeEventListener(deleteBtn, delId, () => {
    deleteEvent(deleteBtn, delId);
  });
  return deleteBtn;
}

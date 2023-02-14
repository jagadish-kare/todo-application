import {controller} from "./controller.js"
export function TodoListView () {
    return{
        createElement : function (element, elementClassName) {
            let task = document.createElement(element) 
            task.className = elementClassName
            return task
        },
        addAttributeEventListener : function (element, id, onClickFunction) {
            element.setAttribute("id", id)
            element.addEventListener("click", onClickFunction)
            return element
        },

        prepareTodoPara : function () {
            const taskPara = TodoListView().createElement("p" , "task-para")
            return taskPara
        },
        prepareCheckBox : function (checkId) {
            const checkBox = TodoListView().createElement("input", "check")
            checkBox.type = "checkbox";
            TodoListView().addAttributeEventListener(checkBox, checkId, () => {
                controller().checkEvent(checkBox)
            } )
            return checkBox;
        },
        prepareTodoItem : function (taskName) {
            const taskNode = TodoListView().createElement("span", "task-span")
            taskNode.innerText = taskName;
            return taskNode
        },

        prepareEditBtn : function (ediId) {
            const editBtn = TodoListView().createElement("button", "editBn")
            editBtn.innerText = "EDIT";
            TodoListView().addAttributeEventListener(editBtn, ediId, () => {
                controller().editEvent(editBtn)
            })
            return editBtn
        },

        prepareDeleteBtn : function (delId) {
            const deleteBtn = TodoListView().createElement("button", "deleteBn")
            deleteBtn.innerText = "DELETE\n";
            TodoListView().addAttributeEventListener(deleteBtn, delId, () => {
                controller().deleteEvent(deleteBtn)
            })
            return deleteBtn
        },

        prepareSaveBtn : function (savId , edittext) {
            const saveBtn = TodoListView().createElement("button", "saveBn")
            saveBtn.innerText = "SAVE";
            TodoListView().addAttributeEventListener(saveBtn, savId, () => {
                controller().saveEvent(saveBtn , edittext)
            })
            return saveBtn
        },

        append : function (parent , child ) {
            parent.appendChild(child);
        },
    }
}


import {controller} from "./controller.js"
export function todoListView () {
    return{
        prepareTodoPara : function () {
            const taskPara = document.createElement("p")
            taskPara.className = "task-para"
            return taskPara
        },
        prepareTodoItem : function (taskName) {
            const taskNode = document.createElement("span");
            taskNode.className = "task-span"
            taskNode.innerText = taskName;
            return taskNode
        },

        prepareEditBtn : function (ediId) {
            const editBtn = document.createElement("button");
            editBtn.innerText = "EDIT";
            editBtn.className = "editBn"
            editBtn.setAttribute("id" , ediId)
            editBtn.addEventListener("click" , () => {
                controller().editEvent(editBtn)
            })
            return editBtn
        },

        prepareDeleteBtn : function (delId) {
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "DELETE\n";
            deleteBtn.className = "deleteBn"
            deleteBtn.setAttribute("id" , delId)
            deleteBtn.addEventListener("click" , () => {
                controller().deleteEvent(deleteBtn)
            })
            return deleteBtn
        },

        prepareSaveBtn : function (savId , edittext) {
            const saveBtn = document.createElement("button");
            saveBtn.innerText = "SAVE";
            saveBtn.className = "saveBn"
            saveBtn.setAttribute("id" , savId)
            saveBtn.addEventListener("click",() => {
                controller().saveEvent(saveBtn , edittext)
            })
            return saveBtn
        },

        append : function (parent , child ) {
            parent.appendChild(child);
        },
    }
}


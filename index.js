import { CloudStorage , localstore} from "./store.js";

const todoInput = document.querySelector(".todoInput");
const addBtn = document.querySelector(".addBtn");
const todoContainer = document.querySelector(".todoContainer");

export function todoListView () {
    return{
        prepareTodoItem : function (taskName) {
            const taskNode = document.createElement("span");
            taskNode.innerText = taskName;
            return taskNode
        },

        prepareEditBtn : function () {
            const editBtn = document.createElement("button");
            editBtn.innerText = "EDIT";
            editBtn.className = "editBn"
            return editBtn
        },

        prepareDeleteBtn : function () {
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "DELETE";
            deleteBtn.className = "deleteBn"
            return deleteBtn
        },

        append : function (parent , child ) {
            parent.appendChild(child);
        },
    }
}


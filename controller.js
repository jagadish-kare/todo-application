import { todoListView } from "./index.js";
import { cloudStorage , localStore } from "./store.js";
const todoInput = document.querySelector(".todoInput");
const url = "https://mk-ap-todo-webapi.azurewebsites.net/api/JagadishTodoItems";
const addBtn = document.querySelector(".addBtn");
const todoContainer = document.querySelector(".todoContainer");
const mainDiv = document.querySelector(".main")
const editItem = document.querySelector(".editBn")
const element = document.querySelector(".deleteBn");
const deleteAllItem = document.querySelector(".deleteAll")
const todoArr = localStorage.getItem("Todo")?JSON.parse(localStorage.getItem("Todo")) : []

function controller () {
    return{
    addEvent : function (nodetext , deleId) { 
        const node = todoListView().prepareTodoItem(nodetext);
        const dBtn = todoListView().prepareDeleteBtn(deleId);
        const eBtn = todoListView().prepareEditBtn(deleId);
        todoListView().append(node , eBtn);
        todoListView().append(node , dBtn);
        todoListView().append(todoContainer , node);
    },

    createEvent :async function () {
        if(todoInput.value == ""){
            alert("ENTER YOUR TASK...")
        }else{
        const text = todoInput.value;
        const response = await cloudStorage().createTodo(text)
        const result = await response.json()
        const id = result.id
        todoArr.push(text)                                  
        localStore().setTodo(todoArr);
        this.addEvent(text , id )
        todoInput.value = ""

        function deleteItemId (id) {
        
            element.parentElement.remove();
            cloudStorage().deleteItem(id);
            localStore().deletetodoItem(id)
        }
        }
    },

    // deleteEvent : ,

    editEvent : function () {
       
        const textValue = editItem.parentElement.innerText;
        todoInput.value = textValue;
        cloudStorage().editTodo(id , textValue)
        localStore().editTodoItem(id , textValue)
        const save = todoListView().prepareSaveBtn();
        todoListView().append(mainDiv , save)
    },
    deleteAll : function () {
        cloudStorage().deleteAll()
        localStore().deleteAlltodoItem()
        todoContainer.innerHTML = ""
    },
    refreshEvent : async function () {
        const arrTodo = await cloudStorage().getTodo(url)
        arrTodo.map(
            ({name , id})=>{   
            this.addEvent(name , arrTodo.id)
            }
        )
    }
    } 
}

addBtn.addEventListener("click" , ()=>{
     controller().createEvent()
    })

element?.addEventListener("click" , () => {
    controller().createEvent().deleteItemId
})

editItem?.addEventListener("click" , () => {
    controller().editEvent()
})

deleteAllItem.addEventListener("click" , () => {
    controller().deleteAll()
})

controller().refreshEvent()


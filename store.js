const URL = "https://mk-ap-todo-webapi.azurewebsites.net/api/JagadishTodoItems";
    const deleteURL = "https://mk-ap-todo-webapi.azurewebsites.net/JagadishTodoItems/deleteAll";
function CloudStorage(){
    
    return{
        getTodo  : async (apiURL) => {
            const response = await fetch( apiURL, { method : 'GET'})
            let result = await response.json()
            return result;
        },
        setItem : async (api, options) => {
            const header = new Headers();
            header.append("content-type", "application/json");
            const response = await fetch(api , {
                ...options,
                headers : header,
            });
            return response
        },
        createTodo : function (todoName){
            try{
                this.setItem(URL, {
                    method : "POST",
                    body : JSON.stringify({"name" : todoName ,
                    }),
                })
            } catch(event){
                alert("SOMETHING WENT WRONG...")
            }
        },
        editTodo :async function(todoId , changeName) {
            this.setItem(`${URL}/${todoId}` , {
                method : "PUT",
                body : JSON.stringify({"name" : changeName ,}),
            })
        },
        deleteItem : function(todoId) {
            this.setItem(`${URL}/${todoId}`, {
                method : "DELETE" ,
            });
        },
        deleteAll : function(){
            this.setItem(deleteURL, {
                method : "DELETE",
            });
        },
        getTodoItem : async function (todoId){
           const item =  this.getTodo(`${URL}/${todoId}`)
           return item
        },
    }
}

function localstore(){
    const storage = localStorage;

    return{
        get : function () {
            return storage.getItem("todo")?JSON.parse(storage.getItem("todo")) : []
        },
        setTodo : function (arr) {
            return storage.setItem("todo" , JSON.stringify(arr))
        },
        createTodoList : function () {
            this.setTodo(array)
        },
        deletetodoItem : function (todoId) {
            const list = this.get();
            list.splice(todoId , 1);
            this.setTodo(list);
        },
        deleteAlltodoItem : function () {
            const list = this.get();
            list.splice(0);
            this.setTodo(list);
        },
        editTodoItem : function (todoId , editName) {
            const editList = this.get();
            editList.splice(todoId , 1 , editName)
            this.setTodo(editList);
        }
    }
}
// console.log(CloudStorage().createTodo("shop"))+++++++
// CloudStorage().deleteItem(9)+++++++++
// CloudStorage().deleteAll()++++++++++
// const a = await CloudStorage().getTodo(URL)+++++++
// const a = await CloudStorage().getTodoItem(12)+++++++
const a = await CloudStorage().editTodo(12 , "movie")
console.log(a)
export {CloudStorage , localstore}
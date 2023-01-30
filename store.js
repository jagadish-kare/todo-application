const URL = "https://mk-ap-todo-webapi.azurewebsites.net/api/JagadishTodoItems";
const deleteURL = "https://mk-ap-todo-webapi.azurewebsites.net/JagadishTodoItems/deleteAll";


function cloudStorage(){
    
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
                const result = this.setItem(URL, {
                    method : "POST",
                    body : JSON.stringify({"name" : todoName ,
                    }),
                })
                return result
            } catch(event){
                alert("SOMETHING WENT WRONG...")
            }
           
        },
        editTodo :async function(todoId , changeName) {
            const edit = await this.setItem(`${URL}/${todoId}` , {
                method : "PUT",
                body : JSON.stringify({"id" : todoId ,"name" : changeName , "isComplete" : false })
            })
            return  edit
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

function localStore(){
    const storage = localStorage;

    return{
        get : function () {
            let list = storage.getItem("todo")?JSON.parse(storage.getItem("todo")) : []
            return list
        },
        setTodo : function (arr) {
             storage.setItem("todo" , JSON.stringify(arr))
        },
        deletetodoItem : function (index , list) {
            list.splice(index , 1);
            this.setTodo(list);
        },
        deleteAlltodoItem : function () {
            this.setTodo([]);
        },
        editTodoItem : function (index , editName , list) {
            list.splice(index , 1 , editName)
            this.setTodo(list);
        }
    }
}
// console.log(CloudStorage().createTodo("calll"))
// CloudStorage().deleteItem(9)
// CloudStorage().deleteAll()
// const a = await CloudStorage().getTodo(URL)
// const a = await CloudStorage().getTodoItem(12)
// const a = CloudStorage().editTodo(2 , "swimming")
export {cloudStorage , localStore}
// cloudStorage().getTodo(URL)
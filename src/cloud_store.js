const URL = "https://mk-todo-web-api.azurewebsites.net/api/JagadishTodoItems";
const deleteURL = "https://mk-todo-web-api.azurewebsites.net/JagadishTodoItems/deleteAll";
function DataStructure ( name, isCompleted, id) {
    return{
        name,
        isCompleted,
        id
    }
  }
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
                const result = CloudStorage().setItem(URL, {
                    method : "POST",
                    body : JSON.stringify(new DataStructure(todoName)),
                })
                return result
            } catch(event){
                alert("SOMETHING WENT WRONG...")
            }
           
        },
        editTodo :async function(todoId , changeName , status = false) {
            const edit = await CloudStorage().setItem(`${URL}/${todoId}` , {
                method : "PUT",
                body : JSON.stringify(new DataStructure( changeName, status , todoId))
            })
            return  edit
        },
        deleteItem : async function(todoId) {
            return await CloudStorage().setItem(`${URL}/${todoId}`, {
                method : "DELETE" ,
            });
        },
        deleteAll : function(){
            CloudStorage().setItem(deleteURL, {
                method : "DELETE",
            });
        },

    }
}

export {CloudStorage, URL}
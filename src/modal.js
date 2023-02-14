const URL = "https://mk-todo-web-api.azurewebsites.net/api/JagadishTodoItems";
const deleteURL = "https://mk-todo-web-api.azurewebsites.net/JagadishTodoItems/deleteAll";


function CloudStorage(){
    
    return{
        DataStructure : function ( name, id , isCompleted) {
            return{
                name,
                id,
                isCompleted
            }
          },
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
                    body : JSON.stringify(new CloudStorage().DataStructure(todoName)),
                })
                return result
            } catch(event){
                alert("SOMETHING WENT WRONG...")
            }
           
        },
        editTodo :async function(todoId , changeName , status = false) {
            const edit = await CloudStorage().setItem(`${URL}/${todoId}` , {
                method : "PUT",
                body : JSON.stringify(new CloudStorage().DataStructure( changeName , todoId , status))
            })
            return  edit
        },
        deleteItem : function(todoId) {
            CloudStorage().setItem(`${URL}/${todoId}`, {
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

function LocalStore(){
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
            LocalStore().setTodo(list);
        },
        deleteAlltodoItem : function () {
            LocalStore().setTodo([]);
        },
        editTodoItem : function (index , editName , list) {
            list.splice(index , 1 , editName)
            LocalStore().setTodo(list);
        }
    }
}
export {CloudStorage , LocalStore}
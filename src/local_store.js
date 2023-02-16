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

export {LocalStore}
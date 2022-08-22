const savedTodos = JSON.parse(localStorage.getItem("todos")) || []
const todoInput = document.getElementById("todo-input");

const viewModel = viewModelFactory()

function updateStorage() {
    localStorage.setItem('todos', JSON.stringify(viewModel.todos()))
}

function viewModelFactory() {

    const self = {
        title: 'KO Todos!!',
        todos: ko.observableArray(savedTodos)
    }

    self.saveTodo = function () {
        console.log("in saveTodo()")
        const today = new Date().toLocaleString()
        const newTodo = {
            content: todoInput.value,
            date: today,
            completed: false
        }
        self.todos.push(newTodo)
        updateStorage()
        todoInput.value = '';
    }

    ko.applyBindings(self)
    return self;
}

function removeTodo(todo) {
    viewModel.todos.remove(todo);
    updateStorage()
}

function updateComplete(todo) {
    viewModel.todos.replace(todo, { ...todo, completed: !todo.completed })
    updateStorage()
}

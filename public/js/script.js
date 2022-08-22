const savedTodos = JSON.parse(localStorage.getItem("todos")) || []
const todoInput = document.getElementById("todo-input");

const viewModel = viewModelFactory()

function viewModelFactory() {

    const self = {
        title: 'KO Todos!!',
        todos: ko.observableArray(savedTodos).sort((a, b) => a.date - b.date)
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
        localStorage.setItem('todos', JSON.stringify(self.todos()))
        todoInput.value = '';
    }

    ko.applyBindings(self)
    return self;
}

function updateComplete(todo) {

    viewModel.todos.replace(todo, { ...todo, completed: !todo.completed })
    localStorage.setItem('todos', JSON.stringify(viewModel.todos()))

}

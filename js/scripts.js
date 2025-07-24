let todos = [];

function addItem() {
    const addTodo = document.getElementById('todo-input');
    const addDate = document.getElementById('date-input');

    if (addTodo.value === '' || addDate.value === '') {
        alert('Please fill in both fields.');
    } else {
        todos.push({
            title: addTodo.value,
            date: addDate.value,
            done: false
        });
            renderTodos();
            addTodo.value = '';
            addDate.value = '';

        }
    }

function toggleDone(index) {
    todos[index].done = !todos[index].done;
    renderTodos();
}

function deleteItem(index) {
    todos.splice(index, 1); 
    renderTodos(); 
}

function deleteAll() {
    todos = [];
    renderTodos();
}

function filterTodos(mode) {
    renderTodos(mode); 
}

function formatTanggal(dateStr) {
    const bulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    
    const [tahun, bulanIdx, hari] = dateStr.split("-");
    return `${hari} ${bulan[parseInt(bulanIdx) - 1]} ${tahun}`;
}

function renderTodos(filter = "all") {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    let filteredTodos = todos;

    if (filter === "done") {
        filteredTodos = todos.filter(todo => todo.done);
    } else if (filter === "undone") {
        filteredTodos = todos.filter(todo => !todo.done);
    }

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li>Tidak ada tugas</li>';
        return;
    }

    filteredTodos.forEach((todo, index) => {
        const tanggalFormatted = formatTanggal(todo.date);
        todoList.innerHTML += `
            <li class="todo-item ${todo.done ? 'selesai' : ''}">
                <input type="checkbox" onchange="toggleDone(${index})" ${todo.done ? "checked" : ""}>
                <span class="todo-title"><strong>${todo.title}</strong></span>
                <span class="todo-date">${tanggalFormatted}</span>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            </li>
        `;
    });
}


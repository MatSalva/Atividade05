function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.id));
  }
  
  function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#apptarefas li')).map(li => ({
      id: li.dataset.id,
      text: li.querySelector('span').textContent
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function addTask(text, id = Date.now().toString()) {
    const li = document.createElement('li');
    li.dataset.id = id;
    li.className = 'list-group-item';
  
    const taskText = document.createElement('span');
    taskText.textContent = text;
    li.appendChild(taskText);
  
    const editButton = document.createElement('button');
    editButton.className = 'btn-edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(li));
    li.appendChild(editButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn-delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(li));
    li.appendChild(deleteButton);

    const finishButton = document.createElement('button');
    finishButton.className = 'btn-complete';
    finishButton.textContent = concluida ? 'Desfazer' : 'Concluir';
    finishButton.addEventListener('click', () => concluirTarefa(li));
    finishButton.appendChild(finishButton);

  li.appendChild(botaoGrupo);
  
    document.getElementById('todoList').appendChild(li);
    saveTasks();
  }

  function editTask(li) {
    const taskText = li.querySelector('span');
    const newText = prompt('Edit task', taskText.textContent);
    if (newText) {
      taskText.textContent = newText;
      saveTasks();
    }
  }
  
  function deleteTask(li) {
    li.remove();
    saveTasks();
  }

  document.getElementById('todoInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const input = document.getElementById('todoInput');
      const text = input.value.trim();
      if (text) {
        addTask(text);
        input.value = '';
      }
    }
  });
  
  document.getElementById('addButton').addEventListener('click', () => {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text) {
      addTask(text);
      input.value = '';
    }
  });
  
  loadTasks();
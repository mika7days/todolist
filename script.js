class TodoList {
  constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.filter = 'all';
      this.setupEventListeners();
      this.render();
  }

  setupEventListeners() {
      // Add task
      document.querySelector('.add-btn').addEventListener('click', () => this.addTask());
      document.querySelector('.main-input').addEventListener('keypress', (e) => {
          if (e.key === 'Enter') this.addTask();
      });

      // Filter tasks
      document.querySelectorAll('.filter').forEach(filter => {
          filter.addEventListener('click', (e) => {
              document.querySelector('.filter.active').classList.remove('active');
              e.target.classList.add('active');
              this.filter = e.target.dataset.filter;
              this.render();
          });
      });

      // Sort tasks
      document.querySelector('.sort-icon').addEventListener('click', () => {
          this.tasks.reverse();
          const icon = document.querySelector('.sort-icon');
          icon.classList.toggle('up');
          icon.classList.toggle('fa-sort-amount-down');
          icon.classList.toggle('fa-sort-amount-up');
          this.render();
          this.updateLocalStorage();
      });

      // Clear completed
      document.querySelector('.clear-completed').addEventListener('click', () => {
          this.tasks = this.tasks.filter(task => !task.completed);
          this.render();
          this.updateLocalStorage();
      });
  }

  addTask() {
      const input = document.querySelector('.main-input');
      const text = input.value.trim();
      
      if (text) {
          this.tasks.unshift({
              id: Date.now(),
              text,
              completed: false,
              createdAt: new Date()
          });
          input.value = '';
          this.render();
          this.updateLocalStorage();
      }
  }

  toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
          task.completed = !task.completed;
          this.render();
          this.updateLocalStorage();
      }
  }

  deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.render();
      this.updateLocalStorage();
  }

  getFilteredTasks() {
      switch(this.filter) {
          case 'active':
              return this.tasks.filter(task => !task.completed);
          case 'completed':
              return this.tasks.filter(task => task.completed);
          default:
              return this.tasks;
      }
  }

  render() {
      const container = document.querySelector('.tasks-container');
      const filteredTasks = this.getFilteredTasks();
      
      container.innerHTML = filteredTasks.map(task => `
          <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
              <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
              <span class="task-text">${task.text}</span>
              <button class="task-delete">×</button>
          </div>
      `).join('');

      // Update tasks count
      document.querySelector('.tasks-count').textContent = 
          `${this.tasks.filter(t => !t.completed).length} items left`;

      // Setup new task listeners
      container.querySelectorAll('.task-item').forEach(taskEl => {
          const id = parseInt(taskEl.dataset.id);
          taskEl.querySelector('.task-checkbox').addEventListener('change', 
              () => this.toggleTask(id));
          taskEl.querySelector('.task-delete').addEventListener('click', 
              () => this.deleteTask(id));
      });
  }

  updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

// Initialize the app
new TodoList();

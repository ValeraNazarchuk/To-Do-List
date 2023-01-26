const headerText = document.querySelector('.header__text')

const form = document.querySelector('.form')
const taskInput = document.querySelector('.form__text')
const formBtn = document.querySelector('.form__btn')

const taskList = document.querySelector('.list')
const emptyList = document.querySelector('.list__item-empty')

let tasks = []

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
  tasks.forEach((task) => renderTask(task))
}

checkEmptyList()
numberTask(tasks.length)

form.addEventListener('submit', addTask)

taskList.addEventListener('click', deleteTask)

taskList.addEventListener('click', doneTask)

function addTask(e) {
  e.preventDefault()

  const taskText = taskInput.value

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  }

  // tasks.push(newTask)
  
  // filter for css class
  if (taskText) {
    tasks.push(newTask)
    renderTask(newTask)
    numberTask(tasks.length)
  }

  // почистити поле ввода і додати фокус
  taskInput.value = ''
  taskInput.focus()

  checkEmptyList()
  saveToLocalStorage()
}

function deleteTask(e) {
  if (e.target.parentElement.className !== 'delete__btn') return

  const parentNode = e.target.closest('.list__item')

  const id = +parentNode.id

  tasks = tasks.filter((task) => task.id !== id)

  parentNode.remove()

  checkEmptyList()
  saveToLocalStorage()
  numberTask(tasks.length)
}

function doneTask(e) {
  if (e.target.dataset.check !== 'done') return

  const parentNode = e.target.closest('.list__item')

  const id = +parentNode.id

  const task = tasks.find((task) => task.id === id)

  task.done = !task.done

  if (e.target.dataset.check === 'done') {
    e.target.classList.toggle('check--active')

    const listText = e.target.closest('li').querySelector('.list__text')

    listText.classList.toggle('list__text-active')
  }

  saveToLocalStorage()
}

function checkEmptyList() {
  if (tasks.length > 0) {
    emptyList.style.display = 'none'
  } else {
    emptyList.style.display = 'flex'
  }
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
  const cssClass = task.done ? 'list__text list__text-active' : 'list__text'

  const taskHTML = `<li id = '${task.id}' class="list__item">
          <button class="delete__btn" type="button">
            <img src="./images/delete.svg" alt="delete">
          </button>
          <button class="check__btn" data-check="done" type="button"></button>
          <p class="${cssClass}">${task.text}</p>
        </li>`

  taskList.insertAdjacentHTML('afterbegin', taskHTML)
}

function numberTask(args) {
  headerText.textContent = `${args} tasks`
}
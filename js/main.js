const form = document.querySelector('.form')
const taskInput = document.querySelector('.form__text')
const formBtn = document.querySelector('.form__btn')

const taskList = document.querySelector('.list')
const emptyList = document.querySelector('.list__item-empty')

let tasks = []

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

  tasks.push(newTask)

  // filter for css class
  const cssClass = newTask.done ? 'list__text list__text-active' : 'list__text'

  const taskHTML = `<li id = '${newTask.id}' class="list__item">
          <button class="delete__btn" type="button">
            <img src="./images/delete.svg" alt="delete">
          </button>
          <button class="check__btn" data-check="done" type="button"></button>
          <p class="${cssClass}">${newTask.text}</p>
        </li>`

  taskList.insertAdjacentHTML('beforeend', taskHTML)

  // почистити поле ввода і додати фокус
  taskInput.value = ''
  taskInput.focus()

  checkEmptyList()
}

function deleteTask(e) {
  if (e.target.parentElement.className !== 'delete__btn') return

  const parentNode = e.target.closest('.list__item')

  const id = +parentNode.id

  tasks = tasks.filter((task) => task.id !== id)

  // const index = tasks.findIndex( (task) => task.id === id)

  // tasks.splice(index, 1)
  parentNode.remove()

  checkEmptyList()
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
}

function checkEmptyList() {
  if (tasks.length > 0) {
    emptyList.style.display = 'none'
  } else {
    emptyList.style.display = 'flex'
  }
}
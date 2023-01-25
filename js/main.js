const form = document.querySelector('.form')
const taskInput = document.querySelector('.form__text')
const formBtn = document.querySelector('.form__btn')

const taskList = document.querySelector('.list')
const emptyList = document.querySelector('.list__item-empty')

form.addEventListener('submit', addTask)

taskList.addEventListener('click', deleteTask)

taskList.addEventListener('click', doneTask)

function addTask(e) {
  e.preventDefault()

  const taskText = taskInput.value

  const taskHTML = `<li class="list__item">
          <button class="delete__btn" type="button">
            <img src="./images/delete.svg" alt="delete">
          </button>
          <button class="check__btn" data-check="done" type="button"></button>
          <p class="list__text">${taskText}</p>
        </li>`

  taskList.insertAdjacentHTML('beforeend', taskHTML)

  if (taskList.children.length > 1) {
    emptyList.style.display = 'none'
  }

  // почистити поле ввода і додати фокус
  taskInput.value = ''
  taskInput.focus()
}

function deleteTask(e) {
  if (e.target.parentElement.className !== 'delete__btn') return

  if (e.target.parentElement.className === 'delete__btn') {
    e.target.closest('li').remove()

    if (taskList.children.length === 1) {
      emptyList.style.display = 'flex'
    }
  }
}

function doneTask(e) {
  if (e.target.dataset.check !== 'done') return

  if (e.target.dataset.check === 'done') {
    e.target.classList.toggle('check--active')

    const listText = e.target.closest('li').querySelector('.list__text')

    listText.classList.toggle('list__text-active')
  }
}
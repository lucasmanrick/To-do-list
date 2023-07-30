let toDoList = []
let incrementId = 0

function createTask (dados) {
  incrementId = ++incrementId
  toDoList.push ({id:incrementId,task:dados[0],hour:dados[1]})
}// function que registra task (deve se chamada no submit).


function uploadTask (id="",dados) {
  if (id !== "") {
    let taskToUpload = toDoList.filter (el => el.id === id)
    if (dados[0] != "") {
      taskToUpload[0].task = dados[0]
    }
    if (dados[1] != "") {
      taskToUpload[0].hour = dados[1]
    }
  }
}// function para modificar dados


function removeTask (id="") {
  toDoList.forEach ((el,index) => {
    if (id === el.id) {
      toDoList.splice (index,1) 
    }
  })
} // function que remove a task do id especificado


function registerNewTask () {
  const sendTaskForm = document.querySelector (`.formulare-task`) 
  const inputTask = document.querySelector (`#input-task`)
  const inputHour = document.querySelector (`#input-hour`)
  
  sendTaskForm.addEventListener (`submit`, function (ev) {
    ev.preventDefault ()

    if (inputHour.value > 0 && inputHour.value <= 24) {
      let dataRegister = [inputTask.value,inputHour.value]
      createTask (dataRegister)
      refreshTasks ()
      inputTask.value = ``
      inputHour.value = ``
    }
  })
  
}// function que adiciona eventlistener ao formulario principal

function refreshTasks () {
  const parentTasksContent = document.querySelector (`.tasks-content`);
  parentTasksContent.innerText = ``

  toDoList.forEach ((el,index) => {
    let taskContent = document.createElement (`div`)
    taskContent.classList.add (`tasks`)
    let taskPosition = document.createElement (`div`)
    taskPosition.classList.add (`text-centralize`,`spread-divs`)
    taskPosition.innerText = index + 1
    let taskActivity = document.createElement (`div`)
    taskActivity.classList.add (`text-centralize`,`task-activity`)
    taskActivity.innerText = el.task
    taskActivity.innerHTML += `<span class="hours-content">${el.hour} hours</span>` 
    let taskTools = document.createElement (`div`)
    taskTools.classList.add (`text-centralize`,`spread-divs`)
    let editBtn = document.createElement (`button`)
    editBtn.classList.add (`submit-style`)
    editBtn.innerText = `edit`
    let removeBtn = document.createElement (`button`)
    removeBtn.classList.add (`submit-style`)
    removeBtn.innerText = `remove`

    editBtn.addEventListener (`click`, ()=> {
      let editFormulareContent = document.querySelector (`.edit-formulare`)
      editFormulareContent.classList = `edit-formulare-appear`

      let exitFormBtn = document.querySelector (`.close-button`)
      exitFormBtn.addEventListener (`click`, () => {
        editFormulareContent.classList = `edit-formulare`
      })

      let updateForm = document.getElementById (`update-form`)

      updateForm.addEventListener (`submit`,(ev)=> {
        ev.preventDefault ()
        let inputTaskValue = document.querySelector (`#input-edit-task`)
        let inputHourValue = document.querySelector (`#input-edit-time`)
        let dataBase = []

        if (inputTaskValue.value != ``) {
          dataBase[0] = inputTaskValue.value
        }else {
          dataBase[0] = ``
        }
        if (inputHourValue.value > 0 && inputHourValue.value <= 24) {
          dataBase[1] = inputHourValue.value
        }
        else {
          dataBase[1] = ``
        }

        if (dataBase[0] !== `` || dataBase[1] !== ``) {
          editFormulareContent.classList = `edit-formulare`
        }

        inputHourValue.value = ``
        inputTaskValue.value = ``
        uploadTask (el.id,dataBase)
        refreshTasks()
      })
    })

    removeBtn.addEventListener (`click`, () => {
      removeTask (el.id)
      refreshTasks ()
    })

    taskTools.append (editBtn,removeBtn)
    taskContent.append (taskPosition,taskActivity,taskTools)
    parentTasksContent.append (taskContent)
  })
}// itera a toDoList e cria elementos na pagina a cada item do array e usa o uploadTask pra adicionar evento ao edit button

registerNewTask ()
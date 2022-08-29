// seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
let oldInputValue;

//funções

const saveTodo = (text) => {
     const todo = document.createElement('div')
     todo.classList.add("todo")

     const todoTitle = document.createElement("h3")
     todoTitle.innerText = text
     todo.appendChild(todoTitle)

     const doneBtn = document.createElement("button")
     doneBtn.classList.add("finish-todo")
     doneBtn.innerHTML =  '<i class="fa-solid fa-check"></i>'
     todo.appendChild(doneBtn)

     const deleteBtn = document.createElement("button")
     deleteBtn.classList.add("edit-todo")
     deleteBtn.innerHTML =  '<i class="fa-solid fa-pen"></i>'
     todo.appendChild(deleteBtn)

     const removeBtn = document.createElement("button")
     removeBtn.classList.add("remove-todo")
     removeBtn.innerHTML =  '<i class="fa-solid fa-xmark"></i>'
     todo.appendChild(removeBtn)

     todoList.appendChild(todo) // colca a div todo dentro do elemento pai todoList

     todoInput.value = ""
     todoInput.focus();
}

const toggleForms = () => {
     editForm.classList.toggle("hide")
     todoForm.classList.toggle("hide")

}

const updateTodo = (text) => {
     const todos =  document.querySelectorAll(".todo")

     todos.forEach((todo) => {
          let todoTitle = todo.querySelector("h3")

          if(todoTitle.innerText === oldInputValue){
               todoTitle.innerText = text
          }
     })
}


//eventos
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault(); //NÃO ENVIA PARA O BACKEND
    
    const inputValue = todoInput.value; //propriedade value do input possui o valor

    if(inputValue){
        saveTodo(inputValue);
   }
});

document.addEventListener("click", (e) => {
     const targetEl = e.target
     const parentEl = targetEl.closest("div")
     let todoTitle;

     //pré requisitos para se ter um titulo
     if(parentEl &&parentEl.querySelector("h3")){
          todoTitle = parentEl.querySelector("h3").innerText
     }

     if(targetEl.classList.contains("finish-todo")){
          parentEl.classList.toggle("done")
     }

     if(targetEl.classList.contains("remove-todo")){
          parentEl.remove()
     }

     if(targetEl.classList.contains("edit-todo")){
          toggleForms()

          editInput.value = todoTitle
          oldInputValue = todoTitle
     }
})

cancelEditBtn.addEventListener("click", (e) =>{
     e.preventDefault()

     toggleForms()
})

editForm.addEventListener("submit", (e) => {
     e.preventDefault(  )

     const editInputValue = editInput.value

     if(editInputValue){
          updateTodo(editInputValue)
     }

     toggleForms()
})
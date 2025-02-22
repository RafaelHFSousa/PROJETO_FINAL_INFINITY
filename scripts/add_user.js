const nome = document.querySelector("#nome")
const funcao = document.querySelector("#funcao")
const senha = document.querySelector("#senha")
const formulario_cadastro = document.querySelector("#formulario_cadastro")

const todos_users = JSON.parse(localStorage.getItem("todos_users")) || []


formulario_cadastro.addEventListener("submit",(e)=>{
    let novo_id = todos_users.length + 1

    const novo_user = {
        id: novo_id, 
        username: nome.value, 
        password: senha.value, 
        role: funcao.value 
    }
    todos_users.push(novo_user)

    localStorage.setItem("todos_users", JSON.stringify(todos_users))
})

console.log(todos_users)
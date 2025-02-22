// ============ IMPORTANDO A LISTA DE PRODUTOS =============
import { lista_dicionarios } from "./bd.js";

const userNameLogin = document.querySelector("#userName")
const userSenhalogin = document.querySelector("#userSenha")
const loginBotao = document.querySelector("#loginBotao")


// ============ EVENTO NO BOTAO DE LOGIN ================
loginBotao.addEventListener("click", (e)=>{
    e.preventDefault()
    
    let users = [
        {id: 1, username: "admin", password:123, role: "admin"},
        {id: 2, username: "administrador", password:123, role: "admin"},
        {id: 3, username: "funcionario", password:123, role: "villager"},
    
    ]
    // ======== PEGUNTANDO SE todos_users existe no localStorage ===========
    localStorage.getItem("todos_users")? null : localStorage.setItem("todos_users", JSON.stringify(users))

    const todos_users = JSON.parse(localStorage.getItem("todos_users"))
    console.log(todos_users)

    // ========= VALIDAÇAO PARA ENTRAR NO SISTEMA ==============
    const inputUsername = userNameLogin.value;
    const inputPassword = userSenhalogin.value;

    const procurarUser = todos_users.find((user) => user.username == inputUsername && user.password == inputPassword)
    console.log(procurarUser)

    if(procurarUser){

        localStorage.setItem("useres", JSON.stringify([procurarUser]));

        // =========== IF TERNARIO PARA VALIDAÇÃO SE EXISTE TAL LOCALSTORAGE ======
        localStorage.getItem("lista_local")? null : localStorage.setItem("lista_local", JSON.stringify(lista_dicionarios))

        // ====== REDIRECIONAR PARA O LOCAL CORRETO ========
        if(procurarUser.role === "admin"){
            window.location.href = "../templates/adm.html";
        }
        else{
            window.location.href = "../templates/funcionario.html";
        }
    }
    else{
        alert("USUÁRIO OU SENHA INEXISTENTE")
    }
})

const container2 = document.querySelector("#container2")
const lista_detalhe = JSON.parse(localStorage.getItem("validacao")) || []
const lista_local = JSON.parse(localStorage.getItem("lista_local")) || []
// console.log(lista_detalhe)
// console.log(lista_local)

const validacao_role = JSON.parse(localStorage.getItem("useres")) || []
console.log(validacao_role)

// ============ FUNÇÃO DE CRIAR CARD =============
function criarCardDetalhe(e){

    const card = document.createElement("div")
    card.className = "card_detalhe"

    const card_imagem = document.createElement("img")
    card_imagem.src = e.url
    card_imagem.alt = `Imagem do ${e.nome}`


    // ========== validacao da cor da borda ===========
    e.quantidade >=1? card_imagem.className = "img_on": card_imagem.className = "img_off"


    const card_nome = document.createElement("h1")
    card_nome.textContent = e.nome

    const card_descricao = document.createElement("p")
    card_descricao.textContent = e.descricao


    const botao_excluir = document.createElement("button")
    botao_excluir.textContent = "Excluir"

    // ========= EVENTO NOS BOTOES =========
    // === 1 ====
    botao_excluir.addEventListener("click", ()=>{
        botao_excluir.remove()
        lista_local.forEach((ide_vez,index) =>{
            if(ide_vez.id === e.id){
                console.log("caiu no if")
                lista_local.splice(index,1)
                localStorage.setItem("lista_local", JSON.stringify(lista_local))
            }
        })        
    })

    // ======== CRIAR A FUNÇÃO PARA VIZIALIZAR MELHOR ========
    card.addEventListener("click", ()=>{
        localStorage.setItem("validacao", JSON.stringify(e.id))
        // window
    })

    card.append(card_imagem,card_nome,card_descricao,botao_excluir)

    if(validacao_role[0].role !== "admin"){
        botao_excluir.remove()
    }

    
    return card
}


lista_local.forEach((elemet) =>{
    if(lista_detalhe[0] === elemet.id){
        container2.appendChild(criarCardDetalhe(elemet))
    }
})
const container = document.querySelector("#container")
const quantidade_na_lista = document.querySelector("#quantidade_na_lista")
const lista_produtos = JSON.parse(localStorage.getItem("lista_produtos")) || []
const lista_local = JSON.parse(localStorage.getItem("lista_local")) || []

console.log(lista_produtos)
quantidade_na_lista.textContent = lista_produtos.length > 1? `Lista com: ${lista_produtos.length} itens` : `Lista com: ${lista_produtos.length} iten`


function criarCard(e){

    let contador = e.quantidade

    const card = document.createElement("div")
    card.className = "novo_card"

    const card_imagem = document.createElement("img")
    card_imagem.src = e.url
    card_imagem.alt = `Imagem do ${e.nome}`

    // ========== if ternário da cor da borda da imagem ===========
    e.quantidade > 0? card_imagem.className = "img_on": card_imagem.className = "img_off"


    const card_nome = document.createElement("h2")
    card_nome.textContent = e.nome

    const card_descricao = document.createElement("p")
    card_descricao.textContent = e.descricao

    const card_quantidade = document.createElement("p")
    card_quantidade.textContent = `QTD: ${e.quantidade}`
    // card_quantidade.className ="div_quantidade"


    const botao_excluir = document.createElement("button")
    botao_excluir.textContent = "EXCLUIR"

    // ========= EVENTO NO BOTÃO ADD =========
    botao_excluir.addEventListener("click", ()=>{
        // ===== REMOVE O CARD ESPECIFICO ====
        container.removeChild(card)

        
        // ========= FORMA DE REMOVER O PRIMEIRA OCORRECIA DE UM ELEMENTO EM UMA ARRAY =========
        const indice = lista_produtos.indexOf(e)
        console.log(indice)

        if(indice !== -1){
            lista_produtos.splice(indice, 1)
            localStorage.setItem("lista_produtos", JSON.stringify(lista_produtos))
        }


        quantidade_na_lista.textContent = `Lista com: ${lista_produtos.length} itens`

  
    })

    // ======== CRIAR A FUNÇÃO PARA VIZIALIZAR MELHOR ========
    card.addEventListener("click", (todoCard)=>{
        if(todoCard.target !== botao_excluir && todoCard.target !== card_quantidade){
            const validacao = [e.id]
            localStorage.setItem("validacao", JSON.stringify(validacao))
            window.open("../templates/detalhes.html", "_blank")
        }
 

    })

    card.append(card_imagem,card_nome,botao_excluir)

    
    return card
}

// ======== LISTAR CARDS ==========

lista_produtos.forEach((element)=>{
    container.appendChild(criarCard(element))
})
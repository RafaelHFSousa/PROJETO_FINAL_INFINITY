const lista_local = JSON.parse(localStorage.getItem("lista_local")) || []
const lista_produtos = JSON.parse(localStorage.getItem("lista_produtos")) || []
const useres = JSON.parse(localStorage.getItem("useres")) || []


// ======== VALIDAÇÃO PARA SABER SE O USUARIO CERTO TA LOGADO =========
useres[0].role != "villager"? window.location.href = "../templates/index.html" : null

// console.log(lista_local)

const container = document.querySelector("#container")
const categoria = document.querySelector("#categoria")

// ======== FUNÇÃO DE CRIAR UM CARD =================
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


    const botao_adcionar = document.createElement("button")
    botao_adcionar.textContent = "Adicionar"

    // ========= EVENTO NO BOTÃO ADD =========
    botao_adcionar.addEventListener("click", ()=>{

        if(contador > 0){
            lista_produtos.push(e)
            contador -= 1
            e.quantidade = contador
            card_quantidade.textContent= `QTD: ${contador}`

            let indice = lista_local.indexOf(e)

            lista_local.splice(indice, 1, e)
            localStorage.setItem("lista_local", JSON.stringify(lista_local))
            
            localStorage.setItem("lista_produtos", JSON.stringify(lista_produtos))

        }
        else{
            card_imagem.className = "img_off"
        }


  
    })

    // ======== CRIAR A FUNÇÃO PARA VIZIALIZAR MELHOR ========
    card.addEventListener("click", (todoCard)=>{
        if(todoCard.target !== botao_adcionar && todoCard.target !== card_quantidade){
            const validacao = [e.id]
            localStorage.setItem("validacao", JSON.stringify(validacao))
            window.open("../templates/detalhes.html", "_blank")
        }
 

    })

    card.append(card_imagem,card_nome,card_quantidade,botao_adcionar)

    
    return card
}

// =========== LISTAR TODOS OS PROUTOS DO BANCO DE DADOS ===========
lista_local.forEach((element)=>{
    container.appendChild(criarCard(element))
})

// ============= LISTAR POR CATEGORIA ==========
categoria.addEventListener("change",()=>{
    if(categoria.value === "todos"){
        location.reload()
    }
    else{
        // ===== REFAZER O CONTAINER =====
        container.innerHTML = ""
        lista_local.forEach((element)=>{
            if(categoria.value === element.tipo){
                container.appendChild(criarCard(element))
            }
    
        })
    }


})
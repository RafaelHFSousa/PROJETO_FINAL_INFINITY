const lista_local = JSON.parse(localStorage.getItem("lista_local")) || []
const useres = JSON.parse(localStorage.getItem("useres")) || []


useres[0].role !== "admin"? window.location.href = "../templates/index.html" : null


const container = document.querySelector("#container")
const categoria = document.querySelector("#categoria")

// ============ FUNÇÃO DE CRIAR O CARD ============
function criarCard(e){
    let contador = e.quantidade

    const card = document.createElement("div")
    card.className = "novo_card"

    const card_imagem = document.createElement("img")
    card_imagem.src = e.url
    card_imagem.alt = `Imagem do ${e.nome}`


    // ========== validacao da cor da borda ===========
    e.quantidade >=1? card_imagem.className = "img_on": card_imagem.className = "img_off"


    const card_nome = document.createElement("h2")
    card_nome.textContent = e.nome

    const card_descricao = document.createElement("p")
    card_descricao.textContent = e.descricao

    const card_quantidade = document.createElement("p")
    card_quantidade.textContent = e.quantidade
    const card_quantidade_p = document.createElement("p")
    card_quantidade_p.textContent = "QTD:"


    const botao_mais = document.createElement("button")
    const botao_menos = document.createElement("button")
    botao_mais.textContent = "+"
    botao_menos.textContent = "-"

    const div_quantidade = document.createElement("div")
    div_quantidade.className = "div_quantidade"
    div_quantidade.append(card_quantidade_p,botao_mais,card_quantidade,botao_menos)

    const botao_excluir = document.createElement("button")
    botao_excluir.textContent = "Excluir"

    // ========= EVENTO NOS BOTOES =========
    // == 1 ===
    botao_mais.addEventListener(("click"), ()=>{
        console.log(contador)
        card_imagem.className = "img_on"
        contador += 1
        card_quantidade.textContent =  contador

        lista_local.forEach((ele)=>{
            if(ele.id == e.id){
                e.quantidade = contador
            }
        })

        localStorage.setItem("lista_local", JSON.stringify(lista_local))

    })
    // === 2 ===
    botao_menos.addEventListener("click", ()=>{
        console.log(contador)
        if(contador > 0){
            contador -= 1
            card_quantidade.textContent = contador
            if(contador === 0){
                card_imagem.className = "img_off"  
            }
        }

        lista_local.forEach((ele)=>{
            if(ele.id == e.id){
                e.quantidade = contador
            }
        })

        localStorage.setItem("lista_local", JSON.stringify(lista_local))

    })
    // === 3 ====
    botao_excluir.addEventListener("click", ()=>{
        container.removeChild(card)

        lista_local.forEach((ide_vez,index) =>{
            if(ide_vez.id === e.id){
                console.log("caiu no if")
                lista_local.splice(index,1)
                localStorage.setItem("lista_local", JSON.stringify(lista_local))
            }
        })        
    })

    // ======== CRIAR A FUNÇÃO PARA VIZIALIZAR MELHOR ========
    card.addEventListener("click", (todoCard)=>{
        if(todoCard.target !== botao_mais && todoCard.target !== botao_menos && todoCard.target !== botao_excluir && todoCard.target !== card_quantidade && todoCard.target !== card_quantidade_p){
            const validacao = [e.id]
            localStorage.setItem("validacao", JSON.stringify(validacao))
            window.open("../templates/detalhes.html", "_blank")
        }
 

    })

    card.append(card_imagem,card_nome,div_quantidade,botao_excluir)


    
    return card
}


// ========== CRIAR O container ===========

lista_local.forEach((element) =>{
    
    container.appendChild(criarCard(element))


})


// ======== EVENTO NA CATEGORIA ===========

categoria.addEventListener("change",()=>{
    if(categoria.value === "todos"){
        location.reload()
    }

    else{
        // ==== RENICIAR O HTML =========
        container.innerHTML = ""

        lista_local.forEach((element) =>{
            if(element.tipo === categoria.value){
                container.appendChild(criarCard(element))
            }
        })
    }

    
})
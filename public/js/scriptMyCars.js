//Destacando a nav-link conta
const activeNav = document.querySelectorAll(".nav-link")[2]
activeNav.style.filter = " brightness(100%)"

//Estilizando o botao ativo
const btnActive = document.querySelectorAll('.btnInfo')[2]
const textBtnActive = document.querySelectorAll('.personalInfo a')[2]
btnActive.style.borderLeft = '3px solid black'
btnActive.style.filter = "brightness(100%)"

textBtnActive.style.color = 'black'


//Deixando o responsivo o menu
const collapseMenu = document.getElementById("collapseinfo")

let contador = 0
let quantidadeMudança = 0
setInterval(() => {
    if(innerWidth <= 1318 && quantidadeMudança == 0 ){
        document.querySelectorAll('.divInfo p').forEach((text) => {
            if(text.textContent == "Automatico"){
                text.textContent = "Auto"
                quantidadeMudança++
            }
        })
    }else if(innerWidth > 1318 && quantidadeMudança == 1){
        document.querySelectorAll('.divInfo p').forEach((text) => {
            if(text.textContent == "Auto"){
                text.textContent = "Automatico"
                quantidadeMudança = 0
            }
        })
    }

    if(innerWidth <= 767 && contador == 0){
        collapseMenu.setAttribute("class", "collapse personalInfo")
        contador++
    }
    else if(innerWidth >= 768 && contador == 1){
        collapseMenu.setAttribute("class", "collapse show personalInfo")
        contador = 0
    }
},100)
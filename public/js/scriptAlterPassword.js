//Destacando a nav-link conta
const activeNav = document.querySelectorAll(".nav-link")[2]
activeNav.style.filter = " brightness(100%)"

//Estilizando o botao ativo
const btnActive = document.querySelectorAll('.btnInfo')[1]
const textBtnActive = document.querySelectorAll('.personalInfo a')[1]
btnActive.style.borderLeft = '3px solid black'
btnActive.style.filter = "brightness(100%)"

textBtnActive.style.color = 'black'


//Deixando o responsivo o menu
const collapseMenu = document.getElementById("collapseinfo")

let contador = 0

setInterval(() => {
    if(innerWidth <= 767 && contador == 0){
        collapseMenu.setAttribute("class", "collapse personalInfo")
        contador++
    }
    else if(innerWidth >= 768 && contador == 1){
        collapseMenu.setAttribute("class", "collapse show personalInfo")
        contador = 0
    }
},100)


//Mudando type do input
const iconPassword = document.querySelectorAll('.input-group-text').forEach((show, index) => {
    let ativo = false
    show.children[0].onclick = e => {
        const input = document.querySelectorAll('input')[index]
        if(ativo){
            input.type = 'password'
            ativo = false
            show.children[0].src = "images/eye-slash-fill.svg"
        }else{
            input.type = 'text'
            show.children[0].src = "images/eye-fill.svg"
            ativo = true
        }
    }
}) 
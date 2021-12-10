//Destacando a nav-link conta
const activeNav = document.querySelectorAll(".nav-link")[2]
activeNav.style.filter = " brightness(100%)"

//Estilizando o botao ativo
const btnActive = document.querySelectorAll('.btnInfo')[0]
const textBtnActive = document.querySelectorAll('.personalInfo a')[0]
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

//Botando valor no input e o evento onchange
const inputNome = document.querySelectorAll('.divInput')[0]
const spanNome = inputNome.parentElement.parentElement.parentElement.childNodes[3]

inputNome.value = spanNome.textContent
inputNome.addEventListener("change", () => {
    if(inputNome.value == ''){
        spanNome.textContent = "Sem nome"
    }else{
        spanNome.textContent = inputNome.value
    }
})

const inputEmail = document.querySelectorAll('.divInput')[1]
const spanEmail = inputEmail.parentElement.parentElement.parentElement.childNodes[3]

inputEmail.value = spanEmail.textContent

inputEmail.addEventListener("change", () => {
    if(inputEmail.value == ''){
        spanEmail.textContent = "Sem Email"
    }else{
        spanEmail.textContent = inputEmail.value
    }
})

const inputTelefone = document.querySelectorAll('.divInput')[2]
const spanTelefone = inputTelefone.parentElement.parentElement.parentElement.childNodes[3]

inputTelefone.value = spanTelefone.textContent

inputTelefone.addEventListener("change", () => {
    if(inputTelefone.value == ""){
        spanTelefone.textContent = "Sem telefone"
    }else{
        spanTelefone.textContent = inputTelefone.value
    }
})

const inputEndereco = document.querySelectorAll('.divInput')[3]
const spanEndereco = inputEndereco.parentElement.parentElement.parentElement.childNodes[3]

inputEndereco.value = spanEndereco.textContent

inputEndereco.addEventListener("change", () => {
    if(inputEndereco.value == ""){
        spanEndereco.textContent = "Sem Endereço"
    }else{
        spanEndereco.textContent = inputEndereco.value
    }
})
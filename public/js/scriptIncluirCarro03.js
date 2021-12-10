//Alterando a class e imagem ao clicar no botao
const btnSelect = document.querySelectorAll(".btnSelect").forEach((btn) => {
    let ativo = false
    btn.onclick = () => {
        if(ativo){
            btn.setAttribute("class", "btnSelect")
            btn.nextElementSibling.childNodes[1].src = "images/plus.svg"
            ativo = false
        }else{
            btn.setAttribute("class", "btnSelect active")
            btn.nextElementSibling.childNodes[1].src = "images/check2.svg"
            ativo = true
            
            console.log(btn.textContent)
        }
    }
})
//Destacando a nav Catalogo
const activeNav = document.querySelectorAll(".nav-link")[1];
activeNav.style.filter = " brightness(100%)";

const checkBox = document.querySelectorAll(".check").forEach( check => {
    let ativo = false
    check.onclick = () =>{
        const divs = document.querySelectorAll('div')
        divs.forEach((div, index) => {
            if(div == check.parentElement){
                const input1 = divs[index + 1].children[0].children[0]
                const input2 = divs[index + 1].children[1].children[0]
                if(ativo){
                    input1.setAttribute('disabled','disabled')
                    input2.setAttribute('disabled','disabled')
                    check.setAttribute('value', 0)
                    ativo = false
                }else{
                    check.setAttribute('value', 1)
                    input1.removeAttribute('disabled')
                    input2.removeAttribute('disabled')
                    ativo = true
                }
            }
        })
    }
})

document.addEventListener('DOMContentLoaded', function() {

    let montadora = document.getElementById('selectmontadora')
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            for (let i=0; i < myObj.montadora.length; i++) {
                let option = document.createElement('option')
                option.setAttribute('value', myObj.montadora[i].toUpperCase())
                option.innerHTML = myObj.montadora[i].toUpperCase()
                montadora.appendChild(option)
            }
        }
    }
    xmlhttp.open("GET","/json/montadoras/montadoras.json", true);
    xmlhttp.send();
})
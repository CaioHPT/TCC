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

document.querySelector("#selectmontadora").onchange = function () {

    let anomodelo = document.getElementById('selectanomodelo')
    let anofabricacao = document.getElementById('selectanofabricacao')
    let defaultAnoModelo = document.createElement('option')
    let defaultAnoFab = document.createElement('option')

    defaultAnoModelo.innerHTML = '-- Selecione o ano do modelo'
    defaultAnoFab.innerHTML = '-- Selecione o ano de fabricação'

    anomodelo.options.length = 0
    anofabricacao.options.length = 0

    anomodelo.appendChild(defaultAnoModelo)
    anofabricacao.appendChild(defaultAnoFab)

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj)
            for (let i=0; i < myObj.ano.length; i++) {
                let option = document.createElement('option')
                option.setAttribute('value', myObj.ano[i])
                option.innerHTML = myObj.ano[i]
                anofabricacao.appendChild(option)
            }
            for (let i=0; i < myObj.ano.length; i++) {
                let option = document.createElement('option')
                option.setAttribute('value', myObj.ano[i])
                option.innerHTML = myObj.ano[i]
                anomodelo.appendChild(option)
            }
        }
    }
    xmlhttp.open("GET","/json/anos/anos.json", true)
    xmlhttp.send();
}

document.querySelector("#selectanomodelo").onchange = function () {

    let cor = document.querySelector("#selectcor")
    let defaultCor = document.createElement('option')

    defaultCor.innerHTML = '-- Selecione uma cor'
    cor.options.length = 0
    cor.appendChild(defaultCor)

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj)
            for (let i=0; i < myObj.cor.length; i++) {
                let option = document.createElement('option')
                option.setAttribute('value', myObj.cor[i].toUpperCase())
                option.innerHTML = myObj.cor[i].toUpperCase()
                cor.appendChild(option)
            }
        }
    }
    xmlhttp.open("GET","/json/cores/cores.json", true)
    xmlhttp.send();
}

document.querySelector("#checkblindado").onclick = function() {
    let blindado = document.querySelector('#checkblindado')
    if (blindado.checked) { 
        blindado.value = '1'
    } else if (!blindado.checked) {
        blindado.value = '0'
    }
}

$(document).ready(function(){

    $('#placa').mask('AAA-AAAA', {
        translation : {
            'A' : {
                pattern : /[A-Z0-9]/
            }
        }
    }    
)}
);
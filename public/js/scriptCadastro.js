const activeNav = document.querySelectorAll(".nav-link")[3];
activeNav.style.filter = " brightness(100%)";

$('#inputGroupFile01').on('change', function (){
    var fileName = $(this).val();
    fileName = fileName.substring('12')
    $(this).next('.custom-file-label').html(fileName)
})


$('#inputGroupFile02').on('change', function (){
    var fileName = $(this).val();
    fileName = fileName.substring('12')

    if ($('#inputGroupFile02').val() == $('#inputGroupFile01').val()) {

        $("#exampleModal").modal("show");

        $(document).ready(function(){
            $('#inputGroupFile02').val('');
            $('#inputGroupFile02').next('.custom-file-label').html('');
        });

    } else {
        $('#inputGroupFile02').next('.custom-file-label').html(fileName)
    }
})

$(".closeModal").on("click", function(){
    $("#exampleModal").modal("hide")
  })

function loadUf() {

    let uf = document.getElementById('selectuf')

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            for (let i=0; i < myObj.estados.length; i++) {
                let option = document.createElement('option')
                option.setAttribute('value', myObj.estados[i].sigla)
                option.innerHTML = myObj.estados[i].sigla
                uf.appendChild(option)
            }
        }
    }
    xmlhttp.open("GET", "/json/estadosandcidades/estadosAndCidades.json", true);
    xmlhttp.send();
}


function changeUf() {

    let uf = document.getElementById('selectuf')
    let cidades = document.getElementById('selectcidade')
    
    cidades.options.length = 0

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for (let i = 0; i < myObj.estados[uf.options.selectedIndex-1].cidades.length; i++) {
                let option = document.createElement('option')
                option.setAttribute('value', myObj.estados[uf.options.selectedIndex-1].cidades[i].toUpperCase())
                option.innerHTML = myObj.estados[uf.options.selectedIndex-1].cidades[i].toUpperCase()
                cidades.appendChild(option)
            }
        }
    }

    xmlhttp.open("GET", "/json/estadosandcidades/estadosAndCidades.json", true);
    xmlhttp.send();
}

$(document).ready(function(){
    $('#rg').mask('00.000.000-X', {
        translation : {
            'X' : {pattern : /[X0-9]/}
        },
        reverse : true
    });

    $('#telefone').mask('(00) 0000-00000')

    $('input[name="tipo"]').on('change', function (){

        if (this.value == 'fisico' && this.checked) {
            $('#cnpj_cpf').mask('000.000.000-00')
            console.log('fisico')
        } else  if (this.value == 'juridico' && this.checked) {
            $('#cnpj_cpf').mask('00.000.000/0000-00')
            console.log('juridico')
        }
    })
});

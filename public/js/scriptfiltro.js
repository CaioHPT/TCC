const filtro = document.getElementById('Filtro')
const main = document.getElementById('main')

let contador = 0

setInterval(() => {
    if (innerWidth <= 910 && contador == 0) {
        contador++
        filtro.setAttribute('class', 'col-md-12 col-sm-12 collapse')
        main.setAttribute('class', 'col-sm-12 col-md-12 mt-2')
        

    } else if (innerWidth >= 910 && contador == 1) {
        contador = 0
        main.setAttribute('class', 'col-sm-12 col-md-9 mt-2')
        filtro.setAttribute('class', 'col-md-3 col-sm-12 collapse show')
    }
}, 100)

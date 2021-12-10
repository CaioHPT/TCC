$(document).ready(function(){

    $('#quilometragem').mask('000.000', {
        reverse : true
    })
    $('#preco').mask('000.000,00', {
        reverse : true
    })

});

$('#inputGroupFile01').on('change', function (){
    var fileName = $(this).val();
    fileName = fileName.substring('12')
    $(this).next('.custom-file-label').html(fileName)
})


$('#inputGroupFile02').on('change', function (){
    var fileName = $(this).val();
    fileName = fileName.substring('12')
    $(this).next('.custom-file-label').html(fileName)
})

$('#inputGroupFile03').on('change', function (){
    var fileName = $(this).val();
    fileName = fileName.substring('12')
    $(this).next('.custom-file-label').html(fileName)
})
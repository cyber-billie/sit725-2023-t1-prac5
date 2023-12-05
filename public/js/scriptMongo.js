const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card"><div class="card-image"> <img src="'
            + item.path +'"></div>' + '<div class="card-content"> <span class="card-title "> <strong>'+ item.title + '</strong> </span> <p>' + item.description + '</p> </div>' +
            '<div class="card-action"> <a href="#"> Buy Now!</a> </div> </div> </div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postProducts(formData);
}

function postProducts(prod){
    $.ajax({
        url:'/api/product',
        type:'POST',
        data:prod,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('Product post successful');
            }
        }
    });
}

function getAllProducts(){
    $.get('/api/products', (response)=>{
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllProducts();
});
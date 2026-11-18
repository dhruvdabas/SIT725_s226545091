const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.email = $('#email').val();
    formData.favourite_plant = $('#favourite_plant').val();

    console.log("Form Data Submitted: ", formData);
    M.toast({ html: 'Thanks for joining the Plant Club, ' + (formData.first_name || 'friend') + '!' });
    $('#modal1').modal('close');
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s12 m4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '" alt="' + item.title + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

// Call the GET REST endpoint and build the cards from the response
const getPlants = () => {
    $.get('/api/plants', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    })
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    getPlants();
    $('.modal').modal();
});

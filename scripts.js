


//fetch data from the Random User Generator

fetch('https://randomuser.me/api/')
    .then(response => response.json() )
    .then(data => {
        generateImage(data.results[0].picture.large)
        generateUserName(data.results[0].name)
        generateUserEmail(data.results[0].email)
        generateUserLocation(data.results[0].location)
    })


    
//function for generating the random users photo and adding it to html
function generateImage(data){

    const galleryHTML = `
    <img class="card-img" src="${data}" alt="profile picture">
    `;

    $('.card-img-container').append(galleryHTML);
}

//function for generating the random users name 
function generateUserName(name){

    const userNameHTML = `
    <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
    `;

    $('.card-info-container').append(userNameHTML);
}

//function for generating the random users email 
function generateUserEmail(email){

    const userEmailHTML = `
    <p class="card-text">${email}</p>
    `;

    $('.card-info-container').append(userEmailHTML);
}

//function for generating the random users loctaion 
function generateUserLocation(location){

    const userLocationHTML = `
    <p class="card-text cap">${location.city}, ${location.state}</p>
    `;

    $('.card-info-container').append(userLocationHTML);
}




//dynamically add search bar html template literal and append to the search 
//container div using example text given in html file.
$('.search-container').append(`
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`);



//dynamically add gallery html template literal and append to the gallery 
//div using example text given in html file.
$('.gallery').append(`
<div class="card">
<div class="card-img-container"></div>
<div class="card-info-container"></div>
</div>
`);


//dynamically add modal window html template literal and append to the body
//div using example text given in html file.
$('.body').append(`
<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>
`);



//fetch data from the Random User Generator

fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json() )
    .then(data => {
            generateUserCard(data)
            modalWindow(data)
            });



//dynamically add gallery html template literal and append to the gallery 
//div using example text given in html file combined with json data
function generateUserCard(data){

    for( let i = 0; i < data.results.length; i++){

        let userCardDiv = `
        <div class="card">
            <div class="card-img-container">
            <img class="card-img" src="${data.results[i].picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
            <p class="card-text">${data.results[i].email}</p>
            <p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
            </div>
        </div>
    `;
      $('.gallery').append(userCardDiv);
    }
}

//found this neat idea for a Date function on Stack Overflow
//was able to try to apply the concept to the 'dob' object
function generateDOB(date){

    let dob = new Date(date);
    let month = '' + (dob.getMonth()+1);
    let day = '' + (dob.getDate());
    let year = dob.getFullYear();

    if (month.length < 2){
            month = '0' + month;
    }

    if (day.length < 2){
        day = '0' + day;
}

    return[month, day, year].join('/');
}

//dynamically add search bar html template literal and append to the search 
//container div using example text given in html file.
$('.search-container').append(`
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`);




//dynamically add modal window html template literal and append to the body
//div using example text given in html file.
function modalWindow(data){


    //listen for click anywhere on a users card element
    $('.card').click(function (e){
        //create variable to track the element currently clicked on
        //snagging the name of the element
        const clickedUserName = e.currentTarget.childNodes[3].childNodes[1].textContent.toLowerCase();

        for( let i = 0; i < data.results.length; i++) {   
        
        let displayUserName = `${data.results[i].name.first} ${data.results[i].name.last}`.toLowerCase();
            if ( clickedUserName === displayUserName){

                $('body').append(`
                <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data.results[i].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                        <p class="modal-text">${data.results[i].email}</p>
                        <p class="modal-text cap">${data.results[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${data.results[i].cell}</p>
                        <p class="modal-text">${data.results[i].location.street.number} ${data.results[i].location.street.name}, 
                                            ${data.results[i].location.city},
                                            ${data.results[i].location.state}
                                            ${data.results[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${generateDOB(data.results[i].dob.date)}</p>
                    </div>
                </div>
                `);
            }
        }

        $('body').click( function (e) {
            if(e.target.parentNode === document.querySelector('body')){
            $('.modal-container').hide();
            }
        })

        $('.modal-close-btn').click( function () {
            $('.modal-container').hide();
            console.log('modal close button clicked');
        })
    });


}

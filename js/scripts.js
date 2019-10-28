/****
 * Treehouse Techdegree Project
 * Project 5 Public API Requests
 ****/


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

    //step each piece of data
    for( let i = 0; i < data.results.length; i++){

        //create a separate card div for each user with a template literal
        //to add data variable in more dynamically
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
      //after card is created, append it the the gallery div  
      $('.gallery').append(userCardDiv);
    }
}


//found this neat idea for a date conversion function on Stack Overflow
//was able to apply the concept to the 'dob' object using Date object methods
function generateDOB(date){

    let dob = new Date(date);
    let month = '' + (dob.getMonth()+1);
    let day = '' + (dob.getDate());
    let year = dob.getFullYear();

    //convert a single digit # to have a 0 in front for month
    if (month.length < 2){
            month = '0' + month;
    }

    //convert a single digit # to have a 0 in front for day
    if (day.length < 2){
        day = '0' + day;
    }

    //return the joined string, formatted as MM/DD/YYYY
    return[month, day, year].join('/');
}


//dynamically add modal window html template literal and append to the body
//div using example text given in html file.
function modalWindow(data){


    //listen for click anywhere on a users card element
    $('.card').click(function (e){

        //create variable to track the element currently clicked on
        //specifically selecting the name of the user
        const clickedUserName = e.currentTarget.childNodes[3].childNodes[1].textContent.toLowerCase();
        
        //create a loop to step through the users cards
        for( let i = 0; i < data.results.length; i++) {   
        
            //set variable for users name
            let displayUserName = `${data.results[i].name.first} ${data.results[i].name.last}`.toLowerCase();
            
            //compare the name of the clicked element to the users list
            //if they match, display that user
            if ( clickedUserName === displayUserName){

                //create a modal window div with a template literal and
                //append modal window overlay to the body of the page 
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
                            <p class="modal-text">${data.results[i].location.street.number} 
                                                  ${data.results[i].location.street.name}, 
                                                  ${data.results[i].location.city},
                                                  ${data.results[i].location.state}
                                                  ${data.results[i].location.postcode}</p>
                            <p class="modal-text">Birthday: ${generateDOB(data.results[i].dob.date)}</p>
                        </div>
                    </div>
                `);
            }
        }

        //listener for clicks outside of the modal window, if anywhere outside the window
        //is clicked the modal window will close
        $('body').click( function (e) {
            if(e.target.parentNode === document.querySelector('body')){
            $('.modal-container').slideUp(200);
            }
        })

        //listener for the "close button" on the modal window, if the 'X' is clicked the 
        //modal window will close
        $('.modal-close-btn').click( function () {
            $('.modal-container').slideUp(200);
            console.log('modal close button clicked');
        })
    });


}

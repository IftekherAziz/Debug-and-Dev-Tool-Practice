// Search button not working properly
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    // // phonesContainer.textContent = '';
    // display 10 phones only 
    const showAll = document.getElementById('show-all');
    phones = phones.slice(0, 10);
    /*   if (dataLimit && phones.length > 10) {
          showAll.classList.remove('d-none');
      }
      else {
          showAll.classList.add('d-none');
      }  */

    // Fixed code for show all data:
    if (dataLimit && phones.length < 10) {
        showAll.classList.add('d-none');
        
    }
    else {
        
        showAll.classList.remove('d-none');
    }


    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner or loader
    toggleSpinner(false);
}

// Search button not working properly
/* const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
} */

// Search button working properly & Search is  clearing previous results: 
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear previous search result
    document.getElementById('phones-container').textContent = '';
    loadPhones(searchText, dataLimit);
}


// Search button working properly: updated
/* const processSearch = dataLimit => {
    const searchText = document.getElementById('search-field').value;
    // clear previous search result
    document.getElementById('phones-container').textContent = '';
    // start spinner or loader
    toggleSpinner(true);
    if (searchText === '') {
        loadPhones('apple', dataLimit);
    }
    else {
        loadPhones(searchText, dataLimit);
    }
} */

// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
})

// search input field enter key handler:
// After typing something on the search textbox, it should be able to press enter to get search result:
/* document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'enter') {
        processSearch(10);
    }
}); */

// Fixed code for search input field enter key handler:
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(10);
    }
})

// Spinner is always running. should be displayed at the time of data loading:
/* const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (!isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
} */

// Fixed code for spinner loading:
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// Previous code for show all btn:
/* document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})  */

// when click on show all button show all data from api call:
document.getElementById('btn-show-all').addEventListener('click', function () {
    displayPhones();

})


const loadPhoneDetails = async id => {
    const url = `https://www.openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayPhoneDetails(data.data);
}


const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate}</p>
        <p>Storage: ${phone.mainFeatures}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}

loadPhones('apple');
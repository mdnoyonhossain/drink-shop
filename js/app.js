const loadDrink = (search) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDrink(data.drinks))
}

const displayDrink = (drinks) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    // Display No Drink Found ! 
    const notDrinkFound = document.getElementById('drink-notfound');
    if(drinks === null){
        notDrinkFound.classList.remove('d-none');
    }
    else{
        notDrinkFound.classList.add('d-none');
    }

    drinks.forEach(drink => {
        // console.log(drink);
        const { strDrinkThumb, strIngredient3, idDrink } = drink;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-3');
        cardDiv.innerHTML = `
        <div onclick="drinkDetails('${idDrink}')" class="card" data-bs-toggle="modal" data-bs-target="#drinkModal">
            <img src="${strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-title text-center details-content">${strIngredient3 ? strIngredient3 : "Not Name"}</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
    // Spinner End 
    toggleSpinnerLoading(false);
}


// search 
const searchProcessing = () => {
    const searchText = document.getElementById('search-text');
    const searchValue = searchText.value;
    loadDrink(searchValue);
    // Spinner 
    toggleSpinnerLoading(true);
}

document.getElementById('search-btn').addEventListener('click', function () {
    searchProcessing();
});

document.getElementById('search-text').addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        searchProcessing();
    }
});

// Spinner 
const toggleSpinnerLoading = isLoading => {
    const spinnerLoader = document.getElementById('spinner-loader');
    if (isLoading) {
        spinnerLoader.classList.remove('d-none')
    }
    else {
        spinnerLoader.classList.add('d-none');
    }
}


const drinkDetails = id => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDrinkDetaile(data.drinks[0]));
}

const displayDrinkDetaile = detailInfo => {
    // console.log(detailInfo);
    const { strCategory, strIngredient3, strInstructions, strInstructionsDE, strTags, dateModified, strDrinkThumb } = detailInfo;
    const modaContainer = document.getElementById('modal-container');
    modaContainer.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="drinkModalLabel">${strIngredient3 ? strIngredient3 : "No Title Find"}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p><b>Relese Date: </b>${dateModified ? dateModified : 'No Release Date'}</p>
            <p><b>Category: </b>${strCategory ? strCategory : 'No Category'}</p>
            <p><b>Info: </b>${strInstructions ? strInstructions : 'No Info'}</p>
            <p><b>Details Info: </b>${strInstructionsDE ? strInstructionsDE : 'No Details Info'}</p>
            <p><b>Tag: </b>${strTags ? strTags : 'No Tag'}</p>
        </div>
        <div class="modal-footer">
            <img src="${strDrinkThumb}" class="card-img-top" alt="...">
        </div>
    </div>
    `;
}

loadDrink('orange');
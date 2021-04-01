//functie define url 
const getUrl = (imdbID) => {
    let movieListLink = document.createElement('a');
    movieListLink.href = 'https://www.imdb.com/title/' + imdbID;
    return movieListLink;
};


// Function to display the movies in the DOM. 
const titleMapper = (movie) => {
    let movieListItem = document.createElement('li');
    let movieListImg = document.createElement('img');
    let movieListLink = getUrl(movie.imdbID);
    movieListImg.src = movie.Poster;
    movieListLink.appendChild(movieListImg);
    movieListItem.appendChild(movieListLink);
    return movieListItem;
}


const addMoviesToDom = (movies) => {
    let movieList = document.getElementById('movie-list');
    movieList.querySelectorAll('*').forEach(element => element.remove());
    // console.log("Movie list:", movieList);
    let movieTitles = movies.map(titleMapper);
    movieTitles.forEach(element => {
        movieList.appendChild(element);
    });
}


// Function to filter on specific genre/word
const filterMovies = (wordInMovieTitle) => {
    let filtered = movies.filter(element => {
        return element.Title.toUpperCase().includes(wordInMovieTitle.toUpperCase());
    });
    return filtered;
};

//Function to filter the search form
const searchMovies = (event) => {
    event.preventDefault();
    let searchInput = document.querySelector('.search-input');
    let searchedMovies = filterMovies(searchInput.value);
    if (searchedMovies.length == 0) {
        return document.getElementById('movie-list').innerHTML = `<h2>Sorry we could not find any matching movies, please try again!<h2>`;
    } 
    addMoviesToDom(searchedMovies);
}

// function to filter latestMovies 
const filterLatestMovies = () => {
    let filtered = movies.filter(element => {
        return element.Year >= 2014; 
    });
    //console.log(filtered);
    return filtered;
}

// Adding the filter function to every individual radio button
const handleOnChangeEvent = event => { 
    let radioBtnValue = event.target.value;
    let filteredMovies = [];
    // console.log('Pressed on radio button:', event.target.value);
        switch (radioBtnValue) {
        case ('new'):
            filteredMovies = filterLatestMovies();
            break;
        case 'avengers':
            filteredMovies = filterMovies('Avengers');
            break;
        case ('x-men'):
            filteredMovies = filterMovies ('X-Men');
            break;
        case ('princess'):
            filteredMovies = filterMovies ('Princess');
            break;
        case ('batman'):
            let hoi = 'Batman'
            filteredMovies = filterMovies ('Batman');
            break;
        }
        addMoviesToDom(filteredMovies);
};


// Looping through al the filter buttons and adding an event
const addEventListeners = () => {
    let filterBtn = document.getElementsByName('radio-btn');
    filterBtn.forEach(button => {
        button.addEventListener('change', handleOnChangeEvent);
    });  
    const searchForm = document.querySelector('#form-container');
    searchForm.addEventListener('submit', searchMovies);
};

addEventListeners();
addMoviesToDom(movies);



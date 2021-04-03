//function to define url 
const getUrl = (imdbID) => {
    let movieListLink = document.createElement('a');
    movieListLink.href = 'https://www.imdb.com/title/' + imdbID;
    return movieListLink;
};


// Function to display the movies in the DOM. 
const titleMapper = (movie) => {
    let movieListItem = document.createElement('li');
    movieListItem.classList.add('images-center');
    let movieListImg = document.createElement('img');
    movieListImg.classList.add('images-styles');
    let movieListLink = getUrl(movie.imdbID);
    movieListImg.src = movie.Poster;
    movieListLink.appendChild(movieListImg);
    movieListItem.appendChild(movieListLink);
    return movieListItem;
};


const addMoviesToDom = (movies) => {
    let movieList = document.getElementById('movie-list');
    movieList.querySelectorAll('*').forEach(element => element.remove());
    let movieTitles = movies.map(titleMapper);
    movieTitles.forEach(element => {
        movieList.appendChild(element);
    });
};


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
    let searchedMovies = [];
    if (searchInput.value.toUpperCase() === 'new'.toUpperCase()) { 
        searchedMovies = filterLatestMovies();
    } else {
        searchedMovies = filterMovies(searchInput.value);
    }
    if (searchedMovies.length == 0) {
        let movieList = document.getElementById('movie-list');
        movieList.querySelectorAll('*').forEach(element => element.remove());
        let h2 = document.createElement('h2');
        h2.innerHTML = "Sorry we could not find any matching movies, please try again!";
        h2.setAttribute('class', 'h2');
        movieList.appendChild(h2);
        setHeaderText('');
    } 
    else {
        setHeaderText('Choose one of your favorite movies containing: ' + searchInput.value);
        addMoviesToDom(searchedMovies);
    }
};


// function to filter latestMovies 
const filterLatestMovies = () => {
    let filtered = movies.filter(element => {
        return element.Year >= 2014; 
    });
    return filtered;
};


// function to update text when filtering
const setHeaderText = (title) => {
    let titleElement = document.querySelector('.movie-title');
    titleElement.innerHTML = title;
};


// Adding the filter function to every individual radio button
const handleOnChangeEvent = event => { 
    let radioBtnValue = event.target.value;
    let filteredMovies = [];
        switch (radioBtnValue) {
        case ('new'):
            filteredMovies = filterLatestMovies();
            setHeaderText('Choose one of the newest movies!');
            break;
        case 'avengers':
            filteredMovies = filterMovies('Avengers');
            setHeaderText('Choose one of your favorite Avengers movie!');
            break;
        case ('x-men'):
            filteredMovies = filterMovies ('X-Men');
            setHeaderText('Choose one of your favorite X-men movie!');
            break;
        case ('princess'):
            filteredMovies = filterMovies ('Princess');
            setHeaderText('Choose one of your favorite Princess movie!');
            break;
        case ('batman'):
            filteredMovies = filterMovies ('Batman');
            setHeaderText('Choose one of your favorite Batman movie!');
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


// mobile website menu toggle 
const burgerSlide = () => {
    let burger = document.querySelector('.burger-btn');
    let navBarToggle = document.querySelector('.filter__links');
    let radioLinks = document.querySelectorAll('.radiobtn-container');
    burger.addEventListener('click', () => {
      navBarToggle.classList.toggle('radio-active');
    });
};


const app = () => {
    addEventListeners();
    burgerSlide();
    addMoviesToDom(movies);
};

app();
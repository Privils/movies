
const API_KEY = "api_key=a9184ee3895ce4942d20b5c55d53675e";
const BASE_URL ="https://api.themoviedb.org/3";
const API_URL = BASE_URL + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY
const image_url = 'https://image.tmdb.org/t/p/w500/'
const main = document.getElementById("main")
const form = document.getElementById('form')
const search = document.getElementById('search')
const search_url = BASE_URL + '/search/movie?' + API_KEY;

getMovie(API_URL)

function getMovie(url){
fetch(url).then(res => res.json())
.then(data => { 

    showMovies(data.results);
})

function showMovies(data){
   main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie
        const movieEl = document.createElement('div');

        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <img src="${image_url+poster_path}" alt="${title}"/>
        <div class="movie-info">
            <h2>${title}</h2>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h1>Overview</h1>
            ${overview}
        </div>`

        main.appendChild(movieEl)
    })
}
}
function getColor(vote){
    if(vote>=8){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    } else{
        return 'red'
    }
        
}
form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const searchTerm = search.value;

    if(searchTerm){
        getMovie(search_url+'&query='+searchTerm)
    } else{
        getMovie(API_URL)
    }
})

const container = document.getElementById("container");

window.addEventListener('DOMContentLoaded', getPopularMovies);

async function getPopularMovies() {
    let url = "https://api.themoviedb.org/3/movie/popular?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&page=1";

    let result = await fetch(url);
    let data = await result.json();

    setBackgroundImage(data.results);
}

async function setBackgroundImage(data) {
    let random = Math.floor(Math.random() * data.length);
    let randomMovie = data[random];
    console.log(randomMovie);
    container.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}")`;
}
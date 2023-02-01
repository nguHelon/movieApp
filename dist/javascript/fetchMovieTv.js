
async function fetchPopularMovies() {
    let url = "https://api.themoviedb.org/3/movie/popular?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&page=1";

    let result = await fetch(url);
    let data = await result.json();
    return data.results;
}

async function fetchTopRatedMovies() {
    let url = "https://api.themoviedb.org/3/movie/top_rated?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&page=1";

    let result = await fetch(url);
    let data = await result.json();
    return data.results;
}

async function fetchPopularTvShows() {
    let url = "https://api.themoviedb.org/3/tv/popular?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&page=1";

    let result = await fetch(url);
    let data = await result.json();
    return data.results;
}

async function fetchTopRatedTvShows() {
    let url = "https://api.themoviedb.org/3/tv/top_rated?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&page=1";

    let result = await fetch(url);
    let data = await result.json();
    return data.results;
}

export { fetchPopularMovies, fetchPopularTvShows, fetchTopRatedMovies, fetchTopRatedTvShows };
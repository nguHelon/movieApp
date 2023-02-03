
async function getMovieDetails(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US`;
    let response = await fetch(url);
    let result = await response.json();

    return result;
}

async function getTvshowDetails(tvshowId) {
    let url = `https://api.themoviedb.org/3/tv/${tvshowId}?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US`;
    let response = await fetch(url);
    let result = await response.json()

    return result;
}

export { getMovieDetails, getTvshowDetails };
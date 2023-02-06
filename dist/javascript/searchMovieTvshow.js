

async function searchMovies(searchTerm, searchResultDiv) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    let response = await fetch(url);
    let result = await response.json();

    let movies = result.results.map((movie) => {
        let contents = `
            <a href="movieInfor.html?movieId=${movie.id}">
                <div
                    class="w-full h-auto py-2 pl-1 bg-superDark flex justify-start space-x-2 border-b border-normalGray">
                    <div class="w-20 h-24">
                        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="w-full h-full">
                    </div>
                    <div class="">
                        <h2 class="text-superLightGray text-2xl leading-5">${movie.original_title}</h2>
                        <span class="text-textGray text-sm">${movie.release_date}</span>
                        <p class="italic text-textGray mb-2">${movie.original_language}</p>
                    </div>
                </div>
            </a>
        `;

        return contents;
    })

    searchResultDiv.classList.remove("hidden");
    searchResultDiv.innerHTML = movies.join(" ");
}

async function searchtvshow(searchTerm, searchResultDiv) {
    let url = `https://api.themoviedb.org/3/search/tv?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    let response = await fetch(url);
    let result = await response.json();

    let tvshows = result.results.map((tvshow) => {
        let contents = `
            <a href="tvshowInfor.html?tvshowId=${tvshow.id}">
                <div
                    class="w-full h-auto py-2 pl-1 bg-superDark flex justify-start space-x-2 border-b border-normalGray">
                    <div class="w-20 h-24">
                        <img src="https://image.tmdb.org/t/p/original${tvshow.poster_path}" class="w-full h-full">
                    </div>
                    <div class="">
                        <h2 class="text-superLightGray text-2xl leading-5">${tvshow.name}</h2>
                        <span class="text-textGray text-sm">${tvshow.first_air_date}</span>
                        <p class="italic text-textGray mb-2">${tvshow.original_language}</p>
                    </div>
                </div>
            </a>
        `;

        return contents;
    })

    searchResultDiv.classList.remove("hidden");
    searchResultDiv.innerHTML = tvshows.join(" ");
}

export { searchMovies, searchtvshow };
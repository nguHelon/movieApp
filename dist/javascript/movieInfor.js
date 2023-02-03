import { getMovieDetails } from "./fetchMovieTvDetails.js";

const movieInforDiv = document.getElementById("movieInforDiv");
const movieMoreInfo = document.getElementById("movieMoreInfo");
const recommendationsDiv = document.getElementById("recommendations");
const movieInforSection = document.getElementById("movieInforSection");
const casting = document.getElementById("casting");

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");

async function setMovieDetails(movieId) {
    let movieDetail = await getMovieDetails(movieId);

    let contents = `
        <div class="basis-1/4 h-full">
            <img src="https://image.tmdb.org/t/p/original${movieDetail.poster_path}" class="w-full h-full rounded-lg">
        </div>
        <div class="basis-3/4 py-10">
            <div class="w-full text-left mb-5">
                <h1 class="text-5xl text-superLightGray mb-2">${movieDetail.original_title} <span
                        class="text-normalGray">(${movieDetail.release_date.split("-")[0]})</span></h1>
                <div class="w-full flex justify-start items-center space-x-2 text-textGray">
                    <span class="px-1 border border-normalGray rounded">${await getiso_3166_1(movieId)}</span>
                    <span class="">${movieDetail.release_date.split("-")[0]}</span>
                    <span class="">(${movieDetail.production_countries[0].iso_3166_1})</span>
                    <span class="h-1 w-1 rounded-full bg-superLightGray"></span>
                    <p class="capitalize">${getGenres(movieDetail.genres)}</p>
                    <span class="h-1 w-1 rounded-full bg-superLightGray"></span>
                    <span>${movieDetail.runtime} mins</span>
                </div>
            </div>
            <div class="flex space-x-3 mb-5">
                <button class="px-4 text-lg text-superLightGray rounded-lg bg-superRed">Play
                    Trailer</button>
                <button
                    class="w-12 h-12 flex justify-center items-center rounded-full bg-superDark text-superLightGray"><i
                        class="fa-solid fa-heart"></i></button>
                <button
                    class="w-12 h-12 flex justify-center items-center rounded-full bg-superDark text-superLightGray"><i
                        class="fa-solid fa-bookmark"></i></button>
            </div>
            <div class="w-full text-textGray">
                <p class="mb-2 italic">${movieDetail.tagline}</p>
                <div class="w-full text-left mb-2">
                    <h1 class="text-superLightGray mb-2">Overview</h1>
                    <p class="text-textGray">
                        ${movieDetail.overview}
                    </p>
                </div>                
            </div>
        </div>
    `;

    movieInforSection.innerHTML = contents;
    movieInforDiv.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}")`
}


function getGenres(genres) {
    let newGenres = [];
    genres.forEach((genre) => {
        newGenres.push(genre.name);
    });

    return newGenres.join(",");
}

async function getiso_3166_1(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=fa1ef563179d6939e07ef1901aec8204&append_to_response=release_dates`;
    let response = await fetch(url);
    let result = await response.json();

    let data = result.release_dates.results.filter((result) => {
        if (result.iso_3166_1 == "US") {
            return result;
        }
    })

    return data[0].release_dates[0].certification;
}

async function getCasting(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US`;
    let response = await fetch(url);
    let result = await response.json();

    let casts = result.cast.map((cast) => {
        let contents = `
            <div class="flex-none w-36 rounded-md h-auto border border-textGray">
                <div class="w-full h-4/6">
                    <img src="https://image.tmdb.org/t/p/original${cast.profile_path}" class="w-full h-full rounded-t-md">
                </div>
                <div class="p-1">
                    <h2 class="text-black font-bold capitalize ">${cast.name}</h2>
                    <p class="text-textGray text-sm">${cast.character}</p>
                </div>
            </div>
        `;

        return contents;
    });

    casting.innerHTML = casts.join(" ");
}

async function moreDetails(movieId) {
    let movieDetail = await getMovieDetails(movieId);

    let contents = `
            <div class="flex space-x-4 mb-3">                
                <a href="${movieDetail.homepage}">
                    <i class="fa-solid fa-link text-2xl"></i>
                </a>
            </div>
            <div class="w-full">
                <div class="mb-3">
                    <h2 class="font-bold">Status</h2>
                    <p class="text-normalGray">${movieDetail.status}</p>
                </div>
                <div class="mb-3">
                    <h2 class="font-bold">Original Language</h2>
                    <p class="text-normalGray">${movieDetail.original_language}</p>
                </div>
                <div class="mb-3">
                    <h2 class="font-bold">Budget</h2>
                    <p class="text-normalGray">${movieDetail.budget ? "$" + movieDetail.budget : "-"}</p>
                </div>
                <div class="mb-3">
                    <h2 class="font-bold">Revenue</h2>
                    <p class="text-normalGray">${movieDetail.revenue ? "$" + movieDetail.revenue : "-"}</p>
                </div>
            </div>
            <div class="">
                <h1 class="font-bold text-2xl">Keywords</h1>
                <div class="">
                    ${await getKeywords(movieId)}
                </div>
            </div>
    `;

    movieMoreInfo.innerHTML = contents;
}

async function getKeywords(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=fa1ef563179d6939e07ef1901aec8204`;
    let response = await fetch(url);
    let result = await response.json();

    let keywords = result.keywords.map((keyword) => {
        return `
        <button class="outline-none px-4 py-1 m-1 bg-textGray text-black rounded-md">${keyword.name}</button>
        `
    })

    return keywords.join("");
}


async function getRecommendations(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&page=1`;
    let response = await fetch(url);
    let result = await response.json();

    let recommendations = result.results.map((result) => {
        return ` 
            <div class="flex-none w-80 h-60">
                <a href="movieInfor.html?movieId=${result.id}">
                    <div class="w-full h-4/5">
                        <img src="https://image.tmdb.org/t/p/original${result.backdrop_path}" class="w-full h-full rounded-md">
                    </div>
                </a>
                <div>
                    <h2 class="text-black text-lg">${result.original_title}</h2>
                    <p class="text-normalGray">${result.release_date.split("-")[0]}</p>
                </div>
            </div>
        `
    });

    recommendationsDiv.innerHTML = recommendations.join(" ");
}


setMovieDetails(movieId);
getCasting(movieId);
moreDetails(movieId);
getRecommendations(movieId);
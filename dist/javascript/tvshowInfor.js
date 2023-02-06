import { getTvshowDetails } from "./fetchMovieTvDetails.js";
import { searchtvshow } from "./searchMovieTvshow.js";

const searchResultDiv = document.getElementById("searchResult");
const searchInput = document.getElementById("searchInput");
const tvshowInforDiv = document.getElementById("tvshowInforDiv");
const currentSeason = document.getElementById("currentSeason");
const tvshowMoreInfo = document.getElementById("tvshowMoreInfo");
const recommendationsDiv = document.getElementById("recommendations");
const tvshowInforSection = document.getElementById("tvshowInforSection");
const casting = document.getElementById("casting");

const urlParams = new URLSearchParams(window.location.search);
const tvshowId = urlParams.get("tvshowId");

//event listeners
window.addEventListener('click', (event) => {
    if (event.target.className != "searchResult") {
        searchResultDiv.classList.add('hidden');
    }
})

searchInput.addEventListener("keyup", async () => {
    await searchtvshow(searchInput.value, searchResultDiv);
})

async function setMovieDetails(tvshowId) {
    let tvshowDetail = await getTvshowDetails(tvshowId);

    let contents = `
        <div class="basis-1/4 h-full">
            <img src="https://image.tmdb.org/t/p/original${tvshowDetail.poster_path}" class="w-full h-full rounded-lg">
        </div>
        <div class="basis-3/4 py-10">
            <div class="w-full text-left mb-5">
                <h1 class="text-5xl text-superLightGray mb-2">${tvshowDetail.name} <span
                        class="text-normalGray">(${tvshowDetail.first_air_date.split("-")[0]})</span></h1>
                <div class="w-full flex justify-start items-center space-x-2 text-textGray">
                    <span class="px-1 border border-normalGray rounded">${await getiso_3166_1(tvshowId)}</span>
                    <span class="">${tvshowDetail.first_air_date.split("-")[0]}</span>
                    <span class="">(${tvshowDetail.origin_country[0]})</span>                    
                    <p class="capitalize">${getGenres(tvshowDetail.genres)}</p>                    
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
                <p class="mb-2 italic">${tvshowDetail.tagline}</p>
                <div class="w-full text-left mb-2">
                    <h1 class="text-superLightGray mb-2">Overview</h1>
                    <p class="text-textGray">
                        ${tvshowDetail.overview}
                    </p>
                </div>                
            </div>
        </div>
    `;

    tvshowInforSection.innerHTML = contents;
    tvshowInforDiv.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${tvshowDetail.backdrop_path}")`;
}


function getGenres(genres) {
    let newGenres = [];
    genres.forEach((genre) => {
        newGenres.push(genre.name);
    });

    return newGenres.join(",");
}

async function getiso_3166_1(tvshowId) {
    let url = `https://api.themoviedb.org/3/tv/${tvshowId}/content_ratings?api_key=fa1ef563179d6939e07ef1901aec8204`;
    let response = await fetch(url);
    let result = await response.json();
    let data = result.results.filter((result) => {
        if (result.iso_3166_1 == "US") {
            return result;
        }
    })

    return data[0].rating;
}

async function getCasting(tvshowId) {
    let url = `https://api.themoviedb.org/3/tv/${tvshowId}/credits?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US`;
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

async function getCurrentSeason(tvshowId) {
    let url = `https://api.themoviedb.org/3/tv/${tvshowId}?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US`;
    let response = await fetch(url);
    let result = await response.json();

    let content = `
        <div class="w-1/6 h-full">
            <img src="https://image.tmdb.org/t/p/original${result.seasons[result.seasons.length - 1].poster_path}" class="h-full w-full rounded-l-lg">
        </div>
        <div class="w-10/12 pl-3">
            <h2 class="text-black text-2xl font-bold">${result.seasons[result.seasons.length - 1].name}</h2>
            <p class="text-black mb-2 font-bold"><span>${result.seasons[result.seasons.length - 1].air_date.split("-")[0]}</span> | <span>${result.seasons[result.seasons.length - 1].episode_count} episodes</span></p>
            <p>${result.seasons[result.seasons.length - 1].name} of ${result.name} premiered on ${result.seasons[result.seasons.length - 1].air_date.split("-")[0]}</p>
        </div>
    `;

    currentSeason.innerHTML = content;
}

async function moreDetails(tvshowId) {
    let tvshowDetail = await getTvshowDetails(tvshowId);

    let contents = `
            <div class="flex space-x-4 mb-3">                
                <a href="${tvshowDetail.homepage}">
                    <i class="fa-solid fa-link text-2xl"></i>
                </a>
            </div>
            <div class="w-full">
                <div class="mb-3">
                    <h2 class="font-bold">Status</h2>
                    <p class="text-normalGray">${tvshowDetail.status}</p>
                </div>
                <div class="mb-3">
                    <h2 class="font-bold">Network</h2>
                    <img src="https://image.tmdb.org/t/p/original${tvshowDetail.networks[0].logo_path}" class="w-16 h-12">
                </div>
                <div class="mb-3">
                    <h2 class="font-bold">Type</h2>
                    <p class="text-normalGray">${tvshowDetail.type}</p>
                </div>
                <div class="mb-3">
                    <h2 class="font-bold">Original Language</h2>
                    <p class="text-normalGray">${tvshowDetail.original_language}</p>
                </div>
            </div>
            <div class="">
                <h1 class="font-bold text-2xl">Keywords</h1>
                <div class="">
                    ${await getKeywords(tvshowId)}
                </div>
            </div>
    `;

    tvshowMoreInfo.innerHTML = contents;
}

async function getKeywords(tvshowId) {
    let url = `https://api.themoviedb.org/3/tv/${tvshowId}/keywords?api_key=fa1ef563179d6939e07ef1901aec8204`;
    let response = await fetch(url);
    let result = await response.json();

    let keywords = result.results.map((keyword) => {
        return `
        <button class="outline-none px-4 py-1 m-1 bg-textGray text-black rounded-md">${keyword.name}</button>
        `
    })

    return keywords.join("");
}


async function getRecommendations(tvshowId) {
    let url = `https://api.themoviedb.org/3/tv/${tvshowId}/recommendations?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US&page=1`;
    let response = await fetch(url);
    let result = await response.json();

    let recommendations = result.results.map((result) => {
        return ` 
            <div class="flex-none w-80 h-60">
                <a href="tvshowInfor.html?tvshowId=${result.id}">
                    <div class="w-full h-4/5">
                        <img src="https://image.tmdb.org/t/p/original${result.backdrop_path}" class="w-full h-full rounded-md">
                    </div>
                </a>
                <div>
                    <h2 class="text-black text-lg">${result.name}</h2>
                    <p class="text-normalGray">${result.first_air_date.split("-")[0]}</p>
                </div>
            </div>
        `
    });

    recommendationsDiv.innerHTML = recommendations.join(" ");
}


setMovieDetails(tvshowId);
getCasting(tvshowId);
moreDetails(tvshowId);
getRecommendations(tvshowId);
getCurrentSeason(tvshowId);
import { fetchPopularTvShows, fetchTopRatedTvShows } from "./fetchMovieTv.js";
import { searchtvshow } from "./searchMovieTvshow.js";
import { fetchTrailers } from "./trailers.js";

const searchResultDiv = document.getElementById("searchResult");
const searchInput = document.getElementById("searchInput");
const tvshowIntro = document.getElementById('tvshowIntro');
const topRated = document.getElementById('topRated');
const Popular = document.getElementById('Popular');
const iframe = document.querySelector(".iframe");
const closeTrailerBtn = document.getElementById("closeTrailerBtn");
const trailerDiv = document.getElementById("trailerDiv");

window.addEventListener("DOMContentLoaded", () => {
    getTopRated();
    getPopularTvshow();
})

//event listeners
window.addEventListener('click', (event) => {
    if (event.target.className != "searchResult") {
        searchResultDiv.classList.add('hidden');
    }
})

searchInput.addEventListener("keyup", async () => {
    await searchtvshow(searchInput.value, searchResultDiv);
})

async function getTopRated() {
    let topRatedTvshows = await fetchTopRatedTvShows();
    topRatedTvshows.forEach((tvshow) => {
        let div = document.createElement("div");
        div.classList.add("flex-none", "w-52", "h-80", "hover:scale-110", "ease-in-out", "duration-300");
        div.setAttribute("data-id", `${tvshow.id}`);

        let contents = `
            <div class="w-full h-4/5">
                <img src="https://image.tmdb.org/t/p/original${tvshow.poster_path}" class="w-full h-full rounded-3xl">
            </div>
            <div class="w-full h-auto py-3 flex justify-between items-center">
                <div>
                    <p class="text-superLightGray text-lg">${tvshow.name}</p>
                    <span class="text-lightGray">${tvshow.first_air_date}</span>
                </div>
                <button
                    class="py-1 px-3 bg-superRed rounded-lg text-superLightGray text-lg topRatedTvshowBtn">view</button>
            </div>
        `;

        div.innerHTML = contents;
        topRated.appendChild(div);

        let topRatedTvshowBtns = document.querySelectorAll("#topRated .topRatedTvshowBtn");
        topRatedTvshowBtns.forEach((movie) => {
            movie.addEventListener("click", async (e) => {
                let movieId = e.target.parentElement.parentElement.dataset.id;
                let url = `https://api.themoviedb.org/3/tv/${movieId}?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US`;

                let result = await fetch(url);
                let data = await result.json();

                setMovieIntroDiv(data);
            })
        })
    })
}

async function getPopularTvshow() {
    let popularTvshows = await fetchPopularTvShows();
    popularTvshows.forEach((tvshow) => {
        let div = document.createElement("div");
        div.classList.add("flex-none", "hover:scale-110", "ease-in-out", "duration-300", "w-52", "h-80", "border-4", "border-white", "cursor-pointer", "popularTvshow");
        div.setAttribute("data-id", `${tvshow.id}`);

        let contents = `
            <div class="w-full h-full">
                <img src="https://image.tmdb.org/t/p/original${tvshow.poster_path}" class="w-full h-full">
            </div>
        `;

        div.innerHTML = contents;
        Popular.appendChild(div);

        let popularTvshows = document.querySelectorAll("#Popular .popularTvshow");
        popularTvshows.forEach((movie) => {
            movie.addEventListener("click", async (e) => {
                let movieId = e.target.parentElement.parentElement.dataset.id;
                let url = `https://api.themoviedb.org/3/tv/${movieId}?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US`;

                let result = await fetch(url);
                let data = await result.json();

                setMovieIntroDiv(data);
            })
        })
    })

}

function setMovieIntroDiv(data) {
    let content = `
        <div class="w-full h-full pt-10 bg-gradient-to-r from-superDark via-superDark2 to-tranparent">
            <div class="w-1/3 text-left mt-10 ml-20" data-id="${data.id}">
                <h1 class="text-5xl text-normalRed mb-5 font-Poppins font-bold">${data.name}
                </h1>
                <p class="text-superLightGray text-lg mb-5 font-Poppins">
                ${data.overview}
                </p>
                <div class="flex space-x-3">
                    <button class="outline-none py-2 px-4 text-lg rounded-full bg-superRed text-superLightGray trailerBtn"><i
                            class="fa-solid fa-circle-play mr-3"></i> Watch
                        Trailer</button>
                    <a href="tvshowInfor.html?tvshowId=${data.id}">
                        <button
                        class="outline-none py-2 px-4 text-lg rounded-full bg-superDark text-superLightGray border border-superGray"><i
                            class="fa-solid fa-circle-info mr-3"></i> More
                        Information</button>
                    </a>
                </div>
            </div>
        </div>
    `;

    tvshowIntro.innerHTML = content;
    tvshowIntro.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${data.backdrop_path}")`;

    let trailerBtn = tvshowIntro.querySelector(".trailerBtn");
    trailerBtn.addEventListener("click", async () => {
        await fetchTrailers(data.id, "tv", iframe, closeTrailerBtn, trailerDiv);
    })
}
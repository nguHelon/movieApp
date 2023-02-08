
async function fetchTrailers(id, mediaType, iframe, closeTrailerBtn, trailerDiv) {
    trailerDiv.classList.remove("hidden");
    trailerDiv.classList.add("flex");
    let url = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=fa1ef563179d6939e07ef1901aec8204&language=en-US`;
    let response = await fetch(url);
    let result = await response.json();

    closeTrailerBtn.addEventListener("click", () => {
        trailerDiv.classList.add("hidden");
        iframe.src = "";
    })

    let trailer = filterTrailers(result);
    console.log(trailer);
    iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
}

function filterTrailers(result) {
    let filteredResult = result.results.filter((result) => {
        if (result.site == "YouTube" && result.type == "Trailer") {
            return result;
        }
    })

    return filteredResult[0];
}

export { fetchTrailers };
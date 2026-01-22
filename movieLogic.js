const form = document.querySelector("#form");
const searchBarMovie = document.querySelector("#search")
const mainBody = document.querySelector("#main")

const apiKey ="YOUR_API_KEY"



form.addEventListener("submit", async event => {
    const searchMovie = searchBarMovie.value;
    event.preventDefault();
    if (searchMovie) {
        try {
            const movieData = await getMovieData(searchMovie)
            displayMovieInfo(movieData);
        }
        catch (error) {
            displayErrorMessage(error.message)

        }


    }
    else {
        displayErrorMessage("Enter movie name")
    }
})

async function getMovieData(searchMovie) {
    const apiUrl = `https://www.omdbapi.com/?t=${searchMovie}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!response.ok) {
        throw new Error("Enter correct movie name");
    }
    else {

        return data;
    }


}


function displayMovieInfo(movieData) {
  
    const {
        Title: movieName,
        Poster: Image,
        imdbRating: rating,
        Genre: genre,
        Director: director,
        Released: releasedDate,
        Runtime: duration,
        Actors: actorsName,
        Plot: plot
    } = movieData;
    mainBody.textContent = '';
    mainBody.style.display = "flex";
    mainBody.style.flexDirection = "column";

    const tittleDisplay = document.createElement("h2");
    const posterDisplay = document.createElement("img")
    const imbdDisplay = document.createElement("p")
    const actorsDisplay = document.createElement("p");
    const releasedDateDisplay = document.createElement('p');
    const durationDisplay = document.createElement('p');
    const directorDisplay = document.createElement('p');
    const genreDisplay = document.createElement('p');
    const plotDisplay = document.createElement('p');


    tittleDisplay.textContent = movieName;
    posterDisplay.src = Image;
    imbdDisplay.textContent = `Imdb :${rating}`;
    directorDisplay.textContent = `Director: ${director}`
    genreDisplay.textContent = `Genre: ${genre}`
    plotDisplay.textContent = `Plot :${plot}`
    actorsDisplay.textContent = `Actors: ${actorsName}`;
    releasedDateDisplay.textContent = `Released on :${releasedDate}`
    durationDisplay.textContent = `Runtime :${duration}`

    tittleDisplay.classList.add("movieTitle")
    posterDisplay.classList.add("img")
    posterDisplay.style.width = "200px";
    imbdDisplay.classList.add("ratingdisplay")
    actorsDisplay.classList.add("movieInfo")
    releasedDateDisplay.classList.add("movieInfo")
    durationDisplay.classList.add("movieInfo")
    directorDisplay.classList.add("movieInfo")
    genreDisplay.classList.add("genreDisplay")
    plotDisplay.classList.add("plotDisplay")


    mainBody.appendChild(posterDisplay)
    mainBody.appendChild(tittleDisplay);
    mainBody.appendChild(imbdDisplay)
    mainBody.appendChild(genreDisplay)
    mainBody.append(directorDisplay)
    mainBody.append(actorsDisplay)
    mainBody.append(releasedDateDisplay)
    mainBody.appendChild(durationDisplay)
    mainBody.append(plotDisplay)


}


function displayErrorMessage(message) {

    mainBody.innerHTML = `<h2 style="color:red;">${message}</h2>`;
}


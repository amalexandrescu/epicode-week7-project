const url = "https://striveschool-api.herokuapp.com/api/movies";

optionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
  },
};

const gendreMoviesFetch = async (url, options) => {
  const response = await fetch(url, options);
  const gendres = await response.json();
  // console.log(gendres);
  return gendres;
};

function renderMovieList(arrayOfMovies) {
  const parentToAppend = document.querySelector(".container div.row div");
  let h2TagMovieGendre = document.createElement("h2");
  h2TagMovieGendre.classList.add("text-center");
  h2TagMovieGendre.innerText = `${arrayOfMovies[0].category} movies`;
  parentToAppend.appendChild(h2TagMovieGendre);
  let ulList = document.createElement("ul");
  ulList.classList.add("list-group");
  ulList.classList.add("mt-3");
  arrayOfMovies.forEach((movie) => {
    createLiForMovie(ulList, movie);
  });
  h2TagMovieGendre.appendChild(ulList);
  parentToAppend.appendChild(h2TagMovieGendre);
}

//creates an li element with the movie name and the Options button
function createLiForMovie(ul, movie) {
  const movieLi = document.createElement("li");
  movieLi.classList.add("list-group-item");
  movieLi.innerHTML = `<div class=" d-flex justify-content-between align-items-center">
                        <div class="hideTextOnSecondRow">${movie.name}</div>
                        <a class="btn btn-primary aTagButtonStyling" href="edit.html?movieCategory=${movie.category}&movieId=${movie._id}" role="button">More Options</a>
                      </div>`;
  ul.appendChild(movieLi);
}

const getMoviesByGendre = async () => {
  const gendresArray = await gendreMoviesFetch(url, optionsGet);
  // console.log(gendresArray);
  gendresArray.forEach(async (gendre) => {
    const currentUrl = url + `/${gendre}`;
    const respGendresArray = await gendreMoviesFetch(currentUrl, optionsGet);
    // console.log(respGendresArray);
    const moviesArray = respGendresArray;
    renderMovieList(moviesArray);
  });
};

window.onload = async () => {
  const result = getMoviesByGendre();
  // console.log(result);
};

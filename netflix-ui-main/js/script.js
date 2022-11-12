const url = "https://striveschool-api.herokuapp.com/api/movies";

optionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
  },
};
//returns an array with movie gendres
const getMovieGendres = async (url, options) => {
  const response = await fetch(url, options);
  const gendres = await response.json();
  // console.log(gendres);
  return gendres;
};

let currentCarousel = 0;

const getMoviesOfCertainGendre = async () => {
  const gendresArray = await getMovieGendres(url, optionsGet);
  gendresArray.forEach(async (gendre) => {
    let currentUrl = url + `/${gendre}`;
    const currentGendreMoviesArray = await getMovieGendres(
      currentUrl,
      optionsGet
    );
    console.log("movie array", currentGendreMoviesArray);

    createCarouselSection(gendre);
    let counterCurrentCarousel = 0;
    let numberOfMoviesOfCertainGendre = currentGendreMoviesArray.length;
    let numberOfFullCarouselsToCreate = 0;
    let partialCarouselsToCreate = 0;
    if (numberOfMoviesOfCertainGendre % 6 === 0) {
      numberOfFullCarouselsToCreate = Math.floor(
        numberOfMoviesOfCertainGendre / 6
      );
    } else {
      numberOfFullCarouselsToCreate = Math.floor(
        numberOfMoviesOfCertainGendre / 6
      );
      partialCarouselsToCreate = 1;
    }

    for (let i = 0; i < numberOfFullCarouselsToCreate; i++) {
      if (counterCurrentCarousel === 0) {
        createInnerCarousel(gendre);
        document.querySelector(".carousel-item").classList.add("active");
        for (let j = i * 6; j <= i * 6 + 5; j++) {
          createOneMovie(currentGendreMoviesArray[j], i);
        }
        counterCurrentCarousel++;
        // currentCarousel++;
      } else {
        createInnerCarousel(gendre);
        for (let j = i * 6; j <= i * 6 + 5; j++) {
          createOneMovie(
            currentGendreMoviesArray[j],
            numberOfFullCarouselsToCreate
          );
        }
        // counterCurrentCarousel++;
      }
    }

    if (partialCarouselsToCreate != 0) {
      createInnerCarousel(gendre);
      let startingIndexOfMovie =
        numberOfFullCarouselsToCreate * 6 -
        (6 - (numberOfMoviesOfCertainGendre % 6));
      for (
        let i = startingIndexOfMovie;
        i < numberOfMoviesOfCertainGendre;
        i++
      ) {
        createOneMovie(
          currentGendreMoviesArray[startingIndexOfMovie],
          numberOfFullCarouselsToCreate
        );
        startingIndexOfMovie++;
      }
      counterCurrentCarousel++;
    }
    createsButtonsForCarousel(gendre);
  });
};

window.onload = getMoviesOfCertainGendre();

//creates carousel section for one gendre of movies
//right now, the carousel is empty
function createCarouselSection(gendre) {
  const parentToAppend = document.querySelector(".genre-details");
  const galleryContainer = document.createElement("div");
  galleryContainer.setAttribute("id", `${gendre}-gallery`);
  galleryContainer.classList.add("movie-gallery");
  galleryContainer.classList.add("m-2");
  galleryContainer.innerHTML = `<h5 class="text-light mt-2 mb-2">${gendre}</h5>
                                <div id="${gendre}" class="carousel slide" data-bs-ride="carousel">
                                  <div class="carousel-inner"><div>
                                </div>`;
  parentToAppend.insertAdjacentElement("afterend", galleryContainer);
}

//creates the inner carousel but without the images
//it does not have the active class on the second div, the one with carousel-item class
//the active class should be just for the first carousel, not for the others
function createInnerCarousel(gendre) {
  const parentToAppend = document.querySelector(
    `#${gendre}-gallery div.carousel-inner`
  );
  parentToAppend.innerHTML += `<div class="carousel-item"><div class="movie-row"><div class="row"></div></div></div>`;
}

//puts movies in the carousel
//takes the row and puts movies
function createOneMovie(movie, index) {
  const parentContainerList = document.querySelectorAll(
    `#${movie.category} .carousel-inner .carousel-item`
  );

  const currentRow = parentContainerList[index].querySelector(".row");
  currentRow.innerHTML += `<div class="col-md-2" style=" height:150px" >
                                  <img class="movie-cover movie-image" src=${movie.imageUrl} />
                                </div>`;
}

//creates buttons for carousel
function createsButtonsForCarousel(gendre) {
  const parentToAppend = document.querySelector(
    `#${gendre} div.carousel-inner`
  );
  parentToAppend.innerHTML += `<button class="carousel-control-prev" type="button" data-bs-target="#${gendre}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                              </button>
                              <button class="carousel-control-next" type="button" data-bs-target="#${gendre}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                              </button>`;
}

const url = "https://striveschool-api.herokuapp.com/api/movies";

optionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
  },
};

const gendreMoviesFetch = async () => {
  const response = await fetch(url, optionsGet);
  const gendres = await response.json();
  // console.log(gendres);
  return gendres;
};

let arrayOfIndexes = ["first", "second", "third"];

const getMoviesByGendre = async () => {
  const gendreArray = await gendreMoviesFetch();
  gendreArray.forEach(async (gendre, index) => {
    let currentUrl = url + `/${gendre}`;
    // const allMovies = await
    const currentIndexOfGallery = arrayOfIndexes[index];
    const gendreMoviesFetch = await fetch(currentUrl, optionsGet);
    const currentMoviesFetch = await gendreMoviesFetch.json();
    currentMoviesFetch.forEach((movie) => {
      renderMovie(movie, currentIndexOfGallery);
    });
    // renderMovie(movie);
    console.log(currentMoviesFetch);
  });
  console.log(gendreArray);
};

const renderMovie = (movie, index) => {
  const currentGallery = document.querySelector(`#${index}-gallery`);
  const carouselList = currentGallery.querySelectorAll(".carousel-item");
  for (let carouselItem of carouselList) {
    const row = carouselItem.querySelector(".row");
    row.innerHTML += `<div class="col-md-2" style=" height:150px" >
                        <img class="movie-cover movie-image" src=${movie.imageUrl} />
                      </div>`;
  }
};

{
  /* <div class="col-md-2">
  <img class="movie-cover" src="./assets/media/media1.jpg" />
</div>; */
}

window.onload = getMoviesByGendre();

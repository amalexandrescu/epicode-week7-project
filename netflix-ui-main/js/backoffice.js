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

// {
//   <ul class="list-group mt-3"></ul>;
// }

// moviesByGendreArray = ["hello", "movie", "other movie"];

function renderMovieList(arrayOfMovies) {
  let h1TagToAppend = document.querySelector("h1");
  let h2TagToAppend = document.createElement("h2");
  h2TagToAppend.innerText = "Gendre";
  let ulList = document.createElement("ul");
  ulList.classList.add("list-group");
  ulList.classList.add("mt-3");
  arrayOfMovies.forEach((movie) => {
    const movieLi = document.createElement("li");
    movieLi.classList.add("list-group-item");
    movieLi.innerHTML = `<div class="row px-3 align-items-center">
                          <div class="mr-1 col row justify-content-between align-items-center">
                            <div>${movie.name}</div>
                          </div>
                          <a class"col" href="edit.html?movieCategory=${movie.category}&movieId=${movie._id}">Edit</a>
                          <a class"col" href="backoffice.html?movieCategory=${movie.category}&movieId=${movie._id}">Delete</a>
                          <button type="button" class="btn btn-danger" onclick="onDelete()">Delete</button>
                        </div>`;
    ulList.appendChild(movieLi);
  });
  h2TagToAppend.appendChild(ulList);
  h1TagToAppend.appendChild(h2TagToAppend);
}

const getMoviesByGendre = async () => {
  const gendresArray = await gendreMoviesFetch(url, optionsGet);
  console.log(gendresArray);
  gendresArray.forEach(async (gendre) => {
    const currentUrl = url + `/${gendre}`;
    const respGendresArray = await gendreMoviesFetch(currentUrl, optionsGet);
    console.log(respGendresArray);
    const moviesArray = respGendresArray;
    renderMovieList(moviesArray);
    // moviesArray.forEach((movieArr) => renderMovieList(movieArr));
    // respGendresArray.forEach((gendre) => renderMovieList(gendre));
    // console.log(respGendresArray);
  });
};

async function onDelete() {
  try {
    if (confirm("Do you really want to delete this product?")) {
      const optionsDelete = {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
        },
      };
      const response = await fetch(url, optionsDelete);
      if (response.ok) {
        // This is like an a tag, but in JavaScript
        window.location.assign("home.html");
      } else {
        alert("Error while deleting!");
      }
    }
  } catch (error) {
    alert(`Some erorr occured: ${error}`);
  }
}

window.onload = () => {
  const result = getMoviesByGendre();
  console.log(result);
};

function deleteMovie() {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  const movieId = params.get("movieId");
  console.log(movieId);
  const movieCategory = params.get("movieCategory");
  console.log(movieCategory);

  try {
    if (confirm("Do you really want to delete this product?")) {
      const optionsDelete = {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
        },
      };
      const response = fetch(url, optionsDelete);
      if (response.ok) {
        // This is like an a tag, but in JavaScript
        window.location.assign("home.html");
      } else {
        alert("Error while deleting!");
      }
    }
  } catch (error) {
    alert(`Some erorr occured: ${error}`);
  }
}

const deleteButton = document.querySelector(".list-group-item a:nth-of-type(2");
deleteButton.addEventListener("click", deleteMovie);

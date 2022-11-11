const params = new URLSearchParams(window.location.search);
console.log(params);
const movieId = params.get("movieId");
const movieCategory = params.get("movieCategory");

console.log(movieId);
console.log(movieCategory);

const url = "https://striveschool-api.herokuapp.com/api/movies";

window.onload = async () => {
  const currentUrl = `${url}/${movieCategory}`;

  optionsGet = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
    },
  };

  const response = await fetch(currentUrl, optionsGet);
  const moviesArray = await response.json();

  console.log(moviesArray);

  for (let movie of moviesArray) {
    if (movie._id === movieId) {
      console.log(movie._id);

      document.querySelector("#movie-name").value = movie.name;
      document.querySelector("#movie-description").value = movie.description;
      document.querySelector("#movie-category").value = movie.category;
      document.querySelector("#movie-imgUrl").value = movie.imageUrl;
      // return;
    }
  }

  let submitButton = document.querySelector("#submit-button");
  // submitButton.innerText = "Edit Product";
  submitButton.classList.remove("btn-primary");
  submitButton.classList.add("btn-success");
};

async function onFormSubmit(event) {
  // We call this to avoid the default action for the event.
  //  which is the refresh of the page because it is a submit button
  event.preventDefault();

  const newMovie = {
    name: document.querySelector("#movie-name").value,
    description: document.querySelector("#movie-description").value,
    category: document.querySelector("#movie-category").value,
    imageUrl: document.querySelector("#movie-imgUrl").value,
  };

  const optionsPut = {
    method: "PUT",
    // BODY NEEDS TO BE A STRING, BECAUSE THIS IS HTTP,
    // so we convert the object into a string, JSON string
    body: JSON.stringify(newMovie),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
    },
  };

  const optionsGet = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
    },
  };

  try {
    // JavaScript please TRY to execute this block of code...
    // Whenever an erorr presents inside here, we will move directly
    // to the catch block, and we will execute the code there.

    const currentUrl = `${url}/${movieCategory}`;

    const moviesArray = await fetch(currentUrl, optionsGet);

    for (let i = 0; i < moviesArray.length; i++) {
      if (moviesArray[i].movie._id === movieId) {
        const response = fetch(url, optionsPut);
        if (response.ok) {
          // Because we want to do this only if the response code is 200 OK
          alert("Movie edited successfully!");
          window.location.assign("home.html");
        } else {
          throw new Error("ERROR WHILE EXECUTING THE TRY BLOCK!");
        }
      }
    }

    // If there is an error here, when fetching...
    // This code will not go forward -> we jump to the catch block.
  } catch (error) {
    // Any error will be catched here.
    console.error(error);
  }
}

// {
//   "name": "The Gray Man",
//   "description": "Amazing action movie",
//   "category": "action",
//   "imageUrl": "https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg"
// }

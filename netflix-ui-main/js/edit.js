const params = new URLSearchParams(window.location.search);
console.log(params);
const movieId = params.get("movieId");
const movieCategory = params.get("movieCategory");

console.log(movieId);
console.log(movieCategory);

const url = "https://striveschool-api.herokuapp.com/api/movies";

window.onload = async () => {
  //for GET method
  const getUrl = `${url}/${movieCategory}`;

  optionsGet = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
    },
  };

  const response = await fetch(getUrl, optionsGet);
  const moviesArray = await response.json();

  console.log(moviesArray);

  for (let movie of moviesArray) {
    if (movie._id === movieId) {
      console.log(movie._id);

      document.querySelector("#movie-name").value = movie.name;
      document.querySelector("#movie-description").value = movie.description;
      document.querySelector("#movie-category").value = movie.category;
      document.querySelector("#movie-imgUrl").value = movie.imageUrl;
      break;
    }
  }

  let editButton = document.querySelector("#edit-button");
  editButton.classList.remove("btn-primary");
  editButton.classList.add("btn-success");
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
  try {
    //for PUT  and DELETE method
    const putUrl = `${url}/${movieId}`;
    const moviesArray = await fetch(putUrl, optionsPut);
    window.location.assign("index.html");
  } catch (error) {
    // Any error will be catched here.
    console.error(error);
  }
}

const deleteButton = document.querySelector("#delete-button");

async function deleteMovie() {
  try {
    if (confirm("Do you really want to delete this product?")) {
      const optionsDelete = {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
        },
      };
      const deleteUrl = `${url}/${movieId}`;

      const response = await fetch(deleteUrl, optionsDelete);
      if (response.ok) {
        // This is like an a tag, but in JavaScript
        window.location.assign("index.html");
      } else {
        alert("Error while deleting!");
      }
    }
  } catch (error) {
    alert(`Some erorr occured: ${error}`);
  }
}
deleteButton.addEventListener("click", deleteMovie);

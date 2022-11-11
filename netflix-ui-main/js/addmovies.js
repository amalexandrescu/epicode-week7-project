const addMovie = (movie) => {
  const url = "https://striveschool-api.herokuapp.com/api/movies";

  const optionsPost = {
    method: "POST",
    // BODY NEEDS TO BE A STRING, BECAUSE THIS IS HTTP,
    // so we convert the object into a string, JSON string
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
    },
  };

  try {
    const currentUrl = `${url}/${movie.category}`;
    const response = fetch(currentUrl, optionsPost);

    if (response.ok) {
      // Because we want to do this only if the response code is 200 OK
      alert("Movie created successfully!");
      window.location.assign("index.html");
    } else {
      throw new Error("ERROR WHILE EXECUTING THE TRY BLOCK!");
    }
  } catch (error) {
    // Any error will be catched here.
    console.error(error);
  }
};

function onFormSubmit(event) {
  event.preventDefault();

  const newMovie = {
    name: document.querySelector("#movie-name").value,
    description: document.querySelector("#movie-description").value,
    category: document.querySelector("#movie-category").value,
    imageUrl: document.querySelector("#movie-imgUrl").value,
  };

  const addButton = document.querySelector("#submit-button");
  addButton.addEventListener("click", addMovie(newMovie));
}

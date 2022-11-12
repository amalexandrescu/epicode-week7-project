const url = "https://striveschool-api.herokuapp.com/api/movies";

async function onFormSubmit(event) {
  event.preventDefault();

  const newMovie = {
    name: document.querySelector("#movie-name").value,
    description: document.querySelector("#movie-description").value,
    category: document.querySelector("#movie-category").value,
    imageUrl: document.querySelector("#movie-imgUrl").value,
  };

  const optionsPost = {
    method: "POST",
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
    const descriptionInput = document.querySelector("#movie-category");
    const movieCategory = descriptionInput.value;

    const postUrl = url;
    const moviesArray = await fetch(postUrl, optionsPost);
    window.location.assign("index.html");
  } catch (error) {
    // Any error will be catched here.
    console.error(error);
  }
}

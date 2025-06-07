const ts = 1;
const publicKey = "c57ec50e1eed9728684f63c4771d504d";
const privateKey = "96b0a99887be3a51587ecfe828294283dda011e1";
const baseURL = "https://gateway.marvel.com/v1/public/characters";
const hash = md5(ts + privateKey + publicKey);

// dom elements parts---
const searchBtn = document.getElementById("searchBtn");
const inputBox = document.getElementById("input-box");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  const heroName = inputBox.value.trim();
  if (heroName === "") {
    alert("please enter name of marvel-hero");
    return;
  }

  // api ke liye url banya jisme hero ka name and api key rkhi ...
  const url = `${baseURL}?name=${heroName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.data.results.length === 0) {
        resultDiv.innerHTML = `<p>NO hero found with the name <strong>${heroName}</p>`;
        return;
      }
      const hero = data.data.results[0];
      const img = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
      const desc = hero.description || "No description available";

      resultDiv.innerHTML = `<img src ="${img}" alt="${hero.name}" clas = "hero-image/>
      <h2 class = "hero-name">${hero.name}</h2>
      <p class = "hero-desc">${desc}</p>`;
      console.log("Image URl:", img);
    })
    .catch((error) => {
      console.log("error:", error);
      resultDiv.innerHTML = `<p> Something went wrong. Please try again later </p>`;
    });
});

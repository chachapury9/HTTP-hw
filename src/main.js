import Handlebars from "handlebars";
import template from "bundle-text:./template.hbs";

const templateCompiled = Handlebars.compile(template);

const output = document.getElementById("country");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const suggestion = document.getElementById("suggestions");

import fetchCountry from "./modules/fetchCountries";

input.addEventListener("input", () => {
  output.innerHTML = "";
  suggestion.innerHTML = "";
  fetchCountry(input.value)
    .then((countries) => {
      const allCountries = countries.data.objects;
      if (input.value.length >= 2) {
        const filteredCountries = allCountries.filter((element) =>
          element.names.common
            .trim()
            .toLowerCase()
            .startsWith(input.value.trim().toLowerCase()),
        );

        filteredCountries.forEach((element) => {
          const markUp = `<li>${element.names.common}</li>`;

          suggestion.insertAdjacentHTML("beforeend", markUp);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  output.innerHTML = "";
  suggestion.innerHTML = "";
  fetchCountry(input.value).then((countries) => {
    const allCountries = countries.data.objects;
    const filteredCountries = allCountries.filter((element) =>
      element.names.common
        .trim()
        .toLowerCase()
        .includes(input.value.trim().toLowerCase()),
    );
    console.log(countries);
    filteredCountries.forEach((element) => {
      const markUp = templateCompiled({
        name: element.names.common,
        capitals: element.capitals,
        population: element.population,
        languages: element.languages,
        img: element.flag.url_png,
      });

      output.insertAdjacentHTML("beforeend", markUp);
    });
  });
});

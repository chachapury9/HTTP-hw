export const baseUrl =
  "https://api.restcountries.com/countries/v5?limit=25/name?q=";

export default function fetchCountry(name) {
  const url = `${baseUrl}${name}`;

  return fetch(url, {
    headers: {
      Authorization: "Bearer rc_live_0486e3642caf4b77af654f8be739e733",
    },
  }).then((response) => {
    const json = response.json();
    console.log(json);
    return json;
  });
}

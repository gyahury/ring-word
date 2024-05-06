import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  let data = [];
  fetch(import.meta.env.VITE_API_URL + '/gyahury/words.json')
    .then((response) => response.json())
    .then((json) => {
      data = json.words;
      console.log(data);
    })
    .catch((error) => console.error(error));
});

import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const wordDiv = document.getElementById('word');
  const curWordCountSpan = document.getElementById('curWordCount');
  const allWordCountSpan = document.getElementById('allWordCount');
  const prevButton = document.getElementById('prevButton');
  const flipButton = document.getElementById('flipButton');
  const nextButton = document.getElementById('nextButton');
  let data = [];
  
  fetch(import.meta.env.VITE_API_URL + '/gyahury/words.json')
    .then((response) => response.json())
    .then((json) => {
      data = json.words;
      console.log(data);
    })
    .catch((error) => console.error(error));
});

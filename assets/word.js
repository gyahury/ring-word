import '/assets/style.css';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const nickname = urlParams.get('nickname');
  const page = urlParams.get('page');
  const wordDiv = document.getElementById('word');
  const curWordCountSpan = document.getElementById('curWordCount');
  const allWordCountSpan = document.getElementById('allWordCount');
  const prevButton = document.getElementById('prevButton');
  const flipButton = document.getElementById('flipButton');
  const nextButton = document.getElementById('nextButton');
  const dictButton = document.getElementById('dictButton');

  let words = [];
  let currentIndex = 0;
  let showingWord = true;

  fetch(import.meta.env.VITE_API_URL + '/' + nickname + '/words.json')
    .then((response) => response.json())
    .then((json) => {
      words = json.words.filter((word) => word.type === page);
      allWordCountSpan.textContent = words.length;
      if (words.length > 0) {
        showWord(currentIndex);
      }
    })
    .catch((error) => alert('error occurred : ' + error));

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingWord = true;
      showWord(currentIndex);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < words.length - 1) {
      currentIndex++;
      showingWord = true;
      showWord(currentIndex);
    }
  });

  flipButton.addEventListener('click', () => {
    showingWord = !showingWord;
    showWord(currentIndex);
  });

  dictButton.addEventListener('click', () => {
    const currentWord = words[currentIndex].word;
    const url = `https://ja.dict.naver.com/?m=mobile#/search?query=${currentWord}`;
    window.open(url, '_blank');
  });

  function showWord(index) {
    const wordData = words[index];
    if (showingWord) {
      wordDiv.innerHTML = `${wordData.word}`;
    } else {
      wordDiv.innerHTML = `${wordData.furigana}<br>${wordData.meaning}`;
    }
    curWordCountSpan.textContent = index + 1;
  }
});

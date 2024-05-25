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
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let words = [];
  let currentIndex = 0;
  let showingWord = true;
  let drawing = false;
  let startX = 0;
  let startY = 0;

  resizeCanvas();

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

  window.addEventListener('resize', resizeCanvas);

  prevButton.addEventListener('click', () => {
    resizeCanvas();
    if (currentIndex > 0) {
      currentIndex--;
      showingWord = true;
      showWord(currentIndex);
    } else if (currentIndex == 0) {
      currentIndex = words.length - 1;
      showingWord = true;
      showWord(currentIndex);
    }
  });

  nextButton.addEventListener('click', () => {
    resizeCanvas();
    if (currentIndex < words.length - 1) {
      currentIndex++;
      showingWord = true;
      showWord(currentIndex);
    } else if (currentIndex == words.length - 1) {
      currentIndex = 0;
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

  canvas.addEventListener('mousedown', mouseDown);
  canvas.addEventListener('mouseup', mouseUp);
  canvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('mouseout', mouseOut);

  function showWord(index) {
    const wordData = words[index];
    if (showingWord) {
      wordDiv.innerHTML = `${wordData.word}`;
    } else {
      wordDiv.innerHTML = `${wordData.furigana}<div style='font-size: clamp(0.7rem, 6vw, 2rem);'>${wordData.meaning}</div>`;
    }
    curWordCountSpan.textContent = index + 1;
  }

  function draw(curX, curY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(curX, curY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'gray';
    ctx.stroke();
  }

  function mouseDown(e) {
    startX = e.offsetX;
    startY = e.offsetY;
    drawing = true;
  }

  function mouseMove(e) {
    if (!drawing) return;
    let curX = e.offsetX;
    let curY = e.offsetY;
    draw(curX, curY);
    startX = curX;
    startY = curY;
  }

  function mouseUp() {
    drawing = false;
  }

  function mouseOut() {
    drawing = false;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

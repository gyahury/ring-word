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
  const searchButton = document.getElementById('searchButton');
  const shuffleButton = document.getElementById('shuffleButton');
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
  
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseout', mouseOut);
    canvas.addEventListener('touchstart', touchStart);
    canvas.addEventListener('touchmove', touchMove);
    canvas.addEventListener('touchend', touchEnd);
  
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

  searchButton.addEventListener('click', () => {
    const currentWord = words[currentIndex].word;
    const url = `https://ja.dict.naver.com/?m=mobile#/search?query=${currentWord}`;
    window.open(url, '_blank');
  });

  shuffleButton.addEventListener('click', () => {
    if (confirm('Would you like to shuffle?')) {
      currentIndex = 0;
      showingWord = true;
      resizeCanvas();
      shuffle(words);
      showWord(currentIndex);
    }
  });

  function showWord(index) {
    const wordData = words[index];
    if (showingWord) {
      wordDiv.innerHTML = `${wordData.word}`;
    } else {
      wordDiv.innerHTML = `${wordData.furigana}<div style='font-size: clamp(0.7rem, 6vw, 2rem);'>${wordData.meaning}</div>`;
    }
    curWordCountSpan.textContent = index + 1;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function draw(curX, curY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(curX, curY);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'RGBA(169, 169, 169, 1)';
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

  function touchStart(e) {
    if (e.touches.length == 1) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    }
    e.preventDefault();
  }

  function touchMove(e) {
    if (e.touches.length == 1) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    }
    e.preventDefault();
  }

  function touchEnd(e) {
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
    e.preventDefault();
  }

  function resizeCanvas() {
    var ratio = window.devicePixelRatio;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    ctx.scale(ratio, ratio);
  }
});

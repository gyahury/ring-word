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
  const toggleMenuButton = document.getElementById('toggleMenuButton');
  const toggleDrawButton = document.getElementById('toggleDrawButton');
  const controlAutoProgressButton = document.getElementById('controlAutoProgressButton');
  const shuffleButton = document.getElementById('shuffleButton');
  const excludeWordButton = document.getElementById('excludeWordButton');
  const checkWordButton = document.getElementById('checkWordButton');
  const backButton = document.getElementById('backButton');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let words = [];
  let currentIndex = 0;
  let showingWord = true;
  let drawing = false;
  let startX = 0;
  let startY = 0;
  let autoProgressEventId;

  resizeCanvas();
  activateDrawEvent();

  fetch(`${import.meta.env.VITE_API_URL}/${nickname}/words.json`)
    .then((response) => response.json())
    .then((json) => {
      let lastKey = localStorage.getItem('lastKey');
      lastKey ? addCheckedWord(json.words) : words;
      words = json.words.filter((word) => word.type === page);
      allWordCountSpan.textContent = words.length;
      if (words.length > 0) {
        showWord(currentIndex);
      } else {
        alert('invalid access');
        goBack();
      }
    })
    .catch((error) => alert('error occurred : ' + error));

  window.addEventListener('resize', resizeCanvas);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'q') {
      resizeCanvas();
      showPrev();
    } else if (event.key === 'ArrowRight' || event.key === 'w') {
      resizeCanvas();
      showNext();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      showFlip();
    } else if (event.key === 'e') {
      excludeWord();
    }
  });

  prevButton.addEventListener('click', () => {
    resizeCanvas();
    showPrev();
  });

  nextButton.addEventListener('click', () => {
    resizeCanvas();
    showNext();
  });

  flipButton.addEventListener('click', () => {
    showFlip();
  });

  searchButton.addEventListener('click', () => {
    const currentWord = words[currentIndex].word;
    const url = `https://ja.dict.naver.com/?m=mobile#/search?query=${currentWord}`;
    window.open(url, '_blank');
  });

  toggleMenuButton.addEventListener('click', toggleMenu);
  toggleDrawButton.addEventListener('click', toggleDrawEvent);
  controlAutoProgressButton.addEventListener('click', controlAutoProgressEvent);
  excludeWordButton.addEventListener('click', excludeWord);
  checkWordButton.addEventListener('click', checkWord);

  shuffleButton.addEventListener('click', () => {
    if (confirm('would you like to shuffle?')) {
      currentIndex = 0;
      showingWord = true;
      resizeCanvas();
      shuffle(words);
      showWord(currentIndex);
      toggleMenu();
    }
  });

  backButton.addEventListener('click', () => {
    if (confirm('are you sure you want to go back? unsaved changes will be lost')) {
      goWordPage();
    }
  });

  function showWord(currentIndex) {
    const wordData = words[currentIndex];
    if (wordData.type == 'Checked') {
      changeToUnchecked();
    }
    showingWord 
      ? wordDiv.innerHTML = `${wordData.word}` 
      : wordDiv.innerHTML = `${wordData.furigana}<div style='font-size: clamp(0.7rem, 6vw, 2rem);'>${wordData.meaning}</div>`;
    curWordCountSpan.textContent = currentIndex + 1;
  }

  function changeToUnchecked() {
    checkWordButton.id = 'uncheckWordButton';
    checkWordButton.textContent = 'Uncheck Word';

    checkWordButton.removeEventListener('click', checkWord);
    const uncheckWordButton = document.getElementById('uncheckWordButton');
    uncheckWordButton.addEventListener('click', uncheckWord);
  }

  function excludeWord() {
    if (confirm('would you like to exclude this word? it will be temporarily excluded')) {
      words = words.filter((_, i) => i !== currentIndex);
      if (words.length == 0) {
        alert('congratulations. there are no more words to memorize');
        goWordPage();
      } else {
        if (currentIndex >= words.length) {
          currentIndex = 0;
        }
        showingWord = true;
        showWord(currentIndex);
      }
      allWordCountSpan.textContent = words.length;
    }
  }

  function checkWord() {
    let lastKey = localStorage.getItem('lastKey');
    lastKey = lastKey ? parseInt(lastKey) : -1;
    const newKey = lastKey + 1;
    const checkedWord = JSON.parse(JSON.stringify(words[currentIndex]));
    checkedWord.type = 'Checked';
    checkedWord.key = newKey;
    const isExists = checkWordExists(checkedWord, lastKey);

    if (isExists) {
      if (confirm('this word already exists. would you like to check it?')) {
        localStorage.setItem(newKey, JSON.stringify(checkedWord));
        localStorage.setItem('lastKey', newKey.toString());
        alert('successfully checked');
      }
    } else {
      if (confirm('would you like to check it? you can check it in word notes')) {
        localStorage.setItem(newKey, JSON.stringify(checkedWord));
        localStorage.setItem('lastKey', newKey.toString());
        alert('successfully checked');
      }
    }
  }

  function uncheckWord() {
    if (confirm('would you like to uncheck this word?')) {
      localStorage.removeItem(words[currentIndex].key);
      words = words.filter((_, i) => i !== currentIndex);
      if (words.length == 0) {
        alert('congratulations. there are no more words to memorize');
        goWordPage();
      } else {
        if (currentIndex >= words.length) {
          currentIndex = 0;
        }
        showingWord = true;
        showWord(currentIndex);
      }
      allWordCountSpan.textContent = words.length;
    }
  }

  function addCheckedWord(data) {
    let lastKey = localStorage.getItem('lastKey');
    for (let i = 0; i < lastKey + 1; i++) {
      const value = JSON.parse(localStorage.getItem(i));
      if (value) {
        data.push(value);
      }
    }
    return data;
  }

  function checkWordExists(checkedWord, lastKey) {
    for (let i = 0; i < lastKey + 1; i++) {
      const storageValue = JSON.parse(localStorage.getItem(i));
      if (storageValue && storageValue.word === checkedWord.word) {
        return true;
      }
    }
    return false;
  }

  function showPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      showingWord = true;
      showWord(currentIndex);
    } else if (currentIndex == 0) {
      currentIndex = words.length - 1;
      showingWord = true;
      showWord(currentIndex);
    }
  }

  function showNext() {
    if (currentIndex < words.length - 1) {
      currentIndex++;
      showingWord = true;
      showWord(currentIndex);
    } else if (currentIndex == words.length - 1) {
      currentIndex = 0;
      showingWord = true;
      showWord(currentIndex);
    }
  }

  function showFlip() {
    showingWord = !showingWord;
    showWord(currentIndex);
  }

  function toggleMenu() {
    const toggleMenuButton = document.getElementById('toggleMenuButton');
    const menu = toggleMenuButton.parentNode.nextElementSibling; // 메뉴 찾기
    const isExpanded = toggleMenuButton.getAttribute('aria-expanded') === 'true';
    toggleMenuButton.setAttribute('aria-expanded', !isExpanded);
    menu.style.display = isExpanded ? 'none' : 'block';
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

  function activateDrawEvent() {
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseout', mouseOut);
    canvas.addEventListener('touchstart', touchStart);
    canvas.addEventListener('touchmove', touchMove);
    canvas.addEventListener('touchend', touchEnd);
  }

  function deactivateDrawEvent() {
    canvas.removeEventListener('mousedown', mouseDown);
    canvas.removeEventListener('mouseup', mouseUp);
    canvas.removeEventListener('mousemove', mouseMove);
    canvas.removeEventListener('mouseout', mouseOut);
    canvas.removeEventListener('touchstart', touchStart);
    canvas.removeEventListener('touchmove', touchMove);
    canvas.removeEventListener('touchend', touchEnd);
  }

  function activeAutoProgressEvent(ms) {
    if (autoProgressEventId) {
      clearInterval(autoProgressEventId);
    }
    autoProgressEventId = setInterval(() => {
      showFlip();
      setTimeout(showNext, ms / 2);
    }, ms);
    return autoProgressEventId;
  }

  function deactivateAutoProgressEvent() {
    if (autoProgressEventId) {
      clearInterval(autoProgressEventId);
      autoProgressEventId = null;
    }
  }

  function toggleDrawEvent() {
    if (toggleDrawButton.textContent === 'Draw Off') {
      deactivateDrawEvent();
      toggleDrawButton.textContent = 'Draw On';
    } else {
      activateDrawEvent();
      toggleDrawButton.textContent = 'Draw Off';
    }
    resizeCanvas();
  }

  function controlAutoProgressEvent() {
    const states = [
      { text: 'Auto Off', action: deactivateAutoProgressEvent },
      { text: 'Auto x1 On', action: () => activeAutoProgressEvent(8000) },
      { text: 'Auto x2 On', action: () => activeAutoProgressEvent(4000) },
      { text: 'Auto x4 On', action: () => activeAutoProgressEvent(2000) },
      { text: 'Auto x8 On', action: () => activeAutoProgressEvent(1000) },
    ];
    let currentStateIndex = states.findIndex(
      (state) => state.text === controlAutoProgressButton.textContent,
    );
    states[currentStateIndex].action();
    currentStateIndex = (currentStateIndex + 1) % states.length;
    controlAutoProgressButton.textContent = states[currentStateIndex].text;
  }

  function goBack() {
    window.history.back();
  }

  function goWordPage() {
    location.href = `/ring-word/wordPage?nickname='${nickname}`;
  }
});

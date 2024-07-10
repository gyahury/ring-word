import '/assets/style.css';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const nickname = urlParams.get('nickname');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const lastKey = localStorage.getItem('lastKey');

  fetch(import.meta.env.VITE_API_URL + '/' + nickname + '/words.json')
    .then((response) => response.json())
    .then((json) => {
      let data = json.words;
      data = lastKey ? addCheckedWord(data) : data;
      renderCards(data);

      searchButton.addEventListener('click', function () {
        const searchText = searchInput.value.toLowerCase();
        searchCards(searchText, data);
      });

      searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          const searchText = searchInput.value.toLowerCase();
          searchCards(searchText, data);
        }
      });
    })
    .catch((e) => alert(e, 'error occurred'));

  function renderCards(data) {
    const cardContainer = document.getElementById('cardContainer');
    const typeCount = {};
    cardContainer.innerHTML = '';
    
    data.forEach((item) => {
      typeCount[item.type] ? typeCount[item.type]++ : typeCount[item.type] = 1;
    });

    for (const type in typeCount) {
      const wordPage = document.createElement('button');
      wordPage.className =
        'bg-white hover:bg-gray-100 text-gray-600 text-sm font-medium w-36 h-16 py-3 px-6 border border-gray-400 rounded-lg shadow-md whitespace-nowrap text-ellipsis overflow-hidden';
      wordPage.type = 'button';
      wordPage.textContent = `${type}`;
      wordPage.addEventListener('click', () => {
        window.location.href = `../word?nickname=${nickname}&page=${type}`
      });
      cardContainer.appendChild(wordPage);
    }
    
    if (Object.keys(typeCount).length % 3 == 1) {
      for (let i = 0; i < 2; i++) {
        const wordPage = document.createElement('button');
        wordPage.className = 'invisible w-36 h-0';
        cardContainer.appendChild(wordPage);
      }
    } else if (Object.keys(typeCount).length % 3 == 2) {
      const wordPage = document.createElement('button');
      wordPage.className = 'invisible w-36 h-0';
      cardContainer.appendChild(wordPage);
    }
  }

  function searchCards(searchText, data) {
    renderCards(
      data.filter(
        (item) =>
          item.type.toLowerCase().includes(searchText) ||
          item.word.toLowerCase().includes(searchText) ||
          item.meaning.toLowerCase().includes(searchText),
      ),
    );
  }

  function addCheckedWord(data) {
    for (let i = 0; i < lastKey + 1; i++) {
      const value = JSON.parse(localStorage.getItem(i));
      if (value) {
        data.push(value);
      }
    }
    return data;
  }
});

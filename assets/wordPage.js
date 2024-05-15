import '/assets/style.css';

document.addEventListener('DOMContentLoaded', () => {
  
  const urlParams = new URLSearchParams(window.location.search);
  const nickname = urlParams.get('nickname');
  fetch(import.meta.env.VITE_API_URL + '/' + nickname + '/words.json')
    .then((response) => response.json())
    .then((json) => {
      const data = json.words;
      renderCards(data);
    })
    .catch((error) => alert('error occurred : ' + error));

  function renderCards(data) {
    const cardContainer = document.getElementById('cardContainer');
    const typeCount = {};

    data.forEach((item) => {
      if (typeCount[item.type]) {
        typeCount[item.type]++;
      } else {
        typeCount[item.type] = 1;
      }
    });

    for (const type in typeCount) {
      const wordPage = document.createElement('button');
      wordPage.className =
        'bg-white hover:bg-gray-100 text-gray-800 py-4 px-8 border border-gray-400 rounded shadow';
      wordPage.type = 'button';
      wordPage.textContent = `${type}`;
      wordPage.addEventListener('click', () => {
        window.location.href = '../word?nickname=' + nickname + '&page=' + type ;
      });
      cardContainer.appendChild(wordPage);
      //이후 인덱스 추가
      //const pageIndex = document.createElement('span');
      //pageIndex.className = 'text-gray-400'
      //pageIndex.textContent = `${typeCount[type]}`
      //cardContainer.appendChild(pageIndex);
    }
  }
});

import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit-btn').addEventListener('click', function () {
    const inputValue = document.getElementById('nickname').value.trim();
    if (inputValue) {
      const requestUrl =
        import.meta.env.VITE_API_URL + '/' + inputValue + '/words.json';
      fetch(requestUrl, {
        method: 'HEAD',
      })
        .then((response) => {
          if (response.ok) {
            location.href = './word-page?nickname='+inputValue;
          } else {
            alert('file does not exist');
          }
        })
        .catch((error) => {
          console.error('Error checking folder:', error);
          alert('connect fail');
        });
    } else {
      alert('enter your nickname');
    }
  });
});

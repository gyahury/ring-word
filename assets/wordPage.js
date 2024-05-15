import '/assets/style.css';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nickname = urlParams.get('nickname');
    alert(nickname);
});

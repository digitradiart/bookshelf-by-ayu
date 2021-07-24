const toggle = document.querySelector('#btn-toggle');
const theme = document.querySelector('#theme-link');

toggle.addEventListener('click', function() {
    if (theme.getAttribute('href') == 'css/light.css') {
        theme.href = 'css/dark.css';
    } else {
        theme.href = 'css/light.css';
    }
});
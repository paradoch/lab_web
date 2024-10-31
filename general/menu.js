const toggleMenuBtn = document.getElementById('toggleMenuBtn');
const menu = document.getElementById('menu');

toggleMenuBtn.addEventListener('click', function() {
    menu.classList.toggle('open');
});

document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && event.target !== toggleMenuBtn) {
        menu.classList.remove('open');
    }
});
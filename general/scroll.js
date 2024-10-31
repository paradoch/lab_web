function handleScroll() {
    const header = document.getElementById('header');

    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
}

window.addEventListener('scroll', handleScroll);
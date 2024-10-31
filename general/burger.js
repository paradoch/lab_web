const burgerMenu = document.getElementById('burgerMenu');
        const headerBlock = document.getElementById('headerBlock');
        const overlay = document.getElementById('overlay');
        const closeMenuBtn = document.getElementById('closeMenu');

        function toggleMenu() {
            burgerMenu.classList.toggle('open');
            headerBlock.classList.toggle('open');
            overlay.classList.toggle('show');
            document.body.classList.toggle('no-scroll');
        }

        burgerMenu.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);

        const navLinks = document.querySelectorAll('.header-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                headerBlock.classList.remove('open');
                burgerMenu.classList.remove('open');
                overlay.classList.remove('show');
                document.body.classList.remove('no-scroll');
            });
        });
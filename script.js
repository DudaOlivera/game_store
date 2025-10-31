document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('checkbox');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    } else {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.main-nav a[href="#${id}"]`);
            if (navLink) {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });

    const searchForm = document.querySelector('.search-bar');
    const searchInput = searchForm.querySelector('input');
    const gameGrid = document.querySelector('.top-sellers-grid');
    const allGameCards = gameGrid.querySelectorAll('.seller-card');

    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'Nenhum jogo encontrado com esse termo.';
    noResultsMessage.style.display = 'none';
    noResultsMessage.style.gridColumn = '1 / -1';
    noResultsMessage.style.textAlign = 'center';
    noResultsMessage.style.fontSize = '1.1rem';
    noResultsMessage.style.color = 'var(--text-secondary)';
    gameGrid.appendChild(noResultsMessage);

    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let matchesFound = 0;

        allGameCards.forEach(card => {
            const gameTitle = card.querySelector('.seller-title').textContent.toLowerCase();
            if (gameTitle.includes(searchTerm)) {
                card.style.display = 'block';
                matchesFound++;
            } else {
                card.style.display = 'none';
            }
        });

        if (matchesFound === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    searchInput.addEventListener('input', filterGames);

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });

});

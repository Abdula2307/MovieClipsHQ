/* ============================================
   MOVIECLIPSHQ - MAIN APPLICATION
   Production-quality vanilla JavaScript
   ============================================ */

// ============================================
// MOVIE DATABASE
// ============================================
// EDIT THIS TO ADD MORE MOVIES
// Simply duplicate a movie object and change the properties
const movies = [
    {
        id: 1,
        title: "Neon Dreams",
        year: "2026",
        genre: "Sci-Fi",
        description: "A cyberpunk thriller exploring the intersection of consciousness and technology. Dive into a world where reality is negotiable.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff4444?text=Neon+Dreams",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
        featured: true
    },
    {
        id: 2,
        title: "Crimson Tide Rising",
        year: "2025",
        genre: "Action",
        description: "An intense naval action thriller. When tensions escalate at sea, one captain must make impossible choices.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff6b6b?text=Crimson+Tide",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4",
        featured: true
    },
    {
        id: 3,
        title: "Echoes of Yesterday",
        year: "2025",
        genre: "Drama",
        description: "A poignant examination of memory and loss. A woman confronts her past when a stranger arrives in town with a secret.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff6b6b?text=Echoes",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4",
        featured: true
    },
    {
        id: 4,
        title: "Laughter in the Dark",
        year: "2026",
        genre: "Comedy",
        description: "A hilarious romp through mistaken identities and chaotic situations. Perfect for a night of endless laughs.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff4444?text=Laughter",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerEscapes.mp4",
        featured: false
    },
    {
        id: 5,
        title: "Starlight Requiem",
        year: "2024",
        genre: "Animation",
        description: "An animated masterpiece about a girl's journey through a magical cosmos filled with wonder and danger.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff6b6b?text=Starlight",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerFun.mp4",
        featured: false
    },
    {
        id: 6,
        title: "Midnight Proposal",
        year: "2025",
        genre: "Romance",
        description: "Two souls reconnect on a fateful night. Can they overcome the years that have passed between them?",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff4444?text=Midnight",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerJoyrides.mp4",
        featured: false
    },
    {
        id: 7,
        title: "The Last Explorer",
        year: "2026",
        genre: "Adventure",
        description: "Journey to uncharted territories with a legendary explorer. Discover wonders and dangers beyond imagination.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff6b6b?text=Explorer",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
        featured: false
    },
    {
        id: 8,
        title: "Shadows in the Snow",
        year: "2024",
        genre: "Thriller",
        description: "A psychological thriller set in the frozen north. Every shadow hides a secret. Every stranger has a motive.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff4444?text=Shadows",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4",
        featured: false
    },
    {
        id: 9,
        title: "Haunted Symphony",
        year: "2025",
        genre: "Horror",
        description: "A classical composer discovers a mysterious score. Playing it awakens something ancient and terrifying.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff6b6b?text=Haunted",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4",
        featured: false
    },
    {
        id: 10,
        title: "The Diplomat's Secret",
        year: "2026",
        genre: "Drama",
        description: "Behind closed doors, a diplomat balances duty and conscience. One decision will change everything.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff4444?text=Diplomat",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerEscapes.mp4",
        featured: false
    },
    {
        id: 11,
        title: "Quantum Breach",
        year: "2026",
        genre: "Sci-Fi",
        description: "A hacker discovers a quantum computer that could reshape reality. Governments will stop at nothing to find it.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff6b6b?text=Quantum",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerFun.mp4",
        featured: false
    },
    {
        id: 12,
        title: "The Wild Heart",
        year: "2024",
        genre: "Adventure",
        description: "A wildlife photographer's journey across untamed landscapes leads to discovery and transformation.",
        poster: "https://via.placeholder.com/300x450/1a1f3a/ff4444?text=Wild+Heart",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerJoyrides.mp4",
        featured: false
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================
let state = {
    currentMovie: null,
    filteredMovies: [...movies],
    activeGenre: 'all',
    searchTerm: '',
    genres: []
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    extractGenres();
    renderRecommended();
    renderMovieGrid();
    renderGenreButtons();
    updateStats();
    setupEventListeners();
});

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Search
    const headerSearch = document.getElementById('headerSearch');
    const heroSearch = document.getElementById('heroSearch');
    
    headerSearch.addEventListener('input', handleSearch);
    heroSearch.addEventListener('input', handleSearch);
    
    // CTA Button
    document.getElementById('ctaButton').addEventListener('click', () => {
        document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Genre filter
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('genre-btn')) {
            filterByGenre(e.target.dataset.genre);
        }
    });
    
    // Movie cards
    document.addEventListener('click', (e) => {
        const movieCard = e.target.closest('.movie-card');
        if (movieCard) {
            const movieId = parseInt(movieCard.dataset.id);
            openMovieModal(movieId);
        }
    });
    
    // Related movies
    document.addEventListener('click', (e) => {
        if (e.target.closest('.related-movie')) {
            const movieId = parseInt(e.target.closest('.related-movie').dataset.id);
            openMovieModal(movieId);
        }
    });
    
    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeMovieModal);
    document.getElementById('movieModal').addEventListener('click', (e) => {
        if (e.target.id === 'movieModal') {
            closeMovieModal();
        }
    });
    
    // Clear search
    document.getElementById('clearSearchBtn').addEventListener('click', clearSearch);
    document.getElementById('resetBtn').addEventListener('click', resetFilters);
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    // Mobile nav links close menu
    document.querySelectorAll('.nav-mobile a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// GENRE MANAGEMENT
// ============================================
function extractGenres() {
    const genreSet = new Set();
    movies.forEach(movie => {
        genreSet.add(movie.genre);
    });
    state.genres = Array.from(genreSet).sort();
}

function renderGenreButtons() {
    const container = document.querySelector('.genre-filter');
    
    // Keep the "All" button
    const allBtn = container.querySelector('[data-genre="all"]');
    
    // Add genre buttons
    state.genres.forEach(genre => {
        const btn = document.createElement('button');
        btn.className = 'genre-btn';
        btn.dataset.genre = genre;
        btn.textContent = genre;
        container.appendChild(btn);
    });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    state.searchTerm = searchTerm;
    state.activeGenre = 'all';
    
    if (searchTerm === '') {
        state.filteredMovies = [...movies];
        document.getElementById('searchInfo').style.display = 'none';
    } else {
        state.filteredMovies = movies.filter(movie => {
            const matchesTitle = movie.title.toLowerCase().includes(searchTerm);
            const matchesGenre = movie.genre.toLowerCase().includes(searchTerm);
            const matchesYear = movie.year.includes(searchTerm);
            return matchesTitle || matchesGenre || matchesYear;
        });
        
        document.getElementById('searchTerm').textContent = searchTerm;
        document.getElementById('searchInfo').style.display = 'block';
    }
    
    // Update genre buttons
    updateGenreButtons();
    renderMovieGrid();
}

function clearSearch() {
    state.searchTerm = '';
    state.filteredMovies = [...movies];
    document.getElementById('searchInfo').style.display = 'none';
    document.getElementById('headerSearch').value = '';
    document.getElementById('heroSearch').value = '';
    updateGenreButtons();
    renderMovieGrid();
}

// ============================================
// FILTERING
// ============================================
function filterByGenre(genre) {
    state.activeGenre = genre;
    state.searchTerm = '';
    
    // Clear search inputs
    document.getElementById('headerSearch').value = '';
    document.getElementById('heroSearch').value = '';
    document.getElementById('searchInfo').style.display = 'none';
    
    if (genre === 'all') {
        state.filteredMovies = [...movies];
    } else {
        state.filteredMovies = movies.filter(movie => movie.genre === genre);
    }
    
    updateGenreButtons();
    renderMovieGrid();
}

function updateGenreButtons() {
    document.querySelectorAll('.genre-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.genre === state.activeGenre) {
            btn.classList.add('active');
        }
    });
}

function resetFilters() {
    state.searchTerm = '';
    state.activeGenre = 'all';
    state.filteredMovies = [...movies];
    document.getElementById('headerSearch').value = '';
    document.getElementById('heroSearch').value = '';
    document.getElementById('searchInfo').style.display = 'none';
    updateGenreButtons();
    renderMovieGrid();
}

// ============================================
// RENDERING
// ============================================
function renderRecommended() {
    const container = document.getElementById('recommendedGrid');
    container.innerHTML = '';
    
    // Get featured movies
    let featured = movies.filter(m => m.featured);
    
    // If no featured movies, show first 3
    if (featured.length === 0) {
        featured = movies.slice(0, 3);
    }
    
    featured.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
    });
}

function renderMovieGrid() {
    const container = document.getElementById('movieGrid');
    const noResults = document.getElementById('noResults');
    
    container.innerHTML = '';
    
    if (state.filteredMovies.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    state.filteredMovies.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = movie.id;
    
    card.innerHTML = `
        <div class="movie-poster-container">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-play-btn"></div>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <span class="movie-genre">${movie.genre}</span>
            </div>
            <p class="movie-description">${movie.description}</p>
        </div>
    `;
    
    return card;
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================
function openMovieModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;
    
    state.currentMovie = movie;
    
    // Populate modal
    document.getElementById('movieTitle').textContent = movie.title;
    document.getElementById('movieYear').textContent = movie.year;
    document.getElementById('movieGenre').textContent = movie.genre;
    document.getElementById('movieDescription').textContent = movie.description;
    
    // Set video source
    const videoPlayer = document.getElementById('moviePlayer');
    videoPlayer.src = movie.video;
    videoPlayer.load();
    
    // Render related movies
    renderRelatedMovies(movieId);
    
    // Show modal
    const modal = document.getElementById('movieModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMovieModal() {
    const modal = document.getElementById('movieModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Stop video
    const videoPlayer = document.getElementById('moviePlayer');
    videoPlayer.pause();
    videoPlayer.src = '';
    
    state.currentMovie = null;
}

function renderRelatedMovies(currentMovieId) {
    const container = document.getElementById('relatedMovies');
    container.innerHTML = '';
    
    const currentMovie = movies.find(m => m.id === currentMovieId);
    const related = movies
        .filter(m => m.id !== currentMovieId && m.genre === currentMovie.genre)
        .slice(0, 4);
    
    // If not enough related by genre, fill with random
    if (related.length < 4) {
        const remaining = movies
            .filter(m => m.id !== currentMovieId && !related.includes(m))
            .slice(0, 4 - related.length);
        related.push(...remaining);
    }
    
    related.forEach(movie => {
        const item = document.createElement('div');
        item.className = 'related-movie';
        item.dataset.id = movie.id;
        item.innerHTML = `<img src="${movie.poster}" alt="${movie.title}" loading="lazy">`;
        container.appendChild(item);
    });
}

// ============================================
// STATISTICS
// ============================================
function updateStats() {
    document.getElementById('movieCount').textContent = movies.length;
    document.getElementById('genreCount').textContent = state.genres.length;
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape') {
        closeMovieModal();
    }
});

// ============================================
// IMAGE LAZY LOADING
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}

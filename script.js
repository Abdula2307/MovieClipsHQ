
const movies = [
    {
        id: 1,
        title: "CHASE",
        year: "2024",
        genre: "Action",
        description: "Hollywood action full movie",
        poster: "assets/posters/chase.jpg",

        // Google Drive video
        video: "https://drive.google.com/uc?export=download&id=18VICHfqab_M3NgwALGvTP0lF90Jb05aO",

        featured: true
    },
    {
        id: 2,
        title: "Crimson Tide Rising",
        year: "2025",
        genre: "Action",
        description: "An intense naval action thriller. When tensions escalate at sea, one captain must make impossible choices.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Crimson+Tide",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4",
        featured: true
    },
    {
        id: 3,
        title: "Echoes of Yesterday",
        year: "2025",
        genre: "Drama",
        description: "A poignant examination of memory and loss. A woman confronts her past when a stranger arrives in town with a secret.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Echoes",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4",
        featured: true
    },
    {
        id: 4,
        title: "Laughter in the Dark",
        year: "2026",
        genre: "Comedy",
        description: "A hilarious romp through mistaken identities and chaotic situations. Perfect for a night of endless laughs.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Laughter",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerEscapes.mp4",
        featured: false
    },
    {
        id: 5,
        title: "Starlight Requiem",
        year: "2024",
        genre: "Animation",
        description: "An animated masterpiece about a girl's journey through a magical cosmos filled with wonder and danger.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Starlight",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerFun.mp4",
        featured: false
    },
    {
        id: 6,
        title: "Midnight Proposal",
        year: "2025",
        genre: "Romance",
        description: "Two souls reconnect on a fateful night. Can they overcome the years that have passed between them?",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Midnight",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerJoyrides.mp4",
        featured: false
    },
    {
        id: 7,
        title: "The Last Explorer",
        year: "2026",
        genre: "Adventure",
        description: "Journey to uncharted territories with a legendary explorer. Discover wonders and dangers beyond imagination.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Explorer",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
        featured: false
    },
    {
        id: 8,
        title: "Shadows in the Snow",
        year: "2024",
        genre: "Thriller",
        description: "A psychological thriller set in the frozen north. Every shadow hides a secret. Every stranger has a motive.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Shadows",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4",
        featured: false
    },
    {
        id: 9,
        title: "Haunted Symphony",
        year: "2025",
        genre: "Horror",
        description: "A classical composer discovers a mysterious score. Playing it awakens something ancient and terrifying.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Haunted",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4",
        featured: false
    },
    {
        id: 10,
        title: "The Diplomat's Secret",
        year: "2026",
        genre: "Drama",
        description: "Behind closed doors, a diplomat balances duty and conscience. One decision will change everything.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Diplomat",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerEscapes.mp4",
        featured: false
    },
    {
        id: 11,
        title: "Quantum Breach",
        year: "2026",
        genre: "Sci-Fi",
        description: "A hacker discovers a quantum computer that could reshape reality. Governments will stop at nothing to find it.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Quantum",
        video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerFun.mp4",
        featured: false
    },
    {
        id: 12,
        title: "The Wild Heart",
        year: "2024",
        genre: "Adventure",
        description: "A wildlife photographer's journey across untamed landscapes leads to discovery and transformation.",
        poster: "https://placehold.co/300x450/1a1f3a/ffffff?text=Wild+Heart",
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
    activeGenre: "all",
    searchTerm: "",
    genres: []
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
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
    const headerSearch = document.getElementById("headerSearch");
    const heroSearch = document.getElementById("heroSearch");

    if (headerSearch) {
        headerSearch.addEventListener("input", handleSearch);
    }

    if (heroSearch) {
        heroSearch.addEventListener("input", handleSearch);
    }

    const ctaButton = document.getElementById("ctaButton");

    if (ctaButton) {
        ctaButton.addEventListener("click", () => {
            document.getElementById("movies")
                ?.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Genre filters
    document.addEventListener("click", (e) => {
        const genreBtn = e.target.closest(".genre-btn");

        if (genreBtn) {
            filterByGenre(genreBtn.dataset.genre);
        }
    });

    // Movie cards
    document.addEventListener("click", (e) => {
        const movieCard = e.target.closest(".movie-card");

        if (movieCard) {
            openMovieModal(Number(movieCard.dataset.id));
        }
    });

    // Related movies
    document.addEventListener("click", (e) => {
        const relatedMovie = e.target.closest(".related-movie");

        if (relatedMovie) {
            openMovieModal(Number(relatedMovie.dataset.id));
        }
    });

    // Modal close
    document.getElementById("modalClose")
        ?.addEventListener("click", closeMovieModal);

    document.getElementById("movieModal")
        ?.addEventListener("click", (e) => {
            if (e.target.id === "movieModal") {
                closeMovieModal();
            }
        });

    // Clear search
    document.getElementById("clearSearchBtn")
        ?.addEventListener("click", clearSearch);

    document.getElementById("resetBtn")
        ?.addEventListener("click", resetFilters);

    // Mobile menu
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuBtn.classList.toggle("active");
            mobileNav.classList.toggle("active");
        });

        document.querySelectorAll(".nav-mobile a")
            .forEach(link => {
                link.addEventListener("click", () => {
                    mobileMenuBtn.classList.remove("active");
                    mobileNav.classList.remove("active");
                });
            });
    }

    // Header scroll effect
    window.addEventListener("scroll", () => {
        const header = document.getElementById("header");

        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMovieModal();
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
    const container = document.querySelector(".genre-filter");

    if (!container) return;

    // Remove old generated buttons to prevent duplicates
    container.querySelectorAll(".genre-btn:not([data-genre='all'])")
        .forEach(btn => btn.remove());

    state.genres.forEach(genre => {
        const btn = document.createElement("button");

        btn.className = "genre-btn";
        btn.dataset.genre = genre;
        btn.textContent = genre;

        container.appendChild(btn);
    });

    updateGenreButtons();
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();

    state.searchTerm = searchTerm;
    state.activeGenre = "all";

    // Keep both search fields synchronized
    const headerSearch = document.getElementById("headerSearch");
    const heroSearch = document.getElementById("heroSearch");

    if (headerSearch && headerSearch !== e.target) {
        headerSearch.value = e.target.value;
    }

    if (heroSearch && heroSearch !== e.target) {
        heroSearch.value = e.target.value;
    }

    if (!searchTerm) {
        state.filteredMovies = [...movies];

        const searchInfo = document.getElementById("searchInfo");

        if (searchInfo) {
            searchInfo.style.display = "none";
        }
    } else {
        state.filteredMovies = movies.filter(movie => {
            return (
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.genre.toLowerCase().includes(searchTerm) ||
                movie.year.includes(searchTerm) ||
                movie.description.toLowerCase().includes(searchTerm)
            );
        });

        const searchTermElement = document.getElementById("searchTerm");
        const searchInfo = document.getElementById("searchInfo");

        if (searchTermElement) {
            searchTermElement.textContent = searchTerm;
        }

        if (searchInfo) {
            searchInfo.style.display = "block";
        }
    }

    updateGenreButtons();
    renderMovieGrid();
}

function clearSearch() {
    state.searchTerm = "";
    state.filteredMovies = [...movies];

    const searchInfo = document.getElementById("searchInfo");

    if (searchInfo) {
        searchInfo.style.display = "none";
    }

    const headerSearch = document.getElementById("headerSearch");
    const heroSearch = document.getElementById("heroSearch");

    if (headerSearch) headerSearch.value = "";
    if (heroSearch) heroSearch.value = "";

    updateGenreButtons();
    renderMovieGrid();
}

// ============================================
// FILTERING
// ============================================

function filterByGenre(genre) {
    state.activeGenre = genre;
    state.searchTerm = "";

    const headerSearch = document.getElementById("headerSearch");
    const heroSearch = document.getElementById("heroSearch");

    if (headerSearch) headerSearch.value = "";
    if (heroSearch) heroSearch.value = "";

    const searchInfo = document.getElementById("searchInfo");

    if (searchInfo) {
        searchInfo.style.display = "none";
    }

    if (genre === "all") {
        state.filteredMovies = [...movies];
    } else {
        state.filteredMovies = movies.filter(
            movie => movie.genre === genre
        );
    }

    updateGenreButtons();
    renderMovieGrid();
}

function updateGenreButtons() {
    document.querySelectorAll(".genre-btn").forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.genre === state.activeGenre
        );
    });
}

function resetFilters() {
    state.searchTerm = "";
    state.activeGenre = "all";
    state.filteredMovies = [...movies];

    const headerSearch = document.getElementById("headerSearch");
    const heroSearch = document.getElementById("heroSearch");
    const searchInfo = document.getElementById("searchInfo");

    if (headerSearch) headerSearch.value = "";
    if (heroSearch) heroSearch.value = "";

    if (searchInfo) {
        searchInfo.style.display = "none";
    }

    updateGenreButtons();
    renderMovieGrid();
}

// ============================================
// MOVIE CARD CREATION
// ============================================

function createMovieCard(movie) {
    const card = document.createElement("div");

    card.className = "movie-card";
    card.dataset.id = movie.id;

    card.innerHTML = `
        <div class="movie-poster-container">
            <img
                src="${movie.poster}"
                alt="${movie.title}"
                class="movie-poster"
                loading="lazy"
                onerror="this.onerror=null;this.src='https://placehold.co/300x450/1a1f3a/ffffff?text=No+Poster';"
            >

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
// RENDER RECOMMENDED MOVIES
// ============================================

function renderRecommended() {
    const container = document.getElementById("recommendedGrid");

    if (!container) return;

    container.innerHTML = "";

    const featured = movies.filter(movie => movie.featured);

    const recommended = featured.length
        ? featured
        : movies.slice(0, 3);

    recommended.forEach(movie => {
        container.appendChild(createMovieCard(movie));
    });
}

// ============================================
// RENDER MOVIE GRID
// ============================================

function renderMovieGrid() {
    const container = document.getElementById("movieGrid");
    const noResults = document.getElementById("noResults");

    if (!container) return;

    container.innerHTML = "";

    if (state.filteredMovies.length === 0) {
        if (noResults) {
            noResults.style.display = "block";
        }

        return;
    }

    if (noResults) {
        noResults.style.display = "none";
    }

    state.filteredMovies.forEach(movie => {
        container.appendChild(createMovieCard(movie));
    });
}

// ============================================
// MOVIE PLAYER / MODAL
// ============================================

function openMovieModal(movieId) {
    const movie = movies.find(m => m.id === movieId);

    if (!movie) return;

    state.currentMovie = movie;

    const title = document.getElementById("movieTitle");
    const year = document.getElementById("movieYear");
    const genre = document.getElementById("movieGenre");
    const description = document.getElementById("movieDescription");

    if (title) title.textContent = movie.title;
    if (year) year.textContent = movie.year;
    if (genre) genre.textContent = movie.genre;

    if (description) {
        description.textContent = movie.description;
    }

    const videoPlayer = document.getElementById("moviePlayer");

    if (videoPlayer) {
        videoPlayer.pause();

        videoPlayer.onerror = () => {
            console.error(
                "Video could not be loaded:",
                movie.title,
                movie.video
            );
        };

        videoPlayer.onloadedmetadata = () => {
            console.log(
                "Video loaded successfully:",
                movie.title,
                videoPlayer.duration
            );
        };

        videoPlayer.src = movie.video;
        videoPlayer.load();

        // Browser may block autoplay. User can press Play.
        const playPromise = videoPlayer.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Press Play to start the video.");
            });
        }
    }

    renderRelatedMovies(movieId);

    const modal = document.getElementById("movieModal");

    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeMovieModal() {
    const modal = document.getElementById("movieModal");

    if (modal) {
        modal.classList.remove("active");
    }

    document.body.style.overflow = "auto";

    const videoPlayer = document.getElementById("moviePlayer");

    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.removeAttribute("src");
        videoPlayer.load();
    }

    state.currentMovie = null;
}

// ============================================
// RELATED MOVIES
// ============================================

function renderRelatedMovies(currentMovieId) {
    const container = document.getElementById("relatedMovies");

    if (!container) return;

    container.innerHTML = "";

    const currentMovie = movies.find(
        movie => movie.id === currentMovieId
    );

    if (!currentMovie) return;

    const related = movies
        .filter(movie =>
            movie.id !== currentMovieId &&
            movie.genre === currentMovie.genre
        )
        .slice(0, 4);

    if (related.length < 4) {
        const remaining = movies
            .filter(movie =>
                movie.id !== currentMovieId &&
                !related.some(item => item.id === movie.id)
            )
            .slice(0, 4 - related.length);

        related.push(...remaining);
    }

    related.forEach(movie => {
        const item = document.createElement("div");

        item.className = "related-movie";
        item.dataset.id = movie.id;

        item.innerHTML = `
            <img
                src="${movie.poster}"
                alt="${movie.title}"
                loading="lazy"
                onerror="this.onerror=null;this.src='https://placehold.co/150x225/1a1f3a/ffffff?text=No+Poster';"
            >
        `;

        container.appendChild(item);
    });
}

// ============================================
// STATISTICS
// ============================================

function updateStats() {
    const movieCount = document.getElementById("movieCount");
    const genreCount = document.getElementById("genreCount");

    if (movieCount) {
        movieCount.textContent = movies.length;
    }

    if (genreCount) {
        genreCount.textContent = state.genres.length;
    }
}

// ============================================
// EXPORT MOVIE DATA (OPTIONAL)
// ============================================

console.log("Movie website loaded.");
console.log("Total movies:", movies.length);

/* =========================================================
   MOVIECLIPSHQ
   Movie library, search, genre filters, modal and player
   ========================================================= */


/* ---------------------------------------------------------
   1. MOVIE DATABASE

   Add or edit movies inside this array.

   IMPORTANT:
   - poster: A direct image URL.
   - youtubeId: The YouTube video ID (the part after "v=" or
     after "youtu.be/"). Leave "" if there's no video yet.
   - featured: true displays the movie in Featured Selections.
   --------------------------------------------------------- */

const movies = [
    {
        id: 1,
        title: "CHASE",
        year: "2024",
        genre: "Action",
        description: "Hollywood action full movie.",
        poster: "assets/posters/chase.jpg",
        youtubeId: "6vLVKZUVxWQ",
        featured: true
    },

    {
        id: 2,
        title: "Midnight Shadows",
        year: 2023,
        genre: "Thriller",
        description:
            "A mysterious story filled with unexpected turns, " +
            "suspense, and secrets waiting to be uncovered.",
        poster:
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: true
    },

    {
        id: 3,
        title: "Beyond the Stars",
        year: 2025,
        genre: "Sci-Fi",
        description:
            "An imaginative journey into the unknown, exploring " +
            "the future of humanity and the mysteries of space.",
        poster:
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: true
    },

    {
        id: 4,
        title: "A Summer to Remember",
        year: 2022,
        genre: "Romance",
        description:
            "A heartfelt story about love, memories, and the " +
            "unexpected moments that bring people together.",
        poster:
            "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: true
    },

    {
        id: 5,
        title: "The Last Detective",
        year: 2021,
        genre: "Crime",
        description:
            "A determined detective investigates a complicated " +
            "case that challenges everything he believes.",
        poster:
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: true
    },

    {
        id: 6,
        title: "Laugh Out Loud",
        year: 2024,
        genre: "Comedy",
        description:
            "A lighthearted comedy about friendship, embarrassing " +
            "situations, and hilarious misunderstandings.",
        poster:
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: false
    },

    {
        id: 7,
        title: "The Hidden Kingdom",
        year: 2023,
        genre: "Fantasy",
        description:
            "A magical adventure through an extraordinary world " +
            "of ancient kingdoms and mythical creatures.",
        poster:
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: false
    },

    {
        id: 8,
        title: "Into the Wild",
        year: 2020,
        genre: "Adventure",
        description:
            "An unforgettable expedition into the wilderness " +
            "where survival depends on courage and determination.",
        poster:
            "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: false
    },

    {
        id: 9,
        title: "Final Destination",
        year: 2022,
        genre: "Thriller",
        description:
            "A suspenseful tale in which a series of strange " +
            "events leads to a shocking discovery.",
        poster:
            "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: false
    },

    {
        id: 10,
        title: "Cosmic Horizon",
        year: 2025,
        genre: "Sci-Fi",
        description:
            "A science-fiction journey across distant galaxies " +
            "and unexplored worlds.",
        poster:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: false
    },

    {
        id: 11,
        title: "The Forgotten Case",
        year: 2021,
        genre: "Crime",
        description:
            "An old investigation is reopened, revealing " +
            "connections nobody expected.",
        poster:
            "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: false
    },

    {
        id: 12,
        title: "Forever Together",
        year: 2023,
        genre: "Romance",
        description:
            "Two people from different worlds discover that " +
            "love can change their lives.",
        poster:
            "https://images.unsplash.com/photo-1518621012118-6d6c9b8e6d9a?w=600&h=900&fit=crop",
        youtubeId: "",
        featured: false
    }
];


/* ---------------------------------------------------------
   2. DOM ELEMENTS
   --------------------------------------------------------- */

const headerSearch = document.getElementById("headerSearch");
const heroSearch = document.getElementById("heroSearch");

const movieGrid = document.getElementById("movieGrid");
const recommendedGrid = document.getElementById("recommendedGrid");

const genreFilter = document.querySelector(".genre-filter");

const searchInfo = document.getElementById("searchInfo");
const searchTerm = document.getElementById("searchTerm");

const clearSearchBtn = document.getElementById("clearSearchBtn");
const resetBtn = document.getElementById("resetBtn");
const ctaButton = document.getElementById("ctaButton");

const noResults = document.getElementById("noResults");

const movieCount = document.getElementById("movieCount");
const genreCount = document.getElementById("genreCount");

const modal = document.getElementById("movieModal");
const modalClose = document.getElementById("modalClose");

const moviePlayer = document.getElementById("moviePlayer");
const noVideoMessage = document.getElementById("noVideoMessage");

const movieTitle = document.getElementById("movieTitle");
const movieYear = document.getElementById("movieYear");
const movieGenre = document.getElementById("movieGenre");
const movieDescription = document.getElementById("movieDescription");

const relatedMovies = document.getElementById("relatedMovies");

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");


/* ---------------------------------------------------------
   3. APPLICATION STATE
   --------------------------------------------------------- */

let currentSearch = "";
let currentGenre = "all";
let currentMovieId = null;
let lastFocusedElement = null;


/* ---------------------------------------------------------
   4. HELPER FUNCTIONS
   --------------------------------------------------------- */

function getMovieById(id) {
    return movies.find(movie => movie.id === Number(id));
}

function createPoster(movie, className = "movie-poster") {
    const image = document.createElement("img");

    image.className = className;
    image.src = movie.poster || "";
    image.alt = `${movie.title} poster`;
    image.loading = "lazy";
    image.decoding = "async";

    image.onerror = function () {
        this.onerror = null;
        this.src =
            "https://placehold.co/600x900/0a0e27/ffffff?text=MovieClipsHQ";
    };

    return image;
}

function createButton(text, className, callback) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = className;
    button.textContent = text;

    button.addEventListener("click", callback);

    return button;
}


/* ---------------------------------------------------------
   5. GENRE FILTERS
   --------------------------------------------------------- */

function getGenres() {
    return [...new Set(
        movies.map(movie => movie.genre).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));
}

function renderGenreFilters() {
    const genres = getGenres();

    genreFilter.replaceChildren();

    const allButton = createButton("All", "genre-btn", () => setGenre("all"));
    allButton.dataset.genre = "all";
    genreFilter.appendChild(allButton);

    genres.forEach(genre => {
        const button = createButton(genre, "genre-btn", () => setGenre(genre));
        button.dataset.genre = genre;
        genreFilter.appendChild(button);
    });

    updateGenreButtons();
}

function updateGenreButtons() {
    const buttons = genreFilter.querySelectorAll(".genre-btn");

    buttons.forEach(button => {
        const active = button.dataset.genre === currentGenre;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
}

function setGenre(genre) {
    currentGenre = genre;

    updateGenreButtons();
    renderMovies();

    document.getElementById("movies").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ---------------------------------------------------------
   6. MOVIE CARD CREATION
   --------------------------------------------------------- */

function createMovieCard(movie, featured = false, index = 0) {
    const card = document.createElement("article");

    card.className = featured
        ? "movie-card recommended-card"
        : "movie-card";

    card.style.setProperty("--stagger", index);

    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${movie.title}`);
    card.dataset.movieId = movie.id;

    const posterWrapper = document.createElement("div");
    posterWrapper.className = "movie-poster-wrapper";
    posterWrapper.appendChild(createPoster(movie));

    const overlay = document.createElement("div");
    overlay.className = "movie-overlay";

    const playBtn = document.createElement("span");
    playBtn.className = "movie-play-btn";

    const playText = document.createElement("span");
    playText.className = "movie-play";
    playText.textContent = movie.youtubeId ? "Watch Clip" : "View Details";

    overlay.append(playBtn, playText);
    posterWrapper.appendChild(overlay);

    const info = document.createElement("div");
    info.className = "movie-info";

    const title = document.createElement("h3");
    title.className = "movie-title";
    title.textContent = movie.title;

    const metadata = document.createElement("div");
    metadata.className = "movie-metadata";

    const year = document.createElement("span");
    year.className = "movie-year";
    year.textContent = movie.year;

    const genre = document.createElement("span");
    genre.className = "movie-genre";
    genre.textContent = movie.genre;

    metadata.append(year, genre);

    const description = document.createElement("p");
    description.className = "movie-description";
    description.textContent = movie.description;

    info.append(title, metadata, description);
    card.append(posterWrapper, info);

    card.addEventListener("click", () => openMovieModal(movie.id));

    card.addEventListener("keydown", event => {
        if (event.target === card && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            openMovieModal(movie.id);
        }
    });

    return card;
}


/* ---------------------------------------------------------
   7. FEATURED MOVIES
   --------------------------------------------------------- */

function renderRecommended() {
    recommendedGrid.replaceChildren();

    const featuredMovies = movies.filter(movie => movie.featured);

    if (featuredMovies.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Featured movies will appear here.";
        recommendedGrid.appendChild(message);
        return;
    }

    featuredMovies.forEach((movie, index) => {
        recommendedGrid.appendChild(createMovieCard(movie, true, index));
    });
}


/* ---------------------------------------------------------
   8. SEARCH AND FILTERING
   --------------------------------------------------------- */

function getFilteredMovies() {
    const query = currentSearch.trim().toLowerCase();

    return movies.filter(movie => {
        const matchesGenre =
            currentGenre === "all" ||
            movie.genre.toLowerCase() === currentGenre.toLowerCase();

        const searchableText = [
            movie.title, movie.genre, movie.year, movie.description
        ].join(" ").toLowerCase();

        const matchesSearch = query === "" || searchableText.includes(query);

        return matchesGenre && matchesSearch;
    });
}

function renderMovies() {
    movieGrid.replaceChildren();

    const filteredMovies = getFilteredMovies();

    filteredMovies.forEach((movie, index) => {
        movieGrid.appendChild(createMovieCard(movie, false, index));
    });

    noResults.style.display = filteredMovies.length === 0 ? "block" : "none";

    const hasSearch = currentSearch.trim().length > 0;
    searchInfo.style.display = hasSearch ? "flex" : "none";
    searchTerm.textContent = currentSearch;

    headerSearch.value = currentSearch;
    heroSearch.value = currentSearch;
}

function handleSearch(value) {
    currentSearch = value;
    renderMovies();
}


/* ---------------------------------------------------------
   9. SEARCH EVENT LISTENERS
   --------------------------------------------------------- */

headerSearch.addEventListener("input", event => handleSearch(event.target.value));
heroSearch.addEventListener("input", event => handleSearch(event.target.value));

clearSearchBtn.addEventListener("click", () => {
    currentSearch = "";
    headerSearch.value = "";
    heroSearch.value = "";
    renderMovies();
    heroSearch.focus();
});

resetBtn.addEventListener("click", () => {
    currentSearch = "";
    currentGenre = "all";
    headerSearch.value = "";
    heroSearch.value = "";
    updateGenreButtons();
    renderMovies();
});

ctaButton.addEventListener("click", () => {
    document.getElementById("movies").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


/* ---------------------------------------------------------
   10. MOVIE MODAL (YouTube iframe player)
   --------------------------------------------------------- */

function openMovieModal(id) {
    const movie = getMovieById(id);
    if (!movie) return;

    currentMovieId = movie.id;
    lastFocusedElement = document.activeElement;

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;
    movieGenre.textContent = movie.genre;
    movieDescription.textContent = movie.description;

    if (movie.youtubeId && movie.youtubeId.trim() !== "") {
        moviePlayer.src =
            `https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1&rel=0`;
        moviePlayer.style.display = "block";
        noVideoMessage.style.display = "none";
    } else {
        moviePlayer.src = "";
        moviePlayer.style.display = "none";
        noVideoMessage.style.display = "flex";
    }

    renderRelatedMovies(movie);

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modalClose.focus();
}

function closeMovieModal() {
    if (!modal.classList.contains("active")) return;

    moviePlayer.src = "";

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    currentMovieId = null;

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

modalClose.addEventListener("click", closeMovieModal);

modal.addEventListener("click", event => {
    if (event.target === modal) closeMovieModal();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeMovieModal();
    }
});


/* ---------------------------------------------------------
   11. RELATED MOVIES
   --------------------------------------------------------- */

function renderRelatedMovies(movie) {
    relatedMovies.replaceChildren();

    const related = movies
        .filter(item => item.id !== movie.id && item.genre === movie.genre)
        .slice(0, 4);

    if (related.length < 4) {
        const additionalMovies = movies.filter(item =>
            item.id !== movie.id &&
            !related.some(relatedMovie => relatedMovie.id === item.id)
        );

        related.push(...additionalMovies.slice(0, 4 - related.length));
    }

    if (related.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No related movies available.";
        relatedMovies.appendChild(message);
        return;
    }

    related.forEach((relatedMovie, index) => {
        const card = document.createElement("div");

        card.className = "related-card";
        card.style.setProperty("--stagger", index);
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View ${relatedMovie.title}`);

        const image = createPoster(relatedMovie, "related-poster");

        const title = document.createElement("p");
        title.className = "related-movie-title";
        title.textContent = relatedMovie.title;

        card.append(image, title);

        card.addEventListener("click", () => openMovieModal(relatedMovie.id));

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openMovieModal(relatedMovie.id);
            }
        });

        relatedMovies.appendChild(card);
    });
}


/* ---------------------------------------------------------
   12. MOBILE NAVIGATION
   --------------------------------------------------------- */

function closeMobileMenu() {
    mobileNav.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
}

mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active", isOpen);
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});


/* ---------------------------------------------------------
   13. HEADER SCROLL EFFECT
   --------------------------------------------------------- */

window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });


/* ---------------------------------------------------------
   14. SCROLL-REVEAL ANIMATIONS
   --------------------------------------------------------- */

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

function observeReveals() {
    document
        .querySelectorAll(".reveal, .movie-card")
        .forEach(element => revealObserver.observe(element));
}


/* ---------------------------------------------------------
   15. ABOUT STATISTICS
   --------------------------------------------------------- */

function animateCount(element, target) {
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(eased * target);

        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

function updateStatistics() {
    animateCount(movieCount, movies.length);
    animateCount(genreCount, getGenres().length);
}


/* ---------------------------------------------------------
   16. CURRENT YEAR
   --------------------------------------------------------- */

const currentYearElement = document.getElementById("currentYear");
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   17. INITIALIZE WEBSITE
   --------------------------------------------------------- */

function initializeWebsite() {
    renderGenreFilters();
    renderRecommended();
    renderMovies();
    updateStatistics();

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    observeReveals();

    console.log("MovieClipsHQ initialized successfully.");
}

initializeWebsite();

/* =========================================================
   END OF MOVIECLIPSHQ SCRIPT
   ========================================================= */

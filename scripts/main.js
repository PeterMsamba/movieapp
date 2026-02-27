

const OMDB_API_KEY = 'bf69b293';
const TMDB_API_KEY = '2f755b3da2b2a848f9b9d8b2463fede0';

document.getElementById('search-btn').addEventListener('click', () => {
  const movieTitle = document.getElementById('movie-input').value;
  if (movieTitle) fetchMovieData(movieTitle);
});

async function fetchMovieData(title) {
  // Added "/?apikey=" and the "$" symbol
  const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`);
  const data = await response.json();

  if (data.Response === "True") {
    displayMovie(data);
    fetchTrailer(data.imdbID);
  } else {
    document.getElementById('result').innerHTML = `<p>Movie not found!</p>`;
    document.getElementById('trailer-container').innerHTML = '';
  }
}

async function fetchTrailer(imdbId) {
  // Added "/3/find/", the "$" symbol, and the required external_source param
  const findUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`;
  const findRes = await fetch(findUrl);
  const findData = await findRes.json();

  // TMDb returns results in an array
  const movie = findData.movie_results[0];
  if (movie) {
    const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`;
    const videoRes = await fetch(videoUrl);
    const videoData = await videoRes.json();
    const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");

    if (trailer) {
      // Added "/embed/" and the "$" symbol
      document.getElementById('trailer-container').innerHTML = `
                <h3>Official Trailer</h3>
                <iframe src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      document.getElementById('trailer-container').innerHTML = `<p>No trailer found.</p>`;
    }
  }
}

function displayMovie(movie) {
  document.getElementById('result').innerHTML = `
        <div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><strong>Rating:</strong> ${movie.imdbRating}</p>
            <p>${movie.Plot}</p>
        </div>`;
}

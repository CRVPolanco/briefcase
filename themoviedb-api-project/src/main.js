const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },  
    params: {   
        'api_key': api_key,
    },
})

const moviesCreator = (movies,container) =>{
    container.innerHTML = "";
    movies.map(movie=>{
        
        const createArticle = document.createElement('article');
        createArticle.classList.add('card');
        createArticle.addEventListener('click', () =>{
            location.hash = `#movieDetails=${movie.id}`
        });

        const createImg = document.createElement('img');
        createImg.setAttribute('alt', movie.title);
        createImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        createImg.classList.add('card--img-card');

        const createNameMovie = document.createElement('p');
        createNameMovie.classList.add('card--text-card');
        const createNameMovieText = document.createTextNode(movie.title);
        createNameMovie.appendChild(createNameMovieText);
        createArticle.appendChild(createImg);
        createArticle.appendChild(createNameMovie);
        container.appendChild(createArticle);
    });
}
const createCategories = (genre, container) => { 

    container.innerHTML = "";
    genre.map(element=>{

        const createDiv = document.createElement('div');
        createDiv.classList.add('genres-in-movie--container');

        const createSpan1 = document.createElement('span');
        createSpan1.classList.add('genre-color-icon');
        createSpan1.setAttribute('id', `id${element.id}`);
        const createSpan2 = document.createElement('span');
        createSpan2.classList.add('genre-name');
        const createSpanText = document.createTextNode(element.name);

        createSpan2.appendChild(createSpanText);
        createDiv.appendChild(createSpan1);
        createDiv.appendChild(createSpan2);
        container.appendChild(createDiv);

    })
}
const getTodayPreviewMovies = async () =>{

    const { data } = await api('trending/movie/day');
    const movies = data.results;
    
        moviesCreator(movies, getTrendingMoviesSection);
        
}
const getWeekPreviewMovies = async () =>{

    const { data } = await api('trending/movie/week');
    const movies = data.results;

    moviesCreator(movies, getTrendingMoviesSectionWeek);

}
const getTodayMovies = async () =>{
    const { data } = await api('trending/movie/day');
    const movies = data.results;

        const trendingToday = document.querySelector('.trends-today--section .title-and-container .trends-today--cards-container');
    
    moviesCreator(movies, trendingToday);

}
const getWeekMovies = async () =>{
    const { data } = await api('trending/movie/week');
    const movies = data.results;

    moviesCreator(movies, trendingWeekSection);
    
}
const getAllGenres = async () =>{

    const {data} = await api('genre/movie/list');
    const genre = data.genres;

    genreSection.innerHTML="";

    genre.map(element=>{

        const createDiv = document.createElement('div');
        createDiv.classList.add('genresSection--cardContainer');

        const createSpanColor = document.createElement('span');
        createSpanColor.classList.add('genres-color');
        createSpanColor.setAttribute('id', 'id'+element.id);
        createSpanColor.addEventListener('click', () =>{
            location.hash = `#category=${element.id}-${element.name}`;
        })

        const createSpanName = document.createElement('span');
        createSpanName.classList.add('genres-name');
        createSpanName.addEventListener('click', () =>{
            location.hash = `#category=${element.id}-${element.name}`;
        })
        const createSpanNameText = document.createTextNode(element.name);

        createSpanName.appendChild(createSpanNameText);
        createDiv.appendChild(createSpanColor);
        createDiv.appendChild(createSpanName);
        genreSection.appendChild(createDiv);
    })
} 
const getGenreSection = async (id) =>{
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;
    console.log(movies);

    containerOfMoviesFromGenreSection.innerHTML = '';

    movies.forEach(movie=>{

        const createArticle = document.createElement('article');
        createArticle.classList.add('card');
        createArticle.addEventListener('click', () =>{
            location.hash = `#movieDetails=${movie.id}`
            console.log('clickCorrecto')
        });

        const createImg = document.createElement('img');
        createImg.classList.add('movie-per-category--card-img-card');
        createImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        const createP = document.createElement('p');
        createP.classList.add('movie-per-category--card-text-card');
        const createPText = document.createTextNode(movie.title);
        createP.appendChild(createPText);

        createArticle.appendChild(createImg);
        createArticle.appendChild(createP);
        containerOfMoviesFromGenreSection.appendChild(createArticle);
    })
    
}
const searchMovieBySearch = async (query) =>{
    const {data} = await api('search/movie', {
        params: {
            query,
        }
    });
    const searchMovie = data.results;

    searchSectionCardsContainer.innerHTML = "";

    searchMovie.map(movie=>{
        const createArticle = document.createElement('article');
        createArticle.classList.add('searchZone--card');
        createArticle.addEventListener('click', () =>{
            location.hash = `#movieDetails=${movie.id}`
        });

        const createImg = document.createElement('img');
        createImg.classList.add('searchZone--card-img-card');
        createImg.setAttribute('alt', movie.title);
        createImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        const createP = document.createElement('p');
        createP.classList.add('searchZone--card-text-card');
        const createPText = document.createTextNode(movie.title); 
        createP.appendChild(createPText);

        createArticle.appendChild(createImg);
        createArticle.appendChild(createP);
        searchSectionCardsContainer.appendChild(createArticle);

    })


}

const getMovieDetails = async (id) =>{

    const {data : movie} = await api(`movie/${id}`);

    movieDetailsTitle.textContent = movie.title;
    movieDetailsOverview.textContent = movie.overview;
    movieDetailsStarAverage.textContent = movie.vote_average;
    movieDetailsTotalCounts.textContent = movie.vote_count;
    movieDetailsReleaseDate.textContent = movie.release_date;
    posterImg.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`)

    createCategories(movie.genres, genreInMovieContainer);

}
const getRelatedMovies = async (id) =>{
    const {data} = await api(`movie/${id}/recommendations`);
    const movies = data.results;

    relatedMoviesContainer.innerHTML = "";

    movies.map(element =>{
        const createArticle = document.createElement('article');
        createArticle.classList.add('relatedMovies--card');
        createArticle.addEventListener('click', () =>{
            location.hash = `#movieDetails=${element.id}`
            console.log('clickCorrecto')
        });

        const createImg = document.createElement('img');
        createImg.classList.add('relatedMovies--card-img-card');
        createImg.setAttribute('src', `https://image.tmdb.org/t/p/w500${element.poster_path}`);
        const createP = document.createElement('p');
        const createPText = document.createTextNode(element.title);
        createP.classList.add('relatedMovies--card-text-card');
        createP.appendChild(createPText);

        createArticle.appendChild(createImg);
        createArticle.appendChild(createP);
        relatedMoviesContainer.appendChild(createArticle);

    })

}

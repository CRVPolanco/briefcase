//home page
//nav

const headerSection = document.querySelector('header');
const getTrendingMoviesSection = document.querySelector('#todaySection .container-cards--card');
const getTrendingMoviesSectionWeek = document.querySelector('#weekSection .container-cards--card');
const previewTodaySection = document.querySelector('#todaySection');
const previewWeekSection = document.querySelector('#weekSection');
const allGenreSection = document.querySelector('#genresSection');
const genreSection = document.querySelector('#genresSection .genresSection--container');
const menuSection = document.querySelector('#menu-section');
const trendsToday = document.querySelector('.trends-today--section');
const trendingTodaySection = document.querySelector('.trends-today--section .title-and-container .trends-today--cards-container');
const trendingWeekSection = document.querySelector('.trends-week--section .title-and-container .trends-week--cards-container');
const trendsWeek = document.querySelector('.trends-week--section');
const movieDtls = document.querySelector('#movieDetails--section');
const genresSectionPage = document.querySelector('.movie-per-category');
const SearchSection = document.querySelector('#searchZone');
const searchSectionCardsContainer = document.querySelector('#searchZone .searchZone-cards--container');

const arrowReturnHome = document.querySelector('#menu-section .menu-section--return-home .return-home--icon');
const homeTodayReturnIcon = document.querySelector('.trends-today--section .home-icon');
const homeWeekReturnIcon = document.querySelector('.trends-week--section .home-icon');
const homeMovieDetailsIcon = document.querySelector('.movieDetails--section .movie-details--img .movie-details--return-home-icon');
const returnHomeIconCategoryGenre = document.querySelector('#movie-per-category .return-home--icon');
const returnHomeSearchSection = document.querySelector('#searchZone .return-home--icon');
const containerOfMoviesFromGenreSection = document.querySelector('.movie-per-category .movie-per-category--card-container');


const buttonSeeMoreToday = document.querySelector('#seeMoreButtonToday');
const buttonSeeMoreWeek = document.querySelector('#seeMoreButtonWeek');

const menuZoneTrendsToday = document.querySelector('#option-lists--today');
const menuZoneTrendsWeek = document.querySelector('#option-lists--week');

const titleOfGenreSection = document.querySelector('.movie-per-category .movie-per-category--category-title');

const headerSearchButton = document.querySelector('#searchButton');
const headerInputSearch = document.querySelector('#inputSearch');

const titleSearchSection = document.querySelector('.searchZone--title');

const posterImg = document.querySelector('#movieDetails--section .movie-details--img .poster-img');
const movieDetailsTitle = document.querySelector('#movieDetails--section .movie-details--title-subtitle .movie-details--title');
const movieDetailsOverview = document.querySelector('#movieDetails--section .movie-details--title-subtitle .movie-details--subtitle');
const movieDetailsStarAverage = document.querySelector('#movieDetails--section .star-count .star-rate');
const movieDetailsReleaseDate = document.querySelector('#movieDetails--section .movie-details--info .date-time-cont .date-time');
const movieDetailsTotalCounts = document.querySelector('#movieDetails--section .movie-details--info .favorite-cont .favorite-count');

const genreInMovieContainer = document.querySelector('.genres-in-movie');
const relatedMoviesContainer = document.querySelector('.relatedMovies');
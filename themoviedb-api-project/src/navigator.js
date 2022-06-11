const navigationsHashes = () =>{

    if(location.hash.startsWith('#trendsToday')){
        trendsTodayPage();
    }else if(location.hash.startsWith('#trendsWeek')){
        trendsWeekPage();
    }else if(location.hash.startsWith('#menu')){
        menuZone();
    }else if(location.hash.startsWith('#movieDetails=')){
        movieDetails();
    }else if(location.hash.startsWith('#category=')){
        categoryPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else{
        homePage();
    }
    window.scrollTo(0,0);
}

function trendsTodayPage(){

    console.log('trendsPage.');

    headerSection.classList.remove('inactive');
    previewTodaySection.classList.add('inactive');
    previewWeekSection.classList.add('inactive');
    genreSection.classList.add('inactive');
    menuSection.classList.add('inactive');
    trendsToday.classList.remove('inactive');
    trendsWeek.classList.add('inactive');
    allGenreSection.classList.add('inactive');
    movieDtls.classList.add('inactive');
    genresSectionPage.classList.add('inactive');
    SearchSection.classList.add('inactive');

    getTodayMovies();

}
function trendsWeekPage(){

    console.log('trendsPage.');

    headerSection.classList.remove('inactive');
    previewTodaySection.classList.add('inactive');
    previewWeekSection.classList.add('inactive');
    genreSection.classList.add('inactive');
    menuSection.classList.add('inactive');
    trendsToday.classList.add('inactive');
    trendsWeek.classList.remove('inactive');
    movieDtls.classList.add('inactive');
    genreSection.classList.add('inactive');
    allGenreSection.classList.add('inactive');
    genresSectionPage.classList.add('inactive');
    SearchSection.classList.add('inactive');

    getWeekMovies();

}
function menuZone(){
    console.log('menuZone.');

    headerSection.classList.add('inactive');
    previewTodaySection.classList.add('inactive');
    previewWeekSection.classList.add('inactive');
    genreSection.classList.add('inactive');
    menuSection.classList.remove('inactive');
    trendsToday.classList.add('inactive');
    trendsWeek.classList.add('inactive');
    allGenreSection.classList.add('inactive');
    homeMovieDetailsIcon.classList.add('inactive');
    movieDtls.classList.add('inactive');
    genresSectionPage.classList.add('inactive');
    SearchSection.classList.add('inactive');

}
function homePage(){

    console.log('homePage.');

    headerSection.classList.remove('inactive');
    previewTodaySection.classList.remove('inactive');
    previewWeekSection.classList.remove('inactive');
    genreSection.classList.remove('inactive');
    menuSection.classList.add('inactive');
    trendsToday.classList.add('inactive');
    trendsWeek.classList.add('inactive');
    homeMovieDetailsIcon.classList.add('inactive');
    movieDtls.classList.add('inactive');
    allGenreSection.classList.remove('inactive');
    genresSectionPage.classList.add('inactive');
    SearchSection.classList.add('inactive');


    getTodayPreviewMovies();
    getWeekPreviewMovies();
    getAllGenres();

}
function movieDetails(){

    console.log('movieDetails');

    headerSection.classList.add('inactive');
    previewTodaySection.classList.add('inactive');
    previewWeekSection.classList.add('inactive');
    genreSection.classList.add('inactive');
    menuSection.classList.add('inactive');
    trendsToday.classList.add('inactive');
    trendsWeek.classList.add('inactive');
    allGenreSection.classList.add('inactive');
    genresSectionPage.classList.add('inactive');
    homeMovieDetailsIcon.classList.remove('inactive');
    homeMovieDetailsIcon.classList.remove('inactive');
    movieDtls.classList.remove('inactive');
    SearchSection.classList.add('inactive');
    
    const [name, movieId] = location.hash.split('=');
    getMovieDetails(movieId);
    getRelatedMovies(movieId);

}

function categoryPage(){

    console.log('movieDetails');

    headerSection.classList.remove('inactive');
    previewTodaySection.classList.add('inactive');
    previewWeekSection.classList.add('inactive');
    genreSection.classList.add('inactive');
    menuSection.classList.add('inactive');
    trendsToday.classList.add('inactive');
    trendsWeek.classList.add('inactive');
    allGenreSection.classList.add('inactive');
    movieDtls.classList.add('inactive');
    genresSectionPage.classList.remove('inactive');
    SearchSection.classList.add('inactive');

    const [_, data] = location.hash.split('=') 
    console.log(data);
    const [categoryId, categoryName] = data.split('-');

    getGenreSection(categoryId);
    titleOfGenreSection.innerHTML = categoryName;

}

function searchPage(){
    console.log('searchSection');

    headerSection.classList.remove('inactive');
    previewTodaySection.classList.add('inactive');
    previewWeekSection.classList.add('inactive');
    genreSection.classList.add('inactive');
    menuSection.classList.add('inactive');
    trendsToday.classList.add('inactive');
    trendsWeek.classList.add('inactive');
    allGenreSection.classList.add('inactive');
    movieDtls.classList.add('inactive');
    genresSectionPage.classList.add('inactive');
    SearchSection.classList.remove('inactive');

    const [_, query] = location.hash.split('=');

    titleSearchSection.innerHTML = query;
    searchMovieBySearch(query);


}
window.addEventListener('DOMContentLoaded', navigationsHashes, false);
window.addEventListener('hashchange', navigationsHashes, false);

const menuIcon = document.getElementById('menu-icon');

menuIcon.addEventListener('click',() => {
    location.hash = '#menu';
});
arrowReturnHome.addEventListener('click', () =>{
    location.hash = '#home';
});
buttonSeeMoreToday.addEventListener('click', () =>{
    location.hash = 'trendsToday';
});
buttonSeeMoreWeek.addEventListener('click', () =>{
    location.hash = 'trendsWeek';
});
menuZoneTrendsToday.addEventListener('click', () =>{
    location.hash = 'trendsToday'
})
menuZoneTrendsWeek.addEventListener('click', () =>{
    location.hash = 'trendsWeek'
})
homeTodayReturnIcon.addEventListener('click', () =>{
    location.hash = '#home';
})
homeWeekReturnIcon.addEventListener('click', () =>{
    location.hash = '#home';
})
homeMovieDetailsIcon.addEventListener('click', () =>{
    history.back();
})
returnHomeIconCategoryGenre.addEventListener('click', () =>{
    location.hash = '#home';
})
returnHomeSearchSection.addEventListener('click', () =>{
    //Retornar a la pagina o búsqueda anterior.
    history.back();
})
headerSearchButton.addEventListener('click', () =>{
    location.hash = `#search=${headerInputSearch.value}`
})
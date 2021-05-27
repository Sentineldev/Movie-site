
//Seleccion de las etiquetas del html
const key = '2db38458'
const movie_id = window.location.pathname.split('/')[1] //tomar el id que se encuentra dentro de la ruta
const url = 'http://www.omdbapi.com/?i='+movie_id+'&apikey='+key+'&type=movie'+'&plot=full'
const page_title = document.querySelector('head title')
const movie_poster = document.querySelector('img')
const movie_plot = document.querySelector('p')
const movie_header = document.querySelector('header')
const movie_actor_list = document.querySelector('.actors-list')
const movie_director_list = document.querySelector('.director-list')
const movie_writer_list = document.querySelector('.writer-list')
const movie_production_list= document.querySelector('.production-list')
const movie_box_office = document.querySelector('.box-office')
const movie_ratings_list = document.querySelector('.ratings-list')
const movie_genre = document.querySelector('.genre')
const movie_released = document.querySelector('.released')
const movie_dvd_released = document.querySelector('.dvd-released')
const page_select = document.querySelector('.content')
const page_footer = document.querySelector('footer')
const page_preloader = document.querySelector('.preloader')
const page_header = document.querySelector('header')


//Mostrar la informacion que se obtuvo de la peticion a la api
function render(movie){
    const director_list_template = movie.Director.split(',').map(director => '<li>'+director+'</li>')
    const actor_list_template = movie.Actors.split(',').map(actor => '<li>'+actor+'</li>')
    const writer_list_template = movie.Writer.split(',').map(writer => '<li>'+writer+'</li>')
    const proudction_list_template = movie.Production.split(',').map(prod => '<li>'+prod+'</li>')
    const ratings_list_template = movie.Ratings.map(rating => '<li>'+rating.Source+' - '+rating.Value+'</li>')
    movie_genre.innerText = movie.Genre
    movie_released.innerText = movie.Released
    movie_dvd_released.innerText = movie.DVD
    movie_ratings_list.innerHTML = ratings_list_template.join('')
    movie_box_office.innerText = movie.BoxOffice
    movie_production_list.innerHTML = proudction_list_template.join('')
    movie_writer_list.innerHTML = writer_list_template.join('')
    movie_director_list.innerHTML = director_list_template.join('')
    movie_actor_list.innerHTML = actor_list_template.join('')
    movie_header.innerHTML = movie.Title+' - '+movie.Year
    movie_plot.innerText = movie.Plot
    movie_poster.src = movie.Poster
    page_title.innerHTML = movie.Title

}
//hacer peticion a la api y obtener la informacion
async function get_movie(url){
    const request = await fetch(url)
    const movie = await request.json()         
    if(movie.Response === 'False'){
        window.location = window.origin
    }
    else{
        return movie
    }
}

//colocar el style del body en none, mientras se hace la peticion a la api y luego mostrar todo
window.onload = async () =>{
    page_select.style.display = 'none'
    page_footer.style.display = 'none'
    page_header.style.display = 'none'
    let movie = await get_movie(url)
    if(movie.Response === 'False'){
        console.log(window.origin)
        window.location = window.origin
    }
    else{
        page_select.style.display = ''
        page_footer.style.display = ''
        page_preloader.style.display = 'none'
        page_header.style.display = ''
        render(movie)
    }
}
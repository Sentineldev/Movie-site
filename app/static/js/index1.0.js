//Seleccion de etiquetas dentro del html y establecimiento de la url por  default para mostrar contenido

const key = '2db38458'
const input = document.querySelector('input')
const button = document.querySelector('.search-button')
let url = 'https://www.omdbapi.com/'+'?s='+'Harry Potter'+'&apikey='+key
const movies_container = document.querySelector('.movie-container')
const error_message = document.querySelector('#error-message')
const preloader = document.querySelector('.preloader-box')
const model_box = document.querySelector('.model-box')
const model_title = document.querySelector('.model-title')
const model_description = document.querySelector('.model-description')
const model_link = document.querySelector('.link')
const model_img = document.querySelector('.model-image')
const model_close = document.querySelector('#close-model')
let poster_template = []

//Mostrar contenido al presionar enter
async function search(event){
   if(event.key == 'Enter'){
      preloader.style.display = ''
      movies_container.style.display = 'none'
      url = 'https://www.omdbapi.com/'+'?s='+input.value+'&apikey='+key+'&type=movie'
      const movies = await request_movie(url)
      if(movies.Response === 'False'){
         error_message.innerText = 'Movie not found'
         preloader.style.display = 'none'
         console.log('hola')
         setInterval(() => {
            error_message.innerText = ''
         }, 5000);
      }
      else{
         render(movies)
      }
   }
}

//Mostrar contenido al hacer click en el boton
button.addEventListener('click',async  () =>{
   preloader.style.display = ''
   movies_container.style.display = 'none'
   url = 'https://www.omdbapi.com/'+'?s='+input.value+'&apikey='+key+'&type=movie'
   const movies = await request_movie(url)
   if(movies.Response === 'False'){
      error_message.innerText = 'Movie not found'
      preloader.style.display = 'none'
      setInterval(() => {
         error_message.innerText = ''
      }, 5000);
   }
   else{
      render(movies)
   }
})
//Hacer request a la api
async function request_movie(url){
   let request = await fetch(url)
   request = await request.json()
   return request
}

//Cerrar model
function close_model(event){
   model_box.style.display = 'none'
}

//Enviar a otra ruta junto con el id de la pelicula seleccionada y mostrar informacion
function redirecTo(movies){
   const imgs = document.querySelectorAll('img')
   imgs.forEach((element,index)=>{
      element.addEventListener('click',async()=>{
         const movie_id = movies.Search[index-1].imdbID
         const fetch_url = 'https://www.omdbapi.com/?i='+movie_id+'&apikey='+key
         let movie_data = await fetch(fetch_url)
         movie_data = await movie_data.json()
         model_title.innerText = movie_data.Title
         model_description.innerText = movie_data.Plot
         model_img.src = movie_data.Poster
         model_link.href = window.origin+'/'+movie_data.imdbID
         model_box.style.display = 'block'
         const redirectUrl = window.origin+'/'+movies.Search[index].imdbID
      })
   })
}
//Mostrar los posters de las peliculas
function render(movies){
   preloader.style.display = 'none'
   movies_container.style.display = ''
   const movies_template = movies.Search.map(movie => '<img class="card" src="'+movie.Poster+'">')
   movies_container.innerHTML = movies_template.join('')
   redirecTo(movies)
}
//Renderizar los posters de la url establecida
window.onload = async () =>{
   const form = document.querySelector('form')
   form.onsubmit = (e) =>{
      e.preventDefault()
   }
   let movies = await request_movie(url)
   render(movies)
}
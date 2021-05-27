//Seleccion de etiquetas dentro del html y establecimiento de la url por  default para mostrar contenido

const key = '2db38458'
const input = document.querySelector('input')
const button = document.querySelector('button')
let url = 'https://www.omdbapi.com/'+'?s='+'Harry Potter'+'&apikey='+key+'&type=movie'
const contenido = document.querySelector('.content')
const content = document.querySelector('.content')
const error_message = document.querySelector('#error-message')
const preloader = document.querySelector('.preloader-box')
const model_box = document.querySelector('.model-box')
const model_title = document.querySelector('.model-title')
const model_description = document.querySelector('.model-description')
const model_link = document.querySelector('.link')
const model_close = document.querySelector('#close-model')
const model_img = document.querySelector('.model-image')
let poster_template = []

//Mostrar contenido al presionar enter
async function search(event){
   if(event.key == 'Enter'){
      preloader.style.display = ''
      content.style.display = 'none'
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
   }
}

//Mostrar contenido al hacer click en el boton
button.addEventListener('click',async  () =>{
   preloader.style.display = ''
   content.style.display = 'none'
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
   const request = await fetch(url)
   const movie = await request.json()
   return movie
}

function close_model(){
   model_close.addEventListener('click',(event)=>{
      event.preventDefault()
      model_box.style.display = 'none'
   })
}

//Enviar a otra ruta junto con el id de la pelicula seleccionada y mostrar informacion
function redirecTo(movies){
   const imgs = document.querySelectorAll('img')
   imgs.forEach((element,index)=>{
      element.addEventListener('click',async()=>{
         const movie_id = movies.Search[index].imdbID
         const fetch_url = 'https://www.omdbapi.com/?i='+movie_id+'&apikey='+key
         let movie_data = await fetch(fetch_url)
         movie_data = await movie_data.json()
         model_title.innerText = movie_data.Title
         model_description.innerText = movie_data.Plot
         model_img.src = movie_data.Poster
         model_link.href = window.origin+'/'+movies.Search[index].imdbID
         model_box.style.display = 'block'
         close_model()
         //const redirectUrl = window.origin+'/'+movies.Search[index].imdbID
         //window.open(redirectUrl)
      })
   })
}
//Mostrar los posters de las peliculas
function render(movies){
   preloader.style.display = 'none'
   content.style.display = ''
   const movies_template = movies.Search.map(movie =>{
      const movie_poster = '<img src="'+movie.Poster+'">'
      const card = '<div class="card">'+movie_poster+'</div>'
      return card
   })
   contenido.innerHTML = movies_template.join('')
   redirecTo(movies)
}
//Renderizar los posters de la url establecida
window.onload = async () =>{
   let movies = await request_movie(url)
   if(movies.Response === 'False'){
      error_message.innerText = 'Error. Reload the page'
      setInterval(() => {
         error_message.innerText = ''
      }, 5000);
   }
   else{
      render(movies)
   }
}
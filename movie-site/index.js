key = '2db38458'
//const url = 'http://www.omdbapi.com/?t=joker&apikey=2db38458'
//const url3 = 'http://www.omdbapi.com/?s=marvel&plot=full&apikey=2db38458'
//const url2 = 'http://www.omdbapi.com/?s=inception&apikey=2db38458'
const input = document.querySelector('input')
const button = document.querySelector('button')
let url = 'http://www.omdbapi.com/'+'?s='+'Harry Potter'+'&apikey='+key+'&type=movie'
const contenido = document.querySelector('.content')

let poster_template = []

const content = document.querySelector('.content')
button.addEventListener('click',async  () =>{
   url = 'http://www.omdbapi.com/'+'?s='+input.value+'&apikey='+key+'&type=movie'
   const movies = await request_movie(url)
   render(movies)
})

async function request_movie(url){
   const request = await fetch(url)
   const movie = await request.json()
   return movie
}

function render(movies){
   const movies_template = movies.Search.map(movie =>{
      const movie_title = '<h1>'+movie.Title+''+movie.Year+'</h1>'
      const movie_poster = '<img src="'+movie.Poster+'">'
      const card = '<div class="card">'+movie_poster+'</div>'
      return card
   })
   contenido.innerHTML = movies_template.join('')
   console.log(movies)
}

window.onload = async () =>{
   let movies = await request_movie(url)
   render(movies)
}
const ALL_GAMES_API = 'https://cs-steam-game-api.herokuapp.com/games'
const GENRES_API = 'https://cs-steam-game-api.herokuapp.com/genres'
const TAGS_API = 'https://cs-steam-game-api.herokuapp.com/steamspy-tags'
const SINGLE_GAME_API = 'https://cs-steam-game-api.herokuapp.com/single-game/:appid'
const FEATURED_API = 'https://cs-steam-game-api.herokuapp.com/features'

const platform = ['<i class="fa-brands fa-windows"></i>', '<i class="fa-brands fa-apple"></i>', '<i class="fa-brands fa-linux"></i>']

let requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

//carousel
let slideIndex = 1
// showSlides(slideIndex)

function plusSlides(n) {
  showSlides(slideIndex += n)
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("featured");
  // console.log(slides)
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  // console.log(slideIndex)
  // console.log(slides)
  slides[slideIndex - 1].style.display = "flex";
  // console.log(slides[slideIndex -1])
  dots[slideIndex - 1].className += " active";
}

async function getGame(limit) {
  try {
    const gameData = await fetch(`${ALL_GAMES_API}?page=2&limit=${limit}`, requestOptions)
    if (gameData.ok) {
      const data = await gameData.json()
      // console.log('game', data)
      return data
    }
  } catch (error) {
    console.log('err', error)
  }
}

async function getFeaturedGames() {
  try {
    const featuredGames = await fetch(FEATURED_API, requestOptions)
    if (featuredGames.ok) {
      const data = await featuredGames.json()
      // console.log('featured', data)
      return data
    }
  } catch (error) {
    console.log('err', error)
  }
}


async function renderFeaturedGames() {
  try {
    const data = await getFeaturedGames()
    const slideShow = document.getElementById('slideshow-container')
    // slideShow.innerHTML = ''

    data.data.forEach((game) => {
      const div = document.createElement('div')
      div.classList.add('featured')
      div.innerHTML = `
              <div class="featured-image">
              <img src="${game.header_image}" alt="">
              </div>
              <div class="featured-detail">
              <div class="tomb-title">
              <h2>${game.name}</h2>
              </div>
              <div class="feature-images-small">
              <img src="./assets/game_img/TombRaider/smalltomb1.PNG" alt="">
              <img src="./assets/game_img/TombRaider/smalltomb3.PNG" alt="">
              </div>
              <div class="tomb-bottom">
              <h3>Now Available</h3>
              <div class="bottom-text">
              <span>${(game.price == '0') ? "Free To Play" : `$${game.price}`}</span>
              <i class="fab fa-windows"></i>
              </div>
              </div>
              </div>`
      slideShow.appendChild(div)
      // console.log(slideShow)
    });
    data.data.forEach((index) => {
      const dot_arr = document.getElementById('dot-arr')
      const dot = document.createElement('span')
      dot.innerHTML = `<span class="dot" onclick="currentSlide(${index + 1})"></span>`
      dot_arr.appendChild(dot)
    })
    showSlides(slideIndex)
  } catch (error) {
    console.log('err', error)
  }
}


function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}


async function renderGameTab() {
  try {
    const data = await getGame()
    const gameMenu = document.querySelector('#trending')
    //mapping platform's keys and values
    data.data.forEach((game) => renderGameItem(game, gameMenu))
  } catch (error) {
    console.log('err', error)
  }
}

async function filterGameByRD(){
    const data = await getGame(200)
    let startDate = new Date('2019-12-31')
    let endDate = new Date('2018-10-01')
    console.log('start',startDate, 'end' ,endDate)
    console.log('RD',data)
    let filterGame = data.data.filter(a=>{
      let date = new Date(a.release_date)
      return (date >= endDate && date <= startDate)
    }
    )
    const gameMenu = document.getElementById('top')
    filterGame.forEach((game)=> renderGameItem(game,gameMenu))
}

async function fetchGameByGenre(limit, genres){
  try {
    const gameByGenre = await fetch(`${ALL_GAMES_API}?page=2&limit=${limit}&genres=${genres}`, requestOptions)
    // const totalGenres = await fetch(`${GENRES_API}`)
    if (gameByGenre.ok) {
      const data = await gameByGenre.json()
      // const data1 = await totalGenres.json()
      // console.log('game', data)
      // console.log('genres', data1)
      return data
    }
  } catch (error) {
    console.log('err', error)
  }
}


async function renderGameByGenre(genre){
  const data = await fetchGameByGenre(9, genre)
  const gameMenu = document.getElementById('genre')
  const genreTitle = document.getElementById('title')
  gameMenu.innerHTML = ''
  data.data.forEach((game) => {
    const div = document.createElement('div')
    div.classList.add('special3-1')
    div.setAttribute('id', `${game.appid}`)
    div.innerHTML=`
    <div class="special3-1" id="${game.appid}">
          <img src="${game.header_image}" alt="">
          <div class="special-text">
            <img src="./assets/img/price.PNG" alt="" class="price">
          </div>
        </div>
    `
    genreTitle.innerText = `${genre.charAt(0).toUpperCase() + genre.substr(1)}`
    gameMenu.appendChild(div)
  })
  let itemClick = document.getElementsByClassName('special3-1')
    // console.log(itemClick)
    for (let i = 0; i < itemClick.length; i++) {
      itemClick[i].addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5500/single-page.html'
        localStorage.setItem('id', `${this.id}`)
      })
    }
}

function renderGameItem(game, gameMenu) {
    let mapping = game.platforms.reduce((o, k, i) => ({ ...o, [k]: platform[i] }), {})
    // console.log(Object.values(mapping))
    //change genre 1st letter to uppercase
    let genre = game.genres.map((genre) => {
      genre = genre.charAt(0).toUpperCase() + genre.substr(1)
      // console.log(genre)
      return genre
    })
    // get release date
    let d = new Date(game.release_date)
    const div = document.createElement('div')
    div.classList.add('item')
    div.setAttribute('id', `${game.appid}`)
    div.innerHTML = `
      <div class="item-img">
      <img src="${game.header_image}" alt="">
      </div>
      <div class="item-desc">
      <h3>${game.name}</h3>
      <p class="platform-logo">Platforms: ${Object.values(mapping).join('')}</p>
      <p class="genre">Genre: ${genre.join(', ')}</p>
      <p class="item-price">${(game.price == '0') ? 'Free To Play' : `$${game.price}`}</p>
      <p class="release-date">Release Date: ${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}, ${d.getFullYear()}</p>
      </div>`
    gameMenu.appendChild(div)
    //direct to sigle page when click, set item's id to localStorage
    let itemClick = document.getElementsByClassName('item')
    // console.log(itemClick)
    for (let i = 0; i < itemClick.length; i++) {
      itemClick[i].addEventListener('click', function () {
        window.location.href = 'http://127.0.0.1:5500/single-page.html'
        localStorage.setItem('id', `${this.id}`)
      })
    }
}


window.addEventListener('onload', renderFeaturedGames())
window.addEventListener('onload', renderGameTab())
renderGameByGenre('action')
filterGameByRD()
renderGameTab()
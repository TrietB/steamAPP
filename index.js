const ALL_GAMES_API = 'https://cs-steam-api.herokuapp.com/games'
const GENRES_API = 'https://cs-steam-api.herokuapp.com/genres'
const TAGS_API = 'https://cs-steam-api.herokuapp.com/steamspy-tags'
const SIINGLE_GAME_API = 'https://cs-steam-api.herokuapp.com/single-game/:appid'
const FEATURED_API = 'https://cs-steam-api.herokuapp.com/features'





let slideIndex = 1



function plusSlides(n){
    showSlides(slideIndex += n )
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
  
function showSlides(n) {
    let slides = document.getElementsByClassName("featured");
    console.log(slides)
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
    }
    console.log(slideIndex)
    console.log(slides)
    slides[slideIndex-1].style.display = "flex";
    console.log(slides[slideIndex -1])
    dots[slideIndex-1].className += " active";
}


async function getFeaturedGames(){
    try {
        const featuredGames = await fetch(FEATURED_API)
        if(featuredGames.ok){
            const data = await featuredGames.json()
            console.log('games', data)
            return data
        }
    } catch (error) {
        console.log('err', error)
    }
}


async function renderFeaturedGames(){
    try {
        const data = await getFeaturedGames()
        const slideShow = document.getElementById('slideshow-container')
        // slideShow.innerHTML = ''
        
        data.data.forEach((game) => {
            const div = document.createElement('div')
            div.classList.add('featured')
            if(game.price == '0'){
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
              <span>Free To Play</span>
              <i class="fab fa-windows"></i>
              </div>
              </div>
              </div>`
              slideShow.appendChild(div)
              console.log(slideShow)
            }else{
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
              <span>$${game.price}</span>
              <i class="fab fa-windows"></i>
              </div>
              </div>
              </div>`
              slideShow.appendChild(div)
              console.log(slideShow)
            }
        });
        data.data.forEach((index) =>{
          const dot_arr = document.getElementById('dot-arr')
          const dot = document.createElement('span')
          dot.innerHTML = `<span class="dot" onclick="currentSlide(${index + 1})"></span>`
          dot_arr.appendChild(dot)
          console.log(dot_arr)
        })
        showSlides(slideIndex)
    } catch (error) {
        console.log('err', error)
    }
}
renderFeaturedGames()


function openCity(evt, cityName) {
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
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
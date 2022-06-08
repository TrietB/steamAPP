const SINGLE_GAME_API = 'https://cs-steam-game-api.herokuapp.com/single-game/'


let currentGame = localStorage.getItem('id')

console.log(currentGame)
async function getSingleGame(){
    try {
        const singleGame = await fetch(`${SINGLE_GAME_API}${currentGame}`)
        if(singleGame.ok){
            const gamePackage = await singleGame.json()
            console.log('game detail',gamePackage)
            return gamePackage
        }
    } catch (error) {
        console.log('err', error)
    }
}

async function rederSingleGame (){
    try {
        const data = await getSingleGame()
        const gameContent = document.getElementById('game-content')
        const gameBg = document.getElementById('game-bg')
        gameBg.src = `${data.data.background}`
        console.log(data, gameContent)
        const d = new Date(data.data.release_date)
        gameContent.innerHTML = `
            <div class="game-img">
                  <img src="${data.data.header_image}" alt="">
              </div>
              <div class="game-info">
                  <h3 id="game-title">${data.data.name}</h3>
                  <p class="game-desc">
                  ${data.data.description}
                  </p>
                  <div class="game-rating">
                      <p class="title">All Reviews</p>
                      <p class="title-content" id="verdict">${GetRating(data.data.positive_ratings, data.data.negative_ratings)}</p>
                  </div>
                  <div class="release-date">
                      <p class="title">Releases Date</p>
                      <p class="title-content" id="date">${d.getDate()} ${d.toLocaleString('default', {month:'short'})}, ${d.getFullYear()}</p>
                  </div>
                  <div class="dev">
                      <p class="title">Developers</p>
                      <a href="" class="title-content" id="dev-name">${data.data.developer.join(', ')}</a>
                  </div>
              </div>

            `
    } catch (error) {
        console.log('err', error)
    }
}

async function GetRating( positiveVotes, negativeVotes ) {
    const data = await getSingleGame()
    const verdict = document.getElementById('verdict')

    positiveVotes = data.data.positive_ratings
    negativeVotes = data.data.negative_ratings
    const totalVotes = positiveVotes + negativeVotes;
    const average = positiveVotes / totalVotes;
    const score = average - ( average - 0.5 ) * Math.pow( 2, -Math.log10( totalVotes + 1 ) );
    console.log(score * 100)
    if(score *100 > 75){
        verdict.innerHTML='Very Positive'
    }else if(35 < score*100 < 75){
        verdict.innerHTML='Mixed'
    }else{
        verdict.innerHTML= 'Very Negative'
    }
    // return score * 100;
  }
  

window.addEventListener('load',rederSingleGame);
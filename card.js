const cards = document.querySelectorAll(".memory-card")
const memoryGame = document.querySelector(".memory-game")

const greet = "hello world!"

let hasFlippedCard = false
let lockBoard = false
let matchingCards = 0
let firstCard, secondCard


function restartGame() {
    if (matchingCards === 6) {
        location.reload()
    }
}

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return
    this.classList.add('flip')

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return
    }

    secondCard = this
    hasFlippedCard = false

    checkForMatch()
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

    isMatch ? disableCards() : unFlipCards()
}

function disableCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)
        resetBoard()
        //_______________________________________
        firstCard.classList.add('complete')
        secondCard.classList.add('complete')
        matchingCards += 1
        restartGame()
    }, 1500);    
}

function unFlipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
    }, 1500)    
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor( Math.random() * 12)
        card.style.order = randomPos
    })
})()



cards.forEach(card => card.addEventListener('click', flipCard))

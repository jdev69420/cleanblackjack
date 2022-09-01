//set the variables 
var name = window. prompt("Enter your name: ")

//set int variables 
let playersSum = 0
let dealersSum = 0
let chips = 1000
let bet = 0 

//set html editors 
let messageEl = document.getElementById("message-el")
let playersSumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerSumEl = document.getElementById("dealerssum-el")
let dealerCardsEl = document.getElementById("dealercards-el")
let totalBetEl = document.getElementById("totalbet-el")
let winningEl = document.getElementById("winning-el")

//set html defaults
playerEl.textContent = name + ": $" + chips
totalBetEl.textContent = "Bet: " + "$" + bet

//set booleans 
let busted = false
let gameStarted = false
let ace = false
let doubleAce = false 
let hasBlackjack = false 
let stand = false

//set arrays
let playerCards = []
let dealerCards = []

//starts the game
function startGame() {
    if (bet > 0) {
        gameStarted = true
        dealCards()
    } else {
        messageEl.textContent = "Please make a bet before starting the game"
    }
}

//deals cards
function dealCards() {
    //deal player cards and enter them to array
    let playerCardOne = getRandomCard()
    let playerCardTwo = getRandomCard()
    playerCards = [playerCardOne, playerCardTwo]

    //deal dealer cards and enter them to array
    let dealerCardOne = getRandomCard()
    let dealerCardTwo = getRandomCard()
    dealerCards = [dealerCardOne, dealerCardTwo]

    //calls sum and display functions
    displayCards()
    sumCards()
}

//displays dealer & player cards
function displayCards() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    dealerCardsEl.textContent = "Cards: " + dealerCards[0]
}

//calculates player sum and dealer sum
function sumCards() {
    for (i = 0; i < playerCards.length; i++)
    playersSum = 0
    playersSum += playerCards[i]
    sumEl.textContent = "Sum: " + sum

    //checks if the player busted
    busted()

//Only after stand is true will the dealers sum display
    dealerSumEl.textContent = "sum: " + "?"

    if (stand == true) {
    for (i = 0; i < dealerCards.length; i++)
    dealersSum = 0
    dealersSum += cards[i]
    dealerSumEl.textContent = "Sum: " + sum

    //checks if dealer busted
    busted()  
    }
}

//ends the players turn and begins dealers logic
function playerstand() {
    stand = true
    dealerHit()
}

//allows player to draw a new card
function playerHit() {
    if (playersSum < 21) {
        let playerCard = getRandomCard()
        playerCards.push(playerCard)
        sumCards()
    }
}

//dealers logic for hitting
function dealerHit() {
    //make sure stand is called before hitting
    if (stand == true) {
        //writes over the Cards content displayed
        dealerCardsEl.textContent = "Cards: "
        //should receive a new card as long as dealers sum is under 17 and adds new card to array
        for (let dealerCard = getRandomCard(); dealersSum < 17; dealerCard ++) {
            dealerCards.push(dealerCard)
        }
        // displays all the dealers cards and calls the sum function to display the final dealer sum
            for (let i = 0; i < dealerCards.length; i++) {
                dealerCardsEl.textContent += dealerCards[i] + " "
                sumCards()
            }    
    }
}

function busted () {
    if (playersSum > 21) {
        chips -= bet 
        final = "Player lost $" + bet
        messageEl.textContent = "Player busted"
        playerEl.textContent = name + " $" + chips
    } else if (dealersSum > 21) {
    chips += bet 
    final = "Player won $" + bet
    messageEl.textContent = "Dealer busted."
    }
    winningEl.textContent = final
    playerEl.textContent = name + " $" + chips
}



//produces random cards for player & dealer
function getRandomCard() {
    let number = Math.floor(Math.random() * 13) + 1
    if (number > 10)
    {
        return 10
    } else if (number === 1) {
        return 11
    } else {
        return number
    }
}

function one(){
    if (gameStarted == false) {
    if (chips - bet > 0) {
        bet ++ 
    totalBetEl.textContent = "bet: $" + bet  
    } else {
        messageEl.textContent = "insufficient funds"
    }
}
}

function five(){
    if (gameStarted == false) {
    if (chips - (bet + 5) >= 0) {
        bet += 5 
    totalBetEl.textContent = "bet: $" + bet 
    } else {
        messageEl.textContent = "insufficient funds"
    }
}
}

function ten() {
    if (gameStarted == false) {
    if (chips - (bet + 10) >= 0) {
    bet += 10 
    totalBetEl.textContent = "bet: $" + bet 
    } else {
        messageEl.textContent = "insufficient funds"
    }
}
}


function double() {
    if (gameStarted == false) {
    if (chips - (bet*2) >= 0) {
        bet *= 2 
        totalBetEl.textContent = "bet: $" + bet 
        } else {
            messageEl.textContent = "insufficient funds"
        }
    }
}

function removeBets() {
    bet = 0
    totalBetEl.textContent = "bet $" + bet
}

function replenish() {
    if (chips < 10) {
        chips += 100
        playerEl.textContent = name + ": $" + chips    
    } else {
        messageEl.textContent = "You must have less than $10 to Replenish"
    }
}
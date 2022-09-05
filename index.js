//set the variables 
var name = window. prompt("Enter your name: ")

//set variables 
let playersSum = 0
let dealersSum = 0
let chips = 1000
let bet = 0 
let message = ""
let playerCardOne = 0
let playerCardTwo = 0
let dealerCardOne = 0
let dealerCardTwo = 0


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
let isBusted = false
let gameStarted = false
let playerBlackjack = false
let dealerBlackjack = false 
let stand = false
let action = true 
let hasAce = false
let hasDoubleAce = false

//set arrays
let playerCards = []
let dealerCards = []

//starts the game
function startGame() {
    playerCards = []
    dealerCards = []
    playersSum = 0
    dealersSum = 0
    dealerBlackjack = false
    playerBlackjack = false
    isBusted = false
    totalBetEl.textContent = "Bet: " + "$" + bet
    winningEl.textContent = " "
    messageEl.textContent = "Let's play some blackjack"
    hasAce = false
    hasDoubleAce = false
    if (bet > 0) {
        gameStarted = true
        stand = false
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
 }

//displays dealer & player cards
function displayCards() {
    if (playerBlackjack == false) {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < playerCards.length; i++) {
        cardsEl.textContent += playerCards[i] + " "
    }
    if (stand == false) {
        dealerCardsEl.textContent = "Cards: " + dealerCards[0]
    } else {
        // displays all the dealers cards and calls the sum function to display the final dealer sum
        dealerCardsEl.textContent = "Cards: "
        for (let i = 0; i < dealerCards.length; i++) {
             dealerCardsEl.textContent += dealerCards[i] + " "
                }    
    } 
    sumCards()
}
}

//calculates player sum and dealer sum
function sumCards() {
    if (playerBlackjack == false && dealerBlackjack == false) {
    playersSum = 0
    for (i = 0; i < playerCards.length; i++) {
    playersSum += playerCards[i]
    playersSumEl.textContent = "Sum: " + playersSum
    console.log(playerCards[i])
    countForAces()
    //checks tif the player busted
    busted()
    }
    if (playerCards[0] + playerCards[1] == 21) {
        playerBlackjack = true
        naturalBlackjack()
    }

//Only after stand is true will the dealers sum display
    dealerSumEl.textContent = "sum: " + "?"

    if (stand == true) {
    dealersSum = 0
        for (i = 0; i < dealerCards.length; i++) {
        dealersSum += dealerCards[i]
        dealerSumEl.textContent = "Sum: " + dealersSum
        }

        if (dealersSum > 21) {
            busted()
         } else if (dealersSum < 17) {
            dealerHit()
        } else if (dealersSum == 21) {
            dealerBlackjack = true 
            naturalBlackjack()
        }else {
            action = false 
            //checks to see if action has concluded
            endResult()
        }
        }
    }
}

//ends the players turn and begins dealers logic
function playerstand() {
    if (gameStarted == true) {
    stand = true
    displayCards()
    }
}

//allows player to draw a new card
function playerHit() {
    if (stand == false) {
    if (playersSum < 21) {
        let playerCard = getRandomCard()
        playerCards.push(playerCard)
        displayCards()
    }
}
}

//dealers logic for hitting
function dealerHit() {
    //make sure stand is called before hitting
    if (stand == true) {
         //writes over the Cards content displayed
        dealerCardsEl.textContent = "Cards: "
        //should receive a new card as long as dealers sum is under 17 and adds new card to array
        //for (let dealerCard = getRandomCard(); dealersSum < 17; dealerCard ++) {
          //  dealerCards.push(dealerCard)
          {
                let dealerCard = getRandomCard()
                dealerCards.push(dealerCard)
                displayCards()
            }
        }
    }

function busted () {
    if (hasAce == true || hasDoubleAce == true && playersSum > 21) {
        oneAce();
        doubleAce();
    } else if (hasAce == true || hasDoubleAce == true && dealersSum > 21) {
        oneAce();
        doubleAce();
    } else if (playersSum > 21) {
        winningEl.textContent = "Player lost $" + bet
        chips -= bet 
        messageEl.textContent = "Player busted"
        playerEl.textContent = name + " $" + chips
        gameStarted = false
        isBusted = true
        if (isBusted == true) {
            removeBets()
        }
     } else if (dealersSum > 21) {
    winningEl.textContent = "Player won $" + bet
    chips += bet 
    messageEl.textContent = "Dealer busted."
    playerEl.textContent = name + " $" + chips
    isBusted = true
    gameStarted = false
    if (isBusted == true) {
        removeBets()
    }
}
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
    totalBetEl.textContent = "Bet: $" + bet  
    } else {
        messageEl.textContent = "insufficient funds"
    }
}
}

function five(){
    if (gameStarted == false) {
    if (chips - (bet + 5) >= 0) {
        bet += 5 
    totalBetEl.textContent = "Bet: $" + bet 
    } else {
        messageEl.textContent = "insufficient funds"
    }
}
}

function ten(){
    if (gameStarted == false) {
    if (chips - (bet + 10) >= 0) {
        bet += 10 
    totalBetEl.textContent = "Bet: $" + bet 
    } else {
        messageEl.textContent = "insufficient funds"
    }
}
}


function double() {
    if (gameStarted == false) {
    if (chips - (bet*2) >= 0) {
        bet *= 2 
        totalBetEl.textContent = "Bet: $" + bet 
        } else {
            messageEl.textContent = "insufficient funds"
        }
    }
}

function removeBets() {
    if(gameStarted == false) {
    bet = 0
    totalBetEl.textContent = "Bet $" + bet
    }
}

function replenish() {
    if (chips < 10) {
        chips += 100
        playerEl.textContent = name + ": $" + chips    
    } else {
        messageEl.textContent = "You must have less than $10 to Replenish"
    }
}

//results of the game is determine when either player busts or the action is over
function endResult() {
    if (action == false && isBusted == false && gameStarted == true) {
        if (playersSum > dealersSum) {
            chips += bet
            messageEl.textContent = "Player wins!"
            winningEl.textContent = "Player wins " + "$" + bet + "!"
            playerEl.textContent = name + " $" + chips
            gameStarted = false
            if (!gameStarted == true) { 
                removeBets()
                }
        } else if (dealersSum > playersSum) {
                chips -= bet
                messageEl.textContent = "Dealer wins!"
                winningEl.textContent = "Dealer wins " + "$" + bet + "!"
                gameStarted = false
                playerEl.textContent = name + " $" + chips
                if (!gameStarted == true) { 
                    removeBets()
                    }
        } else if (dealersSum == playersSum) {
            messageEl.textContent = "Push!"
            winningEl.textContent = "Push!"
            gameStarted = false
            if (!gameStarted == true) { 
                removeBets()
                }
        }

    }
}

function naturalBlackjack() {
    if (playerBlackjack == true) {
        if (dealerCards[0] + dealerCards[1] == 21) {
        messageEl.textContent = "Push!"
        winningEl.textContent = "Push!"
        gameStarted = false
            if (!gameStarted == true) { 
             removeBets()
             }
        } else {
        console.log(dealerCards[0], dealerCards[1])
        messageEl.textContent = "Player has BlackJack!"
        bet *= 1.5
        console.log(bet)
        winningEl.textContent = "Player wins $" + bet
        chips += bet
        playerEl.textContent = name + " $" + chips
        gameStarted = false
        if (!gameStarted == true) { 
            removeBets()
            }
        }
    } else if (dealerBlackjack == true && playersSum < 21) {
        messageEl.textContent = "Dealer has BlackJack!"
        winningEl.textContent = "Dealer wins $" + bet
        chips -= bet
        playerEl.textContent = name + " $" + chips
        gameStarted = false
        if (!gameStarted == true) { 
            removeBets()
            }
    } else if (playersSum && dealersSum == 21){
        messageEl.textContent = "Push!"
        winningEl.textContent = "Push!"
        gameStarted = false
        if (!gameStarted == true) { 
            removeBets()
            }
    }
}

function doubleHit() {
    if (gameStarted == true) { 
    if (chips - (bet*2) >= 0) {
            bet *= 2 
            totalBetEl.textContent = "Bet: $" + bet 
    playerHit()
    stand = true  
    }
    }
}

function oneAce() {
    if (hasAce == true && playersSum > 21) {
        playerCards.splice(playerCards.indexOf(11), 1, 1)
        displayCards()
        hasAce = false
    } else if (hasAce == true && dealersSum > 21) {
        dealerCards.splice(dealerCards.indexOf(11), 1, 1)
        displayCards()
        hasAce = false
    }
}

function doubleAce() {
    if (hasDoubleAce == true && playersSum > 21) {
        playerCards.splice(playerCards.indexOf(11), 2, 1)
        displayCards()
        hasDoubleAce = false
    } else if (hasDoubleAce == true && dealersSum > 21) {
        dealerCards.splice(dealerCards.indexOf(11), 2, 1)
        displayCards()
        hasDoubleAce = false
    }
}

//counts the cards to see if there's an ace
function countForAces() {
    let count = 0;
    playerCards.forEach(element => {
        if (element === 11) {
            count ++;
        }
    });
    if (count == 1) {
        hasAce = true
    } else if (count == 2) {
        hasDoubleAce = true
    }
}
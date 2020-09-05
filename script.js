

//TODO - start game popup
//when player reach page for the first time / when user choose to play new game (click btn)
// take, player name, 

//TODO header:  "new game btn", "hello player name",  wrongGuessCounter, "timer", "level"+"theme" status
// # levels": “easy” (12)(6 types) , medium (18)(9 types) and hard(24)(12 type)
// create theme -> cardPattern1 css class hold background var base on theme

//TODO GameOver
// when all cards isFlipped = TRUE -> game over pop up a “You won!” overlay with a new game button.

//TODO Ninja:
// 1. Add flipping animation effect for the card.
// 2. Add a high score functionality, that will save the name of the person with the least amounts of wrong guesses.

/** Data structure - Card */
function Card(id, type, isFlipped){
  this.id = id;
  this.type = type;
}
Card.prototype.getId = function(){
  return this.id;
}
Card.prototype.getType = function(){
  return this.type;
}

/** Cards Deck Logic */
const cardsDeck = {
  cardsDeck: [],
  cardsTypeNum: 0,
  create: function(size) {
    this.cardsTypeNum = size / 2;
    let cardsDeck = [];
    let id = 0;
    for(let type = 1 ; type <= this.cardsTypeNum; type++) {
      let cardsAmount = 1
      while(cardsAmount <= 2){
        id++;
        cardsDeck.push(new Card(id, type));
        cardsAmount++;
      }
    }
    this.cardsDeck = cardsDeck;
  },
  shuffle: function() {
    //TODO: Understand algorithem
    for(let i = this.cardsDeck.length-1; i > 0; i--){
      let j = Math.floor(Math.random() * i);
      let temp = this.cardsDeck[i] 
      this.cardsDeck[i] = this.cardsDeck[j]
      this.cardsDeck[j] = temp
    }
  },
  isCardsIdentical: function (firstCardId, secondCardId){
    const cards = this.cardsDeck.filter(card => card.getId() === firstCardId ||card.getId() === secondCardId);
    return cards[0].getType() === cards[1].getType();
  },
  getCardsTypeNum: function(){
    return this.cardsTypeNum;
  }
}





/** UI: draw cards on ui */
function renderCardsUi(){
  const cardsContainerEl = document.querySelector('.cards-container');
  
  cardsDeck.cardsDeck.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    const cardInnerEl = document.createElement('div');
    cardInnerEl.classList.add('card-pattern', getCardPattern(card.getType()), 'card-cover'); 
    cardEl.appendChild(cardInnerEl);
    cardsContainerEl.appendChild(cardEl);

    cardEl.addEventListener('click', (event) => handleCardClick(event, card.getId()), { once: true })
  });
}
/** UI: get card pattern(css class name) by its type */
function getCardPattern(cardType){
 return 'card-pattern-type'.concat(cardType);
}
/** UI: handle card click */
function handleCardClick(event, cardId){
  console.log('card click');
  console.log('handleDisplayCardClick');

  const cardEl = event.currentTarget; // outer
  const cardInnerEl = event.target; // inner
  
  // display card UI
  cardInnerEl.classList.remove('card-cover');

  gameMode.currentMove.addOpenCard(cardId, cardEl);
 
  if(gameMode.currentMove.isOver()) {
  
 //TODO ->  overlay for 1 second -> card aren't clickable


  if(gameMode.currentMove.isSuccessfulGuess()){
    //Cards Identical
    gameMode.currentRound.addRightGuess();
    if (gameMode.currentRound.getRightGuesses() === cardsDeck.getCardsTypeNum()){
      console.log("Game Over !");
    }
  } else {
     //Cards Not Identical
     console.log('not successful');

  }
 
  gameMode.currentMove.reset();
  }
}

/***************************************** Play Mode ***************************************************/



const gameMode = {
  currentMove: {
    openCardsCounter: 0,
    openCardsEl: [],
    openCardsId: [],
    addOpenCard: function (cardId, cardEl) {
      this.openCardsId.push(cardId);
      this.openCardsEl.push(cardEl);
      this.openCardsCounter++;
    },
    isOver: function () {
      return this.openCardsCounter === 2;
    },
    isSuccessfulGuess: function(){
      return cardsDeck.isCardsIdentical(this.openCardsId[0], this.openCardsId[1]);
    },
    reset: function () {
      this.openCardsCounter = 0;
      this.openCardsEl = [];
      this.openCardsId = [];
    }
  },
  currentRound: {
    rightGuess: 0,
    wrongGuess: 0,
    addRightGuess: function(){
      this.rightGuess++;
    },
    addWrongGuess: function(){
      this.wrongGuess++;
    },
    getRightGuesses(){
      return this.rightGuess;
    },
    getWrongGuesses(){
      return this.rightGuess;
    },
  }
}


// Cards Deck creation
cardsDeck.create(12);
cardsDeck.shuffle();



//UI
renderCardsUi();


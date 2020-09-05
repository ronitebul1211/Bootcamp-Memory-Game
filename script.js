

//TODO - start game popup
//when player reach page for the first time / when user choose to play new game (click btn)
// take, player name, 

//TODO header:  "new game btn", "hello player name",  wrongGuessCounter, "timer", "level"+"theme" status
// # levels": “easy” (12)(6 types) , medium (18)(9 types) and hard(24)(12 type)
// create theme -> cardPattern1 css class hold background var base on theme

//TODO GameOver
// when all cards game over pop up a “You won!” overlay with a new game button.

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
    console.log(firstCardId, secondCardId);
    const cards = this.cardsDeck.filter(card => card.getId() === firstCardId ||card.getId() === secondCardId);
    console.log(cards);
    return cards[0].getType() === cards[1].getType();
  },
  getCardsTypeNum: function(){
    return this.cardsTypeNum;
  }
}

/** Game Mode Logic */
const gameMode = {
  currentMove: {
    openCardsCounter: 0,
    openCardsEl: [],
    openCardsId: [],
    addCard: function (cardEl) {
      const cardId = parseInt(cardEl.dataset.cardId);
      if(cardId !== this.openCardsId[0]){
        this.openCardsId.push(cardId);
        this.openCardsEl.push(cardEl);
        this.openCardsCounter++;
      } 
    },
    isFinished: function () {
      if (this.openCardsCounter === 2) {console.log('finished')};
      return this.openCardsCounter === 2;
    },
    isSuccessfulGuess: function(){
      return cardsDeck.isCardsIdentical(this.openCardsId[0], this.openCardsId[1]);
    },
    getCardsEl: function(){
      return this.openCardsEl;
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

const cardsUi = {
  cardsContainerEl: document.querySelector('.cards-container'),
  getContainerEL: function(){
    return this.cardsContainerEl;
  },
  getCardTypeCss: function(cardType){
    return 'card-pattern-type'.concat(cardType);
  },
  showCard: function(cardEl){
    const innerCardEl = cardEl.firstElementChild;
    innerCardEl.classList.remove('card-cover');
  },
  hideCard: function(cardEl){
    const innerCardEl = cardEl.firstElementChild;
    innerCardEl.classList.add('card-cover');
  },
  makeCardsUnClickable: function(){
    this.cardsContainerEl.classList.add('unclickable-mode');
  },
  makeCardsClickable: function(){
    this.cardsContainerEl.classList.remove('unclickable-mode');
  }
}







/***************************************** Play Mode ***************************************************/

/** UI: draw cards on ui */
function renderCardsUi(){ 
  cardsDeck.cardsDeck.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.setAttribute('data-card-id', card.getId());
    const cardInnerEl = document.createElement('div');
    cardInnerEl.classList.add('card-pattern', cardsUi.getCardTypeCss(card.getType()), 'card-cover'); 
    cardEl.appendChild(cardInnerEl);
    cardsUi.getContainerEL().appendChild(cardEl);
    cardEl.addEventListener('click', handleCardClick);
  });
}
/** UI: handle card click */
function handleCardClick(event){
  const cardEl = event.currentTarget;
  cardsUi.showCard(cardEl);
  gameMode.currentMove.addCard(cardEl);
  // Two open cards -> wait 1 second
  if(gameMode.currentMove.isFinished()){ 
    cardsUi.makeCardsUnClickable();
    setTimeout(() => {
      //Guess Right -> card stay open, unclickable, check for victory and the end of the game
      if(gameMode.currentMove.isSuccessfulGuess()){
        gameMode.currentMove.getCardsEl().forEach((openCardEl) => {
          openCardEl.removeEventListener("click", handleCardClick);
        });
        gameMode.currentRound.addRightGuess();
        if (gameMode.currentRound.getRightGuesses() === cardsDeck.getCardsTypeNum()){
          console.log("Game Over!");
        }
      //Guess Wrong -> hide cards
      } else {
        gameMode.currentMove.getCardsEl().forEach((openCardEl) => {
          cardsUi.hideCard(openCardEl);
        });
        gameMode.currentRound.addWrongGuess();
      }
      gameMode.currentMove.reset();
      cardsUi.makeCardsClickable();
    }, 1000);
  }
}

// Cards Deck creation
cardsDeck.create(12);
cardsDeck.shuffle();

//UI
renderCardsUi();




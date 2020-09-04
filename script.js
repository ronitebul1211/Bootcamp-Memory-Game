
// playMode = {
//   currentMove: 1 // 1 / 2
//   // if current move is 2 -> check for match in card id 
//   // update ui
//   , 
//   wrongGuessCounter: NUMBER
//
// }

//TODO - start game popup
//when player reach page for the first time / when user choose to play new game (click btn)
// take, player name, 

//TODO header:  "new game btn", "hello player name",  wrongGuessCounter, "timer", "level"+"theme" status
// # levels": “easy” (12)(6 types) , medium (18)(9 types) and hard(24)(12 type)
// create level -> function for lop create each card twice & push to array loop by level
// create theme -> cardPattern1 css class hold background var base on theme

//TODO Create Cards
// create 6 type of cards new Card(1, "cardPattern1, false ")
// add to cards array each card twice
// shuffle array

//TODO Draw Cards on screen 
// iterate cards array and render ui
//function set cars pattern by its type
// add click event listener 

//TODO Game Mode - play
// click on card (stay flip) 
// play mode - counter 1 (save card in play mode)
// click on second card - counter 2 (save card in play mode)
// when counter 2 put overlay for 1 seconds on all screen
// card match -> stay flip, counter 0 -> update isFlipped = TRUE
// card not match -> flip again counter 0 -> update isFlipped = FALSE, wrong Guess counter ++

//TODO GameOver
// when all cards isFlipped = TRUE -> game over pop up a “You won!” overlay with a new game button.

//TODO Ninja:
// 1. Add flipping animation effect for the card.
// 2. Add a high score functionality, that will save the name of the person with the least amounts of wrong guesses.

/** Data structure - Card */
function Card(id, type, isFlipped){
  this.id = id;
  this.type = type;
  this.isFlipped = isFlipped;
}
Card.prototype.getId = function(){
  return this.id;
}
Card.prototype.getType = function(){
  return this.type;
}
Card.prototype.isFlipped = function(){
  return this.isFlipped;
}

/** Data: Create cards stack that contain each card type twice  */
function createCardsStackData(cardsTypeNum){
  //TODO  easy: cardsTypeNum = 6 , medium: cardsTypeNum = 9, hard: cardsTypeNum = 12 

  let cardsStack = [];
  let id = 0;

  for(let type = 1 ; type <= cardsTypeNum; type++ ) {
    id++;
    cardsStack.push(new Card(id, type, false));
    id++;
    cardsStack.push(new Card(id, type, false));
  }
  return cardsStack;
}
/** Data: shuffle cards stack */
function shuffleCards(cardsStack){
  //TODO: Understand algorithem
  for(let i = cardsStack.length-1; i > 0; i--){
    let j = Math.floor(Math.random() * i);
    let temp = cardsStack[i] 
    cardsStack[i] = cardsStack[j]
    cardsStack[j] = temp
  }
}


/** UI: draw cards on ui */
function renderCardsUi(cardsStackData){
  const cardsContainerEl = document.querySelector('.cards-container');
  
  cardsStackData.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    const cardInnerEl = document.createElement('div');
    cardInnerEl.classList.add('card-pattern', getCardPattern(card.getType()), 'card-cover'); 
    cardEl.appendChild(cardInnerEl);
    cardsContainerEl.appendChild(cardEl);

    cardEl.addEventListener('click', (event) => handleCardClick(event, card.getId()))
  });
}
/** UI: get card pattern(css class name) by its type */
function getCardPattern(cardType){
 return 'card-pattern-type'.concat(cardType);
}

function handleCardClick(event, cardId){
  console.log(event.currentTarget, cardId);
}


// DATA
let cardsStack = createCardsStackData(6);
shuffleCards(cardsStack);

//UI
renderCardsUi(cardsStack);





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

/***************************************** Play Mode ***************************************************/
//TODO Game Mode - play

// play mode - counter 1 (save card in play mode)
// click on second card - counter 2 (save card in play mode)
// when counter 2 put overlay for 1 seconds on all screen
// card match -> stay flip, counter 0 -> update isFlipped = TRUE
// card not match -> flip again counter 0 -> update isFlipped = FALSE, wrong Guess counter ++

let currentMoveFlipCardsCounter = 0;
/**
 * first click on card: - remove from el card cover css class
 *                      - displayCardHandler -> remove (nothing happens when click current card)
 *                      - currentMoveFlipCardsCounter ++ (1)
 * second click on card: - remove from el card cover css class
 *                      - currentMoveFlipCardsCounter ++ (1)
 *                      - displayCardHandler -> remove (nothing happens when click current card)
 *                       currentMoveFlipCardsCounter ++ (2)
 * 
 *                        if ( currentMoveFlipCardsCounter = (2)) {
 *                            put overlay for 1 second -> card aren't clickable
 *                            currentMoveFlipCardsCounter = 0 
 *                            
 *                            match? ->  rightGuess ++; (check if right guess = pattern typed => user win)
 *                            not match -> wrong guess ++ 
 *                                      -> Add cover css class  
 *                                      -> add event listener displayCardHandler                
 * 
 * }
 */

// DATA
let cardsStack = createCardsStackData(6);
shuffleCards(cardsStack);

//UI
renderCardsUi(cardsStack);



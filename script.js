
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
function Card(type, patternCssClass, isFlipped){
  this.id = id;
  this.type = type;
  this.isFlipped = isFlipped;
}

Card.prototype.getType = function(){
  return this.type;
}
Card.prototype.getPatternCssClass = function(){
  return this.patternCssClass;
}
Card.prototype.isFlipped = function(){
  return this.isFlipped;
}


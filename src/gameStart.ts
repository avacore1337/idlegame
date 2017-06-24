import { SQUARETYPES, SQUARETYPELIST ,RESOURCES } from "./Constants";
import { MainGame } from "./MainGame";

export function newGame(game:MainGame){
  for (let i = 0; i < game.gridSizeY; i++) {
    for (let j = 0; j < game.gridSizeX; j++) {
      let theSquare = game.hexMatrix[i][j];
      theSquare.reset();
      let squareType:SQUARETYPES = Math.floor((Math.random() * (SQUARETYPELIST.length - 1))); //not including base
      theSquare.squareType = squareType;
      theSquare.setType(squareType);
      if(theSquare.squareType === SQUARETYPES.Plains){
        theSquare.setResource(RESOURCES.Horse);
      }
      if(theSquare.squareType === SQUARETYPES.Forest){
        theSquare.setResource(RESOURCES.Stone);
      }
      if(theSquare.squareType === SQUARETYPES.Mountain){
        let rnd = Math.floor(Math.random() * 100);
        let coalPercentage = 10;
        let copperPercentage = 10;
        let ironPercentage = 10;
        if (rnd < coalPercentage) {
          theSquare.setResource(RESOURCES.Coal);
        } else if (rnd < coalPercentage + copperPercentage) {
          theSquare.setResource(RESOURCES.Copper);
        } else if (rnd < coalPercentage + copperPercentage + ironPercentage) {
          theSquare.setResource(RESOURCES.Iron);
        }
      }
    }
  }
}

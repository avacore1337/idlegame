import { SQUARETYPES, SQUARETYPELIST ,RESOURCES, BUILDINGS, BUILDINGCLASSES } from "./Constants";
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

  let centerX = Math.floor(game.gridSizeX/2);
  let centerY = Math.floor(game.gridSizeY/2);
  let centerHex = game.hexMatrix[centerX][centerY];

  centerHex.reset();
  centerHex.setType(SQUARETYPES.Base);
  if(centerHex.resource != null){
    centerHex.resource.destroy();
  }
  centerHex.addBuilding(BUILDINGS.Base)
  game.buildingLayer.add(centerHex.buildingSprite);
  centerHex.purchased = true;
  centerHex.reveal();
  for (let i = 0; i < centerHex.neighbours.length; i++) {
      let hex = centerHex.neighbours[i];
      hex.purchased = true;
      hex.reveal();
      hex.revealNeighbours();
  }
  centerHex.revealNeighbours();
  let distance = 0;
  let currentTiles = centerHex.setDistance(distance);
  let nextTiles = [];
  while (currentTiles.length > 0) {
    distance++;
    for (let currentTile of currentTiles) {
      if (currentTile !== null) {
        nextTiles = nextTiles.concat(currentTile.setDistance(distance));
      }
    }
    currentTiles = nextTiles;
    nextTiles = [];
  }
}

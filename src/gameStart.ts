import { SQUARETYPES ,RESOURCES, BUILDINGS } from "./Constants";
import { MainGame } from "./MainGame";
import { Square } from "./Square";
import { shuffle } from "./util";

let start:Array<[SQUARETYPES, number]> = [
  [SQUARETYPES.Forest, RESOURCES.Stone],
  [SQUARETYPES.Forest, -1],
  [SQUARETYPES.River, -1],
  [SQUARETYPES.River, RESOURCES.Stone],
  [SQUARETYPES.Plains, RESOURCES.Horse],
  [SQUARETYPES.Field, -1],]
let second:Array<[SQUARETYPES, number]> = [] // 6*2 + 6*3 == 30

function generateSecond():void {
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Forest, RESOURCES.Stone])
  }
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Forest, -1])
  }
  for (let i = 0; i < 4; i++) {
    second.push([SQUARETYPES.River, -1])
  }
  for (let i = 0; i < 4; i++) {
    second.push([SQUARETYPES.Water, -1])
  }
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Desert, RESOURCES.Stone])
  }
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Desert, -1])
  }
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Plains, -1])
  }
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Plains, RESOURCES.Horse])
  }
  for (let i = 0; i < 4; i++) {
    second.push([SQUARETYPES.Field, -1])
  }
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Mountain, RESOURCES.Copper])
  }
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Mountain, RESOURCES.Iron])
  }
  for (let i = 0; i < 2; i++) {
    second.push([SQUARETYPES.Mountain, RESOURCES.Coal])
  }
  shuffle(second);
}

export function newGame(game:MainGame):void {
  generateSecond();
  let centerX = Math.floor(game.gridSizeX/2);
  let centerY = Math.floor(game.gridSizeY/2);
  let centerHex = game.hexMatrix[centerX][centerY];
  calculateDistances(game, centerHex);

  shuffle(start);
  for (let i = 0; i < game.gridSizeY; i++) {
    for (let j = 0; j < game.gridSizeX; j++) {
      let square = game.hexMatrix[i][j];
      square.reset();
      if(square.distance === 0){
        square.setType(SQUARETYPES.Base);
        square.addBuilding(BUILDINGS.Base)
      }
      else if(square.distance <= 1){
        setSquare(square, start.pop());
      }
      else if(square.distance <= 3){
        setSquare(square, second.pop());
      } else{
        randomizeHex(square);
      }
    }
  }

  centerHex.purchased = true;
  centerHex.reveal();
  for (let i = 0; i < centerHex.neighbours.length; i++) {
      let hex = centerHex.neighbours[i];
      hex.purchased = true;
      hex.reveal();
      hex.revealNeighbours();
  }
}

function calculateDistances(game:MainGame, centerHex:Square):void {
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

function randomizeHex(square:Square):void {
  let squareType:SQUARETYPES = Math.floor((Math.random() * (SQUARETYPES.Length - 1))); //not including base
  square.squareType = squareType;
  square.setType(squareType);
  if(square.squareType === SQUARETYPES.Plains){
    square.setResource(RESOURCES.Horse);
  }
  if(square.squareType === SQUARETYPES.Forest){
    square.setResource(RESOURCES.Stone);
  }
  if(square.squareType === SQUARETYPES.Mountain){
    let rnd = Math.floor(Math.random() * 100);
    let coalPercentage = 10;
    let copperPercentage = 10;
    let ironPercentage = 10;
    if (rnd < coalPercentage) {
      square.setResource(RESOURCES.Coal);
    } else if (rnd < coalPercentage + copperPercentage) {
      square.setResource(RESOURCES.Copper);
    } else if (rnd < coalPercentage + copperPercentage + ironPercentage) {
      square.setResource(RESOURCES.Iron);
    }
  }
}

function setSquare(square:Square, data:[SQUARETYPES, number]):void{
  square.setType(data[0]);
  if(data[1] != -1){
    square.setResource(data[1]);
  }
}

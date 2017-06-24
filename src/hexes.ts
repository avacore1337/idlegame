import { MainGame } from "./MainGame";
import { Square } from "./Square";
import { newGame } from "./gameStart"
import { loadMap, loadMaterials, saveGame, resetSave } from "./SaveHandler";
import { DIRECTIONS, MATERIALS, MATERIALSTRINGLIST, SQUARETYPES, SQUARETYPELIST , BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES, RESOURCES } from "./Constants";

function linkHexes(game, square, i, j, index){
  if(i < 0 || i >= game.gridSizeX || j < 0 || j >= game.gridSizeY){
    return;
  }
  else{
    let otherSquare = game.hexMatrix[i][j];
    square.neighbours[index] = otherSquare;
    otherSquare.neighbours[(index + 3) % 6] = square;
  }
}

export function generateHexGroup(game:MainGame):void {
  game.hexagonGroup = game.game.add.group();
  game.squareLayer = game.game.add.group();
  game.borderLayer = game.game.add.group();
  game.resourceLayer = game.game.add.group();
  game.buildingLayer = game.game.add.group();
  game.hexagonGroup.add(game.squareLayer);
  game.hexagonGroup.add(game.borderLayer);
  game.hexagonGroup.add(game.resourceLayer);
  game.hexagonGroup.add(game.buildingLayer);
  for (let i = 0; i < game.gridSizeY; i++) {
    for (let j = 0; j < game.gridSizeX; j++) {
      let square:Square = new Square(game, j, i);
      game.hexMatrix[i].push(square);
      let theSquare = square;
      let newCenter = square.center;
    }
  }

  for (let i = 0; i < game.gridSizeX; i++) {
    for (let j = 0; j < game.gridSizeY; j++) {
        let offset = (i)%2;
        linkHexes(game, game.hexMatrix[i][j], i - 1, j - 1 + offset, 0);
        linkHexes(game, game.hexMatrix[i][j], i - 1, j + offset, 1);
        linkHexes(game, game.hexMatrix[i][j], i, j + 1, 2);
    }
  }

  game.needsupdate = true;
  if (localStorage.getItem("map") !== null) {
    console.log("Loading old game")
    loadMap(game);
  }
  else{
    console.log("making new game")
    newGame(game);
  }

  for (let i = 0; i < game.gridSizeY; i++) {
    for (let j = 0; j < game.gridSizeX; j++) {
      let theSquare = game.hexMatrix[i][j];
      theSquare.center.inputEnabled = true;
      theSquare.center.events.onInputUp.add(function() {
        game.needsupdate = true;
        // You own the tile, you wish to build, the tile-type is allowed, you can afford it, TODO (no other building exist on the tile)
        if (theSquare.purchased && game.state === "building" && BUILDINGCLASSES[game.option].canBuild(theSquare) && game.materialContainer.materials.isSubset(BUILDINGCLASSES[game.option].getRequiredMaterials())) {
          game.materialContainer.pay(BUILDINGCLASSES[game.option].getRequiredMaterials());
          theSquare.addBuilding(game.option);
        }
        if(game.state ==="buying" && !theSquare.purchased && game.materialContainer.materials.get(MATERIALS.Food) >= 10*Math.pow(1.4, theSquare.distance) && theSquare.distance <= Square.buildDistance){
          game.materialContainer.materials.subtract(MATERIALS.Food, 10*Math.pow(1.4, theSquare.distance));
          theSquare.purchased = true;
          theSquare.revealNeighbours();
        }
      });
    }
  }
  let centerX = Math.floor(game.gridSizeX/2);
  let centerY = Math.floor(game.gridSizeY/2);
  let centerHex = game.hexMatrix[centerX][centerY];

  centerHex.setType(SQUARETYPES.Base);
  if(centerHex.resource != null){
    centerHex.resource.destroy();
  }
  centerHex.buildingSprite = game.game.add.sprite(centerHex.center.x + 10 ,centerHex.center.y + 20, 'buildings', "building.png");
  game.buildingLayer.add(centerHex.buildingSprite);
  centerHex.purchased = true;
  centerHex.reveal();
  centerHex.revealNeighbours();
  game.hexagonGroup.x = (game.game.world.width - game.hexagonWidth * Math.ceil(game.gridSizeX)) / 2;
  if (game.gridSizeX % 2 === 0) {
    game.hexagonGroup.x -= game.hexagonWidth / 4;
  }
  game.hexagonGroup.y = (game.game.world.height - Math.ceil(game.gridSizeY / 2) * game.hexagonHeight - Math.floor(game.gridSizeY / 2) * game.hexagonHeight / 2) / 2;
  if (game.gridSizeY % 2 === 0) {
    game.hexagonGroup.y -= game.hexagonHeight / 8;
  }

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

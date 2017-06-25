import { MainGame } from "./MainGame";
import { Square } from "./Square";
import { newGame } from "./gameStart"
import { loadMap } from "./SaveHandler";
import { MATERIALS, BUILDINGCLASSES } from "./Constants";

function linkHexes(game:MainGame, square:Square, i:number, j:number, index:number){
  if(i < 0 || i >= game.gridSizeX || j < 0 || j >= game.gridSizeY){
    return;
  }
  else{
    let otherSquare = game.hexMatrix[i][j];
    square.neighbours[index] = otherSquare;
    otherSquare.neighbours[(index + 3) % 6] = square;
  }
}

function generateSquares(game:MainGame){
  for (let i = 0; i < game.gridSizeY; i++) {
    for (let j = 0; j < game.gridSizeX; j++) {
      let square:Square = new Square(game, j, i);
      game.hexMatrix[i].push(square);
    }
  }
}

function linkAllHexes(game:MainGame){
  for (let i = 0; i < game.gridSizeX; i++) {
    for (let j = 0; j < game.gridSizeY; j++) {
        let offset = (i)%2;
        linkHexes(game, game.hexMatrix[i][j], i - 1, j - 1 + offset, 0);
        linkHexes(game, game.hexMatrix[i][j], i - 1, j + offset, 1);
        linkHexes(game, game.hexMatrix[i][j], i, j + 1, 2);
    }
  }
}

function placeHexes(game:MainGame){
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
  generateSquares(game);
  linkAllHexes(game);

  if (localStorage.getItem("map") !== null) {
    console.log("Loading old game")
    loadMap(game);
  }
  else{
    console.log("making new game")
    newGame(game);
  }
  placeHexes(game);
  game.hexagonGroup.x = (game.game.world.width - game.hexagonWidth * Math.ceil(game.gridSizeX)) / 2;
  if (game.gridSizeX % 2 === 0) {
    game.hexagonGroup.x -= game.hexagonWidth / 4;
  }
  game.hexagonGroup.y = (game.game.world.height - Math.ceil(game.gridSizeY / 2) * game.hexagonHeight - Math.floor(game.gridSizeY / 2) * game.hexagonHeight / 2) / 2;
  if (game.gridSizeY % 2 === 0) {
    game.hexagonGroup.y -= game.hexagonHeight / 8;
  }

}

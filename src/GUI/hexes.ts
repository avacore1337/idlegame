import { MainGame } from '../MainGame';
import { Square } from '../Square';
import { newGame } from '../gameStart';
import { loadRebirth, loadMap, loadConstructions, loadTechnologies } from '../SaveHandler';
import { MATERIALS, BUILDINGCLASSES } from '../Constants';

function linkHexes(game:MainGame, square:Square, i:number, j:number, index:number):void {
  if (i < 0 || i >= game.gridSizeX || j < 0 || j >= game.gridSizeY) {
    return;
  }
  else{
    const otherSquare = game.hexMatrix[i][j];
    square.neighbours[index] = otherSquare;
    otherSquare.neighbours[(index + 3) % 6] = square;
  }
}

function generateSquares(game:MainGame):void {
  for (let i = 0; i < game.gridSizeY; i++) {
    for (let j = 0; j < game.gridSizeX; j++) {
      const square:Square = new Square(game, j, i);
      game.hexMatrix[i].push(square);
    }
  }
}

function linkAllHexes(game:MainGame):void {
  for (let i = 0; i < game.gridSizeX; i++) {
    for (let j = 0; j < game.gridSizeY; j++) {
        const offset = (i)%2;
        linkHexes(game, game.hexMatrix[i][j], i - 1, j - 1 + offset, 0);
        linkHexes(game, game.hexMatrix[i][j], i - 1, j + offset, 1);
        linkHexes(game, game.hexMatrix[i][j], i, j + 1, 2);
    }
  }
}

function placeHexes(game:MainGame):void {
  for (let i = 0; i < game.gridSizeY; i++) {
    for (let j = 0; j < game.gridSizeX; j++) {
      const theSquare = game.hexMatrix[i][j];
      theSquare.center.inputEnabled = true;
      theSquare.center.events.onInputUp.add(function() {
        game.needsupdate = true;
        // You own the tile, you wish to build, the tile-type is allowed, you can afford it, TODO (no other building exist on the tile)
        if (theSquare.purchased && game.gamestate === 'building' && BUILDINGCLASSES[game.option].canBuild(theSquare) && game.materialContainer.materials.isSubset(BUILDINGCLASSES[game.option].getRequiredMaterials())) {
          game.materialContainer.pay(BUILDINGCLASSES[game.option].getRequiredMaterials());
          theSquare.addBuilding(game.option);
          // for (const button of game.allButtons) {
          //   button.update();
          // }
        }
        if (game.gamestate ==='buying' && !theSquare.purchased && game.materialContainer.materials.get(MATERIALS.Food) >= 10*Math.pow(1.4, theSquare.distance) && theSquare.distance <= Square.buildDistance) {
          game.materialContainer.materials.subtract(MATERIALS.Food, 10*Math.pow(1.4, theSquare.distance));
          theSquare.purchased = true;
          theSquare.revealNeighbours();
        }
      });
      theSquare.center.input.pixelPerfectClick = true;

    }
  }
}

export function generateHexGroup(game:MainGame):void {
  game.hexagonGroup = game.game.add.group();
  game.squareLayer = game.game.add.group(game.hexagonGroup);
  game.borderLayer = game.game.add.group(game.hexagonGroup);
  game.resourceLayer = game.game.add.group(game.hexagonGroup);
  game.buildingLayer = game.game.add.group(game.hexagonGroup);
  generateSquares(game);
  linkAllHexes(game);

  const saveExists:boolean = localStorage.getItem('map') !== null;
  const restarting:boolean = localStorage.getItem('restarting') === 'true';
  if (saveExists && !restarting) {
    console.log('Loading old game');
    loadMap(game);
    loadConstructions(game);
    loadTechnologies(game);
  } else {
    console.log('making new game');
    newGame(game);
    if (restarting) {
      loadRebirth(game);
    }
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

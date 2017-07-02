import { LAND, RESOURCES, BUILDINGS, BUILDINGCLASSES, MATERIALS, DIRECTIONS } from '../Constants';
import { MainGame } from '../MainGame';
import { Tile } from './Tile';
import { Board } from './Board';
import { shuffle } from '../util';

/**
 * Generate the tiles with a distance of 1 to the base
 * @returns {Array<[LAND, number]>} - Returns a list of predetermined tiles in a random order
 */
function constantLayer():Array<[LAND, number]> {
  const tiles:Array<[LAND, number]> = [
    [LAND.Forest, RESOURCES.Stone],
    [LAND.Forest, -1],
    [LAND.River, -1],
    [LAND.River, RESOURCES.Stone],
    [LAND.Plains, RESOURCES.Horse],
    [LAND.Field, -1]
  ];
  shuffle(tiles);
  return tiles;
}

/**
 * Generate the tiles with a distance of 2 or 3 to the base
 * @returns {Array<[LAND, number]>} - Returns a list of predetermined tiles in a random order
 */
function pseudoLayer():Array<[LAND, number]> {
  const tiles:Array<[LAND, number]> = [];

  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Forest, RESOURCES.Stone]);
  }
  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Forest, -1]);
  }
  for (let i = 0; i < 4; i++) {
    tiles.push([LAND.River, -1]);
  }
  for (let i = 0; i < 4; i++) {
    tiles.push([LAND.Water, -1]);
  }
  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Desert, RESOURCES.Stone]);
  }
  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Desert, -1]);
  }
  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Plains, -1]);
  }
  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Plains, RESOURCES.Horse]);
  }
  for (let i = 0; i < 4; i++) {
    tiles.push([LAND.Field, -1]);
  }
  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Mountain, RESOURCES.Copper]);
  }
  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Mountain, RESOURCES.Iron]);
  }
  for (let i = 0; i < 2; i++) {
    tiles.push([LAND.Mountain, RESOURCES.Coal]);
  }
  shuffle(tiles);
  return tiles;
}

/**
 * Generate all tiles with a distance of more than 3 to the base
 * @returns {Array<[LAND, number]>} - Returns a list of containing enough random tiles to fill the remainder of the board after filling the inner 4 layers
 */
function randomLayer():Array<[LAND, number]> {
  const tiles:Array<[LAND, number]> = [];
  for (let i = 0; i < Board.WIDTH * Board.HEIGHT - (1+6+12+18); i++) {
    const type:LAND = Math.floor((Math.random() * (LAND.Length - 1))); // Exclude base
    if (type === LAND.Plains) {
      tiles.push([LAND.Plains, RESOURCES.Horse]);
    } else if (type === LAND.Forest) {
      tiles.push([LAND.Forest, RESOURCES.Stone]);
    } else if (type === LAND.Mountain) {
      const rnd = Math.floor(Math.random() * 100);
      const coalPercentage = 10;
      const copperPercentage = 10;
      const ironPercentage = 10;
      if (rnd < coalPercentage) {
        tiles.push([LAND.Mountain, RESOURCES.Coal]);
      } else if (rnd < coalPercentage + copperPercentage) {
        tiles.push([LAND.Mountain, RESOURCES.Copper]);
      } else if (rnd < coalPercentage + copperPercentage + ironPercentage) {
        tiles.push([LAND.Mountain, RESOURCES.Iron]);
      } else {
        tiles.push([LAND.Mountain, -1]);
      }
    } else {
      tiles.push([type, -1]);
    }
  }
  return tiles;
}

/**
 * Perform a BFS to determine each tile's distance to the base
 * @param centerHex {Tile} - The tile containing the base
 */
function calculateDistances(centerHex:Tile):void {
  let distance = 0;
  let currentTiles = centerHex.setDistance(distance);
  let nextTiles = [];
  while (currentTiles.length > 0) {
    distance++;
    for (const currentTile of currentTiles) {
      if (currentTile !== null) {
        nextTiles = nextTiles.concat(currentTile.setDistance(distance));
      }
    }
    currentTiles = nextTiles;
    nextTiles = [];
  }
}

/**
 * Set the neighbours of each tile
 * @param board {Array<Array<Tile>>} - The matrix containing all the tiles
 */
function linkAllHexes(board:Array<Array<Tile>>):void {
  for (let y = 0; y < Board.HEIGHT; y++) {
    for (let x = 0; x < Board.WIDTH; x++) {
      const offset =  y % 2;
      linkHexes(board[y][x], board[y - 1] === undefined ? undefined : board[y - 1][x - 1 + offset], DIRECTIONS.NW);
      linkHexes(board[y][x], board[y - 1] === undefined ? undefined : board[y - 1][x + offset], DIRECTIONS.NE);
      linkHexes(board[y][x], board[y] === undefined ? undefined : board[y][x + 1], DIRECTIONS.E);
    }
  }
}

/**
 * Help-function of linkAllHexes which sets the neighbour properties of the two tiles
 * @param tile {Tile} - The southern tile
 * @param otherTile {Tile} - The northern tile
 * @param location {DIRECTIONS} - The location of the northern tile compared to the southern tile
 */
function linkHexes(tile:Tile, otherTile:Tile, location:DIRECTIONS):void {
  if (otherTile !== undefined) {
    tile.setNeighbour(location, otherTile);
    otherTile.setNeighbour(location + 3, tile);
  }
}

/**
 * Generate a new board. DOES NOT set the content of the tiles
 * @param game {MainGame} - The main game object of the game
 * @param parent {Phaser.Group} - The parent group which the tiles should be added to
 * @returns {Array<Array<Tile>>} - Returns a matrix containing new tiles which have not been assigned any data yet
 */
export function boardSkeleton(game:MainGame, parent:Phaser.Group):Array<Array<Tile>> {
  const board:Array<Array<Tile>> = [];
  for (let y = 0; y < Board.HEIGHT; y++) {
    board.push([]);
    for (let x = 0; x < Board.WIDTH; x++) {
      const tile:Tile = new Tile(game, Tile.WIDTH * (x + 1/2* (y % 2)), (Tile.HEIGHT / 4 * 3) * y, parent);
      board[y].push(tile);
      tile.onclick(() => {
        if (game.gamestate === 'building') {
          // -------------- REQUIREMENTS FOR BUILDING --------------
          // You own the tile
          // The chosen building can be built on a tile of this type
          // You can afford to build the building
          // No other building exist on the tile
          if (tile.purchased &&
            BUILDINGCLASSES[game.option].canBuild(tile) &&
            game.materialContainer.materials.isSubset(BUILDINGCLASSES[game.option].getRequiredMaterials()) &&
            tile.building === undefined) {
            game.materialContainer.pay(BUILDINGCLASSES[game.option].getRequiredMaterials());
            tile.addBuilding(game.option);
            game.needsupdate = true;
          }
        } else if (game.gamestate === 'buying') {
          // --------------- REQUIREMENTS FOR BUYING ---------------
          // You do not own the tile
          // The land is close enough to your base
          // You can afford to buy the land
          if (!tile.purchased &&
            tile.distance <= Tile.buildDistance &&
            game.materialContainer.materials.get(MATERIALS.Food) >= 10*Math.pow(1.4, tile.distance)) {
            game.materialContainer.materials.subtract(MATERIALS.Food, 10*Math.pow(1.4, tile.distance));
            tile.purchase();
            game.needsupdate = true;
          }
        }
      });
    }
  }
  linkAllHexes(board);

  const centerX = Math.floor(Board.WIDTH / 2);
  const centerY = Math.floor(Board.HEIGHT / 2);
  calculateDistances(board[centerY][centerX]);

  return board;
}

/**
 * Generates content for the given board
 * @param board {Array<Array<Tile>>} - The matrix containing the tiles that are to be assigned data
 */
export function newContent(board:Array<Array<Tile>>):void {
  const layer1:Array<[LAND, number]> = constantLayer();
  const layer2:Array<[LAND, number]> = pseudoLayer();
  const layer3:Array<[LAND, number]> = randomLayer();

  for (const list of board) {
    for (const tile of list) {
      if (tile.distance >= 4) {
        tile.setTile(layer3.pop());
      } else if (tile.distance >= 2) {
        tile.setTile(layer2.pop());
      } else if (tile.distance >= 1) {
        tile.setTile(layer1.pop());
        tile.purchase();
      } else {
        const centerX = Math.floor(Board.WIDTH / 2);
        const centerY = Math.floor(Board.HEIGHT / 2);
        board[centerY][centerX].setTile([LAND.Base, -1]);

        tile.purchase();
        board[centerY][centerX].addBuilding(BUILDINGS.Base);
      }
    }
  }
}

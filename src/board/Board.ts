import { MainGame } from '../MainGame';
import { Tile } from './Tile';
import { boardSkeleton, newContent } from './gameStart';
import { Counter } from '../Counter';
import { Updateable } from '../Interfaces';
import { loadGame } from '../SaveHandler';
import { MATERIALS, BUILDINGCLASSES } from '../Constants';

/** No documentation available */
export class Board implements Updateable {

  public static readonly WIDTH:number = 16;
  public static readonly HEIGHT:number = 16;

  private board:Array<Array<Tile>>;

  constructor(game:MainGame) {
    const group:Phaser.Group = game.add.group();
    this.board = boardSkeleton(game, group);

    group.x = Math.floor((game.game.world.width - Tile.WIDTH * Board.WIDTH) / 2);
    if (Board.WIDTH % 2 === 0) {
      group.x -= Math.floor(Tile.WIDTH / 4);
    }
    group.y = (game.game.world.height - Math.ceil(Board.HEIGHT / 2) * Tile.HEIGHT - Math.floor(Board.HEIGHT / 2) * Tile.HEIGHT / 2) / 2;
    if (Board.HEIGHT % 2 === 0) {
      group.y -= Math.floor(Tile.HEIGHT / 8);
    }
  }

  /** Update all the tiles on the board */
  public update():void {
    for (const list of this.board) {
      for (const tile of list) {
        tile.update();
      }
    }
  }

  /** Export the board as JSON */
  public toJSON():object {
    return this.board;
  }

  /** Load a board from JSON */
  public fromJSON(data:Array<Array<object>>):void {
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        this.board[y][x].fromJSON(data[y][x]);
      }
    }
  }

  /** Calculate how much the player gathers in one game-tick */
  public generateMaterials():Counter<MATERIALS> {
    let resourceGain:Counter<MATERIALS> = new Counter<MATERIALS>();
    for (const row of this.board) {
      for (const tile of row) {
        resourceGain = resourceGain.addOther(tile.generateMaterials());
      }
    }
    return resourceGain;
  }

  /** Fill the board with data if it doesn't already contain some */
  public requestNewContent():void {
    if (this.board[0][0].type === -1) {
      newContent(this.board);
    }
  }
}

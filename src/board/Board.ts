import { MainGame } from '../MainGame';
import { Tile } from './Tile';
import { boardSkeleton, assignContent } from './gameStart';
import { Updateable } from '../Interfaces';
import { loadGame } from '../SaveHandler';
import { MATERIALS, BUILDINGCLASSES } from '../Constants';

/** No documentation available */
export class Board implements Updateable {

  public static readonly WIDTH:number = 16;
  public static readonly HEIGHT:number = 16;

  public board:Array<Array<Tile>>;

  private group:Phaser.Group;

  constructor(game:MainGame) {
    this.group = game.add.group();
    this.board = boardSkeleton(game, this.group);

    this.group.x = Math.floor((game.game.world.width - Tile.WIDTH * Board.WIDTH) / 2);
    if (Board.WIDTH % 2 === 0) {
      this.group.x -= Math.floor(Tile.WIDTH / 4);
    }
    this.group.y = (game.game.world.height - Math.ceil(Board.HEIGHT / 2) * Tile.HEIGHT - Math.floor(Board.HEIGHT / 2) * Tile.HEIGHT / 2) / 2;
    if (Board.HEIGHT % 2 === 0) {
      this.group.y -= Math.floor(Tile.HEIGHT / 8);
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

  /** We are only interested in the tiles, not the handler */
  public toJSON():object {
    return this.board;
  }
}

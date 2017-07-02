import { GameState } from '../GameState';
import { Updateable } from '../Interfaces';

/** No documentation available */
export abstract class Menu implements Updateable {

  public group:Phaser.Group;
  protected background:Phaser.Sprite;

  protected content:Phaser.Group;

  protected state:GameState;
  protected game:Phaser.Game;

  /** No documentation available */
  constructor(state:GameState, x:number, y:number, textureKey:string, textureName:string) {
    this.state = state;
    this.game = state.game;
    this.state.menus.push(this);
    this.group = this.state.add.group();
    this.background = this.state.add.sprite(0, 0, textureKey, textureName, this.group);
    this.content = this.state.add.group(this.group);
    this.group.x = x;
    this.group.y = y;
  }

  /** No documentation available */
  abstract update():void;
}

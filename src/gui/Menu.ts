import { GameState } from '../GameState';
import { Updateable } from '../Interfaces';

export abstract class Menu implements Updateable {

  /** The group of this button */
  public group:Phaser.Group;
  /** The sprite used as a background for this menu */
  protected background:Phaser.Sprite;

  /** The group containing all the graphics of the menu except for the background-image */
  protected content:Phaser.Group;

  /** The state of the game */
  protected state:GameState;
  /** The main game object of the game */
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

  /** Updates the menu */
  abstract update():void;
}

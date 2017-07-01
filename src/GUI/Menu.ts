import { MainGame } from '../MainGame';
import { Updateable } from '../Updateable';

export class Menu implements Updateable {

  public group:Phaser.Group;
  protected background:Phaser.Sprite;

  protected content:Phaser.Group;

  protected game:MainGame;

  constructor(game:MainGame, x:number, y:number, textureKey:string, textureName:string) {
    this.game = game;
    this.game.menus.push(this);
    this.group = this.game.add.group();
    this.background = this.game.add.sprite(0, 0, textureKey, textureName, this.group);
    this.content = this.game.add.group(this.group);
    this.group.x = x;
    this.group.y = y;
  }

  update():void {}
}

import { Game } from './app';
import { Button } from './Button';

export class MainMenu extends Phaser.State {

  static myGame: Game;
  count:number;

  preload() {
    this.game.load.enableParallel = true;
    this.game.load.atlasJSONHash('tiles', 'assets/tiles.png', 'assets/tiles.json');
    this.game.load.atlasJSONHash('resources', 'assets/resources.png', 'assets/resources.json');
    this.game.load.atlasJSONHash('buildings', 'assets/buildings.png', 'assets/buildings.json');
    this.game.load.atlasJSONHash('menu', 'assets/menu.png', 'assets/menu.json');
  }

  create() {
    this.count = 0;
  // const buy:Button = new Button(this.game, 224, 0, 'menu', 'Buy', 'button.png', style2);
  // buy.onToggle(function(){
  // });

  }

  update(){
    if(this.count > 60){
      this.state.start('mainGame', true, false);
    }
    this.count += 1;
  }

}

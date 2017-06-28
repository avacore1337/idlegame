import { MainGame } from './MainGame';
import { Preload } from './Preload';
import { MainMenu } from './MainMenu';

export class Game extends Phaser.Game {
  wantLoad:boolean;

  constructor(){
    super(1200, 600, Phaser.CANVAS, 'gameDiv');
    this.wantLoad = true;
    this.state.add('preload', Preload);
    this.state.add('mainMenu', MainMenu);
    this.state.add('mainGame', MainGame);
    MainGame.myGame = this;
    MainMenu.myGame = this;
  }

  start(){
    this.state.start('preload');
  }

}

window.onload = () => {
  const game = new Game();
  game.start();
};

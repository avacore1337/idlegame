import { MainGame } from './MainGame';
import { Preload } from './Preload';
import { MainMenu } from './GUI/MainMenu';

/** No documentation available */
export class Game extends Phaser.Game {
  wantLoad:boolean;

  /** No documentation available */
  constructor(){
    super(1200, 600, Phaser.CANVAS, 'gameDiv');
    this.wantLoad = true;
    this.state.add('preload', Preload);
    this.state.add('mainMenu', MainMenu);
    this.state.add('mainGame', MainGame);
  }

  /** No documentation available */
  start(){
    this.state.start('preload');
  }

}

/** No documentation available */
window.onload = () => {
  const game = new Game();
  game.start();
};

import { GameState } from './GameState';
import { Preload } from './Preload';
import { MainMenu } from './gui/MainMenu';

/** No documentation available */
export class Game extends Phaser.Game {
  wantLoad:boolean;

  /** No documentation available */
  constructor() {
    super(1200, 600, Phaser.CANVAS, 'gameDiv');
    this.wantLoad = true;
    this.state.add('preload', Preload);
    this.state.add('mainMenu', MainMenu);
    this.state.add('mainGame', GameState);
  }

  /** No documentation available */
  start():void {
    this.state.start('preload');
  }

}

/** No documentation available */
window.onload = () => {
  const game = new Game();
  game.start();
};

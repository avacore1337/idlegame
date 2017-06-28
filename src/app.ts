import { MainGame } from './MainGame';
import { Preload } from './Preload';
import { MainMenu } from './MainMenu';

class Game extends Phaser.Game {
  constructor(){
    super(1200, 600, Phaser.CANVAS, 'gameDiv');
    this.state.add('preload', Preload);
    this.state.add('mainMenu', MainMenu);
    this.state.add('mainGame', MainGame);
    this.state.start('preload');
  }
}

window.onload = () => {
  const game = new Game();
};

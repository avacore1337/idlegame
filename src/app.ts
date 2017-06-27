import { MainGame } from './MainGame';
import { Preload } from './Preload';
import { MainMenu } from './MainMenu';

window.onload = () => {
  console.log('testtesttest2');
  const game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'gameDiv');
  game.state.add('preload', Preload);
  game.state.add('mainMenu', MainMenu);
  game.state.add('mainGame', MainGame);
  game.state.start('preload');
};

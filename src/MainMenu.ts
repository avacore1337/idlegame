import { Game } from './app';
import { Button } from './Button';
import { resetSave } from './SaveHandler';

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
    const self = this;
    this.count = 0;
  // const buy:Button = new Button(this.game, 224, 0, 'menu', 'Buy', 'button.png', style2);
  // buy.onToggle(function(){
  // });
  const style = { font: '14px Arial', fill: '#000000', align: 'center' };
  const newGame:Button = new Button(this.game, 535, 260, 'menu', 'New Game', 'button.png', style);
  newGame.onClick(Button.REGULAR, function(){
    resetSave();
    self.state.start('mainGame', true, false);
  });
  const load:Button = new Button(this.game, 535, 300, 'menu', 'Load Game', 'button.png', style, {disableAble:true});
  load.onClick(Button.REGULAR, function(){
    self.state.start('mainGame', true, false);
  });
  if(typeof(Storage) !== 'undefined' || localStorage.getItem('map') === undefined) {
    // load.disable();
  }
  // buy.setToolTip('You need food to settle new areas.', Button.REGULAR);
  }

}

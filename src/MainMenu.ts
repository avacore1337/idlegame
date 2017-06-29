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
    this.game.load.atlasJSONHash('tutorial', 'assets/tutorial.png', 'assets/tutorial.json');
  }

  create() {
    const self = this;
    this.count = 0;
  // const buy:Button = new Button(this.game, 224, 0, 'menu', 'Buy', 'button.png', basicStyle);
  // buy.onToggle(function(){
  // });
  const headerStyle = { font: '14px Arial', fill: '#000000', align: 'center' };
  const newGame:Button = new Button(this.game, 535, 260, 'menu', 'New Game', 'button.png', headerStyle);
  newGame.onClick(Button.REGULAR, function(){
    resetSave();
    self.state.start('mainGame', true, false);
  });
  const load:Button = new Button(this.game, 535, 300, 'menu', 'Load Game', 'button.png', headerStyle, {disableAble:true, disabledImage: 'buttondisabled.png'});
  load.onClick(Button.REGULAR, function(){
    self.state.start('mainGame', true, false);
  });
  if(typeof(Storage) === 'undefined' || localStorage.getItem('map') === null) {
    load.disable();
  }
  // buy.setToolTip('You need food to settle new areas.', Button.REGULAR);
  }

}

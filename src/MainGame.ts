import { Counter } from './Counter';
import { Menu } from './gui/Menu';
import { Button } from './gui/Button';
import { Board } from './board/Board';
import { MaterialContainer } from './MaterialContainer';
import { cameraControls } from './cameraControls';
import { createMenu } from './gui/menuHandler';
import { loadGame } from './SaveHandler';
import { EraList } from './TechTree';
import { MATERIALS, MATERIALSTRINGLIST, CONSTRUCTIONCLASSES } from './Constants';

/** No documentation available */
export class MainGame extends Phaser.State {

  era:number = 0;
  evolutionPoints:number = 0;
  menuGroup:Phaser.Group;
  cursors:Phaser.CursorKeys;
  board:Board;
  gamestate:string;
  option:number;
  needsupdate:boolean;
  materialUpdate:number;
  modal:gameModal;
  allButtons:Array<Button>;
  menus:Array<Menu>;

  materialContainer:MaterialContainer;

  /** No documentation available */
  create():void {
    this.allButtons = [];
    this.materialUpdate = 0;
    this.gamestate = '';
    this.needsupdate = false;
    this.menus = [];
    this.game.world.setBounds(0, 0, 1600, 1600);
    this.game.stage.backgroundColor = '#ffffff';

    this.board = new Board(this);
    loadGame(this);

    this.modal = new gameModal(this.game);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    createMenu(this);

    const cameraCenterX = (this.game.world.width - this.game.width) / 2;
    const cameraCenterY = (this.game.world.height - this.game.height) / 2;

    this.game.camera.x = cameraCenterX;
    this.game.camera.y = cameraCenterY;

    this.needsupdate = true;
  }

  /** No documentation available */
  update():void {

    for (const menu of this.menus) {
      menu.update();
    }
    for(const button of this.allButtons){
      button.update();
    }

    if (this.needsupdate) {
      this.needsupdate = false;

      let resourceGain = new Counter<MATERIALS>();
      for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
          resourceGain.add(i, 0);
      }
      resourceGain = resourceGain.addOther(this.board.generateMaterials());
      for (const c of CONSTRUCTIONCLASSES) {
        resourceGain = resourceGain.addOther(c.generateMaterials());
      }
      this.materialContainer.materialGainBase = resourceGain;

      this.board.update();
    }

    // Update camera
    cameraControls(this.game, this.cursors);
    EraList[this.era].research(this);
  }

  /** No documentation available */
  render():void {
    return;
  }

}

import { Counter } from './Counter';
import { Menu } from './GUI/Menu';
import { Button } from './GUI/Button';
import { Square } from './Board/Square';
import { MaterialContainer } from './MaterialContainer';
import { cameraControls } from './cameraControls';
import { createMenu } from './GUI/menuHandler';
import { generateHexGroup } from './Board/hexes';
import { loadGame } from './SaveHandler';
import { MATERIALS, MATERIALSTRINGLIST, CONSTRUCTIONCLASSES } from './Constants';

/** No documentation available */
export class MainGame extends Phaser.State {

  era:number = 0;
  evolutionPoints:number = 0;
  hexagonWidth:number = 70;
  hexagonHeight:number = 80;
  gridSizeX:number = 16;
  gridSizeY:number = 16;
  menuGroup:Phaser.Group;
  hexagonGroup:Phaser.Group;
  squareLayer:Phaser.Group;
  borderLayer:Phaser.Group;
  resourceLayer:Phaser.Group;
  buildingLayer:Phaser.Group;
  cursors:Phaser.CursorKeys;
  hexMatrix: Square[][];
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
    // this.game = theGame;
    this.hexMatrix = [];
    for (let i = 0; i < this.gridSizeY; i++) {
      this.hexMatrix.push([]);
    }
    // game.era = parseInt(localStorage.getItem('era'));

    this.modal = new gameModal(this.game);
    loadGame(this);
    this.game.stage.backgroundColor = '#ffffff';
    this.game.world.setBounds(0, 0, 1600, 1600);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    generateHexGroup(this);
    createMenu(this);

    const cameraCenterX = (this.game.world.width - this.game.width)/2;
    const cameraCenterY = (this.game.world.height - this.game.height)/2;

    this.game.camera.x = cameraCenterX;
    this.game.camera.y = cameraCenterY;
    this.needsupdate = true;
  }

  /** No documentation available */
  update():void {

    for (const menu of this.menus) {
      menu.update();
    }

    if (this.needsupdate) {
      this.needsupdate = false;

      let resourceGain = new Counter<MATERIALS>();
      for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
          resourceGain.add(i, 0);
      }
      for(const row of this.hexMatrix){
        for(const hex of row){
          resourceGain = resourceGain.addOther(hex.generateMaterials());
        }
      }
      for (const c of CONSTRUCTIONCLASSES) {
        resourceGain = resourceGain.addOther(c.generateMaterials());
      }
      this.materialContainer.materialGainBase = resourceGain;

      this.updateHexes();
    }

    // Update camera
    cameraControls(this.game, this.cursors);
  }

  /** No documentation available */
  updateHexes():void {
    for(const row of this.hexMatrix){
      for(const hex of row){
        hex.update();
      }
    }
  }

  /** No documentation available */
  render():void {}

}

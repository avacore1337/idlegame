import { Counter } from './Counter';
import { Button } from './Button';
import { Game } from './app';
import { Square } from './Square';
import { MaterialContainer } from './MaterialContainer';
import { cameraControls } from './cameraControls';
import { createMenu } from './menu';
import { generateHexGroup } from './hexes';
import { loadMaterials } from './SaveHandler';
import { MATERIALS, MATERIALSTRINGLIST, CONSTRUCTIONCLASSES } from './Constants';

export class MainGame extends Phaser.State {

  static myGame: Game;
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
  allToggleableButtons:Array<Button>;

  // materials:Counter<MATERIALS>;
  materialContainer:MaterialContainer;
  materialLabels:Phaser.Text[]; // TODO ; These should not be here I don't think

  // constructor() {
  //   this.materialLabels = [];
  //   this.materialUpdate = 0;
  //   this.gamestate = '';
  //   this.needsupdate = false;
  //   this.hexMatrix = [];
  //   for (let i = 0; i < this.gridSizeY; i++) {
  //     this.hexMatrix.push([]);
  //   }
  // }

  create():void {
    this.allToggleableButtons = [];
    this.materialLabels = [];
    this.materialUpdate = 0;
    this.gamestate = '';
    this.needsupdate = false;
    // this.game = theGame;
    this.hexMatrix = [];
    for (let i = 0; i < this.gridSizeY; i++) {
      this.hexMatrix.push([]);
    }

    this.modal = new gameModal(this.game);
    loadMaterials(this);
    this.game.stage.backgroundColor = '#ffffff';
    this.game.world.setBounds(0, 0, 1600, 1600);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    generateHexGroup(this);
    createMenu(this);

    const cameraCenterX = (this.game.world.width - this.game.width)/2;
    const cameraCenterY = (this.game.world.height - this.game.height)/2;

    this.game.camera.x = cameraCenterX;
    this.game.camera.y = cameraCenterY;
    // this.menuGroup.x = cameraCenterX;
    // this.menuGroup.y = cameraCenterY;
    this.needsupdate = true;
  }

  update():void {

    this.materialUpdate = (this.materialUpdate + 1) % 20;
    if (this.materialUpdate === 0) {
      this.materialContainer.gainMaterialsFraction(3);
      let visibleLabels = -1;
      const materials = this.materialContainer.materials;
      const gains = this.materialContainer.getMaterialGains();
      for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
        let text = MATERIALSTRINGLIST[i] + ' ' + materials.get(i).toFixed(2);
        text += '  (' + gains.get(i).toFixed(2) + '/s)';
        this.materialLabels[i].setText(text);
        this.materialLabels[i].y = 3;
        this.materialLabels[i].visible = false;
        if (materials.get(i) > 0) {
          visibleLabels++;
          this.materialLabels[i].visible = true;
          this.materialLabels[i].y += 30 * visibleLabels;
        }
      }
      for (const c of CONSTRUCTIONCLASSES) {
        c.doThing(this);
      }
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
      for(const row of this.hexMatrix){
        for(const hex of row){
          hex.update();
        }
      }
    }

    // Update camera
    cameraControls(this.game, this.cursors);
  }

  render():void {
    // this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }

}

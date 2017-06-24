import { Counter } from "./Counter";
import { Square } from "./Square";
import { Building } from "./buildings/AllBuildings";
import { MaterialContainer } from "./MaterialContainer";
import { resourceLoader } from "./resourceLoader";
import { cameraControls } from "./cameraControls";
import { createMenu } from "./menu"
import { generateHexGroup } from "./hexes"
import { loadMap, loadMaterials, saveGame, resetSave } from "./SaveHandler";
import { DIRECTIONS, MATERIALS, MATERIALSTRINGLIST, SQUARETYPES, SQUARETYPELIST , BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES, RESOURCES } from "./Constants";

export class MainGame {

  game: Phaser.Game;

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
  state:string;
  option:number;
  needsupdate:boolean;
  materialUpdate:number;
  // materials:Counter<MATERIALS>;
  materialContainer:MaterialContainer;
  materialLabels:Phaser.Text[]; // TODO ; These should not be here I don't think

  constructor(theGame:Phaser.Game) {
    loadMaterials(this);
    this.materialLabels = [];
    this.materialUpdate = 0;
    this.state = "";
    this.needsupdate = false;
    this.game = theGame;
    this.hexMatrix = [];
    for (let i = 0; i < this.gridSizeY; i++) {
      this.hexMatrix.push([]);
    }
  }

  onPreload() {
    resourceLoader(this.game);
  }

  onCreate():void {
    let self = this;
    this.game.stage.backgroundColor = "#ffffff";
    this.game.world.setBounds(0, 0, 1600, 1600);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    generateHexGroup(this);
    createMenu(this);

    let cameraCenterX = (this.game.world.width - this.game.width)/2;
    let cameraCenterY = (this.game.world.height - this.game.height)/2;

    this.game.camera.x = cameraCenterX;
    this.game.camera.y = cameraCenterY;
    this.menuGroup.x = cameraCenterX;
    this.menuGroup.y = cameraCenterY;
  }

  onUpdate():void {

    this.materialUpdate = (this.materialUpdate + 1) % 20;
    if (this.materialUpdate === 0) {
      this.materialContainer.gainMaterialsFraction(3);
      let visibleLabels = -1;
      let materials = this.materialContainer.materials;
      let gains = this.materialContainer.getMaterialGains();
      for (var i = 0; i < MATERIALSTRINGLIST.length; i++) {
        let text = MATERIALSTRINGLIST[i] + " " + materials.get(i).toFixed(2);
        text += "  (" + gains.get(i).toFixed(2) + "/s)";
        this.materialLabels[i].setText(text);
        this.materialLabels[i].y = 3;
        this.materialLabels[i].visible = false;
        if (materials.get(i) > 0) {
          visibleLabels++;
          this.materialLabels[i].visible = true;
          this.materialLabels[i].y += 30 * visibleLabels;
        }
      }
      for (let c of CONSTRUCTIONCLASSES) {
        c.doThing(this);
      }
    }

    if (this.needsupdate) {
      this.needsupdate = false;

      let resourceGain = new Counter<MATERIALS>();
      for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
          resourceGain.add(i, 0);
      }
      for (let y = 0; y < this.hexMatrix.length; y++) {
        for (let x = 0; x < this.hexMatrix[y].length; x++) {
          resourceGain = resourceGain.addOther(this.hexMatrix[y][x].generateMaterials());
        }
      }
      for (let c of CONSTRUCTIONCLASSES) {
        resourceGain = resourceGain.addOther(c.generateMaterials());
      }

      this.materialContainer.materialGainBase = resourceGain;

      for (let i = 0; i < this.hexMatrix.length; i++) {
        for (let j = 0; j < this.hexMatrix[i].length; j++) {
          this.hexMatrix[i][j].update();
        }
      }
    }

    // Update camera
    cameraControls(this.game, this.cursors, this.menuGroup);
  }

  onRender():void {
    // this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }

}

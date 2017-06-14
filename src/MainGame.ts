import { Counter } from "./Counter";
import { Square } from "./Square";
import { Lumbermill } from "./Lumbermill";
import { resourceLoader } from "./resourceLoader";
import { cameraControls } from "./cameraControls";
import { DIRECTIONS, MATERIALS, SQUARETYPES, SQUARETYPELIST , BUILDINGS } from "./Constants";

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

  constructor(theGame:Phaser.Game) {
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
    this.generateHexGroup();

    this.menuGroup = this.game.add.group();


    this.menuGroup.x = 0;
    this.menuGroup.y = 0;

    let menu = this.game.add.sprite(0, 0, 'menu');
    this.menuGroup.add(menu);

    let menu2 = this.game.add.sprite(336, 600, 'menu');
    menu2.anchor.setTo(1, 1);
    this.menuGroup.add(menu2);
    let style = { font: "14px Arial", fill: "#000000", align: "center" };
    let button1 = this.game.add.sprite(0, 0, 'button');
    let buildingGroup = this.game.add.group();
    this.menuGroup.add(buildingGroup);
    let style2 = { font: "14px Arial", fill: "#000000", align: "left" };
    let lumberbutton = this.game.add.sprite(0, 0, 'button2');
    let lumbertext:Phaser.Text = this.game.add.text(3, 3, "Lumbermill", style);
    let lumbergroup = this.game.add.group();
    lumbergroup.y += 25
    lumbergroup.add(lumberbutton)
    lumbergroup.add(lumbertext)
    buildingGroup.add(lumbergroup);
    lumbergroup.visible = Lumbermill.isEnabled();
    lumberbutton.inputEnabled = true;;
    lumberbutton.events.onInputUp.add(function() {
      self.needsupdate = true;
      if (self.state !== "building") {
        self.state = "building";
        self.option = BUILDINGS.Lumbermill;
      } else {
        self.state = "";
      }
    });










    // menu.inputEnabled = true;
    // let toggle = true;
    // let self = this;
    // menu.events.onInputUp.add(function() {
    //   self.needsupdate = true;
    //   if (toggle) {
    //     self.state = "buying";
    //     menu.tint = 0xff00ff;
    //     toggle = false;
    //   } else {
    //     self.state = "";
    //     menu.tint = 0xffffff;
    //     toggle = true;
    //   }
    // });

    let button2 = this.game.add.sprite(112, 0, 'button');
    let button3 = this.game.add.sprite(224, 0, 'button');
    this.menuGroup.add(button1);
    this.menuGroup.add(button2);
    this.menuGroup.add(button3);

    let buildings:Phaser.Text = this.game.add.text(30, 3, "Buildings", style);
    let town:Phaser.Text = this.game.add.text(120, 3, "Town buildings", style);
    let research:Phaser.Text = this.game.add.text(250, 3, "Research", style);
    this.menuGroup.add(buildings);
    this.menuGroup.add(town);
    this.menuGroup.add(research);



    //Only difference to a Button constructor is the label parameter...
    // let LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame){
    //   Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    //   //Style how you wish...
    //   this.style = {        'font': '10px Arial',        'fill': 'black'    };
    //   this.label = new Phaser.Text(game, 0, 0, "Label", this.style);
    //   this.addChild(this.label);    this.setLabel("Label");
    // };
    //   LabelButton.prototype = Object.create(Phaser.Button.prototype);
    //   LabelButton.prototype.constructor = LabelButton;
    //   LabelButton.prototype.setLabel = function(label){    this.label.setText(label)    this.label.x = Math.floor((this.width - this.label.width)*0.5);
    //     this.label.y = Math.floor((this.height - this.label.height)*0.5);
    //   };

    let cameraCenterX = (this.game.world.width - this.game.width)/2;
    let cameraCenterY = (this.game.world.height - this.game.height)/2;

    this.game.camera.x = cameraCenterX;
    this.game.camera.y = cameraCenterY;
    this.menuGroup.x = cameraCenterX;
    this.menuGroup.y = cameraCenterY;
  }

  //
  onUpdate():void {
    if (this.needsupdate) {
        this.needsupdate = false;
        for (let i = 0; i < this.hexMatrix.length; i++) {
          for (let j = 0; j < this.hexMatrix[i].length; j++) {
            this.hexMatrix[i][j].update();
          }
        }
    }
    cameraControls(this.game, this.cursors, this.menuGroup);
  }

  linkHexes(square, i, j, index){
    if(i < 0 || i >= this.gridSizeX || j < 0 || j >= this.gridSizeY){
      return;
    }
    else{
      let otherSquare = this.hexMatrix[i][j];
      square.neighbours[index] = otherSquare;
      otherSquare.neighbours[(index + 3) % 6] = square;
    }
  }

  generateHexGroup():void {
    let self = this;
    this.hexagonGroup = this.game.add.group();
    this.squareLayer = this.game.add.group();
    this.borderLayer = this.game.add.group();
    this.resourceLayer = this.game.add.group();
    this.buildingLayer = this.game.add.group();
    this.hexagonGroup.add(this.squareLayer)
    this.hexagonGroup.add(this.borderLayer)
    this.hexagonGroup.add(this.resourceLayer)
    this.hexagonGroup.add(this.buildingLayer)
    for (let i = 0; i < this.gridSizeY; i++) {
      for (let j = 0; j < this.gridSizeX; j++) {
        let rnd = Math.floor((Math.random() * (SQUARETYPELIST.length - 1))); //not including base
        let square:Square = new Square(this, j, i, SQUARETYPELIST[rnd]);
        this.hexMatrix[i].push(square);
        let theSquare = square;
        let newCenter = square.center;
        let toggled = true;
        newCenter.inputEnabled = true;
        newCenter.events.onInputUp.add(function() {
          self.needsupdate = true;
          theSquare.purchased = true;
          theSquare.revealNeighbours();
        });
      }
    }

    for (let i = 0; i < this.gridSizeX; i++) {
      for (let j = 0; j < this.gridSizeY; j++) {
          let offset = (i)%2;
          this.linkHexes(this.hexMatrix[i][j], i - 1, j - 1 + offset, 0);
          this.linkHexes(this.hexMatrix[i][j], i - 1, j + offset, 1);
          this.linkHexes(this.hexMatrix[i][j], i, j + 1, 2);
      }
    }
    let centerX = Math.floor(this.gridSizeX/2);
    let centerY = Math.floor(this.gridSizeY/2);
    let centerHex = this.hexMatrix[centerX][centerY];

    centerHex.setType(SQUARETYPES.Base);
    if(centerHex.resource != null){
      centerHex.resource.destroy();
    }
    centerHex.buildingSprite = this.game.add.sprite(centerHex.center.x + 10 ,centerHex.center.y + 20, "building");
    this.buildingLayer.add(centerHex.buildingSprite);
    centerHex.purchased = true;
    centerHex.reveal();
    centerHex.revealNeighbours();
    this.hexagonGroup.x = (this.game.world.width - this.hexagonWidth * Math.ceil(this.gridSizeX)) / 2;
    if (this.gridSizeX % 2 === 0) {
      this.hexagonGroup.x -= this.hexagonWidth / 4;
    }
    this.hexagonGroup.y = (this.game.world.height - Math.ceil(this.gridSizeY / 2) * this.hexagonHeight - Math.floor(this.gridSizeY / 2) * this.hexagonHeight / 2) / 2;
    if (this.gridSizeY % 2 === 0) {
      this.hexagonGroup.y -= this.hexagonHeight / 8;
    }
  }

  onRender():void {
    // this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }

}

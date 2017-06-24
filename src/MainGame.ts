import { Counter } from "./Counter";
import { Square } from "./Square";
import { Building } from "./buildings/AllBuildings";
import { TechList } from "./TechTree";
import { MaterialContainer } from "./MaterialContainer";
import { resourceLoader } from "./resourceLoader";
import { cameraControls } from "./cameraControls";
import { newGame } from "./gameStart"
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
    this.generateHexGroup();

    this.menuGroup = this.game.add.group();

    this.menuGroup.x = 0;
    this.menuGroup.y = 0;

    let style = { font: "14px Arial", fill: "#000000", align: "center" };
    let style2 = { font: "14px Arial", fill: "#000000", align: "left" };

    let topMenu = this.game.add.group();
    let topSprite = this.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
    topMenu.add(topSprite);
    this.menuGroup.add(topMenu);

    let botMenu = this.game.add.group();
    let botSprite = this.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
    botMenu.add(botSprite);
    this.menuGroup.add(botMenu);

    botMenu.y = 320;

    // Display owned materials
    // -----------------------
    let visibleLabels = -1;
    for (var i = 0; i < MATERIALSTRINGLIST.length; i++) {
      let label:Phaser.Text = this.game.add.text(3, 3, MATERIALSTRINGLIST[i] + " " + this.materialContainer.materials.get(i).toFixed(2), style);
      label.visible = false;
      if (this.materialContainer.materials.get(i) > 0) {
        visibleLabels++;
        label.visible = true;
        label.y += 30 * visibleLabels;
      }
      this.materialLabels.push(label);
      botMenu.add(label);
    }

    // Buttons for special things
    // --------------------------
    let buyGroup:Phaser.Group = this.game.add.group();
    buyGroup.visible = true;
    botMenu.add(buyGroup);
    let buyButton:Phaser.Sprite = this.game.add.sprite(224, 0, 'menu', 'button.png');
    buyButton.visible = true;
    buyButton.inputEnabled = true;
    buyGroup.add(buyButton);
    let buyText:Phaser.Text = this.game.add.text(250, 3, "Buy", style2);
    buyText.visible = true;
    buyGroup.add(buyText);

    let saveGroup:Phaser.Group = this.game.add.group();
    saveGroup.visible = true;
    botMenu.add(saveGroup);
    let saveButton:Phaser.Sprite = this.game.add.sprite(224, 30, 'menu', 'button.png');
    saveButton.visible = true;
    saveButton.inputEnabled = true;
    saveGroup.add(saveButton);
    let saveText:Phaser.Text = this.game.add.text(250, 33, "Save game", style2);
    saveText.visible = true;
    saveGroup.add(saveText);
    saveButton.events.onInputUp.add(function() {
      saveGame(self);
    });

    let resetGroup:Phaser.Group = this.game.add.group();
    resetGroup.visible = true;
    botMenu.add(resetGroup);
    let resetButton:Phaser.Sprite = this.game.add.sprite(224, 60, 'menu', 'button.png');
    resetButton.visible = true;
    resetButton.inputEnabled = true;
    resetGroup.add(resetButton);
    let resetText:Phaser.Text = this.game.add.text(250, 63, "Reset save", style2);
    resetText.visible = true;
    resetGroup.add(resetText);
    resetButton.events.onInputUp.add(function() {
      resetSave();
    });

    // SETUP FOR BUILDINGS
    // -------------------
    let button1 = this.game.add.sprite(0, 0, 'menu', 'button.png');
    let buildings:Phaser.Text = this.game.add.text(30, 3, "Buildings", style);
    let buildingGroup = this.game.add.group();
    this.menuGroup.add(buildingGroup);
    buildingGroup.visible = true;
    let buttons1 = [];
    let startingButtons = 0;
    for (let index = 0; index < BUILDINGCLASSES.length; index++) {
      let b = BUILDINGCLASSES[index];
      let bgroup = this.game.add.group();
      buildingGroup.add(bgroup);
      bgroup.visible = false;
      let bbuttonRegular = this.game.add.sprite(0, 0,'menu', 'button2.png');
      bgroup.add(bbuttonRegular);
      bbuttonRegular.visible = true;
      bbuttonRegular.inputEnabled = true;
      let bbuttonClicked = this.game.add.sprite(0, 0,'menu', 'button2clicked.png');
      bgroup.add(bbuttonClicked);
      bbuttonClicked.visible = false;
      bbuttonClicked.inputEnabled = true;
      let btext:Phaser.Text = this.game.add.text(3, 3, b.title, style);
      bgroup.add(btext);
      if (b.isEnabled()) {
        bgroup.visible = true;
        startingButtons++;
        bgroup.y = 25 * startingButtons;
      }
      buttons1.push({'group': bgroup, 'regular': bbuttonRegular, 'toggled': bbuttonClicked});
      bbuttonRegular.events.onInputUp.add(function() {
        self.needsupdate = true;
        for (let button of buttons1) {
          button.regular.visible = true;
          button.toggled.visible = false;
        }
        self.option = index;
        self.state = "building";
        bbuttonRegular.visible = false;
        bbuttonClicked.visible = true;
      });
      bbuttonClicked.events.onInputUp.add(function() {
        self.needsupdate = true;
        for (let button of buttons1) {
          button.regular.visible = true;
          button.toggled.visible = false;
        }
        self.option = -1;
        self.state = "";
      });
    }
    this.menuGroup.add(button1);
    this.menuGroup.add(buildings);


    // SETUP FOR TOWN BUILDINGS
    // -------------------
    let button2 = this.game.add.sprite(112, 0,'menu', 'button.png');
    let town:Phaser.Text = this.game.add.text(120, 3, "Town buildings", style);
    let townBuildingGroup = this.game.add.group();
    this.menuGroup.add(townBuildingGroup);
    townBuildingGroup.visible = false;
    let buttons2 = [];
    startingButtons = 0;
    for (let index = 0; index < CONSTRUCTIONCLASSES.length; index++) {
      let c = CONSTRUCTIONCLASSES[index];
      let cgroup = this.game.add.group();
      cgroup.visible = false;
      townBuildingGroup.add(cgroup);
      let cbutton = this.game.add.sprite(0, 0,'menu', 'button2.png');
      cgroup.add(cbutton);
      cbutton.visible = true;
      cbutton.inputEnabled = true;
      let ctext:Phaser.Text = this.game.add.text(3, 3, c.title, style);
      cgroup.add(ctext);
      if (c.isEnabled()) {
        cgroup.visible = true;
        startingButtons++;
        cgroup.y = 25 * startingButtons;
      }
      buttons2.push({'group': cgroup});
      cbutton.events.onInputUp.add(function() {
        let canAfford = self.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
        if (canAfford) {
          self.needsupdate = true;
          CONSTRUCTIONCLASSES[index].build(self);
        }
      });
    }
    this.menuGroup.add(button2);
    this.menuGroup.add(town);


    // SETUP FOR RESEARCH
    // -------------------
    let button3 = this.game.add.sprite(224, 0,'menu', 'button.png');
    let research:Phaser.Text = this.game.add.text(250, 3, "Research", style);
    let researchGroup = this.game.add.group();
    this.menuGroup.add(researchGroup);
    researchGroup.visible = false;
    let buttons3 = [];
    startingButtons = 0;
    for (let index = 0; index < TechList.length; index++) {
      let r = TechList[index];
      let rgroup = this.game.add.group();
      rgroup.visible = false;
      if (r.researchable()) {
        rgroup.visible = true;
        startingButtons++;
        rgroup.y = 25 * startingButtons;
      }
      researchGroup.add(rgroup);
      buttons3.push(rgroup);
      let rbutton = this.game.add.sprite(0, 0,'menu', 'button2.png');
      rbutton.visible = true;
      rbutton.inputEnabled = true;
      rgroup.add(rbutton);
      let rtext:Phaser.Text = this.game.add.text(3, 3, r.name, style);
      rgroup.add(rtext);
      rbutton.events.onInputUp.add(function() {
        let canAfford = true;
        if (canAfford) {
          self.needsupdate = true;
          r.research();

          // Update what building-buttons should be visible
          let visibleButtons = 0;
          for (let index = 0; index < BUILDINGCLASSES.length; index++) {
            if (BUILDINGCLASSES[index].isEnabled()) {
              visibleButtons++;
              buttons1[index].group.y = 25 * visibleButtons;
              buttons1[index].group.visible = true;
            } else {
              buttons1[index].group.visible = false;
            }
          }

          // Update what townBuilding-buttons should be visible
          visibleButtons = 0;
          for (let index = 0; index < CONSTRUCTIONCLASSES.length; index++) {
            if (CONSTRUCTIONCLASSES[index].isEnabled()) {
              visibleButtons++;
              buttons2[index].group.y = 25 * visibleButtons;
              buttons2[index].group.visible = true;
            } else {
              buttons2[index].group.visible = false;
            }
          }

          // Update what research-buttons should be visible
          visibleButtons = 0;
          for (let index = 0; index < TechList.length; index++) {
            if (TechList[index].researchable()) {
              visibleButtons++;
              buttons3[index].y = 25 * visibleButtons;
              buttons3[index].visible = true;
            } else {
              buttons3[index].visible = false;
            }
          }
        }
      });
    }
    this.menuGroup.add(button3);
    this.menuGroup.add(research);

    // Toggle between 'Buildings' / 'Town buildings' / 'Research'
    button1.inputEnabled = true;
    button2.inputEnabled = true;
    button3.inputEnabled = true;
    button1.events.onInputUp.add(function() {
      self.needsupdate = true;
      if (self.state !== "building") {
        self.option = -1;
        self.state = "";
      }
      buildingGroup.visible = true;
      townBuildingGroup.visible = false;
      researchGroup.visible = false;
    });
    button2.events.onInputUp.add(function() {
      self.needsupdate = true;
      if (self.state !== "town") {
        self.option = -1;
        self.state = "";
      }
      buildingGroup.visible = false;
      townBuildingGroup.visible = true;
      researchGroup.visible = false;
      for (let button of buttons1) {
        button.regular.visible = true;
        button.toggled.visible = false;
      }
    });
    button3.events.onInputUp.add(function() {
      self.needsupdate = true;
      if (self.state !== "research") {
        self.option = -1;
        self.state = "";
      }
      buildingGroup.visible = false;
      townBuildingGroup.visible = false;
      researchGroup.visible = true;
      for (let button of buttons1) {
        button.regular.visible = true;
        button.toggled.visible = false;
      }
    });

    this.menuGroup.add(button3);
    this.menuGroup.add(town);
    this.menuGroup.add(research);

    // Add functionality to the 'Buy'-button
    buyButton.events.onInputUp.add(function() {
      if(self.state != "buying"){
        self.state = "buying";
        for (let button of buttons1) {
          button.regular.visible = true;
          button.toggled.visible = false;
        }
      }
      else{
        self.state = "";
      }
      self.needsupdate = true;
    });

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
    this.hexagonGroup.add(this.squareLayer);
    this.hexagonGroup.add(this.borderLayer);
    this.hexagonGroup.add(this.resourceLayer);
    this.hexagonGroup.add(this.buildingLayer);
    for (let i = 0; i < this.gridSizeY; i++) {
      for (let j = 0; j < this.gridSizeX; j++) {
        let square:Square = new Square(this, j, i);
        this.hexMatrix[i].push(square);
        let theSquare = square;
        let newCenter = square.center;
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

    this.needsupdate = true;
    if (localStorage.getItem("map") !== null) {
      console.log("Loading old game")
      loadMap(this);
    }
    else{
      console.log("making new game")
      newGame(this);
    }

    for (let i = 0; i < this.gridSizeY; i++) {
      for (let j = 0; j < this.gridSizeX; j++) {
        let theSquare = this.hexMatrix[i][j];
        theSquare.center.inputEnabled = true;
        theSquare.center.events.onInputUp.add(function() {
          self.needsupdate = true;
          // You own the tile, you wish to build, the tile-type is allowed, you can afford it, TODO (no other building exist on the tile)
          if (theSquare.purchased && self.state === "building" && BUILDINGCLASSES[self.option].canBuild(theSquare) && self.materialContainer.materials.isSubset(BUILDINGCLASSES[self.option].getRequiredMaterials())) {
            self.materialContainer.pay(BUILDINGCLASSES[self.option].getRequiredMaterials());
            theSquare.addBuilding(self.option);
          }
          if(self.state ==="buying" && !theSquare.purchased && self.materialContainer.materials.get(MATERIALS.Food) >= 10*Math.pow(1.4, theSquare.distance) && theSquare.distance <= Square.buildDistance){
            self.materialContainer.materials.subtract(MATERIALS.Food, 10*Math.pow(1.4, theSquare.distance));
            theSquare.purchased = true;
            theSquare.revealNeighbours();
          }
        });
      }
    }
    let centerX = Math.floor(this.gridSizeX/2);
    let centerY = Math.floor(this.gridSizeY/2);
    let centerHex = this.hexMatrix[centerX][centerY];

    centerHex.setType(SQUARETYPES.Base);
    if(centerHex.resource != null){
      centerHex.resource.destroy();
    }
    centerHex.buildingSprite = this.game.add.sprite(centerHex.center.x + 10 ,centerHex.center.y + 20, 'buildings', "building.png");
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

    let distance = 0;
    let currentTiles = centerHex.setDistance(distance);
    let nextTiles = [];
    while (currentTiles.length > 0) {
      distance++;
      for (let currentTile of currentTiles) {
        if (currentTile !== null) {
          nextTiles = nextTiles.concat(currentTile.setDistance(distance));
        }
      }
      currentTiles = nextTiles;
      nextTiles = [];
    }
  }

  onRender():void {
    // this.game.debug.cameraInfo(this.game.camera, 32, 32);
  }

}

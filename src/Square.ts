import { MainGame } from "./MainGame";
import { Building } from "./buildings/AllBuildings";
import { DIRECTIONS, MATERIALS, SQUARETYPES, SQUARETYPELIST, SQUARESTRINGLIST, BUILDINGS, BUILDINGCLASSES, RESOURCES, RESOURCESTRINGLIST} from "./Constants";

export class Square {
  borders:Phaser.Sprite[]
  center:Phaser.Sprite
  x:number
  y:number
  neighbours:Array<Square>;
  game:MainGame;
  purchased:boolean;
  revealed:boolean;
  squareType:SQUARETYPES;
  resourceType:RESOURCES;

  distance:number; //for the bfs
  visited:boolean; //for the bfs
  resource:Phaser.Sprite;
  buildingSprite:Phaser.Sprite;
  building:Building;
  buildingType:BUILDINGS;
  constructor(game:MainGame, j:number, i:number, squareType:SQUARETYPES){
    this.buildingType = -1;
    this.resource = null;
    this.squareType = squareType;
    this.purchased = false;
    this.visited = false;
    this.revealed = false;
    this.game = game;
    this.x = j;
    this.y = i;
    this.neighbours = [null, null, null, null, null, null];
    let hexagonX = game.hexagonWidth * (j + 1/2* (i % 2));
    let hexagonY = (game.hexagonHeight / 4 * 3) * i;

    let center = game.game.add.sprite(hexagonX, hexagonY, 'tiles', SQUARESTRINGLIST[squareType] + '.png');
    let blueborder = game.game.add.sprite(hexagonX, hexagonY, 'tiles', "blueborder.png");
    let redborder = game.game.add.sprite(hexagonX, hexagonY, 'tiles', "redborder.png");
    this.borders = [blueborder, redborder];
    this.center = center;
    center.visible = false;
    blueborder.visible = false;
    redborder.visible = false;
    game.squareLayer.add(center);
    game.borderLayer.add(blueborder);
    game.borderLayer.add(redborder);
    if(this.squareType === SQUARETYPES.Plains){
      this.setResource(RESOURCES.Horse);
    }
    if(this.squareType === SQUARETYPES.Forest){
      this.setResource(RESOURCES.Stone);
    }
  }

  setType(squareType:SQUARETYPES):void {
    let old = this.center;
    this.center = this.game.game.add.sprite(old.x,old.y, 'tiles', SQUARESTRINGLIST[squareType] + '.png');
    this.game.squareLayer.add(this.center);
    old.destroy();
    this.squareType = squareType;
  }

  setResource(resourceType:RESOURCES):void {
    if(this.resource != null){
      this.resource.destroy();
    }
    this.resource = this.game.game.add.sprite(this.center.x + 28 ,this.center.y + 35, 'resources', RESOURCESTRINGLIST[resourceType] + '.png');
    this.resourceType = resourceType;
    this.game.resourceLayer.add(this.resource);
    this.resource.visible = false;
  }

  update():void {
    if(this.revealed){
      let highlight = false;
      if(this.game.state === "buying" && !this.purchased){
        highlight = true;
      }
      if(this.game.state === "building" && this.purchased){
        if(BUILDINGCLASSES[this.game.option].canBuild(this)){
          highlight = true;
        };
      }
      if(highlight){
        // console.log("don't")
        this.borders[0].visible = false;
        this.borders[1].visible = true;
      } else {
        // console.log("happens")
        this.borders[0].visible = true;
        this.borders[1].visible = false;
      }

    }
  }

  reveal(){
    if(!this.revealed){
      this.revealed = true;
      this.center.visible = true;
      this.borders[0].visible = true;
      if(this.resource != null){
        this.resource.visible = true;
      }
      if(this.buildingSprite != null){
        this.buildingSprite.visible = true;
      }
    }
  }

  revealNeighbours(){
    for (let k = 0; k < 6; k++) {
      this.neighbours[k].reveal();
    }
  }

  addBuilding(building:BUILDINGS){
    this.buildingType = building;
    this.building = new BUILDINGCLASSES[building]();
    this.building.setSquare(this);

    this.buildingSprite = this.game.game.add.sprite(this.center.x + 22 ,this.center.y + 30, 'buildings', BUILDINGCLASSES[building].title.toLowerCase() + '.png');
    this.game.buildingLayer.add(this.buildingSprite);
    this.buildingSprite.visible = true;
  }

  generateMaterials(){
    if(this.building != null){
      return this.building.generateMaterials();
    }
  }



}

import { MainGame } from './MainGame';
import { Counter } from './Counter';
import { Building } from './buildings/AllBuildings';
import { MATERIALS, SQUARETYPES, SQUARESTRINGLIST, BUILDINGS, BUILDINGCLASSES, RESOURCES, RESOURCESTRINGLIST} from './Constants';

export class Square {
  borders:Phaser.Sprite[];
  center:Phaser.Sprite;
  i:number;
  j:number;
  x:number;
  y:number;
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

  static buildDistance:number = 2;

  constructor(game:MainGame, j:number, i:number){
    this.buildingType = -1;
    this.resourceType = -1;
    this.resource = null;
    this.building = null;
    this.squareType = -1;
    this.purchased = false;
    this.visited = false;
    this.revealed = false;
    this.game = game;
    this.j = j;
    this.i = i;
    this.neighbours = [null, null, null, null, null, null];
    const hexagonX = game.hexagonWidth * (j + 1/2* (i % 2));
    const hexagonY = (game.hexagonHeight / 4 * 3) * i;
    this.x = hexagonX;
    this.y = hexagonY;

    const blueborder = game.game.add.sprite(hexagonX, hexagonY, 'tiles', 'blueborder.png');
    const redborder = game.game.add.sprite(hexagonX, hexagonY, 'tiles', 'redborder.png');
    this.borders = [blueborder, redborder];
    blueborder.visible = false;
    redborder.visible = false;
    game.borderLayer.add(blueborder);
    game.borderLayer.add(redborder);
  }

  setType(squareType:SQUARETYPES):void {
    const old = this.center;
    this.center = this.game.game.add.sprite(this.x,this.y, 'tiles', SQUARESTRINGLIST[squareType] + '.png');
    this.center.visible = this.revealed;
    this.game.squareLayer.add(this.center);
    if(old){
      old.destroy();
    }
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
      if(this.game.state === 'buying' && !this.purchased){
        if (this.distance <= Square.buildDistance) {
          highlight = true;
        }
      }
      if(this.game.state === 'building' && this.purchased && this.building === null){
        if(BUILDINGCLASSES[this.game.option].canBuild(this)){
          highlight = true;
        }
      }
      if(highlight){
        this.borders[0].visible = false;
        this.borders[1].visible = true;
      } else {
        this.borders[0].visible = true;
        this.borders[1].visible = false;
      }

    }
  }

  reveal():void{
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

  revealNeighbours(){
    for (let k = 0; k < 6; k++) {
      this.neighbours[k].reveal();
    }
  }

  addBuilding(building:BUILDINGS){
    this.buildingType = building;
    this.building = new BUILDINGCLASSES[building]();
    this.building.setSquare(this);
    if(building === BUILDINGS.Base){
      this.buildingSprite = this.game.game.add.sprite(this.center.x + 10 ,this.center.y + 20, 'buildings', BUILDINGCLASSES[building].spriteName + '.png');
    }
    else{
      this.buildingSprite = this.game.game.add.sprite(this.center.x + 18 ,this.center.y + 23, 'buildings', BUILDINGCLASSES[building].spriteName + '.png');
    }
    this.game.buildingLayer.add(this.buildingSprite);
    // this.buildingSprite.visible = true;
  }

  generateMaterials():Counter<MATERIALS>{
    if(this.building != null){
      return this.building.generateMaterials();
    }
    else {
      return new Counter<MATERIALS>();
    }
  }

  setDistance(newDistance:number):Array<Square>{
    if (this.visited) {
      return [];
    }
    this.visited = true;
    this.distance = newDistance;
    return this.neighbours;
  }

  toJSON():object {
    return {
      'purchased': this.purchased, // boolean
      'revealed': this.revealed, // boolean
      'squareType': this.squareType, // SQUARETYPES (enum)
      'resourceType': this.resourceType, // RESOURCES (enum)
      'distance': this.distance, // Building
      'buildingType': this.buildingType // BUILDINGS (enum)
    };
  }

  reset():void{
    this.buildingType = -1;
    this.squareType = -1;
    this.resource = null;
    this.building = null;
  }

/* tslint:disable:no-string-literal */
  set(data:object):void {
    this.squareType = data['squareType'];
    this.setType(data['squareType']);

    this.center.visible = false;
    if (data['resourceType'] !== undefined && data['resourceType'] !== -1) {
      this.setResource(data['resourceType']);
    }
    if(data['buildingType'] !== -1){
      this.addBuilding(data['buildingType']);
    }
    if (data['purchased']) {
      this.purchased = true;
    }
    if (data['revealed']) {
      this.reveal();
    }
    this.distance = data['distance'];
  }
/* tslint:enable:no-string-literal */

}

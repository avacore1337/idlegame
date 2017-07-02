import { MainGame } from '../MainGame';
import { Counter } from '../Counter';
import { Updateable, Clickable } from '../Interfaces';
import { Building } from '../buildings/AllBuildings';
import { MATERIALS, LAND, LANDSTRINGLIST, BUILDINGS, BUILDINGCLASSES, RESOURCES, RESOURCESTRINGLIST, DIRECTIONS } from '../Constants';

/** No documentation available */
export class Tile implements Updateable, Clickable {

  public static readonly WIDTH:number = 70;
  public static readonly HEIGHT:number = 80;

  public static buildDistance:number = 2;

  public type:LAND;
  public distance:number;
  public resource:RESOURCES;
  public building:Building;
  public purchased:boolean;

  private game:MainGame;
  private borders:Phaser.Sprite[];
  private neighbours:Array<Tile>;
  private center:Phaser.Sprite;
  private buildingSprite:Phaser.Sprite;
  private revealed:boolean;
  private effect: () => void;
  private content:Phaser.Group;

  private visited:boolean;

  /** No documentation available */
  constructor(game:MainGame, x:number, y:number, parent:Phaser.Group) {
    this.type = -1;
    this.distance = -1;
    this.resource = -1;
    this.building = undefined;
    this.purchased = false;

    this.game = game;
    this.borders = [];
    this.neighbours = [null, null, null, null, null, null];
    this.center = undefined;
    this.buildingSprite = undefined;
    this.revealed = false;
    this.effect = function():void {};

    this.content = game.add.group(parent);
    this.content.x = x;
    this.content.y = y;
    this.content.visible = false;

    // In order for the BFS to determine it's distance to the base
    this.visited = false;
  }

  /** Purchase this tile */
  public purchase():void {
    this.purchased = true;
    this.reveal();
    this.revealNeighbours();
  }

  /** Reveal this tile to the user */
  public reveal():void {
    this.revealed = true;
    this.content.visible = true;
  }

  /** Set the type of land and resource for this tile */
  public setTile(data:[LAND, RESOURCES]):void {
    this.type = data[0];

    const self = this;
    const background = this.game.game.add.sprite(0, 0, 'tiles', LANDSTRINGLIST[data[0]] + '.png', this.content);
    background.inputEnabled = true;
    background.events.onInputUp.add(function() {self.click();});
    background.input.pixelPerfectClick = true;

    if (data[1] !== -1) {
      this.resource = data[1];
      this.game.game.add.sprite(28, 35, 'resources', RESOURCESTRINGLIST[data[1]] + '.png', this.content);
    }

    // Set the graphics of the borders
    const blueborder = this.game.game.add.sprite(0, 0, 'tiles', 'blueborder.png', this.content);
    const redborder = this.game.game.add.sprite(0, 0, 'tiles', 'redborder.png', this.content);
    this.borders = [blueborder, redborder];
    blueborder.visible = true;
    redborder.visible = false;
  }

  /** No documentation available */
  public update():void {
    if (this.revealed) {
      let highlight = false;
      if (this.game.gamestate === 'buying' && !this.purchased) {
        if (this.distance <= Tile.buildDistance) {
          highlight = true;
        }
      }
      if (this.game.gamestate === 'building' && this.purchased && this.building === undefined) {
        if(BUILDINGCLASSES[this.game.option].canBuild(this)){
          highlight = true;
        }
      }
      if (highlight) {
        this.borders[0].visible = false;
        this.borders[1].visible = true;
      } else {
        this.borders[0].visible = true;
        this.borders[1].visible = false;
      }

    }
  }

  /** Reveal all the neighbours of this tile */
  public revealNeighbours():void {
    for (let k = 0; k < 6; k++) {
      if (this.neighbours[k] !== null) {
        this.neighbours[k].reveal();
      }
    }
  }

  /** Add a building to this tile */
  public addBuilding(building:BUILDINGS):void {
    if (building === -1) {
      return;
    }
    this.building = new BUILDINGCLASSES[building]();
    this.building.setTile(this);
    if (building === BUILDINGS.Base) {
      this.buildingSprite = this.game.game.add.sprite(10 ,20, 'buildings', BUILDINGCLASSES[building].spriteName + '.png', this.content);
    } else {
      this.buildingSprite = this.game.game.add.sprite(18 ,23, 'buildings', BUILDINGCLASSES[building].spriteName + '.png', this.content);
    }
  }

  /** Returns a counter containing the materials this tile produces in one game-tick */
  public generateMaterials():Counter<MATERIALS> {
    if (this.building !== undefined) {
      return this.building.generateMaterials();
    } else {
      return new Counter<MATERIALS>();
    }
  }

  /** Part of the BFS-algorithm to calculate each tile's distance to the base */
  public setDistance(newDistance:number):Array<Tile> {
    if (this.visited) {
      return [];
    }
    this.visited = true;
    this.distance = newDistance;
    return this.neighbours;
  }

  /** Export the content of the tile as JSON */
  public toJSON():object {
    return {
      'purchased': this.purchased, // boolean
      'revealed': this.revealed, // boolean
      'TILEType': this.type, // LAND (enum)
      'resourceType': this.resource, // RESOURCES (enum)
      'distance': this.distance, // Building
      'buildingType': this.building === undefined ? -1 : this.building.type // BUILDINGS (enum)
    };
  }

  /** No documentation available */
  public demolish():void {
    if (this.type !== LAND.Base) {
      this.building.demolish();
      this.building = undefined;
    }
  }

  /** No documentation available */
  public setFromJSON(data:any):void {
    console.log('Loading game, can a(n) ' + (typeof data.resourceType) + ' be interpreted as an integer?');
    this.setTile([data.TILEType, data.resourceType]);
    this.addBuilding(data.buildingType);
    if (data.purchased) {
      this.purchased = true;
    }
    if (data.revealed) {
      this.reveal();
    }
    this.distance = data.distance;
  }

  /** Save a reference to the neighbour at the given location */
  public setNeighbour(index:DIRECTIONS, neighbour:Tile):void {
    this.neighbours[index] = neighbour;
  }

  /** Register an event that should be triggered if the tile is clicked */
  public onclick(callback: () => void):void {
    this.effect = callback;
  }

  /** Trigger the stored onclick-event */
  public click():void {
    this.effect();
  }
}

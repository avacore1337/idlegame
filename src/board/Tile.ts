import { MainGame } from '../MainGame';
import { Counter } from '../Counter';
import { Updateable, Clickable } from '../Interfaces';
import { Building } from '../buildings/AllBuildings';
import { MATERIALS, LAND, LANDSTRINGLIST, BUILDINGS, BUILDINGCLASSES, RESOURCES, RESOURCESTRINGLIST, DIRECTIONS } from '../Constants';

export class Tile implements Updateable, Clickable {

  /** The width of the hexagon-sprites */
  public static readonly WIDTH:number = 70;
  /** The height of the hexagon-sprites */
  public static readonly HEIGHT:number = 80;
  /** The distance from the base the user is allowed to construct buildings */
  public static buildDistance:number = 2;

  /** The type of land this tile has. Is set to -1 if no type has been specified */
  public type:LAND;
  /** The distance to the base. Is set to -1 if it has not yet been assigned through setDistance() */
  public distance:number;
  /** The resource found on this tile. Is set to -1 if there is none */
  public resource:RESOURCES;
  /** The building on this tile. Is set to undefined if there is none */
  public building:Building;
  /** Wheter or not the tile has been purchased */
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

  /**
   * Tiles contain all logic and graphics for each individual tile
   * @param game {MainGame} - The main game object of the game
   * @param x {number} - The x coordinate of this tile on the screen
   * @param y {number} - The y coordinate of this tile on the screen
   * @param parent {Phaser.Group} - The parent group which the tiles should be added to
   */
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

  /**
   * Set the type of land and resource for this tile
   * @param data {[LAND, RESOURCES]} - An array of length 2 containing the type of land and resource this tile should have
   */
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

  /** Update the graphics of this tile if required */
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

  /**
   * Returns a counter containing the materials this tile produces in one game-tick
   * @returns {Counter<MATERIALS>} - The counter containing the materials this tile produces in one game-tick
   */
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

  /** Export the content of the tile as JSON-data */
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

  /**
   * Demolish the building found on this tile.
   * Note that the building on the home base can not be demolished.
   */
  public demolish():void {
    if (this.type !== LAND.Base) {
      this.building.demolish();
      this.building = undefined;
    }
  }

  /**
   * Returns a counter containing the materials this tile produces in one game-tick
   * @param data {any} - JSON-data containing information about this tile's new data
   */
  public fromJSON(data:any):void {
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

  /**
   * Save a reference to the neighbour at the given location
   * @param index {DIRECTIONS} - The location of the neighbour compared to this tile
   * @param neighbour {Tile} - The new neighbour of this tile
   */
  public setNeighbour(index:DIRECTIONS, neighbour:Tile):void {
    this.neighbours[index] = neighbour;
  }

  /**
   * Register an event that should be triggered if the tile is clicked
   * @param callback {() => void} - The function to call if the tile is pressed
   */
  public onclick(callback: () => void):void {
    this.effect = callback;
  }

  /** Trigger the stored onclick-event */
  public click():void {
    this.effect();
  }
}

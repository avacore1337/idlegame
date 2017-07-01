import { Tile } from '../board/Tile';
import { SQUARETYPES, MATERIALS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

export class Building {
  protected static allowedTerrains:Array<SQUARETYPES>;
  protected static neededResources:Array<number>;
  tile:Tile;
  title:string;
  spriteName:string;
  type:BUILDINGS;

  constructor() {}

  static isEnabled():boolean {
    return false;
  }

  setTile(tile:Tile):void {
    this.tile = tile;
  }

  generateMaterials():Counter<MATERIALS>{
    return new Counter<MATERIALS>();
  }

  demolish():void {
    return;
  }

  static canBuild(tile:Tile):boolean {
    return false;
  }

  toJSON():object {
    return {'type': this.title};
  }
}

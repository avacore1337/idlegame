import { Tile } from '../board/Tile';
import { LAND, MATERIALS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

/** No documentation available */
export class Building {
  protected static allowedTerrains:Array<LAND>;
  protected static neededResources:Array<number>;
  tile:Tile;
  title:string;
  spriteName:string;
  type:BUILDINGS;

  constructor() {return;}

  /** No documentation available */
  static isEnabled():boolean {
    return false;
  }

  /** No documentation available */
  setTile(tile:Tile):void {
    this.tile = tile;
  }

  /** No documentation available */
  generateMaterials():Counter<MATERIALS> {
    return new Counter<MATERIALS>();
  }

  /** No documentation available */
  demolish():void {
    return;
  }

  /** No documentation available */
  static canBuild(tile:Tile):boolean {
    return false;
  }

  /** No documentation available */
  toJSON():object {
    return {'type': this.title};
  }
}

import { Tile } from '../board/Tile';
import { Building } from './Building';
import { LAND, MATERIALS, EXPONENTS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

/** No documentation available */
export class Lumbermill extends Building {
  static enabled:boolean = false;
  static title:string = 'Lumbermill';
  static spriteName:string = 'factory';
  static allowedTerrains = [LAND.Forest];
  static neededResources = [];
  static amount:number = 0;
  type:BUILDINGS;

  constructor(){
    super();
    Lumbermill.amount += 1;
    this.type = BUILDINGS.Lumbermill;
  }

  /** No documentation available */
  static isEnabled():boolean{
    return Lumbermill.enabled;
  }

  /** No documentation available */
  generateMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 1);
    return counter;
  }

  /** No documentation available */
  demolish():void {
    Lumbermill.amount -= 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 10);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

  /** No documentation available */
  static canBuild(tile:Tile):boolean {
    if (Lumbermill.allowedTerrains.indexOf(tile.type) !== -1) {
      if(Lumbermill.neededResources.length === 0){
        return true;
      }
      if(Lumbermill.neededResources.indexOf(tile.resource) !== -1) {
        return true;
      }
    }
    return false;
  }
}

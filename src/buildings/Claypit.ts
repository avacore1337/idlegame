import { Tile } from '../board/Tile';
import { Building } from './Building';
import { LAND, MATERIALS, EXPONENTS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

/** No documentation available */
export class Claypit extends Building {
  static enabled:boolean = false;
  static title:string = 'Claypit';
  static spriteName:string = 'factory';
  static allowedTerrains = [LAND.River];
  static neededResources = [];
  static amount:number = 0;
  type:BUILDINGS;

  constructor() {
    super();
    Claypit.amount += 1;
    this.type = BUILDINGS.Claypit;
  }

  /** No documentation available */
  generateMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Clay, 1);
    return counter;
  }

  /** No documentation available */
  demolish():void {
    Claypit.amount -= 1;
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
    if (Claypit.allowedTerrains.indexOf(tile.type) !== -1) {
      if (Claypit.neededResources.length === 0) {
        return true;
      }
      if (Claypit.neededResources.indexOf(tile.resource) !== -1) {
        return true;
      }
    }
    return false;
  }
}

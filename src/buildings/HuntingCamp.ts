import { Tile } from '../board/Tile';
import { Building } from './Building';
import { LAND, MATERIALS, EXPONENTS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

/** No documentation available */
export class HuntingCamp extends Building {
  static enabled:boolean = false;
  static title:string = 'Hunting camp';
  static spriteName:string = 'factory';
  static allowedTerrains = [LAND.Field, LAND.Forest, LAND.Mountain, LAND.Plains, LAND.River];
  static neededResources = [];
  static amount:number = 0;
  type:BUILDINGS;

  constructor(){
    super();
    HuntingCamp.amount += 1;
    this.type = BUILDINGS.HuntingCamp;
  }

  /** No documentation available */
  generateMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Food, 0.1);
    return counter;
  }

  /** No documentation available */
  demolish():void {
    HuntingCamp.amount -= 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 1);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

  /** No documentation available */
  static canBuild(tile:Tile):boolean {
    if (HuntingCamp.allowedTerrains.indexOf(tile.type) !== -1) {
      if(HuntingCamp.neededResources.length === 0){
        return true;
      }
      if(HuntingCamp.neededResources.indexOf(tile.resource) !== -1) {
        return true;
      }
    }
    return false;
  }
}

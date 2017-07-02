import { Tile } from '../board/Tile';
import { Building } from './Building';
import { LAND, MATERIALS, EXPONENTS, BUILDINGS} from '../Constants';
import { Counter } from '../Counter';

/** No documentation available */
export class Farm extends Building {
  static enabled:boolean = false;
  static title:string = 'Farm';
  static spriteName:string = 'factory';
  static allowedTerrains = [LAND.Field, LAND.Plains];
  static neededResources = [];
  static amount:number = 0;
  type:BUILDINGS;

  constructor(){
    super();
    Farm.amount += 1;
    this.type = BUILDINGS.Farm;
  }

  /** No documentation available */
  static isEnabled():boolean{
    return Farm.enabled;
  }

  /** No documentation available */
  generateMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Food, 1);
    return counter;
  }

  /** No documentation available */
  demolish():void {
    Farm.amount -= 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 15);
    counter.add(MATERIALS.Clay, 5);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

  /** No documentation available */
  static canBuild(tile:Tile):boolean {
    if (Farm.allowedTerrains.indexOf(tile.type) !== -1) {
      if(Farm.neededResources.length === 0){
        return true;
      }
      if(Farm.neededResources.indexOf(tile.resource) !== -1) {
        return true;
      }
    }
    return false;
  }
}

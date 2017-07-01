import { Tile } from '../board/Tile';
import { Building } from './Building';
import { SQUARETYPES, MATERIALS, EXPONENTS, BUILDINGS} from '../Constants';
import { Counter } from '../Counter';

export class Farm extends Building {
  static enabled:boolean = false;
  static title:string = 'Farm';
  static spriteName:string = 'factory';
  static allowedTerrains = [SQUARETYPES.Field, SQUARETYPES.Plains];
  static neededResources = [];
  static amount:number = 0;
  type:BUILDINGS;

  constructor(){
    super();
    Farm.amount += 1;
    this.type = BUILDINGS.Farm;
  }

  static isEnabled():boolean{
    return Farm.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Food, 1);
    return counter;
  }

  demolish():void {
    Farm.amount -= 1;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 15);
    counter.add(MATERIALS.Clay, 5);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

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

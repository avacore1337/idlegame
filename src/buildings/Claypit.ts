import { Square } from '../board/Square';
import { Building } from './Building';
import { SQUARETYPES, MATERIALS, EXPONENTS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

export class Claypit extends Building {
  static enabled:boolean = false;
  static title:string = 'Claypit';
  static spriteName:string = 'factory';
  static allowedTerrains = [SQUARETYPES.River];
  static neededResources = [];
  static amount:number = 0;
  static type:BUILDINGS = BUILDINGS.Claypit;

  constructor(){
    super();
    Claypit.amount += 1;
  }

  static isEnabled():boolean{
    return Claypit.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Clay, 1);
    return counter;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 10);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

  static canBuild(square:Square):boolean{
    if (Claypit.allowedTerrains.indexOf(square.squareType) !== -1) {
      if(Claypit.neededResources.length === 0){
        return true;
      }
      if(Claypit.neededResources.indexOf(square.resourceType) !== -1) {
        return true;
      }
    }
    return false;
  }

}

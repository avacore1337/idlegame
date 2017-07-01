import { Square } from '../board/Square';
import { Building } from './Building';
import { SQUARETYPES, MATERIALS, EXPONENTS } from '../Constants';
import { Counter } from '../Counter';

export class Lumbermill extends Building {
  static enabled:boolean = true;
  static title:string = 'Lumbermill';
  static spriteName:string = 'factory';
  static allowedTerrains = [SQUARETYPES.Forest];
  static neededResources = [];
  static amount:number = 0;

  constructor(){
    super();
    Lumbermill.amount += 1;
  }

  static isEnabled():boolean{
    return Lumbermill.enabled;
  }

  static reset(){
    Lumbermill.enabled = true;
    Lumbermill.amount = 0;
  }

  generateMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 1);
    return counter;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 10);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

  static canBuild(square:Square):boolean{
    if (Lumbermill.allowedTerrains.indexOf(square.squareType) !== -1) {
      if(Lumbermill.neededResources.length === 0){
        return true;
      }
      if(Lumbermill.neededResources.indexOf(square.resourceType) !== -1) {
        return true;
      }
    }
    return false;
  }

}

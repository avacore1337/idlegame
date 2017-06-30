import { Square } from '../Square';
import { Building } from './Building';
import { SQUARETYPES, MATERIALS, RESOURCES, EXPONENTS } from '../Constants';
import { Counter } from '../Counter';

export class Quary extends Building {
  static enabled:boolean = false;
  static title:string = 'Quary';
  static spriteName:string = 'factory';
  static allowedTerrains = [SQUARETYPES.Forest, SQUARETYPES.Desert];
  static neededResources = [RESOURCES.Stone];
  static amount:number = 0;

  constructor(){
    super();
    Quary.amount += 1;
  }

  static isEnabled():boolean{
    return Quary.enabled;
  }

  static reset(){
    Quary.enabled = false;
    Quary.amount = 0;
  }

  generateMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Stone, 1);
    return counter;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 30);
    counter.add(MATERIALS.Clay, 15);
    return counter.multiplyAll(Math.pow(EXPONENTS.Medium, this.amount));
  }

  static canBuild(square:Square):boolean{
    if (Quary.allowedTerrains.indexOf(square.squareType) !== -1) {
      if(Quary.neededResources.length === 0){
        return true;
      }
      if(Quary.neededResources.indexOf(square.resourceType) !== -1) {
        return true;
      }
    }
    return false;
  }

}

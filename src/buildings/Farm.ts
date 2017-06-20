import { Square } from "../Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS, EXPONENTS} from "../Constants";
import { Counter } from "../Counter";

export class Farm extends Building {
  static enabled:boolean = true;
  static title:string = "Farm";
  static spriteName:string = "factory";
  static allowedTerrains = [SQUARETYPES.Field, SQUARETYPES.Plains];
  static neededResources = [];
  static amount:number = 0;

  constructor(){
    super();
    Farm.amount += 1;
  }

  static isEnabled():boolean{
    return Farm.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Food, 1);
    return counter;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 15);
    counter.add(MATERIALS.Clay, 5);
    // return counter;
    return counter.multiply(Math.pow(EXPONENTS.Slow, this.amount));
  }

  static canBuild(square:Square):boolean{
    if (Farm.allowedTerrains.indexOf(square.squareType) !== -1) {
      if(Farm.neededResources.length === 0){
        return true;
      }
      if(Farm.neededResources.indexOf(square.resourceType) !== -1) {
        return true;
      }
    }
    return false;
  }

}

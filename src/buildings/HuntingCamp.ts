import { Square } from "../Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS, EXPONENTS} from "../Constants";
import { Counter } from "../Counter";

export class HuntingCamp extends Building {
  static enabled:boolean = true;
  static title:string = "Hunting camp";
  static spriteName:string = "factory";
  static allowedTerrains = [SQUARETYPES.Field, SQUARETYPES.Forest, SQUARETYPES.Mountain, SQUARETYPES.Plains, SQUARETYPES.River];
  static neededResources = [];
  static amount:number = 0;

  constructor(){
    super();
    HuntingCamp.amount += 1;
  }

  static isEnabled():boolean{
    return HuntingCamp.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Food, 0.1);
    return counter;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 1);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

  static canBuild(square:Square):boolean{
    if (HuntingCamp.allowedTerrains.indexOf(square.squareType) !== -1) {
      if(HuntingCamp.neededResources.length === 0){
        return true;
      }
      if(HuntingCamp.neededResources.indexOf(square.resourceType) !== -1) {
        return true;
      }
    }
    return false;
  }

}

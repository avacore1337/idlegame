import { Square } from "./Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Claypit extends Building {
  static enabled:boolean = true;
  static title:string = "Claypit";
  static allowedTerrains = [SQUARETYPES.River];
  static neededResources = [];
  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Claypit.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Clay, 1);
    return counter;
  }

  getRequiredMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 10);
    return counter;
  }

  static canBuild(square:Square):boolean{
    if (Claypit.allowedTerrains.indexOf(square.squareType) !== -1) {
      if(Claypit.neededResources.length === 0){
        return true;
      }
      if(Claypit.allowedTerrains.indexOf(square.squareType) !== -1) {
        return true;
      }
    }
    return false;
  }

}

import { Square } from "../Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS, RESOURCES } from "../Constants";
import { Counter } from "../Counter";

export class Quary extends Building {
  static enabled:boolean = true;
  static title:string = "Quary";
  static allowedTerrains = [SQUARETYPES.Forest];
  static neededResources = [RESOURCES.Stone];

  constructor(){
    super();
    // theAllowedTerrains:Array<SQUARETYPES>, theNeededResources:Array<number>
  }

  static isEnabled():boolean{
    return Quary.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Stone, 1);
    return counter;
  }

  getRequiredMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 30);
    counter.add(MATERIALS.Clay, 15);
    return counter;
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

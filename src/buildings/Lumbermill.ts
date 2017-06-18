import { Square } from "../Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS } from "../Constants";
import { Counter } from "../Counter";

export class Lumbermill extends Building {
  static enabled:boolean = true;
  static title:string = "Lumbermill";
  static spriteName:string = "factory";
  static allowedTerrains = [SQUARETYPES.Forest];
  static neededResources = [];

  constructor(){
    super();
    // :Array<SQUARETYPES>, theNeededResources:Array<number>
  }

  static isEnabled():boolean{
    return Lumbermill.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 1);
    return counter;
  }

  getRequiredMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 10);
    return counter;
  }
  static canBuild(square:Square):boolean{
    if (Lumbermill.allowedTerrains.indexOf(square.squareType) !== -1) {
      if(Lumbermill.neededResources.length === 0){
        return true;
      }
      if(Lumbermill.allowedTerrains.indexOf(square.squareType) !== -1) {
        return true;
      }
    }
    return false;
  }

}

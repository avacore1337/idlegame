import { Square } from "./Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Claypit extends Building {
  static enabled:boolean = true;
  static title:string = "Claypit";
  constructor(){
    super([SQUARETYPES.Plains, SQUARETYPES.River, SQUARETYPES.Water], []);
    // theAllowedTerrains:Array<SQUARETYPES>, theNeededResources:Array<number>
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
}

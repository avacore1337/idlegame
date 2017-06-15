import { Square } from "./Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Lumbermill extends Building {
  static enabled:boolean = true;
  static title:string = "Lumbermill";
  constructor(){
    super([SQUARETYPES.Forest], []);
    // theAllowedTerrains:Array<SQUARETYPES>, theNeededResources:Array<number>
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
}

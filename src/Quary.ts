import { Square } from "./Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Quary extends Building {
  constructor(){
    super(null, null);
    // theAllowedTerrains:Array<SQUARETYPES>, theNeededResources:Array<number>
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
}

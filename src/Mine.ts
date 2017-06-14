import { Square } from "./Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Mine extends Building {
  constructor(){
    super(null, null);
    // theAllowedTerrains:Array<SQUARETYPES>, theNeededResources:Array<number>
  }

  generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Clay, 1); // TODO : Should add either Coal or Iron depending on what tile it is built upon
    return counter;
  }

  getRequiredMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Stone, 30);
    counter.add(MATERIALS.Wood, 20);
    return counter;
  }
}

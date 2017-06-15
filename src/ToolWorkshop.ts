import { Square } from "./Square";
import { Constructions } from "./Constructions";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class ToolWorkshop extends Constructions {
  static enabled:boolean = true;
  static title:string = "ToolWorkshop";
  constructor(){
    super([SQUARETYPES.Base], []);
  }

  static isEnabled():boolean{
    return ToolWorkshop.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    return null;
  }

  getRequiredMaterials():Counter<MATERIALS>{
    return null;
  }
}

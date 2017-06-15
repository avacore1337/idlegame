import { Square } from "./Square";
import { Constructions } from "./Constructions";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Kiln extends Constructions {
  static enabled:boolean = true;
  static title:string = "Kiln";
  constructor(){
    super([SQUARETYPES.Base], []);
  }

  static isEnabled():boolean{
    return Kiln.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    return null;
  }

  getRequiredMaterials():Counter<MATERIALS>{
    return null;
  }
}

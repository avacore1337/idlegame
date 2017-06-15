import { Square } from "./Square";
import { Constructions } from "./Constructions";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Steelworks extends Constructions {
  static enabled:boolean = true;
  static title:string = "Steelworks";
  constructor(){
    super([SQUARETYPES.Base], []);
  }

  static isEnabled():boolean{
    return Steelworks.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    return null;
  }

  getRequiredMaterials():Counter<MATERIALS>{
    return null;
  }
}

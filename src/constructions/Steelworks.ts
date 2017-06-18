import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS } from "../Constants";
import { Counter } from "../Counter";

export class Steelworks extends Construction {
  static enabled:boolean = false;
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

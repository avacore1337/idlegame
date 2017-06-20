import { Square } from "../Square";
import { SQUARETYPES, MATERIALS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class Construction {
  title:string;
  constructor(){}

  static isEnabled():boolean{
    return false;
  }

  static doThing(game:MainGame):void {
  }

  static build(game:MainGame):void {
  }

  getRequiredMaterials():Counter<number>{
    return new Counter<number>();
  }
}

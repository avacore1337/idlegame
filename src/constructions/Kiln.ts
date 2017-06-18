import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class Kiln extends Construction {
  static enabled:boolean = false;
  static title:string = "Kiln";
  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Kiln.enabled;
  }

  doThing(game:MainGame):void {
  }

  static getRequiredMaterials():Counter<number>{
    let cost = new Counter<number>();
    cost.add(MATERIALS.Clay, 10);
    return cost;
  }
}

import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class Steelworks extends Construction {
  static enabled:boolean = false;
  static title:string = "Steelworks";
  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Steelworks.enabled;
  }

  doThing(game:MainGame):void {
  }

  static getRequiredMaterials():Counter<number>{
    let cost = new Counter<number>();
    cost.add(MATERIALS.Clay, 10);
    return cost;
  }
}

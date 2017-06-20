import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class ToolWorkshop extends Construction {
  static enabled:boolean = false;
  static title:string = "Tool workshop";
  static amount:number = 0;

  constructor(){
    super();
    ToolWorkshop.amount += 1;
  }

  static isEnabled():boolean{
    return ToolWorkshop.enabled;
  }

  doThing(game:MainGame):void {
  }

  static getRequiredMaterials():Counter<number>{
    let cost = new Counter<number>();
    cost.add(MATERIALS.Clay, 10);
    return cost;
  }
}

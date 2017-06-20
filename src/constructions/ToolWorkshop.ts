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

  static doThing(game:MainGame):void {
  }

  static build(game:MainGame):void {
    let cost:Counter<MATERIALS> = new Counter<MATERIALS>();
    game.materials = game.materials.subtractOther(cost);
    ToolWorkshop.amount += 1;
  }

  static getRequiredMaterials():Counter<number>{
    let cost = new Counter<number>();
    cost.add(MATERIALS.Clay, 10);
    return cost;
  }
}

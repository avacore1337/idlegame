import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS, EXPONENTS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class ToolWorkshop extends Construction {
  static enabled:boolean = false;
  static title:string = "Tool workshop";
  static amount:number = 0;

  constructor(){
    super();
  }

  static isEnabled():boolean{
    return ToolWorkshop.enabled;
  }

  static doThing(game:MainGame):void {
  }

  static build(game:MainGame):void {
    game.materialContainer.pay(this.getRequiredMaterials());
    ToolWorkshop.amount += 1;
  }

  static getRequiredMaterials():Counter<number>{
    let cost = new Counter<number>();
    cost.add(MATERIALS.Stone, 15);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

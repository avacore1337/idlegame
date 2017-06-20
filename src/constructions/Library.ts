import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS, EXPONENTS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class Library extends Construction {
  static enabled:boolean = true;
  static title:string = "Library";
  static amount:number = 0;

  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Library.enabled;
  }

  static doThing(game:MainGame):void {
  }

  static build(game:MainGame):void {
    game.materialContainer.pay(this.getRequiredMaterials());
    Library.amount += 1;
  }

  static getRequiredMaterials():Counter<number>{
    let cost = new Counter<number>();
    cost.add(MATERIALS.Wood, 10);
    cost.add(MATERIALS.Clay, 10);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

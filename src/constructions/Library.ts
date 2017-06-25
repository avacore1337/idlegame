import { Construction } from "./Construction";
import { MATERIALS, EXPONENTS } from "../Constants";
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

  static generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Research, 0.2*this.amount);
    return counter;
  }

  static doThing(game:MainGame):void {
  }

  static build(game:MainGame):void {
    game.materialContainer.pay(this.getRequiredMaterials());
    Library.amount += 1;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    let cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Wood, 10);
    cost.add(MATERIALS.Clay, 10);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

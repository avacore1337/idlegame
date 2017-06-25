import { Construction } from "./Construction";
import { MATERIALS, EXPONENTS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class Steelworks extends Construction {
  static enabled:boolean = false;
  static title:string = "Steelworks";
  static amount:number = 0;

  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Steelworks.enabled;
  }

  static doThing(game:MainGame):void {
  }

  static generateMaterials():Counter<MATERIALS>{
    return new Counter<MATERIALS>();
  }

  static build(game:MainGame):void {
    game.materialContainer.pay(this.getRequiredMaterials());
    Steelworks.amount += 1;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Clay, 10);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS, EXPONENTS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class Kiln extends Construction {
  static enabled:boolean = false;
  static title:string = "Kiln";
  static amount:number = 0;

  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Kiln.enabled;
  }

  static doThing(game:MainGame):void {
    if(game.materialContainer.materials.get(MATERIALS.Clay) > Kiln.amount*0.2){
      game.materialContainer.materials.subtract(MATERIALS.Clay, Kiln.amount*0.2);
      game.materialContainer.materialGainBase.add(MATERIALS.Brick, Kiln.amount*0.1);
    }
  }

  static generateMaterials():Counter<MATERIALS>{
    return new Counter<MATERIALS>();
  }

  static build(game:MainGame):void {
    game.materialContainer.pay(this.getRequiredMaterials());
    Kiln.amount += 1;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    let cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Clay, 10);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

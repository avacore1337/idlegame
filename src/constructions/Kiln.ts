import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class Kiln extends Construction {
  static enabled:boolean = false;
  static title:string = "Kiln";
  static amount:number = 0;

  constructor(){
    super();
    Kiln.amount += 1;
  }

  static isEnabled():boolean{
    return Kiln.enabled;
  }

  static doThing(game:MainGame):void {
    if(game.materials.get(MATERIALS.Clay) > Kiln.amount*0.2){
      game.materials.subtract(MATERIALS.Clay, Kiln.amount*0.2);
      game.materials.add(MATERIALS.Brick, Kiln.amount*0.1);
    }
  }

  static build(game:MainGame):void {
    let cost:Counter<MATERIALS> = new Counter<MATERIALS>();
    game.materials = game.materials.subtractOther(cost);
    Kiln.amount += 1;
  }

  static getRequiredMaterials():Counter<number>{
    let cost = new Counter<number>();
    cost.add(MATERIALS.Clay, 10);
    return cost;
  }
}

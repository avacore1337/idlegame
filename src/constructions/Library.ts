import { Square } from "../Square";
import { Construction } from "./Construction";
import { SQUARETYPES, MATERIALS } from "../Constants";
import { Counter } from "../Counter";
import { MainGame } from "../MainGame";

export class Library extends Construction {
  static enabled:boolean = true;
  static title:string = "Library";
  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Library.enabled;
  }

  doThing(game:MainGame):void {
  }

  static getRequiredMaterials():Counter<number>{
    let cost = new Counter<number>();
    cost.add(MATERIALS.Clay, 10);
    return cost;
  }
}

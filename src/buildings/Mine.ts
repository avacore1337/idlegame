import { Square } from "../Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS, RESOURCES } from "../Constants";
import { Counter } from "../Counter";

export class Mine extends Building {
  static enabled:boolean = false;
  static title:string = "Mine";
  static spriteName:string = "mine";
  static allowedTerrains = [SQUARETYPES.Mountain];
  static neededResources = [RESOURCES.Copper, RESOURCES.Iron, RESOURCES.Coal];
  static amount:number = 0;

  constructor(){
    super();
    Mine.amount += 1;
  }

  static isEnabled():boolean{
    return Mine.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    if(this.square.resourceType === RESOURCES.Copper){
      counter.add(MATERIALS.Copper, 1);
    }
    if(this.square.resourceType === RESOURCES.Iron){
      counter.add(MATERIALS.Iron, 1);
    }
    if(this.square.resourceType === RESOURCES.Coal){
      counter.add(MATERIALS.Coal, 1);
    }
    return counter;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 30);
    counter.add(MATERIALS.Clay, 15);
    return counter;
  }

  static canBuild(square:Square):boolean{
    if (Mine.allowedTerrains.indexOf(square.squareType) !== -1) {
      if(Mine.neededResources.length === 0){
        return true;
      }
      if(Mine.allowedTerrains.indexOf(square.squareType) !== -1) {
        return true;
      }
    }
    return false;
  }

}

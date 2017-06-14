import { Square } from "./Square";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Building {
  protected allowedTerrains:Array<SQUARETYPES>;
  protected neededResources:Array<number>;
  square:Square;
  constructor(theAllowedTerrains:Array<SQUARETYPES>, theNeededResources:Array<number>){
    this.allowedTerrains = theAllowedTerrains;
    this.neededResources = theNeededResources;
  }

  isEnabled(){
    return true;
  }

  setSquare(square: Square):void{
    this.square = square;
  }

  generateMaterials():Counter<MATERIALS>{
    return new Counter<MATERIALS>();
  }

  canBuild(square:Square):boolean{
    if (this.allowedTerrains.indexOf(square.squareType) !== -1) {
      // if (!this.neededResources) {
        return true;
      // }
    }
    return false;
  }
}

import { Square } from "./Square";
import { SQUARETYPES, MATERIALS } from "./Constants";
import { Counter } from "./Counter";

export class Constructions {
  protected allowedTerrains:Array<SQUARETYPES>;
  protected neededResources:Array<number>;
  square:Square;
  title:string;
  constructor(theAllowedTerrains:Array<SQUARETYPES>, theNeededResources:Array<number>){
    this.allowedTerrains = theAllowedTerrains;
    this.neededResources = theNeededResources;
  }

  static isEnabled():boolean{
    return false;
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

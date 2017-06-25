import { Square } from '../Square';
import { SQUARETYPES, MATERIALS } from '../Constants';
import { Counter } from '../Counter';

export class Building {
  protected static allowedTerrains:Array<SQUARETYPES>;
  protected static neededResources:Array<number>;
  square:Square;
  title:string;
  spriteName:string;
  constructor(){
    // this.allowedTerrains = theAllowedTerrains;
    // this.neededResources = theNeededResources;
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

  static canBuild(square:Square):boolean{
    return false;
  }

  toJSON():object {
    return {'type': this.title};
  }
}

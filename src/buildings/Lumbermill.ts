import { Tile } from '../board/Tile';
import { Building } from './Building';
import { SQUARETYPES, MATERIALS, EXPONENTS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

export class Lumbermill extends Building {
  static enabled:boolean = false;
  static title:string = 'Lumbermill';
  static spriteName:string = 'factory';
  static allowedTerrains = [SQUARETYPES.Forest];
  static neededResources = [];
  static amount:number = 0;
  type:BUILDINGS;

  constructor(){
    super();
    Lumbermill.amount += 1;
    this.type = BUILDINGS.Lumbermill;
  }

  static isEnabled():boolean{
    return Lumbermill.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 1);
    return counter;
  }

  demolish():void {
    Lumbermill.amount -= 1;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 10);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

  static canBuild(tile:Tile):boolean {
    if (Lumbermill.allowedTerrains.indexOf(tile.type) !== -1) {
      if(Lumbermill.neededResources.length === 0){
        return true;
      }
      if(Lumbermill.neededResources.indexOf(tile.resource) !== -1) {
        return true;
      }
    }
    return false;
  }

}

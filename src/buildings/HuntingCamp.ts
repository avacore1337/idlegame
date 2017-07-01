import { Tile } from '../board/Tile';
import { Building } from './Building';
import { SQUARETYPES, MATERIALS, EXPONENTS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

export class HuntingCamp extends Building {
  static enabled:boolean = false;
  static title:string = 'Hunting camp';
  static spriteName:string = 'factory';
  static allowedTerrains = [SQUARETYPES.Field, SQUARETYPES.Forest, SQUARETYPES.Mountain, SQUARETYPES.Plains, SQUARETYPES.River];
  static neededResources = [];
  static amount:number = 0;
  type:BUILDINGS;

  constructor(){
    super();
    HuntingCamp.amount += 1;
    this.type = BUILDINGS.HuntingCamp;
  }

  static isEnabled():boolean{
    return HuntingCamp.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Food, 0.1);
    return counter;
  }

  demolish():void {
    HuntingCamp.amount -= 1;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 1);
    // return counter;
    return counter.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }

  static canBuild(tile:Tile):boolean {
    if (HuntingCamp.allowedTerrains.indexOf(tile.type) !== -1) {
      if(HuntingCamp.neededResources.length === 0){
        return true;
      }
      if(HuntingCamp.neededResources.indexOf(tile.resource) !== -1) {
        return true;
      }
    }
    return false;
  }

}

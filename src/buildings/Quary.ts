import { Tile } from '../board/Tile';
import { Building } from './Building';
import { LAND, MATERIALS, RESOURCES, EXPONENTS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

/** No documentation available */
export class Quary extends Building {
  static enabled:boolean = false;
  static title:string = 'Quary';
  static spriteName:string = 'factory';
  static allowedTerrains = [LAND.Forest, LAND.Desert];
  static neededResources = [RESOURCES.Stone];
  static amount:number = 0;
  type:BUILDINGS;

  constructor(){
    super();
    Quary.amount += 1;
    this.type = BUILDINGS.Quary;
  }

  /** No documentation available */
  static isEnabled():boolean{
    return Quary.enabled;
  }

  /** No documentation available */
  generateMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Stone, 1);
    return counter;
  }

  /** No documentation available */
  demolish():void {
    Quary.amount -= 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 30);
    counter.add(MATERIALS.Clay, 15);
    return counter.multiplyAll(Math.pow(EXPONENTS.Medium, this.amount));
  }

  /** No documentation available */
  static canBuild(tile:Tile):boolean {
    if (Quary.allowedTerrains.indexOf(tile.type) !== -1) {
      if(Quary.neededResources.length === 0){
        return true;
      }
      if(Quary.neededResources.indexOf(tile.resource) !== -1) {
        return true;
      }
    }
    return false;
  }
}

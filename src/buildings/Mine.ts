import { Tile } from '../board/Tile';
import { Building } from './Building';
import { SQUARETYPES, MATERIALS, RESOURCES, EXPONENTS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

export class Mine extends Building {
  static enabled:boolean = false;
  static title:string = 'Mine';
  static spriteName:string = 'mine';
  static allowedTerrains = [SQUARETYPES.Mountain];
  static neededResources = [RESOURCES.Copper, RESOURCES.Iron, RESOURCES.Coal];
  static amount:number = 0;
  type:BUILDINGS;

  constructor(){
    super();
    Mine.amount += 1;
    this.type = BUILDINGS.Mine;
  }

  static isEnabled():boolean{
    return Mine.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    if(this.tile.resource === RESOURCES.Copper){
      counter.add(MATERIALS.Copper, 1);
    }
    if(this.tile.resource === RESOURCES.Iron){
      counter.add(MATERIALS.Iron, 1);
    }
    if(this.tile.resource === RESOURCES.Coal){
      counter.add(MATERIALS.Coal, 1);
    }
    return counter;
  }

  demolish():void {
    Mine.amount -= 1;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Wood, 30);
    counter.add(MATERIALS.Clay, 15);
    return counter.multiplyAll(Math.pow(EXPONENTS.Medium, this.amount));
  }

  static canBuild(tile:Tile):boolean {
    if (Mine.allowedTerrains.indexOf(tile.type) !== -1) {
      if(Mine.neededResources.length === 0){
        return true;
      }
      if(Mine.neededResources.indexOf(tile.resource) !== -1) {
        return true;
      }
    }
    return false;
  }

}

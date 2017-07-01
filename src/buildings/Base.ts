import { Tile } from '../board/Tile';
import { Building } from './Building';
import { MATERIALS, BUILDINGS } from '../Constants';
import { Counter } from '../Counter';

export class Base extends Building {
  static enabled:boolean = false;
  static title:string = 'Base';
  static spriteName:string = 'building';
  static allowedTerrains = [];
  static neededResources = [];
  static amount:number = 0;
  type:BUILDINGS;

  constructor() {
    super();
    this.type = BUILDINGS.Base;
  }

  static isEnabled():boolean {
    return Base.enabled;
  }

  generateMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    return counter;
  }

  demolish():void {
    return;
  }

  static getRequiredMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    return counter;
  }

  static canBuild(tile:Tile):boolean {
    return false;
  }

}

import { Square } from '../board/Square';
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
  static type:BUILDINGS = BUILDINGS.Base;

  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Base.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    return counter;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    return counter;
  }

  static canBuild(square:Square):boolean{
    return false;
  }

}

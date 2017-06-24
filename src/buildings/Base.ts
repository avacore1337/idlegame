import { Square } from "../Square";
import { Building } from "./Building";
import { SQUARETYPES, MATERIALS, EXPONENTS} from "../Constants";
import { Counter } from "../Counter";

export class Base extends Building {
  static enabled:boolean = false;
  static title:string = "Base";
  static spriteName:string = "building";
  static allowedTerrains = [];
  static neededResources = [];
  static amount:number = 0;

  constructor(){
    super();
  }

  static isEnabled():boolean{
    return Base.enabled;
  }

  generateMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    return counter;
  }

  static getRequiredMaterials():Counter<MATERIALS>{
    let counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    return counter;
  }

  static canBuild(square:Square):boolean{
    return false;
  }

}

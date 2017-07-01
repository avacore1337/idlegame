import { MainGame } from './MainGame';

/** No documentation available */
export class TechNode{
  name:string;
  description:string;
  era:TechNode;
  researched:boolean;
  requires:TechNode[];
  researchPointCost:number;
  effect: (game:MainGame) => void;

  /** No documentation available */
  constructor(name:string, description:string, era:TechNode, requires:TechNode[], researchPointCost:number, effect: (game:MainGame) => void){
    this.name = name;
    this.description = description;
    this.era = era;
    this.requires = requires;
    this.researchPointCost = researchPointCost;
    this.effect = effect;
    this.researched = false;
  }

  /** No documentation available */
  researchable(): boolean{
    if (this.researched) {
      return false;
    }
    if (this.era !== undefined && !this.era.researched) {
      return false;
    }
    for (const tech of this.requires) {
      if(!tech.researched){
        return false;
      }
    }
    return true;
  }

  /** No documentation available */
  research(game:MainGame):void{
    this.effect(game);
    this.researched = true;
  }

}

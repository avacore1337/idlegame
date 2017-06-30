export class TechNode{
  name:string;
  description:string;
  era:TechNode;
  researched:boolean;
  requires:TechNode[];
  researchPointCost:number;
  effect: () => void;

  constructor(name:string, description:string, era:TechNode, requires:TechNode[], researchPointCost:number, effect: () => void){
    this.name = name;
    this.description = description;
    this.era = era;
    this.requires = requires;
    this.researchPointCost = researchPointCost;
    this.effect = effect;
    this.researched = false;
  }

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

  research():void{
    this.effect();
    this.researched = true;
  }

}

export class TechNode{
  name:string;
  researched:boolean;
  requires:TechNode[];
  researchPointCost:number;
  effect: () => void;

  constructor(name:string, requires:TechNode[], researchPointCost:number, effect: () => void){
    this.name = name;
    this.requires = requires;
    this.researchPointCost = researchPointCost;
    this.effect = effect;
    this.researched = false;
  }

  researchable(): boolean{
    if (this.researched) {
      return false;
    }
    for (let tech of this.requires) {
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

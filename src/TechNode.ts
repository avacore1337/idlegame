export class TechNode{
  name:string;
  researched:Boolean;
  requires:TechNode[];
  researchPointCost:number;
  effect: () => void;

  constructor(name:string, requires:TechNode[], researchPointCost:number, effect: () => void){
    this.name = name
    this.requires = requires
    this.researchPointCost = researchPointCost
    this.effect = effect
    this.researched = false;
  }

  researchable(): boolean{
    for (let tech of this.requires) {
      if(!tech.researched){
        return false;
      }
    }
    return true
  }

  run():void{
    this.effect();
  }
  
}

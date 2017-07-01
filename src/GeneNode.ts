import { MainGame } from './MainGame';

export class GeneNode{
  name:string;
  description:string;
  level:number;
  maxLevel:number;
  requires:[GeneNode, number][];
  evolutionPointCost:number;
  effect: (game:MainGame) => void;

  constructor(name:string, description:string, requires:[GeneNode, number][], evolutionPointCost:number, effect: (game:MainGame) => void){
    this.name = name;
    this.description = description;
    this.requires = requires;
    this.evolutionPointCost = evolutionPointCost;
    this.effect = effect;
    this.level = 0;
  }

  buyable(): boolean{
    for (const tech of this.requires) {
      if(tech[0].level < tech[1]){
        return false;
      }
    }
    return true;
  }

  buy(game:MainGame):void{
    this.level += 1;
    this.effect(game);
  }

}

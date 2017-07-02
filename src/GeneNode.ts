import { GameState } from './GameState';

/** No documentation available */
export class GeneNode {
  name:string;
  description:string;
  level:number;
  maxLevel:number;
  requires:[GeneNode, number][];
  evolutionPointCost:number;
  effect: (state:GameState) => void;

  /** No documentation available */
  constructor(name:string, description:string, requires:[GeneNode, number][], evolutionPointCost:number, effect: (state:GameState) => void) {
    this.name = name;
    this.description = description;
    this.requires = requires;
    this.evolutionPointCost = evolutionPointCost;
    this.effect = effect;
    this.level = 0;
  }

  /** No documentation available */
  buyable():boolean {
    for (const tech of this.requires) {
      if(tech[0].level < tech[1]){
        return false;
      }
    }
    return true;
  }

  /** No documentation available */
  buy(state:GameState):void {
    state.evolutionPoints -= this.evolutionPointCost;
    this.level += 1;
    this.effect(state);
  }

  getTooltipText():string {
    const cost = '\n costs: ' + this.evolutionPointCost + ' for next level';
    if(this.buyable()){
      return this.description + cost;
    }
    else {
      let requirementText = '\nRequires: ';
      for(const requirement of this.requires){
        requirementText += '\n' + requirement[0].name + ' level ' + requirement[1];
      }
      return this.description + requirementText + cost;
    }
  }

}

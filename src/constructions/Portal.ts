import { Construction } from './Construction';
import { MATERIALS, EXPONENTS } from '../Constants';
import { Counter } from '../Counter';
import { prepareRebirth } from '../SaveHandler';
import { MainGame } from '../MainGame';

/** No documentation available */
export class Portal extends Construction {
  static enabled:boolean = false;
  static title:string = 'Portal';
  static amount:number = 0;

  constructor(){
    super();
  }

  /** No documentation available */
  static isEnabled():boolean{
    return Portal.enabled;
  }

  /** No documentation available */
  static generateMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Research, 0.2*this.amount);
    return counter;
  }

  /** No documentation available */
  static doThing(game:MainGame):void {
  }

  /** No documentation available */
  static build(game:MainGame):void {
      game.evolutionPoints += Math.floor(Math.pow(game.materialContainer.materials.get(MATERIALS.Food), 0.6));
      prepareRebirth(game);
      game.game.state.start('mainGame', true, false);
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Stone, 30);
    cost.add(MATERIALS.Clay, 30);
    cost.add(MATERIALS.Wood, 30);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

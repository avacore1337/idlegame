import { MATERIALS, EXPONENTS } from '../Constants';
import { Counter } from '../Counter';
import { GameState } from '../GameState';

/** No documentation available */
export class Steelworks {
  static enabled:boolean = false;
  static title:string = 'Steelworks';
  static amount:number = 0;

  /** No documentation available */
  static doThing(state:GameState):void {
    return;
  }

  /** No documentation available */
  static generateMaterials():Counter<MATERIALS> {
    return new Counter<MATERIALS>();
  }

  /** No documentation available */
  static build(state:GameState):void {
    state.materialContainer.pay(this.getRequiredMaterials());
    Steelworks.amount += 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Clay, 10);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

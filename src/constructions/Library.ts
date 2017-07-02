import { MATERIALS, EXPONENTS } from '../Constants';
import { Counter } from '../Counter';
import { GameState } from '../GameState';

/** No documentation available */
export class Library {
  static enabled:boolean = false;
  static title:string = 'Library';
  static amount:number = 0;

  /** No documentation available */
  static generateMaterials():Counter<MATERIALS> {
    const counter:Counter<MATERIALS> = new Counter<MATERIALS>();
    counter.add(MATERIALS.Research, 0.2*this.amount);
    return counter;
  }

  /** No documentation available */
  static doThing(state:GameState):void {
    return;
  }

  /** No documentation available */
  static build(state:GameState):void {
    state.materialContainer.pay(this.getRequiredMaterials());
    Library.amount += 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Wood, 10);
    cost.add(MATERIALS.Clay, 10);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

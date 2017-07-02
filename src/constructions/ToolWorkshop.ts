import { MATERIALS, EXPONENTS, MATERIALMULITIPLIERINDEXES } from '../Constants';
import { Counter } from '../Counter';
import { GameState } from '../GameState';

/** No documentation available */
export class ToolWorkshop {
  static enabled:boolean = false;
  static title:string = 'Tool workshop';
  static amount:number = 0;

  /** No documentation available */
  static doThing(state:GameState):void {
    state.materialContainer.materialGainFactors[MATERIALS.Wood][MATERIALMULITIPLIERINDEXES.ToolWorkshop] = 1 + this.amount*0.02;
    state.materialContainer.materialGainFactors[MATERIALS.Stone][MATERIALMULITIPLIERINDEXES.ToolWorkshop] = 1 + this.amount*0.02;
    state.materialContainer.materialGainFactors[MATERIALS.Clay][MATERIALMULITIPLIERINDEXES.ToolWorkshop] = 1 + this.amount*0.02;
  }

  /** No documentation available */
  static generateMaterials():Counter<MATERIALS> {
    return new Counter<MATERIALS>();
  }

  /** No documentation available */
  static build(state:GameState):void {
    state.materialContainer.pay(this.getRequiredMaterials());
    ToolWorkshop.amount += 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Stone, 15);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

import { MATERIALS, EXPONENTS } from '../Constants';
import { Counter } from '../Counter';
import { MainGame } from '../MainGame';

/** No documentation available */
export class Kiln{
  static enabled:boolean = false;
  static title:string = 'Kiln';
  static amount:number = 0;

  /** No documentation available */
  static doThing(game:MainGame):void {
    if(game.materialContainer.materials.get(MATERIALS.Clay) > Kiln.amount*0.2){
      game.materialContainer.materials.subtract(MATERIALS.Clay, Kiln.amount*0.2);
      game.materialContainer.materialGainBase.add(MATERIALS.Brick, Kiln.amount*0.1);
    }
  }

  /** No documentation available */
  static generateMaterials():Counter<MATERIALS> {
    return new Counter<MATERIALS>();
  }

  /** No documentation available */
  static build(game:MainGame):void {
    game.materialContainer.pay(this.getRequiredMaterials());
    Kiln.amount += 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Clay, 10);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

import { Construction } from './Construction';
import { MATERIALS, EXPONENTS } from '../Constants';
import { Counter } from '../Counter';
import { MainGame } from '../MainGame';

/** No documentation available */
export class Steelworks extends Construction {
  static enabled:boolean = false;
  static title:string = 'Steelworks';
  static amount:number = 0;

  constructor(){
    super();
  }

  /** No documentation available */
  static isEnabled():boolean{
    return Steelworks.enabled;
  }

  /** No documentation available */
  static doThing(game:MainGame):void {
  }

  /** No documentation available */
  static generateMaterials():Counter<MATERIALS> {
    return new Counter<MATERIALS>();
  }

  /** No documentation available */
  static build(game:MainGame):void {
    game.materialContainer.pay(this.getRequiredMaterials());
    Steelworks.amount += 1;
  }

  /** No documentation available */
  static getRequiredMaterials():Counter<MATERIALS> {
    const cost = new Counter<MATERIALS>();
    cost.add(MATERIALS.Clay, 10);
    return cost.multiplyAll(Math.pow(EXPONENTS.Slow, this.amount));
  }
}

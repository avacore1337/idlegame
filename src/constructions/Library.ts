import { Construction } from './Construction';
import { MATERIALS, EXPONENTS } from '../Constants';
import { Counter } from '../Counter';
import { MainGame } from '../MainGame';

/** No documentation available */
export class Library extends Construction {
  static enabled:boolean = false;
  static title:string = 'Library';
  static amount:number = 0;

  constructor(){
    super();
  }

  /** No documentation available */
  static isEnabled():boolean{
    return Library.enabled;
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
    game.materialContainer.pay(this.getRequiredMaterials());
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

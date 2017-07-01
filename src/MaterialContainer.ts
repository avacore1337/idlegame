import { Counter } from './Counter';
import {FACTORAMOUNT, MATERIALSTRINGLIST, MATERIALS} from './Constants';

/** No documentation available */
export class MaterialContainer {

  public materials:Counter<MATERIALS>;
  public materialGainBase:Counter<MATERIALS>;
  materialGainFactors:number[][];

  /** No documentation available */
  constructor(pre?:any){
    this.materials = new Counter<MATERIALS>();
    this.materialGainBase = new Counter<MATERIALS>();
    for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
        this.materials.add(i, 0);
        this.materialGainBase.add(i, 0);
    }
    if (pre) {
      for (const property in pre) {
        this.materials.add(parseInt(property), parseFloat(pre[property]));
      }
    } else {
      this.materials.add(MATERIALS.Wood, 50);
      this.materials.add(MATERIALS.Clay, 50);
      this.materials.add(MATERIALS.Food, 200);
      this.materials.add(MATERIALS.Research, 20000);
    }
    this.materialGainFactors = [];
    for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
      this.materialGainFactors.push([]);
      for (let j = 0; j < FACTORAMOUNT; j++) {
        this.materialGainFactors[i].push(1);
      }
    }

  }

  /** No documentation available */
  gainMaterialsFraction(fraction:number):void{
    const gain = this.getMaterialGains();
    this.materials = this.materials.addOther(gain.divideAll(fraction));
  }

  /** No documentation available */
  getMaterialGains():Counter<MATERIALS>{
    const gain = new Counter(this.materialGainBase);
    for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
      for (let j = 0; j < FACTORAMOUNT; j++) {
        gain.multiply(i, this.materialGainFactors[i][j]);
      }
    }
    return gain;
  }

  /** No documentation available */
  pay(cost:Counter<MATERIALS>){
    this.materials = this.materials.subtractOther(cost);
  }

}

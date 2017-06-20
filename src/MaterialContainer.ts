import { MainGame } from "./MainGame";
import { Counter } from "./Counter";
// import { Building } from "./buildings/AllBuildings";
// import { DIRECTIONS, MATERIALS, SQUARETYPES, SQUARETYPELIST, SQUARESTRINGLIST, BUILDINGS, BUILDINGCLASSES, RESOURCES, RESOURCESTRINGLIST} from "./Constants";
import {FACTORAMOUNT, MATERIALSTRINGLIST, MATERIALS} from "./Constants";

export class MaterialContainer {

  public materials:Counter<number>;
  public materialGainBase:Counter<number>;
  materialGainFactors:number[][];

  constructor(pre:any){
    this.materials = new Counter<number>();
    this.materialGainBase = new Counter<number>();
    for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
        this.materials.add(i, 0);
        this.materialGainBase.add(i, 0);
    }
    if (pre) {
      for (var property in pre.materials) {
        this.materials.add(parseInt(property), parseFloat(pre.materials[property]));
      }
    } else {
      this.materials.add(MATERIALS.Wood, 50);
      this.materials.add(MATERIALS.Clay, 50);
    }
    this.materialGainFactors = [];
    for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
      this.materialGainFactors.push([]);
      for (let j = 0; j < FACTORAMOUNT; j++) {
        this.materialGainFactors[i].push(1);
      }
    }
  }

  gainMaterialsFraction(fraction:number):void{
    let gain = this.getMaterialGains();
    this.materials = this.materials.addOther(gain.divideAll(fraction));
  }

  getMaterialGains():Counter<number>{
    let gain = new Counter(this.materialGainBase);
    for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
      for (let j = 0; j < FACTORAMOUNT; j++) {
        gain.multiply(i, this.materialGainFactors[i][j]);
      }
    }
    return gain;
  }

  pay(cost:Counter<number>){
    this.materials = this.materials.subtractOther(cost);
  }

}

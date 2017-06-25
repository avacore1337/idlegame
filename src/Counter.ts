
export class Counter<T> {
  private values: Map<T, number>;
  // x.set(5, "woa");
  constructor(other?:Counter<T>) {
    this.values = new Map<T, number>();
    if(other){
      for (let key of other.values.keys()) {
        this.values.set(key, other.values.get(key));
      }
    }
  }

  add(key:T, amount:number):Counter<T>{
    if(this.values.has(key)){
      this.values.set(key, amount + this.values.get(key));
    }
    else{
      this.values.set(key, amount);
    }
    return this;
  }

  get(key:T):number{
    return this.values.get(key);
  }

  subtract(key:T, amount:number):Counter<T>{
    if(this.values.has(key)){
      this.values.set(key, this.values.get(key) - amount);
    }
    else{
      this.values.set(key, -amount);
    }
    return this;
  }

  has(key:T):boolean{
    return this.values.has(key);
  }

  addOther(other:Counter<T>):Counter<T>{
    let newCounter = new Counter<T>(this);
    for (let key of other.values.keys()) {
      newCounter.add(key, other.values.get(key));
    }
    return newCounter;
  }

  subtractOther(other:Counter<T>):Counter<T>{
    let newCounter = new Counter<T>(this);
    for (let key of other.values.keys()) {
      newCounter.subtract(key, other.values.get(key));
    }
    return newCounter;
  }

  positive():Counter<T>{
    let newCounter = new Counter<T>();
    for (let key of this.values.keys()) {
      if(this.values.get(key) > 0){
        newCounter.values.set(key, this.values.get(key));
      }
    }
    return newCounter;
  }

  divideAll(divisor:number):Counter<T>{
    let newCounter = new Counter<T>();
    for (let key of this.values.keys()) {
      newCounter.values.set(key, this.values.get(key)/divisor);
    }
    return newCounter;
  }

  negative():Counter<T>{
    let newCounter = new Counter<T>();
    for (let key of this.values.keys()) {
      if(this.values.get(key) < 0){
        newCounter.values.set(key, this.values.get(key));
      }
    }
    return newCounter;
  }

  isSubset(other:Counter<T>):boolean{
    for (let key of other.values.keys()) {
      if(!this.values.has(key) || this.values.get(key) < other.values.get(key)){
        return false;
      }
    }
    return true;
  }

  toString():string{
    let ret:string = "";
    for (let key of this.values.keys()){
      ret += key + ": " + this.values.get(key) + "\n";
    }
    return ret;
  }

  toJSON():string{
    let ret:string = "{";
    for (let key of this.values.keys()){
      ret += '"' + key + '":"' + this.values.get(key) + '", ';
    }
    if (ret.length === 1) {
      return JSON.parse("{}");
    }
    return JSON.parse(ret.substring(0, ret.length - 2) + "}");
  }

  multiplyAll(multiplier:number):Counter<T>{
    let newCounter = new Counter<T>();
    for (let key of this.values.keys()) {
      newCounter.values.set(key, this.values.get(key)*multiplier);
    }
    return newCounter;
  }

  multiply(key:T, multiplier:number):void{
    this.values.set(key, this.values.get(key)*multiplier);
  }

}

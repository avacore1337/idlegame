/** No documentation available */
export class Counter<T> {
  public values: Map<T, number>;

  /** No documentation available */
  constructor(other?:Counter<T>) {
    this.values = new Map<T, number>();
    if(other){
      for (const key of other.values.keys()) {
        this.values.set(key, other.values.get(key));
      }
    }
  }

  /** No documentation available */
  add(key:T, amount:number):Counter<T> {
    if(this.values.has(key)){
      this.values.set(key, amount + this.values.get(key));
    }
    else{
      this.values.set(key, amount);
    }
    return this;
  }

  /** No documentation available */
  get(key:T):number {
    return this.values.get(key);
  }

  /** No documentation available */
  subtract(key:T, amount:number):Counter<T> {
    if(this.values.has(key)){
      this.values.set(key, this.values.get(key) - amount);
    }
    else{
      this.values.set(key, -amount);
    }
    return this;
  }

  /** No documentation available */
  has(key:T):boolean {
    return this.values.has(key);
  }

  /** No documentation available */
  addOther(other:Counter<T>):Counter<T> {
    const newCounter = new Counter<T>(this);
    for (const key of other.values.keys()) {
      newCounter.add(key, other.values.get(key));
    }
    return newCounter;
  }

  /** No documentation available */
  subtractOther(other:Counter<T>):Counter<T> {
    const newCounter = new Counter<T>(this);
    for (const key of other.values.keys()) {
      newCounter.subtract(key, other.values.get(key));
    }
    return newCounter;
  }

  /** No documentation available */
  positive():Counter<T> {
    const newCounter = new Counter<T>();
    for (const key of this.values.keys()) {
      if(this.values.get(key) > 0){
        newCounter.values.set(key, this.values.get(key));
      }
    }
    return newCounter;
  }

  /** No documentation available */
  divideAll(divisor:number):Counter<T> {
    const newCounter = new Counter<T>();
    for (const key of this.values.keys()) {
      newCounter.values.set(key, this.values.get(key)/divisor);
    }
    return newCounter;
  }

  /** No documentation available */
  negative():Counter<T> {
    const newCounter = new Counter<T>();
    for (const key of this.values.keys()) {
      if(this.values.get(key) < 0){
        newCounter.values.set(key, this.values.get(key));
      }
    }
    return newCounter;
  }

  /** No documentation available */
  isSubset(other:Counter<T>):boolean {
    for (const key of other.values.keys()) {
      if(!this.values.has(key) || this.values.get(key) < other.values.get(key)){
        return false;
      }
    }
    return true;
  }

  /** No documentation available */
  toString():string {
    let ret:string = '';
    for (const key of this.values.keys()){
      ret += key + ': ' + this.values.get(key) + '\n';
    }
    return ret;
  }

  /** No documentation available */
  toJSON():string {
    let ret:string = '{';
    for (const key of this.values.keys()){
      ret += '"' + key + '":"' + this.values.get(key) + '", ';
    }
    if (ret.length === 1) {
      return JSON.parse('{}');
    }
    return JSON.parse(ret.substring(0, ret.length - 2) + '}');
  }

  /** No documentation available */
  multiplyAll(multiplier:number):Counter<T> {
    const newCounter = new Counter<T>();
    for (const key of this.values.keys()) {
      newCounter.values.set(key, this.values.get(key)*multiplier);
    }
    return newCounter;
  }

  /** No documentation available */
  multiply(key:T, multiplier:number):void {
    this.values.set(key, this.values.get(key)*multiplier);
  }

}

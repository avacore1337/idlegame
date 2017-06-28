import { MATERIALSTRINGLIST } from './Constants';
import { Counter } from './Counter';

export function shuffle(a:any[]):void {
  for (let i:number = a.length; i; i--) {
      const j:number = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

export function toReadableString(counter:Counter<number>):string {
  let ret:string = '';
  for (const key of counter.values.keys()){
    ret += MATERIALSTRINGLIST[key] + ': ' + counter.values.get(key) + '\n';
  }
  return ret;
}

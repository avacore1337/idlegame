export function shuffle(a:any[]) {
  for (let i:number = a.length; i; i--) {
      let j:number = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

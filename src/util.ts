export function shuffle(a:any[]):void {
  for (let i:number = a.length; i; i--) {
      const j:number = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

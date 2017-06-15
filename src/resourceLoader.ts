export function resourceLoader(game:Phaser.Game){
  game.load.enableParallel = true;
  game.load.pack('tiles', 'assets/asset-pack1.json', null, this);
  game.load.image("menu", "assets/leftpanel.png");
  game.load.image("horse", "assets/smallhorse.png");
  game.load.image("stone", "assets/stone.png");
  game.load.image("building", "assets/building.png");
  game.load.image("button", "assets/button.png");
  game.load.image("button2", "assets/button2.png");
  game.load.image("buttonclicked", "assets/buttonclicked.png");
  game.load.image("button2clicked", "assets/button2clicked.png");
  game.load.image("copper", "assets/copper.png");
  game.load.image("iron", "assets/iron.png");
  game.load.image("coal", "assets/coal.png");
  game.load.image("factory", "assets/factory.png");
  game.load.image("mine", "assets/mine.png");
}

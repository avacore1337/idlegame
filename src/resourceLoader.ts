export function resourceLoader(game:Phaser.Game){
  game.load.enableParallel = true;
  // game.load.pack('tiles', 'assets/tiles.json', null, this);
  // game.load.pack('other', 'assets/other.json', null, this);
  game.load.atlasJSONHash("tiles", "assets/tiles.png", "assets/tiles.json");
  game.load.atlasJSONHash("other", "assets/other.png", "assets/other.json");

  // game.load.pack('tiles', 'assets/asset-pack1.json', null, this);
  // game.load.image("menu", "assets/leftpanel.png");
  game.load.image("horse", "assets/smallhorse.png");
  game.load.image("stone", "assets/stone.png");
  game.load.image("blueborder", "assets/blueborder.png");
  game.load.image("redborder", "assets/redborder.png");
  game.load.image("building", "assets/building.png");
  game.load.image("button", "assets/button.png");
  game.load.image("button2", "assets/button2.png");
  game.load.image("buttonclicked", "assets/buttonclicked.png");
  game.load.image("button2clicked", "assets/button2clicked.png");
  game.load.image("copper", "assets/copper.png");
  game.load.image("iron", "assets/iron.png");
  game.load.image("coal", "assets/coal.png");
  game.load.image("claypit", "assets/factory.png"); // TODO : Fix this, it is like this for testing purposes
  game.load.image("lumbermill", "assets/factory.png"); // TODO : Fix this, it is like this for testing purposes
  game.load.image("quary", "assets/factory.png"); // TODO : Fix this, it is like this for testing purposes
  game.load.image("factory", "assets/factory.png");
  game.load.image("mine", "assets/mine.png");
}

export class Preload extends Phaser.State {

  preload() {
    this.game.load.enableParallel = true;
    this.game.load.atlasJSONHash('tiles', 'assets/tiles.png', 'assets/tiles.json');
    this.game.load.atlasJSONHash('resources', 'assets/resources.png', 'assets/resources.json');
    this.game.load.atlasJSONHash('buildings', 'assets/buildings.png', 'assets/buildings.json');
    this.game.load.atlasJSONHash('menu', 'assets/menu.png', 'assets/menu.json');
  }

  create() {
    this.state.start('mainMenu');
  }

}

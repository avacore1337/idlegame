export class Preload extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = '#000000';

    const style = { font: '40px Arial', fill: '#ffffff', align: 'center' };
    const regTxt:Phaser.Text = this.game.add.text(400, 200, 'HEXIDLE', style);

    this.state.start('mainMenu', false, false);
  }

}

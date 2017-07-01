import { saveGame } from '../SaveHandler';
import { MainGame } from '../MainGame';
import { MATERIALS, MATERIALSTRINGLIST, CONSTRUCTIONCLASSES } from '../Constants';
import { Button } from './Button';
import { Menu } from './Menu';
import { ReincarnationMenu } from './ReincarnationMenu';

/** No documentation available */
export class BottomMenu extends Menu {

  private materialUpdate:number;
  private materialLabels:Array<Phaser.Text>;
  private buttons:Array<Button>;

  /** No documentation available */
  constructor(game:MainGame) {
    super(game, 0, 320, 'menu', 'leftpanel.png');
    this.materialUpdate = 0;
    this.materialLabels = [];
    this.buttons = [];

    const self = this;
    const headerStyle = { font: '14px Arial', fill: '#000000', align: 'center' };
    // const basicStyle = { font: '14px Arial', fill: '#000000', align: 'left' };

    // Initial setup of content
    let visibleLabels = -1;
    for (let i = 0; i < MATERIALS.Length; i++) {
      const label:Phaser.Text = this.game.game.add.text(3, 3, MATERIALSTRINGLIST[i] + ' ' + game.materialContainer.materials.get(i).toFixed(2), headerStyle, this.content);
      label.visible = false;
      if (this.game.materialContainer.materials.get(i) > 0) {
        visibleLabels++;
        label.visible = true;
        label.y += 20 * visibleLabels;
      }
      this.materialLabels.push(label);
    }

    const buy:Button = new Button(this.game.game, 224, 0, 'menu', 'Buy', 'button.png', headerStyle, {'toggleAble': true, 'toggledImage': 'buttonclicked.png'});
    this.buttons.push(buy);
    buy.onClick(Button.REGULAR, function():void {
      self.game.gamestate = 'buying';
      for (const button of self.game.allButtons) {
        button.unToggle();
      }
      self.game.needsupdate = true;
    });
    buy.setToolTip(Button.REGULAR, 'You need food to settle new areas.');
    buy.onClick(Button.TOGGLED, function():void {
      self.game.gamestate = '';
      self.game.needsupdate = true;
    });
    buy.addUpdate(function():void {
      if (self.game.gamestate !== 'buying') {
        buy.unToggle();
      }
    });
    this.content.add(buy.group);
    this.content.add(buy.labelGroup);

    const save:Button = new Button(this.game.game, 224, 30, 'menu', 'Save', 'button.png', headerStyle);
    this.buttons.push(save);
    save.onClick(Button.REGULAR, function():void {
      saveGame(self.game);
    });
    save.setToolTip(Button.REGULAR, 'Save your current gamestate.');
    this.content.add(save.group);
    this.content.add(save.labelGroup);

    const reincarnationMenu:ReincarnationMenu = new ReincarnationMenu(game);
    const reincarnate:Button = new Button(this.game.game, 224, 60, 'menu', 'Evolve', 'button.png', headerStyle);
    this.buttons.push(reincarnate);
    reincarnate.onClick(Button.REGULAR, function(){
      reincarnationMenu.show();
    });
    reincarnate.addUpdate(function(){
      //TODO add reincarnation criteria
    });
    reincarnate.setToolTip(Button.REGULAR, 'Here you can choose your evolution');
    this.content.add(reincarnate.group);
    this.content.add(reincarnate.labelGroup);
  }

  /** No documentation available */
  update():void {
    this.materialUpdate = (this.materialUpdate + 1) % 20;
    if (this.materialUpdate === 0) {
      this.game.materialContainer.gainMaterialsFraction(3);
      let visibleLabels = -1;
      const materials = this.game.materialContainer.materials;
      const gains = this.game.materialContainer.getMaterialGains();
      for (let i = 0; i < MATERIALS.Length; i++) {
        let text = MATERIALSTRINGLIST[i] + ' ' + materials.get(i).toFixed(2);
        text += '  (' + gains.get(i).toFixed(2) + '/s)';
        this.materialLabels[i].setText(text);
        this.materialLabels[i].y = 3;
        this.materialLabels[i].visible = false;
        if (materials.get(i) > 0) {
          visibleLabels++;
          this.materialLabels[i].visible = true;
          this.materialLabels[i].y += 20 * visibleLabels;
        }
      }
      for (const c of CONSTRUCTIONCLASSES) {
        c.doThing(this.game);
      }
    }

    for (const button of this.buttons) {
      button.update();
    }
  }
}

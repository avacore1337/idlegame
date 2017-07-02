import { saveGame } from '../SaveHandler';
import { GameState } from '../GameState';
import { MATERIALS, MATERIALSTRINGLIST, CONSTRUCTIONCLASSES } from '../Constants';
import { Button } from './Button';
import { Menu } from './Menu';
import { ReincarnationMenu } from './ReincarnationMenu';

export class BottomMenu extends Menu {

  private materialUpdate:number;
  private materialLabels:Array<Phaser.Text>;
  private buttons:Array<Button>;

  private static readonly xPosition:number = 0;
  private static readonly yPosition:number = 320;

  /**
   * BottomMenu will create and handle the bottom menu where the resources are displayed
   * @param game {GameState} - The main game object of the game
   */
  constructor(state:GameState) {
    super(state, BottomMenu.xPosition, BottomMenu.yPosition, 'menu', 'leftpanel.png');
    this.materialUpdate = 0;
    this.materialLabels = [];
    this.buttons = [];

    const headerStyle = { font: '14px Arial', fill: '#000000', align: 'center' };

    // Initial setup of content
    let visibleLabels = -1;
    for (let i = 0; i < MATERIALS.Length; i++) {
      const label:Phaser.Text = this.game.add.text(3, 3, MATERIALSTRINGLIST[i] + ' ' + state.materialContainer.materials.get(i).toFixed(2), headerStyle, this.content);
      label.visible = false;
      if (this.state.materialContainer.materials.get(i) > 0) {
        visibleLabels++;
        label.visible = true;
        label.y += 20 * visibleLabels;
      }
      this.materialLabels.push(label);
    }

    const buy:Button = new Button(this.game, 224, 0, 'menu', 'Buy', 'button.png', headerStyle, {'toggleAble': true, 'toggledImage': 'buttonclicked.png'});
    this.buttons.push(buy);
    buy.onClick(Button.REGULAR, () => {
      this.state.gamestate = 'buying';
      for (const button of this.state.allButtons) {
        button.unToggle();
      }
      this.state.needsupdate = true;
    });
    buy.setToolTip(Button.REGULAR, 'You need food to settle new areas.');
    buy.onClick(Button.TOGGLED, () => {
      this.state.gamestate = '';
      this.state.needsupdate = true;
    });
    buy.addUpdate(() => {
      if (this.state.gamestate !== 'buying' && buy.toggled) {
        buy.unToggle();
      }
    });
    this.content.add(buy.group);
    this.content.add(buy.labelGroup);

    const save:Button = new Button(this.game, 224, 30, 'menu', 'Save', 'button.png', headerStyle);
    this.buttons.push(save);
    save.onClick(Button.REGULAR, () => {
      saveGame(this.state);
    });
    save.setToolTip(Button.REGULAR, 'Save your current gamestate.');
    this.content.add(save.group);
    this.content.add(save.labelGroup);

    const reincarnationMenu:ReincarnationMenu = new ReincarnationMenu(state);
    const reincarnate:Button = new Button(this.game, 224, 60, 'menu', 'Evolve', 'button.png', headerStyle);
    this.buttons.push(reincarnate);
    reincarnate.onClick(Button.REGULAR, () => {
      reincarnationMenu.show();
    });
    reincarnate.addUpdate(() => {
      //TODO add reincarnation criteria
    });
    reincarnate.setToolTip(Button.REGULAR, 'Here you can choose your evolution');
    this.content.add(reincarnate.group);
    this.content.add(reincarnate.labelGroup);
  }

  /** Update the graphical items stored on this menu */
  public update():void {
    this.materialUpdate = (this.materialUpdate + 1) % 20;
    if (this.materialUpdate === 0) {
      this.state.materialContainer.gainMaterialsFraction(3);
      let visibleLabels = -1;
      const materials = this.state.materialContainer.materials;
      const gains = this.state.materialContainer.getMaterialGains();
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
        c.doThing(this.state);
      }
    }

    for (const button of this.buttons) {
      button.update();
    }
  }
}

import { toReadableString } from '../util';
import { Menu } from './Menu';
import { MainGame } from '../MainGame';
import { Button } from './Button';
import { MATERIALS, BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES } from '../Constants';
import { TechList } from '../TechTree';

/** No documentation available */
export class TopMenu extends Menu {

  private buttons:Array<Button>;

  private visibleTechs:number;
  private visibleBuildings:number;
  private visibleConstructions:number;

  private static readonly xPosition:number = 0;
  private static readonly yPosition:number = 0;

  /** No documentation available */
  constructor(game:MainGame) {
    super(game, TopMenu.xPosition, TopMenu.yPosition, 'menu', 'leftpanel.png');

    const headerStyle = { font: '14px Arial', fill: '#000000', align: 'center' };
    const basicStyle = { font: '14px Arial', fill: '#000000', align: 'left' };

    this.buttons = [];
    this.visibleTechs = 0;
    this.visibleBuildings = 0;
    this.visibleConstructions = 0;

    const bGroup:Phaser.Group = this.createBuildings(basicStyle);
    const cGroup:Phaser.Group = this.createConstructions(basicStyle);
    const rGroup:Phaser.Group = this.createResearch(basicStyle);
    this.createTopBar(headerStyle, bGroup, cGroup, rGroup);
  }

  /** No documentation available */
  update():void {
    this.visibleTechs = 0;
    this.visibleBuildings = 0;
    this.visibleConstructions = 0;
    for (const button of this.buttons) {
      button.update();
    }
  }

  /** No documentation available */
  private createTopBar(style:Phaser.PhaserTextStyle, bGroup:Phaser.Group, cGroup:Phaser.Group, rGroup:Phaser.Group):void {
    const group = this.game.add.group();
    const buildings = new Button(this.game.game, 0, 0, 'menu', 'Buildings', 'button.png', style);
    const constructions = new Button(this.game.game, 112, 0, 'menu', 'Town buildings', 'button.png', style);
    const research = new Button(this.game.game, 224, 0, 'menu', 'Research', 'button.png', style);
    group.add(buildings.group);
    group.add(constructions.group);
    group.add(research.group);
    this.content.add(group);

    buildings.onClick(Button.REGULAR, () =>  {
      this.game.needsupdate = true;
      if (this.game.gamestate !== 'building') {
        this.game.option = -1;
        this.game.gamestate = '';
      }
      cGroup.visible = false;
      rGroup.visible = false;
      bGroup.visible = true;
    });
    constructions.onClick(Button.REGULAR, () =>  {
      this.game.needsupdate = true;
      if (this.game.gamestate !== 'construction') {
        this.game.option = -1;
        this.game.gamestate = '';
      }
      bGroup.visible = false;
      rGroup.visible = false;
      cGroup.visible = true;
      for (const button of this.game.allButtons) {
        button.unToggle();
      }
    });
    research.onClick(Button.REGULAR, () =>  {
      this.game.needsupdate = true;
      if (this.game.gamestate !== 'research') {
        this.game.option = -1;
        this.game.gamestate = '';
      }
      bGroup.visible = false;
      cGroup.visible = false;
      rGroup.visible = true;
      for (const button of this.game.allButtons) {
        button.unToggle();
      }
    });
  }

  /** No documentation available */
  private createBuildings(style:Phaser.PhaserTextStyle):Phaser.Group {
    let startingButtons = 0;
    const group = this.game.game.add.group();
    this.content.add(group);
    for (let index = 0; index < BUILDINGS.Length; index++) {
      const b = BUILDINGCLASSES[index];
      const building:Button = new Button(this.game.game, 0, 0, 'menu', b.title, 'button2.png', style, {'toggleAble': true, 'disableAble': false, 'toggledImage': 'button2clicked.png'});
      this.buttons.push(building);
      building.hide();
      building.onClick(Button.REGULAR, () => {
        this.game.needsupdate = true;
        for (const button of this.game.allButtons) {
          button.unToggle();
        }
        this.game.option = index;
        this.game.gamestate = 'building';
      });
      building.onClick(Button.TOGGLED, () => {
        this.game.needsupdate = true;
        this.game.option = -1;
        this.game.gamestate = '';
      });
      building.setToolTip(Button.REGULAR, toReadableString(b.getRequiredMaterials()));
      building.setToolTip(Button.TOGGLED, toReadableString(b.getRequiredMaterials()));
      building.addUpdate(() => {
        if (b.isEnabled()) {
          if (this.game.gamestate !== 'building' || this.game.option !== index) {
            building.unToggle();
          }
          building.show();
          this.visibleBuildings += 1;
          building.group.y = 25 * this.visibleBuildings;
          building.labelGroup.y = 25 * this.visibleBuildings;
        } else {
          building.hide();
        }
        building.setToolTip(Button.REGULAR, toReadableString(b.getRequiredMaterials()));
        building.setToolTip(Button.TOGGLED, toReadableString(b.getRequiredMaterials()));

      });
      group.add(building.group);
      group.add(building.labelGroup);
      if (b.isEnabled()) {
        building.show();
        startingButtons++;
        building.group.y = 25 * startingButtons;
        building.labelGroup.y = 25 * startingButtons;
      }
    }
    return group;
  }

  /** No documentation available */
  private createConstructions(style:Phaser.PhaserTextStyle):Phaser.Group {
    let startingButtons = 0;
    const group = this.game.game.add.group();
    group.visible = false;
    this.content.add(group);
    for (let index = 0; index < CONSTRUCTIONS.Length; index++) {
      const c = CONSTRUCTIONCLASSES[index];
      const construction:Button = new Button(this.game.game, 0, 0, 'menu', c.title + ' ' + c.amount, 'button2.png', style, {'disableAble': true, 'disabledImage': 'button2disabled.png'});
      this.buttons.push(construction);
      construction.hide();
      construction.onClick(Button.REGULAR, () => {
        const canAfford = this.game.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
        if (canAfford) {
          this.game.needsupdate = true;
          CONSTRUCTIONCLASSES[index].build(this.game);
        }
      });
      construction.addUpdate(() => {
        construction.setToolTip(Button.REGULAR, toReadableString(c.getRequiredMaterials()));
        construction.setToolTip(Button.DISABLED, toReadableString(c.getRequiredMaterials()));
        construction.setText(Button.REGULAR, c.title + ' ' + c.amount);
        construction.setText(Button.DISABLED, c.title + ' ' + c.amount);
        if (c.isEnabled()) {
          construction.show();
          this.visibleConstructions += 1;
          construction.group.y = 25 * this.visibleConstructions;
          construction.labelGroup.y = 25 * this.visibleConstructions;
        } else {
          construction.hide();
        }
        const canAfford = this.game.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
        if(canAfford){
          construction.enable();
        }
        else {
          construction.disable();
        }
      });
      group.add(construction.group);
      group.add(construction.labelGroup);
      if (c.isEnabled()) {
        construction.show();
        startingButtons++;
        construction.group.y = 25 * startingButtons;
      }
    }
    return group;
  }

  /** No documentation available */
  private createResearch(style:Phaser.PhaserTextStyle):Phaser.Group {
    let startingButtons = 0;
    const group = this.game.game.add.group();
    group.visible = false;
    this.content.add(group);
    for(const r of TechList){
      const research:Button = new Button(this.game.game, 0, 0, 'menu', r.name, 'button2.png', style, {'disableAble': true, 'disabledImage': 'button2disabled.png'});
      this.buttons.push(research);
      research.hide();
      research.onClick(Button.REGULAR, () => {
        const canAfford = this.game.materialContainer.materials.get(MATERIALS.Research) >= r.researchPointCost;
        if (canAfford) {
          this.game.needsupdate = true;
          r.research(this.game);
          this.game.materialContainer.materials.subtract(MATERIALS.Research, r.researchPointCost);
        }
      });
      research.setToolTip(Button.REGULAR, r.description);
      research.setToolTip(Button.DISABLED, r.description);
      research.addUpdate(() => {
        if (r.researchable()) {
          research.show();
          this.visibleTechs++;
          research.group.y = 25 * this.visibleTechs;
          research.labelGroup.y = 25 * this.visibleTechs;
        } else {
          research.hide();
        }
        const canAfford = this.game.materialContainer.materials.get(MATERIALS.Research) >= r.researchPointCost;
        if(canAfford){
          research.enable();
        }
        else {
          research.disable();
        }
      });
      group.add(research.group);
      group.add(research.labelGroup);
      if (r.researchable()) {
        research.show();
        startingButtons++;
        research.group.y = 25 * startingButtons;
      }
    }
    return group;
  }
}

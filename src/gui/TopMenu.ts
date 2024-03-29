import { toReadableString } from '../util';
import { Menu } from './Menu';
import { GameState } from '../GameState';
import { Button } from './Button';
import { MATERIALS, BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES } from '../Constants';
import { TechList } from '../TechTree';

export class TopMenu extends Menu {

  private buttons:Array<Button>;

  private visibleTechs:number;
  private visibleBuildings:number;
  private visibleConstructions:number;

  private static readonly xPosition:number = 0;
  private static readonly yPosition:number = 0;

  /**
   * TopMenu will create and handle the top menu where the buildings and research is bought
   * @param game {GameState} - The main game object of the game
   */
  constructor(state:GameState) {
    super(state, TopMenu.xPosition, TopMenu.yPosition, 'menu', 'leftpanel.png');

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

  /** Update the graphical items stored on this menu */
  public update():void {
    this.visibleTechs = 0;
    this.visibleBuildings = 0;
    this.visibleConstructions = 0;
    for (const button of this.buttons) {
      button.update();
    }
  }

  /** Create the three buttons at the top of the menu */
  private createTopBar(style:Phaser.PhaserTextStyle, bGroup:Phaser.Group, cGroup:Phaser.Group, rGroup:Phaser.Group):void {
    const group = this.state.add.group();
    const buildings = new Button(this.game, 0, 0, 'menu', 'Buildings', 'button.png', style);
    const constructions = new Button(this.game, 112, 0, 'menu', 'Town buildings', 'button.png', style);
    const research = new Button(this.game, 224, 0, 'menu', 'Research', 'button.png', style);
    group.add(buildings.group);
    group.add(constructions.group);
    group.add(research.group);
    this.content.add(group);

    buildings.onClick(Button.REGULAR, () =>  {
      this.state.needsupdate = true;
      if (this.state.gamestate !== 'building') {
        this.state.option = -1;
        this.state.gamestate = '';
      }
      cGroup.visible = false;
      rGroup.visible = false;
      bGroup.visible = true;
    });
    constructions.onClick(Button.REGULAR, () =>  {
      this.state.needsupdate = true;
      if (this.state.gamestate !== 'construction') {
        this.state.option = -1;
        this.state.gamestate = '';
      }
      bGroup.visible = false;
      rGroup.visible = false;
      cGroup.visible = true;
      for (const button of this.state.allButtons) {
        button.unToggle();
      }
    });
    research.onClick(Button.REGULAR, () =>  {
      this.state.needsupdate = true;
      if (this.state.gamestate !== 'research') {
        this.state.option = -1;
        this.state.gamestate = '';
      }
      bGroup.visible = false;
      cGroup.visible = false;
      rGroup.visible = true;
      for (const button of this.state.allButtons) {
        button.unToggle();
      }
    });
  }

  /** Create and fill the group containing the building-buttons */
  private createBuildings(style:Phaser.PhaserTextStyle):Phaser.Group {
    let startingButtons = 0;
    const group = this.game.add.group();
    this.content.add(group);
    for (let index = 0; index < BUILDINGS.Length; index++) {
      const b = BUILDINGCLASSES[index];
      const building:Button = new Button(this.game, 0, 0, 'menu', b.title, 'button2.png', style, {'toggleAble': true, 'disableAble': false, 'toggledImage': 'button2clicked.png'});
      this.buttons.push(building);
      building.hide();
      building.onClick(Button.REGULAR, () => {
        this.state.needsupdate = true;
        for (const button of this.state.allButtons) {
          button.unToggle();
        }
        this.state.option = index;
        this.state.gamestate = 'building';
      });
      building.onClick(Button.TOGGLED, () => {
        this.state.needsupdate = true;
        this.state.option = -1;
        this.state.gamestate = '';
      });
      building.setToolTip(Button.REGULAR, toReadableString(b.getRequiredMaterials()));
      building.setToolTip(Button.TOGGLED, toReadableString(b.getRequiredMaterials()));
      building.addUpdate(() => {
        if (b.enabled) {
          if (this.state.gamestate !== 'building' || this.state.option !== index) {
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
      if (b.enabled) {
        building.show();
        startingButtons++;
        building.group.y = 25 * startingButtons;
        building.labelGroup.y = 25 * startingButtons;
      }
    }
    return group;
  }

  /** Create and fill the group containing the construction-buttons */
  private createConstructions(style:Phaser.PhaserTextStyle):Phaser.Group {
    let startingButtons = 0;
    const group = this.game.add.group();
    group.visible = false;
    this.content.add(group);
    for (let index = 0; index < CONSTRUCTIONS.Length; index++) {
      const c = CONSTRUCTIONCLASSES[index];
      const construction:Button = new Button(this.game, 0, 0, 'menu', c.title + ' ' + c.amount, 'button2.png', style, {'disableAble': true, 'disabledImage': 'button2disabled.png'});
      this.buttons.push(construction);
      construction.hide();
      construction.onClick(Button.REGULAR, () => {
        const canAfford = this.state.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
        if (canAfford) {
          this.state.needsupdate = true;
          CONSTRUCTIONCLASSES[index].build(this.state);
        }
      });
      construction.addUpdate(() => {
        construction.setToolTip(Button.REGULAR, toReadableString(c.getRequiredMaterials()));
        construction.setToolTip(Button.DISABLED, toReadableString(c.getRequiredMaterials()));
        construction.setText(Button.REGULAR, c.title + ' ' + c.amount);
        construction.setText(Button.DISABLED, c.title + ' ' + c.amount);
        if (c.enabled) {
          construction.show();
          this.visibleConstructions += 1;
          construction.group.y = 25 * this.visibleConstructions;
          construction.labelGroup.y = 25 * this.visibleConstructions;
        } else {
          construction.hide();
        }
        const canAfford = this.state.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
        if(canAfford){
          construction.enable();
        }
        else {
          construction.disable();
        }
      });
      group.add(construction.group);
      group.add(construction.labelGroup);
      if (c.enabled) {
        construction.show();
        startingButtons++;
        construction.group.y = 25 * startingButtons;
      }
    }
    return group;
  }

  /** Create and fill the group containing the research-buttons */
  private createResearch(style:Phaser.PhaserTextStyle):Phaser.Group {
    let startingButtons = 0;
    const group = this.game.add.group();
    group.visible = false;
    this.content.add(group);
    for(const r of TechList){
      const research:Button = new Button(this.game, 0, 0, 'menu', r.name, 'button2.png', style, {'disableAble': true, 'disabledImage': 'button2disabled.png'});
      this.buttons.push(research);
      research.hide();
      research.onClick(Button.REGULAR, () => {
        const canAfford = this.state.materialContainer.materials.get(MATERIALS.Research) >= r.researchPointCost;
        if (canAfford) {
          this.state.needsupdate = true;
          r.research(this.state);
          this.state.materialContainer.materials.subtract(MATERIALS.Research, r.researchPointCost);
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
        const canAfford = this.state.materialContainer.materials.get(MATERIALS.Research) >= r.researchPointCost;
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

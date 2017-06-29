import { toReadableString } from './util';
import { MainGame } from './MainGame';
import { Button } from './Button';
import { MATERIALS, BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES } from './Constants';
import { TechList } from './TechTree';

export function createTopMenu(game:MainGame, headerStyle:any, basicStyle:any):void {
  const topMenu = game.game.add.group();
  const topSprite = game.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
  topMenu.add(topSprite);
  game.menuGroup.add(topMenu);

  const bGroup:Phaser.Group = createBuildings(game, basicStyle);
  const cGroup:Phaser.Group = createConstructions(game, basicStyle);
  const rGroup:Phaser.Group = createResearch(game, basicStyle);
  createTopBar(game, headerStyle, bGroup, cGroup, rGroup);
}

function createTopBar(game:MainGame, headerStyle:object, bGroup:Phaser.Group, cGroup:Phaser.Group, rGroup:Phaser.Group):void {
  const group = game.add.group();
  const buildings = new Button(game.game, 0, 0, 'menu', 'Buildings', 'button.png', headerStyle);
  const constructions = new Button(game.game, 112, 0, 'menu', 'Town buildings', 'button.png', headerStyle);
  const research = new Button(game.game, 224, 0, 'menu', 'Research', 'button.png', headerStyle);
  group.add(buildings.group);
  group.add(constructions.group);
  group.add(research.group);
  game.menuGroup.add(group);

  buildings.onClick(Button.REGULAR, function() {
    game.needsupdate = true;
    if (game.gamestate !== 'building') {
      game.option = -1;
      game.gamestate = '';
    }
    cGroup.visible = false;
    rGroup.visible = false;
    bGroup.visible = true;
  });
  constructions.onClick(Button.REGULAR, function() {
    game.needsupdate = true;
    if (game.gamestate !== 'construction') {
      game.option = -1;
      game.gamestate = '';
    }
    bGroup.visible = false;
    rGroup.visible = false;
    cGroup.visible = true;
    for (const button of game.allButtons) {
      button.unToggle();
    }
  });
  research.onClick(Button.REGULAR, function() {
    game.needsupdate = true;
    if (game.gamestate !== 'research') {
      game.option = -1;
      game.gamestate = '';
    }
    bGroup.visible = false;
    cGroup.visible = false;
    rGroup.visible = true;
    for (const button of game.allButtons) {
      button.unToggle();
    }
  });
}

function createBuildings(game:MainGame, headerStyle:object):Phaser.Group {
  let startingButtons = 0;
  const group = game.game.add.group();
  game.menuGroup.add(group);
  for (let index = 0; index < BUILDINGS.Length; index++) {
    const b = BUILDINGCLASSES[index];
    const building:Button = new Button(game.game, 0, 0, 'menu', b.title, 'button2.png', headerStyle, {'toggleAble': true, 'disableAble': false, 'toggledImage': 'button2clicked.png'});
    building.hide();
    building.onClick(Button.REGULAR, function():void {
      game.needsupdate = true;
      for (const button of game.allButtons) {
        button.unToggle();
      }
      game.option = index;
      game.gamestate = 'building';
    });
    building.onClick(Button.TOGGLED, function():void {
      game.needsupdate = true;
      game.option = -1;
      game.gamestate = '';
    });
    building.setToolTip(Button.REGULAR, toReadableString(b.getRequiredMaterials()));
    building.setToolTip(Button.TOGGLED, toReadableString(b.getRequiredMaterials()));
    building.addUpdate(function():void {
      if (b.isEnabled()) {
        building.show();
        game.visibleBuildings += 1;
        building.group.y = 25 * game.visibleBuildings;
        } else {
          building.hide();
        }
      building.setToolTip(Button.REGULAR, toReadableString(b.getRequiredMaterials()));
      building.setToolTip(Button.TOGGLED, toReadableString(b.getRequiredMaterials()));

    });
    group.add(building.group);
    game.allButtons.push(building);
    if (b.isEnabled()) {
      building.show();
      startingButtons++;
      building.group.y = 25 * startingButtons;
    }
  }
  return group;
}

function createConstructions(game:MainGame, headerStyle:object):Phaser.Group {
  let startingButtons = 0;
  const group = game.game.add.group();
  group.visible = false;
  game.menuGroup.add(group);
  for (let index = 0; index < CONSTRUCTIONS.Length; index++) {
    const c = CONSTRUCTIONCLASSES[index];
    const construction:Button = new Button(game.game, 0, 0, 'menu', c.title + ' ' + c.amount, 'button2.png', headerStyle, {disableAble:true, disabledImage:'button2disabled.png'});
    construction.hide();
    construction.onClick(Button.REGULAR, function():void {
      const canAfford = game.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
      if (canAfford) {
        game.needsupdate = true;
        CONSTRUCTIONCLASSES[index].build(game);
      }
    });
    construction.addUpdate(function(){
      construction.setToolTip(Button.REGULAR, toReadableString(c.getRequiredMaterials()));
      construction.setToolTip(Button.DISABLED, toReadableString(c.getRequiredMaterials()));
      construction.setText(Button.REGULAR, c.title + ' ' + c.amount);
      construction.setText(Button.DISABLED, c.title + ' ' + c.amount);
      if (c.isEnabled()) {
        construction.show();
        game.visibleConstructions += 1;
        construction.group.y = 25 * game.visibleConstructions;
      } else {
        construction.hide();
      }
      const canAfford = game.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
      if(canAfford){
        construction.enable();
      }
      else {
        construction.disable();
      }
    });
    group.add(construction.group);
    game.allButtons.push(construction);
    if (c.isEnabled()) {
      construction.show();
      startingButtons++;
      construction.group.y = 25 * startingButtons;
    }
  }
  return group;
}

function createResearch(game:MainGame, headerStyle:object):Phaser.Group {
  let startingButtons = 0;
  const group = game.game.add.group();
  group.visible = false;
  game.menuGroup.add(group);
  for(const r of TechList){
    const research:Button = new Button(game.game, 0, 0, 'menu', r.name, 'button2.png', headerStyle);
    research.hide();
    research.onClick(Button.REGULAR, function():void {
      const canAfford = game.materialContainer.materials.get(MATERIALS.Research) >= r.researchPointCost;
      if (canAfford) {
        game.needsupdate = true;
        r.research();
        game.materialContainer.materials.subtract(MATERIALS.Research, r.researchPointCost);
      } else {
      }
    });
    research.setToolTip(Button.REGULAR, r.description);
    research.addUpdate(function(){
      if (r.researchable()) {
          research.show();
          game.visibleTechs++;
          research.group.y = 25 * game.visibleTechs;
        } else {
          research.hide();
        }
    });
    group.add(research.group);
    game.allButtons.push(research);
    if (r.researchable()) {
      research.show();
      startingButtons++;
      research.group.y = 25 * startingButtons;
    }
  }
  return group;
}

import { toReadableString } from './util';
import { MainGame } from './MainGame';
import { Button } from './Button';
import { BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES } from './Constants';
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
    const construction:Button = new Button(game.game, 0, 0, 'menu', c.title, 'button2.png', headerStyle);
    construction.hide();
    construction.onClick(Button.REGULAR, function():void {
      const canAfford = game.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
      if (canAfford) {
        game.needsupdate = true;
        CONSTRUCTIONCLASSES[index].build(game);
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
      const canAfford = true;
      if (canAfford) {
        game.needsupdate = true;
        r.research();

        const specialButtons = 1; // The buy button

        // Update what building-buttons should be visible
        let visibleButtons = 0;
        for (let index = specialButtons; index < specialButtons + BUILDINGS.Length; index++) {
          if (BUILDINGCLASSES[index - specialButtons].isEnabled()) {
            game.allButtons[index].show();
            visibleButtons++;
            game.allButtons[index].group.y = 25 * visibleButtons;
          } else {
            game.allButtons[index].hide();
          }
        }

        // Update what townBuilding-buttons should be visible
        visibleButtons = 0;
        for (let index = specialButtons + BUILDINGS.Length; index < specialButtons + CONSTRUCTIONS.Length + BUILDINGS.Length; index++) {
          if (CONSTRUCTIONCLASSES[index - BUILDINGS.Length - specialButtons].isEnabled()) {
            game.allButtons[index].show();
            visibleButtons++;
            game.allButtons[index].group.y = 25 * visibleButtons;
          } else {
            game.allButtons[index].hide();
          }
        }

        // Update what research-buttons should be visible
        visibleButtons = 0;
        for (let index = specialButtons + CONSTRUCTIONS.Length + BUILDINGS.Length; index < specialButtons + TechList.length + CONSTRUCTIONS.Length + BUILDINGS.Length; index++) {
          if (TechList[index - CONSTRUCTIONS.Length - BUILDINGS.Length - specialButtons].researchable()) {
            game.allButtons[index].show();
            visibleButtons++;
            game.allButtons[index].group.y = 25 * visibleButtons;
          } else {
            game.allButtons[index].hide();
          }
        }
      }
    });
    research.setToolTip(Button.REGULAR, r.description);
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

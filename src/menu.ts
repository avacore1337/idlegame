import { MainGame } from './MainGame';
import { MATERIALSTRINGLIST, BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES } from './Constants';
import { saveGame, resetSave } from './SaveHandler';
import { TechList } from './TechTree';
import { Button } from './Button';
import { toReadableString } from './util';

function createBottomMenu(game:MainGame, botMenu:Phaser.Group):any{
  const style = { font: '14px Arial', fill: '#000000', align: 'center' };
  const style2 = { font: '14px Arial', fill: '#000000', align: 'left' };
  const botSprite = game.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
  botMenu.add(botSprite);

  botMenu.y = 320;

  // Display owned materials
  // -----------------------
  let visibleLabels = -1;
  for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
    const label:Phaser.Text = game.game.add.text(3, 3, MATERIALSTRINGLIST[i] + ' ' + game.materialContainer.materials.get(i).toFixed(2), style);
    label.visible = false;
    if (game.materialContainer.materials.get(i) > 0) {
      visibleLabels++;
      label.visible = true;
      label.y += 30 * visibleLabels;
    }
    game.materialLabels.push(label);
    botMenu.add(label);
  }

  // Buttons for special things
  // --------------------------


  const buy:Button = new Button(game.game, 224, 0, 'menu', 'Buy', 'button.png', style, {toggleAble:true, toggledImage:'buttonclicked.png'});
  buy.onClick(Button.REGULAR, function(){
    game.gamestate = 'buying';
    for (const button of game.allButtons) {
      button.unToggle();
    }
    game.needsupdate = true;
  });
  buy.setToolTip(Button.REGULAR, 'You need food to settle new areas.');
  buy.onClick(Button.TOGGLED, function(){
    game.gamestate = '';
    game.needsupdate = true;
  });
  game.allButtons.push(buy);

  botMenu.add(buy.group);

  const saveGroup:Phaser.Group = game.game.add.group();
  saveGroup.visible = true;
  botMenu.add(saveGroup);
  const saveButton:Phaser.Sprite = game.game.add.sprite(224, 30, 'menu', 'button.png');
  saveButton.visible = true;
  saveButton.inputEnabled = true;
  saveGroup.add(saveButton);
  const saveText:Phaser.Text = game.game.add.text(250, 33, 'Save game', style2);
  saveText.visible = true;
  saveGroup.add(saveText);
  saveButton.events.onInputUp.add(function() {
    saveGame(game);
  });
}

export function createMenu(game:MainGame):void{
  game.menuGroup = game.game.add.group();
  game.menuGroup.fixedToCamera = true;

  // game.menuGroup.x = 0;
  // game.menuGroup.y = 0;

  const style = { font: '14px Arial', fill: '#000000', align: 'center' };
  const style2 = { font: '14px Arial', fill: '#000000', align: 'left' };

  const topMenu = game.game.add.group();
  const topSprite = game.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
  topMenu.add(topSprite);
  game.menuGroup.add(topMenu);
  //const game.allButtons:any = [];
  const botMenu = game.game.add.group();
  game.menuGroup.add(botMenu);
  createBottomMenu(game, botMenu);

  game.modal.createModal({
      type: 'mainModal',
      includeBackground: true,
      modalCloseOnInput: true,
      fixedToCamera:true,
      itemsArr: [{
          type: 'text',
          content: 'Seriously???',
          fontSize: 42,
          color: '0xFEFF49',
          offsetY: 50
      }]
  });
  const mainMenu = game.game.add.group();
  game.menuGroup.add(mainMenu);
  const mainMenuButton = game.game.add.sprite(1134, 1, 'menu', 'gear.png');
  mainMenu.add(mainMenuButton);
  mainMenuButton.inputEnabled = true;
  mainMenuButton.events.onInputUp.add(function() {
    game.modal.showModal('mainModal');
  });

  const bGroup:Phaser.Group = setupBuildings(game, style2);
  const cGroup:Phaser.Group = setupConstructions(game, style2);
  const rGroup:Phaser.Group = setupResearch(game, style2);
  setupTopbar(game, style, bGroup, cGroup, rGroup);
}

function setupTopbar(game:MainGame, style:object, bGroup:Phaser.Group, cGroup:Phaser.Group, rGroup:Phaser.Group):void {
  const group = game.add.group();
  const buildings = new Button(game.game, 0, 0, 'menu', 'Buildings', 'button.png', style);
  const constructions = new Button(game.game, 112, 0, 'menu', 'Town buildings', 'button.png', style);
  const research = new Button(game.game, 224, 0, 'menu', 'Research', 'button.png', style);
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

function setupBuildings(game:MainGame, style:object):Phaser.Group {
  let startingButtons = 0;
  const group = game.game.add.group();
  game.menuGroup.add(group);
  for (let index = 0; index < BUILDINGS.Length; index++) {
    const b = BUILDINGCLASSES[index];
    const building:Button = new Button(game.game, 0, 0, 'menu', b.title, 'button2.png', style, {'toggleAble': true, 'disableAble': false, 'toggledImage': 'button2clicked.png'});
    building.hide();
    building.onClick(Button.REGULAR, function(){
      game.needsupdate = true;
      for (const button of game.allButtons) {
        button.unToggle();
      }
      game.option = index;
      game.gamestate = 'building';
    });
    building.onClick(Button.TOGGLED, function(){
      game.needsupdate = true;
      game.option = -1;
      game.gamestate = '';
    });
    building.setToolTip(Button.REGULAR, toReadableString(b.getRequiredMaterials()));
    building.setToolTip(Button.TOGGLED, toReadableString(b.getRequiredMaterials()));
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

function setupConstructions(game:MainGame, style:object):Phaser.Group {
  let startingButtons = 0;
  const group = game.game.add.group();
  group.visible = false;
  game.menuGroup.add(group);
  for (let index = 0; index < CONSTRUCTIONS.Length; index++) {
    const c = CONSTRUCTIONCLASSES[index];
    const construction:Button = new Button(game.game, 0, 0, 'menu', c.title, 'button2.png', style);
    construction.hide();
    construction.onClick(Button.REGULAR, function(){
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

function setupResearch(game:MainGame, style:object):Phaser.Group {
  let startingButtons = 0;
  const group = game.game.add.group();
  group.visible = false;
  game.menuGroup.add(group);
  for(const r of TechList){
    const research:Button = new Button(game.game, 0, 0, 'menu', r.name, 'button2.png', style);
    research.hide();
    research.onClick(Button.REGULAR, function(){
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

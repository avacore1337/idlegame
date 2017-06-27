import { MainGame } from './MainGame';
import { MATERIALSTRINGLIST, BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES } from './Constants';
import { saveGame, resetSave } from './SaveHandler';
import { TechList } from './TechTree';
import { Button } from './Button';

function createBottomMenu(game:MainGame, botMenu:Phaser.Group, buttons1:any):any{
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
  const buyGroup:Phaser.Group = game.game.add.group();
  buyGroup.visible = true;
  buyGroup.x = 224;
  botMenu.add(buyGroup);
  const buyButton:Phaser.Sprite = game.game.add.sprite(0, 0, 'menu', 'button.png');
  buyButton.visible = true;
  buyButton.inputEnabled = true;
  buyGroup.add(buyButton);
  const buyText:Phaser.Text = game.game.add.text(26, 3, 'Buy', style2);
  buyText.visible = true;
  buyGroup.add(buyText);
  // Add functionality to the 'Buy'-button
  buyButton.events.onInputUp.add(function() {
    if(game.state !== 'buying'){
      game.state = 'buying';
      for (const button of buttons1) {
        button.regular.visible = true;
        button.toggled.visible = false;
      }
    }
    else{
      game.state = '';
    }
    game.needsupdate = true;
  });
  const tip4 = new Phasetips(game.game, {
    targetObject: buyButton,
    context: 'You need food to settle new areas.',
    position: 'right',
    positionOffset: 10
    // x: x,
  });
  buyGroup.add(tip4.getGroup());
  tip4.updateText('satoeuhsnaoetuhanot asnoetu aonsteu aone aon ethu antoeh uasnoethu naoestuh aosnetu hs');


  const unToggleAble:Button = new Button(game, 0, 100, 'menu', 'Save button', 'button2.png', style2);
  unToggleAble.onclick(function(){
    console.log('Hello World 1');
  });
  buyGroup.add(unToggleAble.regular);

  const toggleAble:Button = new Button(game, 0, 130, 'menu', 'Save button', 'button2.png', style2, 'button2clicked.png');
  toggleAble.onclick(function(){
    console.log('Hello World 2');
  });
  buyGroup.add(toggleAble.regular);

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

  const resetGroup:Phaser.Group = game.game.add.group();
  resetGroup.visible = true;
  botMenu.add(resetGroup);
  const resetButton:Phaser.Sprite = game.game.add.sprite(224, 60, 'menu', 'button.png');
  resetButton.visible = true;
  resetButton.inputEnabled = true;
  resetGroup.add(resetButton);
  const resetText:Phaser.Text = game.game.add.text(250, 63, 'Reset save', style2);
  resetText.visible = true;
  resetGroup.add(resetText);
  resetButton.events.onInputUp.add(function() {
    resetSave();
  });
}

export function createMenu(game:MainGame):void{
  game.menuGroup = game.game.add.group();
  game.menuGroup.fixedToCamera = true;

  // game.menuGroup.x = 0;
  // game.menuGroup.y = 0;

  const style = { font: '14px Arial', fill: '#000000', align: 'center' };

  const topMenu = game.game.add.group();
  const topSprite = game.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
  topMenu.add(topSprite);
  game.menuGroup.add(topMenu);
  const buttons1:any = [];
  const botMenu = game.game.add.group();
  game.menuGroup.add(botMenu);
  createBottomMenu(game,botMenu, buttons1);

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
  // mainMenu.add(game.modal);

  // SETUP FOR BUILDINGS
  // -------------------
  const button1 = game.game.add.sprite(0, 0, 'menu', 'button.png');
  const buildings:Phaser.Text = game.game.add.text(30, 3, 'Buildings', style);
  const buildingGroup = game.game.add.group();
  game.menuGroup.add(buildingGroup);
  buildingGroup.visible = true;
  let startingButtons = 0;
  for (let index = 0; index < BUILDINGS.Length; index++) {
    const b = BUILDINGCLASSES[index];
    const bgroup = game.game.add.group();
    buildingGroup.add(bgroup);
    bgroup.visible = false;
    const bbuttonRegular = game.game.add.sprite(0, 0,'menu', 'button2.png');
    bgroup.add(bbuttonRegular);
    bbuttonRegular.visible = true;
    bbuttonRegular.inputEnabled = true;
    const bbuttonClicked = game.game.add.sprite(0, 0,'menu', 'button2clicked.png');
    bgroup.add(bbuttonClicked);
    bbuttonClicked.visible = false;
    bbuttonClicked.inputEnabled = true;
    const btext:Phaser.Text = game.game.add.text(3, 3, b.title, style);
    bgroup.add(btext);
    if (b.isEnabled()) {
      bgroup.visible = true;
      startingButtons++;
      bgroup.y = 25 * startingButtons;
    }
    buttons1.push({'group': bgroup, 'regular': bbuttonRegular, 'toggled': bbuttonClicked});
    bbuttonRegular.events.onInputUp.add(function() {
      game.needsupdate = true;
      for (const button of buttons1) {
        button.regular.visible = true;
        button.toggled.visible = false;
      }
      game.option = index;
      game.state = 'building';
      bbuttonRegular.visible = false;
      bbuttonClicked.visible = true;
    });
    bbuttonClicked.events.onInputUp.add(function() {
      game.needsupdate = true;
      for (const button of buttons1) {
        button.regular.visible = true;
        button.toggled.visible = false;
      }
      game.option = -1;
      game.state = '';
    });
  }
  game.menuGroup.add(button1);
  game.menuGroup.add(buildings);


  // SETUP FOR TOWN BUILDINGS
  // -------------------
  const button2 = game.game.add.sprite(112, 0,'menu', 'button.png');
  const town:Phaser.Text = game.game.add.text(120, 3, 'Town buildings', style);
  const townBuildingGroup = game.game.add.group();
  game.menuGroup.add(townBuildingGroup);
  townBuildingGroup.visible = false;
  const buttons2 = [];
  startingButtons = 0;
  for (let index = 0; index < CONSTRUCTIONS.Length; index++) {
    const c = CONSTRUCTIONCLASSES[index];
    const cgroup = game.game.add.group();
    cgroup.visible = false;
    townBuildingGroup.add(cgroup);
    const cbutton = game.game.add.sprite(0, 0,'menu', 'button2.png');
    cgroup.add(cbutton);
    cbutton.visible = true;
    cbutton.inputEnabled = true;
    const ctext:Phaser.Text = game.game.add.text(3, 3, c.title, style);
    cgroup.add(ctext);
    if (c.isEnabled()) {
      cgroup.visible = true;
      startingButtons++;
      cgroup.y = 25 * startingButtons;
    }
    buttons2.push({'group': cgroup});
    cbutton.events.onInputUp.add(function() {
      const canAfford = game.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
      if (canAfford) {
        game.needsupdate = true;
        CONSTRUCTIONCLASSES[index].build(game);
      }
    });
  }
  game.menuGroup.add(button2);
  game.menuGroup.add(town);


  // SETUP FOR RESEARCH
  // -------------------
  const button3 = game.game.add.sprite(224, 0,'menu', 'button.png');
  const research:Phaser.Text = game.game.add.text(250, 3, 'Research', style);
  const researchGroup = game.game.add.group();
  game.menuGroup.add(researchGroup);
  researchGroup.visible = false;
  const buttons3 = [];
  startingButtons = 0;
  for(const r of TechList){
    const rgroup = game.game.add.group();
    rgroup.visible = false;
    if (r.researchable()) {
      rgroup.visible = true;
      startingButtons++;
      rgroup.y = 25 * startingButtons;
    }
    researchGroup.add(rgroup);
    buttons3.push(rgroup);
    const rbutton = game.game.add.sprite(0, 0,'menu', 'button2.png');
    rbutton.visible = true;
    rbutton.inputEnabled = true;
    rgroup.add(rbutton);
    const rtext:Phaser.Text = game.game.add.text(3, 3, r.name, style);
    rgroup.add(rtext);
    rbutton.events.onInputUp.add(function() {
      const canAfford = true;
      if (canAfford) {
        game.needsupdate = true;
        r.research();

        // Update what building-buttons should be visible
        let visibleButtons = 0;
        for (let index = 0; index < BUILDINGS.Length; index++) {
          if (BUILDINGCLASSES[index].isEnabled()) {
            visibleButtons++;
            buttons1[index].group.y = 25 * visibleButtons;
            buttons1[index].group.visible = true;
          } else {
            buttons1[index].group.visible = false;
          }
        }

        // Update what townBuilding-buttons should be visible
        visibleButtons = 0;
        for (let index = 0; index < CONSTRUCTIONS.Length; index++) {
          if (CONSTRUCTIONCLASSES[index].isEnabled()) {
            visibleButtons++;
            buttons2[index].group.y = 25 * visibleButtons;
            buttons2[index].group.visible = true;
          } else {
            buttons2[index].group.visible = false;
          }
        }

        // Update what research-buttons should be visible
        visibleButtons = 0;
        for (let index = 0; index < TechList.length; index++) {
          if (TechList[index].researchable()) {
            visibleButtons++;
            buttons3[index].y = 25 * visibleButtons;
            buttons3[index].visible = true;
          } else {
            buttons3[index].visible = false;
          }
        }
      }
    });
  }
  game.menuGroup.add(button3);
  game.menuGroup.add(research);

  // Toggle between 'Buildings' / 'Town buildings' / 'Research'
  button1.inputEnabled = true;
  button2.inputEnabled = true;
  button3.inputEnabled = true;
  button1.events.onInputUp.add(function() {
    game.needsupdate = true;
    if (game.state !== 'building') {
      game.option = -1;
      game.state = '';
    }
    buildingGroup.visible = true;
    townBuildingGroup.visible = false;
    researchGroup.visible = false;
  });
  button2.events.onInputUp.add(function() {
    game.needsupdate = true;
    if (game.state !== 'town') {
      game.option = -1;
      game.state = '';
    }
    buildingGroup.visible = false;
    townBuildingGroup.visible = true;
    researchGroup.visible = false;
    for (const button of buttons1) {
      button.regular.visible = true;
      button.toggled.visible = false;
    }
  });
  button3.events.onInputUp.add(function() {
    game.needsupdate = true;
    if (game.state !== 'research') {
      game.option = -1;
      game.state = '';
    }
    buildingGroup.visible = false;
    townBuildingGroup.visible = false;
    researchGroup.visible = true;
    for (const button of buttons1) {
      button.regular.visible = true;
      button.toggled.visible = false;
    }
  });

  game.menuGroup.add(button3);
  game.menuGroup.add(town);
  game.menuGroup.add(research);
}

import { MainGame } from "./MainGame";
import { MATERIALSTRINGLIST, BUILDINGS, BUILDINGCLASSES, CONSTRUCTIONS, CONSTRUCTIONCLASSES } from "./Constants";
import { saveGame, resetSave } from "./SaveHandler";
import { TechList } from "./TechTree";

function createBottomMenu(game:MainGame, botMenu:Phaser.Group, buttons1:any):any{
  let style = { font: "14px Arial", fill: "#000000", align: "center" };
  let style2 = { font: "14px Arial", fill: "#000000", align: "left" };
  let botSprite = game.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
  botMenu.add(botSprite);

  botMenu.y = 320;

  // Display owned materials
  // -----------------------
  let visibleLabels = -1;
  for (var i = 0; i < MATERIALSTRINGLIST.length; i++) {
    let label:Phaser.Text = game.game.add.text(3, 3, MATERIALSTRINGLIST[i] + " " + game.materialContainer.materials.get(i).toFixed(2), style);
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
  let buyGroup:Phaser.Group = game.game.add.group();
  buyGroup.visible = true;
  botMenu.add(buyGroup);
  let buyButton:Phaser.Sprite = game.game.add.sprite(224, 0, 'menu', 'button.png');
  buyButton.visible = true;
  buyButton.inputEnabled = true;
  buyGroup.add(buyButton);
  let buyText:Phaser.Text = game.game.add.text(250, 3, "Buy", style2);
  buyText.visible = true;
  buyGroup.add(buyText);
  // Add functionality to the 'Buy'-button
  buyButton.events.onInputUp.add(function() {
    if(game.state != "buying"){
      game.state = "buying";
      for (let button of buttons1) {
        button.regular.visible = true;
        button.toggled.visible = false;
      }
    }
    else{
      game.state = "";
    }
    game.needsupdate = true;
  });

  let saveGroup:Phaser.Group = game.game.add.group();
  saveGroup.visible = true;
  botMenu.add(saveGroup);
  let saveButton:Phaser.Sprite = game.game.add.sprite(224, 30, 'menu', 'button.png');
  saveButton.visible = true;
  saveButton.inputEnabled = true;
  saveGroup.add(saveButton);
  let saveText:Phaser.Text = game.game.add.text(250, 33, "Save game", style2);
  saveText.visible = true;
  saveGroup.add(saveText);
  saveButton.events.onInputUp.add(function() {
    saveGame(game);
  });

  let resetGroup:Phaser.Group = game.game.add.group();
  resetGroup.visible = true;
  botMenu.add(resetGroup);
  let resetButton:Phaser.Sprite = game.game.add.sprite(224, 60, 'menu', 'button.png');
  resetButton.visible = true;
  resetButton.inputEnabled = true;
  resetGroup.add(resetButton);
  let resetText:Phaser.Text = game.game.add.text(250, 63, "Reset save", style2);
  resetText.visible = true;
  resetGroup.add(resetText);
  resetButton.events.onInputUp.add(function() {
    resetSave();
  });
}

export function createMenu(game:MainGame):void{
  game.menuGroup = game.game.add.group();

  game.menuGroup.x = 0;
  game.menuGroup.y = 0;

  let style = { font: "14px Arial", fill: "#000000", align: "center" };

  let topMenu = game.game.add.group();
  let topSprite = game.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
  topMenu.add(topSprite);
  game.menuGroup.add(topMenu);
  let buttons1:any = [];
  let botMenu = game.game.add.group();
  game.menuGroup.add(botMenu);
  createBottomMenu(game,botMenu, buttons1);


  // SETUP FOR BUILDINGS
  // -------------------
  let button1 = game.game.add.sprite(0, 0, 'menu', 'button.png');
  let buildings:Phaser.Text = game.game.add.text(30, 3, "Buildings", style);
  let buildingGroup = game.game.add.group();
  game.menuGroup.add(buildingGroup);
  buildingGroup.visible = true;
  let startingButtons = 0;
  for (let index = 0; index < BUILDINGS.Length; index++) {
    let b = BUILDINGCLASSES[index];
    let bgroup = game.game.add.group();
    buildingGroup.add(bgroup);
    bgroup.visible = false;
    let bbuttonRegular = game.game.add.sprite(0, 0,'menu', 'button2.png');
    bgroup.add(bbuttonRegular);
    bbuttonRegular.visible = true;
    bbuttonRegular.inputEnabled = true;
    let bbuttonClicked = game.game.add.sprite(0, 0,'menu', 'button2clicked.png');
    bgroup.add(bbuttonClicked);
    bbuttonClicked.visible = false;
    bbuttonClicked.inputEnabled = true;
    let btext:Phaser.Text = game.game.add.text(3, 3, b.title, style);
    bgroup.add(btext);
    if (b.isEnabled()) {
      bgroup.visible = true;
      startingButtons++;
      bgroup.y = 25 * startingButtons;
    }
    buttons1.push({'group': bgroup, 'regular': bbuttonRegular, 'toggled': bbuttonClicked});
    bbuttonRegular.events.onInputUp.add(function() {
      game.needsupdate = true;
      for (let button of buttons1) {
        button.regular.visible = true;
        button.toggled.visible = false;
      }
      game.option = index;
      game.state = "building";
      bbuttonRegular.visible = false;
      bbuttonClicked.visible = true;
    });
    bbuttonClicked.events.onInputUp.add(function() {
      game.needsupdate = true;
      for (let button of buttons1) {
        button.regular.visible = true;
        button.toggled.visible = false;
      }
      game.option = -1;
      game.state = "";
    });
  }
  game.menuGroup.add(button1);
  game.menuGroup.add(buildings);


  // SETUP FOR TOWN BUILDINGS
  // -------------------
  let button2 = game.game.add.sprite(112, 0,'menu', 'button.png');
  let town:Phaser.Text = game.game.add.text(120, 3, "Town buildings", style);
  let townBuildingGroup = game.game.add.group();
  game.menuGroup.add(townBuildingGroup);
  townBuildingGroup.visible = false;
  let buttons2 = [];
  startingButtons = 0;
  for (let index = 0; index < CONSTRUCTIONS.Length; index++) {
    let c = CONSTRUCTIONCLASSES[index];
    let cgroup = game.game.add.group();
    cgroup.visible = false;
    townBuildingGroup.add(cgroup);
    let cbutton = game.game.add.sprite(0, 0,'menu', 'button2.png');
    cgroup.add(cbutton);
    cbutton.visible = true;
    cbutton.inputEnabled = true;
    let ctext:Phaser.Text = game.game.add.text(3, 3, c.title, style);
    cgroup.add(ctext);
    if (c.isEnabled()) {
      cgroup.visible = true;
      startingButtons++;
      cgroup.y = 25 * startingButtons;
    }
    buttons2.push({'group': cgroup});
    cbutton.events.onInputUp.add(function() {
      let canAfford = game.materialContainer.materials.isSubset(CONSTRUCTIONCLASSES[index].getRequiredMaterials());
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
  let button3 = game.game.add.sprite(224, 0,'menu', 'button.png');
  let research:Phaser.Text = game.game.add.text(250, 3, "Research", style);
  let researchGroup = game.game.add.group();
  game.menuGroup.add(researchGroup);
  researchGroup.visible = false;
  let buttons3 = [];
  startingButtons = 0;
  for (let index = 0; index < TechList.length; index++) {
    let r = TechList[index];
    let rgroup = game.game.add.group();
    rgroup.visible = false;
    if (r.researchable()) {
      rgroup.visible = true;
      startingButtons++;
      rgroup.y = 25 * startingButtons;
    }
    researchGroup.add(rgroup);
    buttons3.push(rgroup);
    let rbutton = game.game.add.sprite(0, 0,'menu', 'button2.png');
    rbutton.visible = true;
    rbutton.inputEnabled = true;
    rgroup.add(rbutton);
    let rtext:Phaser.Text = game.game.add.text(3, 3, r.name, style);
    rgroup.add(rtext);
    rbutton.events.onInputUp.add(function() {
      let canAfford = true;
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
    if (game.state !== "building") {
      game.option = -1;
      game.state = "";
    }
    buildingGroup.visible = true;
    townBuildingGroup.visible = false;
    researchGroup.visible = false;
  });
  button2.events.onInputUp.add(function() {
    game.needsupdate = true;
    if (game.state !== "town") {
      game.option = -1;
      game.state = "";
    }
    buildingGroup.visible = false;
    townBuildingGroup.visible = true;
    researchGroup.visible = false;
    for (let button of buttons1) {
      button.regular.visible = true;
      button.toggled.visible = false;
    }
  });
  button3.events.onInputUp.add(function() {
    game.needsupdate = true;
    if (game.state !== "research") {
      game.option = -1;
      game.state = "";
    }
    buildingGroup.visible = false;
    townBuildingGroup.visible = false;
    researchGroup.visible = true;
    for (let button of buttons1) {
      button.regular.visible = true;
      button.toggled.visible = false;
    }
  });

  game.menuGroup.add(button3);
  game.menuGroup.add(town);
  game.menuGroup.add(research);
}

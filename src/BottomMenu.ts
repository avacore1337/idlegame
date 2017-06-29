import { saveGame } from './SaveHandler';
import { MainGame } from './MainGame';
import { MATERIALSTRINGLIST } from './Constants';
import { Button } from './Button';
import { ReincarnationMenu } from './ReincarnationMenu';

export function createBottomMenu(game:MainGame, headerStyle:any, basicStyle:any):any {
  const botMenu = game.game.add.group();
  botMenu.y = 320;
  game.menuGroup.add(botMenu);

  const botSprite = game.game.add.sprite(0, 0, 'menu', 'leftpanel.png');
  botMenu.add(botSprite);

  // Display owned materials
  // -----------------------
  let visibleLabels = -1;
  for (let i = 0; i < MATERIALSTRINGLIST.length; i++) {
    const label:Phaser.Text = game.game.add.text(3, 3, MATERIALSTRINGLIST[i] + ' ' + game.materialContainer.materials.get(i).toFixed(2), headerStyle);
    label.visible = false;
    if (game.materialContainer.materials.get(i) > 0) {
      visibleLabels++;
      label.visible = true;
      label.y += 30 * visibleLabels;
    }
    game.materialLabels.push(label);
    botMenu.add(label);
  }

  const buy:Button = new Button(game.game, 224, 0, 'menu', 'Buy', 'button.png', headerStyle, {toggleAble:true, toggledImage:'buttonclicked.png'});
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
  botMenu.add(buy.labelGroup);

  const saveGroup:Phaser.Group = game.game.add.group();
  saveGroup.visible = true;
  botMenu.add(saveGroup);
  const saveButton:Phaser.Sprite = game.game.add.sprite(224, 30, 'menu', 'button.png');
  saveButton.visible = true;
  saveButton.inputEnabled = true;
  saveGroup.add(saveButton);
  const saveText:Phaser.Text = game.game.add.text(250, 33, 'Save game', basicStyle);
  saveText.visible = true;
  saveGroup.add(saveText);
  saveButton.events.onInputUp.add(function() {
    saveGame(game);
  });

  const reincarnationMenu:ReincarnationMenu = ReincarnationMenu.Instance(game);
  const reincarnate:Button = new Button(game.game, 224, 60, 'menu', 'Evolve', 'button.png', headerStyle);
  reincarnate.onClick(Button.REGULAR, function(){
    reincarnationMenu.show();
  });
  reincarnate.addUpdate(function(){
    //TODO add reincarnation criteria
  });
  reincarnate.setToolTip(Button.REGULAR, 'Here you can choose your evolution');
  game.allButtons.push(reincarnate);

  botMenu.add(reincarnate.group);
  botMenu.add(reincarnate.labelGroup);
}

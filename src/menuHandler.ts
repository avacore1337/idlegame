import { MainGame } from './MainGame';
import { Tutorial } from './Tutorial';
import { BottomMenu } from './BottomMenu';
import { createTopMenu } from './TopMenu';

export function createMenu(game:MainGame):void {
  game.menuGroup = game.game.add.group();
  game.menuGroup.fixedToCamera = true;
  const tutorial = new Tutorial(game);

  const headerStyle = { font: '14px Arial', fill: '#000000', align: 'center' };
  const basicStyle = { font: '14px Arial', fill: '#000000', align: 'left' };

  const bottoMenu:BottomMenu = new BottomMenu(game);
  game.menuGroup.add(bottoMenu.group);
  //createBottomMenu(game, headerStyle, basicStyle);
  createTopMenu(game, headerStyle, basicStyle);

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
    //game.modal.showModal('mainModal');
    tutorial.run();
  });
}

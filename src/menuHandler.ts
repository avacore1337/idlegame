import { MainGame } from './MainGame';
import { Tutorial } from './Tutorial';
import { BottomMenu } from './BottomMenu';
import { TopMenu } from './TopMenu';

export function createMenu(game:MainGame):void {
  game.menuGroup = game.game.add.group();
  game.menuGroup.fixedToCamera = true;
  const tutorial = new Tutorial(game);

  const bottomMenu:BottomMenu = new BottomMenu(game);
  game.menuGroup.add(bottomMenu.group);

  const topMenu:TopMenu = new TopMenu(game);
  game.menuGroup.add(topMenu.group);

  const mainMenu = game.game.add.group();
  game.menuGroup.add(mainMenu);
  const mainMenuButton = game.game.add.sprite(1134, 1, 'menu', 'gear.png');
  mainMenu.add(mainMenuButton);
  mainMenuButton.inputEnabled = true;
  mainMenuButton.events.onInputUp.add(function() {
    tutorial.run();
  });
}

import { GameState } from '../GameState';
import { Tutorial } from './Tutorial';
import { BottomMenu } from './BottomMenu';
import { TopMenu } from './TopMenu';

/** Creates the menus shown during the main part of the game */
export function createMenu(state:GameState):void {
  state.menuGroup = state.game.add.group();
  state.menuGroup.fixedToCamera = true;
  const tutorial = new Tutorial(state);

  const bottomMenu:BottomMenu = new BottomMenu(state);
  state.menuGroup.add(bottomMenu.group);

  const topMenu:TopMenu = new TopMenu(state);
  state.menuGroup.add(topMenu.group);

  const mainMenu = state.game.add.group();
  state.menuGroup.add(mainMenu);
  const mainMenuButton = state.game.add.sprite(1134, 1, 'menu', 'gear.png');
  mainMenu.add(mainMenuButton);
  mainMenuButton.inputEnabled = true;
  mainMenuButton.events.onInputUp.add(function() {
    tutorial.run();
  });
}

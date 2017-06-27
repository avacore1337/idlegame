import { MainGame } from './MainGame';

window.onload = () => {
  console.log('testtesttest2');
  const game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'gameDiv');
  // const mainState:Phaser.State = new Phaser.State({
  //   preload: onPreload,
  //   create: onCreate,
  //   update: onUpdate,
  //   render: onRender
  // });
  // const state:Phaser.State = new Phaser.State()
  game.state.add('main', MainGame);
  game.state.start('main');
  // function onPreload(){
  //   gameClass.onPreload();
  // }
  // function onCreate(){
  //   gameClass.onCreate();
  // }
  // function onUpdate(){
  //   gameClass.onUpdate();
  // }
  // function onRender(){
  //   gameClass.onRender();
  // }
};

import { MainGame } from "./MainGame";

window.onload = () => {
  console.log("testtesttest2")
  let game = new Phaser.Game(1200, 600, Phaser.CANVAS, '', {
    preload: onPreload,
    create: onCreate,
    update: onUpdate,
    render: onRender
  });
  let gameClass = new MainGame(game);
  function onPreload(){
    gameClass.onPreload();
  }
  function onCreate(){
    gameClass.onCreate();
  }
  function onUpdate(){
    gameClass.onUpdate();
  }
  function onRender(){
    gameClass.onRender();
  }
};

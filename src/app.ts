import { MainGame } from "./MainGame";


window.onload = () => {
    (function(){
      // let counter:Counter<string> = new Counter<string>();
      // counter.add("test", 5);
      // counter.add("t2", 5);
      // counter.add("t2", 5);
      // console.log(counter.toString());
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

    })();
};

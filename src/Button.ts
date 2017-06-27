'use strict';

import { MainGame } from './MainGame';

export class Button {

  button:Phaser.Group;
  tooltip:Phasetips;
  effect:any;

  constructor(game:MainGame, x:number, y:number, key:any, text:string, image:string, style:object, toggledImage?:string, styleToggled?:object) {
    const self = this;

    this.button = game.game.add.group();
    const button:Phaser.Sprite = game.game.add.sprite(x, y, key, image);
    const buttonText:Phaser.Text = game.game.add.text(x + 26, y + 3, text, style);

    this.button.visible = true;
    button.visible = true;
    buttonText.visible = true;

    this.button.add(button);
    this.button.add(buttonText);

    button.inputEnabled = true;
    button.events.onInputUp.add(function() {
      self.effect();
    });

    this.tooltip = new Phasetips(game.game, {
        targetObject: button,
        context: 'You need food to settle new areas.',
        x: button.x,
        y: button.y,
        fixedToCamera: true
      }
    );
  }

  onclick(callBack:any):void {
    this.effect = callBack;
  }
}

/*
Example usages:

const style2 = { font: '14px Arial', fill: '#000000', align: 'left' };

const unToggleAble:Button = new Button(game, 225, 30, 'menu', 'Save button', 'button2.png', style2);
unToggleAble.onclick(function(){
  console.log('Hello World 1');
});
mainGroup.add(unToggleAble.button);

const toggleAble:Button = new Button(game, 225, 30, 'menu', 'Save button', 'button2.png', style2, 'button2clicked.png');
toggleAble.onclick(function(){
  console.log('Hello World 2');
});
mainGroup.add(toggleAble.button);
*/

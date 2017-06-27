'use strict';

import { MainGame } from './MainGame';

export class Button {

  regular:Phaser.Group;
  toggled:Phaser.Group;
  disabled:Phaser.Group;
  game:MainGame;
  toggleAble:boolean;
  disableAble:boolean;
  isToggled:boolean;

  image:string;
  text:string;
  style:object;
  effect: () => void;
  regTool:Phasetips;

  toggledImage:string;
  toggledText:string;
  toggledStyle:object;
  toggledEffect: () => void;
  togTool:Phasetips;

  disabledImage:string;
  disabledText:string;
  disabledStyle:object;
  disTool:Phasetips;

  constructor(game:MainGame, x:number, y:number, key:any, text:string, image:string, style:object, options?:any) {
    const self = this;
    this.game = game;
    this.toggleAble = false;
    this.disableAble = false;
    this.image = image;
    this.text = text;
    this.style = style;
    this.effect = undefined;
    this.toggledEffect = undefined;
    this.isToggled = false;
    this.disTool = undefined;

    if(options) {
      const {
        toggleAble = false,
        disableAble = false,
        toggledImage = image,
        toggledText = text,
        toggledStyle = style,
        disabledImage = image,
        disabledText = text,
        disabledStyle = style
      } = options;
      this.toggledImage = toggledImage;
      this.toggledText = toggledText;
      this.toggledStyle = toggledStyle;
      this.disabledImage = disabledImage;
      this.disabledText = disabledText;
      this.disabledStyle = disabledStyle;
      this.toggleAble = toggleAble;
      this.disableAble = disableAble;
    }

    // Regular button
    this.regular = game.game.add.group();
    this.regular.x = x;
    this.regular.y = y;
    const regImg = game.game.add.sprite(0, 0, key, this.image);
    const regTxt:Phaser.Text = game.game.add.text(26, 3, this.text, this.style);

    regImg.visible = true;
    regTxt.visible = true;

    this.regular.add(regImg);
    this.regular.add(regTxt);

    regImg.inputEnabled = true;
    regImg.events.onInputUp.add(function() {
      self.effect();
    });

    this.regular.visible = true;

    this.regTool = new Phasetips(game.game, {
      targetObject: regImg,
      context: ' ',
      position: 'right'
    });
    this.regular.add(this.regTool.getGroup());

    // Toggled button
    if(this.toggleAble) {
      this.toggled = game.game.add.group();
      this.toggled.x = x;
      this.toggled.y = y;
      const togImg = game.game.add.sprite(0, 0, key, this.toggledImage);
      const togTxt:Phaser.Text = game.game.add.text(26, 3, this.toggledText, this.toggledStyle);

      togImg.visible = true;
      togTxt.visible = true;

      this.toggled.add(togImg);
      this.toggled.add(togTxt);

      togImg.inputEnabled = true;
      togImg.events.onInputUp.add(function() {
        self.effect();
      });

      this.toggled.visible = false;

      this.togTool = new Phasetips(game.game, {
        targetObject: togImg,
        context: ' ',
        position: 'right'
      });
      this.toggled.add(this.togTool.getGroup());
    } else {
      this.toggled = undefined;
    }


    // Disabled button
    if(this.disableAble) {
      this.disabled = game.game.add.group();
      this.disabled.x = x;
      this.disabled.y = y;
      const disImg = game.game.add.sprite(0, 0, key, this.disabledImage);
      const disTxt:Phaser.Text = game.game.add.text(26, 3, this.disabledText, this.disabledStyle);

      disImg.visible = true;
      disTxt.visible = true;

      this.disabled.add(disImg);
      this.disabled.add(disTxt);

      disImg.inputEnabled = true;
      disImg.events.onInputUp.add(function() {
        self.effect();
      });

      this.disabled.visible = false;

      this.disTool = new Phasetips(game.game, {
        targetObject: disImg,
        context: ' ',
        position: 'right'
      });
      this.disabled.add(this.disTool.getGroup());
    } else {
      this.disabled = undefined;
    }
  }

  onToggle(callBack: () => void):void {
    this.effect = callBack;
  }

  onUnToggle(callBack: () => void):void {
    this.toggledEffect = callBack;
  }

  setToolTip(content:string):void {
    this.regTool.updateText(content);
  }

  seToggledtToolTip(callBack:any):void {
    // TODO
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

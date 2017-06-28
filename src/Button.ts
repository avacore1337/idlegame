'use strict';

import { MainGame } from './MainGame';

export class Button {

  public static readonly REGULAR:number = 0;
  public static readonly TOGGLED:number = 1;
  public static readonly DISABLED:number = 2;

  public static readonly GROUP:number = 0;
  public static readonly SPRITE:number = 1;
  public static readonly TOOLTIP:number = 2;

  game:Phaser.Game;

  buttons:Array<Array<any>>;

  toggled:boolean;
  disabled:boolean;
  toggleAble:boolean;
  disableAble:boolean;
  group:Phaser.Group;

  constructor(game:Phaser.Game, x:number, y:number, key:any, text:string, image:string, style:object, options?:any) {
    const self = this;
    this.game = game;
    this.buttons = [];
    this.toggled = false;
    this.disabled = false;
    this.toggleAble = false;
    this.disableAble = false;
    this.group = game.add.group();

    // ------------------
    // | REGULAR BUTTON |
    // ------------------
    const reg:Array<any> = [];
    // Group
    const regGroup = game.add.group();
    regGroup.x = x;
    regGroup.y = y;
    reg.push(regGroup);
    // Sprite
    const regImg:Phaser.Sprite = game.add.sprite(0, 0, key, image);
    regImg.visible = true;
    regImg.inputEnabled = true;
    regGroup.add(regImg);
    reg.push(regImg);
    // Text
    const regTxt:Phaser.Text = game.add.text(26, 3, text, style);
    regTxt.visible = true;
    regGroup.add(regTxt);
    // Tooltip
    reg.push(undefined);
    // Export button
    this.buttons.push(reg);
    this.group.add(regGroup);

    if(options !== undefined) {
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
      this.toggleAble = toggleAble;
      this.disableAble = disableAble;

      // ------------------
      // | TOGGLED BUTTON |
      // ------------------
      if(this.toggleAble) {
        const tog:Array<any> = [];
        // Group
        const togGroup = game.add.group();
        togGroup.visible = false;
        togGroup.x = x;
        togGroup.y = y;
        tog.push(togGroup);
        // Sprite
        const togImg:Phaser.Sprite = game.add.sprite(0, 0, key, toggledImage);
        togImg.visible = true;
        togImg.inputEnabled = true;
        togGroup.add(togImg);
        tog.push(togImg);
        // Text
        const togTxt:Phaser.Text = game.add.text(26, 3, toggledText, toggledStyle);
        togTxt.visible = true;
        togGroup.add(togTxt);
        // Tooltip
        tog.push(undefined);
        // Export button
        this.buttons.push(tog);
        this.group.add(togGroup);
      } else {
        this.buttons.push(undefined); // Toggled
      }

      // -------------------
      // | DISABLED BUTTON |
      // -------------------
      if(this.disableAble) {
        const dis:Array<any> = [];
        // Group
        const disGroup = game.add.group();
        disGroup.visible = false;
        disGroup.x = x;
        disGroup.y = y;
        dis.push(disGroup);
        // Sprite
        const disImg:Phaser.Sprite = game.add.sprite(0, 0, key, disabledImage);
        disImg.visible = true;
        disImg.inputEnabled = true;
        disGroup.add(disImg);
        dis.push(disImg);
        // Text
        const disTxt:Phaser.Text = game.add.text(26, 3, disabledText, disabledStyle);
        disTxt.visible = true;
        disGroup.add(disTxt);
        // Tooltip
        dis.push(undefined);
        // Export button
        this.buttons.push(dis);
        this.group.add(disGroup);
      } else {
        this.buttons.push(undefined); // Disabled
      }
    } else {
      this.buttons.push(undefined); // Toggled
      this.buttons.push(undefined); // Disabled
    }
  }

  onClick(callBack: () => void, button:number):boolean {
    if(this.buttons[button] === undefined) {
      return false;
    }

    const self = this;
    this.buttons[button][Button.SPRITE].events.onInputUp.add(function() {
      const toggled:boolean = self.toggled; // Since the callBack might change the toggle state
      callBack();
      if(self.toggleAble) {
        self.buttons[Button.REGULAR][Button.GROUP].vissible = toggled;
        self.buttons[Button.TOGGLED][Button.GROUP].vissible = !toggled;
      }
    });
    return true;
  }

  unToggle():void {
    this.buttons[Button.REGULAR][Button.GROUP].visible = true;
    this.buttons[Button.TOGGLED][Button.GROUP].visible = false;
    this.buttons[Button.DISABLED][Button.GROUP].visible = false;
  }

  setToolTip(content:string, button:number):void {
    if(this.buttons[button] !== undefined) {
      if(this.buttons[button][Button.TOOLTIP] === undefined) {
        this.buttons[button][Button.TOOLTIP] = new Phasetips(this.game, {
          targetObject: this.buttons[button][Button.SPRITE],
          context: content,
          position: 'right'
        });
        this.buttons[button][Button.GROUP].add(this.buttons[button][Button.TOOLTIP].getGroup());
      } else {
        this.buttons[button][Button.TOOLTIP].updateText(content);
      }
    }
  }
}

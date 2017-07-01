import { MainGame } from '../MainGame';
import { Updateable } from '../Interfaces';

/** No documentation available */
export class Button implements Updateable {

  public static readonly REGULAR:number = 0;
  public static readonly TOGGLED:number = 1;
  public static readonly DISABLED:number = 2;

  private static readonly GROUP:number = 0;
  private static readonly SPRITE:number = 1;
  private static readonly TOOLTIP:number = 2;
  private static readonly TEXT:number = 3;

  game:Phaser.Game;

  buttons:Array<Array<any>>;

  toggled:boolean;
  disabled:boolean;
  toggleAble:boolean;
  disableAble:boolean;
  group:Phaser.Group;
  labelGroup:Phaser.Group;
  updateCallback: () => void;

  /** No documentation available */
  constructor(game:Phaser.Game, x:number, y:number, key:any, text:string, image:string, style:Phaser.PhaserTextStyle, options?:any) {
    const self = this;
    this.game = game;
    this.buttons = [];
    this.toggled = false;
    this.disabled = false;
    this.toggleAble = false;
    this.disableAble = false;
    this.group = game.add.group();
    this.labelGroup = game.add.group();
    this.updateCallback = function(){};

    // ------------------
    // | REGULAR BUTTON |
    // ------------------
    const reg:Array<any> = [];
    // Group
    const regGroup = game.add.group();
    reg.push(regGroup);
    // Sprite
    const regImg:Phaser.Sprite = game.add.sprite(0, 0, key, image);
    regImg.inputEnabled = true;
    regGroup.add(regImg);
    reg.push(regImg);
    // Text
    const regTxt:Phaser.Text = game.add.text(10, 3, text, style);
    if (style.align === 'center') {
      regTxt.x =(regImg.width - regTxt.width) / 2;
    }
    regGroup.add(regTxt);
    // Tooltip
    reg.push(undefined);
    reg.push(regTxt);
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
        tog.push(togGroup);
        // Sprite
        const togImg:Phaser.Sprite = game.add.sprite(0, 0, key, toggledImage);
        togImg.inputEnabled = true;
        togGroup.add(togImg);
        tog.push(togImg);
        // Text
        const togTxt:Phaser.Text = game.add.text(10, 3, toggledText, toggledStyle);
        if (style.align === 'center') {
          togTxt.x =(togImg.width - togTxt.width) / 2;
        }
        togGroup.add(togTxt);
        // Tooltip
        tog.push(undefined);
        tog.push(togTxt);
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
        dis.push(disGroup);
        // Sprite
        const disImg:Phaser.Sprite = game.add.sprite(0, 0, key, disabledImage);
        disImg.inputEnabled = true;
        disGroup.add(disImg);
        dis.push(disImg);
        // Text
        const disTxt:Phaser.Text = game.add.text(10, 3, disabledText, disabledStyle);
        if (style.align === 'center') {
          disTxt.x =(disImg.width - disTxt.width) / 2;
        }
        disGroup.add(disTxt);
        // Tooltip
        dis.push(undefined);
        dis.push(disTxt);
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

    this.group.x = x;
    this.group.y = y;
    this.labelGroup.x = x;
    this.labelGroup.y = y;
  }

  /** No documentation available */
  onClick(button:number, callBack: () => void):boolean {
    if(this.buttons[button] === undefined) {
      return false;
    }

    const self = this;
    this.buttons[button][Button.SPRITE].events.onInputUp.add(function() {
      const toggled:boolean = self.toggled; // Since the callBack might change the toggle state
      callBack();
      if(!self.disabled && self.toggleAble) {
        self.toggled = !self.toggled;
        self.draw();
      }
    });
    return true;
  }

  /** No documentation available */
  unToggle():void {
    this.toggled = false;
    this.draw();
  }

  /** No documentation available */
  disable():void {
    this.disabled = true;
    this.draw();
  }

  /** No documentation available */
  enable():void {
    this.disabled = false;
    this.draw();
  }

  /** No documentation available */
  addUpdate(callBack: () => void):void {
    this.updateCallback = callBack;
  }

  /** No documentation available */
  update():void {
    this.updateCallback();
  }

  /** No documentation available */
  draw():void {
    if(this.disabled) {
      this.buttons[Button.REGULAR][Button.GROUP].visible = false;
      if(this.toggleAble) {
        this.buttons[Button.TOGGLED][Button.GROUP].visible = false;
      }
      this.buttons[Button.DISABLED][Button.GROUP].visible = true;
    } else if(this.toggled) {
      this.buttons[Button.REGULAR][Button.GROUP].visible = false;
      this.buttons[Button.TOGGLED][Button.GROUP].visible = true;
      if(this.disableAble) {
        this.buttons[Button.DISABLED][Button.GROUP].visible = false;
      }
    } else {
      this.buttons[Button.REGULAR][Button.GROUP].visible = true;
      if(this.toggleAble) {
        this.buttons[Button.TOGGLED][Button.GROUP].visible = false;
      }
      if(this.disableAble) {
        this.buttons[Button.DISABLED][Button.GROUP].visible = false;
      }
    }
  }

  /** No documentation available */
  setText(button:number, content:string):void {
    const text = this.buttons[button][Button.TEXT];
    text.text = content;
    text.updateText();
  }

  /** No documentation available */
  setToolTip(button:number, content:string):void {
    if(this.buttons[button] !== undefined) {
      if(this.buttons[button][Button.TOOLTIP] === undefined) {
        this.buttons[button][Button.TOOLTIP] = new Phasetips(this.game, {
          targetObject: this.buttons[button][Button.SPRITE],
          context: content,
          position: 'right'
        });
        this.labelGroup.add(this.buttons[button][Button.TOOLTIP].getGroup());
      } else {
        this.buttons[button][Button.TOOLTIP].updateText(content);
      }
    }
  }

  /** No documentation available */
  hide():void {
    this.group.visible = false;
  }

  /** No documentation available */
  show():void {
    this.group.visible = true;
  }
}

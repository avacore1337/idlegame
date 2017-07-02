import { GameState } from '../GameState';
import { Updateable } from '../Interfaces';

export class Button implements Updateable {

  /** The regular button is found through buttons[Button.REGULAR] */
  public static readonly REGULAR:number = 0;
  /** The toggled button is found through buttons[Button.TOGGLED] */
  public static readonly TOGGLED:number = 1;
  /** The disabled button is found through buttons[Button.DISABLED] */
  public static readonly DISABLED:number = 2;

  private static readonly GROUP:number = 0;
  private static readonly SPRITE:number = 1;
  private static readonly TOOLTIP:number = 2;
  private static readonly TEXT:number = 3;

  /** The main game object of the game */
  public game:Phaser.Game;

  /** An array containing the three states of the button */
  public buttons:Array<Array<any>>;

  /** Whether the button is currently toggled */
  public toggled:boolean;
  /** Whether the button is currently disabled */
  public disabled:boolean;
  /** Whether the button is a toggleAble button */
  public toggleAble:boolean;
  /** Whether the button is a disableAble button */
  public disableAble:boolean;
  /** The group for the graphics of this button */
  public group:Phaser.Group;
  /** The group for the tooltip of this button */
  public labelGroup:Phaser.Group;
  /** The function to be called when the button needs to update */
  public updateCallback: () => void;

  /**
   * A button with up to 3 different states, regular, toggled and disabled.
   * The button is not clickable until the onClick function has been called.
   * @param game {Phaser.Game} - The main game object of the game
   * @param x {number} - The x coordinate of the button
   * @param y {number} - The y coordinate of the button
   * @param key {string} - The key used to register the image of the button in the atlasJSONHash
   * @param text {string} - The text to display on the button
   * @param image {string} - The value used to register the image of the button in the atlasJSONHash
   * @param style {Phaser.PhaserTextStyle} - An object containing the configuration of the style of the text on the button
   * @param options {any} - An object containing data about the optional states toggled and disabled. May contain any of: {
   *                                                                                                  toggleAble:boolean,
   *                                                                                                  disableAble:boolean,
   *                                                                                                  toggledImage:string,
   *                                                                                                  toggledText:string,
   *                                                                                                  toggledStyle:Phaser.PhaserTextStyle,
   *                                                                                                  disabledImage:string,
   *                                                                                                  disabledText:string,
   *                                                                                                  disabledStyle:Phaser.PhaserTextStyle
   *                                                                                                  }
   * But if toggleAble = false the 'toggle' properties are redundant and the same applies for disableAble.
   */
  constructor(game:Phaser.Game, x:number, y:number, key:string, text:string, image:string, style:Phaser.PhaserTextStyle, options?:any) {
    this.game = game;
    this.buttons = [];
    this.toggled = false;
    this.disabled = false;
    this.toggleAble = false;
    this.disableAble = false;
    this.group = game.add.group();
    this.labelGroup = game.add.group();
    this.updateCallback = function(){return;};

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

  /**
   * Register an event that should be triggered if the given version of the button is clicked
   * @param button {number} - The type of the button. Should be either Button.REGULAR, Button.TOGGLED or Button.DISABLED
   * @param callback {() => void} - The function to call if the tile is pressed
   */
  public onClick(button:number, callBack: () => void):boolean {
    if(this.buttons[button] === undefined) {
      return false;
    }

    this.buttons[button][Button.SPRITE].events.onInputUp.add(() => {
      const toggled:boolean = this.toggled; // Since the callBack might change the toggle state
      callBack();
      if(!this.disabled && this.toggleAble) {
        this.toggled = !this.toggled;
        this.draw();
      }
    });
    return true;
  }

  /** Un-toggle the button */
  public unToggle():void {
    if (this.toggleAble && !this.disabled) {
      this.toggled = false;
      this.draw();
    }
  }

  /** Disable the button, this is not the same as hiding it */
  public disable():void {
    if (this.disableAble && !this.disabled) {
      this.disabled = true;
      this.draw();
    }
  }

  /** Enable the button, this is not the same as showing it */
  public enable():void {
    if (this.disableAble && this.disabled) {
      this.disabled = false;
      this.draw();
    }
  }

  /**
   * Register a function to call when the button needs to be updated
   * @param callBack {() => void} - The function to call when the button needs to be updated
   */
  public addUpdate(callBack: () => void):void {
    this.updateCallback = callBack;
  }

  /** Call the function registered through the addUpdate-function */
  public update():void {
    this.updateCallback();
  }

  /** Draw the correct version of the button on the screen */
  public draw():void {
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

  /**
   * Set the text of the given button
   * @param button {number} - The type of the button. Should be either Button.REGULAR, Button.TOGGLED or Button.DISABLED
   * @param content {string} - The text to set on the button
   */
  public setText(button:number, content:string):void {
    const text = this.buttons[button][Button.TEXT];
    text.text = content;
    text.updateText();
  }

  /**
   * Set the text of the given button's tooltip
   * @param button {number} - The type of the button. Should be either Button.REGULAR, Button.TOGGLED or Button.DISABLED
   * @param content {string} - The text to set on the button's tooltip
   */
  public setToolTip(button:number, content:string):void {
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

  /** Hide the button so that it can not be seen */
  public hide():void {
    this.group.visible = false;
  }

  /** Show the button to the user, notice that it won't be clickable before registering a function through the onClick function */
  public show():void {
    this.group.visible = true;
  }
}

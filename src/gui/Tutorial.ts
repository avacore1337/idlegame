import { GameState } from '../GameState';

export class Tutorial {

  private slides:gameModal;
  private current:number = -1;
  private length:number = 0;

  /**
   * Instantiates a tutorial which can then be played at any time by calling the tutorial.run() function
   * @param state {GameState} - The main game object of the game
   */
  constructor(state:GameState) {
    this.slides = state.modal;

    const messages = [
      'This is the first message',
      'This is the second message',
      'This is the third message'
    ];

    for (const msg of messages) {
      this.slides.createModal({
        type: 'tutorial' + this.length++,
        includeBackground: true,
        backgroundOpacity: 0,
        fixedToCamera: true,
        itemsArr: [{
          type: 'sprite',
          content: 'parchment.png',
          atlasParent: 'tutorial',
          offsetX: 250,
          offsetY: 170,
          contentScale: 0.7
        },
        {
          type: 'sprite',
          content: 'next.png',
          atlasParent: 'tutorial',
          offsetX: 500,
          offsetY: 240,
          contentScale: 0.4,
          callback: () => {
            this.next();
          }
        },
        {
          type: 'text',
          content: msg,
          fontSize: 20,
          offsetX: 50,
          offsetY: 130
        }]
      });
    }
  }

  /** Runs the tutorial */
  public run():void {
    for (let i:number = 0; i < this.length; i++) {
      this.slides.hideModal('tutorial' + i);
    }
    this.current = 0;
    this.slides.showModal('tutorial0');
  }

  /** Returns true if the last slide is being displayed */
  private done():boolean {
    return this.current === this.length;
  }

  /** Display the next slide */
  private next():void {
    this.slides.hideModal('tutorial' + this.current++);
    if (!this.done()) {
      this.slides.showModal('tutorial' + this.current);
    }
  }
}

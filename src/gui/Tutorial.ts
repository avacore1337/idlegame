import { MainGame } from '../MainGame';

/** No documentation available */
export class Tutorial {

  private slides:gameModal;
  private current:number = -1;
  private length:number = 0;

  /** No documentation available */
  constructor(game:MainGame) {
    this.slides = game.modal;

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

  /** No documentation available */
  public run():void {
    for (let i:number = 0; i < this.length; i++) {
      this.slides.hideModal('tutorial' + i);
    }
    this.current = 0;
    this.slides.showModal('tutorial0');
  }

  /** No documentation available */
  private done():boolean {
    return this.current === this.length;
  }

  /** No documentation available */
  private next():void {
    this.slides.hideModal('tutorial' + this.current++);
    if (!this.done()) {
      this.slides.showModal('tutorial' + this.current);
    }
  }
}

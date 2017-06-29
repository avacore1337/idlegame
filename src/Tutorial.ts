import { MainGame } from './MainGame';

export class Tutorial {

  private slides:gameModal;
  private current:number = -1;
  private length:number = 0;

  constructor(game:MainGame) {
    const self = this;
    this.slides = game.modal;

    // Lumbermill
    this.slides.createModal({
      type: 'tutorial' + this.length++,
      fixedToCamera: true,
      itemsArr: [{
        type: 'text',
        content: 'Hello World ' + this.length,
        fontSize: 30,
        offsetX: 0,
        offsetY: 50,
        callback: function() {
          console.log('Called');
          if (!self.done()) {
            self.next();
          } else {
            alert('Done');
          }
        }
      }]
    });

    // Buy-button
    this.slides.createModal({
      type: 'tutorial' + this.length++,
      fixedToCamera: true,
      itemsArr: [{
        type: 'text',
        content: 'Hello World ' + this.length,
        fontSize: 42,
        color: '0xFEFF49',
        offsetY: 50,
        callback: function() {
          console.log('Called');
          if (!self.done()) {
            self.next();
          } else {
            alert('Done');
          }
        }
      }]
    });
  }

  public run():void {
    for (let i:number = 0; i < this.length; i++) {
      this.slides.hideModal('tutorial' + i);
    }
    this.current = 0;
    this.slides.showModal('tutorial0');
  }

  public done():boolean {
    console.log('Current = ' + this.current + ' and Length = ' + this.length);
    return this.current === this.length;
  }

  public next():void {
    this.slides.hideModal('tutorial' + this.current);
    this.slides.showModal('tutorial' + ++this.current);
  }
}

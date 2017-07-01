import { MainGame } from './MainGame';
import { Button } from './Button';
import { geneTree } from './GeneTree';

export class ReincarnationMenu {
  private readonly backgroundColor;
  private readonly foregroundColor;
  private readonly backgroundOpacity;
  private readonly modalGroup;
  private readonly foregroundGroup;
  private readonly backgroundGroup;
  private readonly mainGame:MainGame;
  private readonly game:Phaser.Game;
  private readonly offsetHeight:number;
  private readonly offsetWidth:number;

  // private readonly background:Phaser.Graphics;

  constructor(mainGame:MainGame){
    this.mainGame = mainGame;
    this.game = mainGame.game;
    this.modalGroup = this.game.add.group();
    this.foregroundGroup = this.game.add.group();
    this.backgroundGroup = this.game.add.group();
    this.modalGroup.visible = false;
    this.backgroundColor = '0x000000';
    this.foregroundColor = '0x333333';
    this.backgroundOpacity = 0.4;
    this.modalGroup.fixedToCamera = true;
    this.modalGroup.cameraOffset.x = 0;
    this.modalGroup.cameraOffset.y = 0;
    this.offsetHeight = 50;
    this.offsetWidth = 100;
    this.modalGroup.add(this.backgroundGroup);
    this.modalGroup.add(this.foregroundGroup);
    this.generate();
    this.foregroundGroup.x = this.offsetWidth;
    this.foregroundGroup.y = this.offsetHeight;

  }

  public show():void {
    this.game.world.bringToTop(this.modalGroup);
    this.modalGroup.visible = true;
    // you can add animation here
  }

  public hide():void {
    this.modalGroup.visible = false;
  }

  private generate(){
    this.generateBackground();
    this.generateForeground();
    this.generateButtons();
  }

  private generateBackground(){
    const self = this;
    const background = this.game.add.graphics(0, 0, this.backgroundGroup);
    background.beginFill(this.backgroundColor, this.backgroundOpacity);
    background.x = 0;
    background.y = 0;
    background.drawRect(0, 0, this.game.width, this.game.height);
    background.inputEnabled = true;
    background.events.onInputDown.add(function() {
      self.hide();
    });
  }

  private generateForeground(){
    const foreground = this.game.add.graphics(0,0, this.foregroundGroup);
    foreground.beginFill(this.foregroundColor, 1);
    foreground.drawRect(0, 0, this.game.width - this.offsetWidth*2, this.game.height - this.offsetHeight*2);
    foreground.inputEnabled = true;
  }

  private generateButtons(){
    const self = this;
    const headerStyle = { font: '14px Arial', fill: '#000000', align: 'center' };
    const sectionWidth = Math.round((this.game.width - this.offsetWidth*2)/geneTree.length);
    for (let i = 0; i < geneTree.length; i++) {
        const category = geneTree[i];
        const buttonGroup = this.game.add.group();
        this.foregroundGroup.add(buttonGroup);
        const labelGroup = this.game.add.group();
        this.foregroundGroup.add(labelGroup);
        for (let j = 0; j < category.length; j++) {
          const tier = category[j];
          const padding = ((sectionWidth - 111*tier.length)/tier.length)/2;
          for (let k = 0; k < tier.length; k++) {
            const gene = tier[k];
            const button:Button = new Button(this.game, i*sectionWidth + 111*k + padding*(k*2 + 1), 100*j, 'menu', gene.name, 'button.png', headerStyle, {disableAble:true, disabledImage: 'buttondisabled.png'});
            button.setToolTip(Button.REGULAR, gene.description);
            button.onClick(Button.REGULAR, function(){
              gene.buy(self.mainGame);
            });
            button.addUpdate(function(){
              if(gene.buyable()){
                button.enable();
              }
              else{
                button.disable();
              }
            });
            this.mainGame.allButtons.push(button);

            buttonGroup.add(button.group);
            labelGroup.add(button.labelGroup);
          }
        }
    }
  }
}

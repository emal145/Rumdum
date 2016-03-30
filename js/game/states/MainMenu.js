IlioLostInSpace.MainMenu = function() {};







IlioLostInSpace.MainMenu.prototype = {
  backGroundScroller: function(background, speed) {

    background.y += speed * 0.2;

    if (background.y >= this.game.height-(speed * 0.2)) {
      background.y = this.game.height - 9000;

    }

  },
  create: function() {
    this.background = this.game.add.tileSprite(0, this.game.height -9000, this.game.width, 9000, 'background');


    //this.foreground = this.game.add.tileSprite(0, 470, this.game.width, this.game.height - 533, 'foreground');
    //this.foreground.autoScroll(-100,0);
    //
    //this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
    //this.ground.autoScroll(-400, 0);

    this.player = this.add.sprite(this.game.width/2,this.game.height-50  , 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.8);

    //this.player.animations.add('fly', [0,1,2,3,2,1]);
    //this.player.animations.play('fly', 8, true);

    //this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);


    this.startText = this.game.add.bitmapText(0,0, 'minecraftia', 'tap to start', 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 2 + this.splash.height / 2;

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
    //this.backGroundScroller(this.background, 80);

    if (this.game.device.desktop) {
      //  If you have any desktop specific settings, they can go in here
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 200;
      this.scale.minHeight = 400;
      this.scale.maxWidth = 2048;
      this.scale.maxHeight = 1536;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVeritcally = true;
      this.scale.refresh();
    } else {
      //  Same goes for mobile settings.
      //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 568;
      this.scale.minHeight = 600;
      this.scale.maxWidth = 2048;
      this.scale.maxHeight = 1536;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setScreenSize(true);
    }
  }
};


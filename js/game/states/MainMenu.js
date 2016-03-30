IlioLostInSpace.MainMenu = function() {};







IlioLostInSpace.MainMenu.prototype = {




  create: function() {
    this.backgroundMenue = this.game.add.sprite(0,0,'menueBackground');
    this.backgroundMenue.height = this.game.height;
    this.backgroundMenue.width = this.game.width;
    //this.backgroundMenue = this.game.add.tileSprite(0, this.game.height-600, 600, 600, 'backgroundMenue');
    //Hintergrundbild f�r das Men� wird geladen und an die H�he und Breite des Spielfensters angepasst
    this.menueItems = this.game.add.group();

    this.startGameButton = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY-150,'menueStartButton');
    //this.startGameButton.anchor.setTo(0.5);
    this.highscoreButton = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'menueHighscoreButton');
    this.highscoreButton.scale.setTo(0.6);
    this.exitGameButton = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY + 150,'menueExitButton');
    this.exitGameButton.scale.setTo(0.4);


    //this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
    //this.ground.autoScroll(-400, 0);


    this.menueItems.add(this.startGameButton);
    this.menueItems.add(this.highscoreButton);
    this.menueItems.add(this.exitGameButton);

    this.menueItems.forEach(function(item) {
      item.anchor.setTo(0.5);


    }, this);




    this.player = this.add.sprite(this.game.width/2,this.game.height-50  , 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.8);

    //this.player.animations.add('fly', [0,1,2,3,2,1]);
    //this.player.animations.play('fly', 8, true);

    //this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.menuTitle = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 300, 'logo');
    this.menuTitle.anchor.setTo(0.5);
    this.menuTitle.scale.setTo(0.5);


    //this.startText = this.game.add.bitmapText(0,0, 'minecraftia', 'tap to start', 32);
    //this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    //this.startText.y = this.game.height / 2 + this.menuTitle.height / 2;


  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
    //this.backGroundScroller(80);

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
  },

  backGroundScroller: function(speed) {

    this.backgroundMenue.y += speed * 0.2;

    if (this.backgroundMenue.y >= this.game.height-(speed * 0.2)) {
      this.backgroundMenue.y = this.game.height - 9000;

    }

  }
};


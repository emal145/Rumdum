IlioLostInSpace.MainMenu = function() {};







IlioLostInSpace.MainMenu.prototype = {

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'black', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 100) + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "black";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },
  preload: function () {
    this.optionCount = 1;
  },
  create: function() {
    this.backgroundMenue = this.game.add.sprite(0,0,'menueBackground');
    this.backgroundMenue.height = this.game.height;
    this.backgroundMenue.width = this.game.width;
    //Hintergrundbild für das Menü wird geladen und an die Höhe und Breite des Spielfensters angepasst


    //this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
    //this.ground.autoScroll(-400, 0);
    this.addMenuOption('Start Game', function() {

      this.game.state.start('Game');

    });
    this.addMenuOption('Highscore', function() {

      this.game.state.start('Game');

    });
    this.addMenuOption('Exit Game', function() {

      this.game.state.start('Game');

    });

    //this.player = this.add.sprite(this.game.width/2,this.game.height-50  , 'player');
    //this.player.anchor.setTo(0.5);
    //this.player.scale.setTo(0.8);

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
    //if(this.game.input.activePointer.justPressed()) {
    //  this.game.state.start('Game');
    //}
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


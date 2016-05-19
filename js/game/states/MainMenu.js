IlioLostInSpace.MainMenu = function() {


};



IlioLostInSpace.MainMenu.prototype = {


  addMenuOption: function(text, callback) {
    var optionStyle = { font: '25pt TheMinion', fill: 'red', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 60) + 300, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "white";
    txt.strokeThickness = 12;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "red";
      target.stroke = "white";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;

  },

  addTitle: function(text) {
    var optionStyle = { font: '30pt TheMinion', fill: '#ffff00', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX,  200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "grey";
    txt.strokeThickness = 4;


    this.optionCount ++;


  },

  preload: function () {
    this.optionCount = 1;
  },
  create: function() {
    //this.backgroundMenue = this.game.add.sprite(0,0,'menueBackground');
    this.game.stage.backgroundColor = '#00000';

    //this.backgroundMenue.height = this.game.height;
    //this.backgroundMenue.width = this.game.width;
    //Hintergrundbild f�r das Men� wird geladen und an die H�he und Breite des Spielfensters angepasst
    //this.backgroundMenue = this.game.add.tileSprite(0, this.game.height-600, 600, 600, 'backgroundMenue');
    //Hintergrundbild f�r das Men� wird geladen und an die H�he und Breite des Spielfensters angepasst

    this.titleMusic = this.game.add.audio('titleMusic');
    this.titleMusic.play('',0,1,true,true);


    this.addMenuOption('Spiel Starten', function() {

      this.game.state.start('Game');
      this.titleMusic.stop();

    });
    this.addMenuOption('Highscore', function() {

      this.game.state.start('Highscore');


    });
    this.addMenuOption('Spiel Beenden', function() {


        if (confirm("Wirklich Beenden?")) {
          window.close();
        }


    });


    //this.player = this.add.sprite(this.game.width/2,this.game.height-50  , 'player');
    //this.player.anchor.setTo(0.5);
    //this.player.scale.setTo(0.8);

    //this.player.animations.add('fly', [0,1,2,3,2,1]);
    //this.player.animations.play('fly', 8, true);

    //this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.menuTitle = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 200, 'logo');
    this.menuTitle.anchor.setTo(0.5);
    this.menuTitle.scale.setTo(1);
    this.addTitle("Illios Lost in Space");




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


};


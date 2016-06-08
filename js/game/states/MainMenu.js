IlioLostInSpace.MainMenu = function() {




};



IlioLostInSpace.MainMenu.prototype = {




  addMenuOption: function(margin,text, callback) {
    var optionStyle = { font: '25pt TheMinion', fill: '#ffff00', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 60) + margin, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "red";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";

    };
    var onOut = function (target) {
      target.fill = "#ffff00";
      target.stroke = "red";
      txt.useHandCursor = false;
    };

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
    txt.stroke = "red";
    txt.strokeThickness = 4;


    this.optionCount ++;


  },
  addHowToPlay: function(text, callback) {
    var optionStyle = { font: '25pt TheMinion', fill: '#ffff00', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX + 302 ,game.world.centerY + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "red";
    txt.align = "left"
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";

    };
    var onOut = function (target) {
      target.fill = "#ffff00";
      target.stroke = "red";
      txt.useHandCursor = false;
    };

    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);



  },

  preload: function () {
    this.optionCount = 1;
  },
  create: function() {
    this.backgroundMenue = this.game.add.sprite(0,0,'menueBackground');


    this.backgroundMenue.height = this.game.height;
    this.backgroundMenue.width = this.game.width;
    //Hintergrundbild f�r das Men� wird geladen und an die H�he und Breite des Spielfensters angepasst
    //this.backgroundMenue = this.game.add.tileSprite(0, this.game.height-600, 600, 600, 'backgroundMenue');
    //Hintergrundbild f�r das Men� wird geladen und an die H�he und Breite des Spielfensters angepasst

    if (!this.game.global.mainMenuSoundIsPlaying ) {
      this.titleMusic = this.game.add.audio('titleMusic');
      this.titleMusic.play('', 0, 1, true, true);
      this.game.global.mainMenuSoundIsPlaying = true;
    }


    this.addMenuOption(300,'Spiel Starten', function() {

      this.game.state.start('Game');
      this.titleMusic.stop();

    });
    this.addMenuOption(300,'Highscore', function() {

      this.game.state.start('Highscore');


    });
    this.addMenuOption(300,'Spiel Beenden', function() {


        if (confirm("Wirklich Beenden?")) {
          window.close();
        }


    });





    this.menuTitle = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 190, 'logo');
    this.menuTitle.anchor.setTo(0.5);
    this.menuTitle.scale.setTo(1);
    this.addTitle("Ilios Lost in Space");

    this.howToPlay = this.add.sprite(this.game.world.centerX + 300, this.game.world.centerY + 200 , 'howToPlaySymbol');
    this.howToPlay.anchor.setTo(0.5);
    this.howToPlay.scale.setTo(0.8);
    this.addHowToPlay('?', function() {

      this.game.state.start('HowToPlay');


    });




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


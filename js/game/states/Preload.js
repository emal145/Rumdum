IlioLostInSpace.Preload = function() {
  this.ready = false;
};

IlioLostInSpace.Preload.prototype = {

    loadScripts: function () {
        game.load.script('WebFont', 'js/scripts/webfontloader.js');
    },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/styles/theminion.css']
      }
    }
  },
  loadImages: function () {
    this.load.image('menueBackground', 'assets/images/background/backgroundMenueStars.png');
    this.load.image('highscoreBackground', 'assets/images/background/highscoreBackground.png');

      //Landschaft
      this.load.image('backgroundTile', 'assets/images/background2.png');
      this.load.image('ground', 'assets/images/ground.png');
      this.load.image('spacedBlack', 'assets/images/spacedBackground.png');
      this.load.image('cloud', 'assets/images/Cloud.png');
      this.load.image('star', 'assets/images/Star.png');

  },
  loadAudio: function() {

      this.load.audio('gameMusic', ['assets/audio/Spielsound_Vorschlag2.mp3']);
      this.load.audio('titleMusic', 'assets/audio/menuMusic.wav');
      this.load.audio('rocket', 'assets/audio/rocket.wav');
      this.load.audio('bounce', 'assets/audio/bounce.wav');
      this.load.audio('coin', 'assets/audio/coin.wav');
      this.load.audio('death', 'assets/audio/death.wav');
      this.load.audio('planeSound', 'assets/audio/Airplane.mp3');
      this.load.audio('balloonPop', 'assets/audio/balloonPop.mp3');
      this.load.audio('crow', 'assets/audio/Crow.mp3');

  },
  loadSprites: function() {
      this.load.spritesheet('coins', 'assets/images/coins-ps.png', 51, 51, 7);
      this.load.spritesheet('balloons', 'assets/images/balloons.png', 150, 225, 12);
      this.load.spritesheet('player', 'assets/images/player.png', 100, 100, 16);
      this.load.spritesheet('missile', 'assets/images/missiles-ps.png', 361, 218, 4);
      this.load.spritesheet('resizeBalloon', 'assets/images/SingleCollectBalloons_old.png', 150, 150, 4);
      this.load.spritesheet('resizeBalloonEnd', 'assets/images/SingleCollectBalloonsEnd.png', 75, 75, 4);
      this.load.spritesheet('bird', 'assets/images/Bird.png', 50, 41, 15);
      this.load.spritesheet('plane', 'assets/images/plane.png', 63.75, 52, 16);
      this.load.spritesheet('meteor', 'assets/images/Meteor.png', 50, 53, 15);
  },

  preload: function() {

    this.loadingText = game.make.text(game.world.centerX,game.world.centerY, "Loading...", {
      font: 'bold 20pt TheMinion',
      fill: '#000000',
      align: 'center'
    });
    this.loadingText.anchor.set(0.5);


    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    //this.preloadBar.scale.setTo(0.9);

    this.load.setPreloadSprite(this.preloadBar,0);

    this.loadImages();
    this.loadSprites();
    this.loadAudio();
    this.loadFonts();
    this.loadScripts();

    this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');


    this.load.onLoadComplete.add(this.onLoadComplete, this);
  },
  create: function() {
    this.preloadBar.cropEnabled = false;
    this.game.add.existing(this.loadingText);
  },
  update: function() {
   // if(this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
      this.state.start('MainMenu');
   // }

  },
  onLoadComplete: function() {
    this.ready = true;
  }
};
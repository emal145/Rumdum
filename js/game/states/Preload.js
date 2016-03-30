IlioLostInSpace.Preload = function() {
  this.ready = false;
};

IlioLostInSpace.Preload.prototype = {
  preload: function() {

    //this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 300, 'logo');
    //this.splash.anchor.setTo(0.5);
    //this.splash.scale.setTo(0.5);
    this.titleText = game.make.text(game.world.centerX,game.world.centerY, "Loading...", {
      font: 'bold 20pt Arial',
      fill: '#000000',
      align: 'center'
    });
    //this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);


    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    //this.preloadBar.scale.setTo(0.9);

    this.load.setPreloadSprite(this.preloadBar,0);

    this.load.image('background', 'assets/images/background.png');

    this.load.spritesheet('coins', 'assets/images/coins-ps.png', 51, 51, 7);
    this.load.spritesheet('player', 'assets/images/player.png', 100, 100, 16);
    this.load.spritesheet('missile', 'assets/images/missiles-ps.png', 361, 218, 4);

    this.load.audio('gameMusic', ['assets/audio/Pamgaea.mp3', 'assets/audio/Pamgaea.ogg']);
    this.load.audio('rocket', 'assets/audio/rocket.wav');
    this.load.audio('bounce', 'assets/audio/bounce.wav');
    this.load.audio('coin', 'assets/audio/coin.wav');
    this.load.audio('death', 'assets/audio/death.wav');

    this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

    this.load.onLoadComplete.add(this.onLoadComplete, this);
  },
  create: function() {
    this.preloadBar.cropEnabled = false;
    this.game.add.existing(this.titleText);
  }, 
  update: function() {
    if(this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
      this.state.start('MainMenu');
    }

  },
  onLoadComplete: function() {
    this.ready = true;
  }
};
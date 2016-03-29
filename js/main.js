var game = new Phaser.Game(600, 600, Phaser.AUTO, '');

game.state.add('Boot', IlioLostInSpace.Boot);
game.state.add('Preloader', IlioLostInSpace.Preload);
game.state.add('MainMenu', IlioLostInSpace.MainMenu);
game.state.add('Game', IlioLostInSpace.Game);

game.state.start('Boot');
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');



game.state.add('Boot', IlioLostInSpace.Boot);
game.state.add('Preloader', IlioLostInSpace.Preload);
game.state.add('MainMenu', IlioLostInSpace.MainMenu);
game.state.add('Game', IlioLostInSpace.Game);
game.state.add('Highscore', IlioLostInSpace.Highscore);

game.state.start('Boot');
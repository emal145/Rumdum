var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', Rundum.Boot);
game.state.add('Preloader', Rundum.Preload);
game.state.add('MainMenu', Rundum.MainMenu);
game.state.add('Game', Rundum.Game);

game.state.start('Boot');
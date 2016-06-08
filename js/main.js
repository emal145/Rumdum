var game = new Phaser.Game(800, 600, Phaser.AUTO, '');


game.global = {

     mainMenuSoundIsPlaying: false,



}
game.state.add('Boot', IlioLostInSpace.Boot);
game.state.add('Preloader', IlioLostInSpace.Preload);
game.state.add('MainMenu', IlioLostInSpace.MainMenu);
game.state.add('Highscore', IlioLostInSpace.Highscore);
game.state.add('HowToPlay', IlioLostInSpace.HowToPlay);
game.state.add('Game', IlioLostInSpace.Game);

game.state.start('Boot');
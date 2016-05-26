


IlioLostInSpace.Highscore = function() {






};



IlioLostInSpace.Highscore.prototype = {



    preload: function () {
        this.optionCount = 1;
    },

    create: function() {


        this.backgroundMenue = this.game.add.sprite(0,0,'highscoreBackground');
        this.backgroundMenue.height = this.game.height;
        this.backgroundMenue.width = this.game.width;


        var  scoreText, highScoreText, newHighScoreText, starText;
        var highscoreArray = [];
        highscoreArray = JSON.parse(localStorage.getItem('highscoreArray'));

        if (highscoreArray != null) {

        for (var i = 0; i < highscoreArray.length; i++) {

            if (highscoreArray[i] != null) {

            scoreText = this.game.add.bitmapText (0, 40 + (40*i), 'minecraftia', '' + (i+1) + '. Platz : ' + highscoreArray[i], 30);
            scoreText.x = this.game.width / 3;

            }
        }

        }

        IlioLostInSpace.MainMenu.prototype.addMenuOption.call(this,500,'Back to Menu', function() {

            this.game.state.start('MainMenu');

        });







    }



}

//IlioLostInSpace.Highscore.prototype = IlioLostInSpace.MainMenu.prototype;






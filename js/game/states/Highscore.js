


IlioLostInSpace.Highscore = function() {






};

IlioLostInSpace.Highscore.prototype = {

    addMenuOption: function(text, callback) {
        var optionStyle = { font: '30pt TheMinion', fill: 'red', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        var txt = game.add.text(game.world.centerX, (this.optionCount * 100) + 400, text, optionStyle);
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

        this.addMenuOption('Back to Menu', function() {

            this.game.state.start('MainMenu');

        });







    }



}

//IlioLostInSpace.Highscore.prototype = IlioLostInSpace.MainMenu.prototype;






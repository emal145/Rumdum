IlioLostInSpace.HowToPlay = function() {

};
IlioLostInSpace.HowToPlay.prototype = {

    preload: function () {
        this.optionCount = 1;
    },

    create: function() {

        this.backgroundMenue = this.game.add.sprite(0,0,'howToPlayImage');
        this.backgroundMenue.height = this.game.height;
        this.backgroundMenue.width = this.game.width;




        IlioLostInSpace.MainMenu.prototype.addMenuOption.call(this,500,'Zurueck', function() {

            this.game.state.start('MainMenu');

        });

    }



}
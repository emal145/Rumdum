/**
 * Created by ML on 04.04.16.
 */
var color = 'red';

var Balloon = function(game, x, y, color, key, frame) {
    key = 'balloons';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.color = color;
    //this.scale.setTo(1);
    this.anchor.setTo(0.5);
    this.game.physics.arcade.enableBody(this);

    this.animations.add('spinRed', [0,1,2,1]);
    this.animations.add('spinBlue', [3,4,5,4]);
    this.animations.add('spinRainbow', [14,15,16,15]);
    this.animations.add('spinGreen', [17,18,19,18]);
    this.animations.add('burstRed', [6,7,8,9]);
    this.animations.add('burstBlue', [10,11,12,13]);
    this.animations.add('burstRainbow', [20,21,22,23]);
    this.animations.add('burstGreen', [24,25,26,27]);



    switch (this.color){
        case 'red':
            this.animations.play('spinRed', 10, true);
            break;
        case 'blue':
            this.animations.play('spinBlue', 10, true);
            break;
        case 'rainbow':
            this.animations.play('spinRainbow', 10, true);
            break;
        case 'green':
            this.animations.play('spinGreen', 10, true);
            break;

        default :
            this.animations.play('spinRed', 10, true);
            break;
    }



    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onKilled.add(this.onKilled, this);
    this.events.onRevived.add(this.onRevived, this);

};

Balloon.prototype = Object.create(Phaser.Sprite.prototype);
Balloon.prototype.constructor = Balloon;

Balloon.prototype.onRevived = function() {
    //this.body.velocity.x = -400;
    this.body.velocity.y = 60;
    switch (this.color){
        case 'red':
            this.animations.play('spinRed', 10, true);
            break;
        case 'blue':
            this.animations.play('spinBlue', 10, true);
            break;
        case 'rainbow':
            this.animations.play('spinRainbow', 10, true);
            break;
        case 'green':
            this.animations.play('spinGreen', 10, true);
            break;

        default :
            this.animations.play('spinRed', 10, true);
            break;
    }
};

Balloon.prototype.onKilled = function() {
    this.animations.frame = 0;
};


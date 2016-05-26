/**
 * Created by ML on 19.05.16.
 */
var Stars = function(game, x, y, key, frame) {
    key = 'star';
    Phaser.Sprite.call(this, game, x, y, key, frame);
    //this.scale.setTo(0.1);
    this.anchor.setTo(0.5);
    this.flip = false;

    this.animations.add('flyStar', [0]);

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);

};

Stars.prototype = Object.create(Phaser.Sprite.prototype);
Stars.prototype.constructor = Stars;

Stars.prototype.onRevived = function() {

    //this.game.add.tween(this).to({y: this.y + 25}, game.height, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
    if(this.flip == true){
        //this.body.velocity.x = -30;
        this.scale.setTo(-1,1);

    }else{
        //this.body.velocity.x = 30;
        this.scale.setTo(1,1);
    }
    this.body.velocity.y = 50;
    this.animations.play('flyStar', 10, true);
};




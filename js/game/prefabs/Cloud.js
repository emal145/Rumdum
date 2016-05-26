/**
 * Created by ML on 19.05.16.
 */
var Cloud = function(game, x, y, key, frame) {
    key = 'cloud';
    Phaser.Sprite.call(this, game, x, y, key, frame);
    //this.scale.setTo(0.1);
    this.anchor.setTo(0.5);
    this.flip = false;

    this.animations.add('flyCloud', [0]);

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);

};

Cloud.prototype = Object.create(Phaser.Sprite.prototype);
Cloud.prototype.constructor = Cloud;

Cloud.prototype.onRevived = function() {

    //this.game.add.tween(this).to({y: this.y + 25}, game.height, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
    if(this.flip == true){
        this.body.velocity.x = -30;
        this.scale.setTo(-1,1);

    }else{
        this.body.velocity.x = 30;
        this.scale.setTo(1,1);
    }
    this.animations.play('flyCloud', 10, true);
};




/**
 * Created by ML on 15.05.16.
 */
var EnemyPlane = function(game, x, y, key, frame) {
    key = 'plane';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    //this.scale.setTo(0.1);
    //this.anchor.setTo(0.5);

    this.animations.add('planeFly', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]);

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);

};

EnemyPlane.prototype = Object.create(Phaser.Sprite.prototype);
EnemyPlane.prototype.constructor = EnemyPlane;

EnemyPlane.prototype.onRevived = function() {

    //this.game.add.tween(this).to({y: this.y + 25}, game.height, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.body.velocity.x = 70;
    this.body.velocity.y = 100;
    this.animations.play('planeFly', 10, true);
};




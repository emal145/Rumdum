/**
 * Created by ML on 15.05.16.
 */
var EnemyMeteor = function(game, x, y, key, frame) {
    key = 'meteor';
    this.enemyType = "Meteor";
    Phaser.Sprite.call(this, game, x, y, key, frame);

    //this.scale.setTo(0.1);
    this.anchor.setTo(0.5);
    this.flip = false;
    this.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]);

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = true;
    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);

};

EnemyMeteor.prototype = Object.create(Phaser.Sprite.prototype);
EnemyMeteor.prototype.constructor = EnemyMeteor;

EnemyMeteor.prototype.onRevived = function() {

    //this.game.add.tween(this).to({y: this.y + 25}, game.height, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    if(this.flip == true){
        this.body.velocity.x = 300;
        this.scale.setTo(-1,1);

    }else{
        this.body.velocity.x = -300;
        this.scale.setTo(1,1);
    }
    this.body.velocity.y = 500;
    this.animations.play('fly', 10, true);
};




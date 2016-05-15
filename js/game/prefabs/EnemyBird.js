var EnemyBird = function(game, x, y, key, frame) {
  key = 'bird';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  //this.scale.setTo(0.1);
  //this.anchor.setTo(0.5);

  this.animations.add('fly', [0,1,2,3,4,5,6,7]);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  this.checkWorldBounds = true;
  this.onOutOfBoundsKill = true;

  this.events.onRevived.add(this.onRevived, this);

};

EnemyBird.prototype = Object.create(Phaser.Sprite.prototype);
EnemyBird.prototype.constructor = EnemyBird;

EnemyBird.prototype.onRevived = function() {
  
  //this.game.add.tween(this).to({y: this.y + 25}, game.height, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

  this.body.velocity.x = 100;
 this.body.velocity.y = 100;
  this.animations.play('fly', 10, true);
};




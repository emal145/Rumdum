var Coin = function(game, x, y, key, frame) {
  key = 'coins';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.setTo(0.5);
  this.anchor.setTo(0.5);

  this.animations.add('spin');

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;

  this.checkWorldBounds = true;
  this.onOutOfBoundsKill = true;

  this.events.onKilled.add(this.onKilled, this);
  this.events.onRevived.add(this.onRevived, this);

  this.specialX = 0;
  this.specialY = 0;
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.onRevived = function() {
  //this.body.velocity.x = -400;
  this.body.velocity.y = 0;
  this.animations.play('spin', 10, true);
};

Coin.prototype.onKilled = function() {
  this.animations.frame = 0;
};



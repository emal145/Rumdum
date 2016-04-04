IlioLostInSpace.Game = function() {
  this.playerMinAngle = -20;
  this.playerMaxAngle = 20;

    this.coinRate = 1000;
    this.coinTimer = 0;

    this.balloonRate = 600;
    this.balloonTimer = 0;

    this.enemyRate = 500;
  this.enemyTimer = 0;

  this.score = 0;
  this.previousCoinType = null;

  this.coinSpawnY = null;
  this.coinSpacingX = 10;
  this.coinSpacingY = 10;
  this.startBgVisible = true;
  this.backgroundMax = 2;
    this.backgroundCounter = 0;
    this.levelstage = 1;
    this.changeBackground = false;
};

IlioLostInSpace.Game.prototype = {
  create: function() {

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    this.game.world.bound = new Phaser.Rectangle(0,0, this.game.width + 300, this.game.height);
      this.backgroundTile = this.game.add.tileSprite(0,this.game.height - 7200,this.game.width,7200,'backgroundTile');
    //this.backgroundTile.tileScale.y = ((this.game.height * 12)-7200);



    this.player = this.add.sprite(200, this.game.height/2, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.5);

    this.player.animations.add('fly', [4]);
    this.player.animations.play('fly', 8, true);

      this.player.animations.add('flyLeft', [2]);

      this.player.animations.add('flyRight', [1]);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = -9.81;



    //this.game.physics.arcade.enableBody(this.ground);
    //this.ground.body.allowGravity = false;
    //this.ground.body.immovable = true;

    this.game.physics.arcade.enableBody(this.player);
    this.player.body.collideWorldBounds = true;
    //this.player.body.velocity.y = -10;
    //this.player.body.bounce.set(0.25);

      this.coins = this.game.add.group();
      this.balloons = this.game.add.group();
      this.enemies = this.game.add.group();

    this.scoreText = this.game.add.bitmapText(10,10, 'minecraftia', 'Score: 0', 24);

    this.jetSound = this.game.add.audio('rocket');
    this.coinSound = this.game.add.audio('coin');
    this.deathSound = this.game.add.audio('death');
    this.gameMusic = this.game.add.audio('gameMusic');
    this.gameMusic.play('', 0, true);

    this.coinSpawnY = this.game.height - 100;
},
  update: function() {
      this.scrollBackground();
      this.movePlayer();


    //if(this.upKey.isDown) {
    //  this.player.body.velocity.y -= 25;
    //  if(!this.jetSound.isPlaying) {
    //    this.jetSound.play('', 0, true, 0.5);
    //  }
    //} else {
    //  this.jetSound.stop();
    //}

    //if( this.player.body.velocity.y < 0 || this.upKey.isDown) {
    //  if(this.player.angle > 0) {
    //    this.player.angle = 0;
    //  }
    //  if(this.player.angle > this.playerMinAngle) {
    //    this.player.angle -= 0.5;
    //  }
    //} else if(this.player.body.velocity.y >=0 && !this.game.input.activePointer.idDown) {
    //  if(this.player.angle < this.playerMaxAngle) {
    //    this.player.angle += 0.5;
    //  }
    //}

      if(this.coinTimer < this.game.time.now) {
          this.generateCoins();
          this.generateCoins();
          this.coinTimer = this.game.time.now + this.coinRate;
      }

      if(this.balloonTimer < this.game.time.now) {
          this.generateBalloon();
          this.generateBalloon();
          this.balloonTimer = this.game.time.now + this.balloonRate;
      }


      /*if(this.enemyTimer < this.game.time.now) {
        this.createEnemy();
        this.enemyTimer = this.game.time.now + this.enemyRate;
      }*/


   // this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this);
      this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
      this.game.physics.arcade.overlap(this.player, this.balloons, this.balloonHit, null, this);
      this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);

  },
  shutdown: function() {
    this.coins.destroy();
    this.enemies.destroy();
    this.score = 0;
    this.coinTimer = 0;
    this.enemyTimer = 0;
  },
    createBalloon: function(color) {
        var x = this.game.rnd.integerInRange(this.game.world.height - 50, 50);
        var y = 0;

        var balloon = this.coins.getFirstExists(false);
        if(!balloon) {
            balloon = new Balloon(this.game, 0, 0, color);
            this.balloons.add(balloon);
        }

        balloon.reset(x, y);
        balloon.revive();
        return balloon;
    },

    generateBalloon: function() {
        if(!this.previousBalloonType || this.previousBalloonType < 3) {
            var balloonType = this.game.rnd.integer() % 6;
            switch(balloonType) {
                case 0:
                    //do nothing. No coins generated
                    break;
                case 1:
                case 2:
                    // if the cointype is 1 or 2, create a single coin
                    //this.createCoin();
                    this.createBalloon('red');

                    break;
                case 3:
                    // create a small group of coins
                    this.createBalloon('blue')
                    break;
                case 4:
                    //create a large coin group
                    this.createBalloon('green');
                    break;
                case 5:
                    //create a large coin group
                    this.createBalloon('yellow');
                    break;

                default:
                    // if somehow we error on the cointype, set the previouscointype to zero and do nothing
                    this.previousBalloonType = 0;
                    break;
            }

            this.previousBalloonType = balloonType;
        } else {
            if(this.previousBalloonType === 4) {
                // the previous coin generated was a large group,
                // skip the next generation as well
                this.previousBalloonType = 3;
            } else {
                this.previousBalloonType = 0;
            }

        }
    },

  createCoin: function() {
    var x = this.game.rnd.integerInRange(this.game.world.height - 50, 50);
    var y = 0;

      var coin = this.coins.getFirstExists(false);
    if(!coin) {
      coin = new Coin(this.game, 0, 0);
      this.coins.add(coin);
    }

    coin.reset(x, y);
    coin.revive();
    return coin;
  },
  generateCoins: function() {
    if(!this.previousCoinType || this.previousCoinType < 3) {
      var coinType = this.game.rnd.integer() % 5;
      switch(coinType) {
        case 0:
          //do nothing. No coins generated
          break;
        case 1:
        case 2:
          // if the cointype is 1 or 2, create a single coin
          //this.createCoin();
          this.createCoin();

          break;
        case 3:
          // create a small group of coins
          this.createCoinGroup(2, 2);
          break;
        case 4:
          //create a large coin group
          this.createCoinGroup(6, 2);
          break;
        default:
          // if somehow we error on the cointype, set the previouscointype to zero and do nothing
          this.previousCoinType = 0;
          break;
      }

      this.previousCoinType = coinType;
    } else {
      if(this.previousCoinType === 4) {
        // the previous coin generated was a large group, 
        // skip the next generation as well
        this.previousCoinType = 3;
      } else {
        this.previousCoinType = 0;  
      }
      
    }
  },
  createCoinGroup: function(columns, rows) {
    //create 4 coins in a group
    var coinSpawnX = this.game.rnd.integerInRange(50, this.game.world.width - 50);
    var coinRowCounter = 0;
    var coinColumnCounter = 0;
    var coin;
    for(var i = 0; i < columns * rows; i++) {
      coin = this.createCoin(0, this.coinSpawnY);
      coin.y = coin.y - (coinColumnCounter * coin.height) - (coinColumnCounter * this.coinSpacingY);
      coin.x = coinSpawnX + (coinRowCounter * coin.width) + (coinRowCounter * this.coinSpacingX);
      coinColumnCounter++;
      if(i+1 >= columns && (i+1) % columns === 0) {
        coinRowCounter++;
        coinColumnCounter = 0;
      } 
    }
  },


  createEnemy: function() {
    var x = this.game.width;
    var y = this.game.rnd.integerInRange(50, this.game.world.height - 192);

    var enemy = this.enemies.getFirstExists(false);
    if(!enemy) {
      enemy = new Enemy(this.game, 0, 0);
      this.enemies.add(enemy);
    }
    enemy.reset(x, y);
    enemy.revive();
  },

    /*groundHit: function(player, ground) {
    player.body.velocity.y = -200;
  },*/

    balloonHit: function(player, balloon) {
        this.score++;
        this.coinSound.play();
        balloon.kill();

        var dummyBalloon = new Balloon(this.game, balloon.x, balloon.y, balloon.color);
        this.game.add.existing(dummyBalloon);

        //dummyBalloon.animations.play('spin2', 3, true);

        var scoreTween = this.game.add.tween(dummyBalloon).to({x: balloon.x, y: balloon.y+50}, 300, Phaser.Easing.Linear.NONE, true);

      scoreTween.onComplete.add(function() {
            dummyBalloon.destroy();
            this.scoreText.text = 'Score: ' + this.score;
        }, this);

    },
    coinHit: function(player, coin) {
        this.score++;
        this.coinSound.play();
        coin.kill();

        var dummyCoin = new Coin(this.game, coin.x, coin.y);
        this.game.add.existing(dummyCoin);

        dummyCoin.animations.play ('spin', 40, true);

        var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

        scoreTween.onComplete.add(function() {
            dummyCoin.destroy();
            this.scoreText.text = 'Score: ' + this.score;
        }, this);

    },
  enemyHit: function(player, enemy) {
    player.kill();
    enemy.kill();

    this.deathSound.play();
    this.gameMusic.stop();
    
    //this.ground.stopScroll();
    this.backgroundMenue.stopScroll();
    //this.foreground.stopScroll();

    this.enemies.setAll('body.velocity.x', 0);
    this.coins.setAll('body.velocity.x', 0);

    this.enemyTimer = Number.MAX_VALUE;
    this.coinTimer = Number.MAX_VALUE;

    var scoreboard = new Scoreboard(this.game);
    scoreboard.show(this.score);
  },

  scrollBackground: function() {
      //var distance = speed * 0.2;

      console.log("height: " + this.game.height);

      this.backgroundTile.tilePosition.y += 4;
      if (this.backgroundTile.tilePosition.y >= 1800 - 4) {
          this.backgroundTile.tilePosition.y = 600;
      }

  },
  movePlayer: function() {

    if(this.rightKey.isDown) {
      this.player.body.velocity.x += 5;
    }else if(this.leftKey.isDown) {
      this.player.body.velocity.x -=5;
    }else if (this.downKey.isDown) {
      this.player.body.velocity.y ++;

    }

  }

};
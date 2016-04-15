IlioLostInSpace.Game = function () {
    this.playerMinAngle = -20;
    this.playerMaxAngle = 20;

    this.coinRate = 900;
    this.coinTimer = 0;

    this.balloonRate = 900;
    this.balloonTimer = 0;

    this.enemyRate = 500;
    this.enemyTimer = 0;

    this.score = 0;
    this.previousCoinType = null;

    this.coinSpawnY = null;
    this.coinSpacingX = 10;
    this.coinSpacingY = 10;
    this.backgroundMax = 5;
    this.backgroundCounter = 0;
    this.levelstage = 1;
    this.gameSpeed = 2;
    this.playerColor = 'red';
    this.balloonSize = 5;
    this.speedFactor = 0.8;
    this.filter;
    this.spacedSprite;
    this.spacedUpCount = 0;
    this.spacedUp = false;
};

IlioLostInSpace.Game.prototype = {
    create: function () {
        this.game.world.bound = new Phaser.Rectangle(0, 0, this.game.width + 300, this.game.height);
        this.initializeKeys();

        this.addSprites();
        this.createFilter();
        this.spacedSprite.visible = false;

        this.createPlayer();
        this.resizeBalloon.scale.set(0.5, 0.5);
        this.resizeBalloon.animations.add('red', [0]);
        this.resizeBalloon.animations.add('blue', [1]);
        this.resizeBalloon.animations.add('yellow', [2]);
        this.resizeBalloon.animations.add('green', [3]);
        this.resizeBalloon.animations.play('red', 8, true);

        this.resizeBalloonEnd.scale.set(0.7, 0.7);
        this.resizeBalloonEnd.animations.add('red', [0]);
        this.resizeBalloonEnd.animations.play('red', 8, true);

        this.game.physics.arcade.enableBody(this.resizeBalloon);
        this.game.physics.arcade.enableBody(this.resizeBalloonEnd);


        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y = 9.81;

        this.game.physics.arcade.enableBody(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;
        //this.player.body.velocity.y = -10;
        //this.player.body.bounce.set(0.25);

        this.coins = this.game.add.group();
        this.balloons = this.game.add.group();
        this.enemies = this.game.add.group();

        this.scoreText = this.game.add.bitmapText(10, 10, 'minecraftia', 'Score: 0', 24);

        this.jetSound = this.game.add.audio('rocket');
        this.coinSound = this.game.add.audio('coin');
        this.deathSound = this.game.add.audio('death');
        this.gameMusic = this.game.add.audio('gameMusic');
        this.gameMusic.play('', 0, true);

        this.coinSpawnY = this.game.height - 100;
    },
    update: function () {
        this.scrollBackground();
        this.scrollCoins();
        this.scrollBalloons();
        this.movePlayer();
        this.changePlayerColor();

        if (this.coinTimer < this.game.time.now) {
            this.generateCoins();
            this.coinTimer = this.game.time.now + this.coinRate;
        }

        if (this.balloonTimer < this.game.time.now) {
            this.generateBalloon();
            this.balloonTimer = this.game.time.now + this.balloonRate;
        }


        /*if(this.enemyTimer < this.game.time.now) {
         this.createEnemy();
         this.enemyTimer = this.game.time.now + this.enemyRate;
         }*/

        this.game.physics.arcade.overlap(this.coins, this.ground, this.groundHit, null, this);
        //this.game.physics.arcade.overlap(this.balloons, this.ground, this.balloonsGroundHit, null, this);
        this.game.physics.arcade.overlap(this.resizeBalloon, this.coins, this.coinHit, null, this);
        this.game.physics.arcade.overlap(this.resizeBalloon, this.balloons, this.balloonHit, null, this);
        this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
        this.game.physics.arcade.overlap(this.player, this.balloons, this.balloonHit, null, this);


        this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);


        if (this.spacedUp == true) {
            this.filter.update();
        }

    },
    shutdown: function () {
        this.coins.destroy();
        this.enemies.destroy();
        this.score = 0;
        this.coinTimer = 0;
        this.enemyTimer = 0;
    },

    initializeKeys: function(){
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);

    },

    addSprites: function(){
        this.backgroundTile = this.game.add.tileSprite(0, this.game.height - 7200, this.game.width, 7200, 'backgroundTile');
        this.ground = this.game.add.tileSprite(0, this.game.height,this.game.width, this.game.height, 'ground');
        this.player = this.add.sprite(200, this.game.height / 2, 'player');
        this.resizeBalloon = this.game.add.sprite(174, this.game.height/2-125, 'resizeBalloon');
        this.resizeBalloonEnd = this.game.add.sprite(185, this.game.height/2-50, 'resizeBalloonEnd');

    },

    createPlayer: function(){
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(0.5);

        this.player.animations.add('flyRed', [3]);
        this.player.animations.add('flyRedLeft', [2]);
        this.player.animations.add('flyRedRight', [1]);

        this.player.animations.add('flyBlue', [7]);
        this.player.animations.add('flyBlueLeft', [6]);
        this.player.animations.add('flyBlueRight', [5]);

        this.player.animations.add('flyGreen', [11]);
        this.player.animations.add('flyGreenLeft', [10]);
        this.player.animations.add('flyGreenRight', [9]);

        this.player.animations.add('flyYellow', [15]);
        this.player.animations.add('flyYellowLeft', [14]);
        this.player.animations.add('flyYellowRight', [13]);

        this.player.animations.play('flyRed', 8, true);

    },

    createBalloon: function (color) {
        var x = this.game.rnd.integerInRange(this.game.world.height - 50, 50);
        var y = 0;

        var balloon = this.coins.getFirstExists(false);
        if (!balloon) {
            balloon = new Balloon(this.game, 0, 0, color);
            this.balloons.add(balloon);
        }

        balloon.reset(x, y);
        balloon.revive();
        return balloon;
    },

    generateBalloon: function () {

            var balloonType = this.game.rnd.integer() % 4;
            switch (balloonType) {
                case 0:
                    this.createBalloon('red');
                    break;
                case 1:
                    // create a small group of coins
                    this.createBalloon('blue')
                    break;
                case 2:
                    //create a large coin group
                    this.createBalloon('green');
                    break;
                case 3:
                    //create a large coin group
                    this.createBalloon('yellow');
                    break;

                default:
                    // if somehow we error on the cointype, set the previouscointype to zero and do nothing
                    break;
            }
    },

    createCoin: function () {
        var x = this.game.rnd.integerInRange(this.game.world.height - 50, 50);
        var y = 0;

        var coin = this.coins.getFirstExists(false);
        if (!coin) {
            coin = new Coin(this.game, 0, 0);
            this.coins.add(coin);
        }

        coin.reset(x, y);
        coin.revive();
        return coin;
    },
    generateCoins: function () {
        if (!this.previousCoinType || this.previousCoinType < 3) {
            var coinType = this.game.rnd.integer() % 5;
            switch (coinType) {
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
            if (this.previousCoinType === 4) {
                // the previous coin generated was a large group,
                // skip the next generation as well
                this.previousCoinType = 3;
            } else {
                this.previousCoinType = 0;
            }

        }
    },
    createCoinGroup: function (columns, rows) {
        //create 4 coins in a group
        var coinSpawnX = this.game.rnd.integerInRange(50, this.game.world.width - 50);
        var coinRowCounter = 0;
        var coinColumnCounter = 0;
        var coin;
        for (var i = 0; i < columns * rows; i++) {
            coin = this.createCoin(0, this.coinSpawnY);
            coin.y = coin.y - (coinColumnCounter * coin.height) - (coinColumnCounter * this.coinSpacingY);
            coin.x = coinSpawnX + (coinRowCounter * coin.width) + (coinRowCounter * this.coinSpacingX);
            coinColumnCounter++;
            if (i + 1 >= columns && (i + 1) % columns === 0) {
                coinRowCounter++;
                coinColumnCounter = 0;
            }
        }
        this.game.physics.arcade.enableBody(coin);

    },


    createEnemy: function () {
        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - 192);

        var enemy = this.enemies.getFirstExists(false);
        if (!enemy) {
            enemy = new Enemy(this.game, 0, 0);
            this.enemies.add(enemy);
        }
        enemy.reset(x, y);
        enemy.revive();
    },

    /*groundHit: function(player, ground) {
     player.body.velocity.y = -200;
     },*/

    balloonHit: function (player, balloon) {
        this.score++;

        if (balloon.color == this.playerColor) {
            this.gameSpeed += this.speedFactor;
            this.balloonSize++;
        }
        else {
            this.gameSpeed -= this.speedFactor;
            this.balloonSize--;

        }
        if (this.balloonSize == 10) {
            //SPECIAL EFFEKT AUSLÖSEN
            this.spacedUp = true;
            this.spacedSprite.visible = true;
        }
        else if (this.balloonSize == 0) {
            enemyHit(player, null);
        }


        this.coinSound.play();
        balloon.kill();

        var dummyBalloon = new Balloon(this.game, balloon.x, balloon.y, balloon.color);
        this.game.add.existing(dummyBalloon);

        //dummyBalloon.animations.play('spin2', 3, true);

        var scoreTween = this.game.add.tween(dummyBalloon).to({
            x: balloon.x,
            y: balloon.y + 50
        }, 300, Phaser.Easing.Linear.NONE, true);

        scoreTween.onComplete.add(function () {
            dummyBalloon.destroy();
            this.scoreText.text = 'Score: ' + this.score;
        }, this);

    },
    coinHit: function (player, coin) {
        this.score++;
        this.coinSound.play();
        coin.kill();

        var dummyCoin = new Coin(this.game, coin.x, coin.y);
        this.game.add.existing(dummyCoin);

        dummyCoin.animations.play('spin', 40, true);

        var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

        scoreTween.onComplete.add(function () {
            dummyCoin.destroy();
            this.scoreText.text = 'Score: ' + this.score;
        }, this);

    },
    enemyHit: function (player, enemy) {
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

    groundHit: function(ground, coin){
        coin.kill();
        coin.destroy();
    },

    scrollBackground: function () {
        var ykoordinate = 0;
        var ystartkoordinate = 0;
        var bgSpeed = 4;

        switch (this.levelstage) {
            case 1:
                ykoordinate = 1800;
                ystartkoordinate = 600;
                break;
            case 2:
                ykoordinate = 4200;
                ystartkoordinate = 3000;
                break;
            case 3:
                ykoordinate = 6600;
                ystartkoordinate = 5400;
                break;
            default:
                ykoordinate = 6600;
                ystartkoordinate = 5400;
        }

        this.backgroundTile.tilePosition.y += bgSpeed;

        if (this.backgroundTile.tilePosition.y >= ykoordinate - bgSpeed) {
            this.backgroundCounter++;
            if (this.backgroundCounter == this.backgroundMax) {
                this.levelstage++;
                this.backgroundCounter = 0;
            }
            else {
                if (this.backgroundTile.tilePosition.y >= ykoordinate - bgSpeed) {
                    this.backgroundTile.tilePosition.y = ystartkoordinate;
                }
            }
        }

        if(this.spacedUp){
            this.spacedUpCount++;

            if(this.spacedUpCount == 600){
                this.spacedUp = false;
                this.spacedUpCount = 0;
                this.spacedSprite.visible = false;
            }
        }
    },

    scrollCoins: function () {
        this.coins.addAll('body.y', this.gameSpeed);
    },

    scrollBalloons: function () {
        this.balloons.addAll('body.y', this.gameSpeed);
    },


    movePlayer: function () {
        var animationfly  = 'flyRed';
        var animationflyLeft  = 'flyRedLeft';
        var animationflyRight  = 'flyRedRight';

        switch (this.playerColor){
            case 'red':
                break;
            case 'blue':
                 animationfly  = 'flyBlue';
                 animationflyLeft  = 'flyBlueLeft';
                 animationflyRight  = 'flyBlueRight';
                break;
            case 'green':
                animationfly  = 'flyGreen';
                animationflyLeft  = 'flyGreenLeft';
                animationflyRight  = 'flyGreenRight';
                break;
            case 'yellow':
                animationfly  = 'flyYellow';
                animationflyLeft  = 'flyYellowLeft';
                animationflyRight  = 'flyYellowRight';
                break;

            default:
                break;
        }

        if (this.rightKey.isDown) {
            if (this.spaceKey.isDown) {
                this.player.body.x += 25;
                this.resizeBalloon.body.x += 25;
                this.resizeBalloonEnd.body.x += 25;
            } else {
                this.player.body.x += 5;
                this.resizeBalloon.body.x += 5;
                this.resizeBalloonEnd.body.x += 5;
            }
            this.player.animations.play(animationflyRight, 8, true);
        } else if (this.leftKey.isDown) {
            if (this.spaceKey.isDown) {
                this.player.body.x -= 25;
                this.resizeBalloon.body.x -= 25;
                this.resizeBalloonEnd.body.x -= 25;
            }
            else {
                this.player.body.x -= 5;
                this.resizeBalloon.body.x -= 5;
                this.resizeBalloonEnd.body.x -= 5;
            }
            this.player.animations.play(animationflyLeft, 8, true);

        } else if (this.downKey.isDown) {
            if (this.spaceKey.isDown) {
                this.player.body.y += 25;
                this.resizeBalloon.body.y += 25;
                this.resizeBalloonEnd.body.y += 25;
            }
            else {
                this.player.body.y += 5;
                this.resizeBalloon.body.y += 5;
                this.resizeBalloonEnd.body.y += 5;
            }
            this.player.animations.play(animationfly, 8, true);
        }
        else{
            this.player.animations.play(animationfly, 8, true);
        }
    },

    changePlayerColor: function(){
        if (this.qKey.isDown){
           this.playerColor = 'red';
           this.resizeBalloon.play('red');
           this.player.animations.play('flyRed');
            console.log("Color Red");
        }
        else if(this.wKey.isDown){
            this.playerColor = 'blue';
            this.resizeBalloon.play('blue');
            this.player.animations.play('flyBlue');
        }
        else if(this.eKey.isDown){
            this.playerColor = 'green';
            this.resizeBalloon.play('green');
            this.player.animations.play('flyGreen');
        }
        else if(this.rKey.isDown){
            this.playerColor = 'yellow';
            this.resizeBalloon.play('yellow');
            this.player.animations.play('flyYellow');
        }

    },

    createFilter: function () {
        var fragmentRainbowSrc = [
            "precision mediump float;",
            "uniform vec2      resolution;",
            "uniform float     time;",

            "void main( void )",
            "{",
            "vec2 p = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;",

            "vec3 c = vec3( 0.0 );",

            "float amplitude = 0.50;",
            "float glowT = sin(time) * 0.5 + 0.5;",
            "float glowFactor = mix( 0.15, 0.35, glowT );",

            "c += vec3(0.02, 0.03, 0.13) * ( glowFactor * abs( 1.0 / sin(p.x + sin( p.y + time ) * amplitude ) ));",
            "c += vec3(0.02, 0.10, 0.03) * ( glowFactor * abs( 1.0 / sin(p.x + cos( p.y + time+1.00 ) * amplitude+0.1 ) ));",
            "c += vec3(0.15, 0.05, 0.20) * ( glowFactor * abs( 1.0 / sin(p.y + sin( p.x + time+1.30 ) * amplitude+0.15 ) ));",
            "c += vec3(0.20, 0.05, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + time+3.00 ) * amplitude+0.3 ) ));",
            "c += vec3(0.17, 0.17, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + time+5.00 ) * amplitude+0.2 ) ));",

            "gl_FragColor = vec4( c, 0.2);",
            "}"
        ];

        this.filter = new Phaser.Filter(game, null, fragmentRainbowSrc);
        this.filter.setResolution(this.game.width, 600);
        this.spacedSprite = game.add.sprite();
        game.physics.arcade.enable(this.spacedSprite);
        this.spacedSprite.width = this.game.width;
        this.spacedSprite.height = 600;
        this.spacedSprite.filters = [this.filter];
        this.spacedSprite.anchor.setTo(0.5, 0.5);
    },

    destroyCoins: function(coin) {
        coin.destroy();
        console.log("destroyed");
    }

};
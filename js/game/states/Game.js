IlioLostInSpace.Game = function () {
    this.playerMinAngle = -20;
    this.playerMaxAngle = 20;

    this.coinRate = 900;
    this.coinTimer = 0;
    this.balloonRate = 900; //Rate, ab wann Ballons erzeugt werden sollen
    this.balloonTimer = 0; //Timer, ob ein neuer Ballon erzeugt werden soll
    this.resizeSize = 5.0; //Wert, welcher Ballongröße definiert
    this.resizeRate = 800; //Rate, ab wann der Ballon verkleinert werden soll
    this.resizeTimer = 0; //Timer, ob der Ballon verkleinert werden soll
    this.boosterTimer = 0; //Timer, ob der Booster vorbei ist
    this.boosterRate = 3500; //Dauer der Booster Zeit
    this.miscRate = 10000; //Rate der Wolken
    this.miscTimer = 0; //Timer für die Wolken
    this.enemyRate = 3000;  //Rate, wann Gegner erzeugt werden sollen
    this.veloFactor = 0;
    this.balloonRate = 900;
    this.balloonTimer = 0;
    this.resizeSize = 5.0;
    this.resizeRate = 800;
    this.resizeTimer = 0;
    this.boosterTimer = 0;
    this.boosterRate = 3500;
    this.miscRate = 10000;
    this.miscTimer = 0;
    this.enemyRate = 3000;
    this.enemyTimer = 0;
    this.maxBallonCounter = 5; //Anzahl der einzusammelnden Ballons für das Special Level
    this.speedstatusVal = 0; //Anzeige Status des Boosters
    this.booster = false;
    this.boosterActivated = false;
    this.score = 0;
    this.previousCoinType = null;
    this.spacedUpSpeed = 13;
    this.coinSpawnY = null;
    this.coinSpacingX = 10;
    this.coinSpacingY = 10;
    this.backgroundMax = 5;
    this.backgroundCounter = 0;
    this.levelstage = 1; //Stand des Aktuellen Levels
    this.gameSpeed = 4.0; //Scroll geschwindikeit
    this.playerColor = 'red';
    this.balloonSize = 5;
    this.balloonsCounter = 0;
    this.speedFactor = 0.3;
    this.filter;
    this.spacedSprite;
    this.spacedUpCount = 0;
    this.spacedUp = false;
    this.playerColorNumber = 0; //Nummer der Farbe des Monsters
    this.gameisOver = false;
    this.enemysStart = false;
    this.boosterBlinkTimer = 0;

};

IlioLostInSpace.Game.prototype = {
    create: function () {


        this.game.world.bound = new Phaser.Rectangle(0, 0, this.game.width + 300, this.game.height);
        this.initializeKeys();

        this.addSprites();
        this.miscs = this.game.add.group();

        var optionStyle = { font: '25pt TheMinion', fill: 'red', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        this.txt = game.add.text(game.world.centerX, 25, "Booster ready!", optionStyle);
        this.txt.anchor.setTo(0.5);
        this.txt.stroke = "white";
        this.txt.strokeThickness = 12;
        this.txt.visible = false;
        this.createFilter();
        this.spacedSprite.visible = false;
        this.createPlayer();
        this.createPlayerBalloon();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.arcade.enableBody(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = false;
        this.coins = this.game.add.group();
        this.specialCoins = this.game.add.group();
        this.balloons = this.game.add.group();
        this.enemies = this.game.add.group();
        this.scoreText = this.game.add.bitmapText(10, 10, 'minecraftia', 'Score: 0', 24);
        this.jetSound = this.game.add.audio('rocket');
        this.coinSound = this.game.add.audio('coin');
        this.coinSound.volume = 0.3;
        this.balloonPop = this.game.add.audio('balloonPop');
        this.planeSound = this.game.add.audio('planeSound');
        this.planeSound.volume = 0.5;
        this.planeSound.stopTime = 2.0;
        this.crowSound = this.game.add.audio('crow');
        this.deathSound = this.game.add.audio('death');
        this.gameMusic = this.game.add.audio('gameMusic');
        this.gameMusic.play('', 0, true);

        this.coinSpawnY = this.game.height - 100;
        this.generateSpecialCoins();
       // this.specialCoins.visible = false;
        this.balloonTimer = 0;
        this.resizeSize = 5.0;
        this.resizeTimer = 0;
        this.enemyTimer = 0;
        this.score = 0;
        this.backgroundCounter = 0;
        this.gameSpeed = 4.0;
        this.playerColor = 'red';
        this.balloonSize = 5;
        this.spacedUpCount = 0;
        this.spacedUp = false;
        this.playerColorNumber = 0;
        this.gameisOver = false;
    },

    update: function () {
        //Nur wenn das Spiel nicht verloren ist
       if(this.gameisOver == false) {

           /*
            * Hintegrund wird gescrollt, Gegner, Münzen, Ballons werden erzeugt sowie bewegt
            * Reaktion des Anweders (Farbwechsel, Monster bewegen) umsetzen
            */
           this.scrollBackground();
           this.scrollCoins();
           this.scrollBalloons();
           this.movePlayer();
           this.changePlayerColor();

           //Wenn der Booster aktiviert wurde, Anzeige verringern, und Booster Schriftzug blinken lassen
           if(this.boosterActivated == true){
               if (this.boosterTimer < this.game.time.now) {
                  this.booster = false;
                   this.boosterActivated = false;
                   this.txt.visible = false;
                   this.speedstatusVal = 0.0;
                   this.speedstatus.scale.setTo(this.speedstatusVal/10,0.5);
                   this.boosterBlinkTimer = 0;
               }else{
                   this.boosterBlinkTimer += game.time.elapsed;
                   if ( this.boosterBlinkTimer >= 50)
                        {
                            this.boosterBlinkTimer -= 50;
                            this.txt.visible = !this.txt.visible;
                            this.speedstatus.visible = !this.speedstatus.visible;
                        }
                  }
           }

           //NUR WENN NICHT SONDERZUSTAND! (ABGESPACED!)
           // Wenn wartezeit vorbei, neuen Ballons, wollken oder Münzen erstellen erstellen
           if (this.spacedUp == false) {
               if (this.coinTimer < this.game.time.now) {
                   this.generateCoins();
                   this.coinTimer = this.game.time.now + this.coinRate;
               }

               if (this.balloonTimer < this.game.time.now) {
                   this.generateBalloon();
                   this.balloonTimer = this.game.time.now + this.balloonRate;
               }

               if (this.resizeTimer < this.game.time.now) {
                   this.minimizeResizeBalloon();
                   this.resizeTimer = this.game.time.now + this.resizeRate;
               }

               if(this.miscTimer < this.game.time.now){
                   this.createMisc();
                   this.miscTimer = this.game.time.now + this.miscRate;

               }


               //Wenn wartezeit vorbei, neuen Gegner erstellen
               if(this.enemyTimer < this.game.time.now) {
                   if(this.levelstage == 1 && this.enemysStart){
                       this.createEnemyBird();
                       this.enemyRate = this.game.rnd.integerInRange(3000, 6000);
                   }else if(this.levelstage == 2){
                       this.createEnemyPlane();
                       this.enemyRate = this.game.rnd.integerInRange(3000, 6000);
                   }
                   else if(this.levelstage >= 3){
                       this.createEnemyMeteor();
                       this.enemyRate = this.game.rnd.integerInRange(3000, 6000);
                   }
                   this.enemyTimer = this.game.time.now + this.enemyRate;
               }

           }
           else {
               //SPECIAL COINS MUSTER GENERIEREN
               this.scrollSpecialCoins();
           }


           //Auf Kollisionen reagieren!
           this.game.physics.arcade.overlap(this.ground, this.coins, this.groundHit, null, this);
           this.game.physics.arcade.overlap(this.ground, this.balloons, this.balloonsGroundHit, null, this);
           this.game.physics.arcade.overlap(this.ground, this.specialCoins, this.specialcoinGroundHit, null, this);
           this.game.physics.arcade.overlap(this.resizeBalloon, this.coins, this.coinHit, null, this);
           this.game.physics.arcade.overlap(this.resizeBalloon, this.balloons, this.balloonHit, null, this);
           this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
           this.game.physics.arcade.overlap(this.player, this.specialCoins, this.specialcoinHit, null, this);
           this.game.physics.arcade.overlap(this.player, this.balloons, this.balloonHit, null, this);
           this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);
           this.game.physics.arcade.overlap(this.resizeBalloon, this.enemies, this.enemyHit, null, this);
           this.game.physics.arcade.overlap(this.resizeBalloonEnd, this.enemies, this.enemyHit, null, this);


           //Wenn abgespaceter Modus, Hintegrund Filter aktualisieren
           if (this.spacedUp == true) {
               this.filter.update();
           }


           if (this.balloonSize > 3) {

               this.player.body.velocity.y = 0;
               this.resizeBalloon.body.velocity.y = 0;
               this.resizeBalloonEnd.body.velocity.y = 0;
               this.veloFactor = 0;

           } else {


               this.player.body.velocity.y = this.veloFactor;
               this.resizeBalloon.body.velocity.y = this.veloFactor;
               this.resizeBalloonEnd.body.velocity.y = this.veloFactor;

           }

       }
    },

    //Spiel beenden
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
        this.cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
      },

    addSprites: function() {
        this.backgroundTile = this.game.add.tileSprite(0, this.game.height - 7200, this.game.width, 7200, 'backgroundTile');
        this.spacedBg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'spacedBlack');
        this.spacedBg.visible = false;
        this.ground = this.game.add.tileSprite(-100, this.game.height + 15, this.game.width + 200, 2, 'ground');
        this.player = this.add.sprite(200, this.game.height / 2 + 150, 'player');
        this.resizeBalloon = this.game.add.sprite(173, this.game.height / 2 - 122 + 150, 'resizeBalloon');
        this.resizeBalloonEnd = this.game.add.sprite(185, this.game.height / 2 - 50 + 150, 'resizeBalloonEnd');
        this.speedbar = this.game.add.sprite(this.game.width - 200, 25, 'speedbar');
        this.speedbar.scale.setTo(0.5);
        this.speedstatus = this.game.add.sprite(this.game.width - 199.5, 25, 'speedstatus');
        this.speedstatus.scale.setTo(0.0, 0.5);
        this.speedbar.bringToTop();
        this.speedstatus.bringToTop();

    },

    createMisc: function(){
        var y = this.game.rnd.integerInRange(this.game.world.height - 50, 50);
        var x = -100;

        var scale = this.game.rnd.integerInRange(0, 100);
        var misc = this.miscs.getFirstExists(false);
        if (!misc || this.levelStage >= 3) {
            if(this.levelstage < 3 ) {
                misc = new Cloud(this.game, 0, 0);
            }else{
                misc = new Stars(this.game, 0,0);
            }
            this.miscs.add(misc);
        }
        misc.scale.setTo(scale/100);
        misc.reset(x, y);
        misc.revive();
        this.resizeBalloon.bringToTop();
        this.resizeBalloonEnd.bringToTop();
        this.player.bringToTop();
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

    createPlayerBalloon: function(){
        this.resizeBalloon.scale.set(0.5, 0.5);
        //this.resizeBalloon.anchor.setTo(0.5,0.5);
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
    },

    createBalloon: function (color) {
        var x = this.game.rnd.integerInRange(this.game.world.width - 50, 50);
        var y = -50;

        var balloon = this.balloons.getFirstExists(false);
        if (!balloon) {
            balloon = new Balloon(this.game, 0, 0, color);
            this.balloons.add(balloon);
        }
        balloon.color = color;
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
                this.createBalloon('blue')
                break;
            case 2:
                this.createBalloon('green');
                break;
            case 3:
                this.createBalloon('rainbow');
                break;

            default:
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
            this.game.physics.arcade.enableBody(coin);
        }

        coin.reset(x, y);
        coin.revive();
        this.speedbar.bringToTop();
        this.speedstatus.bringToTop();
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

    generateSpecialCoins: function(){
        var coinSpawnX = 0;
        var coinRowCounter = 0;
        var coinColumnCounter = 0;
        var coin;
        var columns = 20; //Row und Column sind vertauscht
        var rows = 25; //Row und Column sind vertauscht
        for (var i = 0; i < columns * rows; i++) {
            var x = 0;
            var y = 0;
            var coin = this.specialCoins.getFirstExists(false);

            if (!coin) {
                coin = new Coin(this.game, 0, 0);
                this.specialCoins.add(coin);
            }

            coin.reset(x, y);
            coin.specialY = coin.y - coin.height - (coinColumnCounter * coin.height) - (coinColumnCounter * this.coinSpacingY);
            coin.specialX = coinSpawnX + (coinRowCounter * coin.width) + (coinRowCounter * this.coinSpacingX);
            coin.revive();
            coin.y = coin.specialY;
            coin.x = coin.specialX;
            coin.body.velocity.y = 0;
            coinColumnCounter++;
            if (i + 1 >= columns && (i + 1) % columns === 0) {
                coinRowCounter++;
                coinColumnCounter = 0;
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

    },

    createEnemyBird: function () {
        var x = -50;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - (this.player.x + this.player.height));
        var enemyFlip = this.game.rnd.integerInRange(0,1);

        var enemy = this.enemies.getFirstExists(false);
        if (!enemy|| enemy.enemyType == "Plane" || enemy.enemyType == "Meteor") {
            enemy = new EnemyBird(this.game, 0, 0);
            this.enemies.add(enemy);
        }
        if(enemyFlip == 0 ){
            enemy.flip = true;
            enemy.reset(this.game.width + (x*-1), y);
        }else{
            enemy.flip = false;
            enemy.reset(x, y);
        }
        enemy.revive();
        this.crowSound.play();
    },

    createEnemyPlane: function () {
        var x = -50;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - (this.player.x + this.player.height));
        var enemyFlip = this.game.rnd.integerInRange(0,1);

        var enemy = this.enemies.getFirstExists(false);

        if (!enemy || enemy.enemyType == "Bird" || enemy.enemyType == "Meteor") {
            enemy = new EnemyPlane(this.game, 0, 0);
            this.enemies.add(enemy);
        }
        if(enemyFlip == 0 ){
            enemy.flip = true;
            enemy.reset(this.game.width + (x*-1), y);
        }else{
            enemy.flip = false;
            enemy.reset(x, y);
        }
        enemy.revive();
        this.planeSound.play();
    },

    createEnemyMeteor: function () {
        var y = -50;
        var x = this.game.rnd.integerInRange(75, this.game.world.width-75);

        var enemy = this.enemies.getFirstExists(false);
        if (!enemy|| enemy.enemyType == "Bird" || enemy.enemyType == "Plane") {
            enemy = new EnemyMeteor(this.game, 0, 0);
            this.enemies.add(enemy);
        }
        if(x < this.game.width / 2){
            enemy.flip = true;
        }else{
            enemy.flip = false;
        }
        enemy.reset(x, y);
        enemy.revive();
    },


    balloonHit: function (player, balloon) {

        if(balloon.color == 'rainbow' && this.booster == false){
            this.speedstatusVal++;
            this.speedstatus.scale.setTo(this.speedstatusVal/10,0.5);
            if(this.speedstatusVal >= 5.0){
                this.booster = true;
                this.boosterActivated = false;
                this.txt.visible = true;

            }
        }
        else if (balloon.color == this.playerColor) {
            this.gameSpeed += this.speedFactor;
            this.balloonSize++;
            this.score += 2*this.balloonSize;
            this.balloonsCounter++;
            this.resizeTimer = this.game.time.now + this.resizeRate*2;

        }
        else if(balloon.color != this.playerColor && balloon.color != 'rainbow') {
            this.gameSpeed -= this.speedFactor;
            this.balloonSize--;
            this.balloonsCounter = 0;
        }


        this.resizeSize = parseFloat(this.balloonSize).toFixed(1);
        this.balloonRate = 100/this.gameSpeed*40;
        this.coinRate = 100/this.gameSpeed*40;

        if (this.balloonsCounter == this.maxBallonCounter) {
            //SPECIAL EFFEKT AUSLÖSEN
            this.balloons.callAll('kill');
            this.coins.visible = false;
            this.spacedUp = true;
            this.miscs.setAll('visible', false);
            this.spacedBg.visible = true;
            this.enemies.callAll('kill');
            this.generateSpecialCoins();
            this.spacedSprite.visible = true;
            this.specialCoins.setAll('visible', true);
        }
        else if (this.resizeSize <= 0.0) {
            this.enemyHit(player, balloon);
        }

        this.resizeBalloon.scale.setTo(this.balloonSize/10);
        //this.resizeBalloon.scale.set(size, size);
        this.resizeBalloon.x = (this.player.x + 10.5) - parseFloat(this.resizeBalloon.width/2).toFixed(1);
        this.resizeBalloon.y = (this.player.y - 47) - this.resizeBalloon.height;

        this.balloonPop.play();
        balloon.kill();
        var dummyBalloon = new Balloon(this.game, balloon.x, balloon.y, balloon.color);
        balloon.destroy();
        this.game.add.existing(dummyBalloon);

        if(dummyBalloon.color == 'red') {
            dummyBalloon.animations.play('burstRed', true);
        } else if(dummyBalloon.color == 'blue') {
            dummyBalloon.animations.play('burstBlue', true);

        }else if(dummyBalloon.color == 'rainbow') {
            dummyBalloon.animations.play('burstRainbow', true);

        }else if(dummyBalloon.color == 'green') {
            dummyBalloon.animations.play('burstGreen', true);

        }


        var scoreTween = this.game.add.tween(dummyBalloon).to({
            x: balloon.x,
            y: balloon.y + 50
        }, 300, Phaser.Easing.Linear.NONE, true);

        scoreTween.onComplete.add(function () {
            dummyBalloon.destroy();
            this.scoreText.text = 'Score: ' + parseInt(this.score);
        }, this);
    },

    coinHit: function (player, coin) {
        this.score += 2*this.gameSpeed;
        this.coinSound.play();
        coin.kill();

        var dummyCoin = new Coin(this.game, coin.x, coin.y);
        this.game.add.existing(dummyCoin);
       // coin.destroy();

        dummyCoin.animations.play('spin', 40, true);

        var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

        scoreTween.onComplete.add(function () {
            dummyCoin.destroy();
            this.scoreText.text = 'Score: ' + parseInt(this.score);
        }, this);
    },

    specialcoinHit: function(player, coin){
       if(this.spacedUp == true) {
           this.score += 15;
           this.coinSound.play();
           //coin.visible = false;
           var dummyCoin = new Coin(this.game, coin.x, coin.y);
           this.game.add.existing(dummyCoin);

           //coin.x = coin.specialX;
           //coin.y = coin.specialY - (this.game.height - coin.y);

           coin.kill();
           coin.destroy();
           dummyCoin.animations.play('spin', 40, true);

           var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

           scoreTween.onComplete.add(function () {
               dummyCoin.destroy();
               this.scoreText.text = 'Score: ' + parseInt(this.score);
           }, this);
       }
    },

    enemyHit: function (player, enemy) {
       // player.kill();
        this.player.body.velocity.y = 300;
        this.resizeBalloon.kill();
        this.resizeBalloonEnd.body.velocity.y = 300;
        enemy.kill();
        console.log("enemyHit: " +enemy);
        this.gameOverNow();
    },

    groundHit: function(ground, coin){
        coin.kill();
        if(this.coins.length > 12){
            coin.destroy();
        }
    },

    balloonsGroundHit: function(ground, balloon){
        balloon.kill();
        if(this.balloons.length > 12){
            balloon.destroy();
        }
    },

    specialcoinGroundHit: function(ground, coin){
        coin.kill();
        coin.destroy();

    },

    minimizeResizeBalloon: function(){
        this.resizeSize -= 0.1;
        this.veloFactor += 5;
        this.balloonSize = parseInt(this.resizeSize);
        if(this.resizeSize >= 0) {
            var newscale = this.resizeSize / 10;
            this.resizeBalloon.scale.set(newscale, newscale);
            this.resizeBalloon.x = (this.player.x + 10.5) - parseFloat(this.resizeBalloon.width / 2).toFixed(1);
            this.resizeBalloon.y = (this.player.y - 47) - this.resizeBalloon.height;
        }
        else{
            console.log("minimizeResizeBalloon");
            this.enemyHit(this.player, this.resizeBalloon);
        }
    },

    scrollBackground: function () {
        if (this.gameisOver == false) {
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
            //Enemys erst nach einem start vorsprung starten
            if(this.backgroundTile.tilePosition.y >= 1200){
                this.enemysStart = true;
            }
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

            if (this.spacedUp) {
                this.spacedUpCount += this.spacedUpSpeed;
                if (this.spacedUpCount >= (30 * 10 + 20 * 20 + this.game.height)) {
                    this.spacedUp = false;
                    this.spacedBg.visible = false;
                    this.miscs.setAll('visible', true);
                    this.spacedUpCount = 0;
                    this.spacedSprite.visible = false;
                    //this.gameSpeed = 4.0;
                    this.balloonSize = 5.0;
                    this.resizeSize = 5.0;
                    this.balloonsCounter = 0;
                    this.resizeBalloon.x = (this.player.x + 10.5) - parseFloat(this.resizeBalloon.width / 2).toFixed(1);
                    this.resizeBalloon.y = (this.player.y - 47) - this.resizeBalloon.height;

                    this.balloons.visible = true;
                    this.coins.visible = true;
                    this.specialCoins.setAll('visible', false);
                }
            }
        }
    },


    scrollSpecialCoins: function() {
        if (this.gameisOver == false) {
            if(this.spacedUp == true) {
                this.specialCoins.addAll('body.y', this.spacedUpSpeed, true, true);
            }
        }
    },

    scrollCoins: function () {
        if (this.gameisOver == false) {
            this.coins.addAll('body.y', this.gameSpeed, true, true);
        }
    },

    scrollBalloons: function () {
        if (this.gameisOver == false) {
             this.balloons.addAll('body.y', this.gameSpeed, true, true);
        }
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
           /* case 'yellow':
                animationfly  = 'flyYellow';
                animationflyLeft  = 'flyYellowLeft';
                animationflyRight  = 'flyYellowRight';
                break;
*/
            default:
                break;
        }

        if(this.spaceKey.isDown && this.booster == true && this.boosterActivated == false){
            this.boosterTimer = this.game.time.now + this.boosterRate;
            this.boosterActivated = true;
        }

        if (this.rightKey.isDown) {
            if (this.spaceKey.isDown && this.booster == true) {
                this.player.body.x += 25;
                this.resizeBalloon.body.x += 25;
                this.resizeBalloonEnd.body.x += 25;
            } else {
                this.player.body.x += 5;
                this.resizeBalloon.body.x += 5;
                this.resizeBalloonEnd.body.x += 5;
            }
            this.player.animations.play(animationflyRight, 8, true);
            this.checkCollideRightBounds();
        } else if (this.leftKey.isDown) {
            if(this.spaceKey.isDown && this.booster == true) {
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
            this.checkCollideLeftBounds();
        }
        else if (this.downKey.isDown) {
            if (this.spaceKey.isDown && this.booster == true) {
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
        else if (this.upKey.isDown) {
            if (this.spaceKey.isDown && this.booster == true) {
                this.player.body.y -= 25;
                this.resizeBalloon.body.y -= 25;
                this.resizeBalloonEnd.body.y -= 25;
            }
            else {
                this.player.body.y -= 5;
                this.resizeBalloon.body.y -= 5;
                this.resizeBalloonEnd.body.y -= 5;
            }
            this.player.animations.play(animationfly, 8, true);
        }
        else{
            this.player.animations.play(animationfly, 8, true);
        }

    },

    checkCollideRightBounds: function(){
        if((this.player.body.x + this.player.width) >= this.game.width){
            this.player.body.x = 0;
            this.resizeBalloon.body.x = (this.player.body.x + 37) - parseFloat(this.resizeBalloon.width/2).toFixed(1);
            this.resizeBalloonEnd.body.x = 10.5;

        }
    },

    checkCollideLeftBounds: function(){
        if((this.player.body.x + this.player.width) <= 0){
            this.player.body.x = this.game.width;
            this.resizeBalloon.body.x = (this.player.body.x + 37) - parseFloat(this.resizeBalloon.width/2).toFixed(1);
            this.resizeBalloonEnd.body.x = this.player.body.x + 10.5;
        }

    },

    changePlayerColor: function(){
        if (this.cKey.isDown) {
            if (this.colorChanged == false) {
                switch (this.playerColorNumber % 3) {
                    case 0:
                        this.playerColorNumber = 1;
                        break;
                    case 1:
                        this.playerColorNumber = 2;
                        break;
                    case 2:
                        this.playerColorNumber = 3;
                        break;
                    /*case 3:
                        this.playerColorNumber = 4;
                        break;*/
                }
                this.colorChanged = true;
            }
        }

        if(this.cKey.isUp){
            if(this.colorChanged == true){
                switch (this.playerColorNumber % 3) {
                    case 0:
                          this.playerColor = 'red';
                        this.resizeBalloon.play('red');
                        break;
                    case 1:
                          this.playerColor = 'blue';
                        this.resizeBalloon.play('blue');
                        break;
                    case 2:
                         this.playerColor = 'green';
                        this.resizeBalloon.play('green');
                        break;
                    /*case 3:
                        this.playerColor = 'yellow';
                        this.resizeBalloon.play('yellow');
                        break;*/
                }
            }
            this.colorChanged = false;
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

    gameOverNow: function() {
     this.deathSound.play();
     this.gameMusic.stop();
     this.gameisOver = true;
     this.balloonsCounter = 0;
     this.speedstatusVal = 0;
     this.enemies.setAll('body.velocity.x', 0);
     this.coins.setAll('body.velocity.x', 0);
     this.levelstage = 1;
     this.speedstatusVal = 0;
     this.enemyTimer = Number.MAX_VALUE;
     this.coinTimer = Number.MAX_VALUE;
     this.score = parseInt(this.score);
     localStorage.setItem('score', this.score);
     var scoreboard = new Scoreboard(this.game);
     scoreboard.show(parseInt(this.score));
     this.game.global.mainMenuSoundIsPlaying = false;
     this.setLeaderboard();
     this.score = 0;


 },

    setLeaderboard: function() {

        var highscoreArray = [];
        //this.score = localStorage.getItem('score');
        highscoreArray = JSON.parse(localStorage.getItem('highscoreArray'));

        if(!highscoreArray) {
            highscoreArray = [];
            highscoreArray.push(this.score);
            localStorage.setItem('highscoreArray',JSON.stringify(highscoreArray));
        } else {
            var sortArray = [];
            var sortArrayCounter = 0;
            var scoreSet = false;
            for (var i=0; i < 10; i++) {

                if (sortArrayCounter < 10) {

                    if (parseInt(highscoreArray[i]) > parseInt(this.score)) {

                        sortArray.push(highscoreArray[i]);
                        sortArrayCounter++;

                    } else {

                        if (!scoreSet) {
                            sortArray.push(this.score);
                            sortArrayCounter++;
                            scoreSet = true;
                            i--;
                        }
                        else{
                            sortArray.push(highscoreArray[i]);
                            sortArrayCounter++;
                        }
                    }
                }
            }

            localStorage.setItem('highscoreArray',JSON.stringify(sortArray));


        }

    },

};
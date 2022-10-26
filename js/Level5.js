var PrototypeMaze = PrototypeMaze || {};

PrototypeMaze.Game = function() {};

PrototypeMaze.Level5 = {

  create: function() {

    // Create mushroom objects
    // mushroom constructor
    var mushroom = function(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'mushroom_group');

        // Set the pivot point for this sprite to the center
        this.anchor.setTo(0.5, 0.5);
    };

    // mushroomes are a type of Phaser.Sprite
    mushroom.prototype = Object.create(Phaser.Sprite.prototype);
    mushroom.prototype.constructor = mushroom;

    //Tilemap setup
    var map;
    var layer;

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    this.map = this.game.add.tilemap('L5Map', 64, 64);

    //  Now add in the tileset
    this.map.addTilesetImage('tiles');

    //  Create our layer
    this.layer = this.map.createLayer(0);

    //  Resize the world
    this.layer.resizeWorld();

    //Set wall collision with tilemap
    this.map.setCollisionBetween(144, 161);

    //  Un-comment this on to see the collision tiles
    // this.layer.debug = true;

    //static objects
    this.skeleton = this.game.add.image(2350, 2255, 'skeleton');
    this.bones = this.game.add.image(70, 1190, 'bones6');
    this.bones2 = this.game.add.image(2090, 2780, 'bones2');
    this.bones3 = this.game.add.image(890, 420, 'bones5');
    this.bones4 = this.game.add.image(2245, 190, 'bones3');
    this.bones5 = this.game.add.image(2400, 360, 'bones5');
    this.roots1 = this.game.add.image(300, 150, 'roots4');
    this.roots4 = this.game.add.image(950, 150, 'roots3');
    this.shroom = this.game.add.image(560, 400, 'mushroom_small');
    this.shroom2 = this.game.add.image(570, 395, 'mushroom_small_group');
    this.stalactice1 = this.game.add.image(1600, 2160, 'Stalactite3');
    this.stalactice2 = this.game.add.image(110, 1960, 'Stalactite_broken');
    this.stalactice3 = this.game.add.image(135, 1970, 'Stalactite_small4');
    this.stalactice4 = this.game.add.image(1100, 1650, 'Stalactite2');
    this.stalactice5 = this.game.add.image(1250, 1560, 'Stalactite4');
    this.stalactice6 = this.game.add.image(1225, 2575, 'Stalactite_small');
    this.stalactice7 = this.game.add.image(385, 2800, 'Stalactite_small_broken2');
    this.stalactice8 = this.game.add.image(1800, 2800, 'Stalactite');
    this.stalactice9 = this.game.add.image(1865, 2630, 'Stalactite_small_broken');
    this.stalactice10 = this.game.add.image(2400, 2660, 'Stalactite_small4');
    this.stalactice11 = this.game.add.image(1450, 2175, 'Stalactite_small3');
    this.stalactice12 = this.game.add.image(2390, 2150, 'Stalactite_broken2');
    this.coins = this.game.add.sprite(2345, 2260, 'coins');
    this.coins.anchor.setTo(0.5, 0.5);
    this.coins.collected = false;
    this.coins2 = this.game.add.sprite(717, 1721, 'coins');
    this.coins2.anchor.setTo(0.5, 0.5);
    this.coins2.collected = false;
    this.coins3 = this.game.add.sprite(625, 1981, 'coins');
    this.coins3.anchor.setTo(0.5, 0.5);
    this.coins3.collected = false;
    this.coins4 = this.game.add.sprite(2181, 2493, 'coins');
    this.coins4.anchor.setTo(0.5, 0.5);
    this.coins4.collected = false;
    this.gems = this.game.add.sprite(2175, 2488, 'gems');
    this.gems.anchor.setTo(0.5, 0.5);
    this.gems.collected = false;
    this.gems2 = this.game.add.sprite(630, 1988, 'gems');
    this.gems2.anchor.setTo(0.5, 0.5);
    this.gems2.collected = false;

    //treasure animations
    this.coins.animations.add('twinkle', [0, 1, 2, 3, 4, 5, 6], 3, true);
    this.coins.animations.play('twinkle');
    this.coins2.animations.add('twinkle', [0, 1, 2, 3, 4, 5, 6], 3, true);
    this.coins2.animations.play('twinkle');
    this.coins3.animations.add('twinkle', [0, 1, 2, 3, 4, 5, 6], 3, true);
    this.coins3.animations.play('twinkle');
    this.coins4.animations.add('twinkle', [0, 1, 2, 3, 4, 5, 6], 3, true);
    this.coins4.animations.play('twinkle');
    this.gems.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 3, true);
    this.gems.animations.play('sparkle');
    this.gems2.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 3, true);
    this.gems2.animations.play('sparkle');

    //add mushroom group
    this.mushroomes = this.game.add.group();
    this.mushroomes.add(new mushroom(this.game, 1260, 980));
    this.mushroom1 = this.game.add.image(1250, 990, 'mushroom_tall2');
    this.mushroomes.add(new mushroom(this.game, 1625, 1750));
    this.mushroom2 = this.game.add.image(1600, 1730, 'mushroom_group2');
    this.mushroomes.add(new mushroom(this.game, 685, 2560));
    this.mushroom3 = this.game.add.image(680, 2500, 'mushroom_tall2');
    this.mushroomes.add(new mushroom(this.game, 2215, 2200));
    this.mushroom4 = this.game.add.image(2240, 2220, 'mushroom_group2');

    //animation for mushroom
    this.mushroomes.callAll('animations.add', 'animations', 'flicker', [0, 1, 2], 3.5, true);
    this.mushroomes.callAll('animations.play', 'animations', 'flicker');

    this.setUpEnemies();

    this.levelDoor = this.game.add.sprite(2401, 3008, 'door5');
    this.mainChar = this.game.add.sprite(150, 160, 'player');
    this.sideChar = this.game.add.sprite(150, 160, 'companion');

    //animations for mainChar
    this.mainChar.animations.add('up', [16, 17, 18, 19], 6, true);
    this.mainChar.animations.add('left', [8, 9, 10, 11], 6, true);
    this.mainChar.animations.add('right', [24, 25, 26, 27], 6, true);
    this.mainChar.animations.add('down', [0, 1, 2, 3], 6, true);
    this.mainChar.animations.add('upRight', [20, 21, 22, 23], 6, true);
    this.mainChar.animations.add('upLeft', [12, 13, 14, 15], 6, true);
    this.mainChar.animations.add('downRight', [28, 29, 30, 31], 6, true);
    this.mainChar.animations.add('downLeft', [4, 5, 6, 7], 6, true);

    //animations for sideChar
    this.sideChar.animations.add('sideUp', [89, 90], 3, true);
    this.sideChar.animations.add('sideDown', [81, 82], 3, true);
    this.sideChar.animations.add('sideLeft', [93, 94], 3, true);
    this.sideChar.animations.add('sideRight', [85, 86], 3, true);
    this.sideChar.animations.add('sideUpLeft', [91, 92], 3, true);
    this.sideChar.animations.add('sideUpRight', [87, 88], 3, true);
    this.sideChar.animations.add('sideDownLeft', [95, 96], 3, true);
    this.sideChar.animations.add('sideDownRight', [83, 84], 3, true);

    this.sideChar.animations.add('upCharge1', [41], 3);
    this.sideChar.animations.add('downCharge1', [0, 1], 2);
    this.sideChar.animations.add('leftCharge1', [61], 3);
    this.sideChar.animations.add('rightCharge1', [21], 3);
    this.sideChar.animations.add('upLeftCharge1', [51], 3);
    this.sideChar.animations.add('upRightCharge1', [31], 3);
    this.sideChar.animations.add('downLeftCharge1', [71], 3);
    this.sideChar.animations.add('downRightCharge1', [12], 3);

    this.sideChar.animations.add('upCharge2', [42], 3);
    this.sideChar.animations.add('downCharge2', [2], 2);
    this.sideChar.animations.add('leftCharge2', [62], 3);
    this.sideChar.animations.add('rightCharge2', [22], 3);
    this.sideChar.animations.add('upLeftCharge2', [52], 3);
    this.sideChar.animations.add('upRightCharge2', [32], 3);
    this.sideChar.animations.add('downLeftCharge2', [72], 3);
    this.sideChar.animations.add('downRightCharge2', [13], 3);

    this.sideChar.animations.add('upCharge3', [43], 3);
    this.sideChar.animations.add('downCharge3', [3], 2);
    this.sideChar.animations.add('leftCharge3', [63], 3);
    this.sideChar.animations.add('rightCharge3', [23], 3);
    this.sideChar.animations.add('upLeftCharge3', [53], 3);
    this.sideChar.animations.add('upRightCharge3', [33], 3);
    this.sideChar.animations.add('downLeftCharge3', [73], 3);
    this.sideChar.animations.add('downRightCharge3', [14], 3);

    this.sideChar.animations.add('upCharge4', [44], 3);
    this.sideChar.animations.add('downCharge4', [4], 2);
    this.sideChar.animations.add('leftCharge4', [64], 3);
    this.sideChar.animations.add('rightCharge4', [24], 3);
    this.sideChar.animations.add('upLeftCharge4', [54], 3);
    this.sideChar.animations.add('upRightCharge4', [34], 3);
    this.sideChar.animations.add('downLeftCharge4', [74], 3);
    this.sideChar.animations.add('downRightCharge4', [15], 3);

    this.sideChar.animations.add('upChargeReady', Phaser.ArrayUtils.numberArray(45, 46), 3, true);
    this.sideChar.animations.add('downChargeReady', Phaser.ArrayUtils.numberArray(5, 6), 3, true);
    this.sideChar.animations.add('leftChargeReady', Phaser.ArrayUtils.numberArray(65, 66), 3, true);
    this.sideChar.animations.add('rightChargeReady', Phaser.ArrayUtils.numberArray(25, 26), 3, true);
    this.sideChar.animations.add('upLeftChargeReady', Phaser.ArrayUtils.numberArray(55, 56), 3, true);
    this.sideChar.animations.add('upRightChargeReady', Phaser.ArrayUtils.numberArray(35, 36), 3, true);
    this.sideChar.animations.add('downLeftChargeReady', Phaser.ArrayUtils.numberArray(75, 76), 3, true);
    this.sideChar.animations.add('downRightChargeReady', Phaser.ArrayUtils.numberArray(16, 17), 3, true);

    this.sideChar.animations.add('upChargeRelease', Phaser.ArrayUtils.numberArray(46, 50), 3);
    this.sideChar.animations.add('downChargeRelease', Phaser.ArrayUtils.numberArray(6, 11), 8);
    this.sideChar.animations.add('leftChargeRelease', Phaser.ArrayUtils.numberArray(66, 70), 3);
    this.sideChar.animations.add('rightChargeRelease', Phaser.ArrayUtils.numberArray(26, 30), 3);
    this.sideChar.animations.add('upLeftChargeRelease', Phaser.ArrayUtils.numberArray(56, 60), 3);
    this.sideChar.animations.add('upRightChargeRelease', Phaser.ArrayUtils.numberArray(36, 40), 3);
    this.sideChar.animations.add('downLeftChargeRelease', Phaser.ArrayUtils.numberArray(76, 80), 3);
    this.sideChar.animations.add('downRightChargeRelease', Phaser.ArrayUtils.numberArray(17, 20), 3);

    this.sideChar.animations.add('teleportInLeft', Phaser.ArrayUtils.numberArray(97, 109), 13);

    //mainChar setup
    this.game.physics.enable(this.mainChar, Phaser.Physics.ARCADE);
    this.mainChar.anchor.setTo(0.5, 0.5);
    this.mainChar.body.setSize(28, 28, 0, 29);
    this.mainChar.body.collideWorldBounds = true;
    this.mainChar.body.defaultRestitution = 0.8;
    this.mainChar.body.immovable = true;

    //sideChar setup
    this.game.physics.enable(this.sideChar, Phaser.Physics.ARCADE);
    this.sideChar.anchor.setTo(0.5, 0.5);
    this.sideChar.body.setSize(64, 32, 0, 32);
    this.sideChar.body.collideWorldBounds = true;
    this.sideChar.body.defaultRestitution = 0.8;
    this.sideChar.body.immovable = true;
    this.teleport = this.game.add.audio('teleport');

    //sideChar follow coordinates
    this.follow = this.game.add.sprite();
    this.game.physics.enable(this.follow, Phaser.Physics.ARCADE);
    this.follow.x = this.mainChar.body.x;
    this.follow.y = this.mainChar.body.y;

    //sideChar Attack Energy
    this.energy = 150;

    //sideChar attack animation
    var sideCharLastDirection;
    var sideCharAnimationDelay;

    this.sideCharLastDirection = 5;
    //0 upLeft, 1 up, 2 upRight, 3 right, 4 downRight, 5 down, 6 downLeft, 7 left
    this.sideCharAnimationDelay = 0;

    //levelDoor setup
    this.game.physics.enable(this.levelDoor, Phaser.Physics.ARCADE);
    this.levelDoor.anchor.setTo(0.5, 0.5);
    this.levelDoor.body.collideWorldBounds = true;
    this.levelDoor.body.defaultRestitution = 0.8;
    this.levelDoor.body.immovable = true;

    //Initiates camera to follow mainChar
    this.game.camera.follow(this.mainChar, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //player input
    this.upButton = this.input.keyboard.addKey(Phaser.KeyCode.W);
    this.downButton = this.input.keyboard.addKey(Phaser.KeyCode.S);
    this.leftButton = this.input.keyboard.addKey(Phaser.KeyCode.A);
    this.rightButton = this.input.keyboard.addKey(Phaser.KeyCode.D);
    this.shift = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT);
    this.space = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.esc = this.input.keyboard.addKey(Phaser.KeyCode.ESC);

    //Initializes mainChar to be under player contrl
    this.enableMainChar = true; //when set to true, mainChar is enabled for control
    this.enableSideChar = false; //when set to true, sideChar is enabled for control

    // The radius of the circle of light
    this.LIGHT_RADIUS = 150;

    this.music = this.game.add.audio('maze1Music');
    this.water = this.game.add.audio('driplet');
    this.music.loop = true;
    this.water.loop = true;
    //steps.play();
    this.water.play('', 0.3);
    this.music.play();

    this.crab = this.game.add.audio('crab');
    this.mice = this.game.add.audio('mice');
    this.monster = this.game.add.audio('monster');
    this.strikerSound = this.game.add.audio('strikerSound');
    this.flesh = this.game.add.audio('flesh');
    this.wandererSound = this.game.add.audio('wandererSound');
    this.walking = this.game.add.audio('walking', 0.5);
    this.attack = this.game.add.audio('attack');
    this.charDeath = this.game.add.audio('charDeath');
    this.coinSound = this.game.add.audio('coin');


    // Create the shadow texture
    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    this.lightSprite = this.game.make.image(0, 0, this.shadowTexture);

    this.rendTex = this.game.add.renderTexture(this.game.width, this.game.height);
    this.shadowSprite = this.game.add.image(0, 0, this.rendTex);
    this.shadowSprite.blendMode = Phaser.blendModes.MULTIPLY;
    //so that the sprite always follows the camera
    this.shadowSprite.fixedToCamera = true;
    //use the shadowTexture just for the backdrop, then filters "eat away" this default sprite
    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 60)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
    //add in our torches
    this.torchFilters = [];
    this.mushroomes.forEach(function(torch, game, torches) {
      var l = createTorch(game, torch.x, torch.y);
      l.filter.r = 0.3;
      l.filter.g = 0.5;
      l.filter.b = 0.9;
      torches.push(l);
    }, this, true, this.game, this.torchFilters);
    this.bioSpecs = new Array();
    for (var i = 0; i < 10; i++)
    {
      var v = createTorch(this.game, Math.random() * 2048, Math.random() * 2048);
      v.filter.radius = 0.01;
      v.filter.r = 0.4;
      v.filter.g = 0.4;
      v.filter.b = 0.8 + Math.random() * 0.2;
      this.bioSpecs.push(v);
    }
    this.characterLight = createTorch(this.game, 0, 0);
    this.characterLight.filter.r = 1.0;
    this.characterLight.filter.g = 1.0;
    this.characterLight.filter.b = 0.2;

    this.attackLight = createTorch(this.game, 0, 0);
    this.attackLight.filter.r = 1;
    this.attackLight.filter.g = 1;
    this.attackLight.filter.b = 1;
    this.attackLight.filter.radius = 2;
    this.ticks = 0;
    this.attackedLast = -10000;

    this.stepCooldown = 0;
    this.energy_interpol = 150;

  },

  update: function() {

    if (!this.coins.collected && this.game.physics.arcade.distanceBetween(this.mainChar, this.coins) < 5)
    {
      this.coinSound.play();
      this.coins.destroy();
      this.coins.collected = true;
    }

    if (!this.coins2.collected && this.game.physics.arcade.distanceBetween(this.mainChar, this.coins2) < 5)
    {
      this.coinSound.play();
      this.coins2.destroy();
      this.coins2.collected = true;
    }

    if (!this.coins3.collected && this.game.physics.arcade.distanceBetween(this.mainChar, this.coins3) < 5)
    {
      this.coinSound.play();
      this.coins3.destroy();
      this.coins3.collected = true;
    }

    if (!this.coins4.collected && this.game.physics.arcade.distanceBetween(this.mainChar, this.coins4) < 5)
    {
      this.coinSound.play();
      this.coins4.destroy();
      this.coins4.collected = true;
    }

    if (!this.gems.collected && this.game.physics.arcade.distanceBetween(this.mainChar, this.gems) < 5)
    {
      this.coinSound.play();
      this.gems.destroy();
      this.gems.collected = true;
    }

    if (!this.gems2.collected && this.game.physics.arcade.distanceBetween(this.mainChar, this.gems2) < 5)
    {
      this.coinSound.play();
      this.gems2.destroy();
      this.gems2.collected = true;
    }

    //tilemap collision
    this.game.physics.arcade.collide(this.mainChar, this.layer);
    this.game.physics.arcade.collide(this.sideChar, this.layer);
    this.processPlayerInput();
    this.sideCharFollow();

    this.enemyCollisions();

    // Update the shadow texture each frame
    this.updateShadowTexture();

    this.collisionsDoor();

  },

  render: function() {

    // if (this.input.keyboard.addKey(Phaser.KeyCode.P).isDown)
    // {
    //   this.game.debug.geom(this.leftT, 'rgba(200,0,0,0.5)');
    //   this.game.debug.body(this.mainChar);
    //   this.game.debug.body(this.sideChar);
    //   this.game.debug.body(this.wanderer);
    //   this.game.debug.body(this.stationary);
    //   this.game.debug.body(this.striker);
    //   this.game.debug.body(this.reaper);
    //   this.game.debug.body(this.ratGroup);
    //   this.game.debug.bodyInfo(this.mainChar, 0, 10);
    // }else
    // {
    //   this.game.debug.reset();
    // }

    // this.game.debug.body(this.mainChar);
    // this.game.debug.body(this.crabGroup.children[0]);

},

levelChange: function() {
  this.walking.stop();
  this.music.stop();
  this.water.stop();
  this.game.state.start('5CS');
},

collisionsDoor: function() {

    //collision dectection for paddle and iWall with dust groups
    this.game.physics.arcade.collide(this.mainChar, this.levelDoor, this.doorCollision, null, this);

  },

doorCollision: function(mainChar, levelDoor) {

  this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.levelChange, this);

},

updateShadowTexture: function() {
  if (this.energy_interpol > this.energy)
  {
    this.energy_interpol -= 1.0;
  }
  if (this.energy_interpol < this.energy)
  {
    this.energy_interpol += 1.0;
  }
  //using some GLSL magic and Render to texture technology, we efficiently calculate the lighting
  //this lighting system is highly flexible and fast, freeing the CPU for ai calculations
  //arbitrary numbers of lights may be added and processed,
  var cx = this.game.camera.x / this.game.width;
  var cy = this.game.camera.y / this.game.height;

  var ar = new Array();
  for (var i = 0; i < this.torchFilters.length; i++)
  {
    updateTorch(this.torchFilters[i], this.ticks, this.game, cx, cy);
    ar.push(this.torchFilters[i].filter);
  }
  for (var i = 0; i < this.bioSpecs.length; i++)
  {
    updateTorch(this.bioSpecs[i], this.ticks, this.game, cx, cy);
    ar.push(this.bioSpecs[i].filter);
  }

  if (this.ticks - this.attackedLast <= 45)
  {
    var prog = (this.ticks - this.attackedLast) / 45.0;
    if (prog < 0.1) {
      prog = prog * 10.0;
    }
    else {
      prog -= 0.1;
      prog = 1.0 - prog;
    }
    this.attackLight.x = this.sideChar.body.x + this.sideChar.width / 2.0;
    this.attackLight.y = this.sideChar.body.y - 32 + this.sideChar.height / 2.0;
    this.attackLight.filter.radius = prog * 1.0;
    updateTorch(this.attackLight, 0, this.game, cx, cy);
    ar.push(this.attackLight.filter);
  }
  this.characterLight.x = this.sideChar.body.x + this.sideChar.width / 2.0;
  this.characterLight.y = this.sideChar.body.y - 32 + this.sideChar.height / 2.0;
  this.characterLight.filter.radius = (this.energy_interpol / 150.0) * 0.3;

  updateTorch(this.characterLight, this.ticks, this.game, cx, cy);
  ar.push(this.characterLight.filter);
  this.lightSprite.filters = ar;
  this.rendTex.renderXY(this.lightSprite, 0, 0, true);
  this.ticks++;


},

sideCharFollow: function() {

  //Gets angle in degrees
  this.radians = this.game.physics.arcade.angleBetween(this.sideChar, this.follow);
  this.degrees = this.radians * (180 / Math.PI);

  this.teleportCoolDown;

  if (this.enableMainChar)
  {
    //Calculates the hypotenuse of the mainChar's X and Y velocities
    this.mainCharhypotenuse = Math.sqrt(Math.pow(this.mainChar.body.velocity.x, 2) + Math.pow(this.mainChar.body.velocity.y, 2));

    //Respawns sideChar if too far away from mainChar
    if (this.game.physics.arcade.distanceBetween(this.sideChar, this.mainChar) > 250)
    {
      this.teleportIn();
      this.teleportCoolDown = this.game.time.totalElapsedSeconds() + 1;
    }

    //If mainChar isn't moving sideChar will follow at default speed
    else if (this.mainCharhypotenuse == 0)
    {
      this.game.physics.arcade.moveToXY(this.sideChar, this.follow.body.x, this.follow.body.y, 125, 700);
    }
    else
    {
      this.game.physics.arcade.velocityFromAngle(this.degrees, this.mainCharhypotenuse, this.sideChar.body.velocity);
    }
  }

},

processPlayerInput: function() {
  if (this.mainChar.body.velocity != 0 && !this.walking.isPlaying && this.ticks - this.stepCooldown > 10)
  {
    this.walking.play('', 1, 0.5, false, true);
    this.stepCooldown = this.ticks;
  }
  if (this.mainChar.body.velocity == 0)
  {
    this.walking.stop();
  }
  if (this.underAttack == true && this.underAttackDelay == 0)
  {
    if (this.firstAttackAction)
    {
      console.log('sideChar = true');
      this.enableMainChar = false;
      this.enableSideChar = true;
      this.mainChar.body.velocity.x = 0;
      this.mainChar.body.velocity.y = 0;

      this.game.camera.follow(this.sideChar, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

      this.firstAttackAction = false;
    }

  }else if (this.shift.downDuration(10))
  {
    if (this.enableMainChar)
    {
      console.log('sideChar = true');
      this.enableMainChar = false;
      this.enableSideChar = true;
      this.mainChar.body.velocity.x = 0;
      this.mainChar.body.velocity.y = 0;

      this.game.camera.follow(this.sideChar, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }
    else
    {
      console.log('mainChar in control = true');
      this.enableMainChar = true;
      this.enableSideChar = false;
      this.sideChar.body.velocity.x = 0;
      this.sideChar.body.velocity.y = 0;

      this.game.camera.follow(this.mainChar, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }
  }

  if (this.enableMainChar)
  {
    //Base condition of sideChar
    //No movement if no keys are pressed
    this.mainChar.body.velocity.x = 0;
    this.mainChar.body.velocity.y = 0;

    //Pause menu control
    if (this.esc.isDown)
    {
      //this doesn't work, phaser can't reconcile isPaused after being paused
      //this.game.physics.ARCADE.isPaused = (this.game.physics.ARCADE.isPaused) ? false : true;

      //this has the problem of causing the game to stop listening to any input
      //this.game.paused = true;

    }

    //Teleport Cooldown check
    if (this.teleportCoolDown > this.game.time.totalElapsedSeconds())
    {
      this.mainChar.body.velocity.x = 0;
      this.mainChar.body.velocity.y = 0;

      this.mainChar.animations.stop();
      this.walking.stop();
    }

    else
    {

    //Standard Directions (Up, Down, Left, Right)
    //Up movement
    //Standard Directions (Up, Down, Left, Right)
    //Up movement
    if (this.upButton.isDown)
    {
      this.mainChar.body.velocity.y = -140;
      this.follow.x = this.mainChar.body.x + 16;
      this.follow.y = this.mainChar.body.y + 67;
    }

    //Down movement
    if (this.downButton.isDown)
    {
      this.mainChar.body.velocity.y = 140;
      this.follow.x = this.mainChar.body.x + 16;
      this.follow.y = this.mainChar.body.y - 61;
    }

    //Left movement
    if (this.leftButton.isDown)
    {
      this.mainChar.body.velocity.x = -125;
      this.follow.x = this.mainChar.body.x + 80;
      this.follow.y = this.mainChar.body.y + 3;
    }

    //Right movement
    if (this.rightButton.isDown)
    {
      this.mainChar.body.velocity.x = 125;
      this.follow.x = this.mainChar.body.x - 48;
      this.follow.y = this.mainChar.body.y + 3;
    }

    //Diagonal Directions (Up-Left, Up-Right, Down-Left, Down-Right)
    //Up-Left movement
    if (this.upButton.isDown && this.leftButton.isDown)
    {
      this.mainChar.body.velocity.y = -100;
      this.mainChar.body.velocity.x = -100;
      this.follow.x = this.mainChar.body.x + 80;
      this.follow.y = this.mainChar.body.y + 67;
    }

    //Up-Right movement
    if (this.upButton.isDown && this.rightButton.isDown)
    {
      this.mainChar.body.velocity.y = -100;
      this.mainChar.body.velocity.x = 100;
      this.follow.x = this.mainChar.body.x - 48;
      this.follow.y = this.mainChar.body.y + 67;
    }

    //Down-Left movement
    if (this.downButton.isDown && this.leftButton.isDown)
    {
      this.mainChar.body.velocity.y = 100;
      this.mainChar.body.velocity.x = -100;
      this.follow.x = this.mainChar.body.x + 80;
      this.follow.y = this.mainChar.body.y - 61;
    }

    //Down-Right movement
    if (this.downButton.isDown && this.rightButton.isDown)
    {
      this.mainChar.body.velocity.y = 100;
      this.mainChar.body.velocity.x = 100;
      this.follow.x = this.mainChar.body.x - 48;
      this.follow.y = this.mainChar.body.y - 61;
    }
    //animations
    if (this.mainChar.body.velocity.y == 0)
    {
      if (this.mainChar.body.velocity.x < 0)
      {
        this.mainChar.animations.play('left');
        this.sideChar.animations.play('sideLeft');
        //this.walking.play();
      }
      else if (this.mainChar.body.velocity.x > 0)
      {
        this.mainChar.animations.play('right');
        this.sideChar.animations.play('sideRight');
        //this.walking.play();
      }
      //this.mainChar.body.velocity.x = 0;
    }
    if (this.mainChar.body.velocity.x == 0)
    {
      if (this.mainChar.body.velocity.y < 0)
      {
        this.mainChar.animations.play('up');
        this.sideChar.animations.play('sideUp');
      //  this.walking.play();
      }
      else if (this.mainChar.body.velocity.y > 0)
      {
        this.mainChar.animations.play('down');
        this.sideChar.animations.play('sideDown');
      //  this.walking.play();
      }
      //this.mainChar.body.velocity.y = 0;
    }
    if (this.mainChar.body.velocity.x !== 0 && this.mainChar.body.velocity.y !== 0)
    {
      if (this.mainChar.body.velocity.x < 0 && this.mainChar.body.velocity.y < 0)
      {
        this.mainChar.animations.play('upLeft');
        this.sideChar.animations.play('sideUpLeft');
      //  this.walking.play();
      }
      else if (this.mainChar.body.velocity.x > 0 && this.mainChar.body.velocity.y > 0)
      {
        this.mainChar.animations.play('downRight');
        this.sideChar.animations.play('sideDownRight');
      //  this.walking.play();
      }
      else if (this.mainChar.body.velocity.x > 0 && this.mainChar.body.velocity.y < 0)
      {
        this.mainChar.animations.play('upRight');
        this.sideChar.animations.play('sideUpRight');
      //  this.walking.play();
      }
      else if (this.mainChar.body.velocity.x < 0 && this.mainChar.body.velocity.y > 0)
      {
        this.mainChar.animations.play('downLeft');
        this.sideChar.animations.play('sideDownLeft');
      //  this.walking.play();
      }
    }
    if (this.mainChar.body.velocity.x == 0 && this.mainChar.body.velocity.y == 0)
    {
      this.mainChar.animations.stop();
      this.walking.stop();
    }
  }
  }

  if (this.enableSideChar)
  {
    this.walking.stop();
    this.mainChar.animations.stop();
    if (this.space.duration >= 1000 && this.space.isUp)
    {

      if (this.energy > 0)
      {
        //attack sprite
        this.sideCharAttack = this.game.add.sprite(this.sideChar.body.x, this.sideChar.body.y, 'companionAreaAttack');
        this.sideCharAttack.animations.add('areaAttack', Phaser.ArrayUtils.numberArray(0, 11), 15, true);
        this.sideCharAttack.animations.play('areaAttack');
        this.attack.play();
        this.attackExists = true;
        this.sideCharAttack.anchor.x = 0.4;
        this.sideCharAttack.anchor.y = 0.4;

        this.sideCharAnimationDelay = 35;

        this.energy = this.energy - 50;
        this.attackedLast = this.ticks;
        console.log(this.energy);

        //Gate to see if this.struggle exists
        if (this.underAttack)
        {
          //Checks to see if attack hit and takes necessary steps
          if (this.game.physics.arcade.distanceBetween(this.sideChar, this.struggle) <= 155)
          {
            console.log('mainChar in control = true');
            this.enableMainChar = true;
            this.enableSideChar = false;
            this.sideChar.body.velocity.x = 0;
            this.sideChar.body.velocity.y = 0;

            this.game.camera.follow(this.mainChar, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

            this.underAttack = false;
            this.underAttackDelay = 500;
            this.firstAttackAction = true;
          }
        }
        //Reset for next attack
        this.game.time.events.add(1000, this.resetAttack, this, this.sideCharAttack);
        this.game.time.events.add(20000, this.energyRecharge, this, 50);
      }
      else
      {
        // Do Failed Attack things here
        console.log('You are out of energy or you didnt charge long enough');
      }
    }

    //Base condition of sideChar
    //No movement if no keys are pressed
    this.sideChar.body.velocity.x = 0;
    this.sideChar.body.velocity.y = 0;

    //Standard Directions (Up, Down, Left, Right)
    //Up movement
    if (this.upButton.isDown)
    {
      this.sideChar.body.velocity.y = -140;
    }

    //Down movement
    if (this.downButton.isDown)
    {
      this.sideChar.body.velocity.y = 140;
    }

    //Left movement
    if (this.leftButton.isDown)
    {
      this.sideChar.body.velocity.x = -125;
    }

    //Right movement
    if (this.rightButton.isDown)
    {
      this.sideChar.body.velocity.x = 125;
    }

    //Diagonal Directions (Up-Left, Up-Right, Down-Left, Down-Right)
    //Up-Left movement
    if (this.upButton.isDown && this.leftButton.isDown)
    {
      this.sideChar.body.velocity.y = -100;
      this.sideChar.body.velocity.x = -100;
    }

    //Up-Right movement
    if (this.upButton.isDown && this.rightButton.isDown)
    {
      this.sideChar.body.velocity.y = -100;
      this.sideChar.body.velocity.x = 100;
    }

    //Down-Left movement
    if (this.downButton.isDown && this.leftButton.isDown)
    {
      this.sideChar.body.velocity.y = 100;
      this.sideChar.body.velocity.x = -100;
    }

    //Down-Right movement
    if (this.downButton.isDown && this.rightButton.isDown)
    {
      this.sideChar.body.velocity.y = 100;
      this.sideChar.body.velocity.x = 100;
    }
    //animations
    if (this.sideChar.body.velocity.y == 0)
    {
      if (this.sideChar.body.velocity.x < 0)
      {
        if (this.space.isUp)
        {
          this.sideChar.animations.play('sideLeft');
        }
        this.sideCharLastDirection = 7;
      }
      else if (this.sideChar.body.velocity.x > 0)
      {
        if (this.space.isUp)
        {
          this.sideChar.animations.play('sideRight');
        }
        this.sideCharLastDirection = 3;
      }
    }
    if (this.sideChar.body.velocity.x == 0)
    {
      if (this.sideChar.body.velocity.y < 0)
      {
        if (this.space.isUp)
        {
          this.sideChar.animations.play('sideUp');
        }
        this.sideCharLastDirection = 1;
      }
      else if (this.sideChar.body.velocity.y > 0)
      {
        if (this.space.isUp)
        {
          this.sideChar.animations.play('sideDown');
        }
        this.sideCharLastDirection = 5;
      }
    }
    if (this.sideChar.body.velocity.x !== 0 && this.sideChar.body.velocity.y !== 0)
    {
      if (this.sideChar.body.velocity.x < 0 && this.sideChar.body.velocity.y < 0)
      {
        if (this.space.isUp)
        {
          this.sideChar.animations.play('sideUpLeft');
        }
        this.sideCharLastDirection = 0;
      }
      else if (this.sideChar.body.velocity.x > 0 && this.sideChar.body.velocity.y > 0)
      {
        if (this.space.isUp)
        {
          this.sideChar.animations.play('sideDownRight');
        }
        this.sideCharLastDirection = 4;
      }
      else if (this.sideChar.body.velocity.x > 0 && this.sideChar.body.velocity.y < 0)
      {
        if (this.space.isUp)
        {
          this.sideChar.animations.play('sideUpRight');
        }
        this.sideCharLastDirection = 2;
      }
      else if (this.sideChar.body.velocity.x < 0 && this.sideChar.body.velocity.y > 0)
      {
        if (this.space.isUp)
        {
          this.sideChar.animations.play('sideDownLeft');
        }
        this.sideCharLastDirection = 6;
      }
    }
// console.log(this.sideCharLastDirection);
    if (this.space.duration > 0 || this.sideCharAnimationDelay != 0)
    {
      if (this.space.duration < 250 && !this.attackExists)  //charge 1
      {
        if (this.sideCharLastDirection == 0)
        {
          this.sideChar.animations.play('upLeftCharge1');
        }
        else if (this.sideCharLastDirection == 1)
        {
          this.sideChar.animations.play('upCharge1');
        }
        else if (this.sideCharLastDirection == 2)
        {
          this.sideChar.animations.play('upRightCharge1');
        }
        else if (this.sideCharLastDirection == 3)
        {
          this.sideChar.animations.play('rightCharge1');
        }
        else if (this.sideCharLastDirection == 4)
        {
          this.sideChar.animations.play('downRightCharge1');
        }
        else if (this.sideCharLastDirection == 5)
        {
          this.sideChar.animations.play('downCharge1');
        }
        else if (this.sideCharLastDirection == 6)
        {
          this.sideChar.animations.play('downLeftCharge1');
        }
        else if (this.sideCharLastDirection == 7)
        {
          this.sideChar.animations.play('leftCharge1');
        }
      }
      else if (this.space.duration >= 250 && this.space.duration < 500 && !this.attackExists)  //charge 2
      {
        if (this.sideCharLastDirection == 0)
        {
          this.sideChar.animations.play('upLeftCharge2');
        }
        else if (this.sideCharLastDirection == 1)
        {
          this.sideChar.animations.play('upCharge2');
        }
        else if (this.sideCharLastDirection == 2)
        {
          this.sideChar.animations.play('upRightCharge2');
        }
        else if (this.sideCharLastDirection == 3)
        {
          this.sideChar.animations.play('rightCharge2');
        }
        else if (this.sideCharLastDirection == 4)
        {
          this.sideChar.animations.play('downRightCharge2');
        }
        else if (this.sideCharLastDirection == 5)
        {
          this.sideChar.animations.play('downCharge2');
        }
        else if (this.sideCharLastDirection == 6)
        {
          this.sideChar.animations.play('downLeftCharge2');
        }
        else if (this.sideCharLastDirection == 7)
        {
          this.sideChar.animations.play('leftCharge2');
        }
      }
      else if (this.space.duration >= 500 && this.space.duration < 750 && !this.attackExists)  //charge 3
      {
        if (this.sideCharLastDirection == 0)
        {
          this.sideChar.animations.play('upLeftCharge3');
        }
        else if (this.sideCharLastDirection == 1)
        {
          this.sideChar.animations.play('upCharge3');
        }
        else if (this.sideCharLastDirection == 2)
        {
          this.sideChar.animations.play('upRightCharge3');
        }
        else if (this.sideCharLastDirection == 3)
        {
          this.sideChar.animations.play('rightCharge3');
        }
        else if (this.sideCharLastDirection == 4)
        {
          this.sideChar.animations.play('downRightCharge3');
        }
        else if (this.sideCharLastDirection == 5)
        {
          this.sideChar.animations.play('downCharge3');
        }
        else if (this.sideCharLastDirection == 6)
        {
          this.sideChar.animations.play('downLeftCharge3');
        }
        else if (this.sideCharLastDirection == 7)
        {
          this.sideChar.animations.play('leftCharge3');
        }
      }
      else if (this.space.duration >= 750 && this.space.duration < 1000 && !this.attackExists)  //charge 4
      {
        if (this.sideCharLastDirection == 0)
        {
          this.sideChar.animations.play('upLeftCharge4');
        }
        else if (this.sideCharLastDirection == 1)
        {
          this.sideChar.animations.play('upCharge4');
        }
        else if (this.sideCharLastDirection == 2)
        {
          this.sideChar.animations.play('upRightCharge4');
        }
        else if (this.sideCharLastDirection == 3)
        {
          this.sideChar.animations.play('rightCharge4');
        }
        else if (this.sideCharLastDirection == 4)
        {
          this.sideChar.animations.play('downRightCharge4');
        }
        else if (this.sideCharLastDirection == 5)
        {
          this.sideChar.animations.play('downCharge4');
        }
        else if (this.sideCharLastDirection == 6)
        {
          this.sideChar.animations.play('downLeftCharge4');
        }
        else if (this.sideCharLastDirection == 7)
        {
          this.sideChar.animations.play('leftCharge4');
        }
      }
      else if (this.attackExists)  //release
      {
        if (this.sideCharLastDirection == 0)
        {
          this.sideChar.animations.play('upLeftChargeRelease');
        }
        else if (this.sideCharLastDirection == 1)
        {
          this.sideChar.animations.play('upChargeRelease');
        }
        else if (this.sideCharLastDirection == 2)
        {
          this.sideChar.animations.play('upRightChargeRelease');
        }
        else if (this.sideCharLastDirection == 3)
        {
          this.sideChar.animations.play('rightChargeRelease');
        }
        else if (this.sideCharLastDirection == 4)
        {
          this.sideChar.animations.play('downRightChargeRelease');
        }
        else if (this.sideCharLastDirection == 5)
        {
          this.sideChar.animations.play('downChargeRelease');
        }
        else if (this.sideCharLastDirection == 6)
        {
          this.sideChar.animations.play('downLeftChargeRelease');
        }
        else if (this.sideCharLastDirection == 7)
        {
          this.sideChar.animations.play('leftChargeRelease');
        }
      }
      else if (this.space.duration >= 1000 && !this.attackExists)  //ready
      {
        if (this.sideCharLastDirection == 0)
        {
          this.sideChar.animations.play('upLeftChargeReady');
        }
        else if (this.sideCharLastDirection == 1)
        {
          this.sideChar.animations.play('upChargeReady');
        }
        else if (this.sideCharLastDirection == 2)
        {
          this.sideChar.animations.play('upRightChargeReady');
        }
        else if (this.sideCharLastDirection == 3)
        {
          this.sideChar.animations.play('rightChargeReady');
        }
        else if (this.sideCharLastDirection == 4)
        {
          this.sideChar.animations.play('downRightChargeReady');
        }
        else if (this.sideCharLastDirection == 5)
        {
          this.sideChar.animations.play('downChargeReady');
        }
        else if (this.sideCharLastDirection == 6)
        {
          this.sideChar.animations.play('downLeftChargeReady');
        }
        else if (this.sideCharLastDirection == 7)
        {
          this.sideChar.animations.play('leftChargeReady');
        }
      }

      if (this.sideCharAnimationDelay != 0)
      {
        this.sideCharAnimationDelay--;
      }
    }else if (this.sideCharAnimationDelay == 0)
    {

    }
  }

  if (this.attackExists || this.enableMainChar || this.space.isUp)
  {
    this.space.duration = 0;
  }
},

energyRecharge: function(number)
{
  this.energy = this.energy + number;
  //this.lightLinearChange(number);
  console.log(this.energy);
},

lightLinearChange: function(number)
{
  var radius = this.energy + number;
  this.energy = radius;
  console.log('Light Radius: ' + this.energy);
},

// Takes in a sprite and deletes it
deleteSprite: function(tempSprite)
{
  tempSprite.body = null;
  tempSprite.destroy();
},

resetAttack: function(tempSprite)
{
  this.deleteSprite(tempSprite);
  this.attackExists = false;
},

teleportIn: function()
{
    this.teleport.play();
    this.sideChar.animations.play('teleportInLeft');
    this.sideChar.body.x = this.follow.body.x - 32;
    this.sideChar.body.y = this.follow.body.y - 32;
},

//***Enemy Setup***

setUpEnemies: function()
{
  //***Setup Variables***
  var underAttack;
  var underAttackDelay;
  var firstAttackAction;
  var attackingSprite;
  var deathTimer;
  var gameOverAnimationDelay;
  var attackDirection;
  //0 upper left, 1 upper, 2 upper right, 3 right
  //4 lower right, 5 lower, 6 lower left, 7 left

  this.underAttack = false;
  this.underAttackDelay = 0;
  this.firstAttackAction = true;
  this.deathTimer = 100;

  //***Striker***

  this.setUpStrikerGroup();

  //***Rats***

  this.setUpRatGroup();

  //***Reaper***

  this.setUpReaperGroup();

  //***Crab***

  this.setUpCrabGroup();

  //***Wanderer***

  this.setUpWanderer();

},

setUpStrikerGroup: function()
{
    var STRIKER_SPEED;
    var strikerAttackingNum;
    var strikerAnimationDelay;
    var strikerAmount;

    this.STRIKER_SPEED = 50;
    this.strikerAttackingNum = -1;
    this.strikerAnimationDelay = 0;
    this.strikerAmount = 40;
    this.strikerGroupXTopBounds = 400;  //group 1
    this.strikerGroupXBotBounds = 400;
    this.strikerGroupYTopBounds = 350;
    this.strikerGroupYBotBounds = 350;
    this.strikerGroup2XTopBounds = 600;  //group 2
    this.strikerGroup2XBotBounds = 600;
    this.strikerGroup2YTopBounds = 350;
    this.strikerGroup2YBotBounds = 350;
    this.strikerGroup3XTopBounds = 850;  //group 3
    this.strikerGroup3XBotBounds = 750;
    this.strikerGroup3YTopBounds = 200;
    this.strikerGroup3YBotBounds = 150;
    this.strikerGroup4XTopBounds = 1500;  //group 4
    this.strikerGroup4XBotBounds = 1430;
    this.strikerGroup4YTopBounds = 450;
    this.strikerGroup4YBotBounds = 275;
    this.strikerGroup5XTopBounds = 1300;  //group 5
    this.strikerGroup5XBotBounds = 850;
    this.strikerGroup5YTopBounds = 700;
    this.strikerGroup5YBotBounds = 650;
    this.strikerGroup6XTopBounds = 2450;  //group 6
    this.strikerGroup6XBotBounds = 2200;
    this.strikerGroup6YTopBounds = 700;
    this.strikerGroup6YBotBounds = 650;
    this.strikerGroup7XTopBounds = 900;  //group 7
    this.strikerGroup7XBotBounds = 600;
    this.strikerGroup7YTopBounds = 1490;
    this.strikerGroup7YBotBounds = 1480;
    this.strikerGroup8XTopBounds = 900;  //group 8
    this.strikerGroup8XBotBounds = 550;
    this.strikerGroup8YTopBounds = 1975;
    this.strikerGroup8YBotBounds = 1950;
    this.strikerGroup9XTopBounds = 1800;  //group 9
    this.strikerGroup9XBotBounds = 1600;
    this.strikerGroup9YTopBounds = 2500;
    this.strikerGroup9YBotBounds = 2200;
    this.strikerGroup10XTopBounds = 900;  //group 10
    this.strikerGroup10XBotBounds = 800;
    this.strikerGroup10YTopBounds = 2800;
    this.strikerGroup10YBotBounds = 2450;
    this.strikerGroup11XTopBounds = 2150;  //group 11
    this.strikerGroup11XBotBounds = 1225;
    this.strikerGroup11YTopBounds = 2800;
    this.strikerGroup11YBotBounds = 2800;

    //***Striker***

    this.strikerGroup = this.add.group();
    this.strikerGroup.enableBody = true;
    this.strikerGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.strikerGroup.createMultiple(this.strikerAmount, 'strikerMovement');
    this.strikerGroup.setAll('anchor.x', 0.5);
    this.strikerGroup.setAll('anchor.y', 0.5);
    this.strikerGroup.setAll('body.collideWorldBounds', true);
    this.strikerGroup.setAll('worldPosition', 100, 100);
    this.strikerGroup.setAll('immovable', true);

    this.strikerGroup.callAll('animations.add', 'animations', 'walkUp', [8, 9, 10, 23, 24, 25, 38], 7);
    this.strikerGroup.callAll('animations.add', 'animations', 'walkDown', [53, 54, 55, 68, 69, 70, 83], 7);
    this.strikerGroup.callAll('animations.add', 'animations', 'walkLeft', [0, 1, 2, 3, 15, 16, 17, 18, 30, 31, 32, 33], 7);
    this.strikerGroup.callAll('animations.add', 'animations', 'walkRight', [45, 46, 47, 48, 60, 61, 62, 63, 75, 76, 77, 78], 7);
    this.strikerGroup.callAll('animations.add', 'animations', 'walkUpLeft', [4, 5, 6, 7, 19, 20, 21, 22, 34, 35, 36, 37], 7);
    this.strikerGroup.callAll('animations.add', 'animations', 'walkUpRight', [11, 12, 13, 14, 26, 27, 28, 29, 41, 42, 43, 44], 7);
    this.strikerGroup.callAll('animations.add', 'animations', 'walkDownLeft', [56, 57, 58, 59, 71, 72, 73, 74, 86, 87, 88, 89], 7);
    this.strikerGroup.callAll('animations.add', 'animations', 'walkDownRight', [49, 50, 51, 52, 64, 65, 66, 67, 79, 80, 81, 82], 7);
    this.strikerGroup.callAll('animations.add', 'animations', 'idle', [1, 2], 3);

    for (var i = 0; i < this.strikerAmount; i++)
    {
        var striker = this.strikerGroup.children[i];
        striker.childAnimationDelay = 0;
        striker.isStunned = false;
        striker.stunCooldown = 0;
        striker.justAttacked = false;
        striker.stunGate = true;
        //Area for strikers to spawn in
        if (i == 0)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroupXBotBounds + 15, this.strikerGroupXTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroupYBotBounds + 15, this.strikerGroupYTopBounds - 15));
        }else if (i == 1)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup2XBotBounds + 15, this.strikerGroup2XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup2YBotBounds + 15, this.strikerGroup2YTopBounds - 15));
        }else if (i < 5 && i > 1)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup3XBotBounds + 15, this.strikerGroup3XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup3YBotBounds + 15, this.strikerGroup3YTopBounds - 15));
        }else if (i < 7 && i >= 5)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup4XBotBounds + 15, this.strikerGroup4XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup4YBotBounds + 15, this.strikerGroup4YTopBounds - 15));
        }else if (i < 11 && i >= 7)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup5XBotBounds + 15, this.strikerGroup5XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup5YBotBounds + 15, this.strikerGroup5YTopBounds - 15));
        }else if (i < 14 && i >= 11)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup6XBotBounds + 15, this.strikerGroup6XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup6YBotBounds + 15, this.strikerGroup6YTopBounds - 15));
        }else if (i < 18 && i >= 14)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup7XBotBounds + 15, this.strikerGroup7XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup7YBotBounds + 15, this.strikerGroup7YTopBounds - 15));
        }else if (i < 20 && i >= 18)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup8XBotBounds + 15, this.strikerGroup8XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup8YBotBounds + 15, this.strikerGroup8YTopBounds - 15));
        }else if (i < 26 && i >= 20)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup9XBotBounds + 15, this.strikerGroup9XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup9YBotBounds + 15, this.strikerGroup9YTopBounds - 15));
        }else if (i < 32 && i >= 26)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup10XBotBounds + 15, this.strikerGroup10XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup10YBotBounds + 15, this.strikerGroup10YTopBounds - 15));
        }else if (i < 40 && i >= 32)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup11XBotBounds + 15, this.strikerGroup11XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup11YBotBounds + 15, this.strikerGroup11YTopBounds - 15));
        }
    }
},

setUpRatGroup: function()
{
    var RAT_SPEED;
    var ratPassive;
    var ratAttackingNum;
    var ratAnimationDelay;
    var ratAmount;

    this.RAT_SPEED = 50;
    this.ratPassive = true;
    this.ratAttackingNum = -1;
    this.ratAnimationDelay = 0;
    this.ratAmount = 52;
    this.ratGroupXTopBounds = 200;  //first group
    this.ratGroupXBotBounds = 100;
    this.ratGroupYTopBounds = 1200;
    this.ratGroupYBotBounds = 400;
    this.ratGroup2XTopBounds = 1150;  //second group
    this.ratGroup2XBotBounds = 950;
    this.ratGroup2YTopBounds = 1000;
    this.ratGroup2YBotBounds = 900;
    this.ratGroup3XTopBounds = 2100;  //third group
    this.ratGroup3XBotBounds = 1875;
    this.ratGroup3YTopBounds = 1000;
    this.ratGroup3YBotBounds = 400;
    this.ratGroup4XTopBounds = 1700;  //fourth group
    this.ratGroup4XBotBounds = 1050;
    this.ratGroup4YTopBounds = 1500;
    this.ratGroup4YBotBounds = 1425;
    this.ratGroup5XTopBounds = 250;  //fifth group
    this.ratGroup5XBotBounds = 100;
    this.ratGroup5YTopBounds = 2800;
    this.ratGroup5YBotBounds = 1450;
    this.ratGroup6XTopBounds = 2450;  //sixth group
    this.ratGroup6XBotBounds = 1050;
    this.ratGroup6YTopBounds = 2000;
    this.ratGroup6YBotBounds = 1950;

    //***Passive/Aggressive***

    this.ratGroup = this.add.group();
    this.ratGroup.enableBody = true;
    this.ratGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.ratGroup.createMultiple(this.ratAmount, 'ratMovement');
    this.ratGroup.setAll('anchor.x', 0.5);
    this.ratGroup.setAll('anchor.y', 0.5);
    this.ratGroup.setAll('body.collideWorldBounds', true);
    this.ratGroup.setAll('worldPosition', 100, 100);
    this.ratGroup.setAll('immovable', true);

    this.ratGroup.callAll('animations.add', 'animations', 'walkUp', [2, 10, 2, 18, 26], 10, true);
    this.ratGroup.callAll('animations.add', 'animations', 'walkDown', [6, 14, 6, 22, 30], 10, true);
    this.ratGroup.callAll('animations.add', 'animations', 'walkLeft', [0, 8, 16, 8, 24], 10, true);
    this.ratGroup.callAll('animations.add', 'animations', 'walkRight', [4, 12, 20, 12, 28], 10, true);
    this.ratGroup.callAll('animations.add', 'animations', 'walkUpLeft', [1, 9, 17, 9, 25], 10, true);
    this.ratGroup.callAll('animations.add', 'animations', 'walkUpRight', [3, 11, 19, 11, 27], 10, true);
    this.ratGroup.callAll('animations.add', 'animations', 'walkDownLeft', [7, 15, 23, 15, 31], 10, true);
    this.ratGroup.callAll('animations.add', 'animations', 'walkDownRight', [5, 13, 21, 13, 29], 10, true);

    for (var i = 0; i < this.ratAmount; i++)
    {
        var rat = this.ratGroup.children[i];
        rat.isStunned = false;
        rat.stunCooldown = 0;
        rat.justAttacked = false;
        rat.stunGate = true;
        rat.ratWanderDelay = 300;
        //Area for rats to spawn in
        if (i < 10)
        {
        rat.reset(this.game.rnd.integerInRange(this.ratGroupXBotBounds + 15, this.ratGroupXTopBounds - 15),
                  this.game.rnd.integerInRange(this.ratGroupYBotBounds + 15, this.ratGroupYTopBounds - 15));
        }
        if (i < 15 && i > 10)
        {
        rat.reset(this.game.rnd.integerInRange(this.ratGroup2XBotBounds + 15, this.ratGroup2XTopBounds - 15),
                  this.game.rnd.integerInRange(this.ratGroup2YBotBounds + 15, this.ratGroup2YTopBounds - 15));
        }
        if (i < 23 && i > 15)
        {
        rat.reset(this.game.rnd.integerInRange(this.ratGroup3XBotBounds + 15, this.ratGroup3XTopBounds - 15),
                  this.game.rnd.integerInRange(this.ratGroup3YBotBounds + 15, this.ratGroup3YTopBounds - 15));
        }
        if (i < 31 && i > 23)
        {
        rat.reset(this.game.rnd.integerInRange(this.ratGroup4XBotBounds + 15, this.ratGroup4XTopBounds - 15),
                  this.game.rnd.integerInRange(this.ratGroup4YBotBounds + 15, this.ratGroup4YTopBounds - 15));
        }
        if (i < 46 && i > 31)
        {
        rat.reset(this.game.rnd.integerInRange(this.ratGroup5XBotBounds + 15, this.ratGroup5XTopBounds - 15),
                  this.game.rnd.integerInRange(this.ratGroup5YBotBounds + 15, this.ratGroup5YTopBounds - 15));
        }
        if (i < 52 && i > 46)
        {
        rat.reset(this.game.rnd.integerInRange(this.ratGroup6XBotBounds + 15, this.ratGroup6XTopBounds - 15),
                  this.game.rnd.integerInRange(this.ratGroup6YBotBounds + 15, this.ratGroup6YTopBounds - 15));
        }
    }
},

setUpReaperGroup: function()
{
    var REAPER_SPEED;
    var reaperAttackingNum;
    var reaperAnimationDelay;
    var reaperAggressive;
    var reaperAmount;

    this.REAPER_SPEED = 50;
    this.reaperAttackingNum = -1;
    this.reaperAnimationDelay = 0;
    this.reaperAggressive = false;
    this.reaperAmount = 4;
    this.reaperBunnyGroupXTopBounds = 1725;  //group 1
    this.reaperBunnyGroupXBotBounds = 1725;
    this.reaperBunnyGroupYTopBounds = 200;
    this.reaperBunnyGroupYBotBounds = 200;
    this.reaperGroupX = 2450;  //group 1
    this.reaperGroupY = 200;
    this.reaperBunnyGroup2XTopBounds = 1625;  //group 2
    this.reaperBunnyGroup2XBotBounds = 1625;
    this.reaperBunnyGroup2YTopBounds = 1200;
    this.reaperBunnyGroup2YBotBounds = 1200;
    this.reaperGroup2X = 2200;  //group 2
    this.reaperGroup2Y = 1225;
    this.reaperBunnyGroup3XTopBounds = 2150;  //group 3
    this.reaperBunnyGroup3XBotBounds = 2150;
    this.reaperBunnyGroup3YTopBounds = 1725;
    this.reaperBunnyGroup3YBotBounds = 1725;
    this.reaperGroup3X = 1500;  //group 3
    this.reaperGroup3Y = 1725;
    this.reaperBunnyGroup4XTopBounds = 1100;  //group 4
    this.reaperBunnyGroup4XBotBounds = 1100;
    this.reaperBunnyGroup4YTopBounds = 2225;
    this.reaperBunnyGroup4YBotBounds = 2225;
    this.reaperGroup4X = 1800;  //group 4
    this.reaperGroup4Y = 2250;

    //***Reaper***

    this.reaperGroup = this.add.group();
    this.reaperGroup.enableBody = true;
    this.reaperGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.reaperGroup.createMultiple(this.reaperAmount, 'reaperLeft');
    this.reaperGroup.setAll('anchor.x', 0.5);
    this.reaperGroup.setAll('anchor.y', 0.5);
    this.reaperGroup.setAll('body.collideWorldBounds', true);
    this.reaperGroup.setAll('worldPosition', 100, 100);
    this.reaperGroup.setAll('immovable', true);

    this.reaperGroup.callAll('animations.add', 'animations', 'idle', [0, 1], 3, true);
    this.reaperGroup.callAll('animations.add', 'animations', 'attackLeft', Phaser.ArrayUtils.numberArray(0, 22), 8);
    this.reaperGroup.callAll('animations.add', 'animations', 'attackLeftStruggle', Phaser.ArrayUtils.numberArray(9, 22), 7);
    this.reaperGroup.callAll('animations.add', 'animations', 'death', Phaser.ArrayUtils.numberArray(9, 25), 7);

    for (var i = 0; i < this.reaperAmount; i++)
    {
        var reaper = this.reaperGroup.children[i];
        //Area for reaperBunny to spawn in
        if (i == 0)
        {
          reaper.reset(this.reaperGroupX, this.reaperGroupY);
        }else if (i == 1)
        {
          reaper.reset(this.reaperGroup2X, this.reaperGroup2Y);
        }else if (i == 2)
        {
          reaper.reset(this.reaperGroup3X, this.reaperGroup3Y);
        }else if (i == 3)
        {
          reaper.reset(this.reaperGroup4X, this.reaperGroup4Y);
        }
    }

    this.reaperBunnyGroup = this.add.group();
    this.reaperBunnyGroup.enableBody = true;
    this.reaperBunnyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.reaperBunnyGroup.createMultiple(this.reaperAmount, 'reaperAttackLeft');
    this.reaperBunnyGroup.setAll('anchor.x', 0.5);
    this.reaperBunnyGroup.setAll('anchor.y', 0.5);
    this.reaperBunnyGroup.setAll('body.collideWorldBounds', true);
    this.reaperBunnyGroup.setAll('worldPosition', 100, 100);
    this.reaperBunnyGroup.setAll('immovable', true);

    this.reaperBunnyGroup.callAll('animations.add', 'animations', 'idle', [24, 25], 3, true);
    this.reaperBunnyGroup.callAll('animations.add', 'animations', 'hurtPull', [25, 24, 23, 22, 21, 20], 5);

    for (var i = 0; i < this.reaperAmount; i++)
    {
        var reaperBunny = this.reaperBunnyGroup.children[i];
        //Area for reaperBunny to spawn in
        if (i == 0)
        {
        reaperBunny.reset(this.game.rnd.integerInRange(this.reaperBunnyGroupXBotBounds + 15, this.reaperBunnyGroupXTopBounds - 15),
                          this.game.rnd.integerInRange(this.reaperBunnyGroupYBotBounds + 15, this.reaperBunnyGroupYTopBounds - 15));
        }else if (i == 1)
        {
        reaperBunny.reset(this.game.rnd.integerInRange(this.reaperBunnyGroup2XBotBounds + 15, this.reaperBunnyGroup2XTopBounds - 15),
                          this.game.rnd.integerInRange(this.reaperBunnyGroup2YBotBounds + 15, this.reaperBunnyGroup2YTopBounds - 15));
        }else if (i == 2)
        {
        reaperBunny.reset(this.game.rnd.integerInRange(this.reaperBunnyGroup3XBotBounds + 15, this.reaperBunnyGroup3XTopBounds - 15),
                          this.game.rnd.integerInRange(this.reaperBunnyGroup3YBotBounds + 15, this.reaperBunnyGroup3YTopBounds - 15));
        }else if (i == 3)
        {
        reaperBunny.reset(this.game.rnd.integerInRange(this.reaperBunnyGroup4XBotBounds + 15, this.reaperBunnyGroup4XTopBounds - 15),
                          this.game.rnd.integerInRange(this.reaperBunnyGroup4YBotBounds + 15, this.reaperBunnyGroup4YTopBounds - 15));
        }
    }
},

setUpCrabGroup: function()
{
    var crabAttackingNum;
    var crabAnimationDelay;
    var crabAmount;
    var crabGroupXTopBounds;  //group 1
    var crabGroupXBotBounds;
    var crabGroupYTopBounds;
    var crabGroupYBotBounds;

    this.crabAttackingNum = -1;
    this.crabAnimationDelay = 0;
    this.crabAmount = 11;
    this.crabGroupXTopBounds = 1750;  //group 1
    this.crabGroupXBotBounds = 1250;
    this.crabGroupYTopBounds = 950;
    this.crabGroupYBotBounds = 800;
    this.crabGroup2XTopBounds = 2250;  //group 2
    this.crabGroup2XBotBounds = 1850;
    this.crabGroup2YTopBounds = 1700;
    this.crabGroup2YBotBounds = 1450;

    //***Crab***

    this.crabGroup = this.add.group();
    this.crabGroup.enableBody = true;
    this.crabGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.crabGroup.createMultiple(this.crabAmount, 'crab');
    this.crabGroup.setAll('anchor.x', 0.5);
    this.crabGroup.setAll('anchor.y', 0.5);
    this.crabGroup.setAll('body.collideWorldBounds', true);
    this.crabGroup.setAll('worldPosition', 100, 100);
    this.crabGroup.setAll('immovable', true);

    for (var i = 0; i < this.crabAmount; i++)
    {
        var crab = this.crabGroup.children[i];
        crab.isStunned = false;
        crab.stunCooldown = 0;
        crab.justAttacked = false;
        crab.stunGate = true;
        //Area for crabs to spawn in
        if (i < 5)
        {
        crab.reset(100 * i + this.crabGroupXBotBounds + 25,
                    this.game.rnd.integerInRange(this.crabGroupYBotBounds + 15, this.crabGroupYTopBounds - 15));
        }else if (i < 11 && i >= 5)
        {
        crab.reset(this.game.rnd.integerInRange(this.crabGroup2XBotBounds + 15, this.crabGroup2XTopBounds - 15),
                      this.game.rnd.integerInRange(this.crabGroup2YBotBounds + 15, this.crabGroup2YTopBounds - 15));
        }
    }
},

setUpWanderer: function()
{
    var WANDERER_SPEED;
    var DELAY;
    var turnDelay;
    var lastTouch;  //0 = top, 1 = bottom, 2 = left, 3 = right
    var wanderDelay;
    var wandererAnimationDelay;
    var wandererIsStunned;
    var wandererStunCooldown;

    var rightT;
    var leftT;
    var upT;
    var downT;
    var fourWay;

    this.WANDERER_SPEED = 50; // pixels/second
    this.DELAY = 100;
    this.wanderDelay = 500;
    this.turnDelay = 0;
    this.wandererAnimationDelay = 0;
    this.wandererIsStunned = false;
    this.wandererStunCooldown = 0;

    this.rightT = new Phaser.Rectangle(0, 0, 10, 10);
    this.leftT = new Phaser.Rectangle(0, 0, 10, 10);
    this.upT = new Phaser.Rectangle(0, 0, 10, 10);
    this.downT = new Phaser.Rectangle(0, 0, 10, 10);
    this.fourWay = new Phaser.Rectangle(0, 0, 10, 10);

    //***Setup wanderer Body***
    this.wanderer = this.game.add.sprite(600, 1700, 'strikerMovement');
    this.game.physics.enable(this.wanderer, Phaser.Physics.ARCADE);
    this.wanderer.body.velocity.setTo(this.WANDERER_SPEED, 0);
    this.wanderer.anchor.setTo(0.5, 0.5);
    this.wanderer.body.immovable = true;
    this.wanderer.body.collideWorldBounds = true;

    this.wanderer.animations.add('walkUp', [8, 9, 10, 23, 24, 25, 38], 7);
    this.wanderer.animations.add('walkDown', [53, 54, 55, 68, 69, 70, 83], 7);
    this.wanderer.animations.add('walkLeft', [0, 1, 2, 3, 15, 16, 17, 18, 30, 31, 32, 33], 7);
    this.wanderer.animations.add('walkRight', [45, 46, 47, 48, 60, 61, 62, 63, 75, 76, 77, 78], 7);
    this.wanderer.animations.add('walkUpLeft', [4, 5, 6, 7, 19, 20, 21, 22, 34, 35, 36, 37], 7);
    this.wanderer.animations.add('walkUpRight', [11, 12, 13, 14, 26, 27, 28, 29, 41, 42, 43, 44], 7);
    this.wanderer.animations.add('walkDownLeft', [56, 57, 58, 59, 71, 72, 73, 74, 86, 87, 88, 89], 7);
    this.wanderer.animations.add('walkDownRight', [49, 50, 51, 52, 64, 65, 66, 67, 79, 80, 81, 82], 7);
    this.wanderer.animations.add('idle', [1, 2], 3);
},

enemyCollisions: function()
{
  //***Striker***

  this.strikerActions();

  //***Passive/Aggressive***

  this.ratsActions();

  //***Reaper***

  this.reaperActions();

  //***Crab***

  this.crabActions();

  //***Wanderer***

  this.wandererActions();

  //***Attack Animations***

  this.attackAnimations();

  if (this.underAttackDelay != 0)
  {
    this.underAttackDelay--;
  }
  if (this.ratAnimationDelay != 0)
  {
    this.ratAnimationDelay--;
  }
  if (this.reaperAnimationDelay != 0)
  {
    this.reaperAnimationDelay--;
  }
  if (this.strikerAnimationDelay != 0)
  {
    this.strikerAnimationDelay--;
  }
  if (this.crabAnimationDelay != 0)
  {
    this.crabAnimationDelay--;
  }
},

detectAttack: function(spriteA, spriteB)
{
  if (this.underAttack == false && this.underAttackDelay == 0)
  {
    var xValue;
    var yValue;
    var xFaceBuffer;
    var yFaceBuffer;

    this.xValue = spriteB.body.x + (spriteB.body.width / 2) - (spriteA.body.x + (spriteA.body.width / 2));
    this.yValue = spriteB.body.y + (spriteB.body.height / 2) - (spriteA.body.y + (spriteA.body.height / 2));
    this.xFaceBuffer = spriteB.body.width / 3;
    this.yFaceBuffer = spriteB.body.height / 3;

    if (this.xValue < -this.xFaceBuffer && this.yValue > this.yFaceBuffer)
    {
      this.attackDirection = 6;
    }else if (this.xValue >= -this.xFaceBuffer && this.xValue <= this.xFaceBuffer && this.yValue > 0)
    {
      this.attackDirection = 5;
    }else if (this.xValue > this.xFaceBuffer && this.yValue > this.yFaceBuffer)
    {
      this.attackDirection = 4;
    }else if (this.xValue > 0 && this.yValue >= -this.yFaceBuffer && this.yValue <= this.yFaceBuffer)
    {
      this.attackDirection = 3;
    }else if (this.xValue > this.xFaceBuffer && this.yValue < -this.yFaceBuffer)
    {
      this.attackDirection = 2;
    }else if (this.xValue >= -this.xFaceBuffer && this.xValue <= this.xFaceBuffer && this.yValue < 0)
    {
      this.attackDirection = 1;
    }else if (this.xValue < -this.xFaceBuffer && this.yValue < -this.yFaceBuffer)
    {
      this.attackDirection = 0;
    }else if (this.xValue < 0 && this.yValue >= -this.yFaceBuffer && this.yValue <= this.yFaceBuffer)
    {
      this.attackDirection = 7;
    }

    spriteA.alpha = 0;
    spriteB.alpha = 0;
    spriteA.body.velocity.setTo(0, 0);
    spriteB.body.velocity.setTo(0, 0);
    this.underAttack = true;

    for (var i = 0; i < this.ratAmount; i++)
    {
        var rat = this.ratGroup.children[i];
        //Stop all rats
        rat.body.velocity.setTo(0, 0);
    }
  }else if (this.underAttackDelay == 500)
  {
    spriteA.alpha = 1;
    spriteB.alpha = 1;
    this.deleteSprite(this.struggle);
    this.ratPassive = true;
  }
},

strikerActions: function()
{
  for (var i = 0; i < this.strikerAmount; i++)
  {
      var striker = this.strikerGroup.children[i];
      this.game.physics.arcade.collide(striker, this.layer);
      this.game.physics.arcade.collide(striker, this.strikerGroup);
      //striker moves toward player
      if (this.game.physics.arcade.distanceBetween(striker, this.mainChar) > 300 || this.underAttack == true)
      {
        striker.body.velocity.setTo(0, 0);
        //striker.animations.play('idle');
      }else if (this.underAttackDelay < 1 && !striker.isStunned)
      {
        if (striker.childAnimationDelay == 0)
        {
          striker.strikerRadians = this.game.physics.arcade.angleBetween(striker, this.mainChar);
          striker.strikerDegrees = striker.strikerRadians * (180 / Math.PI);
        }
        if (striker.childAnimationDelay < 35 && striker.childAnimationDelay != 0)
        {
          this.game.physics.arcade.velocityFromAngle(striker.strikerDegrees, 75, striker.body.velocity);
        }else
        {
          this.game.physics.arcade.velocityFromAngle(striker.strikerDegrees, 10, striker.body.velocity);
          this.walkAnimations(striker, true);
        }
        if (this.game.physics.arcade.distanceBetween(striker, this.mainChar) < 70)
        {
          this.strikerAttackingNum = i;
          this.game.physics.arcade.collide(striker, this.mainChar, null, this.detectAttack, this);
        }
      }

      if (this.strikerAttackingNum == i && this.underAttackDelay == 500)
      {
        this.detectAttack(striker, this.mainChar);
      }else if (this.strikerAttackingNum == i && this.underAttack == false)
      {
        this.strikerAttackingNum = -1;
      }

      //Stun check
      if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideCharAttack, striker) <= 155 && this.energy > 0)
      {
        striker.justAttacked = true;
        if (striker.justAttacked && striker.stunGate)
        {
          console.log('striker is stunned!');
          striker.isStunned = true;
          striker.stunCooldown = this.game.time.totalElapsedSeconds() + 5;
          striker.stunGate = false;

          console.log('stunned spawned');
          striker.stunned = this.game.add.sprite(striker.body.x, striker.body.y, 'stunned');
          striker.stunned.animations.add('stunned', [0, 1, 2], 9, true);
          striker.stunned.animations.play('stunned');
        }
      }
      //Stun cooldown
      if (striker.isStunned)
      {
        if (striker.stunCooldown > this.game.time.totalElapsedSeconds())
        {
          striker.body.velocity.x = 0;
          striker.body.velocity.y = 0;
        }
        else
        {
          console.log('striker has recovered');
          striker.isStunned = false;
          striker.stunGate = true;

          this.deleteSprite(striker.stunned);
        }
      }

      if (striker.childAnimationDelay != 0)
      {
        striker.childAnimationDelay--;
      }
  }
},

wandererActions: function()
{
  //***Wanderer Collisions***
  this.game.physics.arcade.collide(this.wanderer, this.layer);
  //this.game.physics.arcade.collide(this.wanderer, this.strikerGroup);
  this.game.physics.arcade.collide(this.wanderer, this.mainChar, null, this.detectAttack, this);

  if (this.game.physics.arcade.distanceBetween(this.wanderer, this.mainChar) < 150 && this.underAttackDelay < 100 && !this.wandererIsStunned)
  {
    this.wandererRadians = this.game.physics.arcade.angleBetween(this.wanderer, this.mainChar);
    this.wandererDegrees = this.wandererRadians * (180 / Math.PI);
    this.game.physics.arcade.velocityFromAngle(this.wandererDegrees, this.WANDERER_SPEED * 2, this.wanderer.body.velocity);
  }
  if (this.underAttack == false && !this.wandererIsStunned)
  {
    this.intersectionCheck();
    this.wallCheck();
    this.wander(this.wanderer, this.WANDERER_SPEED);
  }

  //Stun check
  if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideCharAttack, this.wanderer) <= 155 && this.energy > 0)
  {
    console.log('wanderer is stunned!');
    this.wandererIsStunned = true;
    this.wandererStunCooldown = this.game.time.totalElapsedSeconds() + 5;
    this.attackExists = false;

    console.log('stunned spawned');
    this.stunned = this.game.add.sprite(this.wanderer.body.x, this.wanderer.body.y, 'stunned');
    this.stunned.animations.add('stunned', [0, 1, 2], 9, true);
    this.stunned.animations.play('stunned');
  }
  //Stun cooldown
  if (this.wandererIsStunned)
  {
    if (this.wandererStunCooldown > this.game.time.totalElapsedSeconds())
    {
      this.wanderer.body.velocity.x = 0;
      this.wanderer.body.velocity.y = 0;
    }
    else
    {
      console.log('wanderer has recovered');
      this.wandererIsStunned = false;

      this.deleteSprite(this.stunned);
    }
  }

  this.walkAnimations(this.wanderer, false);

  if (this.wandererAnimationDelay != 0)
  {
    this.wandererAnimationDelay--;
  }
},

ratsActions: function()
{
  for (var i = 0; i < this.ratAmount; i++)
  {
      var rat = this.ratGroup.children[i];
      this.game.physics.arcade.collide(rat, this.layer);
      //rat out of artifical bounds
      if (this.underAttack == false && !rat.isStunned)
      {
        if (i < 10 &&
            rat.body.x < this.ratGroupXBotBounds || rat.body.x > this.ratGroupXTopBounds ||
            rat.body.y < this.ratGroupYBotBounds || rat.body.y > this.ratGroupYTopBounds)
        {
          this.ratWander(rat, this.RAT_SPEED, true);
        }else
        {
          this.ratWander(rat, this.RAT_SPEED, false);
        }
        if (i < 15 && i > 10 &&
            rat.body.x < this.ratGroup2XBotBounds || rat.body.x > this.ratGroup2XTopBounds ||
            rat.body.y < this.ratGroup2YBotBounds || rat.body.y > this.ratGroup2YTopBounds)
        {
          this.ratWander(rat, this.RAT_SPEED, true);
        }else
        {
          this.ratWander(rat, this.RAT_SPEED, false);
        }
        if (i < 23 && i > 15 &&
            rat.body.x < this.ratGroup3XBotBounds || rat.body.x > this.ratGroup3XTopBounds ||
            rat.body.y < this.ratGroup3YBotBounds || rat.body.y > this.ratGroup3YTopBounds)
        {
          this.ratWander(rat, this.RAT_SPEED, true);
        }else
        {
          this.ratWander(rat, this.RAT_SPEED, false);
        }
        if (i < 31 && i > 23 &&
            rat.body.x < this.ratGroup4XBotBounds || rat.body.x > this.ratGroup4XTopBounds ||
            rat.body.y < this.ratGroup4YBotBounds || rat.body.y > this.ratGroup4YTopBounds)
        {
          this.ratWander(rat, this.RAT_SPEED, true);
        }else
        {
          this.ratWander(rat, this.RAT_SPEED, false);
        }
        if (i < 46 && i > 31 &&
            rat.body.x < this.ratGroup5XBotBounds || rat.body.x > this.ratGroup5XTopBounds ||
            rat.body.y < this.ratGroup5YBotBounds || rat.body.y > this.ratGroup5YTopBounds)
        {
          this.ratWander(rat, this.RAT_SPEED, true);
        }else
        {
          this.ratWander(rat, this.RAT_SPEED, false);
        }
        if (i < 52 && i > 46 &&
            rat.body.x < this.ratGroup6XBotBounds || rat.body.x > this.ratGroup6XTopBounds ||
            rat.body.y < this.ratGroup6YBotBounds || rat.body.y > this.ratGroup6YTopBounds)
        {
          this.ratWander(rat, this.RAT_SPEED, true);
        }else
        {
          this.ratWander(rat, this.RAT_SPEED, false);
        }
      }
      //rat interaction with player
      if (this.game.physics.arcade.distanceBetween(rat, this.mainChar) < 150 && this.ratPassive && !rat.isStunned)
      {
        this.ratRadians = this.game.physics.arcade.angleBetween(rat, this.mainChar);
        this.ratDegrees = this.ratRadians * (180 / Math.PI);
        this.game.physics.arcade.velocityFromAngle(this.ratDegrees, -this.RAT_SPEED * 2, rat.body.velocity);
        //rat trapped in corner
        if ((rat.body.blocked.down && rat.body.blocked.left ||
            rat.body.blocked.down && rat.body.blocked.right ||
            rat.body.blocked.up && rat.body.blocked.left ||
            rat.body.blocked.up && rat.body.blocked.right) &&
            this.game.physics.arcade.distanceBetween(rat, this.mainChar) < 100 &&
            this.underAttackDelay == 0)
            {
              this.ratPassive = false;
            }
      }
      //Stun check
      if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideCharAttack, rat) <= 155 && this.energy > 0)
      {
        rat.justAttacked = true;
        if (rat.justAttacked && rat.stunGate)
        {
          console.log('rat is stunned!');
          rat.isStunned = true;
          rat.stunCooldown = this.game.time.totalElapsedSeconds() + 5;
          rat.stunGate = false;

          console.log('stunned spawned');
          rat.stunned = this.game.add.sprite(rat.body.x, rat.body.y, 'stunned');
          rat.stunned.animations.add('stunned', [0, 1, 2], 9, true);
          rat.stunned.animations.play('stunned');
        }
      }
      //Stun cooldown
      if (rat.isStunned)
      {
        if (rat.stunCooldown > this.game.time.totalElapsedSeconds())
        {
          rat.body.velocity.x = 0;
          rat.body.velocity.y = 0;
        }
        else
        {
          console.log('rat has recovered');
          rat.isStunned = false;
          rat.stunGate = true;
          rat.justAttacked = false;

          this.deleteSprite(rat.stunned);
        }
      }

      if (this.ratPassive == false)
      {
        if (this.underAttack == false && this.underAttackDelay == 0 &&
            this.game.physics.arcade.distanceBetween(rat, this.mainChar) < 100)
        {
          this.ratRadians = this.game.physics.arcade.angleBetween(rat, this.mainChar);
          this.ratDegrees = this.ratRadians * (180 / Math.PI);
          this.game.physics.arcade.velocityFromAngle(this.ratDegrees, this.RAT_SPEED * 2, rat.body.velocity);
          this.ratAttackingNum = i;
          this.game.physics.arcade.collide(rat, this.mainChar, null, this.detectAttack, this);
        }
        if (this.ratAttackingNum == i && this.underAttackDelay == 500)
        {
          this.detectAttack(rat, this.mainChar);
          rat.kill();
          this.ratAttackingNum = -1;
        }
      }

      this.walkAnimations(rat, false);
  }
},

reaperActions: function()
{
  for (var i = 0; i < this.reaperAmount; i++)
  {
      var bunny = this.reaperBunnyGroup.children[i];
      var reaper = this.reaperGroup.children[i];
      this.game.physics.arcade.collide(bunny, this.layer);
      this.game.physics.arcade.collide(reaper, this.layer);

      if (this.reaperAggressive == false)
      {
        if (this.underAttackDelay < 1 && this.underAttack == false && this.game.physics.arcade.distanceBetween(bunny, this.mainChar) < 70)
        {
          this.reaperAttackingNum = i;
          this.game.physics.arcade.collide(bunny, this.mainChar, null, this.detectAttack, this);
        }

        if (this.reaperAttackingNum == i && this.underAttackDelay == 500)
        {
          this.detectAttack(bunny, this.mainChar);
        }else if (this.reaperAttackingNum == i && this.underAttack == false)
        {
          this.reaperAttackingNum = -1;
        }

        if (this.underAttack == false && this.reaperAnimationDelay == 0)
        {
          bunny.animations.play('idle');
          reaper.animations.play('idle');
          if (this.underAttackDelay == 500)
          {
            bunny.body.velocity.setTo(0, 0);
          }
        }
      }else if (this.reaperAttackingNum == i)
      {
        if (reaper.alpha != 0)  //first action
        {
          if (this.game.physics.arcade.distanceBetween(bunny, reaper) > 55)
          { //pull the hurt bunny towards reaper body
            if (this.reaperAnimationDelay == 24)
            {
              bunny.animations.play('hurtPull');
              reaper.animations.play('attackLeft');
            }
            this.reaperRadians = this.game.physics.arcade.angleBetween(bunny, reaper);
            this.reaperDegrees = this.reaperRadians * (180 / Math.PI);
            this.game.physics.arcade.velocityFromAngle(this.reaperDegrees, 90, bunny.body.velocity);
          }else if (this.reaperAnimationDelay == 0)
          {
            bunny.alpha = 0;
            reaper.alpha = 0;
            this.aggressiveReaper = this.game.add.sprite(reaper.body.x + 20, reaper.body.y + 40, 'reaperAggressive');
            this.game.physics.enable(this.aggressiveReaper, Phaser.Physics.ARCADE);
            this.aggressiveReaper.anchor.setTo(0.5, 0.5);

            this.aggressiveReaper.animations.add('walkUp', [4, 5, 12, 13], 8, true);
            this.aggressiveReaper.animations.add('walkDown', [28, 29, 36, 37], 8, true);
            this.aggressiveReaper.animations.add('walkLeft', [0, 1, 8, 9, 16], 8, true);
            this.aggressiveReaper.animations.add('walkRight', [24, 25, 32, 33, 40], 8, true);
            this.aggressiveReaper.animations.add('walkUpLeft', [2, 3, 10, 11, 18], 8, true);
            this.aggressiveReaper.animations.add('walkUpRight', [6, 7, 14, 15, 22], 8, true);
            this.aggressiveReaper.animations.add('walkDownLeft', [30, 31, 38, 39, 46], 8, true);
            this.aggressiveReaper.animations.add('walkDownRight', [26, 27, 34, 35, 42], 8, true);
          }else
          {
            bunny.body.velocity.setTo(0, 0);
          }
          if (this.reaperAnimationDelay != 0)
          {
            this.reaperAnimationDelay--;
          }
        }else
        {
          this.reaperRadians = this.game.physics.arcade.angleBetween(this.aggressiveReaper, this.mainChar);
          this.reaperDegrees = this.reaperRadians * (180 / Math.PI);
          this.game.physics.arcade.velocityFromAngle(this.reaperDegrees, 140, this.aggressiveReaper.body.velocity);
          this.game.physics.arcade.collide(this.aggressiveReaper, this.layer);
          this.game.physics.arcade.collide(this.aggressiveReaper, this.mainChar, null, this.detectAttack, this);

          if (this.reaperAggressive && this.game.physics.arcade.distanceBetween(this.aggressiveReaper, this.mainChar) > 800)
          {
            this.aggressiveReaper.body.velocity.setTo(0, 0);
          }

          this.walkAnimations(this.aggressiveReaper, false);
        }
      }

      if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideChar, bunny) <= 155 && this.energy > 0)
      {
        if (this.aggressiveReaper != undefined && this.aggressiveReaper != null)
        {
          this.aggressiveReaper.body.velocity.setTo(0, 0);
        }
        this.reaperAggressive = true;
        this.reaperAttackingNum = i;
        this.reaperAnimationDelay = 25;
      }
  }
},

crabActions: function()
{
  for (var i = 0; i < this.crabAmount; i++)
  {
      var crab = this.crabGroup.children[i];
      this.game.physics.arcade.collide(crab, this.layer);

      if (this.underAttackDelay < 1 && this.game.physics.arcade.distanceBetween(crab, this.mainChar) < 70 && !crab.isStunned)
      {
        this.crabAttackingNum = i;
        this.game.physics.arcade.collide(crab, this.mainChar, null, this.detectAttack, this);
      }

      if (this.crabAttackingNum == i && this.underAttackDelay == 500)
      {
        this.detectAttack(crab, this.mainChar);
      }else if (this.crabAttackingNum == i && this.underAttack == false)
      {
        this.crabAttackingNum = -1;
      }

      //Stun check
      if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideChar, crab) <= 155 && this.energy > 0)
      {
        crab.justAttacked = true;
        if (crab.justAttacked && crab.stunGate)
        {
          console.log('crab is stunned!');
          crab.isStunned = true;
          crab.stunCooldown = this.game.time.totalElapsedSeconds() + 5;
          crab.stunGate = false;

          console.log('stunned spawned');
          crab.stunned = this.game.add.sprite(crab.body.x, crab.body.y, 'stunned');
          crab.stunned.animations.add('stunned', [0, 1, 2], 9, true);
          crab.stunned.animations.play('stunned');
        }
      }
      //Stun cooldown
      if (crab.isStunned)
      {
        if (crab.stunCooldown > this.game.time.totalElapsedSeconds())
        {
          crab.body.velocity.x = 0;
          crab.body.velocity.y = 0;
        }
        else
        {
          console.log('crab has recovered');
          crab.isStunned = false;
          crab.stunGate = true;
          crab.justAttacked = false;

          this.deleteSprite(crab.stunned);
        }
      }
  }
},

roundDirection: function(spriteA)
{
  //***Change velocity to run along wall***
  if (spriteA.body.velocity.x > 0 || spriteA.body.velocity.x < 0)
  {
    spriteA.body.velocity.y = 0;
  }else if (spriteA.body.velocity.y > 0 || spriteA.body.velocity.y < 0)
  {
    spriteA.body.velocity.x = 0;
  }
},

wallCheck: function()
{
  //***Follow Wall***
  if (this.wanderer.body.velocity.x != 0)
  {
    if (this.wanderer.body.blocked.up ||
        this.wanderer.body.blocked.down)
    {
      this.roundDirection(this.wanderer);
      if (this.wanderer.body.blocked.up)
      {
        this.lastTouch = 0;
      }else
      {
        this.lastTouch = 1;
      }
    }
  }else if (this.wanderer.body.velocity.y != 0)
  {
    if (this.wanderer.body.blocked.left ||
        this.wanderer.body.blocked.right)
    {
      this.roundDirection(this.wanderer);
      if (this.wanderer.body.blocked.left)
      {
        this.lastTouch = 2;
      }else
      {
        this.lastTouch = 3;
      }
    }
  }else
  {
    this.cornerCheck(this.lastTouch);
  }
  if (this.wanderer.body.velocity.x == 0 && this.wanderer.body.velocity.y == 0)
  {
    this.wanderer.body.velocity.setTo(((this.game.rnd.integer() % 3) - 1) * this.WANDERER_SPEED,
                                 ((this.game.rnd.integer() % 3) - 1) * this.WANDERER_SPEED);
  }
},

cornerCheck: function(touch)
{
  //***Corners***
  if (this.wanderer.body.deltaY() == 0 &&  //bottom right
      this.wanderer.body.blocked.right &&
      touch == 1)
  {
    this.wanderer.body.velocity.setTo(0, -this.WANDERER_SPEED);
    this.lastTouch = 3;                          //last/wall
  }else if (this.wanderer.body.deltaY() == 0 &&  //top right
            this.wanderer.body.blocked.right &&
            touch == 0)
  {
    this.wanderer.body.velocity.setTo(0, this.WANDERER_SPEED);
    this.lastTouch = 3;
  }else if (this.wanderer.body.deltaY() == 0 &&  //bottom left
            this.wanderer.body.blocked.left &&
            touch == 1)
  {
    this.wanderer.body.velocity.setTo(0, -this.WANDERER_SPEED);
    this.lastTouch = 2;
  }else if (this.wanderer.body.deltaY() == 0 &&  //top left
            this.wanderer.body.blocked.left &&
            touch == 0)
  {
    this.wanderer.body.velocity.setTo(0, this.WANDERER_SPEED);
    this.lastTouch = 2;
  }else if (this.wanderer.body.deltaX() == 0 &&  //right top
            this.wanderer.body.blocked.up &&
            touch == 3)
  {
    this.wanderer.body.velocity.setTo(-this.WANDERER_SPEED, 0);
    this.lastTouch = 0;
  }else if (this.wanderer.body.deltaX() == 0 &&  //left top
            this.wanderer.body.blocked.up &&
            touch == 2)
  {
    this.wanderer.body.velocity.setTo(this.WANDERER_SPEED, 0);
    this.lastTouch = 0;
  }else if (this.wanderer.body.deltaX() == 0 &&  //right bottom
            this.wanderer.body.blocked.down &&
            touch == 3)
  {
    this.wanderer.body.velocity.setTo(-this.WANDERER_SPEED, 0);
    this.lastTouch = 1;
  }else if (this.wanderer.body.deltaX() == 0 &&  //left top
            this.wanderer.body.blocked.down &&
            touch == 2)
  {
    this.wanderer.body.velocity.setTo(this.WANDERER_SPEED, 0);
    this.lastTouch = 1;
  }
},

intersectionCheck: function()
{
  //***Intersection Turn***
  if (this.turnDelay == 0)
  {
    if (this.checkOverlap(this.wanderer, this.rightT))
    {
      this.intersectChoose(this.rightT);
      this.turnDelay = this.DELAY;
    }else if (this.checkOverlap(this.wanderer, this.leftT))
    {
      this.intersectChoose(this.leftT);
      this.turnDelay = this.DELAY;
    }else if (this.checkOverlap(this.wanderer, this.upT))
    {
      this.intersectChoose(this.upT);
      this.turnDelay = this.DELAY;
    }else if (this.checkOverlap(this.wanderer, this.downT))
    {
      this.intersectChoose(this.downT);
      this.turnDelay = this.DELAY;
    }else if (this.checkOverlap(this.wanderer, this.fourWay))
    {
      this.intersectChoose(this.fourWay);
      this.turnDelay = this.DELAY;
    }
  }else
  {
    this.turnDelay = this.turnDelay - 1;
  }
},

checkOverlap: function(spriteA, spriteB)
{
  var overlap = Phaser.Rectangle.intersects(spriteA, spriteB);
  var intersectCenter = false;
  var buffer = 15;
  var sprXCenter = 20;
  var sprYCenter = 50;
  var leftBuffer = spriteA.x - buffer + sprXCenter;
  var rightBuffer = spriteA.x + buffer + sprXCenter;
  var topBuffer = spriteA.y - buffer + sprYCenter;
  var bottomBuffer = spriteA.y + buffer + sprYCenter;

  if (spriteB.x >= leftBuffer && spriteB.x <= rightBuffer && spriteB.y >= topBuffer && spriteB.y <= bottomBuffer)
  {
    intersectCenter = true;
  }

  return intersectCenter;
},

intersectChoose: function(type)
{
  var turn = this.game.rnd.integer() % 3;

  //***Each intersection***
  if (type == this.rightT)
  {
    if (turn == 0)
    {
      this.wanderer.body.velocity.setTo(0, -this.WANDERER_SPEED);  //up
      this.lastTouch = 2;
    }else if (turn == 1)
    {
      this.wanderer.body.velocity.setTo(0, this.WANDERER_SPEED);  //down
      this.lastTouch = 2;
    }else
    {
      this.wanderer.body.velocity.setTo(this.WANDERER_SPEED, 0);  //right
      this.lastTouch = 0;
    }
  }
  if (type == this.leftT)
  {
    if (turn == 0)
    {
      this.wanderer.body.velocity.setTo(0, -this.WANDERER_SPEED);  //up
      this.lastTouch = 3;    //0 = top, 1 = bottom, 2 = left, 3 = right
    }else if (turn == 1)
    {
      this.wanderer.body.velocity.setTo(0, this.WANDERER_SPEED);  //down
      this.lastTouch = 3;
    }else
    {
      this.wanderer.body.velocity.setTo(-this.WANDERER_SPEED, 0);  //left
      this.lastTouch = 0;
    }
  }
  if (type == this.upT)
  {
    if (turn == 0)
    {
      this.wanderer.body.velocity.setTo(0, -this.WANDERER_SPEED);  //up
      this.lastTouch = 3;
    }else if (turn == 1)
    {
      this.wanderer.body.velocity.setTo(-this.WANDERER_SPEED, 0);  //left
      this.lastTouch = 1;
    }else
    {
      this.wanderer.body.velocity.setTo(this.WANDERER_SPEED, 0);  //right
      this.lastTouch = 1;
    }
  }
  if (type == this.downT)
  {
    if (turn == 0)
    {
      this.wanderer.body.velocity.setTo(0, this.WANDERER_SPEED);  //down
      this.lastTouch = 3;
    }else if (turn == 1)
    {
      this.wanderer.body.velocity.setTo(-this.WANDERER_SPEED, 0);  //left
      this.lastTouch = 0;
    }else
    {
      this.wanderer.body.velocity.setTo(this.WANDERER_SPEED, 0);  //right
      this.lastTouch = 0;
    }
  }
  if (type == this.fourWay)
  {
    turn = this.game.rnd.integer() % 4;

    if (turn == 0)
    {
      this.wanderer.body.velocity.setTo(0, -this.WANDERER_SPEED);  //up
      this.lastTouch = 3;
    }else if (turn == 1)
    {
      this.wanderer.body.velocity.setTo(0, this.WANDERER_SPEED);  //down
      this.lastTouch = 3;
    }else if (turn == 2)
    {
      this.wanderer.body.velocity.setTo(-this.WANDERER_SPEED, 0);  //left
      this.lastTouch = 0;
    }else
    {
      this.wanderer.body.velocity.setTo(this.WANDERER_SPEED, 0);  //right
      this.lastTouch = 0;
    }
  }
},

wander: function(spriteA, speed)
{
  if (this.wanderDelay == 0)
  {
    if (spriteA.body.velocity.x == 0)
    {
      spriteA.body.velocity.x = ((this.game.rnd.integer() % 3) - 1) * speed;
    }else if (spriteA.body.velocity.y == 0)
    {
      spriteA.body.velocity.y = ((this.game.rnd.integer() % 3) - 1) * speed;
    }
    this.wanderDelay = 300;
  }else
  {
    this.wanderDelay -= 1;
  }
},

ratWander: function(spriteA, speed, outOfBounds)
{
  if (spriteA.ratWanderDelay < 5 && outOfBounds == false)
  {
    spriteA.body.velocity.x = ((this.game.rnd.integer() % 3) - 1) * speed;
    spriteA.body.velocity.y = ((this.game.rnd.integer() % 3) - 1) * speed;
    spriteA.ratWanderDelay = this.game.rnd.integerInRange(500, 1000);
  }else if (spriteA.ratWanderDelay == 150 && outOfBounds == false)
  {
    if ((this.game.rnd.integer() % 5) == 1)
    {
      spriteA.body.velocity.setTo(0, 0);
    }
  }else if (spriteA.ratWanderDelay < 5 && outOfBounds)
  {
    if (spriteA.body.x > this.ratGroupXTopBounds)
    {
      spriteA.body.velocity.x = speed * -1;
    }else if (spriteA.body.x < this.ratGroupXBotBounds)
    {
      spriteA.body.velocity.x = speed;
    }
    if (spriteA.body.y > this.ratGroupYTopBounds)
    {
      spriteA.body.velocity.y = speed * -1;
    }else if (spriteA.body.y < this.ratGroupYBotBounds)
    {
      spriteA.body.velocity.y = speed;
    }
    spriteA.ratWanderDelay = this.game.rnd.integerInRange(1000, 2000);
  }
  if (spriteA.ratWanderDelay > 0)
  {
    spriteA.ratWanderDelay -= 1;
  }
},

walkAnimations: function(spriteA, isStriker)
{
  if (spriteA.body.velocity.x < -20 && spriteA.body.velocity.y < -20)
  {
    spriteA.animations.play('walkUpLeft');
  }
  else if (spriteA.body.velocity.x > 20 && spriteA.body.velocity.y < -20)
  {
    spriteA.animations.play('walkUpRight');
  }
  else if (spriteA.body.velocity.x < -20 && spriteA.body.velocity.y > 20)
  {
    spriteA.animations.play('walkDownLeft');
  }
  else if (spriteA.body.velocity.x > 20 && spriteA.body.velocity.y > 20)
  {
    spriteA.animations.play('walkDownRight');
  }
  else if (spriteA.body.velocity.y < -20)
  {
    spriteA.animations.play('walkUp');
  }
  else if (spriteA.body.velocity.y > 20)
  {
    spriteA.animations.play('walkDown');
  }
  else if (spriteA.body.velocity.x < 0)
  {
    spriteA.animations.play('walkLeft');
  }
  else if (spriteA.body.velocity.x > 0)
  {
    spriteA.animations.play('walkRight');
  }
  else
  {
    spriteA.animations.stop();
  }

  if (isStriker)
  {
    if (spriteA.childAnimationDelay == 0)
    {
      spriteA.childAnimationDelay = 110;
    }
  }
},

attackAnimations: function()
{
    if (this.ratAttackingNum != -1 && this.underAttack)
    {
      if (this.firstAttackAction)
      {
        //setup visible animation sprite
        this.struggle = this.game.add.sprite(this.mainChar.body.x - 32,
                                             this.mainChar.body.y - 29, 'ratAttack');
        this.game.physics.enable(this.struggle, Phaser.Physics.ARCADE);
        this.attackingSprite = this.struggle;

        if (this.attackDirection == 0 ||
            this.attackDirection == 1 ||
            this.attackDirection == 5 ||
            this.attackDirection == 6 ||
            this.attackDirection == 7) //left attack
        {
          //add animations
          this.struggle.animations.add('attack', [0, 1, 2, 6, 7, 8, 12], 8);
          this.struggle.animations.add('attackStruggle', [13, 14, 18, 19, 20, 24, 25, 26, 30, 31, 32, 36], 3);
        }else //right attack
        {
          //add animations
          this.struggle.animations.add('attack', [3, 4, 5, 9, 10, 11, 15], 8);
          this.struggle.animations.add('attackStruggle', [16, 17, 21, 22, 23, 27, 28, 29, 33, 34, 35, 39], 3);
        }
        //play first attack animation
        this.struggle.animations.play('attack');
        this.mice.play();
        this.ratAnimationDelay = 45;
        this.deathTimer = 200;
        this.gameOverAnimationDelay = 100;
      }else if (this.underAttack == true)
      {
        if (this.ratAnimationDelay == 0)
        { //once animation is done play struggle
          if (this.gameOverAnimationDelay == 100)
          {
            this.struggle.animations.play('attackStruggle');
          }
          if (this.deathTimer == 0)//player recieves enough damage to die
          {
            this.enableSideChar = false;
            this.sideChar.body.velocity.setTo(0, 0);
            if (this.gameOverAnimationDelay == 0)
            {
              this.mice.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 5);
              this.walking.stop();
              this.music.stop();
              this.water.stop();
            }else
            {
              this.gameOverAnimationDelay--;
            }
          }else
          {
            this.deathTimer--;
          }
        }
      }
    }else if (this.strikerAttackingNum != -1 && this.underAttack)
    {
      this.strikerSound.play();
      if (this.firstAttackAction)
      {
        //setup visible animation sprite

        if (this.attackDirection == 0 ||
            this.attackDirection == 6 ||
            this.attackDirection == 7) //left attack
        {
          this.struggle = this.game.add.sprite(this.strikerGroup.children[this.strikerAttackingNum].body.x,
                                               this.strikerGroup.children[this.strikerAttackingNum].body.y, 'strikerAttack');
          //add animations
          this.struggle.animations.add('attack', [4, 5, 6, 7, 12, 13, 14, 15], 8);
          this.struggle.animations.add('attackStruggle', [20, 21, 22, 23, 28, 29], 3);

          this.strikerAnimationDelay = 45;
        }else if (this.attackDirection == 2 ||
                  this.attackDirection == 3 ||
                  this.attackDirection == 4)//right attack
        {
          this.struggle = this.game.add.sprite(this.strikerGroup.children[this.strikerAttackingNum].body.x,
                                               this.strikerGroup.children[this.strikerAttackingNum].body.y, 'strikerAttack');
          //add animations
          this.struggle.animations.add('attack', [0, 1, 2, 3, 8, 9, 10, 11], 8);
          this.struggle.animations.add('attackStruggle', [16, 17, 18, 19, 24, 25], 3);

          this.strikerAnimationDelay = 45;
        }else if (this.attackDirection == 1)//up attack
        {
          this.struggle = this.game.add.sprite(this.strikerGroup.children[this.strikerAttackingNum].body.x,
                                               this.strikerGroup.children[this.strikerAttackingNum].body.y, 'strikerAttackUp');
          //add animations
          this.struggle.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 8);
          this.struggle.animations.add('attackStruggle', [11, 12, 13, 14, 15, 16], 3);

          this.strikerAnimationDelay = 75;
        }else if (this.attackDirection == 5)//down attack
        {
          this.struggle = this.game.add.sprite(this.strikerGroup.children[this.strikerAttackingNum].body.x,
                                               this.strikerGroup.children[this.strikerAttackingNum].body.y, 'strikerAttackDown');
          //add animations
          this.struggle.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 8);
          this.struggle.animations.add('attackStruggle', [11, 12, 13, 14, 15, 16], 3);

          this.strikerAnimationDelay = 75;
        }

        this.game.physics.enable(this.struggle, Phaser.Physics.ARCADE);
        this.attackingSprite = this.struggle;

        //play first attack animation
        this.struggle.animations.play('attack');
        this.strikerSound.play();
        this.deathTimer = 200;
        this.gameOverAnimationDelay = 100;
      }else if (this.underAttack == true)
      {
        if (this.strikerAnimationDelay == 0)
        { //once animation is done play struggle
          if (this.gameOverAnimationDelay == 100)
          {
            this.struggle.animations.play('attackStruggle');
          }
          if (this.deathTimer == 0)//player recieves enough damage to die
          {
            this.enableSideChar = false;
            this.sideChar.body.velocity.setTo(0, 0);
            if (this.gameOverAnimationDelay == 0)
            {
              this.strikerSound.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 5);
              this.walking.stop();
              this.music.stop();
              this.water.stop();
            }else
            {
              this.gameOverAnimationDelay--;
            }
          }else
          {
            this.deathTimer--;
          }
        }
      }
    }else if (this.reaperAttackingNum != -1 && this.underAttack)
    {
      if (this.firstAttackAction)
      {
        if (this.reaperAggressive)
        {
          this.reaperBunnyGroup.children[this.reaperAttackingNum].body.x = this.aggressiveReaper.body.x - 40;
          this.reaperBunnyGroup.children[this.reaperAttackingNum].body.y = this.aggressiveReaper.body.y + 35;
          this.reaperGroup.children[this.reaperAttackingNum].body.x = this.aggressiveReaper.body.x;
          this.reaperGroup.children[this.reaperAttackingNum].body.y = this.aggressiveReaper.body.y;
          this.reaperGroup.children[this.reaperAttackingNum].alpha = 1;
          this.deleteSprite(this.aggressiveReaper);
        }

        if (this.attackDirection == 0 ||
            this.attackDirection == 1 ||
            this.attackDirection == 5 ||
            this.attackDirection == 6 ||
            this.attackDirection == 7) //left attack
        {
          this.struggle = this.game.add.sprite(this.reaperBunnyGroup.children[this.reaperAttackingNum].body.x,
                                               this.reaperBunnyGroup.children[this.reaperAttackingNum].body.y, 'reaperAttackLeft');
        }else //right attack
        {
          this.struggle = this.game.add.sprite(this.reaperBunnyGroup.children[this.reaperAttackingNum].body.x,
                                               this.reaperBunnyGroup.children[this.reaperAttackingNum].body.y, 'reaperAttackRight');
        }

        //setup visible animation sprite
        this.game.physics.enable(this.struggle, Phaser.Physics.ARCADE);
        this.game.physics.arcade.collide(this.struggle, this.layer);
        this.attackingSprite = this.struggle;
        //add animations
        if (this.reaperAggressive)
        {
          this.struggle.animations.add('attack', Phaser.ArrayUtils.numberArray(7, 15), 8);
          this.struggle.animations.add('attackStruggle', Phaser.ArrayUtils.numberArray(16, 18), 3);
          this.struggle.animations.add('death', Phaser.ArrayUtils.numberArray(18, 25), 8);
          this.reaperAnimationDelay = 45;
        }else
        {
          this.struggle.animations.add('attack', Phaser.ArrayUtils.numberArray(0, 15), 8);
          this.struggle.animations.add('attackStruggle', Phaser.ArrayUtils.numberArray(16, 18), 3);
          this.struggle.animations.add('death', Phaser.ArrayUtils.numberArray(18, 25), 8);
          this.reaperAnimationDelay = 85;

          this.reaperGroup.children[this.reaperAttackingNum].animations.play('attackLeft');
        }
        //play first attack animation
        this.struggle.animations.play('attack');
        this.monster.play();
        this.reaperAggressive = false;
        this.gameOverAnimationDelay = 170;
      }else if (this.underAttack == true)
      {
        if (this.reaperAnimationDelay == 0)
        { //once animation is done play struggle
          if (this.gameOverAnimationDelay == 170)
          {
            this.struggle.animations.play('attackStruggle');
            this.reaperGroup.children[this.reaperAttackingNum].animations.play('attackLeftStruggle');
          }
          if (this.game.physics.arcade.distanceBetween(this.struggle, this.reaperGroup.children[this.reaperAttackingNum]) > 75)
          { //pull the stuggle animation towards reaper body
            this.reaperRadians = this.game.physics.arcade.angleBetween(this.struggle, this.reaperGroup.children[this.reaperAttackingNum]);
            this.reaperDegrees = this.reaperRadians * (180 / Math.PI);
            this.game.physics.arcade.velocityFromAngle(this.reaperDegrees, 30, this.struggle.body.velocity);
            this.game.physics.arcade.velocityFromAngle(this.reaperDegrees, 30, this.reaperBunnyGroup.children[this.reaperAttackingNum].body.velocity);
          }else
          { //struggle made it to the body and player is eaten GAME OVER
            this.struggle.body.velocity.setTo(0, 0);
            this.reaperBunnyGroup.children[this.reaperAttackingNum].body.velocity.setTo(0, 0);
            if (this.gameOverAnimationDelay == 170)
            {
              this.struggle.animations.play('death');
              this.reaperGroup.children[this.reaperAttackingNum].animations.play('death');
              this.enableSideChar = false;
              this.sideChar.body.velocity.setTo(0, 0);
            }
            if (this.gameOverAnimationDelay == 0)
            {
              this.monster.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 5);
              this.walking.stop();
              this.music.stop();
              this.water.stop();
            }else
            {
              this.gameOverAnimationDelay--;
            }
          }
        }
      }
    }else if (this.crabAttackingNum != -1 && this.underAttack)
    {
      if (this.firstAttackAction)
      {
        //setup visible animation sprite
        this.struggle = this.game.add.sprite(this.crabGroup.children[this.crabAttackingNum].body.x, this.crabGroup.children[this.crabAttackingNum].body.y, 'crabAttack');
        this.game.physics.enable(this.struggle, Phaser.Physics.ARCADE);
        this.attackingSprite = this.struggle;
        if (this.attackDirection == 0 ||
            this.attackDirection == 1 ||
            this.attackDirection == 5 ||
            this.attackDirection == 6 ||
            this.attackDirection == 7) //left attack
        {
          //add animations
          this.struggle.animations.add('attack', [5, 6, 7, 8, 9], 8);
          this.struggle.animations.add('attackStruggle', [15, 16, 17, 18, 19, 25], 3);
          this.struggle.animations.add('death', [25, 26, 27, 28, 29, 35, 36, 37, 38, 39, 45, 46, 47], 8);
        }else //right attack
        {
          //add animations
          this.struggle.animations.add('attack', [0, 1, 2, 3, 4], 8);
          this.struggle.animations.add('attackStruggle', [10, 11, 12, 13, 14, 20], 3);
          this.struggle.animations.add('death', [20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 40, 41, 42], 8);
        }
        //play first attack animation
        this.struggle.animations.play('attack');
        this.crab.play();
        this.crabAnimationDelay = 45;
        this.deathTimer = 200;
        this.gameOverAnimationDelay = 150;
      }else if (this.underAttack == true)
      {
        if (this.crabAnimationDelay == 0)
        { //once animation is done play struggle
          if (this.gameOverAnimationDelay == 150)
          {
            this.struggle.animations.play('attackStruggle');
          }
          if (this.deathTimer == 0)//player recieves enough damage to die
          {
            if (this.gameOverAnimationDelay == 150)
            {
              this.struggle.animations.play('death');
              this.enableSideChar = false;
              this.sideChar.body.velocity.setTo(0, 0);
            }
            if (this.gameOverAnimationDelay == 0)
            {
              this.crab.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 5);
              this.walking.stop();
              this.music.stop();
              this.water.stop();
            }else
            {
              this.gameOverAnimationDelay--;
            }
          }else
          {
            this.deathTimer--;
          }
        }
      }
    }else if (this.underAttack)
    {
      //this.strikerSound.play();
      if (this.firstAttackAction)
      {
        //setup visible animation sprite

        if (this.attackDirection == 0 ||
            this.attackDirection == 6 ||
            this.attackDirection == 7) //left attack
        {
          this.struggle = this.game.add.sprite(this.wanderer.body.x,
                                               this.wanderer.body.y, 'strikerAttack');
          //add animations
          this.struggle.animations.add('attack', [4, 5, 6, 7, 12, 13, 14, 15], 8);
          this.struggle.animations.add('attackStruggle', [20, 21, 22, 23, 28, 29], 3);

          this.strikerAnimationDelay = 45;
        }else if (this.attackDirection == 2 ||
                  this.attackDirection == 3 ||
                  this.attackDirection == 4)//right attack
        {
          this.struggle = this.game.add.sprite(this.wanderer.body.x,
                                               this.wanderer.body.y, 'strikerAttack');
          //add animations
          this.struggle.animations.add('attack', [0, 1, 2, 3, 8, 9, 10, 11], 8);
          this.struggle.animations.add('attackStruggle', [16, 17, 18, 19, 24, 25], 3);

          this.strikerAnimationDelay = 45;
        }else if (this.attackDirection == 1)//up attack
        {
          this.struggle = this.game.add.sprite(this.wanderer.body.x,
                                               this.wanderer.body.y, 'strikerAttackUp');
          //add animations
          this.struggle.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 8);
          this.struggle.animations.add('attackStruggle', [11, 12, 13, 14, 15, 16], 3);

          this.strikerAnimationDelay = 75;
        }else if (this.attackDirection == 5)//down attack
        {
          this.struggle = this.game.add.sprite(this.wanderer.body.x,
                                               this.wanderer.body.y, 'strikerAttackDown');
          //add animations
          this.struggle.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 8);
          this.struggle.animations.add('attackStruggle', [11, 12, 13, 14, 15, 16], 3);

          this.strikerAnimationDelay = 75;
        }

        this.game.physics.enable(this.struggle, Phaser.Physics.ARCADE);
        this.attackingSprite = this.struggle;

        //play first attack animation
        this.struggle.animations.play('attack');
        this.deathTimer = 200;
        this.gameOverAnimationDelay = 100;
      }else if (this.underAttack == true)
      {
        if (this.strikerAnimationDelay == 0)
        { //once animation is done play struggle
          if (this.gameOverAnimationDelay == 100)
          {
            this.struggle.animations.play('attackStruggle');
          }
          if (this.deathTimer == 0)//player recieves enough damage to die
          {
            this.enableSideChar = false;
            this.sideChar.body.velocity.setTo(0, 0);
            if (this.gameOverAnimationDelay == 0)
            {
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 5);
            }else
            {
              this.gameOverAnimationDelay--;
            }
          }else
          {
            this.deathTimer--;
          }
        }
      }
    }
},

};

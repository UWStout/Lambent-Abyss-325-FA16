var PrototypeMaze = PrototypeMaze || {};

PrototypeMaze.Game = function() {};

PrototypeMaze.LevelTut = {

  create: function() {

    // Create torch objects
    // Torch constructor
    var torch = function(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'torch');

        // Set the pivot point for this sprite to the center
        this.anchor.setTo(0.5, 0.5);
    };

    // Torches are a type of Phaser.Sprite
    torch.prototype = Object.create(Phaser.Sprite.prototype);
    torch.prototype.constructor = torch;

    //Tilemap setup
    var map;
    var layer;

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    this.map = this.game.add.tilemap('TutMap', 64, 64);

    //  Now add in the tileset
    this.map.addTilesetImage('tiles');

    //  Create our layer
    this.layer = this.map.createLayer(0);

    //  Resize the world
    this.layer.resizeWorld();

    //Set wall collision with tilemap
    this.map.setCollisionBetween(0, 17);

    //  Un-comment this on to see the collision tiles
    // this.layer.debug = true;

    //static objects
    this.bones1 = this.game.add.image(511, 240, 'bones1');
    this.bones2 = this.game.add.image(940, 163, 'bones3');
    this.bones3 = this.game.add.image(875, 460, 'bones5');
    this.roots1 = this.game.add.image(300, 200, 'roots2');
    this.roots4 = this.game.add.image(950, 150, 'roots');
    this.stalactice1 = this.game.add.image(1350, 2160, 'Stalactite3');
    this.stalactice2 = this.game.add.image(300, 1880, 'Stalactite_broken');
    this.stalactice3 = this.game.add.image(325, 1890, 'Stalactite_small4');
    this.stalactice4 = this.game.add.image(1225, 1750, 'Stalactite2');
    this.stalactice5 = this.game.add.image(1300, 1780, 'Stalactite4');
    this.stalactice6 = this.game.add.image(1155, 2375, 'Stalactite_small');
    this.stalactice7 = this.game.add.image(385, 2800, 'Stalactite_small_broken2');
    this.stalactice8 = this.game.add.image(1490, 2800, 'Stalactite');
    this.stalactice9 = this.game.add.image(1965, 2730, 'Stalactite_small_broken');
    this.stalactice10 = this.game.add.image(2450, 2660, 'Stalactite_small4');
    this.stalactice11 = this.game.add.image(1575, 2075, 'Stalactite_small3');
    this.stalactice12 = this.game.add.image(2400, 2150, 'Stalactite_broken2');
    this.skeleton = this.game.add.image(2400, 1700, 'skeleton');
    this.coins = this.game.add.sprite(2400, 1725, 'coins');
    this.coins.anchor.setTo(0.5, 0.5);
    this.coins.collected = false;

    //treasure animations
    this.coins.animations.add('twinkle', [0, 1, 2, 3, 4, 5, 6], 3, true);
    this.coins.animations.play('twinkle');

    this.setUpEnemies();

    this.text1 = this.game.add.sprite(350, 150, 'wasd');
    this.text2 = this.game.add.sprite(350, 750, 'shift');
    this.text3 = this.game.add.sprite(350, 2050, 'switch');
    this.text6 = this.game.add.sprite(2000, 2737, 'stairs');

    this.levelDoor = this.game.add.sprite(2465, 3008, 'door');
    this.mainChar = this.game.add.sprite(720, 335, 'player');
    this.sideChar = this.game.add.sprite(720, 300, 'companion');

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

    //add torch group
    this.torches = this.game.add.group();
    this.torches.add(new torch(this.game, 550, 1625));
    this.torches.add(new torch(this.game, 620, 2525));
    this.torches.add(new torch(this.game, 1815, 2075));
    this.torches.add(new torch(this.game, 2135, 2400));
    this.torches.add(new torch(this.game, 2495, 2800));

    //animation for torch
    this.torches.callAll('animations.add', 'animations', 'flicker', [0, 1, 2], 3.5, true);
    this.torches.callAll('animations.play', 'animations', 'flicker');


    // The radius of the circle of light
    this.LIGHT_RADIUS = 150;

    this.music = this.game.add.audio('maze1Music');
    this.water = this.game.add.audio('driplet');
    this.music.loop = true;
    this.water.loop = true;
    //steps.play();
    this.water.play('', 0.3, 0.5);
    this.music.play();

    this.crab = this.game.add.audio('crab');
    this.mice = this.game.add.audio('mice');
    this.monster = this.game.add.audio('monster');
    this.strikerSound = this.game.add.audio('strikerSound');
    this.flesh = this.game.add.audio('flesh');
    this.wandererSound = this.game.add.audio('wandererSound');
    this.walking = this.game.add.audio('walking', 0.5);
    this.attack = this.game.add.audio('attack');
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
    this.torches.forEach(function(torch, game, torches) {
      torches.push(createTorch(game, torch.x, torch.y));
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
    var v = createTorch(this.game, 720, 335);
    v.filter.r = 1;
    v.filter.g = 1;
    v.filter.b = 1;
    v.filter.radius = 0.6;
    this.torchFilters.push(v);
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

    this.stepCooldown = this.ticks;
    this.energy_interpol = 150;
  },

  update: function() {

    if (this.game.physics.arcade.distanceBetween(this.mainChar, this.text1) > 700)
    {
      this.text1.destroy();
    }

    if (this.game.physics.arcade.distanceBetween(this.mainChar, this.text1) > 3000)
    {
      this.text3.destroy();
    }

    if (!this.coins.collected && this.game.physics.arcade.distanceBetween(this.mainChar, this.coins) < 5)
    {
      this.coins.collected = true;
      this.coinSound.play();
      this.coins.destroy();
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
  this.game.state.start('TutCS');

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
    this.text2.destroy();
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
        this.text5 = this.game.add.sprite(350, 2650, 'release');
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

  //this.setUpWanderer();

},

setUpStrikerGroup: function()
{
    var STRIKER_SPEED;
    var strikerAttackingNum;
    var strikerAnimationDelay;
    var strikerAmount;
    var strikerGroupXTopBounds;  //group 1
    var strikerGroupXBotBounds;
    var strikerGroupYTopBounds;
    var strikerGroupYBotBounds;
    var strikerGroup2XTopBounds;  //group 2
    var strikerGroup2XBotBounds;
    var strikerGroup2YTopBounds;
    var strikerGroup2YBotBounds;
    var strikerGroup3XTopBounds;  //group 3
    var strikerGroup3XBotBounds;
    var strikerGroup3YTopBounds;
    var strikerGroup3YBotBounds;
    var strikerGroup4XTopBounds;  //group 4
    var strikerGroup4XBotBounds;
    var strikerGroup4YTopBounds;
    var strikerGroup4YBotBounds;

    this.STRIKER_SPEED = 50;
    this.strikerAttackingNum = -1;
    this.strikerAnimationDelay = 0;
    this.strikerAmount = 1;
    this.strikerGroupXTopBounds = 650;  //group 1
    this.strikerGroupXBotBounds = 845;
    this.strikerGroupYTopBounds = 2565;
    this.strikerGroupYBotBounds = 2565;

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
        // if (i < 6)
        // {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroupXBotBounds + 15, this.strikerGroupXTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroupYBotBounds + 15, this.strikerGroupYTopBounds - 15));
        // }else if (i < 12 && i >= 6)
        // {
        // striker.reset(this.game.rnd.integerInRange(this.strikerGroup2XBotBounds + 15, this.strikerGroup2XTopBounds - 15),
        //               this.game.rnd.integerInRange(this.strikerGroup2YBotBounds + 15, this.strikerGroup2YTopBounds - 15));
        // }else if (i < 14 && i >= 12)
        // {
        // striker.reset(this.game.rnd.integerInRange(this.strikerGroup3XBotBounds + 15, this.strikerGroup3XTopBounds - 15),
        //               this.game.rnd.integerInRange(this.strikerGroup3YBotBounds + 15, this.strikerGroup3YTopBounds - 15));
        // }else if (i < 18 && i >= 14)
        // {
        // striker.reset(this.game.rnd.integerInRange(this.strikerGroup4XBotBounds + 15, this.strikerGroup4XTopBounds - 15),
        //               this.game.rnd.integerInRange(this.strikerGroup4YBotBounds + 15, this.strikerGroup4YTopBounds - 15));
        // }
    }
},

setUpRatGroup: function()
{
    var RAT_SPEED;
    var ratPassive;
    var ratWanderDelay;
    var ratAttackingNum;
    var ratAnimationDelay;
    var ratAmount;
    var ratGroupXTopBounds;  //first group
    var ratGroupXBotBounds;
    var ratGroupYTopBounds;
    var ratGroupYBotBounds;
    var ratGroup2XTopBounds;  //second group
    var ratGroup2XBotBounds;
    var ratGroup2YTopBounds;
    var ratGroup2YBotBounds;

    this.RAT_SPEED = 50;
    this.ratPassive = true;
    this.ratWanderDelay = 300;
    this.ratAttackingNum = -1;
    this.ratAnimationDelay = 0;
    this.ratAmount = 5;
    this.ratGroupXTopBounds = 1080;  //first group
    this.ratGroupXBotBounds = 350;
    this.ratGroupYTopBounds = 560;
    this.ratGroupYBotBounds = 145;
    this.ratGroup2XTopBounds = 2000;  //second group
    this.ratGroup2XBotBounds = 1000;
    this.ratGroup2YTopBounds = 2400;
    this.ratGroup2YBotBounds = 2150;

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
        //Area for rats to spawn in
        // if (i < 5)
        // {
        rat.reset(this.game.rnd.integerInRange(this.ratGroupXBotBounds + 15, this.ratGroupXTopBounds - 15),
                  this.game.rnd.integerInRange(this.ratGroupYBotBounds + 15, this.ratGroupYTopBounds - 15));
        // }
        // if (i < 15 && i > 4)
        // {
        // rat.reset(this.game.rnd.integerInRange(this.ratGroup2XBotBounds + 15, this.ratGroup2XTopBounds - 15),
        //           this.game.rnd.integerInRange(this.ratGroup2YBotBounds + 15, this.ratGroup2YTopBounds - 15));
        // }
    }
},

setUpReaperGroup: function()
{
    var REAPER_SPEED;
    var reaperAttackingNum;
    var reaperAnimationDelay;
    var reaperAggressive;
    var reaperAmount;
    var reaperBunnyGroupXTopBounds;  //group 1
    var reaperBunnyGroupXBotBounds;
    var reaperBunnyGroupYTopBounds;
    var reaperBunnyGroupYBotBounds;
    var reaperGroupXTopBounds;  //group 1
    var reaperGroupXBotBounds;
    var reaperGroupYTopBounds;
    var reaperGroupYBotBounds;

    this.REAPER_SPEED = 50;
    this.reaperAttackingNum = -1;
    this.reaperAnimationDelay = 0;
    this.reaperAggressive = false;
    this.reaperAmount = 0;
    this.reaperBunnyGroupXTopBounds = 850;  //group 1
    this.reaperBunnyGroupXBotBounds = 850;
    this.reaperBunnyGroupYTopBounds = 300;
    this.reaperBunnyGroupYBotBounds = 300;
    this.reaperGroupXTopBounds = 1000;  //group 1
    this.reaperGroupXBotBounds = 1000;
    this.reaperGroupYTopBounds = 250;
    this.reaperGroupYBotBounds = 250;

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
        if (i < 1)
        {
        reaper.reset(this.game.rnd.integerInRange(this.reaperGroupXBotBounds + 15, this.reaperGroupXTopBounds - 15),
                     this.game.rnd.integerInRange(this.reaperGroupYBotBounds + 15, this.reaperGroupYTopBounds - 15));
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
        if (i < 1)
        {
        reaperBunny.reset(this.game.rnd.integerInRange(this.reaperBunnyGroupXBotBounds + 15, this.reaperBunnyGroupXTopBounds - 15),
                          this.game.rnd.integerInRange(this.reaperBunnyGroupYBotBounds + 15, this.reaperBunnyGroupYTopBounds - 15));
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
    this.crabAmount = 0;
    this.crabGroupXTopBounds = 500;  //group 1
    this.crabGroupXBotBounds = 500;
    this.crabGroupYTopBounds = 500;
    this.crabGroupYBotBounds = 500;

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
        // if (i < 6)
        // {
        crab.reset(this.game.rnd.integerInRange(this.crabGroupXBotBounds + 15, this.crabGroupXTopBounds - 15),
                     this.game.rnd.integerInRange(this.crabGroupYBotBounds + 15, this.crabGroupYTopBounds - 15));
        // }else if (i < 12 && i >= 6)
        // {
        // crab.reset(this.game.rnd.integerInRange(this.crabGroup2XBotBounds + 15, this.crabGroup2XTopBounds - 15),
        //               this.game.rnd.integerInRange(this.crabGroup2YBotBounds + 15, this.crabGroup2YTopBounds - 15));
        // }else if (i < 14 && i >= 12)
        // {
        // crab.reset(this.game.rnd.integerInRange(this.crabGroup3XBotBounds + 15, this.crabGroup3XTopBounds - 15),
        //               this.game.rnd.integerInRange(this.crabGroup3YBotBounds + 15, this.crabGroup3YTopBounds - 15));
        // }else if (i < 18 && i >= 14)
        // {
        // crab.reset(this.game.rnd.integerInRange(this.crabGroup4XBotBounds + 15, this.crabGroup4XTopBounds - 15),
        //               this.game.rnd.integerInRange(this.crabGroup4YBotBounds + 15, this.crabGroup4YTopBounds - 15));
        // }
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
    this.wanderer = this.game.add.sprite(300, 2000, 'strikerMovement');
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

  //this.wandererActions();

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
          this.text4 = this.game.add.sprite(350, 2600, 'hold');
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
        if (this.text4 != undefined)
        {
          this.text4.destroy();
        }
        if (striker.stunCooldown > this.game.time.totalElapsedSeconds())
        {
          striker.body.velocity.x = 0;
          striker.body.velocity.y = 0;
        }
        else
        {
          this.text5.destroy();
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
  this.game.physics.arcade.collide(this.wanderer, this.strikerGroup);
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
    this.stunned = this.game.add.sprite(wanderer.body.x, wanderer.body.y, 'stunned');
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
        if (i < 5 &&
            rat.body.x < this.ratGroupXBotBounds || rat.body.x > this.ratGroupXTopBounds ||
            rat.body.y < this.ratGroupYBotBounds || rat.body.y > this.ratGroupYTopBounds)
        {
          this.ratWander(rat, this.RAT_SPEED, true);
        }else
        {
          this.ratWander(rat, this.RAT_SPEED, false);
        }
        if (i < 15 && i > 4 &&
            rat.body.x < this.ratGroup2XBotBounds || rat.body.x > this.ratGroup2XTopBounds ||
            rat.body.y < this.ratGroup2YBotBounds || rat.body.y > this.ratGroup2YTopBounds)
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
          this.game.physics.arcade.velocityFromAngle(this.reaperDegrees, 90, this.aggressiveReaper.body.velocity);
          this.game.physics.arcade.collide(this.aggressiveReaper, this.layer);
          this.game.physics.arcade.collide(this.aggressiveReaper, this.mainChar, null, this.detectAttack, this);

          this.walkAnimations(this.aggressiveReaper, false);
        }
      }

      if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideChar, bunny) <= 155 && this.energy > 0)
      {
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
  if (this.ratWanderDelay < 5 && outOfBounds == false)
  {
    spriteA.body.velocity.x = ((this.game.rnd.integer() % 3) - 1) * speed;
    spriteA.body.velocity.y = ((this.game.rnd.integer() % 3) - 1) * speed;
    this.ratWanderDelay = 500;
  }else if (this.ratWanderDelay < 300 && this.ratWanderDelay > 284 && outOfBounds == false)
  {
    if ((this.game.rnd.integer() % 5) == 1)
    {
      spriteA.body.velocity.setTo(0, 0);
    }
  }else if (this.ratWanderDelay < 5 && outOfBounds)
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
    this.ratWanderDelay = 1000;
  }
  if (this.ratWanderDelay > 0)
  {
    this.ratWanderDelay -= 1;
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
              this.game.state.start('GameOver', true, false, 0);
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
        this.deathTimer = 2000;
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
              this.game.state.start('GameOver', true, false, 0);
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
              this.game.state.start('GameOver', true, false, 0);
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
              this.game.state.start('GameOver', true, false, 0);
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
        this.deathTimer = 2000;
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
              this.game.state.start('GameOver', true, false, 0);
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

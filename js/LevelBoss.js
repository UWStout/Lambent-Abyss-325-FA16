var PrototypeMaze = PrototypeMaze || {};

PrototypeMaze.Game = function() {};

PrototypeMaze.LevelBoss = {

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
    this.map = this.game.add.tilemap('BossMap', 64, 64);

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
    this.coins = this.game.add.sprite(2080, 2130, 'coins');
    this.coins.anchor.setTo(0.5, 0.5);
    this.coins2 = this.game.add.sprite(2225, 2220, 'coins');
    this.coins2.anchor.setTo(0.5, 0.5);
    this.gems = this.game.add.sprite(2150, 2275, 'gems');
    this.gems.anchor.setTo(0.5, 0.5);
    this.gems2 = this.game.add.sprite(2180, 2150, 'gems');
    this.gems2.anchor.setTo(0.5, 0.5);
    this.chest = this.game.add.image(2090, 2160, 'chest');

    //treasure animations
    this.coins.animations.add('twinkle', [0, 1, 2, 3, 4, 5, 6], 3, true);
    this.coins.animations.play('twinkle');
    this.coins2.animations.add('twinkle', [0, 1, 2, 3, 4, 5, 6], 3, true);
    this.coins2.animations.play('twinkle');
    this.gems.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 3, true);
    this.gems.animations.play('sparkle');
    this.gems2.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6, 7], 3, true);
    this.gems2.animations.play('sparkle');

    this.setUpEnemies();

    this.bossCreate();

    this.mainChar = this.game.add.sprite(1320, 160, 'player');
    this.sideChar = this.game.add.sprite(1320, 160, 'companion');

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

    //mainChar death animation
    var mainCharLastDirection;

    this.mainCharLastDirection = 5;

    //sideChar attack animation
    var sideCharLastDirection;
    var sideCharAnimationDelay;

    this.sideCharLastDirection = 5;
    //0 upLeft, 1 up, 2 upRight, 3 right, 4 downRight, 5 down, 6 downLeft, 7 left
    this.sideCharAnimationDelay = 0;

    // //levelDoor setup
    // this.game.physics.enable(this.levelDoor, Phaser.Physics.ARCADE);
    // this.levelDoor.anchor.setTo(0.5, 0.5);
    // this.levelDoor.body.collideWorldBounds = true;
    // this.levelDoor.body.defaultRestitution = 0.8;
    // this.levelDoor.body.immovable = true;

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

    this.game.bossfight = this.game.add.audio('boss');
    this.bAttack = this.game.add.audio('firstAttack');
    this.laserAttack = this.game.add.audio('LaserAttack');
    this.bossDmg = this.game.add.audio('bossDmg');
    this.game.bossfight.loop = true;
    this.game.bossfight.play();

    this.crab = this.game.add.audio('crab');
    this.mice = this.game.add.audio('mice');
    this.monster = this.game.add.audio('monster');
    this.strikerSound = this.game.add.audio('strikerSound');
    this.flesh = this.game.add.audio('flesh');
    this.wandererSound = this.game.add.audio('wandererSound');
    this.walking = this.game.add.audio('walking', 0.5);
    this.attack = this.game.add.audio('attack');
    this.charDeath = this.game.add.audio('charDeath');
    this.charElec = this.game.add.audio('death');

    this.torches = this.game.add.group();

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
    this.shadowTexture.context.fillStyle = 'rgb(50, 0, 10)';
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

    this.bossLight = createTorch(this.game, 0, 0);
    this.bossLight.filter.r = 0.2;
    this.bossLight.filter.g = 0.3;
    this.bossLight.filter.b = 1.0;

    this.bossAttackLight = createTorch(this.game, 0, 0);
    this.bossAttackLight.filter.r = 1;
    this.bossAttackLight.filter.g = 0;
    this.bossAttackLight.filter.b = 1;
    this.bossAttackLight.filter.radius = 2;
    this.bossAttackedLast = -10000;

    this.stepCooldown = 0;
    this.energy_interpol = 150.0;

  },

  update: function() {

    //tilemap collision
    this.game.physics.arcade.collide(this.mainChar, this.layer);
    this.game.physics.arcade.collide(this.sideChar, this.layer);
    this.processPlayerInput();
    this.sideCharFollow();

    this.enemyCollisions();

    this.bossEvents();

    // Update the shadow texture each frame
    this.updateShadowTexture();

    // this.collisionsDoor();

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
  this.game.state.start('Level1');

},

// collisionsDoor: function() {
//
//     //collision dectection for paddle and iWall with dust groups
//     this.game.physics.arcade.collide(this.mainChar, this.levelDoor, this.doorCollision, null, this);
//
//   },
//
// doorCollision: function(mainChar, levelDoor) {
//
//   this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.levelChange, this);
//
// },

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

  if (this.ticks - this.bossAttackedLast <= 45)
  {
    var prog = (this.ticks - this.bossAttackedLast) / 45.0;
    if (prog < 0.1) {
      prog = prog * 10.0;
    }
    else {
      prog -= 0.1;
      prog = 1.0 - prog;
    }
    this.bossAttackLight.x = this.bossCompanion.body.x + this.bossCompanion.width / 2.0;
    this.bossAttackLight.y = this.bossCompanion.body.y + this.bossCompanion.height / 2.0;
    this.bossAttackLight.filter.radius = prog * 1.0;
    updateTorch(this.bossAttackLight, 0, this.game, cx, cy);
    ar.push(this.bossAttackLight.filter);
  }
  this.characterLight.x = this.sideChar.body.x + this.sideChar.width / 2.0;
  this.characterLight.y = this.sideChar.body.y - 32 + this.sideChar.height / 2.0;
  this.characterLight.filter.radius = (this.energy_interpol / 150.0) * 0.3;

  updateTorch(this.characterLight, this.ticks, this.game, cx, cy);
  ar.push(this.characterLight.filter);
  if (this.bossCompanion != undefined)
  {
    this.bossLight.x = this.bossCompanion.body.x + this.bossCompanion.width / 2.0;
    this.bossLight.y = this.bossCompanion.body.y + this.bossCompanion.height / 2.0;
    this.bossLight.filter.radius = 0.3;
    updateTorch(this.bossLight, this.ticks, this.game, cx, cy);
    ar.push(this.bossLight.filter);
  }

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

    this.STRIKER_SPEED = 50;
    this.strikerAttackingNum = -1;
    this.strikerAnimationDelay = 0;
    this.strikerAmount = 8;
    this.strikerGroupXTopBounds = 950;  //group 1
    this.strikerGroupXBotBounds = 800;
    this.strikerGroupYTopBounds = 2500;
    this.strikerGroupYBotBounds = 2200;
    this.strikerGroup2XTopBounds = 1800;  //group 2
    this.strikerGroup2XBotBounds = 1650;
    this.strikerGroup2YTopBounds = 2500;
    this.strikerGroup2YBotBounds = 2200;

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
        if (i < 4)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroupXBotBounds + 15, this.strikerGroupXTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroupYBotBounds + 15, this.strikerGroupYTopBounds - 15));
        }else if (i < 8 && i >= 4)
        {
        striker.reset(this.game.rnd.integerInRange(this.strikerGroup2XBotBounds + 15, this.strikerGroup2XTopBounds - 15),
                      this.game.rnd.integerInRange(this.strikerGroup2YBotBounds + 15, this.strikerGroup2YTopBounds - 15));
        }
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
    this.ratAmount = 4;
    this.ratGroupXTopBounds = 1525;  //first group
    this.ratGroupXBotBounds = 1100;
    this.ratGroupYTopBounds = 950;
    this.ratGroupYBotBounds = 750;

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
        rat.reset(this.game.rnd.integerInRange(this.ratGroupXBotBounds + 15, this.ratGroupXTopBounds - 15),
                  this.game.rnd.integerInRange(this.ratGroupYBotBounds + 15, this.ratGroupYTopBounds - 15));
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
    this.reaperAmount = 2;
    this.reaperBunnyGroupXTopBounds = 1100;  //group 1
    this.reaperBunnyGroupXBotBounds = 1000;
    this.reaperBunnyGroupYTopBounds = 2500;
    this.reaperBunnyGroupYBotBounds = 2200;
    this.reaperGroupX = 850;  //group 1
    this.reaperGroupY = 2550;
    this.reaperBunnyGroup2XTopBounds = 1600;  //group 2
    this.reaperBunnyGroup2XBotBounds = 1500;
    this.reaperBunnyGroup2YTopBounds = 2500;
    this.reaperBunnyGroup2YBotBounds = 2200;
    this.reaperGroup2X = 1800;  //group 2
    this.reaperGroup2Y = 2550;

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
    this.crabAmount = 7;
    this.crabGroup1X = 1170;  //group 1
    this.crabGroup1Y = 400;
    this.crabGroup2X = 1450;  //group 2
    this.crabGroup2Y = 400;
    this.crabGroup3X = 1260;  //group 3
    this.crabGroup3Y = 1520;
    this.crabGroup4X = 1360;  //group 4
    this.crabGroup4Y = 1520;
    this.crabGroup5X = 1260;  //group 5
    this.crabGroup5Y = 2150;
    this.crabGroup6X = 1360;  //group 6
    this.crabGroup6Y = 2150;
    this.crabGroup7X = 1800;  //group 7
    this.crabGroup7Y = 2210;

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
      if (i == 0)
      {
        crab.reset(this.crabGroup1X, this.crabGroup1Y);
      }else if (i == 1)
      {
        crab.reset(this.crabGroup2X, this.crabGroup2Y);
      }else if (i == 2)
      {
        crab.reset(this.crabGroup3X, this.crabGroup3Y);
      }else if (i == 3)
      {
        crab.reset(this.crabGroup4X, this.crabGroup4Y);
      }else if (i == 4)
      {
        crab.reset(this.crabGroup5X, this.crabGroup5Y);
      }else if (i == 5)
      {
        crab.reset(this.crabGroup6X, this.crabGroup6Y);
      }else if (i == 6)
      {
        crab.reset(this.crabGroup7X, this.crabGroup7Y);
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
              this.game.bossfight.stop();
              this.mice.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 6);
              this.walking.stop();
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
              this.game.bossfight.stop();
              this.strikerSound.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 6);
              this.walking.stop();
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
              this.game.bossfight.stop();
              this.monster.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 6);
              this.walking.stop();
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
              this.game.bossfight.stop();
              this.crab.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 6);
              this.walking.stop();
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
              this.game.bossfight.stop();
              this.charDeath.play();
              this.game.state.start('GameOver', true, false, 6);
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

bossCreate: function()
{
  var bossBattleState;
  var bossAttackTimer;
  var mainCharDead;
  var bossHitDelay;
  var attackType;
  var beamDirection;
  var bossSpawning;
  var beamsRemaining;

  this.bossBattleState = 0;
  this.bossAttackTimer = 0;
  this.mainCharDead = false;
  this.bossHitDelay = 0;
  this.attackType = 1;
  this.beamDirection = 1;
  this.bossSpawning = false;
  this.beamsRemaining = -1;

  //boss target
  this.bossTarget = this.game.add.sprite();
  this.game.physics.enable(this.bossTarget, Phaser.Physics.ARCADE);
  this.bossTarget.x = 0;
  this.bossTarget.y = 0;

  //create boss and companion
  this.boss = this.game.add.sprite(1320, 950, 'boss');
  this.bossCompanion = this.game.add.sprite(1200, 950, 'bossCompanion');

  //animations for boss
  this.boss.animations.add('rise', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
  this.boss.animations.add('fall', [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10);
  this.boss.animations.add('hit', [9, 8, 9, 10], 5);

  //animations for bossCompanion
  this.bossCompanion.animations.add('sideUp', [89, 90], 3, true);
  this.bossCompanion.animations.add('sideDown', [81, 82], 3, true);
  this.bossCompanion.animations.add('sideLeft', [93, 94], 3, true);
  this.bossCompanion.animations.add('sideRight', [85, 86], 3, true);
  this.bossCompanion.animations.add('sideUpLeft', [91, 92], 3, true);
  this.bossCompanion.animations.add('sideUpRight', [87, 88], 3, true);
  this.bossCompanion.animations.add('sideDownLeft', [95, 96], 3, true);
  this.bossCompanion.animations.add('sideDownRight', [83, 84], 3, true);

  this.bossCompanion.animations.add('upCharge1', [41], 3);
  this.bossCompanion.animations.add('downCharge1', [0, 1], 2);
  this.bossCompanion.animations.add('leftCharge1', [61], 3);
  this.bossCompanion.animations.add('rightCharge1', [21], 3);
  this.bossCompanion.animations.add('upLeftCharge1', [51], 3);
  this.bossCompanion.animations.add('upRightCharge1', [31], 3);
  this.bossCompanion.animations.add('downLeftCharge1', [71], 3);
  this.bossCompanion.animations.add('downRightCharge1', [12], 3);

  this.bossCompanion.animations.add('upCharge2', [42], 3);
  this.bossCompanion.animations.add('downCharge2', [2], 2);
  this.bossCompanion.animations.add('leftCharge2', [62], 3);
  this.bossCompanion.animations.add('rightCharge2', [22], 3);
  this.bossCompanion.animations.add('upLeftCharge2', [52], 3);
  this.bossCompanion.animations.add('upRightCharge2', [32], 3);
  this.bossCompanion.animations.add('downLeftCharge2', [72], 3);
  this.bossCompanion.animations.add('downRightCharge2', [13], 3);

  this.bossCompanion.animations.add('upCharge3', [43], 3);
  this.bossCompanion.animations.add('downCharge3', [3], 2);
  this.bossCompanion.animations.add('leftCharge3', [63], 3);
  this.bossCompanion.animations.add('rightCharge3', [23], 3);
  this.bossCompanion.animations.add('upLeftCharge3', [53], 3);
  this.bossCompanion.animations.add('upRightCharge3', [33], 3);
  this.bossCompanion.animations.add('downLeftCharge3', [73], 3);
  this.bossCompanion.animations.add('downRightCharge3', [14], 3);

  this.bossCompanion.animations.add('upCharge4', [44], 3);
  this.bossCompanion.animations.add('downCharge4', [4], 2);
  this.bossCompanion.animations.add('leftCharge4', [64], 3);
  this.bossCompanion.animations.add('rightCharge4', [24], 3);
  this.bossCompanion.animations.add('upLeftCharge4', [54], 3);
  this.bossCompanion.animations.add('upRightCharge4', [34], 3);
  this.bossCompanion.animations.add('downLeftCharge4', [74], 3);
  this.bossCompanion.animations.add('downRightCharge4', [15], 3);

  this.bossCompanion.animations.add('upChargeReady', Phaser.ArrayUtils.numberArray(45, 46), 3, true);
  this.bossCompanion.animations.add('downChargeReady', Phaser.ArrayUtils.numberArray(5, 6), 3, true);
  this.bossCompanion.animations.add('leftChargeReady', Phaser.ArrayUtils.numberArray(65, 66), 3, true);
  this.bossCompanion.animations.add('rightChargeReady', Phaser.ArrayUtils.numberArray(25, 26), 3, true);
  this.bossCompanion.animations.add('upLeftChargeReady', Phaser.ArrayUtils.numberArray(55, 56), 3, true);
  this.bossCompanion.animations.add('upRightChargeReady', Phaser.ArrayUtils.numberArray(35, 36), 3, true);
  this.bossCompanion.animations.add('downLeftChargeReady', Phaser.ArrayUtils.numberArray(75, 76), 3, true);
  this.bossCompanion.animations.add('downRightChargeReady', Phaser.ArrayUtils.numberArray(16, 17), 3, true);

  this.bossCompanion.animations.add('upChargeRelease', Phaser.ArrayUtils.numberArray(46, 50), 3);
  this.bossCompanion.animations.add('downChargeRelease', Phaser.ArrayUtils.numberArray(6, 11), 8);
  this.bossCompanion.animations.add('leftChargeRelease', Phaser.ArrayUtils.numberArray(66, 70), 3);
  this.bossCompanion.animations.add('rightChargeRelease', Phaser.ArrayUtils.numberArray(26, 30), 3);
  this.bossCompanion.animations.add('upLeftChargeRelease', Phaser.ArrayUtils.numberArray(56, 60), 3);
  this.bossCompanion.animations.add('upRightChargeRelease', Phaser.ArrayUtils.numberArray(36, 40), 3);
  this.bossCompanion.animations.add('downLeftChargeRelease', Phaser.ArrayUtils.numberArray(76, 80), 3);
  this.bossCompanion.animations.add('downRightChargeRelease', Phaser.ArrayUtils.numberArray(17, 20), 3);

  //boss setup
  this.game.physics.enable(this.boss, Phaser.Physics.ARCADE);
  this.boss.anchor.setTo(0.5, 0.5);
  this.boss.body.collideWorldBounds = true;
  this.boss.body.defaultRestitution = 0.8;
  this.boss.body.immovable = true;

  //bossCompanion setup
  this.game.physics.enable(this.bossCompanion, Phaser.Physics.ARCADE);
  this.bossCompanion.anchor.setTo(0.5, 0.5);
  this.bossCompanion.body.collideWorldBounds = true;
  this.bossCompanion.body.defaultRestitution = 0.8;
  this.bossCompanion.body.immovable = true;
  this.bossCompanion.alpha = 0;

  this.enableboss = true;
  this.enablebossCompanion = false;

  //bossCompanion follow coordinates
  this.enemyFollow = this.game.add.sprite();
  this.game.physics.enable(this.enemyFollow, Phaser.Physics.ARCADE);
  this.enemyFollow.x = this.boss.body.x - 64;
  this.enemyFollow.y = this.boss.body.y;

  //bossCompanion attack animation
  var bossCompanionLastDirection;
  var bossCompanionAnimationDelay;
  var bossCompanionCharging;
  var bossCompanionChargeDuration;

  this.bossCompanionLastDirection = 5;
  //0 upLeft, 1 up, 2 upRight, 3 right, 4 downRight, 5 down, 6 downLeft, 7 left
  this.bossCompanionAnimationDelay = 0;
  this.bossCompanionCharging = false;
  this.bossCompanionChargeDuration = 0;
},

bossCompanionFollow: function() {

  //Gets angle in degrees
  this.bossRadians = this.game.physics.arcade.angleBetween(this.bossCompanion, this.enemyFollow);
  this.bossDegrees = this.bossRadians * (180 / Math.PI);

  if (this.enableboss || (!this.bossCompanionCharging && !this.bossAttackExists))
  {
    //Calculates the hypotenuse of the boss's X and Y velocities
    this.bosshypotenuse = Math.sqrt(Math.pow(this.boss.body.velocity.x, 2) + Math.pow(this.boss.body.velocity.y, 2));

    //Respawns bossCompanion if too far away from boss
    if (this.game.physics.arcade.distanceBetween(this.bossCompanion, this.boss) > 5000)
    {
      this.bossCompanion.body.x = this.enemyFollow.body.x - 32;
      this.bossCompanion.body.y = this.enemyFollow.body.y - 32;
    }

    //If boss isn't moving bossCompanion will follow at default speed
    else if (this.bosshypotenuse == 0)
    {
      this.game.physics.arcade.moveToXY(this.bossCompanion, this.enemyFollow.body.x, this.enemyFollow.body.y, 125, 700);
    }
    else
    {
      this.game.physics.arcade.velocityFromAngle(this.bossDegrees, this.bosshypotenuse, this.bossCompanion.body.velocity);
    }
  }

  if (!this.enableboss)
  {

  if (this.bossCompanion.body.velocity.y == 0)
  {
    if (this.bossCompanion.body.velocity.x < 0)
    {
      if (!this.bossCompanionCharging)
      {
        this.bossCompanion.animations.play('sideLeft');
      }
      this.bossCompanionLastDirection = 7;
    }
    else if (this.bossCompanion.body.velocity.x > 0)
    {
      if (!this.bossCompanionCharging)
      {
        this.bossCompanion.animations.play('sideRight');
      }
      this.bossCompanionLastDirection = 3;
    }
  }
  if (this.bossCompanion.body.velocity.x == 0)
  {
    if (this.bossCompanion.body.velocity.y < 0)
    {
      if (!this.bossCompanionCharging)
      {
        this.bossCompanion.animations.play('sideUp');
      }
      this.bossCompanionLastDirection = 1;
    }
    else if (this.bossCompanion.body.velocity.y > 0)
    {
      if (!this.bossCompanionCharging)
      {
        this.bossCompanion.animations.play('sideDown');
      }
      this.bossCompanionLastDirection = 5;
    }
  }
  if (this.bossCompanion.body.velocity.x !== 0 && this.bossCompanion.body.velocity.y !== 0)
  {
    if (this.bossCompanion.body.velocity.x < 0 && this.bossCompanion.body.velocity.y < 0)
    {
      if (!this.bossCompanionCharging)
      {
        this.bossCompanion.animations.play('sideUpLeft');
      }
      this.bossCompanionLastDirection = 0;
    }
    else if (this.bossCompanion.body.velocity.x > 0 && this.bossCompanion.body.velocity.y > 0)
    {
      if (!this.bossCompanionCharging)
      {
        this.bossCompanion.animations.play('sideDownRight');
      }
      this.bossCompanionLastDirection = 4;
    }
    else if (this.bossCompanion.body.velocity.x > 0 && this.bossCompanion.body.velocity.y < 0)
    {
      if (!this.bossCompanionCharging)
      {
        this.bossCompanion.animations.play('sideUpRight');
      }
      this.bossCompanionLastDirection = 2;
    }
    else if (this.bossCompanion.body.velocity.x < 0 && this.bossCompanion.body.velocity.y > 0)
    {
      if (!this.bossCompanionCharging)
      {
        this.bossCompanion.animations.play('sideDownLeft');
      }
      this.bossCompanionLastDirection = 6;
    }
  }

  }
},

processBoss: function() {
  if (this.enableboss)
  {
    //Down movement
    if (this.boss.body.velocity.y > 0)
    {
      this.enemyFollow.x = this.boss.body.x;
      this.enemyFollow.y = this.boss.body.y - 32;
      this.bossCompanion.animations.play('sideDown');
    }
  }

  if (this.enablebossCompanion)
  {
    if (this.bossCompanionChargeDuration >= 1000 && this.bossCompanionCharging == false)
    {
      if (this.attackType == 1 || this.attackType == 3)
      {
        //attack sprite
        this.bossAttack = this.game.add.sprite(this.bossCompanion.body.x, this.bossCompanion.body.y, 'companionAreaAttack');
        this.bossAttack.animations.add('areaAttack', Phaser.ArrayUtils.numberArray(0, 11), 15, true);
        this.bossAttack.animations.play('areaAttack');
        this.attack.play();
        this.bAttack.play();
        this.bossAttackExists = true;
        this.bossAttack.anchor.x = 0.4;
        this.bossAttack.anchor.y = 0.4;

        this.bossCompanionAnimationDelay = 35;

        //Reset for next attack
        this.game.time.events.add(1000, this.resetBossAttack, this, this.bossAttack);

        this.bossAttackedLast = this.ticks;
      }else if (this.attackType == 2)
      {
        if (this.beamDirection == 0)
        {
          //attack sprite
          this.bossAttack = this.game.add.sprite(this.bossCompanion.body.x, this.bossCompanion.body.y - 245, 'bossBeamAttack');
          this.bossAttack.animations.add('beamAttack', Phaser.ArrayUtils.numberArray(9, 17), 15);
          this.bossAttack.animations.play('beamAttack');
          this.attack.play();
          this.laserAttack.play();
          this.bossAttackExists = true;

          this.bossCompanionAnimationDelay = 10;

          //Reset for next attack
          this.game.time.events.add(500, this.resetBossAttack, this, this.bossAttack);
        }else if (this.beamDirection == 1)
        {
          //attack sprite
          this.bossAttack = this.game.add.sprite(this.bossCompanion.body.x, this.bossCompanion.body.y - 25, 'bossBeamAttack');
          this.bossAttack.animations.add('beamAttack2', Phaser.ArrayUtils.numberArray(0, 8), 15);
          this.bossAttack.animations.play('beamAttack2');
          this.attack.play();
          this.laserAttack.play();
          this.bossAttackExists = true;

          this.bossCompanionAnimationDelay = 10;

          //Reset for next attack
          this.game.time.events.add(500, this.resetBossAttack, this, this.bossAttack);
        }
      }
    }

    //Base condition of bossCompanion
    //No movement if no keys are pressed
    if (this.bossBattleState != 3 && (this.bossAttackTimer != 0 && !this.bossCompanionCharging))
    {
      this.bossCompanion.body.velocity.x = 0;
      this.bossCompanion.body.velocity.y = 0;
    }
    //animations
    if (this.bossCompanion.body.velocity.y == 0)
    {
      if (this.bossCompanion.body.velocity.x < 0)
      {
        if (!this.bossCompanionCharging)
        {
          this.bossCompanion.animations.play('sideLeft');
        }
        this.bossCompanionLastDirection = 7;
      }
      else if (this.bossCompanion.body.velocity.x > 0)
      {
        if (!this.bossCompanionCharging)
        {
          this.bossCompanion.animations.play('sideRight');
        }
        this.bossCompanionLastDirection = 3;
      }
    }
    if (this.bossCompanion.body.velocity.x == 0)
    {
      if (this.bossCompanion.body.velocity.y < 0)
      {
        if (!this.bossCompanionCharging)
        {
          this.bossCompanion.animations.play('sideUp');
        }
        this.bossCompanionLastDirection = 1;
      }
      else if (this.bossCompanion.body.velocity.y > 0)
      {
        if (!this.bossCompanionCharging)
        {
          this.bossCompanion.animations.play('sideDown');
        }
        this.bossCompanionLastDirection = 5;
      }
    }
    if (this.bossCompanion.body.velocity.x !== 0 && this.bossCompanion.body.velocity.y !== 0)
    {
      if (this.bossCompanion.body.velocity.x < 0 && this.bossCompanion.body.velocity.y < 0)
      {
        if (!this.bossCompanionCharging)
        {
          this.bossCompanion.animations.play('sideUpLeft');
        }
        this.bossCompanionLastDirection = 0;
      }
      else if (this.bossCompanion.body.velocity.x > 0 && this.bossCompanion.body.velocity.y > 0)
      {
        if (!this.bossCompanionCharging)
        {
          this.bossCompanion.animations.play('sideDownRight');
        }
        this.bossCompanionLastDirection = 4;
      }
      else if (this.bossCompanion.body.velocity.x > 0 && this.bossCompanion.body.velocity.y < 0)
      {
        if (!this.bossCompanionCharging)
        {
          this.bossCompanion.animations.play('sideUpRight');
        }
        this.bossCompanionLastDirection = 2;
      }
      else if (this.bossCompanion.body.velocity.x < 0 && this.bossCompanion.body.velocity.y > 0)
      {
        if (!this.bossCompanionCharging)
        {
          this.bossCompanion.animations.play('sideDownLeft');
        }
        this.bossCompanionLastDirection = 6;
      }
    }

    if (this.bossCompanionCharging || this.bossCompanionAnimationDelay != 0)
    {
      if (this.bossCompanionChargeDuration < 250 && !this.bossAttackExists)  //charge 1
      {
        if (this.bossCompanionLastDirection == 0)
        {
          this.bossCompanion.animations.play('upLeftCharge1');
        }
        else if (this.bossCompanionLastDirection == 1)
        {
          this.bossCompanion.animations.play('upCharge1');
        }
        else if (this.bossCompanionLastDirection == 2)
        {
          this.bossCompanion.animations.play('upRightCharge1');
        }
        else if (this.bossCompanionLastDirection == 3)
        {
          this.bossCompanion.animations.play('rightCharge1');
        }
        else if (this.bossCompanionLastDirection == 4)
        {
          this.bossCompanion.animations.play('downRightCharge1');
        }
        else if (this.bossCompanionLastDirection == 5)
        {
          this.bossCompanion.animations.play('downCharge1');
        }
        else if (this.bossCompanionLastDirection == 6)
        {
          this.bossCompanion.animations.play('downLeftCharge1');
        }
        else if (this.bossCompanionLastDirection == 7)
        {
          this.bossCompanion.animations.play('leftCharge1');
        }
      }
      else if (this.bossCompanionChargeDuration >= 250 && this.bossCompanionChargeDuration < 500 && !this.bossAttackExists)  //charge 2
      {
        if (this.bossCompanionLastDirection == 0)
        {
          this.bossCompanion.animations.play('upLeftCharge2');
        }
        else if (this.bossCompanionLastDirection == 1)
        {
          this.bossCompanion.animations.play('upCharge2');
        }
        else if (this.bossCompanionLastDirection == 2)
        {
          this.bossCompanion.animations.play('upRightCharge2');
        }
        else if (this.bossCompanionLastDirection == 3)
        {
          this.bossCompanion.animations.play('rightCharge2');
        }
        else if (this.bossCompanionLastDirection == 4)
        {
          this.bossCompanion.animations.play('downRightCharge2');
        }
        else if (this.bossCompanionLastDirection == 5)
        {
          this.bossCompanion.animations.play('downCharge2');
        }
        else if (this.bossCompanionLastDirection == 6)
        {
          this.bossCompanion.animations.play('downLeftCharge2');
        }
        else if (this.bossCompanionLastDirection == 7)
        {
          this.bossCompanion.animations.play('leftCharge2');
        }
      }
      else if (this.bossCompanionChargeDuration >= 500 && this.bossCompanionChargeDuration < 750 && !this.bossAttackExists)  //charge 3
      {
        if (this.bossCompanionLastDirection == 0)
        {
          this.bossCompanion.animations.play('upLeftCharge3');
        }
        else if (this.bossCompanionLastDirection == 1)
        {
          this.bossCompanion.animations.play('upCharge3');
        }
        else if (this.bossCompanionLastDirection == 2)
        {
          this.bossCompanion.animations.play('upRightCharge3');
        }
        else if (this.bossCompanionLastDirection == 3)
        {
          this.bossCompanion.animations.play('rightCharge3');
        }
        else if (this.bossCompanionLastDirection == 4)
        {
          this.bossCompanion.animations.play('downRightCharge3');
        }
        else if (this.bossCompanionLastDirection == 5)
        {
          this.bossCompanion.animations.play('downCharge3');
        }
        else if (this.bossCompanionLastDirection == 6)
        {
          this.bossCompanion.animations.play('downLeftCharge3');
        }
        else if (this.bossCompanionLastDirection == 7)
        {
          this.bossCompanion.animations.play('leftCharge3');
        }
      }
      else if (this.bossCompanionChargeDuration >= 750 && this.bossCompanionChargeDuration < 1000 && !this.bossAttackExists)  //charge 4
      {
        if (this.bossCompanionLastDirection == 0)
        {
          this.bossCompanion.animations.play('upLeftCharge4');
        }
        else if (this.bossCompanionLastDirection == 1)
        {
          this.bossCompanion.animations.play('upCharge4');
        }
        else if (this.bossCompanionLastDirection == 2)
        {
          this.bossCompanion.animations.play('upRightCharge4');
        }
        else if (this.bossCompanionLastDirection == 3)
        {
          this.bossCompanion.animations.play('rightCharge4');
        }
        else if (this.bossCompanionLastDirection == 4)
        {
          this.bossCompanion.animations.play('downRightCharge4');
        }
        else if (this.bossCompanionLastDirection == 5)
        {
          this.bossCompanion.animations.play('downCharge4');
        }
        else if (this.bossCompanionLastDirection == 6)
        {
          this.bossCompanion.animations.play('downLeftCharge4');
        }
        else if (this.bossCompanionLastDirection == 7)
        {
          this.bossCompanion.animations.play('leftCharge4');
        }
      }
      else if (this.bossAttackExists)  //release
      {
        if (this.bossCompanionLastDirection == 0)
        {
          this.bossCompanion.animations.play('upLeftChargeRelease');
        }
        else if (this.bossCompanionLastDirection == 1)
        {
          this.bossCompanion.animations.play('upChargeRelease');
        }
        else if (this.bossCompanionLastDirection == 2)
        {
          this.bossCompanion.animations.play('upRightChargeRelease');
        }
        else if (this.bossCompanionLastDirection == 3)
        {
          this.bossCompanion.animations.play('rightChargeRelease');
        }
        else if (this.bossCompanionLastDirection == 4)
        {
          this.bossCompanion.animations.play('downRightChargeRelease');
        }
        else if (this.bossCompanionLastDirection == 5)
        {
          this.bossCompanion.animations.play('downChargeRelease');
        }
        else if (this.bossCompanionLastDirection == 6)
        {
          this.bossCompanion.animations.play('downLeftChargeRelease');
        }
        else if (this.bossCompanionLastDirection == 7)
        {
          this.bossCompanion.animations.play('leftChargeRelease');
        }
      }
      else if (this.bossCompanionChargeDuration >= 1000 && !this.bossAttackExists)  //ready
      {
        if (this.bossCompanionLastDirection == 0)
        {
          this.bossCompanion.animations.play('upLeftChargeReady');
        }
        else if (this.bossCompanionLastDirection == 1)
        {
          this.bossCompanion.animations.play('upChargeReady');
        }
        else if (this.bossCompanionLastDirection == 2)
        {
          this.bossCompanion.animations.play('upRightChargeReady');
        }
        else if (this.bossCompanionLastDirection == 3)
        {
          this.bossCompanion.animations.play('rightChargeReady');
        }
        else if (this.bossCompanionLastDirection == 4)
        {
          this.bossCompanion.animations.play('downRightChargeReady');
        }
        else if (this.bossCompanionLastDirection == 5)
        {
          this.bossCompanion.animations.play('downChargeReady');
        }
        else if (this.bossCompanionLastDirection == 6)
        {
          this.bossCompanion.animations.play('downLeftChargeReady');
        }
        else if (this.bossCompanionLastDirection == 7)
        {
          this.bossCompanion.animations.play('leftChargeReady');
        }
      }

      if (this.bossCompanionAnimationDelay != 0)
      {
        this.bossCompanionAnimationDelay--;
      }
    }
  }

  if (this.bossAttackExists || this.enableboss)
  {
    this.bossCompanionChargeDuration = 0;
  }
},

resetBossAttack: function(tempSprite)
{
  this.deleteSprite(tempSprite);
  this.bossAttackExists = false;
},

bossEvents: function()
{
  if (this.bossBattleState == 0 || this.bossBattleState == 1)
  {
    if (this.mainChar.body.y > 730 && this.bossCompanion.alpha != 1)//boss battle started
    {
      this.crabGroup.children[0].body.x = 1210;//close crab entrance
      this.crabGroup.children[1].body.x = 1310;
      this.mainChar.body.velocity.setTo(0, 0);//freeze player
      this.sideChar.body.velocity.setTo(0, 0);
      this.mainChar.animations.stop();
      if (this.bossSpawning == false)
      {
        this.walking.stop();
        this.boss.animations.play('rise');//boss rises
      }
      this.game.time.events.add(2000, this.companionFadeIn, this);//fade in companion
      this.game.time.events.add(3500, this.spawningComplete, this);
      this.enablebossCompanion = true;
      this.enableboss = false;
    }

    this.bossAttackType1();

    if (this.mainCharDead)
    {
      this.mainCharHit();
    }

    if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideChar, this.boss) <= 155 &&
        this.enablebossCompanion && this.bossHitDelay == 0)
    {//boss hit
      this.bossBattleState++;
      this.bossHitDelay = 150;
      this.boss.animations.play('hit');

      if (this.bossBattleState == 2)
      {
        this.enablebossCompanion = false;
        this.enableboss = true;
        this.crabGroup.children[2].body.x = 1120;//open crab gate
        this.crabGroup.children[3].body.x = 1420;
        this.bossCompanionCharging = false;
        this.bossAttackTimer = 300;
      }
    }else if (this.bossHitDelay != 0)
    {
      this.bossHitDelay--;
    }
  }

  if (this.bossBattleState == 2 || this.bossBattleState == 3 || this.bossBattleState == 4)
  {
    if (this.boss.body.y < 1750)  //retreat
    {
      this.boss.body.velocity.y = 200;
      this.attackType = 2;
      this.bossAttackTimer = 150;
    }else
    {
      this.boss.body.velocity.y = 0;  //next stage of battle
      this.enablebossCompanion = true;
      this.enableboss = false;
    }

    if (this.bossAttackTimer == 200 && this.mainChar.body.y > 1250)
    {
      this.attackType = this.game.rnd.integerInRange(1, 2);
    }

    if (this.attackType == 1)
    {
      this.bossAttackType1();
    }

    if (this.attackType == 2)
    {
      this.bossAttackType2();
    }

    if (this.mainCharDead)
    {
      this.mainCharHit();
    }

    if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideChar, this.boss) <= 155 &&
        this.enablebossCompanion && this.bossHitDelay == 0 && this.mainChar.body.y > 1250)
    {//boss hit
      this.bossBattleState++;
      this.bossHitDelay = 150;
      this.boss.animations.play('hit');

      if (this.bossBattleState == 5)
      {
        this.enablebossCompanion = false;
        this.enableboss = true;
        this.crabGroup.children[4].body.x = 1120;//open crab gate
        this.crabGroup.children[5].body.x = 1420;
      }
    }else if (this.bossHitDelay != 0)
    {
      this.bossHitDelay--;
    }
  }

  if (this.bossBattleState == 5 || this.bossBattleState == 6 || this.bossBattleState == 7)
  {
    if (this.boss.body.y < 2525)  //retreat
    {
      this.boss.body.velocity.y = 200;
      this.attackType = 1;
      this.bossAttackTimer = 150;
    }else
    {
      this.boss.body.velocity.y = 0;  //next stage of battle
      this.enablebossCompanion = true;
      this.enableboss = false;
    }

    if (this.bossAttackTimer == 200)
    {
      if (this.mainChar.body.y > 2100)
      {
        this.attackType = this.game.rnd.integerInRange(1, 2);
      }else if (this.mainChar.body.y > 1900)
      {
        this.attackType = 1;
      }
    }

    if (this.attackType == 1)
    {
      this.bossAttackType1();
    }

    if (this.attackType == 2)
    {
      this.bossAttackType2();
    }

    if (this.mainCharDead)
    {
      if (this.game.bossfight != undefined)
      {
        this.game.bossfight.destroy();
      }
      this.mainCharHit();
    }

    if (this.attackExists && this.game.physics.arcade.distanceBetween(this.sideChar, this.boss) <= 155 &&
        this.enablebossCompanion && this.bossHitDelay == 0 && this.mainChar.body.y > 1950)
    {//boss hit
      this.bossBattleState++;
      this.bossHitDelay = 150;
      this.boss.animations.play('hit');

      if (this.bossBattleState == 8)
      {
        this.boss.animations.play('fall');
        this.sideChar.body.x = 0;
        this.sideChar.body.y = 0;
      }
    }else if (this.bossHitDelay != 0)
    {
      this.bossHitDelay--;
    }
  }

  if (this.bossBattleState == 8)  //end animation sequences
  {
    if (this.mainCharLastDirection != -1)
    {
      this.bossCompanionRadians = this.game.physics.arcade.angleBetween(this.bossCompanion, this.mainChar);
      this.bossCompanionDegrees = this.bossCompanionRadians * (180 / Math.PI);
      this.game.physics.arcade.velocityFromAngle(this.bossCompanionDegrees, 200, this.bossCompanion.body.velocity);
      this.bossCompanionCharging = true;
      this.bossCompanionChargeDuration += 25;
      this.enableMainChar = true;
      this.enableSideChar = false;
      this.game.camera.follow(this.bossCompanion, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

      this.sideChar.body.velocity.setTo(0, 0);
      this.mainChar.body.velocity.setTo(0, 0);

      if (this.game.physics.arcade.distanceBetween(this.bossCompanion, this.mainChar) <= 50)
      {
        this.mainCharFusion = this.game.add.sprite(this.mainChar.body.x - 80, this.mainChar.body.y - 80, 'sideCharFusion');
        this.mainCharFusion.animations.add('fusion', Phaser.ArrayUtils.numberArray(0, 44), 12);
        this.mainCharLastDirection = -1;

        this.enableboss = false;
        this.enablebossCompanion = false;
      }
    }else
    {
      if (this.mainChar.alpha == 1)
      {
        this.mainCharFusion.animations.play('fusion');
      }
      this.mainChar.alpha = 0;
      this.sideChar.alpha = 0;
      this.game.time.events.add(2000, this.bossCompanionDeath, this);
      this.game.time.events.add(4000, this.bossStateSwitch, this);

      this.enableMainChar = false;
      this.enableSideChar = false;
      this.sideChar.body.velocity.setTo(0, 0);
      this.mainChar.body.velocity.setTo(0, 0);
      this.bossCompanion.body.velocity.setTo(0, 0);
    }
  }

  if (this.bossBattleState == 9)
  {
    if (this.game.bossfight != undefined)
    {
      this.game.bossfight.destroy();
    }
    this.game.sound.mute = true;
    this.game.state.start('EndGameCS');
  }

  this.processBoss();
  this.bossCompanionFollow();
},

bossAttackType1: function()
{
  if (this.bossAttackTimer == 0 && this.bossCompanion.alpha != 0)
  {
    this.bossCompanionCharging = true;
    this.bossCompanionChargeDuration += 20;
    this.bossCompanionRadians = this.game.physics.arcade.angleBetween(this.bossCompanion, this.mainChar);
    this.bossCompanionDegrees = this.bossCompanionRadians * (180 / Math.PI);
    this.bossTarget.x = this.mainChar.body.x;
    this.bossTarget.y = this.mainChar.body.y;

    if (this.bossCompanionChargeDuration > 1000)
    {
      this.game.physics.arcade.velocityFromAngle(this.bossCompanionDegrees, 200, this.bossCompanion.body.velocity);
      this.bossAttackTimer = 300;
    }
  }else if (this.bossCompanion.alpha != 0)
  {
    this.bossAttackTimer--;
  }

  if (this.bossCompanionChargeDuration > 1000 && this.bossCompanion.body.y < this.bossTarget.y)
  {
    this.bossCompanionCharging = false;
    this.bossAttackTimer = 300;
  }

  if ((this.bossAttackExists && this.game.physics.arcade.distanceBetween(this.mainChar, this.bossCompanion) <= 100))
  {
    this.mainCharHit();
  }
},

bossAttackType2: function()
{
  if (this.bossAttackTimer == 0 && this.bossCompanion.alpha != 0)
  {
    if (this.beamsRemaining == -1)
    {
      this.bossCompanionCharging = true;
      this.bossTarget.x = this.mainChar.body.x - 200;
      this.bossTarget.y = this.mainChar.body.y - 200;
      this.beamsRemaining = 8;
    }

    if (this.beamsRemaining == 8)
    {
      this.bossCompanionChargeDuration += 20;

      if (this.bossCompanion.body.x < this.bossTarget.x && this.bossCompanion.body.y < this.bossTarget.y)
      {
        this.bossTarget.x = this.bossTarget.x + 400;
        this.bossTarget.y = this.bossTarget.y + 30;
        this.beamsRemaining = 4;
        this.beamDirection = 1;
      }
    }

    if (this.beamsRemaining == 4)
    {
      this.bossCompanionChargeDuration += 500;

      if (this.bossCompanionCharging == false)
      {
        this.bossCompanionCharging = true;
      }

      if (this.bossCompanion.body.x > this.bossTarget.x - 310 && this.bossCompanion.body.x < this.bossTarget.x - 290)
      {
        this.bossCompanionCharging = false;
      }

      if (this.bossCompanion.body.x > this.bossTarget.x - 210 && this.bossCompanion.body.x < this.bossTarget.x - 190)
      {
        this.bossCompanionCharging = false;
      }

      if (this.bossCompanion.body.x > this.bossTarget.x - 110 && this.bossCompanion.body.x < this.bossTarget.x - 90)
      {
        this.bossCompanionCharging = false;
      }

      if (this.bossCompanion.body.x + 30 > this.bossTarget.x)
      {
        this.bossTarget.x = this.bossTarget.x;
        this.bossTarget.y = this.bossTarget.y + 400;
        this.beamsRemaining = 3;
        this.beamDirection = 0;
      }
    }

    if (this.beamsRemaining == 3)
    {
      this.bossCompanionChargeDuration += 20;
      if (this.bossCompanion.body.y + 30 > this.bossTarget.y)
      {
        this.bossTarget.x = this.bossTarget.x - 400;
        this.bossTarget.y = this.bossTarget.y;
        this.beamsRemaining = 0;
      }
    }

    if (this.beamsRemaining == 0)
    {
      this.bossCompanionChargeDuration += 1000;

      if (this.bossCompanionCharging == false)
      {
        this.bossCompanionCharging = true;
      }

      if (this.bossCompanion.body.x < this.bossTarget.x + 350 && this.bossCompanion.body.x > this.bossTarget.x + 345)
      {
        this.bossCompanionCharging = false;
      }

      if (this.bossCompanion.body.x < this.bossTarget.x + 260 && this.bossCompanion.body.x > this.bossTarget.x + 255)
      {
        this.bossCompanionCharging = false;
      }

      if (this.bossCompanion.body.x < this.bossTarget.x + 170 && this.bossCompanion.body.x > this.bossTarget.x + 165)
      {
        this.bossCompanionCharging = false;
      }

      if (this.bossCompanion.body.x < this.bossTarget.x + 80 && this.bossCompanion.body.x > this.bossTarget.x + 75)
      {
        this.bossCompanionCharging = false;
      }

      if (this.bossCompanion.body.x < this.bossTarget.x)
      {
        this.bossCompanionCharging = false;
        this.bossAttackTimer = 300;
        this.beamsRemaining = -1;
        this.beamDirection = -1;
      }
    }
    this.bossCompanionRadians = this.game.physics.arcade.angleBetween(this.bossCompanion, this.bossTarget);
    this.bossCompanionDegrees = this.bossCompanionRadians * (180 / Math.PI);
    this.game.physics.arcade.velocityFromAngle(this.bossCompanionDegrees, 200, this.bossCompanion.body.velocity);

  }else if (this.bossCompanion.alpha != 0)
  {
    this.bossAttackTimer--;
  }

  if (this.beamDirection == 1) //player hit above
  {
    if ((this.bossCompanionCharging == false && this.game.physics.arcade.distanceBetween(this.mainChar, this.bossCompanion) <= 300) &&
         this.mainChar.body.x < this.bossCompanion.body.x + 20 && this.mainChar.body.x > this.bossCompanion.body.x - 20 &&
         this.bossCompanion.body.y < this.mainChar.body.y)
         {
           this.mainCharHit();
         }
  }

  if (this.beamDirection == 0) //player hit below
  {
    if ((this.bossCompanionCharging == false && this.game.physics.arcade.distanceBetween(this.mainChar, this.bossCompanion) <= 300) &&
         this.mainChar.body.x < this.bossCompanion.body.x + 20 && this.mainChar.body.x > this.bossCompanion.body.x - 20 &&
         this.bossCompanion.body.y > this.mainChar.body.y)
         {
           this.mainCharHit();
         }
  }
},

bossAttackType3: function()
{

},

mainCharHit: function()
{
  this.game.bossfight.stop();
  this.mainChar.alpha = 0;
  this.mainCharDead = true;
  this.walking.stop();
  if (this.mainCharLastDirection != -1)
  {
    this.mainCharDeath = this.game.add.sprite(this.mainChar.body.x - 32, this.mainChar.body.y, 'mainCharDeath');
    this.mainCharDeath.animations.add('backDeath', Phaser.ArrayUtils.numberArray(0, 11), 12);
    this.mainCharDeath.animations.add('leftDeath', Phaser.ArrayUtils.numberArray(12, 23), 12);
    this.mainCharDeath.animations.add('rightDeath', Phaser.ArrayUtils.numberArray(24, 35), 12);
    this.gameOverAnimationDelay = 150;
  }

  if (this.mainCharLastDirection == 0 ||
      this.mainCharLastDirection == 1 ||
      this.mainCharLastDirection == 2)
  {
    this.mainCharDeath.animations.play('backDeath');
    this.mainCharLastDirection = -1;
  }else if (this.mainCharLastDirection == 3 ||
            this.mainCharLastDirection == 4 ||
            this.mainCharLastDirection == 5)
  {
    this.mainCharDeath.animations.play('rightDeath');
    this.mainCharLastDirection = -1;
  }else if (this.mainCharLastDirection == 6 ||
            this.mainCharLastDirection == 7)
  {
    this.mainCharDeath.animations.play('leftDeath');
    this.mainCharLastDirection = -1;
  }

  this.enableMainChar = false;
  this.enableSideChar = false;
  this.sideChar.body.velocity.setTo(0, 0);
  this.mainChar.body.velocity.setTo(0, 0);

  if (this.gameOverAnimationDelay == 0)
  {
    this.game.bossfight.stop();
    this.charElec.play();
    this.game.state.start('GameOver', true, false, 6);
    this.walking.stop();
  }else
  {
    this.gameOverAnimationDelay--;
  }
},

companionFadeIn: function()
{
   if (this.bossCompanion.alpha == 0)
   {
     if (this.bossSpawning == false)
     {
       this.bossTeleport = this.game.add.sprite(this.bossCompanion.body.x, this.bossCompanion.body.y, 'bossTeleport');
       this.bossTeleport.animations.add('rightTeleport', Phaser.ArrayUtils.numberArray(13, 26), 12);
       this.bossTeleport.animations.play('rightTeleport');
       this.bossSpawning = true;
     }
   }
},

spawningComplete: function()
{
  this.bossSpawning = false;
  this.bossCompanion.alpha = 1;
  this.bossTeleport.alpha = 0;
},

bossCompanionDeath: function()
{
  this.bossCompanion.alpha = 0;
},

bossStateSwitch: function()
{
  this.bossBattleState++;
},

};

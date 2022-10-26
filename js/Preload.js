var PrototypeMaze = PrototypeMaze || {};

//loading the game assets
PrototypeMaze.Preload = function() {};

PrototypeMaze.Preload = {
  preload: function() {
//show loading screen
    this.splash = this.add.image(this.game.world.centerX, this.game.world.centerY, 'splashLoad');
    this.splash.anchor.setTo(0.5);
    this.splash.scale.setTo(0.32, 0.32);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

//load game assets

    //menu assets
    this.load.image('splashScreen', 'Assets/Images/splashScreen.png');
    this.load.image('Title', 'Assets/Images/lambent_title.png');
    this.load.image('menu', 'Assets/Images/menu.png');
    this.load.image('GameOverText', 'Assets/Images/GameOver.png');
    this.load.image('OptionsMenu', 'Assets/Images/optionsmenu.png');
    this.load.image('GameOverSprite', 'Assets/Images/GameOverSprite.png');
    this.load.spritesheet('MenuCompanion', 'Assets/Images/Companion_menu_spritesheet.png', 50, 80, 14);
    this.load.spritesheet('GoBack', 'Assets/Images/GoBack.png', 150, 50, 3);
    this.load.spritesheet('MainMenu', 'Assets/Images/MainMenu.png', 150, 50, 3);
    this.load.spritesheet('NewGame', 'Assets/Images/NewGame.png', 150, 50, 3);
    this.load.spritesheet('Options', 'Assets/Images/Options.png', 150, 50, 3);
    this.load.spritesheet('QuitGame', 'Assets/Images/QuitGame.png', 150, 50, 3);
    this.load.spritesheet('Credits', 'Assets/Images/Credits.png', 150, 50, 3);
    this.load.spritesheet('Sound', 'Assets/Images/Sound.png', 200, 50, 3);
    this.load.spritesheet('Skip', 'Assets/Images/skip.png', 150, 50, 3);
    this.load.spritesheet('RestartLevel', 'Assets/Images/RestartLevel.png', 215, 50, 3);
    this.load.spritesheet('lights1', 'Assets/Images/lights_1_menu_spritesheet.png', 80, 70, 2);
    this.load.spritesheet('lights2', 'Assets/Images/lights_2_menu_spritesheet.png', 80, 70, 2);
    this.load.spritesheet('lights3', 'Assets/Images/lights_3_menu_spritesheet.png', 80, 70, 2);
    this.load.spritesheet('lights4', 'Assets/Images/lights_4_menu_spritesheet.png', 80, 70, 2);
    this.load.spritesheet('lights5', 'Assets/Images/lights_5_menu_spritesheet.png', 80, 70, 2);


    //Tilemap and levels
    this.load.tilemap('TutMap', 'Assets/Maps/TutMap.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('L1Map', 'Assets/Maps/L1Map.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('L2Map', 'Assets/Maps/L2Map.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('L3Map', 'Assets/Maps/L3Map.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('L4Map', 'Assets/Maps/L4Map.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('L5Map', 'Assets/Maps/L5Map.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('BossMap', 'Assets/Maps/BossMap.csv', null, Phaser.Tilemap.CSV);
    this.load.image('tiles', 'Assets/Images/Tile_Map.png');

    //objects
    this.load.image('door', 'Assets/Images/door.png');
    this.load.image('door2', 'Assets/Images/door2.png');
    this.load.image('door3', 'Assets/Images/door3.png');
    this.load.image('door4', 'Assets/Images/door4.png');
    this.load.image('door5', 'Assets/Images/door5.png');
    this.load.spritesheet('torch', 'Assets/Images/torch_spritesheet.png', 64, 64, 3);
    this.load.spritesheet('coins', 'Assets/Images/coins.png', 23, 15, 7);
    this.load.spritesheet('gems', 'Assets/Images/gems.png', 22, 11, 8);
    this.load.image('skeleton', 'Assets/Images/skeleton.png');
    this.load.image('chest', 'Assets/Images/chest.png');
    this.load.image('bones1', 'Assets/Images/Bones1.png');
    this.load.image('bones2', 'Assets/Images/Bones2.png');
    this.load.image('bones3', 'Assets/Images/Bones3.png');
    this.load.image('bones4', 'Assets/Images/Bones4.png');
    this.load.image('bones5', 'Assets/Images/Bones5.png');
    this.load.image('bones6', 'Assets/Images/Bones6.png');
    this.load.image('mushroom_group', 'Assets/Images/mushroom_group.png');
    this.load.image('mushroom_group2', 'Assets/Images/mushroom_group2.png');
    this.load.image('mushroom_small', 'Assets/Images/mushroom_small.png');
    this.load.image('mushroom_small2', 'Assets/Images/mushroom_small2.png');
    this.load.image('mushroom_small_group', 'Assets/Images/mushroom_small_group.png');
    this.load.image('mushroom_small_group2', 'Assets/Images/mushroom_small_group2.png');
    this.load.image('mushroom_tall', 'Assets/Images/mushroom_tall.png');
    this.load.image('mushroom_tall2', 'Assets/Images/mushroom_tall2.png');
    this.load.image('roots', 'Assets/Images/roots.png');
    this.load.image('roots2', 'Assets/Images/roots2.png');
    this.load.image('roots3', 'Assets/Images/roots3.png');
    this.load.image('roots4', 'Assets/Images/roots4.png');
    this.load.image('Stalactite', 'Assets/Images/Stalactite.png');
    this.load.image('Stalactite2', 'Assets/Images/Stalactite2.png');
    this.load.image('Stalactite3', 'Assets/Images/Stalactite3.png');
    this.load.image('Stalactite4', 'Assets/Images/Stalactite4.png');
    this.load.image('Stalactite_broken', 'Assets/Images/Stalactite_broken.png');
    this.load.image('Stalactite_broken2', 'Assets/Images/Stalactite_broken2.png');
    this.load.image('Stalactite_small', 'Assets/Images/Stalactite_small.png');
    this.load.image('Stalactite_small2', 'Assets/Images/Stalactite_small2.png');
    this.load.image('Stalactite_small3', 'Assets/Images/Stalactite_small3.png');
    this.load.image('Stalactite_small4', 'Assets/Images/Stalactite_small4.png');
    this.load.image('Stalactite_small_broken', 'Assets/Images/Stalactite_small_broken.png');
    this.load.image('Stalactite_small_broken2', 'Assets/Images/Stalactite_small_broken2.png');



    //***Enemy Images and Spritesheets***
    this.load.image('wanderer', 'Assets/Images/Monster.png');
    this.load.image('crab', 'Assets/Images/Crab.png');
    this.load.image('rat', 'Assets/Images/rat.png');
    this.load.image('attack', 'Assets/Images/combat.png');
    this.load.spritesheet('crabAttack', 'Assets/Images/crabAttack.png', 101, 82, 50);
    this.load.spritesheet('ratMovement', 'Assets/Images/ratMovement.png', 80, 40, 32);
    this.load.spritesheet('ratAttack', 'Assets/Images/ratAttack.png', 159, 98, 42);
    this.load.spritesheet('strikerMovement', 'Assets/Images/mimicMovement.png', 59, 79, 90);
    this.load.spritesheet('strikerAttack', 'Assets/Images/mimicAttack.png', 90, 80, 30);
    this.load.spritesheet('strikerAttackUp', 'Assets/Images/mimicAttackUp.png', 90, 80, 20);
    this.load.spritesheet('strikerAttackDown', 'Assets/Images/mimicAttackDown.png', 90, 80, 20);
    this.load.spritesheet('reaperAttackLeft', 'Assets/Images/reaperAttackLeft.png', 70, 62, 26);
    this.load.spritesheet('reaperAttackRight', 'Assets/Images/reaperAttackRight.png', 70, 62, 26);
    this.load.spritesheet('reaperLeft', 'Assets/Images/reaperLeft.png', 70, 90, 26);
    this.load.spritesheet('reaperRight', 'Assets/Images/reaperRight.png', 70, 90, 26);
    this.load.spritesheet('reaperAggressive', 'Assets/Images/reaperAggressive.png', 115, 101, 48);

    //Player and companion assets
    this.load.spritesheet('player', 'Assets/Images/player_spritesheet.png', 28, 57, 32);
    this.load.spritesheet('companion', 'Assets/Images/companionAttackMovementTele.png', 64, 64, 124);
    this.load.spritesheet('companionAttack', 'Assets/Images/companionAttack.png', 64, 64, 81);
    this.load.spritesheet('companionAreaAttack', 'Assets/Images/companionAreaAttack.png', 300, 300, 12);
    this.load.spritesheet('stunned', 'Assets/Images/stunned.png', 70, 30);
    this.load.image('attack', 'Assets/Images/combat.png');
    this.load.image('sideCharAttack', 'Assets/Images/sideCharAttack_Static.png');

    //Boss assets
    this.load.spritesheet('boss', 'Assets/Images/skeletonClone.png', 65, 65, 12);
    this.load.spritesheet('bossCompanion', 'Assets/Images/enemyCompanion.png', 64, 64, 99);
    this.load.spritesheet('mainCharDeath', 'Assets/Images/electricBugaloo.png', 112, 57, 36);
    this.load.spritesheet('bossBeamAttack', 'Assets/Images/bossBeamAttack.png', 64, 320, 18);
    this.load.spritesheet('bossTeleport', 'Assets/Images/blueTeleport.png', 64, 64, 30);
    this.load.spritesheet('sideCharFusion', 'Assets/Images/electricBugalooReprise.png', 200, 200, 49);

    //music files
    this.load.audio('driplet', 'Assets/Music/water.mp3');
    this.load.audio('button', 'Assets/Music/Button.mp3');
    this.load.audio('boss', 'Assets/Music/Boss Fight.mp3');
    this.load.audio('Opening', 'Assets/Music/game teaser track.mp3');
    this.load.audio('crab', 'Assets/Music/Crab.mp3');
    this.load.audio('mice', 'Assets/Music/Mice Sound.mp3');
    this.load.audio('monster', 'Assets/Music/Monster Sound.mp3');
    this.load.audio('strikerSound', 'Assets/Music/Striker Noise.mp3');
    this.load.audio('flesh', 'Assets/Music/Tearing Into Sound.mp3');
    this.load.audio('wandererSound', 'Assets/Music/Wanderer.mp3');
    this.load.audio('maze1Music', 'Assets/Music/Slough Of Despond.mp3');
    this.load.audio('walking', 'Assets/Music/running.mp3');
    this.load.audio('attack', 'Assets/Music/attack.mp3');
    this.load.audio('strikerWalk', 'Assets/Music/strikerWalkSound.mp3');
    this.load.audio('crabWalk', 'Assets/Music/Walking on Gravel.mp3');
    this.load.audio('teleport', 'Assets/Music/teleport.mp3');
    this.load.audio('firstAttack', 'Assets/Music/Boss First Attack.mp3');
    this.load.audio('LaserAttack', 'Assets/Music/Boss Laser Attack.mp3');
    this.load.audio('bossDmg', 'Assets/Music/Boss Damage.mp3');
    this.load.audio('charDeath', 'Assets/Music/deathSound.mp3');
    this.load.audio('death', 'Assets/Music/Death.mp3');
    this.load.audio('coin', 'Assets/Music/coin.mp3');

    //cutscences
    this.load.video('intro', 'Assets/Clips/intro.mp4');
    this.load.video('tutCS', 'Assets/Clips/tutorial.mp4');
    this.load.video('1CS', 'Assets/Clips/level1.mp4');
    this.load.video('2CS', 'Assets/Clips/level2.mp4');
    this.load.video('3CS', 'Assets/Clips/level3.mp4');
    this.load.video('4CS', 'Assets/Clips/level4.mp4');
    this.load.video('5CS', 'Assets/Clips/level5.mp4');
    this.load.video('endgame', 'Assets/Clips/endgame.mp4');
    this.load.video('creditsCS', 'Assets/Clips/Credits.mp4');

    //Tutorial text
    this.load.image('wasd', 'Assets/Text/wasd.png');
    this.load.image('time', 'Assets/Text/time.png');
    this.load.image('hold', 'Assets/Text/hold.png');
    this.load.image('shift', 'Assets/Text/shift.png');
    this.load.image('release', 'Assets/Text/release.png');
    this.load.image('switch', 'Assets/Text/switch.png');
    this.load.image('stairs', 'Assets/Text/stairs.png');

    //***Visual FX***
    this.load.image('dust0', 'Assets/Images/dust cloud.png');
    this.load.script('torchFilter', 'js/torchFilter.js');
    this.load.script('torch', 'js/torch.js');


  },
  create: function() {

    this.state.start('MainMenu');

  }
};

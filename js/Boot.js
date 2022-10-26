var PrototypeMaze = PrototypeMaze || {

};

PrototypeMaze.Boot = function(game) {};

//setting game configuration and loading the assets for the loading screen
PrototypeMaze.Boot = {
  preload: function() {
//assets we'll use in the loading screen
    this.load.image('splashLoad', 'Assets/Images/splashScreen.png');
    this.load.image('preloadbar', 'Assets/Images/preloader-bar.png');
  },
  create: function() {

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

//loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;

    //physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.state.start('Preload');
  }
};

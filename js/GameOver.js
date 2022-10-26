var PrototypeMaze = PrototypeMaze || {};

//title screen
PrototypeMaze.GameOver = function() {};

PrototypeMaze.GameOver = {

  init: function(level) {
    if (this.game.bossfight != undefined)
    {
      this.game.bossfight.destroy();
    }
    var gameRestartState;

    if (level == 0)
    {
      this.gameRestartState = 'LevelTut';
    }else if (level == 1)
    {
      this.gameRestartState = 'Level1';
    }else if (level == 2)
    {
      this.gameRestartState = 'Level2';
    }else if (level == 3)
    {
      this.gameRestartState = 'Level3';
    }else if (level == 4)
    {
      this.gameRestartState = 'Level4';
    }else if (level == 5)
    {
      this.gameRestartState = 'Level5';
    }else if (level == 6)
    {
      this.gameRestartState = 'LevelBoss';
    }
  },

  create: function() {

    this.game.stage.backgroundColor = '#000000';

    //game over text
    this.gameOver = this.game.add.image(60, 50, 'GameOverText');

    this.gameOverCompanion = this.game.add.sprite(400, 275, 'GameOverSprite');

    this.gameOverCompanion.animations.add('float', [0], 6, true);
    this.gameOverCompanion.animations.play('float');

    this.mainmenuButton = this.game.add.sprite(50, 250, 'MainMenu');
    this.restartButton = this.game.add.sprite(50, 150, 'RestartLevel');

    this.button = this.game.add.audio('button');

    },

    update: function() {

    this.buttonState(this.mainmenuButton);
    this.buttonState(this.restartButton);

    },

    mainmenuOnClick: function() {
    this.button.play();
    this.game.state.start('MainMenu');
    },

    restartOnClick: function() {
      this.button.play();
      this.game.state.start(this.gameRestartState);
    },

    buttonState: function(button) {

    // console.log('Inside func');

    button.inputEnabled;

    var buttonX = button.x + 75;
    var buttonY = button.y + 25;

    // console.log('buttonX:' + buttonX);
    // console.log('buttonY:' + buttonY);

    var mouseX = this.game.input.mousePointer.x;
    var mouseY = this.game.input.mousePointer.y;

    // console.log('mouseX:' + mouseX);
    // console.log('mouseY:' + mouseY);

    if (mouseX >= buttonX - 75 && mouseX <= buttonX + 75 && mouseY >= buttonY - 25 && mouseY <= buttonY + 25)
    {
      button.frame = 1;

      if (this.game.input.activePointer.leftButton.isDown)
      {
        button.frame = 2;
        if (button == this.mainmenuButton)
        {
          this.mainmenuOnClick();
        }
        else if (button == this.restartButton)
        {
          this.restartOnClick();
        }

      }
    }

    else
    {
      button.frame = 0;
    }

    },

};

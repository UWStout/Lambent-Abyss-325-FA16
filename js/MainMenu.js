var PrototypeMaze = PrototypeMaze || {};

//title screen
PrototypeMaze.MainMenu = function() {};

PrototypeMaze.MainMenu = {

  create: function() {
//show the space tile, repeated

    this.background = this.add.image(0, 0, 'menu');
    this.background.width = this.game.width;
    this.background.height = this.game.height;
    this.titleText = this.game.add.image(110, 100, 'Title');
    this.MenuCompanion = this.game.add.sprite(370, 200, 'MenuCompanion');

    this.MenuCompanion.animations.add('float', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 8, true);
    this.MenuCompanion.animations.play('float');

    this.lightTime = this.game.time.totalElapsedSeconds() + 2;
    this.lightTime2 = this.game.time.totalElapsedSeconds() + 4;
    this.lightTime3 = this.game.time.totalElapsedSeconds() + 6;
    this.lightTime4 = this.game.time.totalElapsedSeconds() + 8;
    this.lightTime5 = this.game.time.totalElapsedSeconds() + 10;
    this.lightTime6 = this.game.time.totalElapsedSeconds() + 12;
    this.lightTime7 = this.game.time.totalElapsedSeconds() + 14;
    this.lightTime8 = this.game.time.totalElapsedSeconds() + 16;
    this.lightTime9 = this.game.time.totalElapsedSeconds() + 18;
    this.lightTime10 = this.game.time.totalElapsedSeconds() + 20;

    this.newgameButton = this.game.add.sprite(25, 530, 'NewGame');
    this.optionsButton = this.game.add.sprite(250, 530, 'Options');
    this.creditsButton = this.game.add.sprite(475, 530, 'Credits');
    this.quitButton = this.game.add.sprite(650, 530, 'QuitGame');

    this.button = this.game.add.audio('button');

  },

  update: function() {

    this.lightTimeChange();
    this.buttonState(this.newgameButton);
    this.buttonState(this.optionsButton);
    this.buttonState(this.creditsButton);
    this.buttonState(this.quitButton);

  },

  lightTimeChange: function() {

    if (this.lightTime > this.game.time.totalElapsedSeconds())
    {
        this.lights1 = this.game.add.sprite(32, 50, 'lights1');
        this.lights1.animations.add('blink', [0, 1], 2, false);
        this.lights1.animations.play('blink');
    }
    else if (this.lightTime2 > this.game.time.totalElapsedSeconds())
    {
      this.lights2 = this.game.add.sprite(272, 453, 'lights2');
      this.lights2.animations.add('blink2', [0, 1], 2, false);
      this.lights2.animations.play('blink2');
    }
    else if (this.lightTime3 > this.game.time.totalElapsedSeconds())
    {
      this.lights3 = this.game.add.sprite(400, 130, 'lights3');
      this.lights3.animations.add('blink3', [0, 1], 2, false);
      this.lights3.animations.play('blink3');
    }
    else if (this.lightTime4 > this.game.time.totalElapsedSeconds())
    {
      this.lights4 = this.game.add.sprite(720, 83, 'lights4');
      this.lights4.animations.add('blink4', [0, 1], 2, false);
      this.lights4.animations.play('blink4');
    }
    else if (this.lightTime5 > this.game.time.totalElapsedSeconds())
    {
      this.lights5 = this.game.add.sprite(155, 80, 'lights5');
      this.lights5.animations.add('blink5', [0, 1], 2, false);
      this.lights5.animations.play('blink5');
    }
    else if (this.lightTime6 > this.game.time.totalElapsedSeconds())
    {
        this.lights6 = this.game.add.sprite(231, 220, 'lights1');
        this.lights6.animations.add('blink', [0, 1], 2, false);
        this.lights6.animations.play('blink');
    }
    else if (this.lightTime7 > this.game.time.totalElapsedSeconds())
    {
      this.lights7 = this.game.add.sprite(587, 483, 'lights2');
      this.lights7.animations.add('blink2', [0, 1], 2, false);
      this.lights7.animations.play('blink2');
    }
    else if (this.lightTime8 > this.game.time.totalElapsedSeconds())
    {
      this.lights8 = this.game.add.sprite(712, 350, 'lights3');
      this.lights8.animations.add('blink3', [0, 1], 2, false);
      this.lights8.animations.play('blink3');
    }
    else if (this.lightTime9 > this.game.time.totalElapsedSeconds())
    {
      this.lights9 = this.game.add.sprite(20, 365, 'lights4');
      this.lights9.animations.add('blink4', [0, 1], 2, false);
      this.lights9.animations.play('blink4');
    }
    else if (this.lightTime10 > this.game.time.totalElapsedSeconds())
    {
      this.lights10 = this.game.add.sprite(657, 21, 'lights5');
      this.lights10.animations.add('blink5', [0, 1], 2, false);
      this.lights10.animations.play('blink5');
    }

  },

  newGameOnClick: function() {
    this.button.play();
    this.game.state.start('IntroCS');

  },

  optionsOnClick: function() {
    this.button.play();
    this.game.state.start('Options');
  },

  creditsOnClick: function() {
    this.button.play();
    this.game.state.start('Credits');
  },

  quitOnClick: function() {
    this.button.play();
    this.game.destroy();
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
        if (button == this.newgameButton)
        {
          this.newGameOnClick();
        }

        else if (button == this.optionsButton)
        {
          this.optionsOnClick();
        }

        else if (button == this.creditsButton)
        {
          this.creditsOnClick();
        }

        else if (button == this.quitButton)
        {
          this.quitOnClick();
        }
      }
    }

    else
    {
      button.frame = 0;
    }

  },

};

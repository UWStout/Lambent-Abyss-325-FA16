var PrototypeMaze = PrototypeMaze || {};

//title screen
PrototypeMaze.Level2CS = function() {};

PrototypeMaze.Level2CS = {

  create: function() {

    this.videoTime = this.game.time.totalElapsedSeconds() + 20;

    this.game.stage.backgroundColor = '#000000';

    var video;
    // var sprite;

    this.video = this.game.add.video('2CS');

    this.video.play(false);

    this.video.addToWorld(this.game.width / 2, this.game.height / 2, 0.5, 0.5, 0.6, 0.6);

    this.goBackButton = this.game.add.sprite(700, 550, 'Skip');

    this.button = this.game.add.audio('button');

    },

    update: function() {

      this.timeStateChange();
      this.buttonState(this.goBackButton);

    },

    timeStateChange: function() {

      if (this.videoTime > this.game.time.totalElapsedSeconds()) {

      }
      else {
        this.game.state.start('Level3');
      }


    },

    goBackOnClick: function() {
    this.button.play();
    this.video.mute = true;
    this.game.state.start('Level3');
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
        if (button == this.goBackButton)
        {
          this.goBackOnClick();
        }

      }
    }

    else
    {
      button.frame = 0;
    }

    },

};

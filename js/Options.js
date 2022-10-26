var PrototypeMaze = PrototypeMaze || {};

//title screen
PrototypeMaze.Options = function() {};

PrototypeMaze.Options = {

  create: function() {
//show the space tile, repeated
    this.background = this.add.image(0, 0, 'OptionsMenu');
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    //start game text
    var text = 'Options';
    var style = { font: '30px Arial', fill: '#fff', align: 'center' };
    var t = this.game.add.text(this.game.width / 2, this.game.height / 1.25, text, style);
    t.anchor.set(0.5);

    this.soundButton = this.game.add.sprite(50, 50, 'Sound');
    this.goBackButton = this.game.add.sprite(50, 250, 'GoBack');

    this.button = this.game.add.audio('button');

  },

  update: function() {

    this.buttonState(this.soundButton);
    this.buttonState(this.goBackButton);

  },

  soundOnClick: function() {
    this.button.play();
    if (!this.game.sound.mute)
    {
      this.game.sound.mute = true;
    }
    else
    {
      this.game.sound.mute = false;
    }
  },

  goBackOnClick: function() {
    this.button.play();
    this.game.state.start('MainMenu');
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
        if (button == this.soundButton)
        {
          this.soundOnClick();
        }

        else if (button == this.goBackButton)
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

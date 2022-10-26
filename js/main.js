var PrototypeMaze = PrototypeMaze || {};

PrototypeMaze.game = new Phaser.Game(800, 600, Phaser.WEBGL, '');

PrototypeMaze.game.state.add('Boot', PrototypeMaze.Boot);
PrototypeMaze.game.state.add('Preload', PrototypeMaze.Preload);
PrototypeMaze.game.state.add('MainMenu', PrototypeMaze.MainMenu);
PrototypeMaze.game.state.add('LevelTut', PrototypeMaze.LevelTut);
PrototypeMaze.game.state.add('Level1', PrototypeMaze.Level1);
PrototypeMaze.game.state.add('Level2', PrototypeMaze.Level2);
PrototypeMaze.game.state.add('Level3', PrototypeMaze.Level3);
PrototypeMaze.game.state.add('Level4', PrototypeMaze.Level4);
PrototypeMaze.game.state.add('Level5', PrototypeMaze.Level5);
PrototypeMaze.game.state.add('LevelBoss', PrototypeMaze.LevelBoss);
PrototypeMaze.game.state.add('GameOver', PrototypeMaze.GameOver);
PrototypeMaze.game.state.add('Credits', PrototypeMaze.Credits);
PrototypeMaze.game.state.add('Options', PrototypeMaze.Options);
PrototypeMaze.game.state.add('IntroCS', PrototypeMaze.IntroCS);
PrototypeMaze.game.state.add('TutCS', PrototypeMaze.TutorialCS);
PrototypeMaze.game.state.add('1CS', PrototypeMaze.Level1CS);
PrototypeMaze.game.state.add('2CS', PrototypeMaze.Level2CS);
PrototypeMaze.game.state.add('3CS', PrototypeMaze.Level3CS);
PrototypeMaze.game.state.add('4CS', PrototypeMaze.Level4CS);
PrototypeMaze.game.state.add('5CS', PrototypeMaze.Level5CS);
PrototypeMaze.game.state.add('EndGameCS', PrototypeMaze.EndGameCS);


PrototypeMaze.game.state.start('Boot');

//torch.js
var createTorch = function(game, x, y)
{
  ret = {};
  ret.x = x;
  ret.y = y;
  ret.filter = game.add.filter('torchFilter');
  ret.filter.time = 0;
  ret.filter.r = 1.0;
  ret.filter.g = 0.4;
  ret.filter.b = 0.2;

  return ret;
}
var updateTorch = function(torch, ticks, game, camx, camy)
{
  torch.filter.time = ticks;
  torch.filter.posx = (torch.x / game.width) - camx;
  torch.filter.posy = (torch.y / game.height) - camy;
}

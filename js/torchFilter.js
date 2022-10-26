//the torch filter is used to draw a torch with a radius, and a time value to create the flicker effect, these filters can be efficiently chained onto the texture
Phaser.Filter.torchFilter = function(game){
  Phaser.Filter.call(this, game);

  this.uniforms.time = {type: '1f', value: 10};
  this.uniforms.posx = {type: '1f', value: 0};
  this.uniforms.posy = {type: '1f', value: 0};
  this.uniforms.radius = {type: '1f', value: 0.3};
  this.uniforms.r = {type: '1f', value: 1};
  this.uniforms.g = {type: '1f', value: 1};
  this.uniforms.b = {type: '1f', value: 1};
  this.uniforms.aspect = {type: '1f', value: 600.0 / 800.0};

  this.fragmentSrc = [
    "precision mediump float;",
    "varying vec2 vTextureCoord;",
    "uniform sampler2D uSampler;",
    "uniform float time;",
    "uniform float posx;",
    "uniform float posy;",
    "uniform float radius;",
    "uniform float r;",
    "uniform float g;",
    "uniform float b;",
    "uniform float aspect;",

    "void main(void) {",
      "float rad = radius + (radius * ((sin(time*0.05) * 0.05)));",
      "vec4 s = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
      "float diffx = vTextureCoord.x - posx;",
      "float diffy = vTextureCoord.y - posy;",
      "diffy *= aspect;",
      "float dist = (diffx * diffx) + (diffy * diffy);",
      "dist = sqrt(dist);",
      "float torchInfluence = max(1.0 - (dist / rad), 0.0);",
      "vec4 torchColor = vec4(r, g, b, 1.0) * torchInfluence;",
      "torchColor.a = 1.0;",
      "gl_FragColor = torchColor + s;",

    "}"
  ];
}

Phaser.Filter.torchFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.torchFilter.prototype.constructor = Phaser.Filter.torchFilter;

Object.defineProperty(Phaser.Filter.torchFilter.prototype, 'time', {
  get: function() {
    return this.uniforms.time.value;
  },
  set: function(value){
    this.dirty = true;
    this.uniforms.time.value = value;
  }
});
Object.defineProperty(Phaser.Filter.torchFilter.prototype, 'posx', {
  get: function() {
    return this.uniforms.posx.value;
  },
  set: function(value){
    this.dirty = true;
    this.uniforms.posx.value = value;
  }
});
Object.defineProperty(Phaser.Filter.torchFilter.prototype, 'posy', {
  get: function() {
    return this.uniforms.posy.value;
  },
  set: function(value){
    this.dirty = true;
    this.uniforms.posy.value = value;
  }
});
Object.defineProperty(Phaser.Filter.torchFilter.prototype, 'r', {
  get: function() {
    return this.uniforms.r.value;
  },
  set: function(value){
    this.dirty = true;
    this.uniforms.r.value = value;
  }
});
Object.defineProperty(Phaser.Filter.torchFilter.prototype, 'g', {
  get: function() {
    return this.uniforms.g.value;
  },
  set: function(value){
    this.dirty = true;
    this.uniforms.g.value = value;
  }
});
Object.defineProperty(Phaser.Filter.torchFilter.prototype, 'b', {
  get: function() {
    return this.uniforms.b.value;
  },
  set: function(value){
    this.dirty = true;
    this.uniforms.b.value = value;
  }
});
Object.defineProperty(Phaser.Filter.torchFilter.prototype, 'radius', {
  get: function() {
    return this.uniforms.radius.value;
  },
  set: function(value){
    this.dirty = true;
    this.uniforms.radius.value = value;
  }
});

Phaser.Filter.lightmapShader = function(game){
  Phaser.Filter.call(this, game);

  this.uniforms.blur = {type: '1f', value: 1 / 512};
  this.uniforms.dx = {type: '1f', value: 1 / 800};
  this.uniforms.dy = {type: '1f', value: 1 / 600};

  this.fragmentSrc = [

    "precision mediump float;",
    "varying vec2 vTextureCoord;",
    "varying vec4 vColor;",
    "uniform float blur;",
    "uniform float dx;",
    "uniform float dy;",
    "uniform sampler2D uSampler;",

    "void main(void) {",
      "float sm = 0.0;",
      "float tdx = 2.0 * dx;",
      "float tdy = 2.0 * dy;",
      "vec4 t = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
      "vec4 s = t;",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.22508352;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x-dx, vTextureCoord.y));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.11098164;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x+dx, vTextureCoord.y));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.11098164;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y+dy));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.11098164;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y-dy));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.11098164;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x-dx, vTextureCoord.y-dy));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.05472157;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x+dx, vTextureCoord.y-dy));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.05472157;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x-dx, vTextureCoord.y+dy));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.05472157;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x+dx, vTextureCoord.y+dy));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.05472157;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x-tdx, vTextureCoord.y));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.013330373;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x+tdx, vTextureCoord.y));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.013330373;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y-tdy));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.013330373;",
      "t = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y+tdy));",
      "sm += t.b - ((t.g + t.r) / 2.0) * 0.013330373;",
      "sm /= 7.0;",

      /*"vec4 s = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
      "vec4 u = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y+dy))/8.0;",
      "vec4 d = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y-dy))/8.0;",
      "vec4 l = texture2D(uSampler, vec2(vTextureCoord.x-dx, vTextureCoord.y))/8.0;",
      "vec4 r = texture2D(uSampler, vec2(vTextureCoord.x+dx, vTextureCoord.y))/8.0;",
      "float m = u.b - ((u.g + u.r) / 2.0);",
      "m += d.b - ((d.g + d.r) / 2.0);",
      "m += l.b - ((l.g + l.r) / 2.0);",
      "m += r.b - ((r.g + r.r) / 2.0);",
      //"s = vec4(s.x + u.x + d.x + l.x + r.x, s.y + u.y + d.y + l.y + r.y, s.z + u.z + d.z + l.z + r.z, 1.0);",
      //"s/=1.5;",
      //"s.rgb *= 0.2;",
      "float sm = (s.b - ((s.g + s.r) / 2.0)) * 2.0;",
      "m /= 16.0;",
      "sm += m;",*/
      "float mul = clamp(sm, 0.2, 1.0);",
      "s.rgb *= mul;",
      "gl_FragColor = s;",

    "}"
  ];
}

Phaser.Filter.lightmapShader.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.lightmapShader.prototype.constructor = Phaser.Filter.lightmapShader;

Object.defineProperty(Phaser.Filter.lightmapShader.prototype, 'blur', {
  get: function() {
    return this.uniforms.blur.value / (1/7000);
  },

  set: function(value) {
    this.dirty = true;
    this.uniforms.blur.value = (1/7000) * value;
  }
});

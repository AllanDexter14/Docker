(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /*  pixel sprites drawn from text grids  */
  function makeSprite(rows, pal, scale) {
    var h = rows.length, w = rows[0].length;
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var x = c.getContext('2d');
    rows.forEach(function (r, j) {
      for (var i = 0; i < w; i++) {
        var col = pal[r[i]];
        if (col) { x.fillStyle = col; x.fillRect(i, j, 1, 1); }
      }
    });
    return { url: c.toDataURL(), w: w * scale, h: h * scale };
  }

  function box(cls, s) {
    var d = document.createElement('div');
    d.className = cls;
    d.style.width = s.w + 'px';
    d.style.height = s.h + 'px';
    d.style.backgroundImage = 'url(' + s.url + ')';
    return d;
  }

  var piglin = makeSprite([
    '..pppppp..',
    '.pppppppp.',
    'ppkpppkppp',
    'ppppddpppp',
    '.ppwddwpp.',
    '..pppppp..',
    '..gggggg..',
    '.gggggggg.',
    'pggggggggp',
    'pggyyyyggp',
    'pggggggggp',
    '..gggggg..',
    '..nn..nn..',
    '..nn..nn..',
    '..nn..nn..',
    '.nnn..nnn.'
  ], { p: '#e39b86', d: '#b86b58', w: '#ffffff', k: '#1a0a0a', g: '#d9a520', y: '#fff1a8', n: '#5a3320' }, 3);

  var hoglin = makeSprite([
    '......mmmmmm......',
    '....mmmmmmmmmm....',
    '..bbbbbbbbbbbbbbbb',
    '.bbbbbbbbbbbbbbkdd',
    '.bbbbbbbbbbbbbbbdd',
    '.bbbbbbbbbbbbbbddw',
    '.bbbbbbbbbbbbbbbw.',
    '..bbbbbbbbbbbbbb..',
    '.bb..bb....bb..bb.',
    '.bb..bb....bb..bb.',
    '.bb..bb....bb..bb.',
    '.nn..nn....nn..nn.'
  ], { m: '#3a2016', b: '#9b4a2a', d: '#d98a8a', w: '#ffffff', k: '#000000', n: '#3a2016' }, 3);

  var strider = makeSprite([
    '..rr..rr..rr..',
    '.rrrrrrrrrrrr.',
    'rrrrrrrrrrrrrr',
    'rrrrrrrrrrrrkr',
    'rrrrrrrrrrrrrr',
    '.dddddddddddd.',
    '..ll......ll..',
    '..ll......ll..',
    '..ll......ll..',
    '..ll......ll..',
    '..ll......ll..',
    '.lll......lll.'
  ], { r: '#c0392b', d: '#7f1d1d', l: '#e8602c', k: '#111111' }, 3);

  function mob(cls, sprite) {
    var outer = document.createElement('div');
    outer.className = 'nx-mob ' + cls;
    var inner = box('nx-bob', sprite);
    outer.appendChild(inner);
    return outer;
  }

  /* scene: piglin chasing hoglin across the bottom  */
  var chase = document.createElement('div');
  chase.id = 'nx-chase';
  chase.appendChild(mob('nx-hoglin', hoglin));
  chase.appendChild(mob('nx-piglin', piglin));
  document.body.appendChild(chase);

  /* lava strip + strider at the bottom of the sidebar */
  var lava = document.createElement('div');
  lava.id = 'nx-lava';
  lava.appendChild(mob('nx-strider', strider));
  document.body.appendChild(lava);

  /*  floating embers  */
  if (reduce) return;
  var cv = document.createElement('canvas');
  cv.id = 'nx-particles';
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d'), W = 0, H = 0, ps = [];

  function resize() { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
  function spawn(initial) {
    var soul = Math.random() < 0.08;
    return {
      x: Math.random() * W,
      y: initial ? Math.random() * H : H + 10,
      s: 2 + Math.floor(Math.random() * 3),
      vy: -(0.3 + Math.random() * 0.9),
      vx: (Math.random() - 0.5) * 0.4,
      a: 0.4 + Math.random() * 0.6,
      w: Math.random() * 6.28,
      c: soul ? '#5ad1e6' : (Math.random() < 0.5 ? '#ff6a00' : '#ffcf4d')
    };
  }
  function init() {
    resize();
    var n = Math.min(70, Math.floor(W / 18));
    ps = [];
    for (var i = 0; i < n; i++) ps.push(spawn(true));
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      p.w += 0.03;
      p.x += p.vx + Math.sin(p.w) * 0.3;
      p.y += p.vy;
      if (p.y < -10) { ps[i] = spawn(false); continue; }
      ctx.globalAlpha = p.a * (0.3 + 0.7 * (p.y / H));
      ctx.fillStyle = p.c;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', init);
  init();
  tick();
})();
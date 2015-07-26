var stage, 
    graphics, 
    renderer;

$(function(){

  var ballOne = {direction: 'left', size:50};
  var ballTwo = {direction: 'right', size:50};
  var balls   = [ballOne, ballTwo];
  var count   = 150;
  var HEIGHT  = $(window).height();
  var WIDTH   = $(window).width();
  var orbSrc  = 'http://i.imgur.com/cYTZm9X.png';
  var bgSrc   = 'http://i.imgur.com/e568HZR.jpg';

  stage = new PIXI.Container({
    width: WIDTH,
    height: HEIGHT
  });

  stage.interactive = true;

  renderer = PIXI.autoDetectRenderer(
    WIDTH,
    HEIGHT,
    {transparent: true}
  );

  graphics = new PIXI.Graphics();
  graphics.interactive = true;
  graphics.lineStyle(0);

  stage.addChild(graphics);

  $('body').append(renderer.view);
  renderer.render(stage);

  var out = true;

  var container = new PIXI.Container();
  stage.addChild(container);

  var displacementSprite = PIXI.Sprite.fromImage(orbSrc);
  var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  stage.addChild(displacementSprite);
  container.filters = [displacementFilter];

  displacementFilter.scale.x = 90;
  displacementFilter.scale.y = 90;

  var bg = PIXI.Sprite.fromImage(bgSrc);
  bg.width = renderer.width;
  bg.height = renderer.height;

  bg.alpha = 0.6;

  container.addChild(bg);

  stage
      .on('mousemove', onPointerMove)
      .on('touchmove', onPointerMove);

  function onPointerMove(eventData) {
    displacementSprite.x = eventData.data.global.x - 100;
    displacementSprite.y = eventData.data.global.y - displacementSprite.height /2;
  }

  animate();

  function animate() {

    console.log(out, 'ball one', ballOne.size, 'ball two', ballTwo.size, count);

    balls.forEach(function(o, i) {
      if (count < 0) {
        o.size += 0.25;
      } else {
        o.size -= 0.25;
      }
    });

    if (out) {
      count++;
    } else {
      count--;
    }
    if (Math.abs(count) > 150) {
      out = !out;
      ballOne.direction = ballOne.direction === 'left' ? 'right' : 'left';
      ballTwo.direction = ballTwo.direction === 'left' ? 'right' : 'left';
    }

    graphics.clear();

    var x = WIDTH/2,
        y = HEIGHT/2,
        yOne = y + count,
        yTwo = y - count,
        xOne = x + count,
        xTwo = x - count;

    if (out) {
      graphics.beginFill((0xFF0000), 0.6);
      graphics.drawCircle(xOne, y, ballOne.size);
      graphics.endFill();

      graphics.beginFill((0x0000FF), 0.6);
      graphics.drawCircle(xTwo, y, ballTwo.size);
      graphics.endFill();

      graphics.beginFill((0xFFFF00), 0.6);
      graphics.drawCircle(x, yOne, ballOne.size);
      graphics.endFill();

      graphics.beginFill((0x00FFFF), 0.6);
      graphics.drawCircle(x, yTwo, ballTwo.size);
      graphics.endFill();

      graphics.beginFill((0xFFFF00), 0.6);
      graphics.drawCircle(xOne, yOne, ballOne.size);
      graphics.endFill();

      graphics.beginFill((0x00FFFF), 0.6);
      graphics.drawCircle(xTwo, yTwo, ballTwo.size);
      graphics.endFill();

      graphics.beginFill((0xFFFF00), 0.6);
      graphics.drawCircle(xOne, yTwo, ballOne.size);
      graphics.endFill();

      graphics.beginFill((0x00FF00), 0.6);
      graphics.drawCircle(xTwo, yOne, ballTwo.size);
      graphics.endFill();

    } else {
      graphics.beginFill((0x0000FF), 0.6);
      graphics.drawCircle(xTwo, y, ballTwo.size);
      graphics.endFill();

      graphics.beginFill((0xFF0000), 0.6);
      graphics.drawCircle(xOne, y, ballOne.size);
      graphics.endFill();

      graphics.beginFill((0x00FFFF), 0.6);
      graphics.drawCircle(x, yTwo, ballTwo.size);
      graphics.endFill();

      graphics.beginFill((0xFFFF00), 0.6);
      graphics.drawCircle(x, yOne, ballOne.size);
      graphics.endFill();

      graphics.beginFill((0x00FFFF), 0.6);
      graphics.drawCircle(xTwo, yTwo, ballTwo.size);
      graphics.endFill();

      graphics.beginFill((0xFFFF00), 0.6);
      graphics.drawCircle(xOne, yOne, ballOne.size);
      graphics.endFill();

      graphics.beginFill((0x00FF00), 0.6);
      graphics.drawCircle(xTwo, yOne, ballTwo.size);
      graphics.endFill();

      graphics.beginFill((0xFFFF00), 0.6);
      graphics.drawCircle(xOne, yTwo, ballOne.size);
      graphics.endFill();
    }

    renderer.render(stage);
    requestAnimationFrame(animate);

  }

});

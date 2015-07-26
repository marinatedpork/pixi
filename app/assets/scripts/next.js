var stage, 
	  graphics, 
	  renderer;

$(function(){

  var count = 1;
  var HEIGHT = $(window).height();
  var WIDTH = $(window).width();
  var orbSrc = 'http://i.imgur.com/cYTZm9X.png';
  var bgSrc = 'http://i.imgur.com/e568HZR.jpg';

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
  	console.log(eventData);
	  displacementSprite.x = eventData.data.global.x - 100;
	  displacementSprite.y = eventData.data.global.y - displacementSprite.height /2;
	}

  animate();

  function animate() {

  	if (out) {
	  	count++;
  	} else {
  		count--;
  	}
  	if (count === 150 || count === 1) {
  		out = !out;
  	}
  	// graphics.rotation += 0.01;
  	graphics.clear();

  	
  	

  	graphics.beginFill((0x0000FF * count), 0.8);
  	graphics.drawCircle((WIDTH/2), ((HEIGHT/2) - count), count);
  	graphics.endFill();

  	graphics.beginFill((0xFF0000 * count), 0.8);
  	graphics.drawCircle((WIDTH/2), ((HEIGHT/2) + count), count);
  	graphics.endFill();

  	graphics.beginFill((0x00FFFF * count), 0.8);
  	graphics.drawCircle(((WIDTH/2) - count), (HEIGHT/2), count);
  	graphics.endFill();

  	graphics.beginFill((0xFFFF00 * count), 0.8);
  	graphics.drawCircle(((WIDTH/2) + count), (HEIGHT/2), count);
  	graphics.endFill();
	  renderer.render(stage);
  	requestAnimationFrame(animate);

  }

});

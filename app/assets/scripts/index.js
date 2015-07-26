var anotherObject, stage, rotatingObject, startFrame, renderer;

$(document).ready(function(){

  var HEIGHT = $(window).height();
  var WIDTH = $(window).width();

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
  
  rotatingObject = new PIXI.Graphics();
  rotatingObject.interactive = true;
  stage.addChild(rotatingObject);
  rotatingObject.position.x = 620/2;
  rotatingObject.position.y = 380/2;

  var text = new PIXI.Text('Meow',{align: 'left'});
  var count = 0;

  rotatingObject.addChild(text);
  draw(rotatingObject, count, renderer);

  rotatingObject.on('click', function(interaction){
    requestAnimationFrame(animate);
  });
  
  $('body').append(renderer.view);


  function draw(obj, count, r){
    obj.clear();
    obj.lineStyle(30, 0x000000, 0.5);
    obj.beginFill(0xffFFFF, 0.5);
    obj.moveTo(-120, -100);
    obj.lineTo(120, -100);
    obj.lineTo(120, 100);
    obj.lineTo(-120, 100);
    obj.lineTo(-120, -100);
    r.render(stage);
  }

  function animate(frame) {
    var CIRCLE = (2 * Math.PI);
    if (!startFrame) {
      startFrame = frame;
    }
    if (rotatingObject.rotation >= CIRCLE) {
      startFrame = undefined;
      rotatingObject.rotation = 0;
      count = 0;
    } else {
      rotatingObject.clear();
      draw(rotatingObject, count, renderer);
      rotatingObject.rotation = count * 2;
      count += 0.001;
      renderer.render(stage);
      requestAnimationFrame( animate );
    }
  }

});
var loader;
var cats = [];
var renderer;

$(function() {
	loader = new PIXI.loaders.Loader('assets/animations/');
	loader.add(['sheet.json']);
	loader.on('complete', onAssetsLoaded);
	loader.on('progress', function(e,r){return true;});
	loader.load();

	var count = 0;
	var catdex = 0;
		
	var stage = new PIXI.Container(0xFFFFFF);;
	
	// create a renderer instance.
	renderer = PIXI.autoDetectRenderer(800, 600, {transparent: true});
	
	// add the renderer view element to the DOM
	$('body').append(renderer.view);
	
	// create an empty container
	var catsContainer = new PIXI.Container();
	catsContainer.position.x = 100;
	catsContainer.position.y = 100;
	stage.addChild(catsContainer);

	function onAssetsLoaded() {
		for (var i = 0; i < 8; i++) {
			var cat = PIXI.Sprite.fromFrame('cat' + (i + 1) + '.png');
			cat.position.x = 0
			cat.position.y = 0
			cats.push(cat);
		}
		catsContainer.addChild(cats[0])
		renderer.render(stage);
		requestAnimationFrame(animate);
	 } 

	 function animate() {
	 	if (count % 4 === 0) {
	 		catdex = setCatdex(catdex);
	 		catsContainer.removeChildren();
			catsContainer.addChild(cats[catdex]);
	 	}
		renderer.render(stage);
		count++;
		requestAnimationFrame(animate);
	}

	function setCatdex(c) {
		if (c === 7) {
			return 0;
		} else {
			return c+1;
		}
	}	
});
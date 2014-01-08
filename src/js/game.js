
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var imageObj = new Image();
imageObj.src = 'images/img3.png';

var bgSpace1 = new Image();
bgSpace1.src = 'images/bg-space1.jpg';

//var oBall, oPadd, oBricks, oLevel;

/*
// Datebase object test 

var DB = {
    img: {
        background: {
            src: 'images/img3.png'
        }
    }
}

var img3 = new Image();
img3.src = DB.img.background.src;

*/

var Game = {

	FPS: {
		value: 0,
		lastTime: 0,
		lastTimeCounterUpdate: 0,
		history: []
	},

    init: function () {
        // Get DOM elements
        this.element = document.getElementById('game');
        this.elementTmp;
        this.canvas = this.element.firstElementChild;
        
        // Original content size
        this.content = [this.canvas.width, this.canvas.height];

        // Setting up the canvas
        var ctx = this.ctx = this.canvas.getContext('2d');
        var canvas = this.element;
        //ctx.fillStyle = '#6f8ed9';
        //ctx.fillRect(0, 0, this.content[0], this.content[1]);
        
        // Create image on click
        this.element.addEventListener('click', this, false);
        
        // Load image to draw on click
        this.loader = new Image();
        this.loader.addEventListener('load', this, false);
        //this.loader.src = 'http://mozorg.cdn.mozilla.net/media/img/styleguide/identity/marketplace/usage-logo-rocket.png';
        //this.loader.src = 'img/img3.png';
        
        // Reflow canvas size/margin on resize
        window.addEventListener('resize', this, false);
        this.reflow();

      	var now = new Date().getTime();

        this.FPS.lastTime = now;
        this.FPS.lastTimeCounterUpdate = now;

        var i = 0;
        var initName = 'splash';

        (function animloop(){
          requestAnimFrame(animloop);
            if(initName != View.current){
                //Game.canvas.removeEventListener('mousemove', changePadMouse, false);
                //Game.canvas.removeEventListener('click', changePadMouse, false);
                View[initName].listenersOff(initName);
                View[View.current].listenersOn(View.current);
                View[View.current].init();
                initName = View.current;
            }
            if(i%4 == 0)
                changeBg(i/20);
          	Game.FPSCounterUpdate();
            Game.render(i);
            i += 1;
        })();

    },

    reflow: function () {
        // 2d vectors to store various sizes
        var browser = [
            window.innerWidth, window.innerHeight];
        // Minimum scale to fit whole canvas
        var scale = this.scale = Math.min(
            browser[0] / this.content[0],
            browser[1] / this.content[1]);
        // Scaled content size
        var size = [
            this.content[0] * scale, this.content[1] * scale];
        // Offset from top/left
        var offset = this.offset = [
            (browser[0] - size[0]) / 2, (browser[1] - size[1]) / 2];

        // Apply CSS transform
        var rule = "translate(" + offset[0] + "px, " + offset[1] + "px) scale(" + scale + ")";
        this.element.style.transform = rule;
        this.element.style.webkitTransform = rule;
    },

    // Handle all events
    handleEvent: function (evt) {
        switch (evt.type) {
            case 'resize':
                // Window resized
                this.reflow();
                break;
            case 'click':
                // Canvas clicked
                if (!this.img) break;
                // Calculate position based on offset and scale
                var pos = [
                    (evt.pageX - this.offset[0] - this.img.width / 2) / this.scale,
                    (evt.pageY - this.offset[1] - this.img.height / 2) / this.scale];
                // Draw image with rounded values
                this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
                break;
            case 'load':
                // Image loaded
                this.img = this.loader;
                break;
        }

    },

    render: function(i){
        Game.clearScreen();
        console.log('Render ...');

        View[View.current].run(i);

	    //this.ctx.drawImage(imageObj, 0, 0);
		
        

        //Screen.splash.draw();

	    //this.ctx.drawImage(imageObj, 0, 0);
    },

    clearScreen: function(){
        this.ctx.clearRect (0, 0, 640, 960);
    },

    FPSCounterUpdate: function(){
    	var now = new Date().getTime();

		this.FPS.history.push(~~(1000/(now - this.FPS.lastTime)));
		this.FPS.lastTime = now;

		if(this.FPS.history.length === 51){
    		this.FPS.history.shift();
    		if(now - this.FPS.lastTimeCounterUpdate >= 1000){
	    		this.FPS.value = ~~(this.FPS.history.reduce(function(pv, cv) { return pv + cv; }, 0)/50);
	    		this.FPS.lastTimeCounterUpdate = now;
	    	}
    	}
    },

    removeAllListeners: function(view){
        console.log('view: '+view);
        if(view.length > 0){
            for(var listenerName in View[view].listeners){
                var listenerFn = View[view].listeners[listenerName];

                (function(){
                    Game.canvas.removeEventListener(listenerName, listenerFn, false);
                })();
               console.log('key: '+listenerName+', fnName: '+listenerFn);
            }
            //if(view == 'level')
            //    Game.canvas.removeEventListener('mousemove', changePadMouse, false);
        }
    }

};

var bgPosX = 0,
    bgPosY = 0;

function changeBg(i){
    
    var bg = document.getElementById('wrapper'),
        xPx,
        yPx,
        xNewVal = 0,
        yNewVal = 0,
        xCalc = 0,
        yCalc = 0,
        xEntropy = Math.random(),
        yEntropy = Math.random();

    //xPx = bg.style.backgroundPositionX;
    //yPx = bg.style.backgroundPositionY;

    //console.log('xPx: '+xPx+' yPx: '+yPx);

    xCalc = Math.round((Math.sin(i)+xEntropy)*2);
    //yCalc = Math.round(Math.abs((Math.cos(i)+yEntropy)*1));
    yCalc = 2;

    //xNewVal = parseInt(xPx.substring(0, xPx.length - 2)) + xCalc;
    //yNewVal = parseInt(yPx.substring(0, yPx.length - 2)) + yCalc;

    //if(Math.random() < 0.5){
        bgPosX += xCalc;
        bgPosY += yCalc;
    //}else{
    //    bgPosX -= xCalc;
    //    bgPosY -= yCalc;
    //}

    bg.style.backgroundPosition = bgPosX+'px '+bgPosY+'px';

    //console.log(xCalc+' == '+yCalc);
    
}

// Automatic load on..
			
	// Browser...
	//Game.init();


	// PhoneGap
	/*
	function onLoad() {
		document.addEventListener("deviceready", onDeviceReady, false);
		document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	}

	function onDeviceReady() {
		Game.init();
	}

	window.onload = onLoad;
	*/

            function keyDown(e){
                var keyCode = e.keyCode;
                switch (keyCode) {
                    case 37: // 'Left' key
                        bLeftBut = true;
                        break;
                    case 39: // 'Right' key
                        bRightBut = true;
                        break;
                }
                console.log('KEY CODE: '+keyCode);
            }

            function keyUp(e){
                var keyCode = e.keyCode;
                switch (keyCode) {
                    case 37: // 'Left' key
                        bLeftBut = false;
                        break;
                    case 39: // 'Right' key
                        bRightBut = false;
                        break;
                }
                console.log('KEY CODE: '+keyCode);
            }

            function changePadMouse(e){
                var mouseX, mouseY;

                if(e.offsetX) {
                    mouseX = e.offsetX;
                    mouseY = e.offsetY;
                }else if(e.layerX) {
                    mouseX = e.layerX;
                    mouseY = e.layerY;
                }

                oPadd.x = Math.max(mouseX - (oPadd.w/2), 0);
                oPadd.x = Math.min(Game.canvas.width - oPadd.w, oPadd.x);
                //console.log('mouseX: '+mouseX+', mouseY: '+mouseY);
                console.log('mouse move...')
            }

            function changePadTouch(e){
                e.preventDefault();
                var targetEvent =  e.touches.item(0);  
                oPadd.x = Math.max(targetEvent.clientX - (oPadd.w/2), 0);
                oPadd.x = Math.min(Game.canvas.width - oPadd.w, oPadd.x);
            }

            function mouseMoving(){
                console.log('Mouse moving...');
            }

            // =========

            var iStart = 0,
                bRightBut = false,
                bLeftBut = false,
                oBall, oPadd, oBricks, oLevel,
                aSounds = [],
                iPoints = 0,
                iGameTimer,
                iElapsed = iMin = iSec = 0,
                sLastTime, 
                sLastPoints;

            // objects :
            function Ball(x, y, dx, dy, r) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.r = r;
            }
            function Padd(x, w, h, img) {
                this.x = x;
                this.w = w;
                this.h = h;
                this.img = img;
            }
            function Bricks(w, h, r, c, p) {
                this.w = w;
                this.h = h;
                this.r = r; // rows
                this.c = c; // cols
                this.p = p; // padd
                this.objs;
                this.colors = ['#9d9d9d', '#f80207', '#feff01', '#0072ff', '#fc01fc', '#03fe03']; // colors for rows
            }

            function Level(level, bricksNo){
                this.level = level;    
                this.bricksNo = bricksNo;
            }

            function loadLevel(){
                oBricks.objs = new Array(oBricks.r); // fill-in bricks
                if(oLevel.level == 0){
                    oLevel.bricksNo = 2;    
                    for (i=0; i < oBricks.r; i++) {
                        oBricks.objs[i] = new Array(oBricks.c);
                        for (j=0; j < oBricks.c; j++) {
                            if(j > 3 && j < 5 && i > 2 && i < 5)
                                oBricks.objs[i][j] = 1;
                        }
                    }
                    console.log('Level 0');
                }if(oLevel.level == 1){    
                    oLevel.bricksNo = 32;
                    oBricks.objs = [[1, 1, 1, 1, 1, 1, 1, 1], 
                                    [1, 0, 0, 0, 0, 0, 0, 1],
                                    [1, 0, 1, 1, 1, 1, 0, 1],
                                    [1, 0, 1, 1, 1, 1, 0, 1],
                                    [1, 0, 0, 0, 0, 0, 0, 1],
                                    [1, 1, 1, 1, 1, 1, 1, 1]];
                    console.log('Level 1');
                }if(oLevel.level == 2){
                    oLevel.bricksNo = 24;
                    for (i=0; i < oBricks.r; i++) {
                        oBricks.objs[i] = new Array(oBricks.c);
                        for (j=0; j < oBricks.c; j++) {
                            if((j % 2 == 0 && i % 2 == 0) || (j % 2 == 1 && i % 2 == 1))
                                oBricks.objs[i][j] = 1;
                        }
                    }
                }else if(oLevel.level == 3){
                    oLevel.bricksNo = 48;
                    for (i=0; i < oBricks.r; i++) {
                        oBricks.objs[i] = new Array(oBricks.c);
                        for (j=0; j < oBricks.c; j++) {
                                oBricks.objs[i][j] = 1;
                        }
                    }
                }
                
                oBall.x = 400;
                oBall.y = 300;
                oBall.dx = 0.5;
                oBall.dy = -5;
            }
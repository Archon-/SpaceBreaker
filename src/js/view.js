var View = {

    current: 'splash',

    splash: {
        name: 'Splash 1',
        init: function(){
            console.log('Splash init');
        },
        run: function(i){
            Game.ctx.beginPath();
            Game.ctx.rect(0, 0, 480, 800);
            Game.ctx.fillStyle = 'red';
            Game.ctx.fill();
            Game.ctx.lineWidth = 7;
            Game.ctx.strokeStyle = 'black';
            Game.ctx.stroke(); 

            Game.ctx.fillStyle = "black";
            Game.ctx.font = "bold 32px Arial";
            Game.ctx.fillText("Splash screen", 100, 200);
            Game.ctx.fillText('Render counter: '+i, 100, 400);
            Game.ctx.fillText('FPS: '+Game.FPS.value, 100, 500);

            this.listeners();
        },
        listeners: function(){
            //Game.canvas.addEventListener('mousedown', this.clickTest, false);
        },
        listenersOn: function(){
            Game.canvas.addEventListener('mousemove', mouseMoving, false);
        },
        listenersOff: function(){
            Game.canvas.removeEventListener('mousemove', mouseMoving, false);
        },
        clickTest: function(){
            View.current = 'test'
            console.log('clicked!');
        }
    },

    end: {
        name: 'This is the end of game',
        init: function(){
            console.log('End view init');
        },
        run: function(){
            Game.ctx.drawImage(bgSpace1, 0, 0);
        },
        listenersOn: function(){

        },
        listenersOff: function(){

        }
    },

    test: {
        name: 'Testing screen',
        init: function(){
            console.log('test view init');
        },
        run: function(i){
            var today = new Date(),
                h = today.getHours(),
                m = today.getMinutes(),
                s = today.getSeconds();

            Game.ctx.fillStyle = "black";
            Game.ctx.font = "bold 32px Arial";
            Game.ctx.fillText("Responsive Canvas 2", 100, 200);
            Game.ctx.fillText('Time: '+h+':'+m+':'+s, 100, 300);
            Game.ctx.fillText('Render counter: '+i, 100, 400);
            Game.ctx.fillText('FPS: '+Game.FPS.value, 100, 500);

            Game.ctx.beginPath();
            Game.ctx.rect(188, 50, 200, 100);
            Game.ctx.fillStyle = 'yellow';
            Game.ctx.fill();
            Game.ctx.lineWidth = 7;
            Game.ctx.strokeStyle = 'black';
            Game.ctx.stroke(); 
        }
    },

    level: {
        name: 'Level',
        init: function(){
            console.log('lovel view init.');

            var width = Game.canvas.width;
            var height = Game.canvas.height;

            var padImg = new Image();
            padImg.src = 'images/padd2.png';
            padImg.onload = function() {};

            oBall = new Ball(width / 2, 550, 0.5, -5, 10); // new ball object
            oPadd = new Padd(width / 2, 240, 20, padImg); // new padd object
            oBricks = new Bricks((width / 8) - 1, 20, 6, 8, 2); // new bricks object
            oLevel = new Level(0, 4);

            loadLevel();

            aSounds[0] = new Audio('media/snd1.wav');
            aSounds[0].volume = 0.9;
            aSounds[1] = new Audio('media/snd2.wav');
            aSounds[1].volume = 0.9;
            aSounds[2] = new Audio('media/snd3.wav');
            aSounds[2].volume = 0.9;

            // HTML5 Local storage - get values
            sLastTime = localStorage.getItem('last-time');
            sLastPoints = localStorage.getItem('last-points');

            /*
            Game.canvas.addEventListener('keydown', keyDown, false);
            Game.canvas.addEventListener('keyup', keyUp, false);
            Game.canvas.addEventListener('mousemove', changePadMouse, false);
            Game.canvas.addEventListener('touchmove', changePadTouch, false);
            */
        },
        run: function(i){
            // draw Ball (circle)
            Game.ctx.fillStyle = '#f66';
            Game.ctx.beginPath();
            Game.ctx.arc(oBall.x, oBall.y, oBall.r, 0, Math.PI * 2, true);
            Game.ctx.closePath();
            Game.ctx.fill();

            if (bRightBut)
                oPadd.x += 5;
            else if (bLeftBut)
                oPadd.x -= 5;

            // draw Padd (rectangle)
            Game.ctx.drawImage(oPadd.img, oPadd.x, Game.ctx.canvas.height - oPadd.h);

            // draw bricks (from array of its objects)
            for (i=0; i < oBricks.r; i++) {
                Game.ctx.fillStyle = oBricks.colors[i];
                for (j=0; j < oBricks.c; j++) {
                    if (oBricks.objs[i][j] == 1) {
                        Game.ctx.beginPath();
                        Game.ctx.rect((j * (oBricks.w + oBricks.p)) + oBricks.p, (i * (oBricks.h + oBricks.p)) + oBricks.p, oBricks.w, oBricks.h);
                        Game.ctx.closePath();
                        Game.ctx.fill();
                    }
                }
            }

            // collision detection
            iRowH = oBricks.h + oBricks.p;
            iRow = Math.floor(oBall.y / iRowH);
            iCol = Math.floor(oBall.x / (oBricks.w + oBricks.p));

            // mark brick as broken (empty) and reverse brick
            if (oBall.y < oBricks.r * iRowH && iRow >= 0 && iCol >= 0 && oBricks.objs[iRow][iCol] == 1) {
                oBricks.objs[iRow][iCol] = 0;
                oBall.dy = -oBall.dy;
                iPoints++;

                aSounds[0].play(); // play sound
                oLevel.bricksNo--;
            }

            if(oLevel.bricksNo == 0){
                oLevel.level++
                loadLevel();
                oBall.x = width / 2;
                oBall.y = 150;
                //oBall = new Ball(width / 2, 550, 0.5, -5, 10); // new ball object
                //oPadd = new Padd(width / 2, 240, 20, padImg); // new padd object
            }
         
            // reverse X position of ball
            if (oBall.x + oBall.dx + oBall.r > Game.ctx.canvas.width || oBall.x + oBall.dx - oBall.r < 0) {
                oBall.dx = -oBall.dx;
            }

            if (oBall.y + oBall.dy - oBall.r < 0) {
                oBall.dy = -oBall.dy;
            } else if (oBall.y + oBall.dy + oBall.r > Game.ctx.canvas.height - oPadd.h) {
                if (oBall.x > oPadd.x && oBall.x < oPadd.x + oPadd.w) {
                    oBall.dx = 10 * ((oBall.x-(oPadd.x+oPadd.w/2))/oPadd.w);
                    oBall.dy = -oBall.dy;

                    aSounds[2].play(); // play sound
                }
                else if (oBall.y + oBall.dy + oBall.r > Game.ctx.canvas.height) {
                    clearInterval(iStart);
                    clearInterval(iGameTimer);

                    // HTML5 Local storage - save values
                    localStorage.setItem('last-time', iMin + ':' + iSec);
                    localStorage.setItem('last-points', iPoints);

                    aSounds[1].play(); // play sound
                }
            }

            oBall.x += oBall.dx;
            oBall.y += oBall.dy;

            Game.ctx.font = '16px Verdana';
            Game.ctx.fillStyle = '#fff';
            iMin = Math.floor(iElapsed / 60);
            iSec = iElapsed % 60;
            if (iMin < 10) iMin = "0" + iMin;
            if (iSec < 10) iSec = "0" + iSec;
            Game.ctx.fillText('Time: ' + iMin + ':' + iSec, 600, 520);
            Game.ctx.fillText('Points: ' + iPoints, 600, 550);

            if (sLastTime != null && sLastPoints != null) {
                Game.ctx.fillText('Last Time: ' + sLastTime, 600, 460);
                Game.ctx.fillText('Last Points: ' + sLastPoints, 600, 490);
            }
        },
        listenersOn: function(){
            Game.canvas.addEventListener('keydown', keyDown, false);
            Game.canvas.addEventListener('keyup', keyUp, false);
            Game.canvas.addEventListener('mousemove', changePadMouse, false);
            Game.canvas.addEventListener('touchmove', changePadTouch, false);
        },
        listenersOff: function(){
            Game.canvas.removeEventListener('keydown', keyDown, false);
            Game.canvas.removeEventListener('keyup', keyUp, false);
            Game.canvas.removeEventListener('mousemove', changePadMouse, false);
            Game.canvas.removeEventListener('touchmove', changePadTouch, false);
        },
        listeners: {
            keydown: 'keyDown',
            keyup: 'keyUp',
            mousemove: 'changePadMouse',
            touchmove: 'changePadTouch'
        }
    }
}

for (var key in Screen) {
   var obj = Screen[key];
   /*
   for (var prop in obj) {
      // important check that this is objects own property 
      // not from prototype prop inherited
      if(obj.hasOwnProperty(prop)){
        console.log(prop + " = " + obj[prop]);
      }
   }
   */
   console.log(Screen[key].name);
}
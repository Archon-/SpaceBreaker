var View = {

    current: 'splash',

    splash: {
        name: 'Splash 1',
        init: function(){
            console.log('Splash init');
        },
        draw: function(i){
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

        },
        listenersOff: function(){

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
        draw: function(){
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
        draw: function(i){
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
        draw: function(i){
            
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
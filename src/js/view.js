var View = {

    current: 'splash',

    splash: {
        name: 'Splash 1',
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
            Game.canvas.addEventListener('mousedown', this.clickTest, false);
        },
        clickTest: function(){
            View.current = 'test'
            console.log('clicked!');
        }
    },

    end: {
        name: 'This is the end of game',
        draw: function(){
            Game.ctx.drawImage(bgSpace1, 0, 0);
        }
    },

    test: {
        name: 'Testing screen',
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
    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');

    var x1 = 188,
        y1 = 50, 
        w1 = 200,
        h1 = 100,
        x2 = 238,
        y2 = 145,
        w2 = 200,
        h2 = 100;

    // First rectangle
    context.beginPath();
    context.rect(x1, y1, w1, h1);
    context.fillStyle = 'yellow';
    context.fill();
    //context.lineWidth = 7;
    //context.strokeStyle = 'black';
    //context.stroke();

    // Second rectangle
    context.beginPath();
    context.rect(x2, y2, w2, h2);
    context.fillStyle = 'red';
    context.fill();
    //context.lineWidth = 7;
    //context.strokeStyle = 'black';
    //context.stroke();

    // returns true if there is any overlap
    // params: x,y,w,h of two rectangles
    function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
      if (w2 !== Infinity && w1 !== Infinity) {
        w2 += x2;
        w1 += x1;
        if (isNaN(w1) || isNaN(w2) || x2 > w1 || x1 > w2) return false;
      }
      if (y2 !== Infinity && h1 !== Infinity) {
        h2 += y2;
        h1 += y1;
        if (isNaN(h1) || isNaN(y2) || y2 > h1 || y1 > h2) return false;
      }
      return true;
    }

    console.log(intersects(x1, y1, w1, h1, x2, y2, w2, h2));
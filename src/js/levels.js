function Level(level, bricksNo){
    this.level = level;    
    this.bricksNo = bricksNo;
}

function loadLevel(){
    oBricks.objs = new Array(oBricks.r); // fill-in bricks
    if(oLevel.level == 0){
        oLevel.bricksNo = 4;    
        for (i=0; i < oBricks.r; i++) {
            oBricks.objs[i] = new Array(oBricks.c);
            for (j=0; j < oBricks.c; j++) {
                if(j > 3 && j < 6 && i > 2 && i < 5)
                    oBricks.objs[i][j] = 1;
            }
        }
    }if(oLevel.level == 1){    
        oLevel.bricksNo = 32;
        oBricks.objs = [[1, 1, 1, 1, 1, 1, 1, 1], 
                        [1, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 1, 1, 1, 1, 0, 1],
                        [1, 0, 1, 1, 1, 1, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1]];
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
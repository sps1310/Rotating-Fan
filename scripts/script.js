var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imgObj = new Image(); //declare the image object
    imgObj.src = "./images/rotor17.png";
    
    //draws the image on canvas
    function loadImage(){
        context.save();
        context.drawImage(imgObj, -((imgObj.width)/2), -((imgObj.height)/2));
        context.restore();
    }

    //to draw the circular parts of fan blade guard
    function drawCircle(radius, linewidth, strokestyle, fillstyle="none"){
        context.save()
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(context.canvas.width/2, (context.canvas.height/2)-120);
        context.lineWidth = linewidth;
        context.strokeStyle = strokestyle;
        context.fillStyle = fillstyle;
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI);

        if(fillstyle!="none")
          context.fill();

        context.stroke();
        context.restore();
    }

    //to draw the lines of fan blade guard
    function DrawLine(x1, y1, x2, y2, lw, ss) {
        context.lineWidth = lw;
        context.strokeStyle = ss
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
    
    //computes the coordinates and angles of each rim of fan blade guard
    function drawNLines(N, centreX, centreY, radius) {
        context.save()
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(context.canvas.width/2, (context.canvas.height/2)-120);
        for (i = 0; i < N; i++) {
            angle = 360 / N;
            x2 = centreX + radius * Math.cos(Math.PI * angle * i / 180);
            y2 = centreY + radius * Math.sin(Math.PI * angle * i / 180);
            DrawLine(centreX, centreY, x2, y2, 2, "gray");
        }
        
        DrawLine(centreX, centreY+120, centreX, centreY+320, 17, "black");// draws the pivot
        DrawLine(centreX-80, centreY+320, centreX+80, centreY+320, 30, "gray");// draws the base
        
        context.restore()
    }

    function frame(angle){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
        context.save();
        context.translate(context.canvas.width/2, (context.canvas.height/2)-120);
        context.rotate(angle/180 * Math.PI); //rotates the image at a particular angle
        loadImage();
        context.restore();

        drawNLines(48, 0, 0, 120);// draws the rim of fan blade guard
        drawCircle(40, 1, "gray", "gray");// draws the center circle of fan blade guard
        drawCircle(120, 4, "gray");// draws the outer circle of fan blade guard
        drawCircle(80, 2, "gray");//draws the middle circle of fan blade guard
    }    

    frame(0);
    var running = false;
    var hangle = 0;
    
    function fan(){
        document.getElementById('start').disabled=true;
        var rev =  parseInt(document.getElementById('rang').value);// get the speed
        running = true;

        //checks whether to rotate clockwise or anticlockwise
        if (document.getElementById('chkdir').checked) {
            rev = - rev;
        }
        hangle += rev;
        
        if (hangle >=360){
            hangle = hangle % 360;
        }
        
        frame(hangle);
    }
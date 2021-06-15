// ARMAN'S PROJECT : GRAVIMETER

var colors = [];

// colors:

  // grey = 128, 128, 128
  // blue = 0, 0, 255
  // brown = 165, 42, 42

function terrainObject(density, x, y, dimension){
  this.density = density;
  this.x = x;
  this.y = y;
  this.dimension = dimension;
}

function colorObject(r, g, b){
  this.r = r;
  this.g = g;
  this.b = b;
}

function setupTerrain(){
  
  for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
    
    colors[i] = [];
    
    for (var j = 0; j < windowWidth; j+=10){
      
      // brown - yung lupa sa gilid
      if (j > ((windowWidth/2)+150)){
        colors[i][j] = new colorObject(165, 42, 42);
      }

      // grey - ground under water
      else if (i > (Math.floor(windowHeight/1.50))+60 && j < (windowWidth/2)-100){

        if (i == (Math.floor(windowHeight/1.50))+70){
          if ((j == (windowWidth/64)-30 || j == (windowWidth/64)-20 || j == (windowWidth/64)-10)){
            colors[i][j] = new colorObject(0, 0, 255);
          }
          else if (j >= (windowWidth/64)+50 && j <= (windowWidth/64)+90){
            colors[i][j] = new colorObject(0, 0, 255);
          }
          else if (j >= (windowWidth/64)+300 && j <= (windowWidth/64)+340){
            colors[i][j] = new colorObject(0, 0, 255);
          }
          else if (j >= (windowWidth/64)+600 && j <= (windowWidth/64)+680){
            colors[i][j] = new colorObject(0, 0, 255);
          }
          else if (j >= (windowWidth/64)+780 && j <= (windowWidth/64)+880){
            colors[i][j] = new colorObject(0, 0, 255);
          }
          else{
            colors[i][j] = new colorObject(128, 128, 128);
          }
        }

        else if (i == (Math.floor(windowHeight/1.50))+80){
          if (j == (windowWidth/64)-30){
            colors[i][j] = new colorObject(0, 0, 255);
          }
          else{
            colors[i][j] = new colorObject(128, 128, 128);
          }
        }

        else{
          colors[i][j] = new colorObject(128, 128, 128);
        }

      }

      // blue - water
      else if (i <= (Math.floor(windowHeight/1.50))+60 && j < (windowWidth/2)-100){
        colors[i][j] = new colorObject(0, 0, 255);
      }

      else{

        if (i <= (Math.floor(windowHeight/1.50))+60 && j < (windowWidth/2)+150){
            if (j == (windowWidth/2)+140 && (i == (Math.floor(windowHeight/1.50))+60 || i == (Math.floor(windowHeight/1.50))+50)){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else{
              colors[i][j] = new colorObject(0, 0, 255);
            }
        }

        else if (i <= (Math.floor(windowHeight/1.50))+60 && j < (windowWidth/2)+160){
          if (i == (Math.floor(windowHeight/1.50))+10 || i == (Math.floor(windowHeight/1.50))+20){
            colors[i][j] = new colorObject(0, 0, 255);
          }
          else{
            colors[i][j] = new colorObject(165, 42, 42);
          }
        }

        // grey part
        else{
          if (i > (Math.floor(windowHeight/1.50))+60 && i <= (Math.floor(windowHeight/1.50))+140){
            // ------------------------ brown ---------------------------------------------------- //
            if (j == (windowWidth/2)+150 || j == (windowWidth/2)+140 || j == (windowWidth/2)+130){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+70 && j == (windowWidth/2)+120){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+80 && j == (windowWidth/2)+110){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+90 && j == (windowWidth/2)+100){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+100 && j == (windowWidth/2)+90){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+110 && j == (windowWidth/2)+80){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+120 && j == (windowWidth/2)+70){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+120 && j == (windowWidth/2)+60){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+130 && j == (windowWidth/2)+50){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+140 && j == (windowWidth/2)+40){
              colors[i][j] = new colorObject(165, 42, 42);
            }
            // ------------------------ grey ---------------------------------------------------- //
            else if (i >= (Math.floor(windowHeight/1.50))+80 && j == (windowWidth/2)-100){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+90 && j == (windowWidth/2)-90){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+100 && j == (windowWidth/2)-80){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+110 && j == (windowWidth/2)-70){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+110 && j == (windowWidth/2)-60){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+120 && j == (windowWidth/2)-50){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+130 && j == (windowWidth/2)-40){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+140 && j == (windowWidth/2)-30){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+140 && j == (windowWidth/2)-20){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            // ------------------------ blue ---------------------------------------------------- //
            else{
              colors[i][j] = new colorObject(0, 0, 255);
            }
          }

          else{
            // ------------------------ grey ---------------------------------------------------- //
            if (j >= (windowWidth/2)-100 && j <= (windowWidth/2)-20){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (j == (windowWidth/2)-10 || j == (windowWidth/2)){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+150 && j == (windowWidth/2)+10){
              if (i == (Math.floor(windowHeight/1.50))+150){
                colors[i][j] = new colorObject(0, 0, 255);
              }
              else{
                colors[i][j] = new colorObject(128, 128, 128);
              }
            }
            // ------------------------ grey ---------------------------------------------------- //
            else if (i >= (Math.floor(windowHeight/1.50))+160 && j == (windowWidth/2)+20){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+170 && j == (windowWidth/2)+30){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+170 && j == (windowWidth/2)+40){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+180 && j == (windowWidth/2)+50){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+190 && j == (windowWidth/2)+60){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+190 && j == (windowWidth/2)+70){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+200 && j == (windowWidth/2)+80){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+200 && j == (windowWidth/2)+90){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+200 && j == (windowWidth/2)+100){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+210 && j == (windowWidth/2)+110){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+220 && j == (windowWidth/2)+120){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+240 && j == (windowWidth/2)+130){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+250 && j == (windowWidth/2)+140){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            else if (i >= (Math.floor(windowHeight/1.50))+270 && j == (windowWidth/2)+150){
              colors[i][j] = new colorObject(128, 128, 128);
            }
            // ------------------------ brown ---------------------------------------------------- //
            else{
              colors[i][j] = new colorObject(165, 42, 42);
            }
          }
        }
      }
    }
  }
}

function generateTerrain(){
  // generates 2d matrix
  for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
    for (var j = 0; j < windowWidth; j+=10){
      fill(colors[i][j].r, colors[i][j].g, colors[i][j].b);
      rect(j, i, 10, 10);
    }
  }
}

function change_page() {
  location.replace("soil.html");
}


function setup(){
  createCanvas(windowWidth, windowHeight);
  setupTerrain();
  button_link = createButton('Soil');
  button_link.position(20, 500);
  button_link.style('width', '100px')
  button_link.style('height', '50px')
  button_link.mousePressed(change_page);
}

function draw(){
  generateTerrain();
}
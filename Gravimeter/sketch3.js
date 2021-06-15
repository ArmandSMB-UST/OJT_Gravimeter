var colors = [];
var matrixValues = [];
var anomalies = [];
var volume = 100;
var G = 6.67384 * Math.pow(10, -11) //gravitational constant in m^3/kgs^{-2}

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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function setupTerrain(){
    for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
    
        colors[i] = [];

        for (var j = 0; j < windowWidth; j+=10){
            if (j > ((windowWidth/2))){
                // ------------ right side ----------------------------------------------------------//
                if (j > (windowWidth/2)+370){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)+10)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)+20)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)+30)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)+40)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)+50)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)+60)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)+70)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+140) && (j == (windowWidth/2)+80)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+150) && (j == (windowWidth/2)+90)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+150) && (j == (windowWidth/2)+100)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+150) && (j == (windowWidth/2)+110)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+160) && (j == (windowWidth/2)+120)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+170) && (j == (windowWidth/2)+130)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+170) && (j == (windowWidth/2)+140)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+170) && (j == (windowWidth/2)+150)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+180) && (j == (windowWidth/2)+160)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+180) && (j == (windowWidth/2)+170)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+180) && (j == (windowWidth/2)+180)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+190) && (j == (windowWidth/2)+190)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+200) && (j == (windowWidth/2)+200)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+210) && (j == (windowWidth/2)+210)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+210) && (j == (windowWidth/2)+220)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+210) && (j == (windowWidth/2)+230)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+220) && (j == (windowWidth/2)+240)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+230) && (j == (windowWidth/2)+250)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+230) && (j == (windowWidth/2)+260)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+230) && (j == (windowWidth/2)+270)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+240) && (j == (windowWidth/2)+280)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+250) && (j == (windowWidth/2)+290)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+250) && (j == (windowWidth/2)+300)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+250) && (j == (windowWidth/2)+310)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+260) && (j == (windowWidth/2)+320)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+270) && (j == (windowWidth/2)+330)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+270) && (j == (windowWidth/2)+340)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+280) && (j == (windowWidth/2)+350)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+290) && (j == (windowWidth/2)+360)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else if ((i <= (Math.floor(windowHeight/1.50))+290) && (j == (windowWidth/2)+370)){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else{
                    colors[i][j] = new colorObject(128, 128, 128);
                }
            }
            // --------------------- left side --------------------------------------------------//
            else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2))){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)-10)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)-20)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)-30)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)-40)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)-50)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+130) && (j == (windowWidth/2)-60)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+140) && (j == (windowWidth/2)-70)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+140) && (j == (windowWidth/2)-80)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+150) && (j == (windowWidth/2)-90)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+150) && (j == (windowWidth/2)-100)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+160) && (j == (windowWidth/2)-110)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+160) && (j == (windowWidth/2)-120)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+160) && (j == (windowWidth/2)-130)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+170) && (j == (windowWidth/2)-140)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+170) && (j == (windowWidth/2)-150)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+180) && (j == (windowWidth/2)-160)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+190) && (j == (windowWidth/2)-170)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+190) && (j == (windowWidth/2)-180)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+190) && (j == (windowWidth/2)-190)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+200) && (j == (windowWidth/2)-200)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+200) && (j == (windowWidth/2)-210)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+210) && (j == (windowWidth/2)-220)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+210) && (j == (windowWidth/2)-230)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+210) && (j == (windowWidth/2)-240)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+220) && (j == (windowWidth/2)-250)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+230) && (j == (windowWidth/2)-260)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+230) && (j == (windowWidth/2)-270)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+230) && (j == (windowWidth/2)-280)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+240) && (j == (windowWidth/2)-290)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+250) && (j == (windowWidth/2)-300)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+250) && (j == (windowWidth/2)-310)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+260) && (j == (windowWidth/2)-320)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+270) && (j == (windowWidth/2)-330)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+270) && (j == (windowWidth/2)-340)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+280) && (j == (windowWidth/2)-350)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+280) && (j == (windowWidth/2)-360)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else if ((i <= (Math.floor(windowHeight/1.50))+290) && (j == (windowWidth/2)-370)){
                colors[i][j] = new colorObject(165, 42, 42);
            }
            else{
                if (j < (windowWidth/2)-370){
                    colors[i][j] = new colorObject(165, 42, 42);
                }
                else{
                    colors[i][j] = new colorObject(128, 128, 128);
                }
            }
        }
    }
}

function computeAnomaly(){

    for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
        for (var j = 0; j < windowWidth; j+=10){
            var summation = 0;
            for (var k = 0; k < windowWidth; k+=10){
                summation = summation + (matrixValues[i][j].density * volume);
            }
            anomalies[j] = summation * G;
        }
    }

    for (var j = 0; j < windowWidth; j+=10){
        console.log(anomalies[j]);
    }
}

function generateTerrain(){
    // generates 2d matrix
    for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
        matrixValues[i] = []
        for (var j = 0; j < windowWidth; j+=10){
            if (colors[i][j].r == 165){
                matrixValues[i][j] = new terrainObject(1.33, j, i, 10);
            }
            else{
                matrixValues[i][j] = new terrainObject(getRandomArbitrary(1.98, 2.17), j, i, 10);
            }
            fill(colors[i][j].r, colors[i][j].g, colors[i][j].b);
            rect(j, i, 10, 10);
            console.log(matrixValues[i][j].density);
        }
    }

    computeAnomaly();
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    setupTerrain();
}

function draw(){
    generateTerrain();
}
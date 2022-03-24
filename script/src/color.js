// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ restart
const restartButton = document.getElementById("restart")
restartButton.addEventListener("click", ()=>{
    restartImage(image)
})
function restartImage(imageX){
    console.log(imageX, imageX.width)
    if(imageX){
        canvas.width = imageX.width;
        canvas.height = imageX.height;
        context.clearRect(0, 0, imageX.width, imageX.height);
        console.log(imageX.width*(0-5))
        context.drawImage(imageX, 0, 0, imageX.width, imageX.height);
        scannedImage = context.getImageData(0, 0,imageX.width, imageX.height);
        dataFromScan = scannedImage.data;
        buttonRed.value = 0;
        buttonGreen.value = 0;
        buttonBlue.value = 0;
        saturation.value = 0;
        brightness.value = 0;
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ zoom
const zoom = document.getElementById('zoom');
zoom.addEventListener("click",()=>{
    makezoom(parseInt(zoom.value))
})
var Cimage;
function makezoom(value) {
    value =  parseInt(value)
    if(value != 0){
        Cimage = document.createElement("img");
        Cimage.src = canvas.toDataURL();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(Cimage, 0, 0, canvas.width, canvas.height, 0, 0, Cimage.width+value, Cimage.height+value);
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ redo and undo
const redo = document.getElementById("redo")
const undo = document.getElementById("undo")
var numberOfClicks=0;
var does = new Array();
redo.addEventListener("click", ()=>{
    if(!(0>numberOfClicks) && !(does.length==numberOfClicks)){
        numberOfClicks--
        context.putImageData(does[numberOfClicks], 0, 0);
        console.log("redone")
    }
    console.log(numberOfClicks)
})
undo.addEventListener("click", ()=>{
    if(!(numberOfClicks > 0)){
        numberOfClicks++
        context.putImageData(does[numberOfClicks], 0, 0);
        console.log("undo")
    }
    console.log(numberOfClicks)
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ color picker
const hoverColor = document.getElementById("hoverColor");
canvas.addEventListener('mousemove', (event)=>{
    if(scannedImage){
        canvasHover(event)
    }
})
function canvasHover(e){
    var pixel = context.getImageData(e.layerX, e.layerY, 1, 1);
    hoverColor.style.background = "rgb("+pixel.data[0]+","+pixel.data[1]+","+pixel.data[2]+")";
}
const clickColor = document.getElementById("clickColor");
canvas.addEventListener('click', (event)=>{
    if(scannedImage){
        canvasClick(event)
    }
    console.log(does)
})

function canvasClick(e){
    var pixel = context.getImageData(e.layerX, e.layerY, 1, 1);
    clickColor.style.background = "rgb("+pixel.data[0]+","+pixel.data[1]+","+pixel.data[2]+")";
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ primary colors change
const buttonRed = document.getElementById("red");
const buttonGreen = document.getElementById("green");
const buttonBlue = document.getElementById("blue");
buttonRed.addEventListener("change",()=>{
    makeColorChange()
})
buttonGreen.addEventListener("change",()=>{
    makeColorChange()
})
buttonBlue.addEventListener("change",()=>{
    makeColorChange()
})
function makeColorChange(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            dataFromScan=scannedImage.data;
            dataFromScan[i]=dataFromScan[i] + parseInt(buttonRed.value); //red
            dataFromScan[i+1]=dataFromScan[i+1] + parseInt(buttonGreen.value); //green
            dataFromScan[i+2]=dataFromScan[i+2] + parseInt(buttonBlue.value); // blue
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ saturation
const saturation = document.getElementById('saturation');
saturation.addEventListener("change",()=>{
    makeSaturation()
})
function makeSaturation() {
    if(scannedImage){
        console.log(saturation.value)
        for(var i=0; i < dataFromScan.length; i+=4){
            dataFromScan=scannedImage.data;
            Math.max(dataFromScan[i], dataFromScan[i+1], dataFromScan[i+2])
            dataFromScan[i]=dataFromScan[i] - parseInt(saturation.value); //red
            dataFromScan[i+1]=dataFromScan[i+1] - parseInt(saturation.value); //green
            dataFromScan[i+2]=dataFromScan[i+2] - parseInt(saturation.value); // blue
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ brightness
const brightness = document.getElementById('brightness');
brightness.addEventListener("change",()=>{
    makebrightness()
})
function makebrightness() {
    if(scannedImage){
        console.log(brightness.value)
        for(var i=0; i < dataFromScan.length; i+=4){
            dataFromScan=scannedImage.data;
            dataFromScan[i]=dataFromScan[i] - parseInt(brightness.value); //red
            dataFromScan[i+1]=dataFromScan[i+1] - parseInt(brightness.value); //green
            dataFromScan[i+2]=dataFromScan[i+2] - parseInt(brightness.value); // blue
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ blur
const buttonblur = document.getElementById("blur");
buttonblur.addEventListener("click",()=>{
    makeblur()
})
function makeblur(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            const total = dataFromScan[i]+dataFromScan[i+1]+dataFromScan[i+2];
            const avarage = total/3;
            // r * 0.2989 + g * 0.5870 + b * 0.1140
            dataFromScan[i]+= dataFromScan[i+1] - dataFromScan[i+2];
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ fall
const buttonfall = document.getElementById("fall");
buttonfall.addEventListener("click",()=>{
    makefall()
})
function makefall(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            dataFromScan[i]+= dataFromScan[i+1] - dataFromScan[i+2];
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ summer
const buttonsummer = document.getElementById("summer");
buttonsummer.addEventListener("click",()=>{
    makesummer()
})
function makesummer(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            // r * 0.2989 + g * 0.5870 + b * 0.1140
            dataFromScan[i+2]+= dataFromScan[i+1] - dataFromScan[i];
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ winter
const buttonwinter = document.getElementById("winter");
buttonwinter.addEventListener("click",()=>{
    makewinter()
})
function makewinter(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            // r * 0.2989 + g * 0.5870 + b * 0.1140
            dataFromScan[i+2]-= dataFromScan[i+1] - dataFromScan[i];
            dataFromScan[i+1]-= dataFromScan[i] - dataFromScan[i+2];
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ funny
const buttonfunny = document.getElementById("funny");
buttonfunny.addEventListener("click",()=>{
    makefunny()
})
function makefunny(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            const total = dataFromScan[i]+dataFromScan[i+1]+ dataFromScan[i+2];
            const avarage = total/3;
            var stash = dataFromScan[i];
            dataFromScan[i] = dataFromScan[i+1];
            dataFromScan[i+1] = stash;
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ funnyTwo
const buttonfunnyTwo = document.getElementById("funnyTwo");
buttonfunnyTwo.addEventListener("click",()=>{
    makefunnyTwo()
})
function makefunnyTwo(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            const total = dataFromScan[i]+dataFromScan[i+1]+ dataFromScan[i+2];
            const avarage = total/3;
            var stash = dataFromScan[i+1];
            dataFromScan[i+1] = dataFromScan[i+2];
            dataFromScan[i+2] = stash;
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ funnyThree
const buttonfunnyThree = document.getElementById("funnyThree");
buttonfunnyThree.addEventListener("click",()=>{
    makefunnyThree()
})
function makefunnyThree(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            const total = dataFromScan[i]+dataFromScan[i+1]+ dataFromScan[i+2];
            const avarage = total/3;
            var stash = dataFromScan[i];
            dataFromScan[i] = dataFromScan[i+2];
            dataFromScan[i+2] = stash;
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ noise
const buttonnoise = document.getElementById("noise");
buttonnoise.addEventListener("click",()=>{
    makenoise()
})
function makenoise(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            const total = dataFromScan[i]+dataFromScan[i+1]+ dataFromScan[i+2];
            const avarage = total/3;
            var num = (0.5 - Math.random()) * avarage
            dataFromScan[i]-= num; //red
            dataFromScan[i+1]-= num; //green
            dataFromScan[i+2]-= num; //blue
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ sepia
const buttonsepia = document.getElementById("sepia");
buttonsepia.addEventListener("click",()=>{
    makesepia()
})
function makesepia(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            // 0.3  * r + 0.59 * g + 0.11 * b;
            const total = dataFromScan[i]*0.3+dataFromScan[i+1]*0.59+ dataFromScan[i+2]*0.11;
            dataFromScan[i]+= total; //red
            dataFromScan[i+1]+= total; //green
            dataFromScan[i+2]+= total; //blue

                    /* second way */
            // dataFromScan[i]+= dataFromScan[i];
            // dataFromScan[i+1]+=dataFromScan[i]/2;
            // dataFromScan[i+2]+=dataFromScan[i]/2;

                    /* third way */
            // dataFromScan[i]+= (dataFromScan[i]+dataFromScan[i+1]);
            // dataFromScan[i+1]*=2;
            // dataFromScan[i+2]*=2;
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ gray
const buttongray = document.getElementById("gray");
buttongray.addEventListener("click",()=>{
    makeGray()
})
function makeGray(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            const total = dataFromScan[i]+dataFromScan[i+1]+ dataFromScan[i+2];
            const avarage = total/3;
            dataFromScan[i]=avarage;
            dataFromScan[i+1]=avarage;
            dataFromScan[i+2]=avarage;
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ invert
const invert = document.getElementById("invert");
invert.addEventListener('click', ()=>{
    makeInvert()
})

function makeInvert(){
    if(scannedImage){
        for(var i=0; i < dataFromScan.length; i+=4){
            dataFromScan[i]= 255 - dataFromScan[i];
            dataFromScan[i+1]= 255 - dataFromScan[i+1];
            dataFromScan[i+2]= 255 - dataFromScan[i+2];
        }
        scannedImage.data = dataFromScan;
        context.putImageData(scannedImage, 0, 0);
        does.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
    }
}

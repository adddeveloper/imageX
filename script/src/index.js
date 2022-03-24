// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ load image
var image, scannedImage, dataFromScan;
const openI = document.getElementById("openIMG");
const canvas = document.getElementById("canvas");
const context =  canvas.getContext('2d');
openI.addEventListener("click", ()=>{
    openI.value =""
})

image = new Image();
image.src = "/style/img/ocelot.jpg";
image.addEventListener("load", ()=>{
    restartImage(image)
})

openI.addEventListener("change", ()=>{
    var file = openI.files[0];
    var reader = new FileReader();
    reader.onload = function(e)  {
        image = new Image();
        image.src = reader.result;
        image.id = "imageX";
        image.addEventListener("load", ()=>{
            restartImage(image)
        })
        // document.body.appendChild(image);
    }
    reader.readAsDataURL(file);
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ export image
const exportButton = document.getElementById("export")
exportButton.addEventListener("click", ()=>{
    exportImage()
})
function exportImage(){
    var neImage = document.createElement("img")
    neImage.src = canvas.toDataURL();
    document.body.appendChild(neImage)
}
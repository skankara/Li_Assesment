function uploadImage(e){
    let files=e.target.files;
    let mimeType=files[0].type; // 
    let imgName=files[0].name;
    console.log("mimeType : ", mimeType);
    console.log("imgName : ", imgName);
    if(mimeType == "image/jpeg")
    {
        let img_element = document.getElementById("img_id");
        img_element.setAttribute("src",imgName);
        img_element.style.setProperty("display","block");
        img_element.onload = function(){
            let height = img_element.height;
            let width = img_element.width;
            console.log("height : ", height);
            console.log("width : ", width);
            let dimensions = width+"*"+height;
            setImageDescription(imgName,mimeType,dimensions);
          }
    }
}

function setImageDescription(imgName,mimeType,dimensions){
    console.log(imgName);
    document.getElementById("imagename").innerHTML = "Image Name: "+imgName;
    document.getElementById("mimetype").innerHTML = "MIME Type: "+mimeType;
    document.getElementById("dimensions").innerHTML = "Dimensions: "+dimensions;
    document.getElementById("display_block").style.setProperty("display","block");
}

function GetCoordinates(e){
    
}
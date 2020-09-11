
var width1;
var height1

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
            width1 = width;
            height1= height;
            console.log("height : ", height);
            console.log("width : ", width);
            let dimensions = width+"*"+height;
            setImageDescription(imgName,mimeType,dimensions);
            setCanvas();
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

function getCoordinates(event){

    let cnvs = document.getElementById("myCanvas");
    let rect = cnvs.getBoundingClientRect();
     let x = event.clientX //- rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
     let y = event.clientY //- rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
     
     let posx = x - rect.left;
    let posy = y - rect.top;

    showToolTop(x,y);
    tempObj = {"x":posx,"y":posy,"description":""};
    
}
function setCanvas(){
    let img = document.getElementById("img_id");
    let cnvs = document.getElementById("myCanvas");
    cnvs.style.position = "absolute";
    cnvs.style.left = img.offsetLeft + "px";
    cnvs.style.top = img.offsetTop + "px";
    cnvs.setAttribute("width",width1);
    cnvs.setAttribute("height",height1);
}

function showToolTop(x,y){
    let tooltip = document.getElementById("id_tooltip");
    console.log("tooltip : ", tooltip);
    tooltip.innerHTML = '<div id="tooltip_div">'+'<input type="text" id= "input_description" /><br>' + 
                        '<button id="save" style = "none" type="button" onclick = "getdescription()">save</button>' +
                        '<button id="cancel" style = "none" type="button" onclick = "onCancel()">cancel</button>'+
                        '</div>';
    tooltip.style.left = (x) + "px" ;
    tooltip.style.top = (y) + "px" ;  
}
function getdescription(){
    description = document.getElementById("input_description").value;
    document.getElementById("tooltip_div").style.display = "none";
    let cnvs = document.getElementById("myCanvas");
    console.log("des : ", description);
    if(description != "")
    {
        let context = cnvs.getContext("2d");
        context.fillStyle = "red";
        context.beginPath();
        context.arc(tempObj.x, tempObj.y, 5, 0, 2 * Math.PI);
        // context.fillStyle = "red";
        context.fill();

        let cnvs1 = document.getElementById("myCanvas");
        let ctx2 = cnvs1.getContext("2d");
        ctx2.fillStyle = "#6eddaa";
        let tempWid = ctx2.measureText(description).width;
        console.log("tempWid : ", tempWid);
        ctx2.fillRect(tempObj.x+5,tempObj.y,2*tempWid,20);

        
        let ctx = cnvs1.getContext("2d");
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(description, tempObj.x+5, tempObj.y+15);

        

        tempObj.description = description;
        displayPoints.push(tempObj);
        addDataPointsTable(displayPoints);
    }
    
    document.getElementById("tooltip_div").remove();
}
function onCancel(){
    document.getElementById("tooltip_div").style.display = "none";
}

function addDataPointsTable(displayPoints){
    document.getElementById("data_table").style.display = "block";
    console.log("displayPoints : ", displayPoints);
    let tbody = document.getElementById("data_tbody");
    let currentRecordNum = displayPoints.length -1 ;
    // for(let i=0;i<150;i++)
    // {
        let tr = document.createElement("tr");
        tr.setAttribute("class","data_tr")
        
        let td = document.createElement("td");
        td.setAttribute("class","td_fragments");
        td.innerHTML = displayPoints[currentRecordNum].x;
        tr.appendChild(td);

        let td1 = document.createElement("td");
        td1.setAttribute("class","td_fragments");
        td1.innerHTML = displayPoints[currentRecordNum].y;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.setAttribute("class","td_fragments");
        td2.innerHTML = displayPoints[currentRecordNum].description;
        tr.appendChild(td2);
        tbody.appendChild(tr);
    // }
    
}

function AddCircle(displayPoints){
    let des_tooltips = document.getElementById("des_tooltips");
    let currentRecordNum = displayPoints.length -1 ;
    let span = document.createElement("span");
    span.style.left = displayPoints[currentRecordNum].x + "px" ;
    span.style.top = displayPoints[currentRecordNum].y + "px" ;
    span.setAttribute("class","dot");
    des_tooltips.appendChild(span);
}
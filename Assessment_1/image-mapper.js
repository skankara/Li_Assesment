
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

function getCoordinates(event){
    tempObj = {};
    let x = event.clientX;
    let y = event.clientY;
    tempObj = {"x": x,"y": y,"description":""};
    showToolTop(x,y);
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
    tempObj.description = description;
    displayPoints.push(tempObj);
    addDataPointsTable(displayPoints);
}
function onCancel(){
    document.getElementById("tooltip_div").style.display = "none";
}

function addDataPointsTable(displayPoints){
    console.log("displayPoints : ", displayPoints);
    let tbody = document.getElementById("data_tbody");
    let currentRecordNum = displayPoints.length -1 ;

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

    let des_tooltips = document.getElementById("des_tooltips");
    let tooltip = document.createElement("span");
    tooltip.innerHTML =  displayPoints[currentRecordNum].description;
    tooltip.style.left = displayPoints[currentRecordNum].x + "px" ;
    tooltip.style.top = displayPoints[currentRecordNum].y + "px" ;  
    des_tooltips.appendChild(tooltip);
}
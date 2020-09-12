function uploadImage(e){
    let files=e.target.files;
    let mimeType=files[0].type; // 
    let imgName=files[0].name;
    console.log("mimeType : ", mimeType);
    console.log("imgName : ", imgName);
    if(mimeType == "image/jpeg")
    {
        let svg = document.getElementById("id_svg");
        let styleText = "background-image : url("+ imgName + ");";
        svg.setAttribute("style",styleText);
        let height = Math.round(svg.getBoundingClientRect().height);
        let width = Math.round(svg.getBoundingClientRect().width);
        let dimensions = width+"*"+height;
        setImageDescription(imgName,mimeType,dimensions);
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

     let x = event.clientX 
     let y = event.clientY 
    
    tempObj = {"x":x,"y":y,"description":""};
    console.log(tempObj);
    showToolTop(x,y);
}
function showToolTop(x,y){
    let tooltip = document.getElementById("tooltip");
    
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
    console.log("des : ", description);
    if(description != "")
    {
        tempObj.description = description;
        displayPoints.push(tempObj);
        addDataPointsTable(displayPoints);
        AddCircle();
    }
    document.getElementById("tooltip_div").remove();
}
function onCancel(){
    document.getElementById("tooltip_div").remove();;
}

function addDataPointsTable(displayPoints){
    document.getElementById("data_table").style.display = "block";
    console.log("displayPoints : ", displayPoints);
    let tbody = document.getElementById("data_tbody");
    let currentRecordNum = displayPoints.length -1 ;
    // for(let i=0;i<150;i++) // Testing scroll bar
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

function AddCircle(){
    let currentRecordNum = displayPoints.length -1 ;
    let svg = document.getElementById("id_svg");
    var svgns = "http://www.w3.org/2000/svg";
    let div = document.createElement("div");
   // div.setAttribute("class","circle");
    let x = displayPoints[currentRecordNum].x;
    let y = displayPoints[currentRecordNum].y - 40 ; // Removing the top padding value

    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', x + "px");
    circle.setAttributeNS(null, 'cy', y + "px");
    circle.setAttributeNS(null, 'r', 5);
    circle.setAttributeNS(null, 'style', 'fill: "#c52907"; stroke: black; stroke-width: 3px;' );
    svg.appendChild(circle);

    circle.addEventListener("mouseover", function( event ) {   
        console.log("on Mouse over");

        let textdata = document.getElementById("textdata");
        let p = document.createElement("p");
        p.setAttribute("id","p_id")
        let elem = "<p>" + displayPoints[currentRecordNum].description + "</p>" ;
        p.innerHTML = elem;
        p.style.left = x + 15 + "px";
        p.style.top = y + 10 + "px"; 
        textdata.appendChild(p);
      });
    circle.addEventListener("mouseout", function( event ) {   
        console.log("on Mouse out");
        document.getElementById("p_id").remove();
      
      });
      addingCircles(x,y)
}

function addingCircles(x,y){
    let circleDiv = document.getElementById("circlediv");
   let div =  document.createElement("div");
   div.setAttribute("class","cir");
   div.setAttribute("width",x+"px");
   div.setAttribute("height",y+"px");
   circleDiv.appendChild(div);
}

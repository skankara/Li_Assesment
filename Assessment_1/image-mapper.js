function uploadImage(e){
    let files=e.target.files;
    let mimeType=files[0].type; // 
    let imgName=files[0].name;
    if(mimeType == "image/jpeg")
    {
        let img_element = document.getElementById("img_id");
        img_element.setAttribute("src",imgName);
        img_element.style.setProperty("display","block");
        img_element.onload = function(){
            let someEl = document.getElementById('img_id');
            const myObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    width = Math.ceil(entry.contentRect.width);
                    height = Math.ceil(entry.contentRect.height);
                    let dimensions = width+"*"+height;
                    setImageDescription(imgName,mimeType,dimensions);
                });
              });
            myObserver.observe(someEl);
          }
    }
}
function setImageDescription(imgName,mimeType,dimensions){
    document.getElementById("imagename").innerHTML = "Image Name: "+imgName;
    document.getElementById("mimetype").innerHTML = "MIME Type: "+mimeType;
    document.getElementById("dimensions").innerHTML = "Dimensions: "+dimensions;
    document.getElementById("display_block").style.setProperty("display","block");
}
function getCoordinates(e){
    let maindiv = document.getElementById("container");
    let x = (e.pageX - maindiv.offsetLeft ) //+ window.scrollLeft;
    let y = (e.pageY - maindiv.offsetTop) //+ window.scrollTop;
    showToolTop(x,y);
}
function showToolTop(x,y){
    let tooltip = document.getElementById("tooltip");
    
    tooltip.innerHTML = '<div id="tooltip_div">'+'<input type="text" id= "input_description" /><br>' + 
                        '<button id="save" style = "none" type="button">save</button>' +
                        '<button id="cancel" style = "none" type="button" >cancel</button>'+
                        '</div>';
    
    tooltip.style.left = (x) + "px" ;
    tooltip.style.top = (y) + "px" ;
    const save = document.getElementById('save'); 

    save.addEventListener('click', () => {
        let description = document.getElementById("input_description").value;
        let tempObj = {"x":x,"y":y,"description:":description};
        AddCircle(x,y,description);
        document.getElementById("tooltip_div").remove();
        addDataPointsTable(x,y,description);
    });
    const cancel = document.getElementById('cancel'); 
    cancel.addEventListener('click', () => {
        document.getElementById("tooltip_div").remove();
    });
}
function AddCircle(x,y,description){
    let maindiv = document.getElementById("circlediv");
    let maincontainer = document.getElementById("container");
    var rect = maincontainer.getBoundingClientRect();
    let div = document.createElement("div");
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.setAttribute("class","circle")
    maindiv.appendChild(div);

    div.addEventListener("mouseover", function( event ) {   
        let p = document.createElement("p");
        p.setAttribute("id","p_id")
        let elem = "<p>" + description + "</p>" ;
        p.innerHTML = elem;
        p.style.left = x + 10 + "px";
        p.style.top = y - 22 + "px"; 
        maindiv.appendChild(p);
      });
    div.addEventListener("mouseout", function( event ) {   
        document.getElementById("p_id").remove();
      });
}

function addDataPointsTable(x,y,description){
    document.getElementById("data_table").style.display = "block";
    let tbody = document.getElementById("data_tbody");
    let tr = document.createElement("tr");
    tr.setAttribute("class","data_tr")
    
    let td = document.createElement("td");
    td.setAttribute("class","td_fragments");
    td.innerHTML = x;
    tr.appendChild(td);

    let td1 = document.createElement("td");
    td1.setAttribute("class","td_fragments");
    td1.innerHTML = y;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.setAttribute("class","td_fragments");
    td2.innerHTML = description;
    tr.appendChild(td2);
    tbody.appendChild(tr);
}
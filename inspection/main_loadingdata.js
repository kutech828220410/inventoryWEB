var device_buf =[];
var NumOfRow = 0;
var rowHeight = 145;
window.onresize = function() 
{
    const device = checkDeviceType();
    const screenWidth = getScreenWidth();   
      
    if(device == DeviceType.MOBILE) 
    { 
        if(device != device_buf)
        {
            NumOfRow = 1;
            const row_div = document.querySelectorAll(".row_div");
            for(var i = 0 ; i < row_div.length ; i++)
            {
                row_div[i].style.width = "100%";
            }
            device_buf = device;
        }      
    
    }
    else
    {
        if(device != device_buf) device_buf = device;
        const temp = Math.floor(screenWidth / 300);
        const row_width = screenWidth / temp - 20;
        const row_div = document.querySelectorAll(".row_div");
        NumOfRow = temp;
        for(var i = 0 ; i < row_div.length ; i++)
        {
            row_div[i].style.width = `${row_width}px`;
        }
    }
   
    Set_rowTotalHeight();  
}
function row_div_onclick(event)
{
    sub_row_div_onclick(this);
}
function sub_row_div_onclick(row_div)
{
    const GUID = row_div.getAttribute("GUID");
    console.log(GUID);
    for(var i = 0 ; i <data.Data[0].Contents.length ; i++)
    {
        if(data.Data[0].Contents[i].GUID == GUID)
        {
            show_popup_input(data.Data[0].Contents[i] , true , true);
            return;
        }
    }
}
function Replace_data_by_content(creat , content)
{
 
    for(var i = 0 ; i < creat.Contents.length ; i++)
    {
      if(creat.Contents[i].GUID == content.GUID)
      {
         const PAKAGE = creat.Contents[i].PAKAGE;
         creat.Contents[i] = content;
         creat.Contents[i].PAKAGE = PAKAGE;
         const End_QTY_input = document.querySelector(`#End_QTY_input${i}`);
         End_QTY_input.innerText = content.END_QTY;

         const row_div = document.querySelector(`#row_div${i}`);
         if(creat.Contents[i].Sub_content.length == 0)
         {
            row_div.style.display = "none";
         }
         else
         {
            row_div.style.display = "";
         }
      }
    }
    edit_herader_view_QTY();
}
function Set_rowTotalHeight()
{
    const row_div = document.querySelectorAll(".row_div");
  
    var temp = 0;
    for(var i = 0 ; i < row_div.length ; i++)
    {
        if(row_div[i].style.visibility != "hidden")temp++;
    }
    var num =  temp / NumOfRow;
    if((temp % NumOfRow) != 0) num++;
    const main_div = document.querySelector('#main_div');
    const height = `${(num * rowHeight) + 100}`;
    main_div.style.height = `${height}px`;
    if(height > screenHeight) main_div.style.height = "110%";    
}
function creat_row_div(_index , Contents) 
{
    const row_div = document.createElement("div");
    row_div.setAttribute("GUID", `${Contents.GUID}`);
    row_div.setAttribute("CODE", `${Contents.CODE}`);
    row_div.setAttribute("SKDIACODE", `${Contents.SKDIACODE}`);
    row_div.setAttribute("NAME", `${Contents.NAME}`);
    row_div.setAttribute("CHT_NAME", `${Contents.CHT_NAME}`);
    row_div.className = "row_div";
    row_div.id = `row_div${_index}`;
    row_div.style.display = "inline-block";
    row_div.style.justifyContent = "top";
    row_div.style.width = "100%";
    row_div.style.backgroundColor = (Contents.Sub_content.length == 0)? "white" : "#baf157";
    if(device == DeviceType.MOBILE) 
    {
        row_div.style.width = "100%";
        NumOfRow = 1;
    }
    if(device == DeviceType.COMPUTER)
    {
        const temp = Math.floor(screenWidth / 300);
        const row_width = screenWidth / temp - 20;
        row_div.style.width = `${row_width}px`;
        NumOfRow = temp;
    } 
    row_div.style.height= `${rowHeight}px`;
    row_div.style.border = "1px solid gray";
    row_div.style.flexDirection = "column";
    row_div.style.margin = "1px";
    row_div.style.padding = "4px";
    row_div.style.borderRadius = "2px";
    const Block1_div = get_block1_div(_index, Contents);
    const Block2_div = get_block2_div(_index, Contents);

    row_div.appendChild(Block1_div);
    row_div.appendChild(Block2_div);
    row_div.onclick = row_div_onclick;
    // 添加鼠标悬停效果
    row_div.style.transition = "background-color 0.3s";
    row_div.addEventListener("mouseover", function() 
    {
       row_div.style.border = "5px solid #1b05c7";
       row_div.style.padding = "0px";
       row_div.style.borderRadius = "5px";
    });
    row_div.addEventListener("mouseout", function()
    {
        row_div.style.border = "1px solid black";
        row_div.style.padding = "4px";
        row_div.style.borderRadius = "2px";

    });


    return row_div;
}


function get_block1_div(_index, item)
{
    const Block1_div = document.createElement("div");
    Block1_div.className = "Block1_div";
    Block1_div.id = `Block1_div${_index}`;
    Block1_div.style.display = "flex";
    Block1_div.style.flexDirection = "row";
    Block1_div.style.width = "100%";
    Block1_div.style.height= "85px";
    Block1_div.style.fontSize = "12px";
    //藥品資訊
    const drugInfo_div = document.createElement("div");
    drugInfo_div.className = "drugInfo_div";
    drugInfo_div.id = `drugInfo_div${_index}`;
    drugInfo_div.style.display = "flex";
    drugInfo_div.style.flexDirection = "column";
    drugInfo_div.style.justifyContent = "flex-start";
    drugInfo_div.style.width = "50%";
    drugInfo_div.style.height= "100%";
    //盤點單號
    const IC_SN_div = document.createElement("div");
    IC_SN_div.className = "IC_SN_div"; 
    IC_SN_div.id = `IC_SN_div${_index}`;
    IC_SN_div.innerText = `${_index + 1}`;
    IC_SN_div.style.fontWeight = "bolder";
    IC_SN_div.style.paddingLeft = "5px";
    IC_SN_div.style.display = "flex";
    IC_SN_div.style.justifyContent = "flex-start";
    IC_SN_div.style.alignItems = "center";
    IC_SN_div.style.width = "100%";
    IC_SN_div.style.height= "20px";
    //藥碼
    const code_div = document.createElement("div");
    code_div.className = "code_div"; 
    code_div.id = `code_div${_index}`;
    code_div.innerText = `藥碼：${item.CODE}`;
    code_div.style.fontWeight = "bolder";
    code_div.style.paddingLeft = "5px";
    code_div.style.display = "flex";
    code_div.style.justifyContent = "flex-start";
    code_div.style.alignItems = "center";
    code_div.style.width = "100%";
    code_div.style.height= "20px";
    //料號
    const skdiacode_div = document.createElement("div");
    skdiacode_div.className = "skdiacode_div"; 
    skdiacode_div.id = `skdiacode_div${_index}`;
    if(item.SKDIACODE == null || item.SKDIACODE == "")
    {
        skdiacode_div.innerText = `料號：無`;
    }
    else skdiacode_div.innerText = `料號：${item.SKDIACODE}`;
    skdiacode_div.style.fontWeight = "bolder";
    skdiacode_div.style.paddingLeft = "5px";
    skdiacode_div.style.display = "flex";
    skdiacode_div.style.justifyContent = "flex-start";
    skdiacode_div.style.alignItems = "center";
    skdiacode_div.style.width = "100%";
    skdiacode_div.style.height= "20px";

    //理論與實際值
    const Start_QTY_End_QTY_div = document.createElement("div");
    Start_QTY_End_QTY_div.className = "Start_QTY_End_QTY_div";
    Start_QTY_End_QTY_div.id = `Start_QTY_End_QTY_div${_index}`;
    Start_QTY_End_QTY_div.style.display = "flex";
    Start_QTY_End_QTY_div.style.justifyContent = "top";
    Start_QTY_End_QTY_div.style.flexDirection = "row";
    Start_QTY_End_QTY_div.style.width = "50%";
    Start_QTY_End_QTY_div.style.height= "100%";
    Start_QTY_End_QTY_div.style.marginTop = "5px";
    Start_QTY_End_QTY_div.style.marginRight = "10px";
    //理論值
    const Start_QTY_div = document.createElement("div");
    Start_QTY_div.className = "Start_QTY_div"; 
    Start_QTY_div.id = `Start_QTY_div${_index}`;
    Start_QTY_div.style.display = "flex-direction";
    Start_QTY_div.style.flexWrap = "wrap";
    Start_QTY_div.style.justifyContent = "top";
    Start_QTY_div.style.direction = "column";
    Start_QTY_div.style.alignItems = "center";
    Start_QTY_div.style.width = "100%";
    Start_QTY_div.style.height= "100%";
    Start_QTY_div.style.marginRight = "3px";

    const Start_QTY_text = document.createElement("div");
    Start_QTY_text.className = "Start_QTY_text"; 
    Start_QTY_text.id = `Start_QTY_text${_index}`;
    Start_QTY_text.innerText = `理論值：`;
    Start_QTY_text.style.fontWeight = "bolder";
    // Start_QTY_text.style.display = "flex";
    // Start_QTY_text.style.justifyContent = "flex-start";
    Start_QTY_text.style.alignItems = "center";
    Start_QTY_text.style.width = "100%";
    Start_QTY_text.style.height= "20px";
    const Start_QTY_input = document.createElement("div");
    Start_QTY_input.className = "Start_QTY_input"; 
    Start_QTY_input.id = `Start_QTY_input${_index}`;
    Start_QTY_input.innerText = `${item.START_QTY}`;
    Start_QTY_input.style.textAlign = "right";
    Start_QTY_input.style.fontWeight = "bolder";
    Start_QTY_input.style.display = "flex";
    Start_QTY_input.style.justifyContent = "right";
    Start_QTY_input.style.alignItems = "center";
    Start_QTY_input.style.paddingRight ="10px";
    Start_QTY_input.style.width = "85%";
    Start_QTY_input.style.height= "40px";
    Start_QTY_input.style.borderRadius = "3px";
    Start_QTY_input.style.backgroundColor = "lightgray";
    Start_QTY_input.style.border = "1px solid";

    Start_QTY_div.appendChild(Start_QTY_text);
    Start_QTY_div.appendChild(Start_QTY_input);
    //盤點量
    const End_QTY_div = document.createElement("div");
    End_QTY_div.className = "End_QTY_div"; 
    End_QTY_div.id = `End_QTY_div${_index}`;
    End_QTY_div.style.display = "flex-direction";
    End_QTY_div.style.flexWrap = "wrap";
    End_QTY_div.style.justifyContent = "top";
    End_QTY_div.style.direction = "column";
    End_QTY_div.style.alignItems = "center";
    End_QTY_div.style.width = "100%";
    End_QTY_div.style.height= "100%";
    const End_QTY_text = document.createElement("div");
    End_QTY_text.className = "End_QTY_text"; 
    End_QTY_text.id = `End_QTY_text${_index}`;
    End_QTY_text.innerText = `盤點量：`;
    End_QTY_text.style.fontWeight = "bolder";
    End_QTY_text.style.alignItems = "center";
    End_QTY_text.style.textAlign = "left";
    End_QTY_text.style.width = "100%";
    End_QTY_text.style.height= "20px";

    const End_QTY_input = document.createElement("div");
    End_QTY_input.className = "End_QTY_input"; 
    End_QTY_input.id = `End_QTY_input${_index}`;
    End_QTY_input.innerText = `${item.END_QTY}`;
    End_QTY_input.style.textAlign = "right";
    End_QTY_input.style.fontWeight = "bolder";
    End_QTY_input.style.display = "flex";
    End_QTY_input.style.justifyContent = "right";
    End_QTY_input.style.alignItems = "center";
    End_QTY_input.style.paddingRight ="10px";
    End_QTY_input.style.width = "85%";
    End_QTY_input.style.height= "40px";
    End_QTY_input.style.borderRadius = "3px";
    End_QTY_input.style.backgroundColor = "white";
    End_QTY_input.style.border = "1px solid";


    End_QTY_div.appendChild(End_QTY_text);
    End_QTY_div.appendChild(End_QTY_input);

    Start_QTY_End_QTY_div.appendChild(Start_QTY_div);
    Start_QTY_End_QTY_div.appendChild(End_QTY_div);


    drugInfo_div.appendChild(IC_SN_div);
    drugInfo_div.appendChild(code_div);
    drugInfo_div.appendChild(skdiacode_div);


    Block1_div.appendChild(drugInfo_div);
    Block1_div.appendChild(Start_QTY_End_QTY_div);
    return Block1_div;
}
function get_block2_div(_index, item)
{
    const Block1_div = document.createElement("div");
    Block1_div.className = "Block1_div";
    Block1_div.id = `Block1_div${_index}`;
    Block1_div.style.display = "flex";
    Block1_div.style.flexDirection = "row";
    Block1_div.style.width = "100%";
    Block1_div.style.height= "80px";
    Block1_div.style.fontSize = "12px";

    //藥品資訊
    const drugInfo_div = document.createElement("div");
    drugInfo_div.className = "drugInfo_div";
    drugInfo_div.id = `drugInfo_div${_index}`;
    drugInfo_div.style.display = "flex";
    drugInfo_div.style.flexDirection = "column";
    drugInfo_div.style.justifyContent = "flex-start";
    drugInfo_div.style.width = "70%";
    drugInfo_div.style.height= "100%";

    //英文名
    const name_div = document.createElement("div");
    name_div.className = "name_div"; 
    name_div.id = `name_div${_index}`;
    name_div.innerText = `(英)：${item.NAME}`;
    name_div.style.fontWeight = "bolder";
    name_div.style.paddingLeft = "5px";
    name_div.style.color = "#cf6800";
    name_div.style.display = "flex";
    name_div.style.justifyContent = "top";
    name_div.style.width = "100%";
    name_div.style.fontFamily = "微軟正黑體";
    //中文名
    const cht_name_div = document.createElement("div");
    cht_name_div.className = "cht_name_div"; 
    cht_name_div.id = `cht_name_div${_index}`;
    cht_name_div.innerText = `(中)：${item.CHT_NAME}`;
    cht_name_div.style.fontWeight = "bolder";
    cht_name_div.style.paddingLeft = "5px";
    cht_name_div.style.color = "#cf6800";
    cht_name_div.style.display = "flex";
    cht_name_div.style.justifyContent = "top";
    cht_name_div.style.width = "100%";
    cht_name_div.style.height= "50%";
    cht_name_div.style.fontFamily = "微軟正黑體";

    //Barcode
    const barcode_div = document.createElement("div");
    barcode_div.className = "barcode_div";
    barcode_div.id = `barcode_div${_index}`;
    barcode_div.style.display = "flex";
    barcode_div.style.flexDirection = "row";
    barcode_div.style.justifyContent = "right";
    barcode_div.style.alignItems = "right";
    barcode_div.style.width = "30%";
    barcode_div.style.height= "100%";
    barcode_div.style.marginRight = "10px";
    barcode_div.style.marginLeft = "10px";

    drugInfo_div.appendChild(name_div);
    drugInfo_div.appendChild(cht_name_div);

  

    Block1_div.appendChild(drugInfo_div);
    Block1_div.appendChild(barcode_div);

    return Block1_div;
}
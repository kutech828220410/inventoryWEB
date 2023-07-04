var device_buf =[];
var NumOfRow = 0;
var rowHeight = 60;
window.onresize = function() 
{
    const device = checkDeviceType();
    const screenWidth = getScreenWidth();   
      
    if(device == DeviceType.MOBILE) 
    { 
        if(device != device_buf)
        {
            const row_div = document.querySelectorAll(".row_div");
            for(var i = 0 ; i < row_div.length ; i++)
            {
                row_div[i].style.width = "100%";
            }
            device_buf = device;
            NumOfRow = 1;
        }      
    
    }
    else
    {
        if(device != device_buf) device_buf = device;
        const temp = Math.floor(screenWidth / 300);
        const row_width = screenWidth / temp - 20;
        const row_div = document.querySelectorAll(".row_div");
        for(var i = 0 ; i < row_div.length ; i++)
        {
            row_div[i].style.width = `${row_width}px`;
        }
        NumOfRow = temp;
    }
    Set_rowTotalHeight();
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

function row_div_onclick(event)
{
    sub_row_div_onclick(this);
}
function sub_row_div_onclick(row_div)
{
    const GUID = row_div.getAttribute("GUID");
    for(var i = 0 ; i < data.Data.length ; i++)
    {
        if(data.Data[i].GUID == GUID)
        {
            console.log(data.Data[i]);

            show_popup_input(data.Data[i] , true);
            return;
        }
    }
}
function Replace_data_by_Med(data , Med)
{
    console.log("data",data);
    for(var i = 0 ; i < data.length ; i++)
    {
      if(data[i].GUID == Med.GUID)
      {
         data[i] = Med;
         const row_div = document.querySelector(`#row_div${i}`);
         row_div.style.backgroundColor = (data[i].BARCODE.length == 0)? "white" : "#baf157";
      }
    }
    edit_herader_view_QTY();
}
function creat_row_div(_index , Med) 
{
    const row_div = document.createElement("div");
    My_Div.Init(row_div, 'row_div',`row_div${_index}`, '100%', `${rowHeight}px`, '');
    My_Div.Set_Block(row_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

    row_div.setAttribute("GUID", `${Med.GUID}`);
    row_div.setAttribute("CODE", `${Med.CODE}`);
    row_div.setAttribute("SKDIACODE", `${Med.SKDIACODE}`);
    row_div.setAttribute("NAME", `${Med.NAME}`);
    row_div.setAttribute("CHT_NAME", `${Med.CHT_NAME}`);
    row_div.setAttribute("BARCODE1", `${Med.BARCODE1}`);
    row_div.setAttribute("BARCODE2", `${Med.BARCODE2}`);

    row_div.style.backgroundColor = (Med.BARCODE.length == 0)? "white" : "#baf157";
    row_div.style.border = "1px solid gray";
    row_div.style.margin = "1px";
    row_div.style.padding = "4px";
    row_div.style.borderRadius = "2px";
    const Block1_div = get_block1_div(_index, Med);
    row_div.appendChild(Block1_div);
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
    My_Div.Init(Block1_div, 'Block1_div',`Block1_div${_index}`, '100%', '100%', '');
    My_Div.Set_Block(Block1_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);

    //藥品資訊
    const drugInfo_div = document.createElement("div");
    My_Div.Init(drugInfo_div, 'drugInfo_div',`drugInfo_div${_index}`, '30%', '100%', '');
    My_Div.Set_Block(drugInfo_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.LEFT);
    Block1_div.appendChild(drugInfo_div);

    //區域
    const area_div = document.createElement("div");
    My_Div.Init(area_div, 'area_div',`area_div${_index}`, '100%', '30px', '');
    My_Div.Set_Text(area_div ,``, TextAlignEnum.CENTER , "14px", true,"微軟正黑體","black");
    area_div.style.border = "1px solid";
    if(item.AREA == null || item.AREA == "")
    {
        area_div.innerText = `區域：無`;
    }
    else area_div.innerText = `區域${item.AREA}`;
    drugInfo_div.appendChild(area_div);

    //藥碼
    const code_div = document.createElement("div");
    My_Div.Init(code_div, 'code_div',`code_div${_index}`, '100%', '30px', '');
    My_Div.Set_Text(code_div ,`藥碼：${item.CODE}`, TextAlignEnum.LEFT , "14px", true,"微軟正黑體","black");
    code_div.style.paddingLeft = "5px";
    
    drugInfo_div.appendChild(area_div);

    //沒有填入藥品時，不顯示藥碼
    if (item.CODE == null || item.CODE == "") {
        // Do nothing if IPCODE is empty or null
    } else {
        drugInfo_div.appendChild(code_div);
    };


   //藥品內容
   const drugnContent_div = document.createElement("div");
   My_Div.Init(drugnContent_div, 'drugnContent_div',`drugInfo_div${_index}`, '70%', '100%', '');
   My_Div.Set_Block(drugnContent_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
   drugnContent_div.style.marginLeft = "5px";
   Block1_div.appendChild(drugnContent_div);

   //儲位IP
   const IP_div = document.createElement("div");
   My_Div.Init(IP_div, 'IP_div',`IP_div${_index}`, '100%', '30px', '');
   My_Div.Set_Text(IP_div ,`IPIP${item.CODE}`, TextAlignEnum.RIGHT , "22px", true,"微軟正黑體","pink");
   IP_div.style.paddingRight = "5px";
   drugnContent_div.appendChild(IP_div);

   const name_div = document.createElement("div");
   My_Div.Init(name_div, 'name_div',`name_div${_index}`, '100%', '30px', '');
   My_Div.Set_Text(name_div ,`(英)：${item.NAME}`, TextAlignEnum.LEFT , "12px", true,"微軟正黑體","#cf6800");
   name_div.style.paddingLeft = "5px";

   //沒有填入藥品時，不顯示藥品英文名字
   if (item.NAME == null || item.NAME == "") {
    // Do nothing if IPCODE is empty or null
    } else {
    drugnContent_div.appendChild(name_div);
    };

    return Block1_div;
}
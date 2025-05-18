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
    // main_div.style.height = `${height}px`;


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
    My_Div.Init(row_div, 'row_div',`row_div${_index}`, '', ``, '');
    My_Div.Set_Block(row_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

    row_div.setAttribute("GUID", `${Med.GUID}`);
    row_div.setAttribute("CODE", `${Med.CODE}`);
    row_div.setAttribute("SKDIACODE", `${Med.SKDIACODE}`);
    row_div.setAttribute("NAME", `${Med.NAME}`);
    row_div.setAttribute("CHT_NAME", `${Med.CHT_NAME}`);
    row_div.setAttribute("BARCODE1", `${Med.BARCODE1}`);
    row_div.setAttribute("BARCODE2", `${Med.BARCODE2}`);
    row_div.setAttribute("TYPE", `${Med.TORW}`);

    row_div.style.backgroundColor = (Med.BARCODE.length == 0)? "white" : "#baf157";
    row_div.style.border = "1px solid gray";
    row_div.style.margin = "1px";
    row_div.style.padding = "4px";
    row_div.style.borderRadius = "2px";
    row_div.style.boxSizing = "border-box";
    row_div.style.width = "300px";

    const Block1_div = get_block1_div(_index, Med);
    row_div.appendChild(Block1_div);
    if(device == DeviceType.MOBILE) 
    {
        // row_div.style.width = "100%";
        NumOfRow = 1;
    }
    if(device == DeviceType.COMPUTER)
    {
        const temp = Math.floor(screenWidth / 300);
        const row_width = screenWidth / temp - 20;
        // row_div.style.width = `${row_width}px`;
        NumOfRow = temp;
    } 
    
   


    row_div.onclick = row_div_onclick;
    // 添加鼠标悬停效果
    row_div.style.transition = "background-color 0.3s";
    row_div.addEventListener("mouseover", function() 
    {
       row_div.style.border = "5px solid #1b05c7";
    //    row_div.style.padding = "0px";
       row_div.style.borderRadius = "5px";
    });
    row_div.addEventListener("mouseout", function()
    {
        row_div.style.border = "1px solid black";
        // row_div.style.padding = "4px";
        row_div.style.borderRadius = "2px";
    });

    edit_herader_view_QTY();

    return row_div;
}


function get_block1_div(_index, item)
{
    const Block1_div = document.createElement("div");
    My_Div.Init(Block1_div, 'Block1_div',`Block1_div${_index}`, '100%', '100%', '');
    My_Div.Set_Block(Block1_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);

    //藥品資訊
    const drugInfo_div = document.createElement("div");
    My_Div.Init(drugInfo_div, 'drugInfo_div',`drugInfo_div${_index}`, '140px', '100%', '');
    My_Div.Set_Block(drugInfo_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.LEFT);
    Block1_div.appendChild(drugInfo_div);
    drugInfo_div.style.marginRight = "4px";


    //藥碼
    const code_div = document.createElement("div");
    My_Div.Init(code_div, 'code_div',`code_div${_index}`, '100%', '30px', '');
    My_Div.Set_Text(code_div ,`藥碼：${item.CODE}`, TextAlignEnum.LEFT , "14px", true,"微軟正黑體","black");
    code_div.style.paddingLeft = "5px";
    drugInfo_div.appendChild(code_div);
   
    const skdiacode_div = document.createElement("div");
    My_Div.Init(skdiacode_div, 'skdiacode_div',`skdiacode_div${_index}`, '100%', '30px', '');
    My_Div.Set_Text(skdiacode_div ,``, TextAlignEnum.LEFT , "14px", true,"微軟正黑體","black");
    skdiacode_div.style.paddingLeft = "5px";
    if(item.SKDIACODE == null || item.SKDIACODE == "")
    {
        skdiacode_div.innerText = `料號：無`;
    }
    else skdiacode_div.innerText = `料號：${item.SKDIACODE}`;
    drugInfo_div.appendChild(skdiacode_div);

   //藥品內容
   const drugnContent_div = document.createElement("div");
   My_Div.Init(drugnContent_div, 'drugnContent_div',`drugInfo_div${_index}`, '100%', '100%', '');
   My_Div.Set_Block(drugnContent_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.LEFT);
   Block1_div.appendChild(drugnContent_div);

   const name_div = document.createElement("div");
   My_Div.Init(name_div, 'name_div',`name_div${_index}`, '100%', '30px', '');
   My_Div.Set_Text(name_div ,`(英)：${item.NAME}`, TextAlignEnum.LEFT , "12px", true,"微軟正黑體","#cf6800");
   name_div.style.paddingLeft = "5px";
   drugnContent_div.appendChild(name_div);

   const cht_name_div = document.createElement("div");
   My_Div.Init(cht_name_div, 'cht_name_div',`cht_name_div${_index}`, '100%', '30px', '');
   My_Div.Set_Text(cht_name_div ,`(中)：${item.CHT_NAME}`, TextAlignEnum.LEFT , "12px", true,"微軟正黑體","#cf6800");
   cht_name_div.style.paddingLeft = "5px";
   drugnContent_div.appendChild(cht_name_div);
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

    if(!isDesktop) 
    {
        const barcodeCanvas = document.createElement("img");
        barcodeCanvas.style.width = "120px";
        barcodeCanvas.style.height= "50px";
        barcodeCanvas.id = `barcodeCanvas${_index}`;
        barcodeCanvas.className = `barcodeCanvas`;
        var Barcode= "";
        if(Barcode == "")Barcode = item.BARCODE1;
        if(Barcode == "")Barcode = item.BARCODE2;
        if(Barcode == "")Barcode = item.SKDIACODE;
        if(Barcode == "")Barcode = item.CODE;
        JsBarcode(barcodeCanvas, Barcode, {
          format: "code128",
          width: "1",
          height: "1",
          displayValue: false,
          margin: 0,
        });
        barcode_div.appendChild(barcodeCanvas);
    }
    if(isDesktop) 
    {
        barcodeCanvas = document.createElement("canvas");
        barcodeCanvas.style.width = "120px";
        barcodeCanvas.style.height= "50px";
        barcodeCanvas.id = `barcodeCanvas${_index}`;
        barcodeCanvas.className = `barcodeCanvas`;
        var Barcode= "";
        if(Barcode == "")Barcode = item.BARCODE1;
        if(Barcode == "")Barcode = item.BARCODE2;
        if(Barcode == "")Barcode = item.SKDIACODE;
        if(Barcode == "")Barcode = item.CODE;
        JsBarcode(barcodeCanvas, Barcode, {
          format: "code128",
          width: "1",
          height: "1",
          displayValue: false,
          margin: 0,
        });
        barcode_div.appendChild(barcodeCanvas);
    }


    drugInfo_div.appendChild(name_div);
    drugInfo_div.appendChild(cht_name_div);

  

    Block1_div.appendChild(drugInfo_div);
    Block1_div.appendChild(barcode_div);

    return Block1_div;
}
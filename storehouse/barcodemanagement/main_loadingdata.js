var device_buf =[];
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
    }
    
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
            show_popup_input(data.Data[0].Contents[i] , true);
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
         creat.Contents[i] = content;
         const End_QTY_input = document.querySelector(`#End_QTY_input${i}`);
         End_QTY_input.innerText = content.END_QTY;

         const row_div = document.querySelector(`#row_div${i}`);
         row_div.style.backgroundColor = (creat.Contents[i].Sub_content.length == 0)? "white" : "#baf157";
      }
    }
    edit_herader_view_QTY();
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
    }
    if(device == DeviceType.COMPUTER)
    {
        const temp = Math.floor(screenWidth / 300);
        const row_width = screenWidth / temp - 20;
        row_div.style.width = `${row_width}px`;
    } 
    row_div.style.height= "145px";
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

    //國際條碼是否建置
    const End_QTY_input = document.createElement("div");
    My_Div.Set_Block(End_QTY_input, DisplayEnum.FLEX, FlexDirectionEnum.ROW,JustifyContentEnum.CENTER)
    My_Div.Set_Text(End_QTY_input ,`${item.END_QTY}` , TextAlignEnum.CENTER , "26px", true,"微軟正黑體","black");
    End_QTY_input.id = `End_QTY_input${_index}`;
    End_QTY_input.style.fontWeight = "bolder";
    End_QTY_input.style.alignItems = "center";
    End_QTY_input.style.width = "100%";
    End_QTY_input.style.height= "60px";
    End_QTY_input.style.borderRadius = "3px";
    End_QTY_input.style.backgroundColor = "lightgray";
    End_QTY_input.style.border = "1px solid";

    //是否為建置
    if (item.END_QTY == 0) {
        End_QTY_input.innerText = '未建置';
      } else if (item.END_QTY > 0) {
        End_QTY_input.innerText = '已建置';
        End_QTY_input.style.backgroundColor = "white";
      }

    // End_QTY_div.appendChild(End_QTY_input);

    drugInfo_div.appendChild(IC_SN_div);
    drugInfo_div.appendChild(code_div);
    drugInfo_div.appendChild(skdiacode_div);


    Block1_div.appendChild(drugInfo_div);
    Block1_div.appendChild(End_QTY_input);
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
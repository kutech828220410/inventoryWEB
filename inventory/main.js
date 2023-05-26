let response = [];
let data = [];

window.onload = load;
async function load()
{ 
    const Loadingpopup = GetLoadingpopup();
    document.body.appendChild(Loadingpopup);
    Loadingpopup.style.zIndex = "99999";
    var IC_SN = sessionStorage.getItem('IC_SN');    
    Set_main_div_enable(true);
    data = await creat_get_by_IC_SN(IC_SN);
    console.log(data);
    insertDataIntoTable();
    Set_main_div_enable(false);
}
function Set_main_div_enable(value) {
  const main_div = document.querySelector('#main_div');
  if (value) {
    showLoadingPopup();
    //  document.body.style.opacity = "0.5"; 
    document.body.style.pointerEvents = "none";
  }
  else {
    hideLoadingPopup();
    document.body.style.opacity = "1";
    document.body.style.pointerEvents = "auto";

  }
}

async function insertDataIntoTable() {
  // response = await fetch(inspection_get_url); // 替換成您的 API 網址
  // data = await response.json();
  // console.log(data);
  const table = document.querySelector('table');
  const tbody = document.createElement('tbody'); // 新增 tbody 元素
  table.appendChild(tbody); // 加入 table 元素中
  var _index = 0;

  for (const item of data.Data[0].Contents) {
    // 插入新的表格列
    var GUID = item.GUID;
    const row = tbody.insertRow(); // 改為插入 tbody 元素的內容

    // 插入藥品資訊儲存格
    const drugInfoCell = row.insertCell();
    drugInfoCell.innerHTML =
     `
        <div><b style="font-size: 12px; padding-right:5px; padding-left:5px; border-style:dashed; margin-top: -6px;">${_index + 1}</b><span style="padding-left: 10px;">${item.IC_SN}</span></div>
        <div style="display:none;"><b>GUID: ${item.GUID}</b></div>
        <div><b>藥碼: ${item.CODE}</b></div>
        <div><b>料號: ${item.SKDIACODE}</b></div>
        <div style="color: orange;"><b>(英)  ${item.NAME}</b></div>
        <div style="color: orange;"><b>(中)  ${item.CHT_NAME}</b></div>
    `;

    // 插入數量儲存格
    var _quantityCell_QTY = `quantityCell_QTY${_index}`;
    const quantityCell = row.insertCell();
    quantityCell.id = _quantityCell_QTY;
    quantityCell.className = 'quantityCell_QTY';
    quantityCell.style.display = "flex";
    quantityCell.style.justifyContent = "top";
    quantityCell.style.flexDirection = "column";

    const start_QTY_div = document.createElement("div");
    start_QTY_div.id = "start_QTY_div";
    start_QTY_div.className = "start_QTY_div";

    start_QTY_div.style.width = "100%";
    start_QTY_div.style.height = "100%";
    start_QTY_div.style.backgroundColor = "#";
    start_QTY_div.innerHTML =`理論值`;

    const start_QTY_input = document.createElement("input");
    start_QTY_input.id = "start_QTY_input";
    start_QTY_input.className = "start_QTY_input";

    start_QTY_input.style.width = "100%";
    start_QTY_input.style.height = "20px";
    start_QTY_input.style.backgroundColor = "#";
    start_QTY_input.innerHTML =`理論值`;
    start_QTY_input.value = `${item.START_QTY}`;
    start_QTY_input.readOnly = true;

    const end_QTY_div = document.createElement("div");
    end_QTY_div.id = `end_QTY_div_${_index}`;
    end_QTY_div.className = "end_QTY_div";

    end_QTY_div.style.width = "100%";
    end_QTY_div.style.height = "100%";
    end_QTY_div.style.backgroundColor = "#";
    end_QTY_div.innerHTML =`盤點量`;

    const end_QTY_input = document.createElement("input");
    end_QTY_input.setAttribute("_GUID",item.GUID);
    end_QTY_input.className = 'end_QTY_input';
    end_QTY_input.id = `end_QTY_input_${_index}`;
    end_QTY_input.className = "end_QTY_input";

    end_QTY_input.style.width = "100%";
    end_QTY_input.style.height = "20px";
    end_QTY_input.style.backgroundColor = "#";
    end_QTY_input.innerHTML =`盤點量`;
    end_QTY_input.value = `${item.END_QTY}`;
    end_QTY_input.readOnly = true;
    
    quantityCell.appendChild(start_QTY_div);
    quantityCell.appendChild(start_QTY_input);

    quantityCell.appendChild(end_QTY_div);
    quantityCell.appendChild(end_QTY_input);
    // quantityCell.innerHTML = 
    // `
    // <BR>
    // <div class="input-group">
    // <div class="input-group-prepend">
    //   <div>理論值:</div>
    // </div>
    // <BR>
    // <BR>
    // <input type="text" class="form-control text-right" value="${item.START_QTY}" readonly>
    // <div class="input-group">
    //   <div class="input-group-prepend">
    //     <div>盤點量:</div>
    //   </div>
    //   <input id="END_QTY${_index}" type="number" min="0" max="99999" class="form-control" value="${item.END_QTY}" readonly  onblur='checkInput(this , "${GUID}")' onkeydown='checkEnterKey(event, "${GUID}")'>
    //   </div>
    //   </div>
    // `;

    // 插入新的表格列
    var _myModal = `myModal${_index}`;
    var barcode_text = `barcode${_index}`;
    //取得初始化第一個效期批號數量
    var lot_init = "";
    var date_init = "";
    var qty_init = "";
    // if (item.Sub_content.length > 0) {
    //   lot_init = item.Lot_date_datas[0].LOT_NUMBER;
    //   date_init = item.Lot_date_datas[0].VAL_DATE;
    //   qty_init = item.Lot_date_datas[0].QTY;
    // }
    const inspectionRow = tbody.insertRow();
    const inspectionCell = inspectionRow.insertCell();
    inspectionCell.colSpan = 2;
    inspectionCell.id = `firstinventory${_index}`;
    inspectionCell.className = "firstinventory";
    inspectionCell.innerHTML =
      ` 
    <button  id="druginfo${_index}" style="text-align: left;  display:block; width:100%; height:100%; border:none; background-color:transparent;" onclick="">
    點選輸入藥品驗收資訊
    <canvas id="${barcode_text}" style="float: right; width:140px; padding-right:10px;"></canvas>
    </button>
    
    <div id="myModal${_index}" class="modal" _index="${item._index}" IC_SN="${item.IC_SN}" START_QTY="${item.START_QTY}" END_QTY="${item.END_QTY}" GUID = "${GUID}">
    <div class="modal-content">
      <div class=myModal_title>
      <b>[${item.IC_SN}]</b>
      <br>
      <div><b> 藥名 : ${item.NAME}</b></div>
      <div><b> 庫存理論值 : ${item.START_QTY}</b></div>
      </div>
      <button class="addRowBtn" id="addRowBtn${_index}" onclick="Check_addNewRow('${_index}')">新增盤點藥品</button>  
    <div class="Modalrows" id="rows${_index}">
    </div>
    <button class="modalbtn" onclick="validateInput('${_index}' )">確認</button> 
    `;
 
    // for (var i = 0; i < item.Sub_content.length; i++) {
    //   const lot = item.Lot_date_datas[i].LOT_NUMBER;
    //   const date = item.Lot_date_datas[i].VAL_DATE;
    //   const qty = item.Lot_date_datas[i].QTY;
    //   AddNewRow(_index, lot, date, qty);
    // }
    var START_QTY = parseInt(item.START_QTY);
    var END_QTY = parseInt(item.END_QTY);
    if(START_QTY - END_QTY > 0)
    {
      AddNewRow(_index,null,null,(START_QTY - END_QTY));
    }
    

    const barcodeDiv = document.getElementById(barcode_text);
    var Barcode= "";
    if(Barcode == "")Barcode = item.BARCODE1;
    if(Barcode == "")Barcode = item.BARCODE2;
    if(Barcode == "")Barcode = item.SKDIACODE;
    if(Barcode == "")Barcode = item.CODE;
    JsBarcode(barcodeDiv, Barcode, {
      format: "code128",
      width: 1,
      height: 12,
      displayValue: false,
      margin: 0,

    });

    var druginfo = document.querySelector(`#druginfo${_index}`);
    druginfo.className = "druginfo";
    druginfo.setAttribute("GUID",`${GUID}`)
    druginfo.setAttribute("_index",`${_index}`)
    druginfo.setAttribute("_NAME",`${item.NAME}`)
    druginfo.setAttribute("_SKDIACODE",`${item.SKDIACODE}`)
    druginfo.setAttribute("_CODE",`${item.CODE}`)

    druginfo.onclick=druginfo_click;
    _index++;
  }

}
async function druginfo_click(event)
{
  const  GUID = this.getAttribute("GUID");
  const _index = this.getAttribute("_index");
  const _NAME = this.getAttribute("_NAME");
  const _SKDIACODE = this.getAttribute("_SKDIACODE");
  const numberInput = window.prompt(`藥名 : ${_NAME}\n請輸入盤點量：`);
  if(numberInput)
  {
        
     for(var i = 0 ; i < data.Data[0].Contents.length ; i++)
     {
        if(data.Data[0].Contents[i].GUID == GUID)
        {
          
            const _Master_GUID = data.Data[0].Contents[i].GUID;
            var END_QTY = numberInput;
            var OP = "";
      
            const result =  await sub_content_add_single(_Master_GUID,END_QTY,OP);
            const back_content = await content_get_by_content_GUID(_Master_GUID);
            console.log("back_content",back_content);
        }
     }
  }
}
function clearInput(input) {
  input.select();
}
async function checkEnterKey(event, GUID) {
  if (event.key === 'Enter') {
    const input = event.target;
    input.value = await set_END_QTY(GUID, input.value);

  }
}
function submitForm() {
 
}




function searchItem(data, searchKey) {
  return new Promise((resolve, reject) => {
    const result = data.filter((item) => {
      return item.CODE == searchKey;
    });
    if (result.length > 0) {
      resolve(result);
    } else {
      reject("No result found.");
    }
  });
}
//insertDataIntoTable();



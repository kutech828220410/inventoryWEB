let response = [];
let data = [];
async function insertDataIntoTable() {
  url = inspection_get_url;
  response = await fetch(inspection_get_url); // 替換成您的 API 網址
  data = await response.json();
  console.log(data);
  const table = document.querySelector('table');
  const tbody = document.createElement('tbody'); // 新增 tbody 元素
  table.appendChild(tbody); // 加入 table 元素中
  var _index = 0;

  for (const item of data.Data) {
    // 插入新的表格列
    var GUID = item.GUID;
    const row = tbody.insertRow(); // 改為插入 tbody 元素的內容
    row.className = "med_rows";
    row.setAttribute("GUID",GUID);
    // 插入藥品資訊儲存格
    const drugInfoCell = row.insertCell();
    drugInfoCell.innerHTML =
     `
        <div><b style="font-size: 12px; padding-right:5px; padding-left:5px; border-style:dashed; margin-top: -6px;">${_index + 1}</b><span style="padding-left: 10px;">${item.OD_SN_L}</span></div>
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
    quantityCell.innerHTML = 
    `
    <BR>
    <div class="input-group">
    <div class="input-group-prepend">
      <div>應收:</div>
    </div>
    <BR>
    <BR>
    <input type="text" class="form-control text-right" value="${item.START_QTY}" readonly>
    <div class="input-group">
      <div class="input-group-prepend">
        <div>實收:</div>
      </div>
      <input id="END_QTY${_index}" type="number" min="0" max="99999" class="form-control" value="${item.END_QTY}" readonly  onblur='checkInput(this , "${GUID}")' onkeydown='checkEnterKey(event, "${GUID}")'>
      </div>
      </div>
    `;

    // 插入新的表格列
    var _myModal = `myModal${_index}`;
    var barcode_text = `barcode${_index}`;
    //取得初始化第一個效期批號數量
    var lot_init = "";
    var date_init = "";
    var qty_init = "";
    if (item.Lot_date_datas.length > 0) {
      lot_init = item.Lot_date_datas[0].LOT_NUMBER;
      date_init = item.Lot_date_datas[0].VAL_DATE;
      qty_init = item.Lot_date_datas[0].QTY;
    }
    const inspectionRow = tbody.insertRow();
    inspectionRow.className = "med_rows";
    inspectionRow.setAttribute("GUID",GUID);
    const inspectionCell = inspectionRow.insertCell();
    inspectionCell.colSpan = 2;
    inspectionCell.id = `firstinspection${_index}`;
    inspectionCell.className = "firstinspection";
    inspectionCell.innerHTML =
      ` 
    <button  id="druginfo${_index}" style="text-align: left;  display:block; width:100%; height:100%; border:none; background-color:transparent;" onclick="document.getElementById('myModal${_index}').style.display='block'">
    點選輸入藥品驗收資訊
    <canvas id="${barcode_text}" style="float: right; width:140px; padding-right:10px;"></canvas>
    </button>
    
    <div id="myModal${_index}" class="modal" _index="${item._index}" OD_SN_L="${item.OD_SN_L}" START_QTY="${item.START_QTY}" END_QTY="${item.END_QTY}" GUID="${GUID}">
    <div class="modal-content">
      <div class=myModal_title>
      <b>[${item.OD_SN_L}]</b>
      <br>
      <b> 藥名 : ${item.NAME}</b>
      </div>
    <button class="addRowBtn" id="addRowBtn${_index}" onclick="Check_addNewRow('${_index}')">新增驗收藥品</button>      
    <div class="Modalrows" id="rows${_index}">
    </div>
    <button class="modalbtn" onclick="validateInput('${_index}' )">確認</button> 
    `;
 
    for (var i = 0; i < item.Lot_date_datas.length; i++) {
      const lot = item.Lot_date_datas[i].LOT_NUMBER;
      const date = item.Lot_date_datas[i].VAL_DATE;
      const qty = item.Lot_date_datas[i].QTY;
      AddNewRow(_index, lot, date, qty);
    }
    var START_QTY = parseInt(item.START_QTY);
    var END_QTY = parseInt(item.END_QTY);
    if(START_QTY - END_QTY > 0)
    {
      AddNewRow(_index,null,null,(START_QTY - END_QTY));
    }
    

    const barcodeDiv = document.getElementById(barcode_text);
    JsBarcode(barcodeDiv, item.CODE, {
      format: "code128",
      width: 1,
      height: 12,
      displayValue: false,
      margin: 0,

    });


    _index++;
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
  const table = document.querySelector('table');
  const rows = table.rows;

  const formData = [];
  for (let i = 0; i < rows.length; i += 2) {
    const drugInfoCell = rows[i].querySelector();
    const quantityCell = rows[i].querySelector();

    const drugInfo = drugInfoCell.textContent.trim();
    const actualQuantity = quantityCell.value.trim();

    formData.push({
      drugInfo,
      actualQuantity
    });
  }

  postData(inspection_update_post_url, formData)
    .then(response => {
      console.log(response);
      // 在這裡處理回傳的回應
    })
    .catch(error => {
      console.error(error);
      // 在這裡處理錯誤
    });
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('送出資料失敗');
  }

  return response.json();
}
async function get_jsondata() {
  const data = await response.json();
  return data;
}


function search_By_name_Event(event) {

  if (event.key === 'Enter') {
    const input = document.querySelector('.drugNameText');
    if(!search_By_name(input.value))
    {
       input.value = '';
    }
  }
}
function search_By_name(name) {
  let foundRow = null;
  const filter = name.toLowerCase();
  const rows = document.querySelectorAll('table tr');
  var flag_display = false;
  for (let i = 1; i < rows.length; i++) 
  { // 從第2列開始搜尋，跳過表格標題列
    const drugNameCell = rows[i].querySelector('td:first-child');

    if (!drugNameCell) {
      continue; // 如果 drugNameCell 為 null，則跳過該行的處理
    }
    const drugName = drugNameCell.textContent.trim().toLowerCase();
    if (drugName.includes(filter)) {
      rows[i].style.display = '';
      flag_display = true;
    } else {
      rows[i].style.display = 'none';
    }
  }
  if(!flag_display)
  {
    for (let i = 1; i < rows.length; i++) 
    { 
      rows[i].style.display = '';
    }
    alert("查無資料!");
  }
  return flag_display;
  
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
insertDataIntoTable();



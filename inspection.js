let response = [];
let data =[];
async function insertDataIntoTable() {
  response = await fetch('http://103.1.221.188:4433/api/inspection'); // 替換成您的 API 網址
  data = await response.json();

  const table = document.querySelector('table');
  var _index = 0;
  for (const item of data.Data) {
    // 插入新的表格列
    const row = table.insertRow();
    
    // 插入藥品資訊儲存格
    const drugInfoCell = row.insertCell();
    drugInfoCell.innerHTML = `
    <td id="firstdruginfo">
        <div>藥碼: ${item.CODE}</div>
        <div>料號: ${item.SKDIACODE}</div>
        <div>藥名: ${item.NAME}</div>
        <div>中文名: ${item.CHT_NAME}</div>
        </td>
    `;
    
    // 插入數量儲存格
    const quantityCell = row.insertCell();
    quantityCell.innerHTML = `
    <td id="firstquantity">
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
    <input type="number" min="0" max="999" class="form-control" value="">
  </div>
  </td>
  
    `;
    
    // 插入新的表格列
    var barcode_text = `barcode${_index}`;
    console.log(_index);
    const inspectionRow = table.insertRow();
    const inspectionCell = inspectionRow.insertCell();
    inspectionCell.colSpan = 2;
    inspectionCell.id = 'firstinspection';
    //inspectionCell.textContent = `批號:${item.LOT_NUMBER}  效期:${item.VAL_DATE}`;
    inspectionCell.innerHTML = 
    `
    <td id="LOT_NUMBER_VAL_DATE">
    <div>批號:${item.LOT_NUMBER}  效期:${item.VAL_DATE} 
    <canvas id="${barcode_text}" style="float: right; width:140px"></canvas>
    </div>
    </td>
    `; 
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


function submitForm() {
  const table = document.querySelector('table');
  const rows = table.rows;

  const formData = [];
  for (let i = 0; i < rows.length; i += 2) {
    const drugInfoCell = rows[i].querySelector('#firstdruginfo');
    const quantityCell = rows[i].querySelector('#firstquantity input[type="number"]');

    const drugInfo = drugInfoCell.textContent.trim();
    const actualQuantity = quantityCell.value.trim();

    formData.push({
      drugInfo,
      actualQuantity
    });
  }

  postData('http://103.1.221.188:4433/api/inspection', formData)
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


function checkQuantity(input) {
  const expectedInput = input.previousElementSibling.querySelector('input').value;
  const actualInput = input.value;

  if (parseInt(actualInput) > parseInt(expectedInput)) {
    alert('實收數量不可大於應收數量');
    input.value = ''; // 清空實收輸入框的值
  }
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




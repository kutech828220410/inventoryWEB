// let response = [];
// let data =[];
// async function insertDataIntoTable() {
//   url = inspection_get_url;
//   response = await fetch(inspection_get_url); // 替換成您的 API 網址
//   data = await response.json();
//   console.log(data);
//   const table = document.querySelector('table');
//   var _index = 0;
  
  for (const item of data.Data) {
    // 插入新的表格列
    var GUID = item.GUID;
    const row = table.insertRow();
    
    // 插入藥品資訊儲存格
    const drugInfoCell = row.insertCell();
    drugInfoCell.innerHTML = `
    <td id="firstdruginfo">
        <div style="font-size: 10px; margin-top: -6px;"><b>${_index + 1}</b></div>
        <div style="display:none;"><b>GUID: ${item.GUID}</b></div>
        <div><b>藥碼: ${item.CODE}</b></div>
        <div><b>料號: ${item.SKDIACODE}</b></div>
        <div style="color: orange;"><b>(英)  ${item.NAME}</b></div>
        <div style="color: orange;"><b>(中)  ${item.CHT_NAME}</b></div>
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
      <input type="number" min="0" max="9999" class="form-control" value="${item.END_QTY}" inputmode="numeric" onfocus="clearInput(this)" onblur='checkInput(this , "${GUID}")' onkeydown='checkEnterKey(event, "${GUID}")'">
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

function clearInput(input) {
  input.value = '';
}

async function checkInput(input, GUID) {
  data.Data = data.Data.map((item) => {
    if (item.GUID === GUID) {
      const num = parseInt(item.START_QTY);
      if (!input.value) {
        input.value = item.END_QTY ;
        return item;
      }
      if(input.value > num)
      {
        console.log(input.value);
        console.log(item.START_QTY);
         alert("實收數量不得大於應收數量!");
         input.value = 0;
         return item;
      }
      item.END_QTY = input.value;
    }
    return item;
  });

  
  data = await postDataToAPI(inspection_update_post_url , data);
  
  console.log(data);
}

async function checkEnterKey(event, GUID) {
  if (event.key === 'Enter') {
    const input = event.target;
    input.value = await set_END_QTY(GUID ,input.value);
 
  }
}
async function set_END_QTY(GUID , QTY)
{
    data.Data = data.Data.map((item) => {
      if (item.GUID === GUID) {
        const num = parseInt(item.START_QTY);
        if (!QTY) {
          return item;
        }
        console.log(QTY);
        if(QTY > num)
        {
          alert("實收數量不得大於應收數量!");
          QTY = 0;
          return item;
        }
        item.END_QTY = QTY;
      }
      return item;
    });

    data = await postDataToAPI(inspection_update_post_url , data);

    console.log(data);
    return QTY;
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
    search_By_name(input.value);    
  }
}
function search_By_name(name) {
  let foundRow = null;
  const filter = name.toLowerCase();
  const rows = document.querySelectorAll('table tr');
  console.log(name);
  
  for (let i = 1; i < rows.length; i++) { // 從第2列開始搜尋，跳過表格標題列
    const drugNameCell = rows[i].querySelector('td:first-child');
    
    if (!drugNameCell) {
      continue; // 如果 drugNameCell 為 null，則跳過該行的處理
    }
    const drugName = drugNameCell.textContent.trim().toLowerCase();
    if (drugName.includes(filter)) {
      console.log(drugNameCell);
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}
function updateQtyByGuid(guid, qty) {
  const rows = document.querySelectorAll('table tr');
  const filter = guid.toLowerCase();
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const drugNameCell = rows[i].querySelector('td:first-child');
      
    if (!drugNameCell) {
      continue; // 如果 drugNameCell 為 null，則跳過該行的處理
    }
    const drugName = drugNameCell.textContent.trim().toLowerCase();
    if (drugName.includes(filter)) {
      console.log(drugNameCell);
      const qtyInput = row.querySelector('input[type="number"]');
      qtyInput.value = qty;
      return;
    } 
   
  }

  console.warn(`Cannot find row with GUID ${guid}`);
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



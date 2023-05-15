let response = [];
let data =[];
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
    
    // 插入藥品資訊儲存格
    const drugInfoCell = row.insertCell();
    drugInfoCell.innerHTML = `
        <div><b style="font-size: 12px; padding-right:5px; padding-left:5px; border-style:dashed; margin-top: -6px;">${_index + 1}</b><span style="padding-left: 10px;">${item.OD_SN_L}</span></div>
        <div style="display:none;"><b>GUID: ${item.GUID}</b></div>
        <div><b>藥碼: ${item.CODE}</b></div>
        <div><b>料號: ${item.SKDIACODE}</b></div>
        <div style="color: orange;"><b>(英)  ${item.NAME}</b></div>
        <div style="color: orange;"><b>(中)  ${item.CHT_NAME}</b></div>
    `;
  
    // 插入數量儲存格
    const quantityCell = row.insertCell();
    quantityCell.innerHTML = `
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
      <input type="number" min="0" max="99999" class="form-control" value="" readonly onfocus="clearInput(this)" onblur='checkInput(this , "${GUID}")' onkeydown='checkEnterKey(event, "${GUID}")'>
      </div>
      </div>
    `;
    
    // 插入新的表格列
    var barcode_text = `barcode${_index}`;
    console.log(_index);
    const inspectionRow = tbody.insertRow();
    const inspectionCell = inspectionRow.insertCell();
    inspectionCell.colSpan = 2;
    inspectionCell.id = 'firstinspection';
    inspectionCell.innerHTML = 
    `
    
    <button  id="druginfo${_index}" style="text-align: left;  display:block; width:100%; height:100%; border:none; background-color:transparent;" onclick="document.getElementById('myModal${_index}').style.display='block'">
    點選輸入藥品驗收資訊
    <canvas id="${barcode_text}" style="float: right; width:140px; padding-right:10px;"></canvas>
    </button>

    <div id="myModal${_index}" class="modal">
    <div class="modal-content">
    <button class="modalbtn" id="addRowBtn${_index}" onclick="addNewRow${_index}()">新增驗收藥品</button>


    
      <div><b>${item.OD_SN_L}</b></div>
      <div><b>批號</b>:<input id="lot${_index}" type="text" class="form-control" value="" placeholder="請輸入批號" oninput="this.value = this.value.toUpperCase()" onfocus="clearInput(this)" onblur=\'checkInput(this , "${GUID}")\' onkeydown=\'checkEnterKey(event, "${GUID}")\'></div>
      <div style="display: flex; flex-direction: column;">
        <div><b>效期</b>:</div>
        <div>
          <input id="date${_index}" type="date" class="form-control" value="" placeholder="請選擇效期" onfocus="clearInput(this)" onblur=\'checkInput(this , "${GUID}")\' onkeydown=\'checkEnterKey(event, "${GUID}")\'>
        </div>
        <div><b>數量</b>: <input id="qty${_index}" type="number" min="0" max="9999" class="form-control" value="" placeholder="請輸入數量" inputmode="numeric" onfocus="clearInput(this)" onblur=\'checkInput(this , "${GUID}")\' onkeydown=\'checkEnterKey(event, "${GUID}")\'></div>
      </div>
      <div id="rows${_index}"></div>
      <button class="modalbtn" onclick="validateInput${_index}()">確認</button>
      
      <script>
      if (document.querySelector('myModal${_index}')) {
      function validateInput${_index}() {
        var lotInputs = document.querySelectorAll("#lot${_index}");
        var dateInputs = document.querySelectorAll("#date${_index}");
        var qtyInputs = document.querySelectorAll("#qty${_index}");
        
        var allInputsValid = true;
        
        // loop through each input and validate
        for (let i = 0; i < lotInputs.length; i++) {
          const lot = lotInputs[i].value;
          const date = dateInputs[i].value;
          const qty = qtyInputs[i].value;
      
          if (!lot.trim() && !date.trim() && !qty.trim() ) {
            // 如果全部輸入欄位都是空白的，關閉彈跳視窗
            document.getElementById('myModal${_index}').style.display='none';
          } else if (!lot.trim() || !date.trim() || !qty.trim() ) {
            // 如果有任何一格未填，跳出警示提醒
            alert("請填寫完整驗收資訊！");
            allInputsValid = false;
            break;
          }
        }
        
        if (allInputsValid) {
          // 如果全部都填寫了，關閉彈跳視窗
          document.getElementById('myModal${_index}').style.display='none';
        }
      }
      
      //新增批效
                  let rowNum = 1;
                  
                  function addNewRow${_index}$${_index}) {
                    const lotInputs = document.querySelectorAll("#lot${_index}");
        const dateInputs = document.querySelectorAll("#date${_index}");
        const qtyInputs = document.querySelectorAll("#qty${_index}");
      
          let alertMsg = document.querySelector("#alertMsg"); // 建立一個新的 HTML 元素
      
      // loop through each input and validate
      for (let i = 0; i < lotInputs.length; i++) {
          const lot = lotInputs[i].value;
          const date = dateInputs[i].value;
          const qty = qtyInputs[i].value;
      
          if (!lot.trim() || !date.trim() || !qty.trim() ) {
          if (alertMsg) {
            alertMsg.remove(); // 如果已經有警示訊息存在，先移除它
          }
          alertMsg = document.createElement("div"); // 建立一個新的 HTML 元素
          alertMsg.id = "alertMsg";
          alertMsg.style.color = "red"; // 設定警示訊息的文字顏色
          alertMsg.style.fontWeight = "bold"; // 設定警示訊息的文字粗體
          alertMsg.style.textAlign = "center"; // 設定警示訊息的文字水平置中
          alertMsg.innerText = "請填寫完整驗收資訊再新增驗收藥品！"; // 設定警示訊息的文字內容
          const addRowBtn = document.querySelector("#addRowBtn${_index}"); // 取得新增按鈕元素
          addRowBtn.insertAdjacentElement("afterend", alertMsg); // 將警示訊息插入到按鈕下方
          return;
        }}
        if (alertMsg) {
          alertMsg.remove(); // 如果已經有警示訊息存在，移除它
        }
      
                    const rows = document.getElementById("rows${_index}");
                    
                    // create divs
                    const div1 = document.createElement("div");
                    const div2 = document.createElement("div");
                    const div3 = document.createElement("div");
                    
                    // create inputs
                    const lotInput = document.createElement("input");
                    const expInput = document.createElement("input");
                    const qtyInput = document.createElement("input");
                    const delBtn = document.createElement("button")
                    
                    // set input attributes
                    div1.style.display = "flex";
                    div1.style.flexDirection = "row";
                    div1.style.justifyContent = "space-between";
                    div1.style.alignItems = "center";
                    lotInput.id = "lot${_index}"
                    lotInput.type = "text";
                    lotInput.className = "form-control";
                    lotInput.placeholder = "請輸入批號";
                    expInput.id = "date${_index}"
                    expInput.type = "date";
                    expInput.className = "form-control";
                    expInput.placeholder = "請選擇效期";
                    qtyInput.id = "qty${_index}"
                    qtyInput.type = "number";
                    qtyInput.className = "form-control";
                    qtyInput.placeholder = "請輸入數量";
                    qtyInput.min = "0";
                    qtyInput.max = "9999";
                    qtyInput.inputmode = "numeric";
                    delBtn.innerHTML = "<i class='bi bi-x'></i>";
                    delBtn.style.border = "2px solid #ff0000";
                    delBtn.style.backgroundColor = "#ff0000";
                    delBtn.style.color = "#fff";
                    delBtn.style.cursor = "pointer";
      
      
                    delBtn.addEventListener("click", function () {
                    const divs = document.querySelectorAll("#rows${_index} > div");
                    const div1 = divs[divs.length - 3];
                    const div2 = divs[divs.length - 2];
                    const div3 = divs[divs.length - 1];
                    div1.remove();
                    div2.remove();
                    div3.remove();
                    rowNum--;
                    updateRowNum();
                    });
      
                    // create text nodes
                    const orderText = document.createTextNode("<div style=  flex-direction: row;> <b>驗收單號:${item.OD_SN_L} <n> (新增批效: " + rowNum + ")</b> </div> ");
                    const lotText = document.createTextNode("<b>批號</b>:");
                    const expText = document.createTextNode("<b>效期</b>:");
                    const qtyText = document.createTextNode("<b>數量</b>:");
                    // append text to divs
                    div1.innerHTML = orderText.textContent;  
                    div1.appendChild(delBtn);
                    div2.innerHTML = lotText.textContent;
                    div2.appendChild(lotInput);
                    div2.appendChild(document.createTextNode(" "));
                    div2.innerHTML += expText.textContent;
                    div2.appendChild(expInput);
                    div3.innerHTML = qtyText.textContent;
                    div3.appendChild(qtyInput);
                    // append divs to rows
                    rows.appendChild(div1);
                    rows.appendChild(div2);
                    rows.appendChild(div3);
                    
                    // increment row number
                    rowNum++;
                    
                    // add color style
                    if (rowNum % 2 === 1) {
                      div1.style.backgroundColor = "#ffffff";
                      div2.style.backgroundColor = "#ffffff";
                      div3.style.backgroundColor = "#ffffff";
                    } else {
                      div1.style.backgroundColor = "#c1dcffe3";
                      div2.style.backgroundColor = "#c1dcffe3";
                      div3.style.backgroundColor = "#c1dcffe3";
                    }
                  }}
                </script>
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



function get_all_div(_index , item) 
{
    const main_div = document.querySelector('#main_div');
    main_div.style.width = "100%";
    const all_div = document.createElement("div");
    all_div.className = "all_div";
    all_div.id = `all_div${_index}`;
    all_div.style.display = "flex";
    all_div.style.justifyContent = "center";
    all_div.style.width = "100%";
    all_div.style.height= "200px";
    all_div.style.borderBottom = "2px solid gray";
    all_div.style.flexDirection = "column";
    main_div.appendChild(all_div);
    const drugInfo_theor_actual_div = document.createElement("div");
    drugInfo_theor_actual_div.className = "drugInfo_theor_actual_div";
    drugInfo_theor_actual_div.id = `drugInfo_theor_actual_div${_index}`;
    drugInfo_theor_actual_div.style.display = "flex";
    drugInfo_theor_actual_div.style.width = "100%";
    drugInfo_theor_actual_div.style.height= "80%";
    drugInfo_theor_actual_div.style.flexDirection = "row";
    //藥品資訊
    const drugInfo_div = document.createElement("div");
    drugInfo_div.className = "drugInfo_div";
    drugInfo_div.id = `drugInfo_div${_index}`;
    drugInfo_div.style.display = "flex";
    drugInfo_div.style.flexDirection = "column";
    drugInfo_div.style.justifyContent = "flex-start";
    drugInfo_div.style.width = "68%";
    drugInfo_div.style.height= "100%";
    //盤點單號
    const IC_SN_div = document.createElement("div");
    IC_SN_div.className = "IC_SN_div"; 
    IC_SN_div.id = `IC_SN_div${_index}`;
    IC_SN_div.innerText = `{_IC_SN}_${_index}`;
    IC_SN_div.style.paddingLeft = "5px";
    IC_SN_div.style.display = "flex";
    IC_SN_div.style.justifyContent = "flex-start";
    IC_SN_div.style.alignItems = "center";
    IC_SN_div.style.width = "100%";
    IC_SN_div.style.height= "10%";
    //藥碼
    const code_div = document.createElement("div");
    code_div.className = "code_div"; 
    code_div.id = `code_div${_index}`;
    code_div.innerText = `藥碼：     {_CODE}`;
    code_div.style.fontWeight = "bolder";
    code_div.style.paddingLeft = "5px";
    code_div.style.display = "flex";
    code_div.style.justifyContent = "flex-start";
    code_div.style.alignItems = "center";
    code_div.style.width = "100%";
    code_div.style.height= "10%";
    //料號
    const skdiacode_div = document.createElement("div");
    skdiacode_div.className = "skdiacode_div"; 
    skdiacode_div.id = `skdiacode_div${_index}`;
    skdiacode_div.innerText = `料號：     {_SKDIACODE}`;
    skdiacode_div.style.fontWeight = "bolder";
    skdiacode_div.style.paddingLeft = "5px";
    skdiacode_div.style.display = "flex";
    skdiacode_div.style.justifyContent = "flex-start";
    skdiacode_div.style.alignItems = "center";
    skdiacode_div.style.width = "100%";
    skdiacode_div.style.height= "10%";
    //英文名
    const name_div = document.createElement("div");
    name_div.className = "name_div"; 
    name_div.id = `name_div${_index}`;
    name_div.innerText = `(英)：     {_NAME}`;
    name_div.style.fontWeight = "bolder";
    name_div.style.paddingLeft = "5px";
    name_div.style.color = "orange";
    name_div.style.display = "flex";
    name_div.style.justifyContent = "top";
    name_div.style.width = "100%";
    name_div.style.height= "35%";
    //中文名
    const cht_name_div = document.createElement("div");
    cht_name_div.className = "cht_name_div"; 
    cht_name_div.id = `cht_name_div${_index}`;
    cht_name_div.innerText = `(中)：     {_CHT_NAME}`;
    cht_name_div.style.fontWeight = "bolder";
    cht_name_div.style.paddingLeft = "5px";
    cht_name_div.style.color = "orange";
    cht_name_div.style.display = "flex";
    cht_name_div.style.justifyContent = "top";
    cht_name_div.style.width = "100%";
    cht_name_div.style.height= "35%";
    drugInfo_div.appendChild(IC_SN_div);
    drugInfo_div.appendChild(code_div);
    drugInfo_div.appendChild(skdiacode_div);
    drugInfo_div.appendChild(name_div);
    drugInfo_div.appendChild(cht_name_div);
    //理論與實際值
    const theor_actual_div = document.createElement("div");
    theor_actual_div.className = "theor_actual_div";
    theor_actual_div.id = `theor_actual_div${_index}`;
    theor_actual_div.style.display = "flex";
    theor_actual_div.style.justifyContent = "top";
    theor_actual_div.style.flexDirection = "column";
    theor_actual_div.style.width = "32%";
    theor_actual_div.style.height= "100%";
    //理論值
    const theor_div = document.createElement("div");
    theor_div.className = "theor_div"; 
    theor_div.id = `theor_div${_index}`;
    theor_div.innerText = `理論值：`;
    theor_div.style.fontWeight = "bolder";
    theor_div.style.display = "flex";
    theor_div.style.justifyContent = "flex-start";
    theor_div.style.alignItems = "center";
    theor_div.style.width = "100%";
    theor_div.style.height= "12%";
    const theor_input = document.createElement("input");
    theor_input.className = "theor_input"; 
    theor_input.id = `theor_input${_index}`;
    theor_input.inputMode = "numeric";
    theor_input.innerText = `{_START_QTY}`;
    theor_input.readOnly = true;
    theor_input.style.textAlign = "right";
    theor_input.style.fontWeight = "bolder";
    theor_input.style.display = "flex";
    theor_input.style.justifyContent = "center";
    theor_input.style.alignItems = "center";
    theor_input.style.width = "85%";
    theor_input.style.height= "12%";
    theor_input.style.backgroundColor = "lightgray";
    //實際值
    const actual_div = document.createElement("div");
    actual_div.className = "actual_div"; 
    actual_div.id = `actual_div${_index}`;
    actual_div.innerText = `實際值：`;
    actual_div.style.fontWeight = "bolder";
    actual_div.style.display = "flex";
    actual_div.style.justifyContent = "flex-start";
    actual_div.style.alignItems = "center";
    actual_div.style.width = "100%";
    actual_div.style.height= "12%";
    const actual_input = document.createElement("input");
    actual_input.className = "actual_input"; 
    actual_input.id = `actual_input${_index}`;
    actual_input.inputMode = "numeric";
    actual_input.innerText = `{_END_QTY}`;
    actual_input.readOnly = true;
    actual_input.style.textAlign = "right";
    actual_input.style.fontWeight = "bolder";
    actual_input.style.display = "flex";
    actual_input.style.justifyContent = "center";
    actual_input.style.alignItems = "center";
    actual_input.style.width = "85%";
    actual_input.style.height= "12%";
    theor_actual_div.appendChild(theor_div);
    theor_actual_div.appendChild(theor_input);
    theor_actual_div.appendChild(actual_div);
    theor_actual_div.appendChild(actual_input);
    //輸入按鈕
    const  value_input_btn = document.createElement("button");
    value_input_btn.className = "value_input_btn"; 
    value_input_btn.id = `value_input_btn${_index}`;
    value_input_btn.style.display = "flex";
    value_input_btn.style.width = "100%";
    value_input_btn.style.height= "100%";
    value_input_btn.style.backgroundColor = "#fff";
    //Barcoede條碼
    const barcode_div = document.createElement("div");
    barcode_div.className = "barcode_div"; 
    barcode_div.id = `barcode_div${_index}`;
    barcode_div.style.display = "flex";
    barcode_div.style.width = "100%";
    barcode_div.style.height= "30%";
    barcode_div.style.justifyContent = "center";
    barcode_div.style.alignItems = "center";
    const barcode = document.createElement("canvas");
    barcode.className = "barcode"; 
    barcode.id = `barcode${_index}`;
    barcode.innerText = "885621";
    barcode.style.display = "flex";
    barcode.style.height= "50px";
    barcode.style.width = "140px";
    barcode.style.justifyContent = "center";
    barcode.style.alignItems = "center";
    barcode.style.backgroundColor = "black";
    //提醒點擊
    // const pointleft_svg = Get_pointleft_SVG("" ,"", "", "" ,"", "");
    // pointleft_svg.id = "pointleft_svg";
    // pointleft_svg.className = "pointleft_svg";
    // pointleft_svg.style.width = "30%";
    // pointleft_svg.style.height = "100%";
    const remind = document.createElement("div");
    remind.className = "remind"; 
    remind.id = `remind${_index}`;
    remind.innerText = `<<<<請點擊輸入`;
    remind.style.fontWeight = "bolder";
    remind.style.display = "flex";
    remind.style.flexDirection = "row-reverse";
    remind.style.justifyContent = "center";
    remind.style.alignItems = "center";
    remind.style.width = "100%";
    remind.style.height= "12%";


    all_div.appendChild(value_input_btn);
    value_input_btn.appendChild(drugInfo_div);
    value_input_btn.appendChild(theor_actual_div);
    theor_actual_div.appendChild(barcode_div);
    barcode_div.appendChild(barcode);
    theor_actual_div.appendChild(remind);
    // remind.appendChild(pointleft_svg);

    return all_div;
}

// let response = [];
// let data = [];

// window.onload = load;
// async function load()
// {
//     var IC_SN = sessionStorage.getItem('IC_SN');    
//     data = await creat_get_by_IC_SN(IC_SN);
//     console.log(data);
//     insertDataIntoTable();
// }


// async function insertDataIntoTable() {
//   // response = await fetch(inspection_get_url); // 替換成您的 API 網址
//   // data = await response.json();
//   // console.log(data);
//   const table = document.querySelector('table');
//   const tbody = document.createElement('tbody'); // 新增 tbody 元素
//   table.appendChild(tbody); // 加入 table 元素中
//   var _index = 0;

//   for (const item of data.Data[0].Contents) {
//     // 插入新的表格列
//     var GUID = item.GUID;
//     const row = tbody.insertRow(); // 改為插入 tbody 元素的內容

//     // 插入藥品資訊儲存格
//     const drugInfoCell = row.insertCell();
//     drugInfoCell.innerHTML =
//      `
//         <div><b style="font-size: 12px; padding-right:5px; padding-left:5px; border-style:dashed; margin-top: -6px;">${_index + 1}</b><span style="padding-left: 10px;">${item.IC_SN}</span></div>
//         <div style="display:none;"><b>GUID: ${item.GUID}</b></div>
//         <div><b>藥碼: ${item.CODE}</b></div>
//         <div><b>料號: ${item.SKDIACODE}</b></div>
//         <div style="color: orange;"><b>(英)  ${item.NAME}</b></div>
//         <div style="color: orange;"><b>(中)  ${item.CHT_NAME}</b></div>
//     `;

//     // 插入數量儲存格
//     var _quantityCell_QTY = `quantityCell_QTY${_index}`;
//     const quantityCell = row.insertCell();
//     quantityCell.id = _quantityCell_QTY;
//     quantityCell.className = 'quantityCell_QTY';
//     quantityCell.innerHTML = 
//     `
//     <BR>
//     <div class="input-group">
//     <div class="input-group-prepend">
//       <div>理論值:</div>
//     </div>
//     <BR>
//     <BR>
//     <input type="text" class="form-control text-right" value="${item.START_QTY}" readonly>
//     <div class="input-group">
//       <div class="input-group-prepend">
//         <div>盤點量:</div>
//       </div>
//       <input id="END_QTY${_index}" type="number" min="0" max="99999" class="form-control" value="${item.END_QTY}" readonly  onblur='checkInput(this , "${GUID}")' onkeydown='checkEnterKey(event, "${GUID}")'>
//       </div>
//       </div>
//     `;

//     // 插入新的表格列
//     var _myModal = `myModal${_index}`;
//     var barcode_text = `barcode${_index}`;
//     //取得初始化第一個效期批號數量
//     var lot_init = "";
//     var date_init = "";
//     var qty_init = "";
//     if (item.Sub_content.length > 0) {
//       lot_init = item.Lot_date_datas[0].LOT_NUMBER;
//       date_init = item.Lot_date_datas[0].VAL_DATE;
//       qty_init = item.Lot_date_datas[0].QTY;
//     }
//     const inspectionRow = tbody.insertRow();
//     const inspectionCell = inspectionRow.insertCell();
//     inspectionCell.colSpan = 2;
//     inspectionCell.id = `firstinventory${_index}`;
//     inspectionCell.className = "firstinventory";
//     inspectionCell.innerHTML =
//       ` 
//     <button  id="druginfo${_index}" style="text-align: left;  display:block; width:100%; height:100%; border:none; background-color:transparent;" onclick="document.getElementById('myModal${_index}').style.display='block'">
//     點選輸入藥品驗收資訊
//     <canvas id="${barcode_text}" style="float: right; width:140px; padding-right:10px;"></canvas>
//     </button>
    
//     <div id="myModal${_index}" class="modal" _index="${item._index}" IC_SN="${item.IC_SN}" START_QTY="${item.START_QTY}" END_QTY="${item.END_QTY}" GUID = "${GUID}">
//     <div class="modal-content">
//       <div class=myModal_title>
//       <b>[${item.IC_SN}]</b>
//       <br>
//       <div><b> 藥名 : ${item.NAME}</b></div>
//       <div><b> 庫存理論值 : ${item.START_QTY}</b></div>
//       </div>
//       <button class="addRowBtn" id="addRowBtn${_index}" onclick="Check_addNewRow('${_index}')">新增盤點藥品</button>  
//     <div class="Modalrows" id="rows${_index}">
//     </div>
//     <button class="modalbtn" onclick="validateInput('${_index}' )">確認</button> 
//     `;
 
//     for (var i = 0; i < item.Sub_content.length; i++) {
//       const lot = item.Lot_date_datas[i].LOT_NUMBER;
//       const date = item.Lot_date_datas[i].VAL_DATE;
//       const qty = item.Lot_date_datas[i].QTY;
//       AddNewRow(_index, lot, date, qty);
//     }
//     var START_QTY = parseInt(item.START_QTY);
//     var END_QTY = parseInt(item.END_QTY);
//     if(START_QTY - END_QTY > 0)
//     {
//       AddNewRow(_index,null,null,(START_QTY - END_QTY));
//     }
    

//     const barcodeDiv = document.getElementById(barcode_text);
//     JsBarcode(barcodeDiv, item.CODE, {
//       format: "code128",
//       width: 1,
//       height: 12,
//       displayValue: false,
//       margin: 0,

//     });


//     _index++;
//   }

// }

// function clearInput(input) {
//   input.select();
// }
// async function checkEnterKey(event, GUID) {
//   if (event.key === 'Enter') {
//     const input = event.target;
//     input.value = await set_END_QTY(GUID, input.value);

//   }
// }
// function submitForm() {
//   const table = document.querySelector('table');
//   const rows = table.rows;

//   const formData = [];
//   for (let i = 0; i < rows.length; i += 2) {
//     const drugInfoCell = rows[i].querySelector();
//     const quantityCell = rows[i].querySelector();

//     const drugInfo = drugInfoCell.textContent.trim();
//     const actualQuantity = quantityCell.value.trim();

//     formData.push({
//       drugInfo,
//       actualQuantity
//     });
//   }

//   postData(inspection_update_post_url, formData)
//     .then(response => {
//       console.log(response);
//       // 在這裡處理回傳的回應
//     })
//     .catch(error => {
//       console.error(error);
//       // 在這裡處理錯誤
//     });
// }

// async function postData(url, data) {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (!response.ok) {
//     throw new Error('送出資料失敗');
//   }

//   return response.json();
// }
// async function get_jsondata() {
//   const data = await response.json();
//   return data;
// }


// function searchItem(data, searchKey) {
//   return new Promise((resolve, reject) => {
//     const result = data.filter((item) => {
//       return item.CODE == searchKey;
//     });
//     if (result.length > 0) {
//       resolve(result);
//     } else {
//       reject("No result found.");
//     }
//   });
// }
// //insertDataIntoTable();



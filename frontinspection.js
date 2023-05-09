// 單號選擇變色
function toggleButton(button) {
  if (button.classList.contains("selected")) {
    button.classList.remove("selected");
  } else {
    button.classList.add("selected");
  }
}


let response = [];
let data =[];

async function insertDataIntoTable() {
  url = inspection_get_od_Date; 
  response = await fetch(inspection_get_od_Date); // 替換成您的 API 網址
  data = await response.json();
  console.log(data);
  
  // 新增物件來儲存以日期為 key、以 OD_SN_S 為 value 的資料
  let dateData = {};
  for (const item of data.Data) {
    const date = item.MIS_CREATEDTTM;
    if (date in dateData) {
      dateData[date].push(item.OD_SN_S);
    } else {
      dateData[date] = [item.OD_SN_S];
    }
  }
  
  // 迴圈建立表格
  const table = document.querySelector('table');
  const tbody = document.createElement('tbody'); // 新增 tbody 元素
  table.appendChild(tbody); // 加入 table 元素中
  for (const date in dateData) {
    const row = tbody.insertRow(); // 改為插入 tbody 元素的內容
    
    // 插入日期資訊儲存格
    const InspectionDateCell = row.insertCell();
    InspectionDateCell.innerHTML = `
    <td id="InspectionDateCell">
    ${date}
        </td>
    `;
    
    // 插入數量儲存格
    const InspectionNumberCell = row.insertCell();
    InspectionNumberCell.innerHTML = `
      <td id="inspectionnumber">
        <div class="check_div">
          ${dateData[date].map(od_sn_s => `
            <button type="button" class="check-button" onclick="toggleButton(this)">${od_sn_s}</button>
          `).join('')}
        </div>
      </td>
    `;
  }
}





let jsonData = {
  "Data": [
    {
      "OD_SN_S": "1120507002",
      "MIS_CREATEDTTM": "2023/05/07"
    },
    {
      "OD_SN_S": "1120508002",
      "MIS_CREATEDTTM": "2023/05/08"
    },
    {
      "OD_SN_S": "1120508001",
      "MIS_CREATEDTTM": "2023/05/08"
    }
  ],
}
function submitdownload() {
  downloadExcel(inspection_download_excel,jsonData,'驗收入庫');
}

// API帶入資料結尾
insertDataIntoTable();



// 按鈕功能

async function submitinfo() {
  location.href = "inspection.html";
}



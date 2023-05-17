let data = {};

window.addEventListener('load', function(event) 
{
  
});
async function get_creat_data() 
{
  let response = await fetch(inventory_get_creat); // 替換成您的 API 網址
  data = await response.json();
  console.log(data);
  return data;
}

// 單號選擇變色
function toggleButton(button) {
  const confirmResult = confirm("是否前往盤點？");
  if (confirmResult) {
    window.location.href = "inventory.html";
  }
}


async function AddINVbtn_Click() 
{
  const confirmResult = confirm("確定建立盤點單?");
  if (confirmResult) 
  {
    data.Data.splice(0);

    let jsonData = 
    {
      "CREAT_OP": "李偉豪",
    };
    data.Data.push(jsonData);
    console.log(data);
    data = await postDataToAPI(inventory_get_creat , data);
    // API帶入資料結尾
    //insertDataIntoTable();
  }
}
function submitdownload() 
{
  downloadExcel(inspection_download_excel, jsonData, '驗收入庫');
}
async function insertDataIntoTable()
{
  data = await get_creat_data();
  const now = new Date();
  const date = now.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const time = now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 插入日期資訊儲存格
  const table = document.querySelector('table');
  const tbody = document.createElement('tbody'); // 新增 tbody 元素
  table.appendChild(tbody); // 加入 table 元素中
  const row = tbody.insertRow();
  const InspectionDateCell = row.insertCell();
  InspectionDateCell.innerHTML = `
    <p>建表時間</p>
    <p>${date}</p>
  `;

  // 插入盤點單號資訊儲存格
  const InspectionNumberCell = row.insertCell();
  InspectionNumberCell.innerHTML = `
      <div class="check_div">
        ${data.Data.map((item) => `
          <button id="invnum" type="button" class="check-button" onclick="toggleButton(this)">
            ${item.INV_SN_L}(${item.CREAT_OP})
          </button>
        `).join('')}
      </div>
  `;
}

insertDataIntoTable();
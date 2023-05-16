// 單號選擇變色
function toggleButton(button) {
    const confirmResult = confirm("是否前往盤點？");
    if (confirmResult) {
      window.location.href = "inventory.html";
    }
  }


function submitinfo() {
  const confirmResult = confirm("確定建立盤點單?");
  if (confirmResult) {
    let response = [];
    let data = [];

    async function insertDataIntoTable() {
      const url = inspection_get_od_Date;
      response = await fetch(url);
      data = await response.json();
      console.log(data);
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
        <p>起始盤點時間</p>
        <p>${date}</p>
        <p>${time}</p>
      `;

      // 插入盤點單號資訊儲存格
      const InspectionNumberCell = row.insertCell();
      InspectionNumberCell.innerHTML = `
          <div class="check_div">
            ${data.Data.map((item) => `
              <button id="invnum" type="button" class="check-button" onclick="toggleButton(this)">
                ${item.OD_SN_S}(李承勳)
              </button>
            `).join('')}
          </div>
      `;
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
      ]
    };

    function submitdownload() {
      downloadExcel(inspection_download_excel, jsonData, '驗收入庫');
    }

    // API帶入資料結尾
    insertDataIntoTable();
  }
}

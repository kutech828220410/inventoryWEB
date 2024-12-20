window.onload = load;
// window.addEventListener('resize', handleResize);
let base64_img = "";
let medicine_page = [];
let batch_id = "";
let batch_id_return = [];

let test_data = {
  Data: [
    {
      GUID: "41241234123fads",
      batch_id: "20241215142930",
      batch_num: "114241412",
      cht_name: "1040938300AC26萬克適錠60公絲28顆/盒",
      expirydate: "2027.01.22",
      name: "23274814 ARC0XIA 60MG 28'S/BX",
      po_num: "1131024001-10",
      qty: "540",
    },
  ],
  Code: 200,
  Result: "查無對應單號資料",
};

var IsLogged = (function() 
{
  return (sessionData.Name != null && sessionData.Name != "");
})();

function handleResize() 
{
   //Set_popup_find_position();
}
async function load()
{
  check_session_off();
  var serverName = "";
  //   ServerName = serverName;
  ServerType = "網頁";
  TableName = "medicine_page";
  APIServer = await LoadAPIServer();
  console.log(ServerType, TableName, APIServer);
  const API01 = serch_APIServer(serverName,"調劑台","API01");
  const API02 = serch_APIServer(serverName,"調劑台","API02");
  console.log("API01",API01);
  console.log("API02",API02);
  check_ip(API01[0].server,API02[0].server);
  permissions = await GetApipermissions();
  console.log(permissions);

  await page_check_permissions("requisitions_upload");

  let rowNum = 1;
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);
  medicine_page = await get_medicine_cloud();
  medicine_page = medicine_page.Data;
  console.log(medicine_page);

  var loggedID = sessionStorage.getItem('loggedID');  
  var loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  nav_bar_create("requisitions_upload", test_user_data);
  get_header(test_user_data);
  get_main_div();
  Set_main_div_enable(false);
}

function get_header(test_user_data) {
    let body = document.querySelector("body");
    const header = document.createElement("div");
    header.id = "header";
    header.className = "header";

    let header_title_container = document.createElement("div");
    header_title_container.classList = "header_title_container";

    let h_title = document.createElement("div");
    h_title.classList = 'h_title';
    h_title.innerHTML = "單據辨識";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者 : ${test_user_data.name}`

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let header_btn_container = document.createElement("div");
    header_btn_container.classList = "header_btn_container";

    let header_logout_btn = document.createElement("div");
    header_logout_btn.classList.add("header_logout_btn");
    header_logout_btn.classList.add("btn");
    header_logout_btn.innerText = "登出";
    header_logout_btn.addEventListener("click", async () => {
      if (confirm("是否登出？")) {
        sessionStorage.removeItem("login_json");
        sessionStorage.removeItem("IC_SN");

        location.reload();
      }
    })

    header_btn_container.appendChild(header_logout_btn);

    header.appendChild(header_title_container);
    header.appendChild(header_btn_container);
    body.appendChild(header);
}

async function popup_login_finished() {
  console.log(`[${arguments.callee.name}]`);
}

function get_main_div() {
    let body = document.querySelector("body");
    const main_div = document.createElement("div");
    main_div.id = "main_div";
    main_div.className = "main_div";

    body.appendChild(main_div);
}
function Set_main_div_enable(value) 
{
    const main_div = document.querySelector('#main_div');
    if (value) {
      showLoadingPopup();
    }
    else {
      hideLoadingPopup();
    }
}


function set_batch_id() {
  let now = new Date();

  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份補零
  let day = String(now.getDate()).padStart(2, '0');        // 日期補零
  let hour = String(now.getHours()).padStart(2, '0');      // 小時補零（24 小時制）
  let minute = String(now.getMinutes()).padStart(2, '0');  // 分鐘補零
  let second = String(now.getSeconds()).padStart(2, '0');  // 秒數補零

  return `${year}${month}${day}${hour}${minute}${second}`;
}
async function processImage(file) {
  return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              // 設定轉換為 JPG 格式
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              // 以 JPG 格式輸出，並轉換成 Base64
              const base64 = canvas.toDataURL("image/jpeg", 0.8); // 壓縮品質 0.8
              resolve(base64);
          };
      };

      // 如果是 PNG 或 HEIC，讀取後再轉換
      reader.readAsDataURL(file);
  });
}
window.onload = load;
// window.addEventListener('resize', handleResize);
let medicine_page = [];

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

  test_data.forEach(element => {
    set_card(element);
  });
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

    let main_header_btn_container = set_main_header_btn_container();
    let main_display_top_btn_container = set_main_display_btn_container();
    let main_display_bottom_btn_container = set_main_display_btn_container();
    let main_display_card_container = set_main_display_card_container();

    main_div.appendChild(main_header_btn_container);
    main_div.appendChild(main_display_top_btn_container);
    main_div.appendChild(main_display_card_container);
    main_div.appendChild(main_display_bottom_btn_container);

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

function set_main_header_btn_container() {
  let main_header_btn_container = document.createElement("div");
  main_header_btn_container.classList.add("main_header_btn_container");

  let mhb_upload = document.createElement("div");
  mhb_upload.classList.add("mhb_upload");
  mhb_upload.classList.add("btn");
  mhb_upload.innerHTML = '上傳圖片(限100張)';

  let mhb_search_container = document.createElement("div");
  mhb_search_container.classList.add("mhb_search_container");

  let mhb_search_input = document.createElement("input");
  mhb_search_input.classList.add("mhb_search_input");
  mhb_search_input.type = "text";
  mhb_search_input.maxLength = 36;

  let mhb_search_btn = document.createElement("img");
  mhb_search_btn.classList.add("mhb_search_btn");
  mhb_search_btn.src = "../image/icon/search_glass.png";

  let mhb_cancel_btn = document.createElement("img");
  mhb_cancel_btn.classList.add("mhb_cancel_btn");
  mhb_cancel_btn.src = "../image/icon/cancel.png";

  mhb_search_container.appendChild(mhb_search_input);
  mhb_search_container.appendChild(mhb_search_btn);
  mhb_search_container.appendChild(mhb_cancel_btn);

  main_header_btn_container.appendChild(mhb_upload);
  main_header_btn_container.appendChild(mhb_search_container);

  return main_header_btn_container;
}
function set_main_display_btn_container() {
  let main_display_btn_container = document.createElement("div");
  main_display_btn_container.classList.add("main_display_btn_container");

  let mdbc_submit = document.createElement("div");
  mdbc_submit.classList.add("mdbc_submit");
  mdbc_submit.classList.add("btn");
  mdbc_submit.innerHTML = "送出";

  let mdbc_del = document.createElement("div");
  mdbc_del.classList.add("mdbc_del");
  mdbc_del.classList.add("btn");
  mdbc_del.innerHTML = "刪除";

  main_display_btn_container.appendChild(mdbc_submit);
  main_display_btn_container.appendChild(mdbc_del);

  return main_display_btn_container;
}
function set_main_display_card_container() {
  let main_display_card_container = document.createElement("div");
  main_display_card_container.classList.add("main_display_card_container");

  return main_display_card_container;
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
function init_main_display_card_container () {
  let main_display_card_container = document.querySelector(".main_display_card_container");
  main_display_card_container.innerHTML = "";
}
function set_card(data) {
  let main_display_card_container = document.querySelector(".main_display_card_container");

  let card_container = document.createElement("div");
  card_container.classList.add("card_container");

  console.log(data.Data[0].submit);
  if(data.Data[0].submit == "Y") card_container.classList.add("bgc_success");
  if(data.Data[0].submit == "" && data.Code == 200) card_container.classList.add("bgc_yellow");
  if(data.Code != 200) card_container.classList.add("bgc_red");

  let temp_info = data.Data[0];

  let card_left = document.createElement("div");
  card_left.classList.add("card_left");

  let card_left_name_container = document.createElement("div");
  card_left_name_container.classList.add("card_left_name_container");

  let card_left_name = document.createElement("div");
  card_left_name.classList.add("card_left_name");
  card_left_name.innerHTML = `(英) ${temp_info.name}`;

  let card_left_cht_name = document.createElement("div");
  card_left_cht_name.classList.add("card_left_cht_name");
  card_left_cht_name.innerHTML = `(中) ${temp_info.cht_name}`;

  card_left_name_container.appendChild(card_left_name);
  card_left_name_container.appendChild(card_left_cht_name);

  let card_left_info_container = document.createElement("div");
  card_left_info_container.classList.add("card_left_info_container");

  let card_left_po_num_container = document.createElement("div");
  card_left_po_num_container.classList.add("card_left_po_num_container");

  let card_left_po_num_title = document.createElement("div");
  card_left_po_num_title.classList.add("card_left_po_num_title");
  card_left_po_num_title.innerHTML = "單號";

  let card_left_po_num = document.createElement("div");
  card_left_po_num.classList.add("card_left_po_num");
  card_left_po_num.innerHTML = temp_info.po_num;

  card_left_po_num_container.appendChild(card_left_po_num_title);
  card_left_po_num_container.appendChild(card_left_po_num);

  let card_left_batch_num_container = document.createElement("div");
  card_left_batch_num_container.classList.add("card_left_batch_num_container");

  let card_left_batch_num_title = document.createElement("div");
  card_left_batch_num_title.classList.add("card_left_batch_num_title");
  card_left_batch_num_title.innerHTML = "批號";

  let card_left_batch_num = document.createElement("div");
  card_left_batch_num.classList.add("card_left_batch_num");
  card_left_batch_num.innerHTML = temp_info.batch_num;

  card_left_batch_num_container.appendChild(card_left_batch_num_title);
  card_left_batch_num_container.appendChild(card_left_batch_num);

  let card_left_expirydate_container = document.createElement("div");
  card_left_expirydate_container.classList.add("card_left_expirydate_container");

  let card_left_expirydate_title = document.createElement("div");
  card_left_expirydate_title.classList.add("card_left_expirydate_title");
  card_left_expirydate_title.innerHTML = "效期";

  let card_left_expirydate = document.createElement("div");
  card_left_expirydate.classList.add("card_left_expirydate");
  card_left_expirydate.innerHTML = temp_info.expirydate;

  card_left_expirydate_container.appendChild(card_left_expirydate_title);
  card_left_expirydate_container.appendChild(card_left_expirydate);
  
  card_left_info_container.appendChild(card_left_po_num_container);
  card_left_info_container.appendChild(card_left_batch_num_container);
  card_left_info_container.appendChild(card_left_expirydate_container);

  card_left.appendChild(card_left_name_container);
  card_left.appendChild(card_left_info_container);

  card_container.appendChild(card_left);

  main_display_card_container.appendChild(card_container);
}
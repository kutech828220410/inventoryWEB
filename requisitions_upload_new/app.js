window.onload = load;
// window.addEventListener('resize', handleResize);
let base64_img = "";
let medicine_page = [];

function handleResize() 
{
   //Set_popup_find_position();
}
async function load()
{
  if(!isMobileOrTablet()) {
    alert("請使用行動裝置");
    window.location.href = "../../frontpage";
  }
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

    header.appendChild(header_title_container);
    header.appendChild(header_btn_container);
    body.appendChild(header);
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

function set_upload_btn() {
  let upload_btn = document.createElement("div");
  upload_btn.classList.add("upload_btn");
  upload_btn.classList.add("unable_btn");
  upload_btn.classList.add("btn");
  upload_btn.innerHTML = "上傳";

  upload_btn.addEventListener("click", async e => {
    if(e.target.classList.contains("unable_btn")) {
      alert("請先將單據拍照後進行確認");
      return;
    } else {
      let loggedID = sessionStorage.getItem('loggedID');
      let loggedName = sessionStorage.getItem('loggedName');
      
      if(!loggedID) {
        alert("未登入使用者，請先登入後再進行操作");
        return;
      }

      let post_data = {
        Data: [
          {
            op_id: loggedID,
            op_name: loggedName,
            base64: base64_img
          }
        ]
      };

      console.log(post_data);
      let responce = await upload_img_to_analysis(post_data);
      console.log(responce);

      set_analysis_result(responce);
    }
  });

  return upload_btn;
}

async function set_analysis_func() {
  let loggedID = sessionStorage.getItem('loggedID');
  let loggedName = sessionStorage.getItem('loggedName');
  
  if(!loggedID) {
    alert("未登入使用者，請先登入後再進行操作");
    return;
  }

  let post_data = {
    Data: [
      {
        op_id: loggedID,
        op_name: loggedName,
        base64: base64_img
      }
    ]
  };

  console.log(post_data);
  let responce = await upload_img_to_analysis(post_data);
  console.log(responce);

  await set_analysis_result(responce);
}

async function set_analysis_result(data) {
  let info_data = data.Data[0];
  if(data == undefined || data.Code == -200) {
    alert("Oops！資料發生不可預期的錯誤");
    return;
  }
  if(data.Result == "AI辨識未啟動") {
    alert("請聯絡工程師確認軟體運行狀況");
    return;
  }

  let dateTime = info_data.expirydate;
  let dateOnly = dateTime.split(' ')[0];

  let prc_code_content = document.querySelector("#prc_code_content");
  let prc_name_content = document.querySelector("#prc_name_content");
  let prc_cht_name_content = document.querySelector("#prc_cht_name_content");
  let prc_deadtime_input = document.querySelector("#prc_deadtime_input");
  let prc_qty_input = document.querySelector("#prc_qty_input");
  let prc_batch_num_input = document.querySelector("#prc_batch_num_input");
  let prc_list_num_input = document.querySelector("#prc_list_num_input");
  let prc_cancel_btn = document.querySelector(".prc_cancel_btn");
  let prc_double_confirm_btn = document.querySelector(".prc_double_confirm_btn");
  
  let pcc_code_input = document.querySelector("#pcc_code_input");
  let pcc_name_content = document.querySelector("#pcc_name_content");
  let pcc_cht_name_content = document.querySelector("#pcc_cht_name_content");
  let pcc_code_compare_confirm_btn = document.querySelector(".pcc_code_compare_confirm_btn");
  let pcc_h_close_btn = document.querySelector(".pcc_h_close_btn");
  
  prc_code_content.innerHTML = info_data.code;
  prc_name_content.innerHTML = info_data.name;
  prc_cht_name_content.innerHTML = info_data.cht_name;
  prc_deadtime_input.value = dateOnly;
  prc_qty_input.value = info_data.qty;
  prc_batch_num_input.value = info_data.batch_num;
  prc_list_num_input.value = info_data.po_num;
  prc_cancel_btn.setAttribute("guid", info_data.GUID);
  prc_double_confirm_btn.setAttribute("guid", info_data.GUID);
  
  pcc_name_content.innerHTML = info_data.name;
  pcc_cht_name_content.innerHTML = info_data.cht_name;
  pcc_code_compare_confirm_btn.setAttribute("guid", info_data.GUID);
  pcc_h_close_btn.setAttribute("guid", info_data.GUID);
  prc_cancel_btn.setAttribute("guid", info_data.GUID);

  popup_result_confirm_div_open();

  if(prc_deadtime_input.value == "") prc_deadtime_input.classList.add("border_red");
  if(prc_qty_input.value == "") prc_qty_input.classList.add("border_red");
  if(prc_batch_num_input.value == "") prc_batch_num_input.classList.add("border_red");
  if(prc_list_num_input.value == "") prc_list_num_input.classList.add("border_red");

  if(info_data.code == "") {
    console.log("開啟code比對輸入");
    popup_code_compare_div_open();
  }
}

// 判斷行動裝置
function isMobileOrTablet() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 檢查常見行動裝置的 User Agent 關鍵字
  const mobileKeywords = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|Windows Phone|Kindle|Silk|Mobile|PlayBook/i;

  // 使用 navigator.userAgentData 判斷行動裝置（部分新版瀏覽器支援）
  const isMobileDevice = navigator.userAgentData?.mobile;

  // 判斷 iPad 的條件，包括 iPad 在桌面模式下的特徵
  const isIPad = /iPad/i.test(userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                 (navigator.platform === 'MacIntel' && screen.width <= 1024);

  // 綜合判斷行動裝置或平板
  const result = mobileKeywords.test(userAgent) || isMobileDevice || isIPad;

  // 加入 console.log 來顯示判斷信息
  console.log("User Agent:", userAgent);
  console.log("Platform:", navigator.platform);
  console.log("Screen Width:", screen.width);
  console.log("是否判定為行動裝置或平板:", result);

  return result;
}
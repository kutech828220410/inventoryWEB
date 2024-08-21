window.onload = load;
// window.addEventListener('resize', handleResize);

function handleResize() {
   //Set_popup_find_position();
}
async function load() {
  check_session_off();
  var serverName = "";
  // ServerName = serverName;
  // ServerType = "網頁";
  // TableName = "medicine_page";
  APIServer = await LoadAPIServer();
  console.log(ServerType, TableName, APIServer);
  const API01 = serch_APIServer(serverName,"調劑台","API01");
  const API02 = serch_APIServer(serverName,"調劑台","API02");
  console.log("API01",API01);
  console.log("API02",API02);
  check_ip(API01[0].server,API02[0].server);
  permissions = await GetApipermissions();
  console.log(permissions);

  let rowNum = 1;
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);

  // medicine_page = await get_medicine_cloud();
  // console.log(medicine_page["Data"]);

  var loggedID = sessionStorage.getItem('loggedID');  
  var loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  nav_bar_create("batch_storage", test_user_data);
  get_header(test_user_data);
  get_main_div();
  await set_main_div();
  await set_main_data_display();

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
    h_title.innerHTML = "批次入庫";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者 : ${test_user_data.name}`

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let header_btn_container = document.createElement("div");
    header_btn_container.classList = "header_btn_container";

    let h_demo_download_btn = document.createElement("div");
    h_demo_download_btn.classList.add("h_demo_download_btn");
    h_demo_download_btn.classList.add("btn");
    h_demo_download_btn.innerHTML = "範例下載";

    header_btn_container.appendChild(h_demo_download_btn);

    let h_search_btn = document.createElement("div");
    h_search_btn.classList.add("h_search_btn");
    h_search_btn.classList.add("btn");
    h_search_btn.innerHTML = "上傳";

    header_btn_container.appendChild(h_search_btn);

    header.appendChild(header_title_container);
    header.appendChild(header_btn_container);
    body.appendChild(header);
}
function get_main_div() {
    let body = document.querySelector("body");
    const main_div = document.createElement("div");
    main_div.id = "main_div";
    main_div.classList = "main_div";

    body.appendChild(main_div);
}
function Set_main_div_enable(value) {
    const main_div = document.querySelector('#main_div');
    if (value) {
      showLoadingPopup();
    }
    else {
      hideLoadingPopup();
    }
}
async function set_main_div() {
  let main_div = document.getElementById("main_div");

  let main_search_container = await set_main_search_container();
  let main_data_display = document.createElement("div");
  main_data_display.classList.add("main_data_display");

  main_div.appendChild(main_search_container);
  main_div.appendChild(main_data_display);
} 
async function set_main_search_container() {
  let main_search_container = document.createElement("div");
  main_search_container.classList.add("main_search_container");

  let search_date_container = document.createElement("div");
  search_date_container.classList.add("search_date_container");

  let today = new Date();
  let formattedDate = today.toISOString().split('T')[0] + 'T00:00';
  let formattedDate2 = today.toISOString().split('T')[0] + 'T23:59';

  let search_start_date_container = document.createElement("div");
  search_start_date_container.classList.add("search_start_date_container");

  let search_start_date_label = document.createElement("label");
  search_start_date_label.classList.add("search_start_date_label");
  search_start_date_label.setAttribute("for", "search_start_date_label");
  search_start_date_label.innerHTML = "起始";

  let search_start_date_input = document.createElement("input");
  search_start_date_input.classList.add("search_start_date_input");
  search_start_date_input.id = "search_start_date_input";
  search_start_date_input.name = "search_start_date_input";
  search_start_date_input.type = "datetime-local";
  search_start_date_input.min = "2000-01-01T00:00";
  search_start_date_input.max = formattedDate;
  search_start_date_input.value = formattedDate;

  search_start_date_container.appendChild(search_start_date_label);
  search_start_date_container.appendChild(search_start_date_input);

  let search_end_date_container = document.createElement("div");
  search_end_date_container.classList.add("search_end_date_container");

  let search_end_date_label = document.createElement("label");
  search_end_date_label.classList.add("search_end_date_label");
  search_end_date_label.setAttribute("for", "search_end_date_label");
  search_end_date_label.innerHTML = "結束";

  let search_end_date_input = document.createElement("input");
  search_end_date_input.classList.add("search_end_date_input");
  search_end_date_input.id = "search_end_date_input";
  search_end_date_input.name = "search_end_date_input";
  search_end_date_input.type = "datetime-local";
  search_end_date_input.min = "2000-01-01T00:00";
  search_end_date_input.max = formattedDate2;
  search_end_date_input.value = formattedDate2;

  search_end_date_container.appendChild(search_end_date_label);
  search_end_date_container.appendChild(search_end_date_input);

  search_date_container.appendChild(search_start_date_container);
  search_date_container.appendChild(search_end_date_container);

  // 調劑台選擇
  phar_table_data = await get_serversetting_by_type();
  phar_table_data = phar_table_data.Data;
  console.log(phar_table_data);

  let search_select_table = document.createElement("select");
  search_select_table.classList.add("search_select_table");
  search_select_table.innerHTML += `<option value="none">請選擇調劑台</option>`;
  phar_table_data.forEach(element => {
    search_select_table.innerHTML += `<option value="${element.name}">${element.name}</option>`;
  });

  let search_input_container = document.createElement("div");
  search_input_container.classList.add("search_input_container");

  let search_input_type_select = document.createElement("select");
  search_input_type_select.classList.add("search_input_type_select");
  input_select_option.forEach(element => {
    search_input_type_select.innerHTML += `<option value="${element.value}">${element.name}</option>`
  });

  let search_input = document.createElement("input");
  search_input.classList.add("search_input");
  search_input.id = "search_input";
  search_input.name = "search_input";
  search_input.type = "text";
  search_input.minLength = 0;
  search_input.maxLength = 40;
  search_input.disabled = true;

  search_input_container.appendChild(search_input_type_select);
  search_input_container.appendChild(search_input);

  let main_search_btn = document.createElement("div");
  main_search_btn.classList.add("main_search_btn");
  main_search_btn.classList.add("btn");
  main_search_btn.innerHTML = "查詢";

  let search_condition_container = document.createElement("div");
  search_condition_container.classList.add("search_condition_container");

  search_condition_container.appendChild(search_date_container);
  search_condition_container.appendChild(search_select_table);
  search_condition_container.appendChild(search_input_container);

  main_search_container.appendChild(search_condition_container);
  main_search_container.appendChild(main_search_btn);

  return main_search_container;
}
function main_data_display_init() {
  let main_data_display = document.querySelector(".main_data_display");
  main_data_display.innerHTML = "";
}

async function set_main_data_display() {
  let main_data_display = document.querySelector(".main_data_display");
  main_data_display_init();

  let main_header_container = set_main_header_container();
  let main_batch_list_container = set_main_batch_list_container();

  main_data_display.appendChild(main_header_container);
  main_data_display.appendChild(main_batch_list_container);

}

function set_main_header_container() {
  let main_header_container = document.createElement("div");
  main_header_container.classList.add("main_header_container");

  let mh_select_btn = document.createElement("div");
  mh_select_btn.classList.add("mh_select_btn");
  mh_select_btn.classList.add("btn");
  mh_select_btn.setAttribute("checked_all", "false");
  mh_select_btn.innerHTML = '全選';
  mh_select_btn.addEventListener("click", (e) => {
    let card_checkbox = document.querySelectorAll(".card_checkbox");
    if(e.target.getAttribute("checked_all") == "true") {
      e.target.setAttribute("checked_all", "false");
      e.target.innerHTML = "全選";
      card_checkbox.forEach(element => {
        element.checked = false;
      });
    } else {
      e.target.setAttribute("checked_all", "true");
      e.target.innerHTML = "取消全選";
      card_checkbox.forEach(element => {
        element.checked = true;
      });
    }
  });

  let mh_delete_selected_btn = document.createElement("div");
  mh_delete_selected_btn.classList.add("mh_delete_selected_btn");
  mh_delete_selected_btn.classList.add("btn");
  mh_delete_selected_btn.innerHTML = '已選刪除';

  main_header_container.appendChild(mh_select_btn);
  main_header_container.appendChild(mh_delete_selected_btn);

  return main_header_container;
}
function set_main_batch_list_container() {
  let main_batch_list_container = document.createElement("div");
  main_batch_list_container.classList.add("main_batch_list_container");

  fake_batch_data.forEach(element => {
    let batch_card = document.createElement("div");
    batch_card.classList.add("batch_card");

    let card_checkbox = document.createElement("input");
    card_checkbox.classList.add("card_checkbox");
    card_checkbox.type = "checkbox";
    card_checkbox.id = element.GUID;

    let card_info_container = document.createElement("div");
    card_info_container.classList.add("card_info_container");

    let ci_code = document.createElement("div");
    ci_code.classList.add("ci_code");
    ci_code.innerHTML = `藥碼：${element.CODE}`;

    card_info_container.appendChild(ci_code);

    let ci_name = document.createElement("div");
    ci_name.classList.add("ci_name");
    ci_name.innerHTML = `藥名：${element.NAME}`;

    card_info_container.appendChild(ci_name);

    let ci_qty = document.createElement("div");
    ci_qty.classList.add("ci_qty");
    ci_qty.innerHTML = `數量：${element.QTY}`;

    card_info_container.appendChild(ci_qty);

    let ci_storage = document.createElement("div");
    ci_storage.classList.add("ci_storage");
    ci_storage.innerHTML = `庫別：${element.STORE_NAME}`;

    card_info_container.appendChild(ci_storage);

    let ci_ex = document.createElement("div");
    ci_ex.classList.add("ci_ex");
    ci_ex.innerHTML = `效期：${element.VAL}`;

    card_info_container.appendChild(ci_ex);

    let ci_batch_num = document.createElement("div");
    ci_batch_num.classList.add("ci_batch_num");
    ci_batch_num.innerHTML = `批號：${element.LOT}`;

    card_info_container.appendChild(ci_batch_num);

    let card_delete_btn = document.createElement("div");
    card_delete_btn.classList.add("btn");
    card_delete_btn.classList.add("card_delete_btn");
    card_delete_btn.innerHTML = "刪除";

    batch_card.appendChild(card_checkbox);
    batch_card.appendChild(card_info_container);
    batch_card.appendChild(card_delete_btn);

    main_batch_list_container.appendChild(batch_card);
  });

  return main_batch_list_container;
}

async function serch_CODE_input_enter(barcode) {
    if(barcode == "") return;
    if(medicine_page == undefined) return;
    const response = await serch_by_BarCode(barcode, medicine_page.Data);
    console.log("serch_by_BarCode",response)
    if(medicine_page == undefined) return;
    if(response.Data.length == 0) {
      alert("查無此藥品");
      return;
    }

    return response["Data"][0]["CODE"];
}
async function barcode_keydown_event(e) {
  if(main_fast_search_input.value == "") {
    return;
  }
  if (e.keyCode === 13) 
  {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (dd < 10) {
        dd = '0' + dd;
    }

    let code = await serch_CODE_input_enter(main_fast_search_input.value);

    console.log("barcode：" + main_fast_search_input.value);
    console.log("Barcode search result：" + code);

    if(code == undefined) return;

    temp_search_condition.date = `${yyyy}-${mm}-${dd}`;
    temp_search_condition.req_unit = "all";
    temp_search_condition.type = "code";
    temp_search_condition.content = code;

    main_fast_search_input.value = "";

    console.log(temp_search_condition);
    set_list_result_and_filter();
  }
}
async function get_serversetting_by_type() {
  let temp_data = await fetch(`${api_ip}api/ServerSetting/get_serversetting_by_type`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          Data: 
          {
              
          },
          ValueAry : 
          [
              "調劑台"
          ]
      }),
  })
  .then((response) => {
      return response.json();
  })

  return temp_data;
}
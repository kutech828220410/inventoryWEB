let current_pagination = 1;
let pagination_num = 50;
let med_order_list_form_data;
window.onload = load;
// window.addEventListener('resize', handleResize);

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

  let rowNum = 1;
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);
  const currentDate = new Date();
  var date_end = DateTimeAddDays(currentDate, 1);
  var date_start = DateTimeAddDays(currentDate, -30);
  date_start = getDateStr(date_start);
  date_end = getDateStr(date_end);
  data = await serch_by_ST_END(date_start,date_end);

  var loggedID = sessionStorage.getItem('loggedID');  
  var loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  let temp_search_med_data;
  let temp_sort_med_data;

  // get_popup_pharmacy_select();
  // popup_pharmacy_select_div.Set_Visible(true);

  nav_bar_create("med_balance", test_user_data);
  get_header(test_user_data);
  get_select_block_bar_container();
  get_main_div();
  get_search_container();
  get_list_table_container();
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
    h_title.innerHTML = "中藥醫令";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者 : ${test_user_data.name}`

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let header_btn_container = document.createElement("div");
    header_btn_container.classList = "header_btn_container";

    // let block_change_popup_btn = document.createElement("div");
    // block_change_popup_btn.classList.add('btn');
    // block_change_popup_btn.classList.add('block_change_popup_btn');
    // block_change_popup_btn.innerHTML = "選區";
    // block_change_popup_btn.addEventListener("click", () => {
    //   popup_pharmacy_select_div_open();
    // });

    // header_btn_container.appendChild(block_change_popup_btn);

    header.appendChild(header_title_container);
    header.appendChild(header_btn_container);
    body.appendChild(header);
}
function get_select_block_bar_container() {
    let body = document.querySelector("body");

    let cd_main_select_block_container = document.createElement("div");
    cd_main_select_block_container.classList.add("cd_main_select_block_container");
    // cd_main_select_block_container.style.display = "none";

    let cd_main_select_block_title = document.createElement("div");
    cd_main_select_block_title.classList.add('cd_main_select_block_title');
    cd_main_select_block_title.innerHTML = '已選調劑台';

    let cd_main_select_block_content_container = document.createElement("div");
    cd_main_select_block_content_container.classList.add('cd_main_select_block_content_container');

    cd_main_select_block_container.appendChild(cd_main_select_block_title);
    cd_main_select_block_container.appendChild(cd_main_select_block_content_container);

    body.appendChild(cd_main_select_block_container);
}
function get_main_div() {
    let body = document.querySelector("body");
    const main_div = document.createElement("div");
    main_div.id = "main_div";
    main_div.className = "main_div";

    let main_div_search_container = document.createElement("div");
    main_div_search_container.classList.add("main_div_search_container");

    let main_div_table_th_container = document.createElement("div");
    main_div_table_th_container.classList.add("main_div_table_th_container");

    let main_div_table_display_container = document.createElement("div");
    main_div_table_display_container.classList.add("main_div_table_display_container");

    main_div.appendChild(main_div_search_container);
    main_div.appendChild(main_div_table_th_container);
    main_div.appendChild(main_div_table_display_container);

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
function get_search_container() {
  let main_div_search_container = document.querySelector(".main_div_search_container");

  let search_date_container = document.createElement("div");
  search_date_container.classList.add("search_date_container");

  let sd_label = document.createElement("div");
  sd_label.classList = "sd_label";
  sd_label.innerHTML = "開方時間";

  let sd_start_date_container = document.createElement("div");
  sd_start_date_container.classList.add("sd_start_date_container");

  let sd_start_date_label = document.createElement("label");
  sd_start_date_label.classList.add("date_label");
  sd_start_date_label.setAttribute("for", "sd_start_date_input");
  sd_start_date_label.innerHTML = "起始";

  // 获取当前日期
  let currentDate = new Date();

  // 获取上个月的日期
  let previousMonthDate = new Date(currentDate);
  previousMonthDate.setMonth(currentDate.getMonth() - 1);

  // 检查是否跨年
  if (currentDate.getMonth() === 0) {
      previousMonthDate.setFullYear(currentDate.getFullYear() - 1);
      previousMonthDate.setMonth(11);
  }

  // 格式化日期为 YYYY-MM-DDTHH:MM
  let year = previousMonthDate.getFullYear();
  let month = String(previousMonthDate.getMonth() + 1).padStart(2, '0');
  let day = String(previousMonthDate.getDate()).padStart(2, '0');

  let formattedDate = `${year}-${month}-${day}T08:00`;

  year = currentDate.getFullYear();
  month = String(currentDate.getMonth() + 1).padStart(2, '0');
  day = String(currentDate.getDate()).padStart(2, '0');
  let currentDate_value = `${year}-${month}-${day}T08:00`;

  let sd_start_date_input = document.createElement("input");
  sd_start_date_input.id = "sd_start_date_input";
  sd_start_date_input.classList.add("date_input");
  sd_start_date_input.name = "sd_start_date_input";
  sd_start_date_input.type = "datetime-local";
  sd_start_date_input.value = formattedDate;


  sd_start_date_container.appendChild(sd_start_date_label);
  sd_start_date_container.appendChild(sd_start_date_input);

  let sd_end_date_container = document.createElement("div");
  sd_end_date_container.classList.add("sd_end_date_container");

  let sd_end_date_label = document.createElement("label");
  sd_end_date_label.classList.add("date_label");
  sd_end_date_label.setAttribute("for", "sd_end_date_input");
  sd_end_date_label.innerHTML = "結束";

  let sd_end_date_input = document.createElement("input");
  sd_end_date_input.id = "sd_end_date_input";
  sd_end_date_input.classList.add("date_input");
  sd_end_date_input.name = "sd_end_date_input";
  sd_end_date_input.type = "datetime-local";
  sd_end_date_input.value = currentDate_value;

  sd_end_date_container.appendChild(sd_end_date_label);
  sd_end_date_container.appendChild(sd_end_date_input);

  search_date_container.appendChild(sd_label);
  search_date_container.appendChild(sd_start_date_container);
  search_date_container.appendChild(sd_end_date_container);

  let search_input_container = document.createElement("div");
  search_input_container.classList.add("search_input_container");

  let si_label = document.createElement("div");
  si_label.classList = "sd_label";
  si_label.innerHTML = "搜尋條件";

  let si_select = document.createElement("select");
  si_select.id = "si_select";
  si_select.innerHTML = `
    <option value="all">全部</option>
    <option value="med_bag_num">領藥號</option>
    <option value="patcode">病歷號</option>
    <option value="patname">病人姓名</option>
  `;

  let si_input = document.createElement("input");
  si_input.type = "text";
  si_input.disabled = true;
  si_input.id = "si_input";

  si_select.addEventListener("change", () => {
    if(si_select.value != "all") {
      si_input.disabled = false;
    } else {
      si_input.disabled = true;
    }
  })

  search_input_container.appendChild(si_label);
  search_input_container.appendChild(si_select);
  search_input_container.appendChild(si_input);

  let search_condition_container = document.createElement("div");
  search_condition_container.classList.add("search_condition_container");

  let sc_label = document.createElement("div");
  sc_label.classList = "sd_label";
  sc_label.innerHTML = "調劑狀態";

  let sc_uncheckbox_container = document.createElement("div");
  sc_uncheckbox_container.classList.add("sc_checkbox_container");

  let sc_uncheckbox = document.createElement("input");
  sc_uncheckbox.id = "sc_uncheckbox";
  sc_uncheckbox.name = "sc_uncheckbox";
  sc_uncheckbox.type = "checkbox";
  sc_uncheckbox.checked = true;

  let sc_un_label = document.createElement("label");
  sc_un_label.classList.add("sc_label");
  sc_un_label.setAttribute("for", "sc_uncheckbox");
  sc_un_label.innerHTML = "未調劑";

  sc_uncheckbox_container.appendChild(sc_uncheckbox);
  sc_uncheckbox_container.appendChild(sc_un_label);

  let sc_checkbox_container = document.createElement("div");
  sc_checkbox_container.classList.add("sc_checkbox_container");

  let sc_checkbox = document.createElement("input");
  sc_checkbox.id = "sc_checkbox";
  sc_checkbox.name = "sc_checkbox";
  sc_checkbox.type = "checkbox";
  sc_checkbox.checked = true;

  let sc_label_ = document.createElement("label");
  sc_label_.classList.add("sc_label");
  sc_label_.setAttribute("for", "sc_checkbox");
  sc_label_.innerHTML = "已調劑";

  sc_checkbox_container.appendChild(sc_checkbox);
  sc_checkbox_container.appendChild(sc_label_);

  search_condition_container.appendChild(sc_label);
  search_condition_container.appendChild(sc_uncheckbox_container);
  search_condition_container.appendChild(sc_checkbox_container);

  let main_search_btn = document.createElement("div");
  main_search_btn.classList.add("main_search_btn");
  main_search_btn.classList.add("btn");
  main_search_btn.innerHTML = "搜尋";
  main_search_btn.addEventListener("click", async () => {
    get_main_search_result();
  });

  main_div_search_container.appendChild(search_date_container);
  main_div_search_container.appendChild(search_input_container);
  main_div_search_container.appendChild(search_condition_container);
  main_div_search_container.appendChild(main_search_btn);
}

function get_list_table_container() {
  let main_div_table_th_container = document.querySelector(".main_div_table_th_container");
  main_div_table_th_container.innerHTML = "";

  let arr_th = ["","領藥號","姓名","病歷號","性別","年齡","天數","筆數","已調劑","處方時間"]
  arr_th.forEach((element, index) => {
    let th = document.createElement("div");
    th.classList.add(`th_${index}`);
    th.classList.add(`th`);
    th.innerHTML = element;

    main_div_table_th_container.appendChild(th);
  });
}

async function get_main_search_result() {
  let sd_start_date_input = document.getElementById("sd_start_date_input");
  let sd_end_date_input = document.getElementById("sd_end_date_input");
  let si_select = document.getElementById("si_select");
  let si_input = document.getElementById("si_input");
  let sc_uncheckbox = document.getElementById("sc_uncheckbox");
  let sc_checkbox = document.getElementById("sc_checkbox");

  let temp_data =   {
    "Data": {},
    "ValueAry" : [
      sd_start_date_input.value,
      sd_end_date_input.value
    ]
  };
  
  let res_data = await get_orderT_by_rx_time_st_end(temp_data);
  let arr_data = res_data["Data"];

  if(si_select.value == "all") {
    console.log(arr_data);
  }

}
async function set_search_result(arr) {
  
}
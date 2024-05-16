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

  get_popup_pharmacy_select();
  popup_pharmacy_select_div.Set_Visible(true);

  nav_bar_create("med_balance", test_user_data);
  get_header(test_user_data);
  get_select_block_bar_container();
  get_main_div();
  get_search_container();
  get_main_div_table_th_init();
  // get_info_init(test_fake_med_data);
  Set_main_div_enable(false);
//   page_Init();
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
    h_title.innerHTML = "結存量";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者 : ${test_user_data.name}`

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let header_btn_container = document.createElement("div");
    header_btn_container.classList = "header_btn_container";

    let block_change_popup_btn = document.createElement("div");
    block_change_popup_btn.classList.add('btn');
    block_change_popup_btn.classList.add('block_change_popup_btn');
    block_change_popup_btn.innerHTML = "選區";
    block_change_popup_btn.addEventListener("click", () => {
      popup_pharmacy_select_div_open();
    });

    // let search_popup_btn = document.createElement("div");
    // search_popup_btn.classList.add('btn');
    // search_popup_btn.classList.add('search_popup_btn');
    // search_popup_btn.innerHTML = "搜尋";
    // search_popup_btn.addEventListener("click", () => {
    //   popup_search_select_div_open()
    // });

    header_btn_container.appendChild(block_change_popup_btn);

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

  let search_date_range_container = document.createElement("div");
  search_date_range_container.classList.add("search_date_range_container");

  let search_date_label = document.createElement('div');
  search_date_label.classList.add('search_date_label');
  search_date_label.innerHTML = "操作時間";

  let search_start_date = document.createElement("input");
  search_start_date.classList.add("search_start_date");
  search_start_date.type = "date";
  search_start_date.id = 'search_start_date';
  search_start_date.name = "search_start_date";

  let search_date_range_div = document.createElement("div");
  search_date_range_div.classList.add("search_date_range_div");
  search_date_range_div.innerHTML = "~";

  let search_end_date = document.createElement("input");
  search_end_date.classList.add("search_end_date");
  search_end_date.type = "date";
  search_end_date.id = 'search_end_date';
  search_end_date.name = "search_end_date";

    // 預設時間當天
    // 取得當天日期
    let today = new Date();

    // 格式化日期為 YYYY-MM-DD
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // 月份是從0開始的，所以要+1
    let yyyy = today.getFullYear();
  
    // 設定input元素的value為當天日期
    search_start_date.value = yyyy + '-' + mm + '-' + dd;
    search_end_date.value = yyyy + '-' + mm + '-' + dd;

  let search_date_range_btn = document.createElement("div");
  search_date_range_btn.classList.add("btn");
  search_date_range_btn.classList.add('search_date_range_btn');
  search_date_range_btn.innerHTML = '顯示區間';
  search_date_range_btn.addEventListener("click", async () => {
    Set_main_div_enable(true);
    let post_data = get_post_data_for_consumption();
    console.log(post_data);
    let form_data = await get_datas_by_op_time_st_end_consumption(post_data);
    console.log(form_data);
    if (form_data.Code == -200) {
      alert('資料讀取失敗！');
    } else {
      get_info_init(form_data["Data"]);
    }
    Set_main_div_enable(false);
  });

  search_date_range_container.appendChild(search_date_label);
  search_date_range_container.appendChild(search_start_date);
  search_date_range_container.appendChild(search_date_range_div);
  search_date_range_container.appendChild(search_end_date);
  search_date_range_container.appendChild(search_date_range_btn);

  let download_excel_btn = document.createElement("div");
  download_excel_btn.classList.add("btn");
  download_excel_btn.classList.add('download_excel_btn');
  download_excel_btn.innerHTML = '匯出';
  download_excel_btn.addEventListener('click', () => {
    download_excel_form_func();
  });

  main_div_search_container.appendChild(search_date_range_container);
  main_div_search_container.appendChild(download_excel_btn);
}

function get_main_div_table_th_init() {
  let th_data = ["","藥品碼","藥名","消耗量","庫存量"];
  let main_div_table_th_container = document.querySelector(".main_div_table_th_container");

  th_data.forEach((element, index) => {
    let table_th = document.createElement("p");
    table_th.classList.add(`table_th`);
    table_th.classList.add(`th_${index}`);
    table_th.innerHTML = element;

    main_div_table_th_container.appendChild(table_th);
  });
}
function get_info_init(array) {
  let main_div_table_display_container = document.querySelector(".main_div_table_display_container");
  main_div_table_display_container.innerHTML = '';

  if (array.length == 0) {
    let no_info_data_div = document.createElement("div");
    no_info_data_div.classList.add("no_info_data_div");
    no_info_data_div.innerHTML = "該時間區間沒有任何紀錄！";

    main_div_table_display_container.appendChild(no_info_data_div);
  }

  array.forEach((element, index) => {
    let table_info_container = document.createElement("div");
    table_info_container.classList.add("table_info_container");

    for (let i = 0; i < 5; i++) {
      let td = document.createElement("p");
      td.classList.add("table_td");
      td.classList.add(`th_${i}`);
      if(index%2 != 0) {
        td.classList.add("bgc_gray");
      }
      switch (i) {
        case 0:
          td.innerHTML = index + 1;
          break;
        case 1:
          td.innerHTML = element.CODE;
          break;
        case 2:
          td.innerHTML = element.NAME;
          break;
        case 3:
          td.innerHTML = element.TXN_QTY;
          break;
        case 4:
          td.innerHTML = element.INV_QTY;
          break;
        
        default:
          break;
      }
      
      table_info_container.appendChild(td);
    };
    
    main_div_table_display_container.appendChild(table_info_container);
  });
}
function get_select_block_func(arr) {
  let cd_main_select_block_container = document.querySelector(".cd_main_select_block_container");
  cd_main_select_block_container.style.display = "block";
  let cd_main_select_block_content_container = document.querySelector(".cd_main_select_block_content_container");
  cd_main_select_block_content_container.innerHTML = "";

  arr.forEach(element => {
      let cd_main_block_item_div = document.createElement('div');
      cd_main_block_item_div.classList.add("cd_main_block_item_div");
      cd_main_block_item_div.innerHTML = element.serverName;

      cd_main_select_block_content_container.appendChild(cd_main_block_item_div);
  });
}
function get_post_data_for_consumption() {
  let search_start_date = document.querySelector("#search_start_date");
  let search_end_date = document.querySelector("#search_end_date");

  console.log(temp_selected_arr);
  console.log(search_start_date.value);
  console.log(search_end_date.value);

  let serverNameStr = "";
  let serverTypeStr = "";

  temp_selected_arr.forEach(element => {
      serverNameStr += element.serverName + ",";
      serverTypeStr += element.serverType + ",";
  });

  // Remove the trailing comma
  serverNameStr = serverNameStr.slice(0, -1);
  serverTypeStr = serverTypeStr.slice(0, -1);

  let temp_data = {
    Data: {},
    ValueAry : 
    [
      `${search_start_date.value}`,
      `${search_end_date.value}`,
      `${serverNameStr}`,
      `${serverTypeStr}`
    ]  
  }

  return temp_data
}
async function download_excel_form_func() {
    Set_main_div_enable(true);
    let start_date = document.querySelector("#search_start_date").value;
    let end_date = document.querySelector("#search_end_date").value;
    let serverNameStr = "";
    let serverTypeStr = "";

    temp_selected_arr.forEach(element => {
        serverNameStr += element.serverName + ",";
        serverTypeStr += element.serverType + ",";
    });

    // Remove the trailing comma
    serverNameStr = serverNameStr.slice(0, -1);
    serverTypeStr = serverTypeStr.slice(0, -1);

    // console.log(st_time);
    // console.log(end_time);
    // console.log(serverNameStr);
    // console.log(serverTypeStr);

    let post_data = {
        Data: {},
        ValueAry: [
            `${start_date}`,
            `${end_date}`,
            `${serverNameStr}`,
            `${serverTypeStr}`]
    };

    let form_data = await get_datas_by_op_time_st_end_consumption(post_data);
    if(form_data["Data"].length < 1) {
      alert("該區間沒有紀錄");
      Set_main_div_enable(false);
    } else {
      await download_datas_excel_by_serch(post_data);
      Set_main_div_enable(false);
    }
}
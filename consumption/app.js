let data;
let data_information;

let temp_form_data = [];

window.onload = load;
// window.addEventListener('resize', handleResize);

function handleResize() 
{
   //Set_popup_find_position();
}
async function load()
{
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);
  check_session_off();
  var serverName = "管藥";
//   ServerName = serverName;
  ServerType = "調劑台";
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
  const currentDate = new Date();
  var date_end = DateTimeAddDays(currentDate, 1);
  var date_start = DateTimeAddDays(currentDate, -30);
  date_start = getDateStr(date_start);
  date_end = getDateStr(date_end);
  // data = await serch_by_ST_END(date_start,date_end);
  // console.log("data", data);

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

  nav_bar_create("consumption_report", test_user_data);
  get_header(test_user_data);
  get_select_block_bar_container();
  get_main_div();
  get_main_div_table_th_init();
  // get_info_init(fake_data);
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
    h_title.innerHTML = "交易紀錄";

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


    let search_popup_btn = document.createElement("div");
    search_popup_btn.classList.add('btn');
    search_popup_btn.classList.add('search_popup_btn');
    search_popup_btn.innerHTML = "搜尋";
    search_popup_btn.addEventListener("click", () => {
      popup_search_select_div_open()
    });

    header_btn_container.appendChild(block_change_popup_btn);
    header_btn_container.appendChild(search_popup_btn);

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

    let main_div_time_line_container = document.createElement("div");
    main_div_time_line_container.classList.add("main_div_time_line_container");

    let main_div_table_th_container = document.createElement("div");
    main_div_table_th_container.classList.add("main_div_table_th_container");

    let time_line_type = document.createElement("div");
    time_line_type.classList.add("time_line_type");
    time_line_type.innerHTML = "操作時間";

    let time_line_container = document.createElement("div");
    time_line_container.classList.add("time_line_container");
    time_line_container.innerHTML = `
      <div class="time_line_st"></div>
      <span>～</span>
      <div class="time_line_end"></div>
    `;

    let download_excel_trans_log_btn = document.createElement("div");
    download_excel_trans_log_btn.classList.add("btn");
    download_excel_trans_log_btn.classList.add("download_excel_trans_log_btn");
    download_excel_trans_log_btn.innerHTML = "匯出excel";
    download_excel_trans_log_btn.addEventListener("click", async () => {
      Set_main_div_enable(true);
      let start_date = document.querySelector(".time_line_st").innerHTML;
      let end_date = document.querySelector(".time_line_end").innerHTML;
      if(typeof data_information == "object") {
        await download_datas_excel(data_information, start_date, end_date);
      }
      Set_main_div_enable(false);
    });

    main_div_time_line_container.appendChild(time_line_type);
    main_div_time_line_container.appendChild(time_line_container);
    main_div_time_line_container.appendChild(download_excel_trans_log_btn);

    let main_div_table_display_container = document.createElement("div");
    main_div_table_display_container.classList.add("main_div_table_display_container");

    main_div.appendChild(main_div_time_line_container);
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
function get_main_div_table_th_init() {
  let th_data = ["","動作","診別","藥品碼","藥品名稱","領藥號","庫存量","交易量","結存量","盤點量","操作人","病人姓名","病歷號","病房號","操作時間","開方時間","收支原因",'備註'];
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
  let th_data = ["","動作","診別","藥品碼","藥品名稱","領藥號","庫存量","交易量","結存量","盤點量","操作人","病人姓名","病歷號","病房號","操作時間","開方時間","收支原因",'備註'];

  console.log(array);

  let main_div_table_display_container = document.querySelector(".main_div_table_display_container");
  main_div_table_display_container.innerHTML = '';

  if(array.length != 0) {
    array.forEach((element, index) => {
      let table_info_container = document.createElement("div");
      table_info_container.classList.add("table_info_container");
  
      for (let i = 0; i < th_data.length; i++) {
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
            td.innerHTML = element.ACTION;
            break;
          case 2:
            td.innerHTML = element.MEDKND;
            break;
          case 3:
            td.innerHTML = element.CODE;
            break;
          case 4:
            td.innerHTML = element.NAME;
            break;
          case 5:
            td.innerHTML = element.MED_BAG_NUM;
            break;
          case 6:
            td.innerHTML = element.INV_QTY;
            break;
          case 7:
            td.innerHTML = element.TXN_QTY;
            break;
          case 8:
            td.innerHTML = element.EBQ_QTY;
            break;
          case 9:
            td.innerHTML = element.PHY_QTY;
            break;
          case 10:
            td.innerHTML = element.OP;
            break;
          case 11:
            td.innerHTML = element.PAT;
            break;
          case 12:
            td.innerHTML = element.MRN;
            break;
          case 13:
            td.innerHTML = element.WARD_NAME;
            break;
          case 14:
            td.innerHTML = element.OP_TIME;
            break;
          case 15:
            td.innerHTML = element.RX_TIME;
            break;
          case 16:
            td.innerHTML = element.RSN;
            break;
          case 17:
            td.innerHTML = element.NOTE;
            break;
          
          default:
            break;
        }
        
        table_info_container.appendChild(td);
      };
  
      main_div_table_display_container.appendChild(table_info_container);
    });
  } else {
    main_div_table_display_container.innerHTML = `
      <div class="no_form_list_data">目前無交易紀錄</div>
    `
  }

}

function get_init_post_data() {
  let time_line_st = document.querySelector(".time_line_st");
  let time_line_end = document.querySelector(".time_line_end");
  let time_line_type = document.querySelector(".time_line_type");

  const currentDate = new Date();
  var date_end = DateTimeAddDays(currentDate, 1);
  var date_start = DateTimeAddDays(currentDate, -30);
  date_start = getDateStr(date_start);
  date_end = getDateStr(date_end);

  time_line_st.innerHTML = date_start;
  time_line_end.innerHTML = date_end;
  time_line_type.innerHTML = "操作時間";

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
          `${date_start}`,
          `${date_end}`,
          `${serverNameStr}`,
          `${serverTypeStr}`]
  };

  return post_data
}
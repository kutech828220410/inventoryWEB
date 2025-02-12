let data;
let data_information;
let current_pagination = 1;
let pagination_num = 50;

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
  var serverName = "";
//   ServerName = serverName;
  ServerType = "網頁";
  TableName = "medicine_page";
  APIServer = await LoadAPIServer();
  console.log(APIServer);
  console.log(ServerType, TableName, APIServer);
  const API01 = serch_APIServer(serverName,"調劑台","API01");
  const API02 = serch_APIServer(serverName,"調劑台","API02");
  console.log("API01",API01);
  console.log("API02",API02);
  check_ip(API01[0].server,API02[0].server);
  permissions = await GetApipermissions();
  console.log(permissions);

  await page_check_permissions("consumption_report");

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
    h_title.innerHTML = "西藥交易紀錄";

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
    search_popup_btn.innerHTML = "進階搜尋";
    search_popup_btn.addEventListener("click", () => {
      popup_search_select_div_open()
    });

    let download_excel_trans_log_btn = document.createElement("div");
    download_excel_trans_log_btn.classList.add("btn");
    download_excel_trans_log_btn.classList.add("download_excel_trans_log_btn");
    download_excel_trans_log_btn.innerHTML = "匯出";
    download_excel_trans_log_btn.addEventListener("click", async () => {
      Set_main_div_enable(true);
      let start_date = document.querySelector(".time_line_st").innerHTML;
      let end_date = document.querySelector(".time_line_end").innerHTML;
      if(typeof data_information == "object") {
        await download_datas_excel(data_information, start_date, end_date);
      }
      Set_main_div_enable(false);
    });

    header_btn_container.appendChild(block_change_popup_btn);
    header_btn_container.appendChild(search_popup_btn);
    header_btn_container.appendChild(download_excel_trans_log_btn);

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

    let main_search_container = set_main_search_container();

    let main_div_time_line_container = document.createElement("div");
    main_div_time_line_container.classList.add("main_div_time_line_container");

    let time_line_type = document.createElement("div");
    time_line_type.classList.add("time_line_type");
    time_line_type.innerHTML = "操作時間：";

    let time_line_container = document.createElement("div");
    time_line_container.classList.add("time_line_container");
    time_line_container.innerHTML = `
      <div class="time_line_st"></div>
      <span>～</span>
      <div class="time_line_end"></div>
    `;

    let main_list_num_sum_container = document.createElement("div");
    main_list_num_sum_container.classList.add("main_list_num_sum_container");
    main_list_num_sum_container.innerHTML = `
      <div class="main_list_num_sum_title">交易紀錄總數：</div>
      <div class="main_list_num_sum"></div>
    `;

    main_div_time_line_container.appendChild(time_line_type);
    main_div_time_line_container.appendChild(time_line_container);
    main_div_time_line_container.appendChild(main_list_num_sum_container);

    let main_div_table_th_container = document.createElement("div");
    main_div_table_th_container.classList.add("main_div_table_th_container");

    let main_div_table_display_container = document.createElement("div");
    main_div_table_display_container.classList.add("main_div_table_display_container");

    let pagination_container = document.createElement("div");
    pagination_container.classList.add("pagination_container");

    main_div.appendChild(main_search_container);
    main_div.appendChild(main_div_time_line_container);
    main_div.appendChild(main_div_table_th_container);
    main_div.appendChild(main_div_table_display_container);
    main_div.appendChild(pagination_container);

    body.appendChild(main_div);
}
function set_main_search_container() {
  let main_search_container = document.createElement("div");
  main_search_container.classList.add("main_search_container");

  let main_date_container = document.createElement("div");
  main_date_container.classList.add("main_date_container");

  let md_select = document.createElement("select");
  md_select.id = "md_select";
  md_select.innerHTML = `
    <option value="operate">操作時間</option>
    <option value="prescribe">開方時間</option>
  `;

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} 00:00:00`;
  }
  function formatDateEnd(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} 23:59`;
  }
  let today = new Date();
  let aweekago = new Date();
  aweekago.setDate(today.getDate() - 14);

  let md_start_container = document.createElement("div");
  md_start_container.classList.add("md_start_container");

  let md_start_date_label = document.createElement("label");
  md_start_date_label.innerHTML = "起始";
  md_start_date_label.setAttribute("for", "md_start_date_input");
  md_start_date_label.classList.add("date_label");

  let md_start_date_input = document.createElement("input");
  md_start_date_input.id = "md_start_date_input";
  md_start_date_input.type = "datetime-local";
  md_start_date_input.name = "md_start_date_input";
  md_start_date_input.value = formatDate(aweekago);
  md_start_date_input.min = "0001-01-01T00:00";
  md_start_date_input.max = "9999-12-31T23:59";

  md_start_container.appendChild(md_start_date_label);
  md_start_container.appendChild(md_start_date_input);

  let md_end_container = document.createElement("div");
  md_end_container.classList.add("md_end_container");

  let md_end_date_label = document.createElement("label");
  md_end_date_label.innerHTML = "結束";
  md_end_date_label.setAttribute("for", "md_end_date_input");
  md_end_date_label.classList.add("date_label");

  let md_end_date_input = document.createElement("input");
  md_end_date_input.id = "md_end_date_input";
  md_end_date_input.type = "datetime-local";
  md_end_date_input.name = "md_end_date_input";
  md_end_date_input.value = formatDateEnd(today);

  md_end_container.appendChild(md_end_date_label);
  md_end_container.appendChild(md_end_date_input);

  main_date_container.appendChild(md_select);
  main_date_container.appendChild(md_start_container);
  main_date_container.appendChild(md_end_container);

  let main_condition_container = document.createElement("div");
  main_condition_container.classList.add("main_condition_container");

  let mc_select = document.createElement("select");
  mc_select.id = "mc_select";
  mc_select.innerHTML = `
    <option value="all">全部</option>
    <option value="code">藥碼</option>
    <option value="name">藥名</option>
  `;

  let mc_input = document.createElement("input");
  mc_input.id = "mc_input";
  mc_input.type = "text";
  mc_input.disabled = true;

  mc_select.addEventListener("change", () => {
    if(mc_select.value != "all") {
      mc_input.disabled = false;
    } else {
      mc_input.disabled = true;
      // mc_input.value = "";
    }
    return
  });

  let main_search_btn = document.createElement("div");
  main_search_btn.classList.add("main_search_btn");
  main_search_btn.classList.add("btn");
  main_search_btn.innerHTML = "搜尋";
  main_search_btn.addEventListener("click", async () => {
    await get_main_search_result();
  })

  main_condition_container.appendChild(mc_select);
  main_condition_container.appendChild(mc_input);

  main_search_container.appendChild(main_date_container);
  main_search_container.appendChild(main_condition_container);
  main_search_container.appendChild(main_search_btn);

  return main_search_container;
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
  let th_data = ["","動作","診別","庫別", "藥品碼","藥品名稱","領藥號","庫存量","交易量","結存量","盤點量","操作人","病人姓名","病歷號","病房號","操作時間","開方時間","收支原因",'備註'];
  let main_div_table_th_container = document.querySelector(".main_div_table_th_container");

  th_data.forEach((element, index) => {
    let table_th = document.createElement("p");
    table_th.classList.add(`table_th`);
    table_th.classList.add(`th_${index}`);
    table_th.innerHTML = element;

    main_div_table_th_container.appendChild(table_th);
  });
}
function get_info_init() {
  let th_data = ["","動作","診別","庫別","藥品碼","藥品名稱","領藥號","庫存量","交易量","結存量","盤點量","操作人","病人姓名","病歷號","病房號","操作時間","開方時間","收支原因",'備註'];

  console.log(data_information);

  let main_list_num_sum = document.querySelector(".main_list_num_sum");
  main_list_num_sum.innerHTML = data_information.length;

  let main_div_table_display_container = document.querySelector(".main_div_table_display_container");
  main_div_table_display_container.innerHTML = '';

  if(data_information.length != 0) {
    for (let index = pagination_num * (current_pagination - 1); index < pagination_num * current_pagination; index++) {
      let element = data_information[index];
      if(element == undefined) return;
      let table_info_container = document.createElement("div");
      table_info_container.classList.add("table_info_container");
  
      for (let i = 0; i < th_data.length; i++) {
        let td = document.createElement("p");
        td.classList.add("table_td");
        td.classList.add(`th_${i}`);
        td.classList.add(`td_${i}`);
        if(index % 2 != 0) {
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
            td.innerHTML = element.STOREHOUSE;
            break;
          case 4:
            td.innerHTML = element.CODE;
            break;
          case 5:
            td.innerHTML = element.NAME;
            break;
          case 6:
            td.innerHTML = element.MED_BAG_NUM;
            break;
          case 7:
            td.innerHTML = element.INV_QTY;
            break;
          case 8:
            td.innerHTML = element.TXN_QTY;
            break;
          case 9:
            td.innerHTML = element.EBQ_QTY;
            break;
          case 10:
            td.innerHTML = element.PHY_QTY;
            break;
          case 11:
            td.innerHTML = element.OP;
            break;
          case 12:
            td.innerHTML = element.PAT;
            break;
          case 13:
            td.innerHTML = element.MRN;
            break;
          case 14:
            td.innerHTML = element.WARD_NAME;
            break;
          case 15:
            td.innerHTML = element.OP_TIME;
            break;
          case 16:
            td.innerHTML = element.RX_TIME;
            break;
          case 17:
            td.innerHTML = element.RSN;
            break;
          case 18:
            td.innerHTML = element.NOTE;
            break;
          
          default:
            break;
        }
        
        table_info_container.appendChild(td);
      };
  
      main_div_table_display_container.appendChild(table_info_container);
    }
  } else {
    main_div_table_display_container.innerHTML = `
      <div class="no_form_list_data">目前無交易紀錄</div>
    `;
  }
}
function set_pagination_init() {
  let pagination_container = document.querySelector(".pagination_container");
  pagination_container.innerHTML = "";

  let temp_data_num = data_information.length;
  let temp_pages = temp_data_num / pagination_num;
  temp_pages = Math.ceil(temp_pages);

  let pre_page_btn = document.createElement("img");
  pre_page_btn.classList.add("pre_page_btn");
  pre_page_btn.src = '../image/left-arrow.png';
  if(current_pagination == 1) pre_page_btn.classList.add("disable_page_btn");

  pre_page_btn.addEventListener("click", () => {
    if(current_pagination == 1) {
      return;
    } else {
      current_pagination = current_pagination - 1;
      set_pagination_init();
      get_info_init();
    }
  });

  let next_page_btn = document.createElement("img");
  next_page_btn.classList.add('next_page_btn');
  next_page_btn.src = '../image/left-arrow.png';
  if(current_pagination == temp_pages) next_page_btn.classList.add("disable_page_btn");

  next_page_btn.addEventListener("click", () => {
    if(current_pagination == temp_pages) {
      return;
    } else {
      current_pagination = current_pagination + 1;
      set_pagination_init();
      get_info_init();
    }
  });

  let pagination_pages_container = document.createElement("div");
  pagination_pages_container.classList.add("pagination_pages_container");

  if(temp_pages < 13) {
    for (let i = 1; i <= temp_pages; i++) {
      let pagination_page_container = document.createElement("div");
      pagination_page_container.classList.add("pagination_page");
      pagination_page_container.setAttribute("tab_page", i);
      pagination_page_container.innerHTML = i;

      if(i == current_pagination) {
        pagination_page_container.classList.add("current_pagination_page");
      } else {
        pagination_page_container.addEventListener("click", (e) => {
          let temp_page = +e.target.getAttribute("tab_page");
          current_pagination = temp_page;
          set_pagination_init();
          get_info_init();
        });
      };
      pagination_pages_container.appendChild(pagination_page_container);
    };
  } else {
    if(current_pagination < 7) {
      for (let i = 1; i <= 9; i++) {
        if(i <= 7) {
          // 前七頁
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.setAttribute("tab_page", i);
          pagination_page_container.innerHTML = i;
    
          if(i == current_pagination) {
            pagination_page_container.classList.add("current_pagination_page");
          } else {
            pagination_page_container.addEventListener("click", (e) => {
              let temp_page = +e.target.getAttribute("tab_page");
              current_pagination = temp_page;
              set_pagination_init();
              get_info_init();
            });
          };
          pagination_pages_container.appendChild(pagination_page_container);
        } else if(i == 8) {
          // 中間頁數
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.innerHTML = "...";
          pagination_pages_container.appendChild(pagination_page_container);
        } else {
          // 最後一頁
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.setAttribute("tab_page", temp_pages);
          pagination_page_container.innerHTML = temp_pages;
          pagination_page_container.addEventListener("click", (e) => {
            let temp_page = +e.target.getAttribute("tab_page");
            current_pagination = temp_page;
            set_pagination_init();
            get_info_init();
          });
          pagination_pages_container.appendChild(pagination_page_container);
        }
      }
    } else if (current_pagination > temp_pages - 6) {
      for (let i = 1; i <= 9; i++) {
        if(i == 1) {
          // 第一頁
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.setAttribute("tab_page", i);
          pagination_page_container.innerHTML = i;
    
          pagination_page_container.addEventListener("click", (e) => {
            let temp_page = +e.target.getAttribute("tab_page");
            current_pagination = temp_page;
            set_pagination_init();
            get_info_init();
          });
          pagination_pages_container.appendChild(pagination_page_container);
        } else if(i == 2) {
          // 中間頁數
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.innerHTML = "...";
          pagination_pages_container.appendChild(pagination_page_container);
        } else {
          // 最後一頁
          let temp_num_page = i - 9;
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.setAttribute("tab_page", temp_pages + temp_num_page);
          pagination_page_container.innerHTML = temp_pages + temp_num_page;

          if(temp_pages + temp_num_page == current_pagination) {
            pagination_page_container.classList.add("current_pagination_page");
          } else {
            pagination_page_container.addEventListener("click", (e) => {
              let temp_page = +e.target.getAttribute("tab_page");
              current_pagination = temp_page;
              set_pagination_init();
              get_info_init();
            });
          };
          pagination_pages_container.appendChild(pagination_page_container);
        }
      }
    } else {
      for (let i = 1; i <= 9; i++) {
        if(i == 1) {
          // 第一頁
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.setAttribute("tab_page", i);
          pagination_page_container.innerHTML = i;
          pagination_page_container.addEventListener("click", (e) => {
            let temp_page = +e.target.getAttribute("tab_page");
            current_pagination = temp_page;
            set_pagination_init();
            get_info_init();
          });
          pagination_pages_container.appendChild(pagination_page_container);
        } else if(i == 2 || i == 8) {
          // 中間頁數...
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.innerHTML = "...";
          pagination_pages_container.appendChild(pagination_page_container);
        } else if(i > 2 && i < 8) {
          // 中間頁數
          let temp_num_page = i - 5;
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.setAttribute("tab_page", current_pagination + temp_num_page);
          pagination_page_container.innerHTML = current_pagination + temp_num_page;
    
          if(current_pagination + temp_num_page == current_pagination) {
            pagination_page_container.classList.add("current_pagination_page");
          } else {
            pagination_page_container.addEventListener("click", (e) => {
              let temp_page = +e.target.getAttribute("tab_page");
              current_pagination = temp_page;
              set_pagination_init();
              get_info_init();
            });
          };
          pagination_pages_container.appendChild(pagination_page_container);
        } else {
          let pagination_page_container = document.createElement("div");
          pagination_page_container.classList.add("pagination_page");
          pagination_page_container.setAttribute("tab_page", temp_pages);
          pagination_page_container.innerHTML = temp_pages;
          pagination_page_container.addEventListener("click", (e) => {
            let temp_page = +e.target.getAttribute("tab_page");
            current_pagination = temp_page;
            set_pagination_init();
            get_info_init();
          });
          pagination_pages_container.appendChild(pagination_page_container);
        }
      }
    }
  }

  pagination_container.appendChild(pre_page_btn);
  pagination_container.appendChild(pagination_pages_container);
  pagination_container.appendChild(next_page_btn);
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
async function get_main_search_result() {
  Set_main_div_enable(true);
  let start_p = performance.now();

  // select
  // 藥碼、藥名
  let mc_select = document.querySelector('#mc_select');
  // 操作時間、開方時間
  let md_select = document.querySelector('#md_select');

  // input
  let mc_input = document.querySelector("#mc_input");

  let md_start_date_input = document.querySelector("#md_start_date_input");
  let md_end_date_input = document.querySelector("#md_end_date_input");

  if(!md_start_date_input.value) {
      alert("請選起始時間！！");
      Set_main_div_enable(false);
      return;
  } else if(!md_end_date_input.value) {
      alert("請選結束時間！！");
      Set_main_div_enable(false);
      return;
  }
  
  // 根據操作或開方時間請求資料
  let temp_post_data = get_main_trans_form_post_data();
  let temp_data;
  if (md_select.value == "operate") {
      temp_data = await get_datas_by_op_time_st_end_transactions(temp_post_data);
      console.log(temp_data);
      data_information = temp_data["Data"];
  } else {
      temp_data = await get_datas_by_rx_time_st_end_transactions(temp_post_data);
      // console.log(temp_data);
      data_information = temp_data["Data"];
  }

  if(mc_input.value != "" && mc_select.value != "all") {
      let temp_data = data_information;
      switch (mc_select.value) {
          case "code":
              temp_data = data_information.filter((e) => {
                  return e["CODE"].toUpperCase().includes(mc_input.value.toUpperCase());
              });
              data_information = temp_data;
              break;
          case "name":
              temp_data = data_information.filter((e) => {
                  return e["NAME"].toUpperCase().includes(mc_input.value.toUpperCase());
              });
              data_information = temp_data;
              break;
          default:
              break;
      }
  };

  current_pagination = 1;
  get_info_init();
  set_pagination_init();
  set_ez_main_div_time_line();
  popup_search_select_div_close();
  Set_main_div_enable(false);

  let end_p = performance.now();
  console.log("out：", end_p - start_p);
};
function get_main_trans_form_post_data() {
  let md_start_date_input = document.querySelector("#md_start_date_input");
  let md_end_date_input = document.querySelector("#md_end_date_input");

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

  let temp_start_time = md_start_date_input.value.replace("T", " ");
  let temp_end_time = md_end_date_input.value.replace("T", " ");

  let post_data = {
      Data: {},
      ValueAry: [   
          `${temp_start_time}:00`,
          `${temp_end_time}:00`,
          `${serverNameStr}`,
          `${serverTypeStr}`]
  };

  return post_data;
}
function set_ez_main_div_time_line() {
  console.log("簡易搜尋");
  let md_select = document.querySelector('#md_select');
  let md_start_date_input = document.querySelector("#md_start_date_input");
  let md_end_date_input = document.querySelector("#md_end_date_input");

  let time_line_type = document.querySelector(".time_line_type");
  let time_line_st = document.querySelector(".time_line_st");
  let time_line_end = document.querySelector(".time_line_end");

  if (md_select.value == "operate") {
      time_line_type.innerHTML = "操作時間";
  } else {
      time_line_type.innerHTML = "開方時間";
  }

  let temp_start_time = md_start_date_input.value.replace("T", " ");
  let temp_end_time = md_end_date_input.value.replace("T", " ");

  time_line_st.innerHTML = temp_start_time;
  time_line_end.innerHTML = temp_end_time;
}
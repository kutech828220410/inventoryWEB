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

  var loggedID = sessionStorage.getItem('loggedID');  
  var loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  let temp_search_med_data;
  let temp_sort_med_data;

  nav_bar_create("med_balance", test_user_data);
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
    h_title.innerHTML = "Logger查詢";

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
    let pre_month = new Date();

    // 减去一个月
    pre_month.setMonth(pre_month.getMonth() - 1);

    // 处理跨年份的情况，设置月份后自动调整年份
    let year = pre_month.getFullYear();
    let month = (pre_month.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，需要+1
    let day = pre_month.getDate().toString().padStart(2, '0');

    // 格式化日期為 YYYY-MM-DD
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // 月份是從0開始的，所以要+1
    let yyyy = today.getFullYear();
  
    // 設定input元素的value為當天日期
    search_start_date.value = year + '-' + month + '-' + day;
    search_end_date.value = yyyy + '-' + mm + '-' + dd;

  let search_date_range_btn = document.createElement("div");
  search_date_range_btn.classList.add("btn");
  search_date_range_btn.classList.add('search_date_range_btn');
  search_date_range_btn.innerHTML = '搜尋';
  search_date_range_btn.addEventListener("click", async () => {
    Set_main_div_enable(true);
    let post_data = get_post_data_for_consumption();
    console.log(post_data);
    let form_data = await get_datas_by_op_time_st_end_consumption(post_data);
    console.log(form_data);
    if (form_data.Code == -200) {
      alert('資料讀取失敗');
    } else {
      book_mark = 1;
      med_balance_form_data = form_data["Data"];
      get_info_init();
      table_form_page_init();
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

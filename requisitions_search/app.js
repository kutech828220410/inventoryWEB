window.onload = load;
// window.addEventListener('resize', handleResize);

function handleResize() {
   //Set_popup_find_position();
}
async function load() {
  check_session_off();
  var serverName = "Main";
  // ServerName = serverName;
  // ServerType = "網頁";
  // TableName = "medicine_page";
  APIServer = await LoadAPIServer();
  console.log(ServerType, TableName, APIServer);
  const API01 = serch_APIServer(serverName,"網頁","API01");
  const API02 = serch_APIServer(serverName,"網頁","API02");
  // console.log(temp_url);
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
  console.log(medicine_page["Data"]);

  var loggedID = sessionStorage.getItem('loggedID');  
  var loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  nav_bar_create("batch_storage", test_user_data);
  get_header(test_user_data);
  get_main_div();
  set_main_div();

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
    h_title.innerHTML = "單據查詢";

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
function set_main_div() {
  let main_div = document.getElementById("main_div");

  let main_search_container = set_main_search_container();
  let main_card_display = document.createElement("div");
  main_card_display.classList.add("main_card_display");

  main_div.appendChild(main_search_container);
  main_div.appendChild(main_card_display);
} 
function set_main_search_container() {
  let main_search_container = document.createElement("div");
  main_search_container.classList.add("main_search_container");

  // 創建 DatePicker
  let datePicker = document.createElement('input');
  datePicker.type = 'date';
  datePicker.id = 'ms_date_input';
  datePicker.value = getTodayDate();

  // 創建文字輸入框
  let textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.maxLength = 40;
  textInput.id = 'ms_text_input';
  textInput.placeholder = '請輸入單號查詢...';

  // 創建按鈕
  let ms_submit = document.createElement('div');
  ms_submit.id = 'ms_submit';
  ms_submit.classList.add("btn");
  ms_submit.textContent = '搜尋';

  // 將元素添加到 container
  main_search_container.appendChild(datePicker);
  main_search_container.appendChild(textInput);
  main_search_container.appendChild(ms_submit);

  // 添加按鈕的點擊事件
  ms_submit.addEventListener('click', () => {
      let selectedDate = datePicker.value;
      let inputText = textInput.value;
      alert(`選擇的日期: ${selectedDate}\n輸入的文字: ${inputText}`);
  });

  return main_search_container;
}

function init_main_card_display() {
  let main_card_display = document.querySelector('.main_card_display');
  main_card_display.innerHTML = '';
}

function set_card_display(array) {
  let main_card_display = document.querySelector('.main_card_display');
  init_main_card_display();

  array.forEach(data => {
      let card = create_card(data);
      main_card_display.appendChild(card);
  });
}

function create_card(data) {
  let card_container = document.createElement('div');
  card_container.classList.add('card_container');

  return card_container;
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，需 +1
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
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

  nav_bar_create("med_request", test_user_data);
  get_header(test_user_data);
  get_main_div();
  set_main_diplay();
  set_main_list_display();
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
    h_title.innerHTML = "藥品請領";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者 : ${test_user_data.name}`

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let header_btn_container = document.createElement("div");
    header_btn_container.classList = "header_btn_container";

    let h_search_btn = document.createElement("div");
    h_search_btn.classList.add("h_search_btn");
    h_search_btn.classList.add("btn");
    h_search_btn.innerHTML = "搜尋";
    h_search_btn.onclick = popup_search_select_div_open;

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

function set_main_diplay() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  let main_div = document.getElementById("main_div");

  let main_date_display = document.createElement("div");
  main_date_display.classList.add("main_date_display");
  main_date_display.innerHTML = `日期：${year}-${month}-${day}`;

  let main_list_container = document.createElement("div");
  main_list_container.classList.add("main_list_container");

  main_div.appendChild(main_date_display);
  main_div.appendChild(main_list_container);
}
function main_list_container_init() {
  let main_list_container = document.querySelector(".main_list_container");
  main_list_container.innerHTML = "";
}
function set_main_list_display() {
  main_list_container_init();
  let main_list_container = document.querySelector(".main_list_container");

  fake_data.forEach(element => {
    let med_card = document.createElement("div");
    med_card.classList.add("med_card");

    let med_card_info_container = document.createElement("div");
    med_card_info_container.classList.add("med_card_info_container");

    let mci_code = document.createElement("div");
    mci_code.classList.add("mci_content");
    mci_code.innerHTML = `藥碼：${element.CODE}`;
    
    let mci_name = document.createElement("div");
    mci_name.classList.add("mci_content");
    mci_name.innerHTML = `(英)：${element.NAME}`;

    let mci_cht_name = document.createElement("div");
    mci_cht_name.classList.add("mci_content");
    mci_cht_name.innerHTML = `(中)：${element.CHT_NAME}`;

    let mci_detail = document.createElement("div");
    mci_detail.classList.add("mci_detail");

    let mci_package = document.createElement("div");
    mci_package.classList.add("mci_content");
    mci_package.innerHTML = `單位：${element.PAKAGE}`;

    // 展示請領單位
    let med_card_units_container = document.createElement("div");
    med_card_units_container.classList.add("med_card_units_container");

    let mci_not_qty = document.createElement("div");
    mci_not_qty.classList.add("mci_content");
    let temp_not_qty = 0;

    let mci_total_qty = document.createElement("div");
    mci_total_qty.classList.add("mci_content");
    let temp_total_qty = 0;
    element["RES_UNIT"].forEach(e => {
      let temp_unit_qty_sum = 0;
      // 計算未核發量
      if(e.Sub_Content.length > 0) {
        e.Sub_Content.forEach(item => {
          temp_not_qty += +item.QTY;
          temp_unit_qty_sum += +item.QTY;
        });
      }

      // 計算請領總量
      temp_total_qty += +e.REQ_QTY;

      let unit_div = document.createElement("div");
      unit_div.classList.add("unit_div");
      unit_div.setAttribute("GUID", e.GUID);
      unit_div.setAttribute("Master_GUID", element.GUID);

      unit_div.innerHTML = `${e.U_NAME}&nbsp;&nbsp;${temp_unit_qty_sum} / ${e.REQ_QTY}`;

      if(temp_unit_qty_sum == e.REQ_QTY) {
        unit_div.classList.add("unit_done");
      } else {
        unit_div.addEventListener("click", (e) => {
          console.log(e.target.getAttribute("guid"));
        })
      }

      med_card_units_container.appendChild(unit_div);
    });

    mci_not_qty.innerHTML = `未核發量：${temp_total_qty - temp_not_qty}`;
    mci_total_qty.innerHTML = `請領總量：${temp_total_qty}`;

    mci_detail.appendChild(mci_package);
    mci_detail.appendChild(mci_not_qty);
    mci_detail.appendChild(mci_total_qty);

    med_card_info_container.appendChild(mci_code);
    med_card_info_container.appendChild(mci_name);
    med_card_info_container.appendChild(mci_cht_name);
    med_card_info_container.appendChild(mci_detail);

    let med_card_items_title = document.createElement("div");
    med_card_items_title.classList.add("med_card_items_title");

    let mcit_container = document.createElement("div");
    mcit_container.classList.add("mcit_container");

    let mcit_title = document.createElement("div");
    mcit_title.classList.add("mcit_title");
    mcit_title.innerHTML = "請領單位";

    let mcit_line = document.createElement("div");
    mcit_line.classList.add("mcit_line");

    mcit_container.appendChild(mcit_title);
    mcit_container.appendChild(mcit_line);

    let mcit_notice_container = document.createElement("div");
    mcit_notice_container.classList.add("mcit_notice_container");

    let notice_tip = document.createElement("div");
    notice_tip.classList.add("notice_tip");
    notice_tip.innerHTML = "點擊進行撥發";

    let notice_not_container = document.createElement("div");
    notice_not_container.classList.add("notice_container");

    let notice_not_icon = document.createElement("div");
    notice_not_icon.classList.add("notice_not_icon");
    notice_not_icon.classList.add('notice_icon');

    let notice_not_content = document.createElement("div");
    notice_not_content.classList.add("notice_not_content");
    notice_not_content.innerHTML = "未核發";

    notice_not_container.appendChild(notice_not_icon);
    notice_not_container.appendChild(notice_not_content);

    let notice_fin_container = document.createElement("div");
    notice_fin_container.classList.add("notice_container");

    let notice_fin_icon = document.createElement("div");
    notice_fin_icon.classList.add("notice_fin_icon");
    notice_fin_icon.classList.add('notice_icon');

    let notice_fin_content = document.createElement("div");
    notice_fin_content.classList.add("notice_fin_content");
    notice_fin_content.innerHTML = "已核發";

    notice_fin_container.appendChild(notice_fin_icon);
    notice_fin_container.appendChild(notice_fin_content);

    mcit_notice_container.appendChild(notice_tip);
    mcit_notice_container.appendChild(notice_not_container);
    mcit_notice_container.appendChild(notice_fin_container);

    med_card_items_title.appendChild(mcit_container);
    med_card_items_title.appendChild(mcit_notice_container);
    
    med_card.appendChild(med_card_info_container);
    med_card.appendChild(med_card_items_title);
    med_card.appendChild(med_card_units_container);

    main_list_container.appendChild(med_card);
  });
}

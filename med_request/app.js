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

  await page_check_permissions("med_request");

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

  nav_bar_create("med_request", test_user_data);
  get_header(test_user_data);
  get_main_div();
  set_main_diplay();

  // 畫面預設搜尋結果
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
  temp_search_condition.date = `${yyyy}-${mm}-${dd}`;
  let storage_display_mode = localStorage.getItem("display_mode");
  if(storage_display_mode) {
    set_list_result_and_filter();
  } else {
    localStorage.setItem("display_mode", "code");
    set_list_result_and_filter();
  };
  // window.addEventListener("keydown", barcode_keydown_event);

  await set_select_pharmacy_option();

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
    h_title.innerHTML = "申領核撥";

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

    let h_download_btn = document.createElement("div");
    h_download_btn.classList.add("h_download_btn");
    h_download_btn.classList.add("btn");
    h_download_btn.innerHTML = "下載";
    h_download_btn.addEventListener("click", () => {
      popup_excel_down_div_open();
    });

    header_btn_container.appendChild(h_download_btn);
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
function set_main_diplay() {

  let main_div = document.getElementById("main_div");

  let main_fast_search_input = document.createElement("input");
  main_fast_search_input.classList.add("main_fast_search_input");
  main_fast_search_input.id = "main_fast_search_input";
  main_fast_search_input.maxLength = 30;
  main_fast_search_input.type = "text";
  main_fast_search_input.name = "main_fast_search_input";
  main_fast_search_input.placeholder = "請輸入條碼/藥碼/料號";
  main_fast_search_input.addEventListener("keyup", barcode_keydown_event);

  let main_radio_state_container = set_main_radio_state_container();

  let main_head_container = set_main_head_container();

  let main_list_container = document.createElement("div");
  main_list_container.classList.add("main_list_container");

  main_div.appendChild(main_fast_search_input);
  main_div.appendChild(main_radio_state_container);
  main_div.appendChild(main_head_container);
  main_div.appendChild(main_list_container);
}
function main_list_container_init() {
  let main_list_container = document.querySelector(".main_list_container");
  main_list_container.innerHTML = "";
}
function set_main_radio_state_container() {
  let main_radio_state_container = document.createElement("div");
  main_radio_state_container.classList.add("main_radio_state_container");

  let radio_data = [
    {
      name: "radio_state",
      cht_name: "未核發",
      value: "undo",
      id: "radio_state_undo",
    },
    {
      name: "radio_state",
      cht_name: "已核發",
      value: "do",
      id: "radio_state_do",
    },
    {
      name: "radio_state",
      cht_name: "全部",
      value: "all",
      id: "radio_state_all",
    },
  ];

  radio_data.forEach(element => {
    let radio_input = document.createElement("input");
    radio_input.id = element.id;
    radio_input.name = element.name;
    radio_input.value = element.value;
    radio_input.type = "radio";
    if(element.value == "undo") {
      radio_input.checked = true;
    };
    radio_input.addEventListener("change", () => {
      set_list_result_and_filter();
    })

    let radio_label = document.createElement("label");
    radio_label.classList.add("radio_label");
    radio_label.setAttribute("for", element.id);
    radio_label.innerHTML = element.cht_name;

    main_radio_state_container.appendChild(radio_input);
    main_radio_state_container.appendChild(radio_label);
  });

  return main_radio_state_container;
}
function set_main_head_container() {
  let main_head_container = document.createElement("div");
  main_head_container.classList.add("main_head_container");

  let all_med_res_btn = document.createElement("div");
  all_med_res_btn.classList.add("btn");
  all_med_res_btn.classList.add("all_med_res_btn");
  all_med_res_btn.innerHTML = "全部核撥";
  all_med_res_btn.addEventListener("click",  async () => {
    Set_main_div_enable(true);

    let temp_list;
    
    // 過濾是否過帳
    temp_list = post_result_data.filter(item => item["state"] == "等待過帳");

    if(temp_list.length == 0) {
      alert("無申領單可過帳");
      Set_main_div_enable(false);
      return;
    } else {
      if(confirm(`全部藥品是否核撥？`)) {
        temp_list.forEach(async element => {
          await update_status_posted(element.GUID);
          await set_list_result_and_filter();
        });
      }
    }

    Set_main_div_enable(false);
  });

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  let main_date_display = document.createElement("div");
  main_date_display.classList.add("main_date_display");
  main_date_display.innerHTML = `日期：${year}-${month}-${day}`;

  let main_list_container = document.createElement("div");
  main_list_container.classList.add("main_list_container");

  main_head_container.appendChild(all_med_res_btn);
  main_head_container.appendChild(main_date_display);

  return main_head_container;
}
function swtich_display_mode() {
  let temp_mode = localStorage.getItem("display_mode");

  switch (temp_mode) {
    case "code":
      set_main_list_display();

      break;
    case "table":
      set_main_list_table_display();

      break;
    default:
      break;
  }
}
function set_main_list_display() {
  main_list_container_init();
  let main_list_container = document.querySelector(".main_list_container");

  if(code_mode_data.length < 1) {
    // alert("無申領紀錄");
    return;
  }

  code_mode_data.sort((a, b) => {
    let hasUrgentA = a["RES_UNIT"].some(i => i.actionType === '緊急申領');
    let hasUrgentB = b["RES_UNIT"].some(i => i.actionType === '緊急申領');
  
    if (hasUrgentA && !hasUrgentB) {
      return -1;
    } else if (!hasUrgentA && hasUrgentB) {
      return 1;
    } else {
      return 0;
    }
  });

  code_mode_data.sort((a, b) => {
    let hasUrgentA = a["RES_UNIT"].some(i => i.state === '等待過帳');
    let hasUrgentB = b["RES_UNIT"].some(i => i.state === '等待過帳');
  
    if (hasUrgentA && !hasUrgentB) {
      return -1;
    } else if (!hasUrgentA && hasUrgentB) {
      return 1;
    } else {
      return 0;
    }
  });
  
  console.log(code_mode_data);

  code_mode_data.forEach(element => {

    let med_card = document.createElement("div");
    med_card.classList.add("med_card");

    let med_card_info_container = document.createElement("div");
    med_card_info_container.classList.add("med_card_info_container");

    let mci_code = document.createElement("div");
    mci_code.classList.add("mci_content");
    mci_code.innerHTML = `藥碼：${element.CODE}`;
    
    let mci_name = document.createElement("div");
    mci_name.classList.add("mci_content");
    mci_name.style.fontSize = "32px";
    mci_name.style.fontWeight = "600";
    mci_name.style.marginBottom = "12px";
    mci_name.innerHTML = `(英)：${element.NAME}`;
    
    let mci_cht_name = document.createElement("div");
    mci_cht_name.classList.add("mci_content");
    mci_cht_name.innerHTML = `(中)：${element.CHT_NAME}`;

    let mci_detail = document.createElement("div");
    mci_detail.classList.add("mci_detail");

    let mci_package = document.createElement("div");
    mci_package.classList.add("mci_content");
    mci_package.innerHTML = `單位：${element.packageUnit}`;

    // 展示請領單位
    let med_card_units_container = document.createElement("div");
    med_card_units_container.classList.add("med_card_units_container");

    let mci_not_qty = document.createElement("div");
    mci_not_qty.classList.add("mci_content");
    let temp_not_qty = 0;

    let mci_total_qty = document.createElement("div");
    mci_total_qty.classList.add("mci_content");
    let temp_actualQuantity = 0;
    let temp_do_actualQuantity = 0;
    element["RES_UNIT"].forEach(e => {
      // 計算請領總量
      temp_actualQuantity += +e.actualQuantity;

      let unit_div = document.createElement("div");
      unit_div.classList.add("unit_div");
      unit_div.setAttribute("GUID", e.GUID);

      if(e.actualQuantity == "" || e.actualQuantity == undefined) {
        unit_div.innerHTML = `<div>修改</div><div>${e.requestingUnit}&nbsp;&nbsp;0 / ${e.requestedQuantity}</div>`;
      } else {
        unit_div.innerHTML = `<div>修改</div><div>${e.requestingUnit}&nbsp;&nbsp;${e.actualQuantity} / ${e.requestedQuantity}</div>`;
      }

      if(e.state == "已過帳") {
        unit_div.classList.add("unit_done");
        temp_do_actualQuantity += +e.actualQuantity;
        unit_div.addEventListener("click", async () => {
          let temp_guid = unit_div.getAttribute("guid");
          await set_ppuc_med_info(temp_guid);
          popup_unit_content_div_open();
        });
      } else {
        if(e.actionType == "緊急申領") {
          let urgency_notice = document.createElement("img");
          urgency_notice.classList.add("urgency_notice");
          urgency_notice.src = "../image/notice_mark.png";

          unit_div.appendChild(urgency_notice);
        };

        unit_div.addEventListener("click", async () => {
          // console.log(e.target.getAttribute("guid"));
          let temp_guid = unit_div.getAttribute("guid");
          await set_ppuc_med_info(temp_guid);
          popup_unit_content_div_open();
        });
      }

      med_card_units_container.appendChild(unit_div);
    });

    mci_not_qty.innerHTML = `未核發量：${temp_actualQuantity - temp_do_actualQuantity}`;
    mci_total_qty.innerHTML = `請領總量：${temp_do_actualQuantity}`;

    mci_detail.appendChild(mci_package);
    mci_detail.appendChild(mci_not_qty);
    mci_detail.appendChild(mci_total_qty);

    med_card_info_container.appendChild(mci_name);
    med_card_info_container.appendChild(mci_cht_name);
    med_card_info_container.appendChild(mci_code);
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
    notice_tip.innerHTML = "點擊進行核撥";

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

    let mc_unit_all_btn = document.createElement("div");
    mc_unit_all_btn.classList.add("mc_unit_all_btn");
    mc_unit_all_btn.classList.add("btn");
    mc_unit_all_btn.innerHTML = "核撥";
    mc_unit_all_btn.setAttribute("CODE", element.CODE);
    mc_unit_all_btn.addEventListener("click", async (e) => {
      Set_main_div_enable(true);
      let temp_code = e.target.getAttribute("code");

      let temp_list;
      // 過濾該藥品
      temp_list = post_result_data.filter(item => item["code"].includes(temp_code));
      
      // 過濾是否過帳
      temp_list = temp_list.filter(item => item["state"] == "等待過帳");

      if(temp_list.length == 0) {
        alert("無申領單可過帳");
        Set_main_div_enable(false);
        return;
      } else {
        if(confirm(`"${temp_list[0].name}" 是否全部核撥？`)) {
          temp_list.forEach(async element => {
            await update_status_posted(element.GUID);
            await set_list_result_and_filter();
          });
  
        }
      }

      Set_main_div_enable(false);
    });

    let mcu_light_btn = document.createElement("div");
    mcu_light_btn.classList.add("mcu_light_btn");
    mcu_light_btn.classList.add("btn");
    mcu_light_btn.innerHTML = "儲位查詢";
    mcu_light_btn.setAttribute("CODE", element.CODE);
    mcu_light_btn.addEventListener("click", (e) => {
      Set_main_div_enable(true);
      let code = e.target.getAttribute("CODE");
      set_popup_storage_info(code);
      Set_main_div_enable(false);
    });
    
    med_card_items_title.appendChild(mcit_container);
    med_card_items_title.appendChild(mcit_notice_container);
    med_card_items_title.appendChild(mc_unit_all_btn);
    med_card_items_title.appendChild(mcu_light_btn);
    
    med_card.appendChild(med_card_info_container);
    med_card.appendChild(med_card_items_title);
    med_card.appendChild(med_card_units_container);

    main_list_container.appendChild(med_card);
  });
}
function set_main_list_table_display() {
  main_list_container_init();
  let main_list_container = document.querySelector(".main_list_container");

  if(unit_mode_data.length < 1) {
    alert("無申領紀錄");
    return;
  }

  unit_mode_data.forEach(element => {
    let main_list_card_container = document.createElement("div");
    main_list_card_container.classList.add("main_list_card_container");

    let table_card_items_title = document.createElement("div");
    table_card_items_title.classList.add("table_card_items_title");
    table_card_items_title.classList.add("table_card_items_title");

    let mcit_container = document.createElement("div");
    mcit_container.classList.add("mcit_container");
  
    let mcit_title = document.createElement("div");
    mcit_title.classList.add("mcit_title");
    mcit_title.innerHTML = element.requestingUnit;
  
    let mcit_line = document.createElement("div");
    mcit_line.classList.add("mcit_line");
  
    mcit_container.appendChild(mcit_title);
    mcit_container.appendChild(mcit_line);
  
    let mcit_notice_container = document.createElement("div");
    mcit_notice_container.classList.add("mcit_notice_container");
  
    let notice_tip = document.createElement("div");
    notice_tip.classList.add("notice_tip");
    notice_tip.innerHTML = "點擊進行核撥";
  
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
  
    let mc_unit_all_btn = document.createElement("div");
    mc_unit_all_btn.classList.add("mc_unit_all_btn");
    mc_unit_all_btn.classList.add("btn");
    mc_unit_all_btn.innerHTML = "核撥";
    mc_unit_all_btn.setAttribute("GUID", element.GUID);
    
    table_card_items_title.appendChild(mcit_container);
    table_card_items_title.appendChild(mcit_notice_container);
    table_card_items_title.appendChild(mc_unit_all_btn);

    main_list_card_container.appendChild(table_card_items_title);

    element["Sub_Content"].forEach(item => {
      let table_med_display_container = document.createElement("div");
      table_med_display_container.classList.add("table_med_display_container");
      if(item.STATE) {
        table_med_display_container.classList.add("unit_done");
      }

      let tmd_content = document.createElement("div");
      tmd_content.classList.add("tmd_content");
      tmd_content.innerHTML = `
        <div class="tmd_content_container">
          <span class="tmd_content_title">
            藥碼：
          </span>
          <span class="tmd_content_span">
            ${item.CODE}
          </span>
        </div>
        <div class="tmd_content_container">
          <span class="tmd_content_title">
            單位：
          </span>
          <span class="tmd_content_span">
            ${item.CODE}
          </span>
        </div>
        <div class="tmd_content_container">
          <span class="tmd_content_title">
            包裝量：
          </span>
          <span class="tmd_content_span">
            ${item.CODE}
          </span>
        </div>
      `;

      let tmd_name_div = document.createElement("div");
      tmd_name_div.classList.add("tmd_content");
      tmd_name_div.innerHTML = "(英)：" + item.NAME;

      let tmd_cht_name_div = document.createElement("div");
      tmd_cht_name_div.classList.add("tmd_content");
      tmd_cht_name_div.innerHTML = "(中)：" + item.CHT_NAME;

      let tmd_qty_div = document.createElement("div");
      tmd_qty_div.classList.add("tmd_content");
      tmd_qty_div.innerHTML = `
        <div class="tmd_content_container">
          <span class="tmd_content_title">
            實領量：
          </span>
          <span class="tmd_content_span">
            ${item.CODE}
          </span>
        </div>
        <div class="tmd_content_container">
          <span class="tmd_content_title">
            請領量：
          </span>
          <span class="tmd_content_span">
            ${item.CODE}
          </span>
        </div> 
      `;

      table_med_display_container.appendChild(tmd_content);
      table_med_display_container.appendChild(tmd_name_div);
      table_med_display_container.appendChild(tmd_cht_name_div);
      table_med_display_container.appendChild(tmd_qty_div);

      main_list_card_container.appendChild(table_med_display_container);
    });

    main_list_container.appendChild(main_list_card_container);
  });
}
async function set_list_result_and_filter() {
  // 取得核發狀態
  let radio_input = document.getElementsByName("radio_state");
  let radio_checked_value;
  radio_input.forEach(element => {
    if(element.checked) {
      radio_checked_value = element.value;
    }
  });

  // 取得顯示模式  code  or  unit
  let display_mode = localStorage.getItem("display_mode");
  console.log(radio_checked_value);
  console.log(display_mode);
  let temp_data = [];
  if(display_mode == "code") {
    temp_data = await get_by_requestTime(temp_search_condition.date, temp_search_condition.date);
  } else {
    temp_data = [];
  }

  post_result_data = temp_data.Data;
  // 藥碼、藥名條件
  if(temp_search_condition.content != "") {
    switch (temp_search_condition.type) {
      case "code":
        post_result_data = post_result_data.filter(item => item["code"].includes(temp_search_condition.content));
        break;
      case "name":
        post_result_data = post_result_data.filter(item => item["name"].includes(temp_search_condition.content));
        break;
      case "cht_name":
        post_result_data = post_result_data.filter(item => item["cht_name"].includes(temp_search_condition.content));
        break;
    
      default:
        break;
    }
  }
  
  // 申領單位
  if(temp_search_condition.req_unit != "all") { 
    post_result_data = post_result_data.filter(item => item["requestingUnit"] == temp_search_condition.req_unit);
  }

  // 核發狀態filter
  switch (radio_checked_value) {
    case "undo":
      post_result_data = post_result_data.filter(item => item.state == "等待過帳");
      break;
    case "do":
      post_result_data = post_result_data.filter(item => item.state == "已過帳");
      break;
  
    default:
      break;
  };

  code_mode_data = [];
  unit_mode_data = [];
  console.log(post_result_data);
  let temp_code_data = [];
  let temp_unit_data = [];

  if(display_mode == "code") {

    post_result_data.forEach(element => {

      if(!temp_code_data.includes(element.code)) {
        temp_code_data.push(element.code);

        let temp_object = {};

        temp_object.CODE = element.code;
        temp_object.NAME = element.name;
        temp_object.CHT_NAME = element.cht_name;
        temp_object.packageUnit = element.packageUnit;
        temp_object.packageQuantity = element.packageQuantity;
        temp_object.RES_UNIT = [];
        code_mode_data.push(temp_object);
      }
    });

    code_mode_data.forEach(element => {
      post_result_data.forEach(item => {
        if(element.CODE == item.code) {
          element["RES_UNIT"].push(item);
        }
      });
    });

  } else {
    
  }

  let main_date_display = document.querySelector(".main_date_display");
  main_date_display.innerHTML = `日期：${temp_search_condition.date}`;

  console.log(code_mode_data);

  swtich_display_mode();
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
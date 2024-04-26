let test_fake_med_data = [
  {
    id:"10103",
    name:"李永知",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 1,
    light_color: "225,0,225",
    card_id: 144225115221,
    barcode: 155213
  },
  {
    id:"10103",
    name:"安俞真",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 20,
    light_color: "225,0,225",
    card_id: 144225115221,
    barcode: 155213
  },
  {
    id:"10643",
    name:"張員瑛",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 1,
    light_color: "25,0,225",
    card_id: 144225115221,
    barcode: 155213
  },
  {
    id:"10643",
    name:"張員瑛",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 1,
    light_color: "225,0,25",
    card_id: 144225115221,
    barcode: 155213
  },
  {
    id:"10643",
    name:"張員瑛",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 1,
    light_color: "100,0,235",
    card_id: 144225115221,
    barcode: 155213
  },
  {
    id:"10643",
    name:"張員瑛",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 1,
    light_color: "225,0,225",
    card_id: 144225115221,
    barcode: 155213
  },
  {
    id:"10643",
    name:"張員瑛",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 1,
    light_color: "225,0,225",
    card_id: 144225115221,
    barcode: 155213
  },
  {
    id:"10643",
    name:"張員瑛",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 1,
    light_color: "225,0,225",
    card_id: 144225115221,
    barcode: 155213
  },
  {
    id:"10643",
    name:"張員瑛",
    gender: "女",
    unit: "藥劑科",
    license: "",
    permission_level: 1,
    light_color: "225,0,225",
    card_id: 144225115221,
    barcode: 155213
  },
]

window.onload = load;
// window.addEventListener('resize', handleResize);

function handleResize() 
{
   //Set_popup_find_position();
}
async function load()
{
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
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);

  var loggedID = sessionStorage.getItem('loggedID');  
  var loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  nav_bar_create("staff_management", test_user_data);
  get_header(test_user_data);
  // get_select_block_bar_container();
  get_main_div();
  get_search_container();
  get_main_div_table_th_init();
  get_info_init(test_fake_med_data);
  Set_main_div_enable(false);
  // page_Init();
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
    h_title.innerHTML = "人員管理";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者 : ${test_user_data.name}`

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let header_btn_container = document.createElement("div");
    header_btn_container.classList = "header_btn_container";

    let add_new_staff_popup_btn = document.createElement("div");
    add_new_staff_popup_btn.classList.add('btn');
    add_new_staff_popup_btn.classList.add('add_new_staff_popup_btn');
    add_new_staff_popup_btn.innerHTML = "新增人員資料";
    add_new_staff_popup_btn.addEventListener("click", () => {
      let ppams_header_container = document.querySelector(".ppams_header_container");
      ppams_header_container.innerHTML = "新增人員資料";

      let ppams_btn = document.querySelector(".ppams_btn");
      ppams_btn.innerHTML = "新增";
      popup_add_modify_staff_div_open();
    });

    let permission_management_popup_btn = document.createElement("div");
    permission_management_popup_btn.classList.add('btn');
    permission_management_popup_btn.classList.add('permission_management_popup_btn');
    permission_management_popup_btn.innerHTML = "權限管理";
    permission_management_popup_btn.addEventListener("click", () => {
      popup_staff_level_div_open();
    });

    header_btn_container.appendChild(add_new_staff_popup_btn);
    header_btn_container.appendChild(permission_management_popup_btn);

    header.appendChild(header_title_container);
    header.appendChild(header_btn_container);
    body.appendChild(header);
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
  let select_option_data = [
    {
      name: "ID",
      value: "id"
    },
    {
      name: "姓名",
      value: "name"
    },
  ]
  let main_div_search_container = document.querySelector(".main_div_search_container");

  let search_select = document.createElement("select");
  search_select.classList.add('search_select');
  
  select_option_data.forEach(element => {
    let option_value = document.createElement('option');
    option_value.innerHTML = `${element.name}`;
    option_value.value = `${element.value}`;

    search_select.appendChild(option_value);
  });

  let search_input = document.createElement("input");
  search_input.classList.add("search_input");
  search_input.id = "search_input";

  let search_btn = document.createElement("div");
  search_btn.classList.add("search_btn");
  search_btn.classList.add("btn");
  search_btn.id = "search_btn";
  search_btn.innerHTML = "搜尋";
  search_btn.addEventListener("click", search_result_display);

  let search_all_btn = document.createElement("div");
  search_all_btn.classList.add("search_all_btn");
  search_all_btn.classList.add("btn");
  search_all_btn.id = "search_all_btn";
  search_all_btn.innerHTML = "顯示全部";
  search_all_btn.addEventListener("click", () => {
      get_info_init(test_fake_med_data);
    } 
  );

  main_div_search_container.appendChild(search_select);
  main_div_search_container.appendChild(search_input);
  main_div_search_container.appendChild(search_btn);
  main_div_search_container.appendChild(search_all_btn);
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
  let th_data = ["","id","姓名","性別","單位","藥師證字號","權限等級","顏色","卡號","一維條碼"];
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

  array.forEach((element, index) => {
    let table_info_container = document.createElement("div");
    table_info_container.classList.add("table_info_container");
    table_info_container.addEventListener("click", () => {
      let ppams_header_container = document.querySelector(".ppams_header_container");
      ppams_header_container.innerHTML = "修改人員資料";

      let ppams_btn = document.querySelector(".ppams_btn");
      ppams_btn.innerHTML = "修改";
      popup_add_modify_staff_div_open();
    });

    if(index%2 != 0) {
      table_info_container.classList.add("bgc_gray");
    }

    for (let i = 0; i < 10; i++) {
      let td = document.createElement("p");
      td.classList.add("table_td");
      td.classList.add(`th_${i}`);
      switch (i) {
        case 0:
          td.innerHTML = index + 1;
          break;
        case 1:
          td.innerHTML = element.id;
          break;
        case 2:
          td.innerHTML = element.name;
          break;
        case 3:
          td.innerHTML = element.gender;
          break;
        case 4:
          td.innerHTML = element.unit;
          break;
        case 5:
          td.innerHTML = element.license;
          break;
        case 6:
          td.innerHTML = element.permission_level;
          break;
        case 7:
          // td.innerHTML = element.light_color;
          td.style.backgroundColor = `rgb(${element.light_color})`;
          break;
        case 8:
          td.innerHTML = element.card_id;
          break;
        case 9:
          td.innerHTML = element.barcode;
          break;
        
        default:
          break;
      }
      
      table_info_container.appendChild(td);
    };
    
    main_div_table_display_container.appendChild(table_info_container);
  });
}
function search_result_display() {
  let search_select = document.querySelector(".search_select");
  let search_input = document.querySelector("#search_input");
  
  if(search_input.value == "" || search_input.value === null) {
    alert("請輸入關鍵字");
    return;
  }

  let temp_result_array = [];
  temp_result_array = test_fake_med_data.filter((e) => {
    return e[`${search_select["value"]}`].includes(search_input.value);
  });

  if(temp_result_array.length == 0) {
    alert("查無此人員");
    return;
  } else {
    get_info_init(temp_result_array);
  }
}

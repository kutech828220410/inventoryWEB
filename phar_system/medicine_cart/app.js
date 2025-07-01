window.onload = load;
// window.addEventListener('resize', handleResize);
var IsLogged = (function() 
{
  return (sessionData.Name != null && sessionData.Name != "");
})();
function handleResize() 
{
   //Set_popup_find_position();
}
async function load()
{
  set_popup_notice_div();
  check_session_off();
  var serverName = "";
//   ServerName = serverName;
  ServerType = "網頁";
  TableName = "medicine_page";
  APIServer = await LoadAPIServer();
  console.log(ServerType, TableName, APIServer);
  console.log(serverName,"網頁","API01");
  const API01 = serch_APIServer(serverName,"網頁","API01");
  const API02 = serch_APIServer(serverName,"網頁","API02");
  console.log("API01",API01);
  console.log("API02",API02);
  await check_ip(API01[0].server,API02[0].server);
  // permissions = await GetApipermissions();
  // console.log(permissions);

  await page_check_permissions("medicine_cart");
  med_data = await get_medicine_cloud();
  med_data = med_data.Data;
  console.log("雲端藥品資料", med_data);
  let post_data = {
    ValueAry: ["medicine_cart"]
  }

  let return_data = await get_by_page_name(post_data);
  return_data = return_data.Data;
  return_data.forEach(element => {
    page_setting_params[`${element.name}`] = element;
  });

  console.log(page_setting_params);

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

  // nav_bar_create("medicine_cart", test_user_data);
  get_header(test_user_data);
  get_main_div();
  get_main_ui();
  await get_function_menu();
  get_no_selected_func();
  select_list_controller();
  Set_main_div_enable(false);

  // 開發顯示
  // allocate_display_init();
  // display_revise_func();
  // set_review_display_list();
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
    h_title.innerHTML = "住院調劑";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者：${test_user_data.name}`;

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let light_color_select_div = document.createElement("div");
    light_color_select_div.classList.add("light_color_select_div");
    
    let current_light_color_display = document.createElement("div");
    current_light_color_display.classList.add("current_light_color_display");
    current_light_color_display.style.backgroundColor = `rgb(${color_select.rgb})`;
    current_light_color_display.onclick = open_light_color_list;

    let light_color_select_container = document.createElement("div");
    light_color_select_container.classList.add("light_color_select_container");

    light_color_list.forEach((element, index) => {
      if(index != 5) {
        let light_color_select_item = document.createElement("div");
        light_color_select_item.classList.add("light_color_select_item");
        light_color_select_item.setAttribute("color", `${element.name}`)
        light_color_select_item.style.backgroundColor = `rgb(${light_color_object[element.name]})`;
        light_color_select_item.onclick = (e) => {
          let current_light_color_display = document.querySelector(".current_light_color_display");
          current_light_color_display.style.backgroundColor = `rgb(${light_color_object[e.target.getAttribute("color")]})`;
          light_color_list.forEach(element => {
            if(element.name == e.target.getAttribute("color")) {
              color_select = element;
              console.log("color_select", color_select);
            }
          });
          close_light_color_list();
        };
  
        light_color_select_container.appendChild(light_color_select_item);
      }
    });

    light_color_select_div.appendChild(current_light_color_display);
    light_color_select_div.appendChild(light_color_select_container);

    let header_display_div = document.createElement("div");
    header_display_div.classList.add("header_display_div");

    header_display_div.appendChild(header_title_container);
    header_display_div.appendChild(light_color_select_div);

    let header_btn_div = document.createElement("div");
    header_btn_div.classList.add("header_btn_div");

    let header_pages_setting = document.createElement("div");
    header_pages_setting.classList.add("header_pages_setting");
    header_pages_setting.classList.add("btn");
    header_pages_setting.innerHTML = "設定";
    header_pages_setting.addEventListener("click", () => {
      location.href = "../pages_setting";
    });

    let header_logout_btn = document.createElement("div");
    header_logout_btn.classList.add("header_logout_btn");
    header_logout_btn.classList.add("btn");
    header_logout_btn.innerText = "登出";
    header_logout_btn.addEventListener("click", async () => {
      if (confirm("是否登出？")) {
        sessionStorage.removeItem("login_json");
        sessionStorage.removeItem("IC_SN");

        await light_off_func();

        location.reload();
      }
    })

    header_btn_div.appendChild(header_pages_setting);
    header_btn_div.appendChild(header_logout_btn);

    header.appendChild(header_display_div);
    header.appendChild(header_btn_div);
    body.appendChild(header);
}

function get_main_div() {
    let body = document.querySelector("body");
    const main_div = document.createElement("div");
    main_div.id = "main_div";
    main_div.className = "main_div";

    body.appendChild(main_div);
}
function get_main_ui() {
  let main_div = document.querySelector('.main_div');

  let function_btn_container = document.createElement("div");
  function_btn_container.classList.add("function_btn_container");

  let ppmcl_btn = document.createElement("div");
  ppmcl_btn.classList.add("btn");
  ppmcl_btn.classList.add("ppmcl_btn");
  ppmcl_btn.innerHTML = "未調藥品";
  ppmcl_btn.addEventListener("click", () => {
    popup_med_change_list_div_open();
  });

  let med_cart_sum_list_btn = document.createElement("div");
  med_cart_sum_list_btn.classList.add("btn");
  med_cart_sum_list_btn.classList.add("med_cart_sum_list_btn");
  med_cart_sum_list_btn.innerHTML = "藥品總量";
  med_cart_sum_list_btn.addEventListener("click", async () => {
    if(!current_pharmacy.phar) {
      alert("請先選擇藥局");
      return;
    }
    if(current_func == "" || current_func == "deliver") {
      alert("請選擇調劑 / 覆核");
      return;    
    }
    
    let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
    let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");
    if(current_cart.hnursta && ppml_h_current_cart_select.value != current_cart.hnursta) {
        ppml_h_current_cart_select.value = current_cart.hnursta;
    }
    // if(last_med_list_n == "") {

    //   last_med_list_n = ppml_h_current_cart_select.value;
    // } else {
    //   last_med_list_n = ppml_h_current_cart_select.value;
    // }

    Set_main_div_enable(true);
    clearTimeout(med_list_timer);
    med_list_timer = setTimeout(() => {
      Set_main_div_enable(false);
      alert("連線超時，請重新點選");
      return;
    }, 6000);


    med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, "all");
    if(med_list_data.Code != 200) {
      clearTimeout(med_list_timer);

      alert("藥品總量資料錯誤", med_list_data.Result);
      Set_main_div_enable(false);
    } else {
      if(Array.isArray(med_list_data.Data)) {
        med_list_data = med_list_data.Data;
        med_list_data = sort_med_list_data(med_list_data, current_func);
        med_list_data = sort_display_med_data(med_list_data);
        await set_pp_med_list_display();

        clearTimeout(med_list_timer);
        
        popup_med_list_div_open();
        Set_main_div_enable(false);
      } else {
        console.log("藥品總量，資料格式錯誤", med_list_data.Data);
        med_list_data.Data = [];
        med_list_data = med_list_data.Data;
        med_list_data = sort_med_list_data(med_list_data, current_func);
        med_list_data = sort_display_med_data(med_list_data);
        await set_pp_med_list_display();
        
        clearTimeout(med_list_timer);
        Set_main_div_enable(false);
      }

      // 檢測有無退藥
      Set_main_div_enable(true);
      console.log("============ 檢查退藥中 =============");
      let test_data_arr = await check_cart_dispense();
      if(test_data_arr.length > 0 && test_data_arr.includes(ppml_h_current_cart_select.value)) {
        let post_data = {
          Value: "調劑台",
          ValueAry:  [current_pharmacy.phar, ppml_h_current_cart_select.value]
        };

        console.log("出院處方退藥api",post_data);
        let return_data = await get_patient_discharge(post_data);
        if(return_data.Code != 200) {
          alert("出院處方資料錯誤", return_data.Result);
          Set_main_div_enable(false);
        } else {
          discharged_data = return_data.Data;
          if(discharged_data.length != 0) {
            let any_cpoe = false;
            for (let index = 0; index < discharged_data.length; index++) {
              const element = discharged_data[index];
              
              if(element.cpoe.length > 0) {
                any_cpoe = true;
                break;
              }
            }

            if(any_cpoe) {
              alert("有出院退藥資料，請先處理");
              clearTimeout(med_list_timer);
  
              ppdl_h_current_cart_select.value = ppml_h_current_cart_select.value;
  
              set_discharged_data_display();
              Set_main_div_enable(false);
              popup_med_list_div_close();
              console.log("============ 檢查退藥完成 =============");
              popup_discharged_list_div_open();
            } else {
              Set_main_div_enable(false);
              console.log("============ 檢查退藥完成 =============");
            }
          }
        }        
      } else {
        Set_main_div_enable(false);
        console.log("============ 檢查退藥完成 =============");
      }
    }
  });

  let discharged_btn = document.createElement("div");
  discharged_btn.classList.add("btn");
  discharged_btn.classList.add("discharged_btn");
  discharged_btn.innerHTML = "出院退藥";
  discharged_btn.addEventListener("click", async () => {
    if(!current_pharmacy.phar) {
      alert("請先選擇藥局");
      return;
    }
    Set_main_div_enable(true);

    let post_data = {
      Value: "調劑台",
      ValueAry:[current_pharmacy.phar]
    }

    console.log("出院api", post_data);
    let return_data = await get_all_cart_discharge(post_data);
    if(return_data.Code != 200) {
      alert("出院退藥資料錯誤", return_data.Result);
      Set_main_div_enable(false);
    } else {
      let ppdl_h_current_cart_select_option = document.querySelectorAll(".ppdl_h_current_cart_select option");
      ppdl_h_current_cart_select_option.forEach(element => {
        let temp_arr = return_data.Data;
        if(temp_arr.includes(element.value)) {
          element.innerHTML = `${element.value} (出院)`;
        } else {
          element.innerHTML = element.value;
        }
      });
    }

    let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");

    if(current_cart && ppdl_h_current_cart_select.value != current_cart.hnursta) {
      ppdl_h_current_cart_select.value = current_cart.hnursta;
    }

    post_data = {
      Value: "調劑台",
      ValueAry:  [current_pharmacy.phar, ppdl_h_current_cart_select.value]
    };

    console.log("出院處方退藥api",post_data);
    return_data = await get_patient_discharge(post_data);
    if(return_data.Code != 200) {
      alert("出院處方資料錯誤", return_data.Result);
      Set_main_div_enable(false);
    } else {  
      discharged_data = return_data.Data;
      set_discharged_data_display();
      Set_main_div_enable(false);
    }

    popup_discharged_list_div_open();
  });

  let bed_change_btn = document.createElement("div");
  bed_change_btn.classList.add("btn");
  bed_change_btn.classList.add("bed_change_btn");
  bed_change_btn.innerHTML = "病床異動";
  bed_change_btn.addEventListener("click", () => {
      popup_bed_change_div_open();
  });

  function_btn_container.appendChild(ppmcl_btn);
  function_btn_container.appendChild(med_cart_sum_list_btn);
  function_btn_container.appendChild(discharged_btn);
  function_btn_container.appendChild(bed_change_btn);

  let function_menu_container = document.createElement("div");
  function_menu_container.classList.add("function_menu_container");

  let function_display_container = document.createElement("div");
  function_display_container.classList.add("function_display_container");

  main_div.appendChild(function_btn_container);
  main_div.appendChild(function_menu_container);
  main_div.appendChild(function_display_container);
}

async function get_function_menu() {
  let function_menu_container = document.querySelector(".function_menu_container");

  let hos_block_select_container = document.createElement("div");
  hos_block_select_container.classList.add("select_container");
  hos_block_select_container.classList.add("hos_block_select_container");

  let hos_block_content = document.createElement("div");
  hos_block_content.classList.add("hos_block_content");
  hos_block_content.classList.add("display_content");
  hos_block_content.innerHTML = "藥局";
  hos_block_content.onclick = open_pharmacy_list;

  let hos_block_arrow = document.createElement("div");
  hos_block_arrow.classList.add("arrow");
  hos_block_arrow.classList.add("tri_arrow");

  let hos_block_option_container = document.createElement("div");
  hos_block_option_container.classList.add("hos_block_option_container");

  let temp_phar_data = await med_cart_all_get_phar();
  pharmacy_list = temp_phar_data.Data;

  pharmacy_list.forEach(element => {
    let pharmacy_option_div = document.createElement("div");
    pharmacy_option_div.classList.add("pharmacy_option_div");
    pharmacy_option_div.setAttribute("pharmacy", element.phar);
    pharmacy_option_div.innerHTML = element.phar_name;
    pharmacy_option_div.addEventListener("click", async () => {
      hos_block_content.innerHTML = pharmacy_option_div.innerHTML;
      current_pharmacy = element;
      if(last_current_pharmacy == current_pharmacy) {
        close_pharmacy_list();
        return;
      } else {
        console.log(current_pharmacy);
        let temp_logic = get_func_logic();
        get_all_select_option_logic(temp_logic);
        last_current_pharmacy = current_pharmacy;
        close_pharmacy_list();
        await check_cart_dispense();
      }
    });

    hos_block_option_container.appendChild(pharmacy_option_div);
  });

  hos_block_select_container.appendChild(hos_block_content);
  hos_block_select_container.appendChild(hos_block_arrow);
  hos_block_select_container.appendChild(hos_block_option_container);

  let func_select_container = document.createElement("div");
  func_select_container.classList.add("select_container");
  func_select_container.classList.add("func_select_container");

  let func_content = document.createElement("div");
  func_content.classList.add("func_content");
  func_content.classList.add("display_content");
  func_content.innerHTML = "功能";
  func_content.onclick = open_func_list;

  let func_arrow = document.createElement("div");
  func_arrow.classList.add("arrow");
  // func_arrow.classList.add("tri_arrow");

  let func_option_container = document.createElement("div");
  func_option_container.classList.add("func_option_container");

  func_list.forEach(element => {
    let func_option_div = document.createElement("div");
    func_option_div.classList.add("func_option_div");
    func_option_div.setAttribute("func", element.name);
    func_option_div.innerHTML = element.ctname;
    func_option_div.addEventListener("click", () => {
      func_content.innerHTML = func_option_div.innerHTML;
      current_func = element.name;
      if (last_current_func == current_func) {
        close_func_list();
        return
      } else {
        console.log(current_func);
        let temp_logic = get_func_logic();
        get_all_select_option_logic(temp_logic);
        last_current_func = current_func;
        close_func_list();
      }
    });

    func_option_container.appendChild(func_option_div);
  });

  func_select_container.appendChild(func_content);
  func_select_container.appendChild(func_arrow);
  func_select_container.appendChild(func_option_container);

  let cart_select_container = document.createElement("div");
  cart_select_container.classList.add("select_container");
  cart_select_container.classList.add("select_disable");
  cart_select_container.classList.add("cart_select_container");

  let cart_content = document.createElement("div");
  cart_content.classList.add("cart_content");
  cart_content.classList.add("display_content");
  cart_content.innerHTML = "藥車";
  // cart_content.onclick = open_cart_list;

  let cart_arrow = document.createElement("div");
  cart_arrow.classList.add("arrow");
  cart_arrow.classList.add("cir_arrow");
  cart_arrow.classList.add("cir_unable");

  let cart_option_container = document.createElement("div");
  cart_option_container.classList.add("cart_option_container");

  cart_select_container.appendChild(cart_content);
  cart_select_container.appendChild(cart_arrow);
  cart_select_container.appendChild(cart_option_container);

  let med_table_select_container = document.createElement("div");
  med_table_select_container.classList.add("select_container");
  med_table_select_container.classList.add("select_disable");
  med_table_select_container.classList.add("med_table_select_container");

  let med_table_content = document.createElement("div");
  med_table_content.classList.add("med_table_content");
  med_table_content.classList.add("display_content");
  med_table_content.innerHTML = "調劑台";
  // med_table_content.onclick = open_med_table_list;

  let med_table_arrow = document.createElement("div");
  med_table_arrow.classList.add("arrow");
  med_table_arrow.classList.add("cir_arrow");
  med_table_arrow.classList.add("cir_unable");

  let med_table_option_container = document.createElement("div");
  med_table_option_container.classList.add("med_table_option_container");

  med_table_select_container.appendChild(med_table_content);
  med_table_select_container.appendChild(med_table_arrow);
  med_table_select_container.appendChild(med_table_option_container);

  function_menu_container.appendChild(hos_block_select_container);
  function_menu_container.appendChild(func_select_container);
  function_menu_container.appendChild(cart_select_container);
  function_menu_container.appendChild(med_table_select_container);
}

function get_no_selected_func() {
    func_display_init();

    let function_display_container = document.querySelector(".function_display_container");
    let no_selected_display = document.createElement("div");
    no_selected_display.classList.add("no_selected_display");
    no_selected_display.innerHTML = "請先完整選擇上列清單";

    function_display_container.appendChild(no_selected_display);
}

// 開啟亮燈顏色選單
function open_light_color_list() {
  let light_color_select_container = document.querySelector(".light_color_select_container");
  let temp_client_width = window.innerWidth;

  if(temp_client_width > 550) {
    if(!color_list_triiger) {
      light_color_select_container.style.width = "250px";
      light_color_select_container.style.height = "50px";
      light_color_select_container.style.boxShadow = "2px 2px 8px 2px #0000003e";
      color_list_triiger = true;
    } else {
      light_color_select_container.style.width = "0px";
      light_color_select_container.style.height = "50px";
      light_color_select_container.style.boxShadow = "none";
      color_list_triiger = false;
    }
  } else {
    if(!color_list_triiger) {
      light_color_select_container.style.height = "250px";
      light_color_select_container.style.width = "50px";
      light_color_select_container.style.boxShadow = "2px 2px 8px 2px #0000003e";
      color_list_triiger = true;
    } else {
      light_color_select_container.style.height = "0px";
      light_color_select_container.style.width = "50px";
      light_color_select_container.style.boxShadow = "none";
      color_list_triiger = false;
    }
  }

}
// 關閉亮燈顏色選單
function close_light_color_list() {
  let light_color_select_container = document.querySelector(".light_color_select_container");

  let temp_client_width = window.innerWidth;

  if(temp_client_width > 550) {
    light_color_select_container.style.width = "0px";
    light_color_select_container.style.height = "50px";
    light_color_select_container.style.boxShadow = "none";
    color_list_triiger = false;
  } else {
    light_color_select_container.style.width = "50px";
    light_color_select_container.style.height = "0px";
    light_color_select_container.style.boxShadow = "none";
    color_list_triiger = false;
  }

}

// 開啟藥局選單
function open_pharmacy_list() {
  let hos_block_option_container = document.querySelector(".hos_block_option_container");
  let pharmacy_option_div = document.querySelectorAll(".pharmacy_option_div");

  let temp_height = 0;

  pharmacy_option_div.forEach(element => {
    temp_height += element.offsetHeight;
  });

  if(!pharmacy_list_triiger) {
    hos_block_option_container.style.height = `${temp_height}px`;
    hos_block_option_container.style.boxShadow = "2px 2px 8px 2px #00000090";
    pharmacy_list_triiger = true;
  } else {
    hos_block_option_container.style.height = "0px";
    hos_block_option_container.style.boxShadow = "none";
    pharmacy_list_triiger = false;
  }
}
// 關閉藥局選單
function close_pharmacy_list() {
  let hos_block_option_container = document.querySelector(".hos_block_option_container");
  hos_block_option_container.style.height = "0px";
  hos_block_option_container.style.boxShadow = "none";
  pharmacy_list_triiger = false;
}

// 開啟功能選單
function open_func_list() {
  let func_option_container = document.querySelector(".func_option_container");
  let func_option_div = document.querySelectorAll(".func_option_div");

  let temp_height = 0;

  func_option_div.forEach(element => {
    temp_height += element.offsetHeight;
  });

  if(!func_list_triiger) {
    func_option_container.style.height = `${temp_height}px`;
    func_option_container.style.boxShadow = "2px 2px 8px 2px #00000090";
    func_list_triiger = true;
  } else {
    func_option_container.style.height = "0px";
    func_option_container.style.boxShadow = "none";
    func_list_triiger = false;
  }
}
// 關閉功能選單
function close_func_list() {
  let func_option_container = document.querySelector(".func_option_container");
  func_option_container.style.height = "0px";
  func_option_container.style.boxShadow = "none";
  func_list_triiger = false;
}

// 開啟藥車選單
function open_cart_list() {
  let cart_option_container = document.querySelector(".cart_option_container");
  let cart_option_div = document.querySelectorAll(".cart_option_div");

  let temp_height = 0;
  let temp_max_height = 320;

  cart_option_div.forEach(element => {
    temp_height += element.offsetHeight;
  });

  if(!cart_list_triiger) {
    cart_option_container.style.height = `${temp_height}px`;
    // cart_option_container.style.height = `200px`;
    cart_option_container.style.maxHeight = `${temp_max_height}px`;
    // cart_option_container.style.maxHeight = `200px`;
    cart_option_container.style.overflowY = `auto`;
    cart_option_container.style.boxShadow = "2px 2px 8px 2px #00000090";
    cart_list_triiger = true;
  } else {
    cart_option_container.style.height = "0px";
    cart_option_container.style.overflowY = `hidden`;
    cart_option_container.style.boxShadow = "none";
    cart_list_triiger = false;
  }
}
// 關閉藥車選單
function close_cart_list() {
  let cart_option_container = document.querySelector(".cart_option_container");
  cart_option_container.style.height = "0px";
  cart_option_container.style.overflowY = `none`;
  cart_option_container.style.boxShadow = "none";
  cart_list_triiger = false;
}

// 開啟藥車選單
function open_med_table_list() {
  let med_table_option_container = document.querySelector(".med_table_option_container");
  let med_table_option_div = document.querySelectorAll(".med_table_option_div");

  let temp_height = 0;

  med_table_option_div.forEach(element => {
    temp_height += element.offsetHeight;
  });

  if(!med_table_triiger) {
    med_table_option_container.style.height = `${temp_height}px`;
    med_table_option_container.style.boxShadow = "2px 2px 8px 2px #00000090";
    med_table_triiger = true;
  } else {
    med_table_option_container.style.height = "0px";
    med_table_option_container.style.boxShadow = "none";
    med_table_triiger = false;
  }
}
// 關閉藥車選單
function close_med_table_list() {
  let med_table_option_container = document.querySelector(".med_table_option_container");
  med_table_option_container.style.height = "0px";
  med_table_option_container.style.boxShadow = "none";
  med_table_triiger = false;
}

// 控制所有選單展開
function select_list_controller() {
  let light_color_select_div = document.querySelector(".light_color_select_div");
  let func_select_container = document.querySelector(".func_select_container");
  let hos_block_select_container = document.querySelector(".hos_block_select_container");
  let cart_select_container = document.querySelector(".cart_select_container");
  let med_table_select_container = document.querySelector(".med_table_select_container");

  document.addEventListener('click', (e) => {
    if (e.target !== color_list_triiger && !isDescendant(light_color_select_div, e.target)) {
      if (color_list_triiger) {
        close_light_color_list();
      }
    }
    if (e.target !== func_list_triiger && !isDescendant(func_select_container, e.target)) {
      if (func_list_triiger) {
        close_func_list();
      }
    }
    if (e.target !== pharmacy_list_triiger && !isDescendant(hos_block_select_container, e.target)) {
      if (pharmacy_list_triiger) {
        close_pharmacy_list();
      }
    }
    if (e.target !== cart_list_triiger && !isDescendant(cart_select_container, e.target)) {
      if (cart_list_triiger) {
        close_cart_list();
      }
    }
    if (e.target !== med_table_triiger && !isDescendant(med_table_select_container, e.target)) {
      if (med_table_triiger) {
        close_med_table_list();
      }
    }
  });

  // 递归函数，检查一个节点是否是另一个节点的后代
  function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
}

function Set_main_div_enable(value) {
    if (value) {
      console.log("=======================");
      showLoadingPopup();

    }
    else {
      console.log("**********************");
      hideLoadingPopup();
    }
}

function get_func_logic() {
  // console.log(current_cart);
  // console.log(current_med_table);
  // if(current_func != "" && current_func == "allocate" && current_cart == "" && current_med_table == "") return 100;
  // if(current_func != "" && current_func != last_current_func) return 200;
  // if(current_func != "" && current_func == last_current_func) return 400;
  // if(current_func != "") return 400;

  if(current_pharmacy != "" && last_current_pharmacy != current_pharmacy) return 100;
  if(current_pharmacy != "" && current_func != "") return 200;
  if(current_pharmacy == "" && current_func != "") return 400;
}

// 100 初始話畫面，載入藥車、調劑台清單
// 200 功能畫面配對
// 400 啥事都不會發生
function get_all_select_option_logic(num) {
  // let hos_block_select_container = document.querySelector(".hos_block_select_container");
  // let func_select_container = document.querySelector(".func_select_container");
  // let cart_select_container = document.querySelector(".cart_select_container");
  // let med_table_select_container = document.querySelector(".med_table_select_container");

  // let pharmacy_block_content = document.querySelector(".hos_block_content");
  // let func_content = document.querySelector(".func_content");
  // let cart_content = document.querySelector(".cart_content");
  // let med_table_content = document.querySelector(".med_table_content");

  console.log(num);
  
  switch (num) {
    case 100:
      get_cart_list_and_med_table();
      
      break;
    case 200:
      set_func_select_logic();
      
      break;
    case 400:
      break;
  
    default:
      break;
  }
}

// 藥局選擇
async function get_cart_list_and_med_table() {
  let func_content = document.querySelector(".func_content");
  func_content.innerHTML = "功能";
  current_func = "";
  last_current_func = "";

  let temp_cart_list = await get_all_med_cart_by_phar(current_pharmacy.phar);
  cart_list = temp_cart_list.Data;
  console.log(cart_list);

  let temp_table_list = await get_serversetting_by_department_type(current_pharmacy.phar_name);
  med_table = temp_table_list.Data;
  //  插入藥品總量選單條及台選單
  set_med_table_filter_radio();
  ppmcl_set_med_table_filter_radio();
  ppdl_set_med_table_filter_radio();
  console.log(med_table);

  let cart_option_container = document.querySelector(".cart_option_container");
  cart_option_container.innerHTML = "";
  cart_list.forEach(element => {
    let cart_option_div = document.createElement("div");
    cart_option_div.classList.add("cart_option_div");
    cart_option_div.setAttribute("cart", element.GUID);
    cart_option_div.innerHTML = element.hnursta;
    if(element.hand_status == "已交車") {
      cart_option_div.classList.add("cart_option_div_done");
    }
    cart_option_div.addEventListener("click", () => {
      cart_content.innerHTML = cart_option_div.innerHTML;
      current_cart = element;
      if(last_current_cart == current_cart) {
        close_cart_list();
        return;
      } else {
        console.log(current_cart);
        let temp_logic = get_func_logic();
        get_all_select_option_logic(temp_logic);
        close_cart_list();
        last_current_cart = current_cart;
      }
    });

    cart_option_container.appendChild(cart_option_div);

    // 未調藥品加入彈窗select
    let ppmcl_h_current_cart_select = document.querySelector(".ppmcl_h_current_cart_select");
    let ppmcl_h_current_cart_option = document.createElement("option");
    ppmcl_h_current_cart_option.value = element.hnursta;
    ppmcl_h_current_cart_option.innerHTML = element.hnursta;

    ppmcl_h_current_cart_select.appendChild(ppmcl_h_current_cart_option);

    // 藥品總量加入彈窗select
    let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
    let ppml_h_current_cart_option = document.createElement("option");
    ppml_h_current_cart_option.value = element.hnursta;
    ppml_h_current_cart_option.innerHTML = element.hnursta;

    ppml_h_current_cart_select.appendChild(ppml_h_current_cart_option);

    // 病床異動加入彈窗select
    let ppbc_h_current_cart_select = document.querySelector(".ppbc_h_current_cart_select");
    let ppbc_h_current_cart_option = document.createElement("option");
    ppbc_h_current_cart_option.value = element.hnursta;
    ppbc_h_current_cart_option.innerHTML = element.hnursta;

    ppbc_h_current_cart_select.appendChild(ppbc_h_current_cart_option);

    // 病床異動加入彈窗select
    let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");
    let ppdl_h_current_cart_option = document.createElement("option");
    ppdl_h_current_cart_option.value = element.hnursta;
    ppdl_h_current_cart_option.innerHTML = element.hnursta;

    ppdl_h_current_cart_select.appendChild(ppdl_h_current_cart_option);
  });

  let med_table_option_container = document.querySelector(".med_table_option_container");
  med_table_option_container.innerHTML = "";
  for (let i = 0; i < med_table.length + 1; i++) {
    if (i == 0) {
      let med_table_option_div = document.createElement("div");
      med_table_option_div.classList.add("med_table_option_div");
      med_table_option_div.setAttribute("med_table", "all");
      med_table_option_div.innerHTML = "全部";
      med_table_option_div.addEventListener("click", () => {
        med_table_content.innerHTML = med_table_option_div.innerHTML;
        current_med_table = "all";
        if(last_current_med_table == current_med_table) {
          close_med_table_list();
          return
        } else {
          console.log(current_med_table);
          let temp_logic = get_func_logic();
          get_all_select_option_logic(temp_logic);
          last_current_med_table = current_med_table;
          close_med_table_list();
        }
      });
  
      med_table_option_container.appendChild(med_table_option_div);
    } else {
      let element = med_table[i - 1];
      let med_table_option_div = document.createElement("div");
      med_table_option_div.classList.add("med_table_option_div");
      med_table_option_div.setAttribute("med_table", element.GUID);
      med_table_option_div.innerHTML = element.name;
      med_table_option_div.addEventListener("click", () => {
        med_table_content.innerHTML = med_table_option_div.innerHTML;
        current_med_table = element;
        if(last_current_med_table == current_med_table) {
          close_med_table_list();
          return
        } else {
          console.log(current_med_table);
          let temp_logic = get_func_logic();
          get_all_select_option_logic(temp_logic);
          last_current_med_table = current_med_table;
          close_med_table_list();
        }
      });
  
      med_table_option_container.appendChild(med_table_option_div);
    } 
  }

  let cart_select_container = document.querySelector(".cart_select_container");
  let med_table_select_container = document.querySelector(".med_table_select_container");

  let cart_content = document.querySelector(".cart_content");
  let med_table_content = document.querySelector(".med_table_content");

  div_event_click_cir_disable(cart_select_container);
  cart_content.innerHTML = "藥車";
  current_cart = "";
  last_current_cart = "";
  cart_content.removeEventListener("click", open_cart_list);
  
  div_event_click_cir_disable(med_table_select_container);
  med_table_content.innerHTML = "調劑台";
  current_med_table = "";
  last_current_med_table = "";
  med_table_content.removeEventListener("click", open_med_table_list);

  get_no_selected_func();
}

// 功能選擇
function set_func_select_logic() {
  Set_main_div_enable(true);
  
  switch (current_func) {
    case "allocate":
      allocate_func();
      // Set_main_div_enable(false);
      break;
    case "review":
      allocate_func();
      // review_func();
      // Set_main_div_enable(false);
      break;
    case "deliver":
      deliver_func();
      // Set_main_div_enable(false);
      break;
  
    default:
      break;
  }
}
// 調劑作業
async function allocate_func() {
  Set_main_div_enable(true);
  let cart_select_container = document.querySelector(".cart_select_container");
  let med_table_select_container = document.querySelector(".med_table_select_container");
  let func_select_container = document.querySelector(".func_select_container");

  let cart_content = document.querySelector(".cart_content");
  let med_table_content = document.querySelector(".med_table_content");
  
  if(current_func == "allocate") {
    div_event_click_tri_able(cart_select_container);
    div_event_click_cir_able(med_table_select_container);
    div_event_click_tri_able(func_select_container);

    cart_content.addEventListener("click", open_cart_list);
    med_table_content.addEventListener("click", open_med_table_list);
    if(current_cart == "" && current_med_table == "") {
      Set_main_div_enable(false);
      return;
    } else if(current_cart == "" && current_med_table != "") {
      Set_main_div_enable(false);
      return;
    } else {
      allocate_diplay_logic();
      return;
    }
  } else {
    div_event_click_cir_able(cart_select_container);
    div_event_click_cir_disable(med_table_select_container);
    div_event_click_tri_able(func_select_container);

    cart_content.addEventListener("click", open_cart_list);
    med_table_content.removeEventListener("click", open_med_table_list);

    med_table_content.innerHTML = '調劑台';
    current_med_table = "";
    last_current_med_table = "";
  
    if(current_cart == "" && current_med_table == "") {
      Set_main_div_enable(false);
      return;
    } else {
      console.log("生成覆核清單");
      allocate_diplay_logic();
      // Set_main_div_enable(false);
      return;
    }
  }
}
// 覆核作業
// async function review_func() {
//   await light_off_func();
//   let cart_select_container = document.querySelector(".cart_select_container");
//   let med_table_select_container = document.querySelector(".med_table_select_container");
//   let func_select_container = document.querySelector(".func_select_container");

//   let cart_content = document.querySelector(".cart_content");
//   let med_table_content = document.querySelector(".med_table_content");

//   div_event_click_cir_able(cart_select_container);
//   div_event_click_cir_disable(med_table_select_container);
//   div_event_click_tri_able(func_select_container);

//   cart_content.addEventListener("click", open_cart_list);
//   med_table_content.removeEventListener("click", open_med_table_list);

//   med_table_content.innerHTML = '調劑台';
//   current_med_table = "";
//   last_current_med_table = "";

//   if(current_cart == "" && current_med_table == "") {
//     Set_main_div_enable(false);
//     return;
//   } else {
//     console.log("生成覆核清單");
//     display_revise_func();
//     Set_main_div_enable(false);
//     return;
//   }
// }
// 交車作業
async function deliver_func() {
  await light_off_func();
  let func_select_container = document.querySelector(".func_select_container");
  let cart_select_container = document.querySelector(".cart_select_container");
  let med_table_select_container = document.querySelector(".med_table_select_container");
  
  div_event_click_cir_disable(cart_select_container);
  div_event_click_cir_disable(med_table_select_container);
  div_event_click_cir_able(func_select_container);

  let cart_content = document.querySelector(".cart_content");
  let med_table_content = document.querySelector(".med_table_content");

  cart_content.removeEventListener("click", open_cart_list);
  med_table_content.removeEventListener("click", open_med_table_list);

  cart_content.innerHTML = "藥車";
  current_cart = "";
  last_current_cart = "";
  
  med_table_content.innerHTML = '調劑台';
  current_med_table = "";
  last_current_med_table = "";

  console.log("生成交車清單");
  deliver_cart_data = await get_all_med_cart_by_phar(current_pharmacy.phar);
  deliver_cart_data = deliver_cart_data.Data;
  console.log(deliver_cart_data);
  display_deliver_func();
  Set_main_div_enable(false);
}

// 設定可點選展開清單模式
function div_event_click_cir_able(div) {
  if(div.classList.contains("select_disable")) div.classList.remove("select_disable");
  set_circle_able_arrow(div.children[1]);
}

function div_event_click_tri_able(div) {
  if(div.classList.contains("select_disable")) div.classList.remove("select_disable");
  set_tir_arrow(div.children[1]);
}
function div_event_click_cir_disable(div) {
  if(div.classList.contains("select_disable")) div.classList.remove("select_disable");

  div.classList.add("select_disable");
  set_circle_unable_arrow(div.children[1]);
}
function set_circle_unable_arrow(div) {
  if(div.classList.contains("tri_arrow")) div.classList.remove("tri_arrow");
  if(div.classList.contains("cir_arrow")) div.classList.remove("cir_arrow");
  if(div.classList.contains("cir_unable")) div.classList.remove("cir_unable");
  if(div.classList.contains("cir_able")) div.classList.remove("cir_able");

  div.classList.add("cir_arrow");
  div.classList.add("cir_unable");
}
function set_circle_able_arrow(div) {
  if(div.classList.contains("tri_arrow")) div.classList.remove("tri_arrow");
  if(div.classList.contains("cir_arrow")) div.classList.remove("cir_arrow");
  if(div.classList.contains("cir_unable")) div.classList.remove("cir_unable");
  if(div.classList.contains("cir_able")) div.classList.remove("cir_able");

  div.classList.add("cir_arrow");
  div.classList.add("cir_able");
}
function set_tir_arrow(div) {
  if(div.classList.contains("tri_arrow")) div.classList.remove("tri_arrow");
  if(div.classList.contains("cir_arrow")) div.classList.remove("cir_arrow");
  if(div.classList.contains("cir_unable")) div.classList.remove("cir_unable");
  if(div.classList.contains("cir_able")) div.classList.remove("cir_able");

  div.classList.add("tri_arrow");
}

function func_display_init() {
  let function_display_container = document.querySelector(".function_display_container");
  function_display_container.innerHTML = "";
}
async function popup_login_finished() {
  console.log(`[${arguments.callee.name}]`);
}

async function reset_cart_list_container() {
  let temp_cart_list = await get_all_med_cart_by_phar(current_pharmacy.phar);
  cart_list = temp_cart_list.Data;
  console.log(cart_list);

  let cart_content = document.querySelector(".cart_content");
  let cart_option_container = document.querySelector(".cart_option_container");
  cart_option_container.innerHTML = "";
  cart_list.forEach(element => {
    let cart_option_div = document.createElement("div");
    cart_option_div.classList.add("cart_option_div");
    cart_option_div.setAttribute("cart", element.GUID);
    cart_option_div.innerHTML = element.hnursta;
    if(element.hand_status == "已交車") {
      cart_option_div.classList.add("cart_option_div_done");
    } else {
      cart_option_div.addEventListener("click", () => {
        cart_content.innerHTML = cart_option_div.innerHTML;
        current_cart = element;
        if(last_current_cart == current_cart) {
          close_cart_list();
          return;
        } else {
          console.log(current_cart);
          let temp_logic = get_func_logic();
          get_all_select_option_logic(temp_logic);
          close_cart_list();
          last_current_cart = current_cart;
        }
      });
    }

    cart_option_container.appendChild(cart_option_div);
  });
}
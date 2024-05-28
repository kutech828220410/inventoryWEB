let data;
let data_information;
let med_select_array = [];

window.onload = load;
window.addEventListener('resize', handleResize);

function handleResize() 
{
    //Set_popup_serch_position();
}
async function load()
{ 
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  showLoadingPopup();
  // Set_main_div_enable(true);
  var serverName = "";  
  console.log("ServerName",serverName);
  ServerName = serverName;
  ServerType = "網頁";
  TableName = "medicine_page";
  APIServer = await LoadAPIServer();
  const API01 = serch_APIServer(serverName,"調劑台","API01");
  const API02 = serch_APIServer(serverName,"調劑台","API02");
  console.log("API01",API01);
  console.log("API02",API02);
  check_ip(API01[0].server,API02[0].server);
  permissions = await GetApipermissions();
  console.log(permissions);

  const currentDate = new Date();
  let date_end = DateTimeAddDays(currentDate, 1);
  let date_start = DateTimeAddDays(currentDate, -30);
  date_start = getDateStr(date_start);
  date_end = getDateStr(date_end);
  let loggedID = sessionStorage.getItem('loggedID');  
  let loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  get_popup_pharmacy_select();
  popup_pharmacy_select_div.Set_Visible(true);

  nav_bar_create("drugs_report", test_user_data)
  page_init();
  hideLoadingPopup();
}
async function page_init() {
    let body = document.querySelector("body");
    let header_div = get_header();
    let main_div = get_main();

    body.appendChild(header_div)
    body.appendChild(main_div)
}
function handleResize() {
  // Set_popup_serch_position();
}

function get_header() {
    let loggedName = sessionStorage.getItem('loggedName');
    let cd_header_container = document.createElement("div");
    cd_header_container.classList.add("cd_header_container");

    let cd_header_title_container = document.createElement("div");
    cd_header_title_container.classList.add("cd_header_title_container");

    let cd_header_title = document.createElement("div");
    cd_header_title.classList.add("cd_header_title");
    cd_header_title.innerText = "管制結存";

    let cd_header_user = document.createElement("div");
    cd_header_user.classList.add("cd_header_user");
    cd_header_user.innerText = `使用者：${loggedName}`;

    cd_header_title_container.appendChild(cd_header_title);
    cd_header_title_container.appendChild(cd_header_user);

    let cd_header_btn_container = document.createElement("div");
    cd_header_btn_container.classList.add('cd_header_btn_container');

    let cd_header_pharmacy_select_popup_btn = document.createElement("div");
    cd_header_pharmacy_select_popup_btn.classList.add("cd_header_pharmacy_select_popup_btn");
    cd_header_pharmacy_select_popup_btn.innerHTML = "選區";
    cd_header_pharmacy_select_popup_btn.addEventListener("click", () => {
        popup_pharmacy_select_div_open();
    });
    let cd_header_pharmacy_muilt_select_popup_btn = document.createElement("div");
    cd_header_pharmacy_muilt_select_popup_btn.classList.add("cd_header_pharmacy_muilt_select_popup_btn");
    cd_header_pharmacy_muilt_select_popup_btn.innerHTML = "已選藥品";
    cd_header_pharmacy_muilt_select_popup_btn.addEventListener("click", async () => {
        showLoadingPopup();
        let temp_arr = await get_selected_meds_data();
        get_search_med_result_display(temp_arr);
        hideLoadingPopup();
    });

    cd_header_btn_container.appendChild(cd_header_pharmacy_muilt_select_popup_btn);
    cd_header_btn_container.appendChild(cd_header_pharmacy_select_popup_btn);

    cd_header_container.appendChild(cd_header_title_container);
    cd_header_container.appendChild(cd_header_btn_container);

    return cd_header_container;
}
function get_main() {
    let cd_main_container = document.createElement("div");
    cd_main_container.classList.add("cd_main_container");

    let cd_main_search_container = get_main_search_div();

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

    let cd_main_med_card_display_container = document.createElement("div");
    cd_main_med_card_display_container.classList.add("cd_main_med_card_display_container");

    cd_main_container.appendChild(cd_main_search_container);
    cd_main_container.appendChild(cd_main_select_block_container);
    cd_main_container.appendChild(cd_main_med_card_display_container);

    return cd_main_container;
}
function get_main_search_div() {
    let cd_main_search_container = document.createElement("div");
    cd_main_search_container.classList.add('cd_main_search_container');

    let cd_main_search_select = document.createElement("select");
    cd_main_search_select.classList.add('cd_main_search_select');
    cd_main_search_select.innerHTML = `
      <option value="code">藥碼</option>
      <option value="name">(英)</option>
      <option value="ctname">(中)</option>
      <option value="drugkind">管制級別</option>
      <option value="medgroup">藥品群組</option>
    `;

    let cd_main_search_select_list = document.createElement("select");
    cd_main_search_select_list.classList.add("cd_main_search_select_list");

    cd_main_search_select.addEventListener("change", async (e) => {
      if(e.target.value == "medgroup" || e.target.value ==  "drugkind") {
        cd_main_search_input.style.display = "none";
        cd_main_search_select_list.style.display = "block";
        switch (e.target.value) {
          case "medgroup":
            let temp_med_group_data = await groups_manage_get_data();
            cd_main_search_select_list.innerHTML = "";
            console.log(temp_med_group_data);
            temp_med_group_data["Data"].forEach(element => {
              cd_main_search_select_list.innerHTML += `
                <option value="${element.GUID}">${element.NAME}</option>
              `;
            });
            break;
          case "drugkind":
            cd_main_search_select_list.innerHTML = "";
            cd_main_search_select_list.innerHTML = `
              <option value="N">N</option>
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
            `;
            break;
        
          default:
            break;
        }
      } else {
        cd_main_search_input.style.display = "block";
        cd_main_search_select_list.style.display = "none";
      }
    });

    let cd_main_search_input = document.createElement("input");
    cd_main_search_input.id = 'cd_main_search_input';
    cd_main_search_input.name = 'cd_main_search_input';
    cd_main_search_input.type = 'text';
    cd_main_search_input.addEventListener("keydown", async (e) => {
      if(e.keyCode === 13 || e.key === "Enter") {
        showLoadingPopup();
        let temp_select_value = cd_main_search_select.value;
        let temp_input = cd_main_search_input.value;
        let temp_select_list_value = cd_main_search_select_list.value;

        cd_main_search_input.blur();
        let temp_med_result;
        if(temp_select_value == "medgroup" || temp_select_value ==  "drugkind") {
          temp_med_result = await get_search_med_data(temp_select_value, temp_select_list_value);
        } else {
          temp_med_result = await get_search_med_data(temp_select_value, temp_input);
        }
        console.log("temp", temp_med_result);
        if(temp_med_result.length < 1 || temp_med_result.length == undefined) {
          hideLoadingPopup();
          return
        };
        get_search_med_result_display(temp_med_result);
        hideLoadingPopup();
      }
    });

    let cd_main_search_btn = document.createElement("div");
    cd_main_search_btn.classList.add('cd_main_search_btn');
    cd_main_search_btn.innerHTML = '搜尋'
    cd_main_search_btn.addEventListener('click', async () => {
        showLoadingPopup();
        let temp_select_value = cd_main_search_select.value;
        let temp_input = cd_main_search_input.value;
        let temp_select_list = cd_main_search_select_list.value;

        let temp_med_result;

        if(temp_select_value == "medgroup" || temp_select_value ==  "drugkind") {
          temp_med_result = await get_search_med_data(temp_select_value, temp_select_list);
        } else {
          temp_med_result = await get_search_med_data(temp_select_value, temp_input);
        }
        console.log("temp", temp_med_result);
        if(temp_med_result.length < 1 || temp_med_result.length == undefined) {
          hideLoadingPopup();
          return
        }
        get_search_med_result_display(temp_med_result);
        hideLoadingPopup();
    });

    cd_main_search_container.appendChild(cd_main_search_select);
    cd_main_search_container.appendChild(cd_main_search_select_list);
    cd_main_search_container.appendChild(cd_main_search_input);
    cd_main_search_container.appendChild(cd_main_search_btn);

    return cd_main_search_container;
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

async function get_search_med_data(select, input) {
  if(input == "" || input == null) {
    alert("請輸入資料!!");
    return [];
  } else {
    let temp_arr = [];
    let med_data = await get_medicine_cloud();
    med_data = med_data.Data
    switch (select) {
      case "code":
        temp_arr = med_data.filter(e => e["CODE"].includes(input));
        if(temp_arr.length < 1) {
          alert('查無此藥');
        }
        return temp_arr;
    
      case "name":
        temp_arr = med_data.filter(e => e["NAME"].includes(input));
        if(temp_arr.length < 1) {
          alert('查無此藥');
        }
        return temp_arr;
    
      case "ctname":
        temp_arr = med_data.filter(e => e["CHT_NAME"].includes(input));
        if(temp_arr.length < 1) {
          alert('查無此藥');
        }
        return temp_arr;

      case "medgroup":
        let temp_med_group_data = await groups_manage_get_data();
        let temp_med_group = temp_med_group_data["Data"].filter(e => e["GUID"].includes(input));
        let match_arr = [];
        temp_med_group[0]["MedClasses"].forEach(element => {
          match_arr.push(element.CODE);
        });
        console.log(match_arr);
        if(match_arr.length < 1) {
          alert("藥品群組無資料");
          hideLoadingPopup();
          return;
        }
        temp_arr = med_data.filter(e => match_arr.includes(e["CODE"]));
        if(temp_arr.length < 1) {
          alert('查無此藥');
        }
        return temp_arr;

      case "drugkind":
        temp_arr = med_data.filter(e => e["DRUGKIND"].includes(input));
        if(temp_arr.length < 1) {
          alert('查無此藥');
        }
        return temp_arr;
    
      default:
        break;
    }
  }
}
async function get_selected_meds_data() {
  if (med_select_array.length !== 0) {
    let temp_arr = [];
    let temp_object = {};
    let med_data = await get_medicine_cloud();
    med_data = med_data.Data
    med_data.forEach(element => {
      temp_object[`${element.CODE}`] = element
    });

    med_select_array.forEach(e => {
      temp_arr.push(temp_object[`${e}`]);
    });

    // console.log(temp_arr);
    return temp_arr;
  } else {
    alert("尚未選取任何藥品");
    return [];
  }
}

function get_search_med_result_display(array) {
    let cd_main_med_card_display_container = document.querySelector(".cd_main_med_card_display_container");
    cd_main_med_card_display_container.innerHTML = "";

    array.forEach(element => {
      let cd_med_card_item_container = document.createElement("div");
      cd_med_card_item_container.classList.add("cd_med_card_item_container");
      cd_med_card_item_container.setAttribute("guid", element.GUID);

      let cd_med_select_div = document.createElement("div");
      cd_med_select_div.classList.add("cd_med_select_div");

      if(med_select_array.includes(`${element.CODE}`)) {
        cd_med_select_div.classList.add("cd_med_select_div_selected");
      }

      cd_med_select_div.addEventListener("click", () => {
        if(cd_med_select_div.classList.contains("cd_med_select_div_selected")) {
          cd_med_select_div.classList.remove("cd_med_select_div_selected");
          let temp_index = med_select_array.indexOf(element.CODE);
          if (temp_index !== -1) {
            med_select_array.splice(temp_index, 1);
            get_del_med_select_num();
          }
          // console.log(med_select_array);
        } else {
          cd_med_select_div.classList.add("cd_med_select_div_selected");

          med_select_array.push(element.CODE);
          get_add_med_select_num();
          // console.log(med_select_array);
        }
      })

      let cd_med_span_1 = document.createElement("span");
      cd_med_span_1.classList.add("cd_med_span_1");
      let cd_med_span_2 = document.createElement("span");
      cd_med_span_2.classList.add("cd_med_span_2");

      cd_med_select_div.appendChild(cd_med_span_1);
      cd_med_select_div.appendChild(cd_med_span_2);

      let cd_main_med_card_container = document.createElement("div");
      cd_main_med_card_container.classList.add('cd_main_med_card_container');
      cd_main_med_card_container.setAttribute("guid", element.GUID);

      cd_main_med_card_container.addEventListener("click", () => {
        popup_datetime_select_div_open(element);
      });

      let cd_main_pic = document.createElement("img");

      let cd_main_med_card_content_container = document.createElement("div");
      cd_main_med_card_content_container.classList.add("cd_main_med_card_content_container");

      let cd_main_med_card_name = document.createElement("div");
      cd_main_med_card_name.classList.add("cd_main_med_card_content");
      cd_main_med_card_name.innerHTML = `(英):${element.NAME}`;
      if(element.NAME == "") {
        cd_main_med_card_name.innerHTML = `(英): 無`;
      } else {
        cd_main_med_card_name.innerHTML = `(英):${element.NAME}`;
      }

      let cd_main_med_card_ctname = document.createElement("div");
      cd_main_med_card_ctname.classList.add("cd_main_med_card_content");
      if(element.CHT_NAME == "") {
        cd_main_med_card_ctname.innerHTML = `(中): 無`;
      } else {
        cd_main_med_card_ctname.innerHTML = `(中):${element.CHT_NAME}`;
      }

      let cd_main_med_card_code = document.createElement("div");
      cd_main_med_card_code.classList.add("cd_main_med_card_content");
      if(element.SKDIACODE == "") {
        cd_main_med_card_code.innerHTML = `藥碼:${element.CODE}`;
      } else {
        cd_main_med_card_code.innerText = `藥碼:${element.CODE}&nbsp&nbsp&nbsp&nbsp料號:${element.SKDIACODE}`;
      }

      cd_main_med_card_content_container.appendChild(cd_main_med_card_name);
      cd_main_med_card_content_container.appendChild(cd_main_med_card_ctname);
      cd_main_med_card_content_container.appendChild(cd_main_med_card_code);

      let cd_main_med_card_notice = document.createElement("div");
      cd_main_med_card_notice.classList.add('cd_main_med_card_notice');
      cd_main_med_card_notice.innerText = '點選進入日期選擇';


      // cd_main_med_card_container.appendChild(cd_main_pic);
      cd_main_med_card_container.appendChild(cd_main_med_card_content_container);
      cd_main_med_card_container.appendChild(cd_main_med_card_notice);

      cd_med_card_item_container.appendChild(cd_med_select_div);
      cd_med_card_item_container.appendChild(cd_main_med_card_container);

      cd_main_med_card_display_container.appendChild(cd_med_card_item_container);
    });
}
async function groups_manage_get_data() {
  console.log("api_ip",api_ip);
  let data = await fetch(`${api_ip}api/medGroup/get_all_group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).catch(e => {
      console.log(e);
    }).then(res => {
      return res.json()
    });

    return data
}
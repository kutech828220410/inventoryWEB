window.onload = load;
// window.addEventListener('resize', handleResize);
let medicine_page = [];
var IsLogged = (function() 
{
  return (sessionData.Name != null && sessionData.Name != "");
})();;

function handleResize() 
{
   //Set_popup_find_position();
}
async function load()
{
  check_session_off();
  var serverName = "";
  // ServerName = serverName;
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
  console.log("permissions", permissions);

  await page_check_permissions("requisitions_upload");

  let rowNum = 1;
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);
  // medicine_page = await get_medicine_cloud();
  // medicine_page = medicine_page.Data;
  // console.log(medicine_page);

  let loggedID = sessionStorage.getItem('loggedID');  
  let loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  nav_bar_create("requisitions_upload", test_user_data);
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
    h_title.innerHTML = "頁面設定";

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

    let main_div_pages_search_container = document.createElement("div");
    main_div_pages_search_container.classList = "main_div_pages_search_container";

    let main_div_pages_search_select = document.createElement("select");
    main_div_pages_search_select.id = "main_div_pages_search_select";
    main_div_pages_search_select.addEventListener("change", async () => {
      if(main_div_pages_search_select.value == "none") {
        reset_setting_container();
        return;
      };
      let post_data = {
        ValueAry: [main_div_pages_search_select.value]
      }

      let return_data = await get_by_page_name(post_data);
      med_cart_return_data = return_data.Data;
      temp_med_cart_return_data = return_data.Data;

      change_setting_page();
    });
  
    temp_pages_array.forEach(element => {
      let mdpss_option = document.createElement("option");
      mdpss_option.value = element.name;
      mdpss_option.innerHTML = element.cht;

      main_div_pages_search_select.appendChild(mdpss_option);
    });

    main_div_pages_search_container.appendChild(main_div_pages_search_select);

    let main_div_page_setting_container = document.createElement("div");
    main_div_page_setting_container.classList = "main_div_page_setting_container";

    main_div.appendChild(main_div_pages_search_container);
    main_div.appendChild(main_div_page_setting_container);

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
function reset_setting_container() {
  let main_div_page_setting_container = document.querySelector(".main_div_page_setting_container");
  main_div_page_setting_container.innerHTML = "";
}
function change_setting_page() {
  reset_setting_container();
  let main_div_page_setting_container = document.querySelector(".main_div_page_setting_container");

  let page_setting_title = document.createElement("div");
  page_setting_title.classList = "page_setting_title";
  
  let selectElement = document.getElementById("main_div_pages_search_select");
  let selectedText = selectElement.options[selectElement.selectedIndex].text;
  page_setting_title.innerHTML = `設定 - ${selectedText}`;

  let setting_container = document.createElement("div");
  setting_container.classList = "setting_container";
  temp_med_cart_return_data.forEach(element => {
    let card = set_setting_container(element);
    setting_container.appendChild(card);
  });

  let setting_btn_container = document.createElement("div");
  setting_btn_container.classList = "setting_btn_container";

  let save_btn = document.createElement("div");
  save_btn.classList = "save_btn btn";
  save_btn.innerHTML = "儲存";
  save_btn.addEventListener("click", () => {
    compare_params();
  });

  setting_btn_container.appendChild(save_btn);

  main_div_page_setting_container.appendChild(page_setting_title);
  main_div_page_setting_container.appendChild(setting_container);
  main_div_page_setting_container.appendChild(setting_btn_container);

  set_checkbox_group_limit();
}

function set_setting_container(element) {
  let setting_card = document.createElement("div");
  setting_card.classList = "setting_card";
  setting_card.setAttribute("GUID", element.GUID);
  setting_card.setAttribute("master-GUID", element.GUID);

  let setting_param;
  console.log(element.value_type);
  switch (element.value_type) {
    case "text":
      setting_param = set_setting_text(element);
      break;
    case "radio":
      setting_param = set_setting_radio(element);
      break;
    case "checkbox":
      setting_param = set_setting_checkbox(element);
      break;
    case "time":
      setting_param = set_setting_time(element);
      break;
    case "checkbox_group":
      setting_param = set_setting_checkbox_group(element);
      break;
  
    default:
      break;
  }

  setting_card.appendChild(setting_param);
  return setting_card;
}
function set_setting_text(element) {
  let setting_param = document.createElement("div");
  setting_param.classList = "setting_param";

  let setting_title = document.createElement("label");
  setting_title.classList = "setting_title";
  setting_title.innerHTML = element.cht;
  setting_title.setAttribute("for", element.name);

  let setting_text = document.createElement("input");
  setting_text.type = "text";
  setting_text.style.width = "50px";
  setting_text.value = element.value;
  setting_text.id = element.name;
  setting_text.maxLength = 2;
  setting_text.setAttribute("GUID", element.GUID);
  setting_text.addEventListener("change", async () => {
    if(setting_text.value == "") {
      setting_text.value = element.value;
      return;
    } else if (setting_text.value > 99) {
      setting_text.value = 99;
    }
  });

  setting_param.appendChild(setting_title);
  setting_param.appendChild(setting_text);

  return setting_param;
}
function set_setting_radio(element) {
  let setting_param = document.createElement("div");
  setting_param.classList = "setting_param";

  let setting_title = document.createElement("div");
  setting_title.classList = "setting_title";
  setting_title.innerHTML = element.cht;

  let radio_container = document.createElement("div");
  radio_container.classList = "radio_container";
  // <input type="radio" id="dewey" name="drone" value="dewey" />
  // <label for="dewey">Dewey</label>
  element["option"].forEach(item => {
    let radio_item_container = document.createElement("div");
    radio_item_container.classList = "radio_item_container";

    let setting_radio = document.createElement("input");
    setting_radio.type = "radio";
    setting_radio.id = `${element.name}_${item}`;
    setting_radio.name = `${element.name}`;
    setting_radio.value = item;
    setting_radio.setAttribute("GUID", element.GUID);
    if(element.value == item) {
      setting_radio.checked = true;
    }

    let setting_radio_label = document.createElement("label");
    setting_radio_label.setAttribute("for", `${element.name}_${item}`);
    setting_radio_label.innerHTML = `${item} Pixel`;
    setting_radio_label.style.fontSize = `${item}px`;
    setting_radio_label.classList = "setting_label";

    radio_item_container.appendChild(setting_radio);
    radio_item_container.appendChild(setting_radio_label);

    radio_container.appendChild(radio_item_container);
  });

  setting_param.appendChild(setting_title);
  setting_param.appendChild(radio_container);

  return setting_param;
}
function set_setting_checkbox(element) {
  let setting_param = document.createElement("div");
  setting_param.classList = "setting_param";

  let setting_checkbox_container = document.createElement("div");
  setting_checkbox_container.classList = "setting_checkbox_container";

  let setting_title = document.createElement("label");
  setting_title.classList = "setting_title no_down_space";
  setting_title.innerHTML = element.cht;
  setting_title.setAttribute("for", element.name);

  let setting_checkbox = document.createElement("input");
  setting_checkbox.type = "checkbox";
  setting_checkbox.id = element.name;
  if(element.value == "True") {
    setting_checkbox.checked = true;
  } else {
    setting_checkbox.checked = false;
  }
  setting_checkbox.setAttribute("GUID", element.GUID);

  setting_checkbox_container.appendChild(setting_checkbox);
  setting_checkbox_container.appendChild(setting_title);

  setting_param.appendChild(setting_checkbox_container);

  return setting_param;
}
function set_setting_time(element) {
  let setting_param = document.createElement("div");
  setting_param.classList = "setting_param";

  let setting_title = document.createElement("div");
  setting_title.classList = "setting_title";
  setting_title.innerHTML = element.cht;

  let setting_time_container = document.createElement("div");
  setting_time_container.classList = "setting_time_container";

  let setting_time_hour = document.createElement("select");
  setting_time_hour.id = `${element.name}_hour`;
  setting_time_hour.setAttribute("GUID", element.GUID);
  for (let i = 0; i < 24; i++) {
    let option = document.createElement("option");
    let temp_str = String(i).padStart(2, "0");
    option.value = temp_str;
    option.innerHTML = temp_str;
    if(element.value.split(":")[0] == temp_str) {
      option.selected = true;
    }
    setting_time_hour.appendChild(option);
  }

  let setting_time_minute = document.createElement("select");
  setting_time_minute.id = `${element.name}_minute`;
  setting_time_minute.setAttribute("GUID", element.GUID);
  for (let i = 0; i < 60; i++) {
    let option = document.createElement("option");
    let temp_str = String(i).padStart(2, "0");
    option.value = temp_str;
    option.innerHTML = temp_str;
    if(element.value.split(":")[1] == temp_str) {
      option.selected = true;
    }
    setting_time_minute.appendChild(option);
  }

  setting_time_container.appendChild(setting_time_hour);
  setting_time_container.appendChild(setting_time_minute);

  setting_param.appendChild(setting_title);
  setting_param.appendChild(setting_time_container);

  return setting_param;
}
function set_setting_checkbox_group(element) {
  let setting_param = document.createElement("div");
  setting_param.classList = "setting_param";

  let setting_title = document.createElement("div");
  setting_title.classList = "setting_title";
  setting_title.innerHTML = element.cht;

  let setting_checkbox_group = document.createElement("div");
  setting_checkbox_group.classList = "setting_checkbox_group";

  let count_checked = 0;

  element["value"].forEach(item => {
    let checkbox_container = document.createElement("div");
    checkbox_container.classList = "checkbox_container";

    let setting_checkbox = document.createElement("input");
    setting_checkbox.type = "checkbox";
    setting_checkbox.classList = element.name;
    setting_checkbox.id = `${element.name}_${item.name}`;
    setting_checkbox.setAttribute("name", item.name);
    if(item.value == "True") {
      setting_checkbox.checked = true;
      count_checked++;
    } else {
      setting_checkbox.checked = false;
    }
    let maxSelection = +element.option_str;

    setting_checkbox.addEventListener("change", () => {
      let setting_checkboxes = document.querySelectorAll(`.${element.name}`);
      let count_checked = 0;
      // let setting_checkbox_group_notice = document.querySelector(".setting_checkbox_group_notice");
      setting_checkboxes.forEach(item => {
        if(item.checked) {
          count_checked++;
        }
      });
      if(count_checked >= maxSelection) {
        setting_checkboxes.forEach(item => {
          if (!item.checked) {
            item.disabled = true;
          }
        });
      } else {
        setting_checkboxes.forEach(item => {item.disabled = false;});
      }

      let notice_div = document.querySelector(`.setting_checkbox_group_notice[name=${element.name}]`);
      notice_div.textContent = `目前已選取 ${count_checked}/${maxSelection}`;
    });

    let setting_checkbox_label = document.createElement("label");
    setting_checkbox_label.setAttribute("for", `${element.name}_${item.name}`);
    setting_checkbox_label.innerHTML = item.cht;
    setting_checkbox_label.classList = "setting_label";

    checkbox_container.appendChild(setting_checkbox);
    checkbox_container.appendChild(setting_checkbox_label);

    setting_checkbox_group.appendChild(checkbox_container); 
  });

  let setting_checkbox_group_notice = document.createElement("div");
  setting_checkbox_group_notice.classList = "setting_checkbox_group_notice";
  setting_checkbox_group_notice.textContent = `目前已選取 ${count_checked}/${+element.option_str}`;
  setting_checkbox_group_notice.setAttribute("name", element.name);

  setting_param.appendChild(setting_title);
  setting_param.appendChild(setting_checkbox_group);
  setting_param.appendChild(setting_checkbox_group_notice);

  return setting_param;
}
async function compare_params() {
  let temp_check = false;
  Set_main_div_enable(true);
  for (let i = 0; i < temp_med_cart_return_data.length; i++) {
    let element = temp_med_cart_return_data[i];
    let boolean = await compare_param_item(element);
    if(boolean) {
      temp_check = true;
    }
  }

  if(temp_check) {
    alert("儲存成功");
    let main_div_pages_search_select = document.querySelector("#main_div_pages_search_select");
    if(main_div_pages_search_select.value == "none") {
      reset_setting_container();
      return;
    };
    let post_data =     {
      ValueAry: [main_div_pages_search_select.value]
    }

    let return_data = await get_by_page_name(post_data);
    med_cart_return_data = return_data.Data;
    temp_med_cart_return_data = return_data.Data;

    change_setting_page();
  }
  Set_main_div_enable(false);
}
async function compare_param_item(element) {
  let boolean = false;
  switch (element.value_type) {
    case "text":
      boolean = await save_params_text(element);
      break;
    case "radio":
      boolean = await save_params_radio(element);
      break;
    case "checkbox":
      boolean = await save_params_checkbox(element);
      break;
    case "time":
      boolean = await save_params_time(element);
      break;
    case "checkbox_group":
      boolean = await save_params_checkbox_group(element);
      break;
  
    default:
      boolean = false;
      break;
  }

  return boolean;
}
async function save_params_text(element) {
  let text_input = document.querySelector(`#${element.name}`);
  if(text_input.value == element.value) {
    return false;
  } else {
    let post_data = {
      ValueAry: [text_input.getAttribute("GUID"), text_input.value],
    }

    console.log(element.value , post_data);

    await update_by_GUID(post_data);
    
    return true;
  }
}
async function save_params_radio(element) {
  let radio_input = document.querySelectorAll(`input[name=${element.name}]`);
  let checked_value;
  radio_input.forEach(item => {
    if(item.checked) {
      checked_value = item.value;
    }
  });

  if(checked_value == element.value) {
    return false;
  } else {
    let post_data = {
      ValueAry: [radio_input[0].getAttribute("GUID"), checked_value],
    }

    console.log(element.value , post_data);

    await update_by_GUID(post_data);

    return true;
  }
}
async function save_params_checkbox(element) {
  let checkbox_input = document.querySelector(`#${element.name}`);
  let checked_value;
  if(checkbox_input.checked) {
    checked_value = "True";
  } else {
    checked_value = "False";
  }

  if(checked_value == element.value) {
    return false;
  } else {
    let post_data = {
      ValueAry: [checkbox_input.getAttribute("GUID"), checked_value],
    }

    console.log(element.value , post_data);

    await update_by_GUID(post_data);

    return true;
  }
}
async function save_params_time(element) {
  let hour_input = document.querySelector(`#${element.name}_hour`);
  let minute_input = document.querySelector(`#${element.name}_minute`);
  let checked_value = `${hour_input.value}:${minute_input.value}`;

  if(checked_value == element.value) {
    return false;
  } else {
    let post_data = {
      ValueAry: [hour_input.getAttribute("GUID"), checked_value],
    }
    
    console.log(element.value , post_data);

    await update_by_GUID(post_data);

    return true;
  }
}
async function save_params_checkbox_group(element) {
  let isChange = false;
  let checkbox_input = document.querySelectorAll(`.${element.name}`);
  let input_count_checked = 0;
  checkbox_input.forEach(item => {
    if(item.checked) {
      input_count_checked++;
    }
  });

  if(input_count_checked > +element.option_str) {
    alert(`${element.cht}，選取超過${element.option_str}個，請確認`);
    return false;
  }
  //  else if(input_count_checked < +element.option_str) {
  //   alert(`${element.cht}，選取不足${element.option_str}個，請確認`);
  //   return false;
  // }  

  let compare_object = {};
  element["value"].forEach(item => {
    compare_object[item.name] = item;
  });
  
  let checked_value = [];
  checkbox_input.forEach(item => {
    let temp_check;
    let split_name = item.getAttribute("name");
    if(item.checked) {
      temp_check = "True";
    } else {
      temp_check = "False";
    }

    // console.log(item.checked, temp_check);
    // console.log(compare_object[split_name], item.checked, temp_check);
    if(compare_object[split_name].value == temp_check && temp_check == "True") {
      checked_value.push(compare_object[split_name].name);
    } else if(compare_object[split_name].value != temp_check && temp_check == "True") {
      isChange = true;
      compare_object[split_name].value = temp_check;
      checked_value.push(compare_object[split_name].name);
    } else if(compare_object[split_name].value != temp_check && temp_check == "False") {
      isChange = true;
      compare_object[split_name].value = temp_check;
    }
  });

  console.log(`${element.cht}`, checked_value);
  if(isChange) {
    let postable = false;
    let count_checked = +checked_value.length;

    if(count_checked == +element.option_str) {
      postable = true;
    }
  
    console.log(count_checked, element.option_str, postable);
    if(postable) {
      let post_data = {
        ValueAry: [element.GUID, checked_value.join(";")],
      }
      console.log(element.value , post_data);

      await update_by_GUID(post_data);

      return true;
    }
  } else {
    return false;
  }
}
function set_checkbox_group_limit() {
  let temp_checkbox_group_arr = [];
  temp_med_cart_return_data.forEach(element => {
    if(element.value_type == "checkbox_group") {
      temp_checkbox_group_arr.push(element);
    }
  });

  if(temp_checkbox_group_arr.length == 0) {
    return;
  };

  temp_checkbox_group_arr.forEach(element => {
    let checkbox_input = document.querySelectorAll(`.${element.name}`);
    let count_checked = 0;
    let maxSelection = +element.option_str;

    element["value"].forEach(item => {
      if(item.value == "True") {
        count_checked++;
      }
    });

    if(count_checked >= maxSelection) {
      checkbox_input.forEach(item => {
        if (!item.checked) {
          item.disabled = true;
        }
      });
    } else {
      checkbox_input.forEach(item => {item.disabled = false;});
    }
  });
}

// ordseq :{
//   name: "ordseq",
//   cht: "序號",
//   value: "True",
// },
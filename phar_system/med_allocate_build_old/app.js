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

  await page_check_permissions("med_allocate");

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
  await set_main_diplay();

  // await set_select_pharmacy_option();

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
    h_title.innerHTML = "撥補建單";

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
async function set_main_diplay() {
  let main_div = document.getElementById("main_div");

  let main_form_container = document.createElement("div");
  main_form_container.classList.add("main_form_container");

  let form_input_content = document.createElement("div");
  form_input_content.classList.add("form_input_content");

  let pharmacy_table_data = await get_serversetting_by_type();
  console.log(pharmacy_table_data["Data"]);


  form_info_title.forEach(element => {
    let form_input_div = set_input_div(element, pharmacy_table_data["Data"]);

    form_input_content.appendChild(form_input_div);
  });

  let form_btn_container = document.createElement("div");
  form_btn_container.classList.add("form_btn_container");

  let submit_btn = document.createElement("div");
  submit_btn.classList.add("submit_btn");
  submit_btn.classList.add("btn");
  submit_btn.innerHTML = "建單";
  submit_btn.addEventListener("click", () => {
    submit_form();
  });

  let clean_btn = document.createElement("div");
  clean_btn.classList.add("clean_btn");
  clean_btn.classList.add("btn");
  clean_btn.innerHTML = "清空";
  clean_btn.addEventListener("click", () => {
    clean_form();
  });
  
  form_btn_container.appendChild(submit_btn);
  form_btn_container.appendChild(clean_btn);

  main_form_container.appendChild(form_input_content);
  main_form_container.appendChild(form_btn_container);

  main_div.appendChild(main_form_container);
}

function set_input_div(element, phar_data) {
  let form_input_div = document.createElement("div");
  form_input_div.classList.add("form_input_div");

  switch (element.value) {
    case "name":
        console.log(medicine_page.Data);
        let name_input = document.createElement("input");
        name_input.classList.add("input_style");
        name_input.id = element.value;
        name_input.name = element.value;
        name_input.type = "text";
        name_input.maxLength = "60";
        name_input.addEventListener("input", (e) => {
          set_choose_item(e);
        });
        name_input.addEventListener("blur", () => {
          setTimeout(() => {          
            let name_choose_div = document.querySelector(".name_choose_div");
            name_choose_div.style.display = "none";
          }, 100);
        });

        let name_label = document.createElement("label");
        name_label.setAttribute("for", element.value);
        name_label.innerHTML = "藥名";

        form_input_div.appendChild(name_input);
        form_input_div.appendChild(name_label);
        
        let name_choose_div = document.createElement("div");
        name_choose_div.classList.add("name_choose_div");
        name_choose_div.classList.add("choose_div");

        form_input_div.appendChild(name_choose_div);
      break;

    case "code":
        let code_input = document.createElement("input");
        code_input.classList.add("input_style");
        code_input.id = element.value;
        code_input.code = element.value;
        code_input.type = "text";
        code_input.maxLength = "20";
        code_input.addEventListener("input", (e) => {
          set_choose_item(e);
        });
        code_input.addEventListener("blur", () => {
          setTimeout(() => {          
            let code_choose_div = document.querySelector(".code_choose_div");
            code_choose_div.style.display = "none";
          }, 100);
        });

        let code_label = document.createElement("label");
        code_label.setAttribute("for", element.value);
        code_label.innerHTML = "藥碼";

        form_input_div.appendChild(code_input);
        form_input_div.appendChild(code_label);

        let code_choose_div = document.createElement("div");
        code_choose_div.classList.add("code_choose_div");
        code_choose_div.classList.add("choose_div");

        form_input_div.appendChild(code_choose_div);
      break;

    case "skdiacode":
        let skdiacode_input = document.createElement("input");
        skdiacode_input.classList.add("input_style");
        skdiacode_input.id = element.value;
        skdiacode_input.skdiacode = element.value;
        skdiacode_input.type = "text";
        skdiacode_input.maxLength = "20";
        skdiacode_input.addEventListener("input", (e) => {
          set_choose_item(e);
        });
        skdiacode_input.addEventListener("blur", () => {
          setTimeout(() => {          
            let skdiacode_choose_div = document.querySelector(".skdiacode_choose_div");
            skdiacode_choose_div.style.display = "none";
          }, 100);
        });

        let skdiacode_label = document.createElement("label");
        skdiacode_label.setAttribute("for", element.value);
        skdiacode_label.innerHTML = "料號";

        form_input_div.appendChild(skdiacode_input);
        form_input_div.appendChild(skdiacode_label);

        let skdiacode_choose_div = document.createElement("div");
        skdiacode_choose_div.classList.add("skdiacode_choose_div");
        skdiacode_choose_div.classList.add("choose_div");

        form_input_div.appendChild(skdiacode_choose_div);
      break;

    case "sourceStoreType":
        let sourceStoreType_select = document.createElement("select");
        sourceStoreType_select.id = element.value;
        sourceStoreType_select.classList.add("select_style");
        sourceStoreType_select.innerHTML = `<option value="藥庫">藥庫</option>`;
        phar_data.forEach(element => {
          sourceStoreType_select.innerHTML += `<option value="${element.name}">${element.name}</option>`;
        });

        let sourceStoreType_label = document.createElement("div");
        sourceStoreType_label.classList.add("select_label_style");
        sourceStoreType_label.innerHTML = "來源庫別";

        form_input_div.appendChild(sourceStoreType_select);
        form_input_div.appendChild(sourceStoreType_label);
      break;

    case "destinationStoreType":
      let destinationStoreType_select = document.createElement("select");
      destinationStoreType_select.id = element.value;
      destinationStoreType_select.classList.add("select_style");

      // 設定預設目的庫別
      let index = phar_data.findIndex(item => item.name === "共用區");
      if (index !== -1) {
          // 將找到的物件取出
          let obj = phar_data.splice(index, 1)[0];
          // 把物件插入到陣列的第一個位置
          phar_data.unshift(obj);
      };

      phar_data.forEach(element => {
        destinationStoreType_select.innerHTML += `<option value="${element.name}">${element.name}</option>`;
      });
      destinationStoreType_select.innerHTML += `<option value="藥庫">藥庫</option>`;

      let destinationStoreType_label = document.createElement("div");
      destinationStoreType_label.classList.add("select_label_style");
      destinationStoreType_label.innerHTML = "目的庫別";

      form_input_div.appendChild(destinationStoreType_select);
      form_input_div.appendChild(destinationStoreType_label);
      break;

    case "issuedQuantity":
        let issuedQuantity_input = document.createElement("input");
        issuedQuantity_input.classList.add("input_style");
        issuedQuantity_input.id = element.value;
        issuedQuantity_input.issuedQuantity = element.value;
        issuedQuantity_input.type = "number";
        issuedQuantity_input.maxLength = "20";

        let issuedQuantity_label = document.createElement("label");
        issuedQuantity_label.setAttribute("for", element.value);
        issuedQuantity_label.innerHTML = "撥發量";

        form_input_div.appendChild(issuedQuantity_input);
        form_input_div.appendChild(issuedQuantity_label);
      break;
  
    default:
      break;
  }

  return form_input_div
}

function set_choose_item(params) {
  let target = params.target.id;
  let value = params.target.value;
  let choose_div = document.querySelectorAll(".choose_div");
  choose_div.forEach(element => {
    element.innerHTML = "";
  });
  if(value == "") return;
  let name_input = document.querySelector("#name");
  let code_input = document.querySelector("#code");
  let skdiacode_input = document.querySelector("#skdiacode");
  let main_choose_div = document.querySelector(`.${target}_choose_div`);

  console.log(target);
  console.log(value);
  console.log(main_choose_div);

  main_choose_div.style.display = "block";

  let temp_med_data_filter_lock = medicine_page["Data"].filter(e => {
    return e.FILE_STATUS != "關檔中";
  });

  let temp_med_data = temp_med_data_filter_lock.filter(e => {
    return e[`${target.toUpperCase()}`].toUpperCase().includes(value.toUpperCase());
  });

  console.log(temp_med_data);

  temp_med_data.forEach(element => {
    let choose_item = document.createElement("div");
    choose_item.innerHTML = element[`${target.toUpperCase()}`];
    choose_item.addEventListener("click", () => {
      name_input.value = element.NAME;
      code_input.value = element.CODE;
      skdiacode_input.value = element.SKDIACODE;

      main_choose_div.style.display = "none";
    });

    main_choose_div.appendChild(choose_item);
  });
}

async function submit_form() {
  let name_input = document.querySelector("#name");
  let code_input = document.querySelector("#code");
  let skdiacode_input = document.querySelector("#skdiacode");
  let issuedQuantity_input = document.querySelector("#issuedQuantity");
  let sourceStoreType_input = document.querySelector("#sourceStoreType");
  let destinationStoreType_input = document.querySelector("#destinationStoreType");

  let name_value = name_input.value;
  let code_value = code_input.value;
  let issuedQuantity_value = issuedQuantity_input.value;
  let sourceStoreType_value = sourceStoreType_input.value;
  let destinationStoreType_value = destinationStoreType_input.value;

  if(name_value == "") {
    alert("請 填入/帶入 藥名");
    return;
  };
  if(code_value == "") {
    alert("請 填入/帶入 藥碼");
    return;
  };
  if(issuedQuantity_value == "") {
    alert("請輸入 撥發量");
    return;
  };

  let loggedName = sessionStorage.getItem('loggedName');  
  let temp_post_data = {
    sourceStoreType: `${sourceStoreType_value}`,
    destinationStoreType: `${destinationStoreType_value}`,
    code: code_value,
    name: name_value,
    issuedQuantity: `${issuedQuantity_value}`,
    actualIssuedQuantity: "0",
    reportName: loggedName,
    state: "等待過帳",
  };

  // 藥碼、藥名、撥發量、實撥量預設0、目的庫別、來源庫別（藥庫）、狀態（等待過帳）reportName(建單人)
  console.log(temp_post_data);

  let return_data = await add_allocate_list(temp_post_data);
  console.log("return_data",return_data);
  if(return_data.Code == 200) {
    clean_form();
  } else {
    alert("建單失敗，請確認原因");
  }
}

function clean_form() {
  let name_input = document.querySelector("#name");
  let code_input = document.querySelector("#code");
  let skdiacode_input = document.querySelector("#skdiacode");
  let issuedQuantity_input = document.querySelector("#issuedQuantity");
  let sourceStoreType_input = document.querySelector("#sourceStoreType");
  let destinationStoreType_input = document.querySelector("#destinationStoreType");

  name_input.value = "";
  code_input.value = "";
  skdiacode_input.value = "";
  issuedQuantity_input.value = "";
  sourceStoreType_input.selectedIndex = 0;
  destinationStoreType_input.selectedIndex = 0;
}

async function get_serversetting_by_type() {
  let temp_data = await fetch(`${api_ip}api/ServerSetting/get_serversetting_by_type`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          Data: 
          {
              
          },
          ValueAry : 
          [
              "調劑台"
          ]
      }),
  })
  .then((response) => {
      return response.json();
  })

  return temp_data;
}
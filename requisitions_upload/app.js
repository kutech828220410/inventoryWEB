window.onload = load;
// window.addEventListener('resize', handleResize);
let base64_img = "";
let medicine_page = [];
let batch_id = "";
let batch_id_return = [];

let test_data = {
  Data: [
    {
      GUID: "41241234123fads",
      batch_id: "20241215142930",
      batch_num: "114241412",
      cht_name: "1040938300AC26萬克適錠60公絲28顆/盒",
      expirydate: "2027.01.22",
      name: "23274814 ARC0XIA 60MG 28'S/BX",
      po_num: "1131024001-10",
      qty: "540",
    },
  ],
  Code: 200,
  Result: "查無對應單號資料",
};

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

  await page_check_permissions("requisitions_upload");

  let rowNum = 1;
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);
  medicine_page = await get_medicine_cloud();
  medicine_page = medicine_page.Data;
  console.log(medicine_page);

  var loggedID = sessionStorage.getItem('loggedID');  
  var loggedName = sessionStorage.getItem('loggedName');  
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
    h_title.innerHTML = "單據辨識";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者 : ${test_user_data.name}`

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let header_btn_container = document.createElement("div");
    header_btn_container.classList = "header_btn_container";

    let header_recover_btn = document.createElement("div");
    header_recover_btn.classList.add("header_recover_btn");
    header_recover_btn.classList.add("btn");
    header_recover_btn.innerText = "恢復";

    let header_upload_img_btn = document.createElement("div");
    header_upload_img_btn.classList.add("header_upload_img_btn");
    header_upload_img_btn.classList.add("btn");
    header_upload_img_btn.innerText = "上傳圖片(限100張)";

    // 點擊 div 觸發 input
    header_upload_img_btn.addEventListener('click', () => {
      fileInput.click();
    });

    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput';
    fileInput.style.display = 'none';
    fileInput.multiple = true;
    fileInput.accept = 'image/*';

    // 將元素加入到 container
    header_btn_container.appendChild(header_upload_img_btn);
    header_btn_container.appendChild(header_recover_btn);
    header_btn_container.appendChild(fileInput);

    // 限制圖片上傳最多 100 張
    fileInput.addEventListener('change', async (event) => {
      Set_main_div_enable(true);
      const files = Array.from(event.target.files); // 轉換成陣列
      if (files.length > 100) {
          alert('最多只能上傳 100 張圖片！');
          
          // 保留前 100 張檔案
          const limitedFiles = files.slice(0, 100);
          const dataTransfer = new DataTransfer();
          limitedFiles.forEach(file => dataTransfer.items.add(file));
          
          // 更新 input 的檔案列表
          fileInput.files = dataTransfer.files;
      }

      if(batch_id == "") {
        batch_id = set_batch_id();
        anal_result_container_init();
      } 
      let arr_index = 0;

      for (let file of files) {
        // if (!file.type.startsWith("image/")) {
        //     console.log(`忽略非圖片檔案: ${file.name}`);
        //     continue;
        // }

        // 將圖片轉換成 Base64
        let base64 = await processImage(file);

        let post_data = {
            Data: [
                {
                    op_id: sessionStorage.getItem('loggedID'),
                    op_name: sessionStorage.getItem('loggedName'),
                    base64: base64,
                    batch_id: batch_id
                }
            ]
        };

        console.log(post_data);

        let return_data = await img_presave(post_data);
        console.log(return_data);
        return_data = return_data.Data[0];

        batch_id_return.push(return_data.GUID);

        const isLast = arr_index === files.length - 1; // 判斷是否為最後一項
        arr_index++;

        if(isLast) {
          for (let i = 0; i < batch_id_return.length; i++) {
            const element = batch_id_return[i];
            let anal_post_data = {
              ValueAry: [element]
            }
            console.log("anal_post_data", anal_post_data);

            let anal_return_data = await img_to_analysis(anal_post_data);
            console.log(anal_return_data);

            if(anal_return_data.Code == -200) {
              console.log("伺服器連接錯誤!", anal_return_data.Result);
            } else {
              set_anal_result_card(anal_return_data, i);
            }
          }
        }
      }

      Set_main_div_enable(false);
    });

    let header_logout_btn = document.createElement("div");
    header_logout_btn.classList.add("header_logout_btn");
    header_logout_btn.classList.add("btn");
    header_logout_btn.innerText = "登出";
    header_logout_btn.addEventListener("click", async () => {
      if (confirm("是否登出？")) {
        sessionStorage.removeItem("login_json");
        sessionStorage.removeItem("IC_SN");

        location.reload();
      }
    })

    header_btn_container.appendChild(header_logout_btn);

    header.appendChild(header_title_container);
    header.appendChild(header_btn_container);
    body.appendChild(header);
}

async function popup_login_finished() {
  console.log(`[${arguments.callee.name}]`);
}

function get_main_div() {
    let body = document.querySelector("body");
    const main_div = document.createElement("div");
    main_div.id = "main_div";
    main_div.className = "main_div";

    let top_btn_container = set_tb_btn_container();
    let anal_result_container = set_anal_result_container();
    let bottom_btn_container = set_tb_btn_container();
    
    main_div.appendChild(top_btn_container);
    main_div.appendChild(anal_result_container);
    main_div.appendChild(bottom_btn_container);
    body.appendChild(main_div);

    for (let i = 0; i < 3; i++) {
      set_anal_result_card(test_data, i);
    }
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

function set_tb_btn_container() {
  let tb_btn_container = document.createElement("div");
  tb_btn_container.classList.add("tb_btn_container");

  let clear_all_btn = document.createElement("div");
  clear_all_btn.classList.add("clear_all_btn");
  clear_all_btn.classList.add("btn");
  clear_all_btn.innerHTML = "重新導入";
  clear_all_btn.onclick = init_anal_result;

  let submit_all_btn = document.createElement("div");
  submit_all_btn.classList.add("submit_all_btn");
  submit_all_btn.classList.add("btn");
  submit_all_btn.innerHTML = "全部送出";
  submit_all_btn.onclick = submit_all_po;

  tb_btn_container.appendChild(clear_all_btn);
  tb_btn_container.appendChild(submit_all_btn);

  return tb_btn_container;
}
function set_anal_result_container() {
  let anal_result_container = document.createElement("div");
  anal_result_container.classList.add("anal_result_container");

  return anal_result_container
}
function anal_result_container_init() {
  let anal_result_container = document.querySelector(".anal_result_container");
  anal_result_container.innerHTML = "";
}

function set_anal_result_card(data, index) {
  console.log(data);
  let anal_result_container = document.querySelector(".anal_result_container");

  let temp_data = data.Data[0];

  let anal_card = document.createElement("div");
  anal_card.classList.add("anal_card");
  anal_card.classList.add(`anal_card_${index}`);
  anal_card.setAttribute("GUID", temp_data.GUID);
  anal_card.setAttribute("po_num", temp_data.po_num);
  anal_card.addEventListener("click", (e) => {
    e.preventDefault();
    trigger_popup_input_po_num(true);
  })
  
  if(data.Code == -1 || data.Code == -2) {
    if(data.Code == -1) anal_card.classList.add("bgc_red");
    if(data.Code == -2) anal_card.classList.add("bgc_yellow");

    let error_info = document.createElement("div");
    error_info.classList.add("error_info");
    error_info.innerHTML = data.Result;

    anal_card.appendChild(error_info);
    anal_result_container.appendChild(anal_card);
    return;
  } else {
    anal_card.classList.add("bgc_success");

    let card_name_info_container = document.createElement("div");
    card_name_info_container.classList.add("card_name_info_container");
  
    let card_name_container = document.createElement("div");
    card_name_container.classList.add("card_name_container");
    card_name_container.classList.add("card_info_container");
  
    let card_name_label = document.createElement("div");
    card_name_label.classList.add("card_name_label");
    card_name_label.classList.add("card_info_label");
    card_name_label.innerHTML = "(英)";
  
    let card_name = document.createElement("div");
    card_name.classList.add("card_name");
    card_name.classList.add("card_info");
    card_name.innerHTML = temp_data.name;
  
    card_name_container.appendChild(card_name_label);
    card_name_container.appendChild(card_name);
  
    card_name_info_container.appendChild(card_name_container);
  
    let card_cht_name_container = document.createElement("div");
    card_cht_name_container.classList.add("card_cht_name_container");
    card_cht_name_container.classList.add("card_info_container");
  
    let card_cht_name_label = document.createElement("div");
    card_cht_name_label.classList.add("card_cht_name_label");
    card_cht_name_label.classList.add("card_info_label");
    card_cht_name_label.innerHTML = "(中)";
  
    let card_cht_name = document.createElement("div");
    card_cht_name.classList.add("card_cht_name");
    card_cht_name.classList.add("card_info");
    card_cht_name.innerHTML = temp_data.cht_name;
  
    card_cht_name_container.appendChild(card_cht_name_label);
    card_cht_name_container.appendChild(card_cht_name);
  
    card_name_info_container.appendChild(card_cht_name_container);
  
    anal_card.appendChild(card_name_info_container);
  
    let card_med_content_info = document.createElement("div");
    card_med_content_info.classList.add("card_med_content_info");
  
    let card_op_num_container = document.createElement("div");
    card_op_num_container.classList.add("card_op_num_container");
    card_op_num_container.classList.add("card_info_container_2");
  
    let card_op_num_label = document.createElement("div");
    card_op_num_label.classList.add("card_op_num_label");
    card_op_num_label.classList.add("card_info_label");
    card_op_num_label.innerHTML = "請購單號";
  
    let card_op_num = document.createElement("div");
    card_op_num.classList.add("card_op_num");
    card_op_num.classList.add("card_info");
    card_op_num.innerHTML = temp_data.po_num;
  
    card_op_num_container.appendChild(card_op_num_label);
    card_op_num_container.appendChild(card_op_num);
  
    card_med_content_info.appendChild(card_op_num_container);
  
    let card_batch_num_container = document.createElement("div");
    card_batch_num_container.classList.add("card_batch_num_container");
    card_batch_num_container.classList.add("card_info_container_2");
  
    let card_batch_num_label = document.createElement("div");
    card_batch_num_label.classList.add("card_batch_num_label");
    card_batch_num_label.classList.add("card_info_label");
    card_batch_num_label.innerHTML = "批號";
  
    let card_batch_num = document.createElement("div");
    card_batch_num.classList.add("card_batch_num");
    card_batch_num.classList.add("card_info");
    card_batch_num.innerHTML = temp_data.batch_num;
  
    card_batch_num_container.appendChild(card_batch_num_label);
    card_batch_num_container.appendChild(card_batch_num);
  
    card_med_content_info.appendChild(card_batch_num_container);
  
    let card_expirydate_container = document.createElement("div");
    card_expirydate_container.classList.add("card_expirydate_container");
    card_expirydate_container.classList.add("card_info_container_2");
  
    let card_expirydate_label = document.createElement("div");
    card_expirydate_label.classList.add("card_expirydate_label");
    card_expirydate_label.classList.add("card_info_label");
    card_expirydate_label.innerHTML = "效期";
  
    let card_expirydate = document.createElement("div");
    card_expirydate.classList.add("card_expirydate");
    card_expirydate.classList.add("card_info");
    card_expirydate.innerHTML = temp_data.expirydate;
  
    card_expirydate_container.appendChild(card_expirydate_label);
    card_expirydate_container.appendChild(card_expirydate);
  
    card_med_content_info.appendChild(card_expirydate_container);
  
    let card_qty_container = document.createElement("div");
    card_qty_container.classList.add("card_qty_container");
    card_qty_container.classList.add("card_info_container_2");
  
    let card_qty_label = document.createElement("div");
    card_qty_label.classList.add("card_qty_label");
    card_qty_label.classList.add("card_info_label");
    card_qty_label.innerHTML = "數量";
  
    let card_qty = document.createElement("div");
    card_qty.classList.add("card_qty");
    card_qty.classList.add("card_info");
    card_qty.innerHTML = temp_data.qty;
  
    card_qty_container.appendChild(card_qty_label);
    card_qty_container.appendChild(card_qty);
  
    card_med_content_info.appendChild(card_qty_container);
  
    anal_card.appendChild(card_med_content_info);

    let card_btn_container = document.createElement("div");
    card_btn_container.classList.add("card_btn_container");
  
    let card_delete_btn = document.createElement("div");
    card_delete_btn.classList.add("card_delete_btn");
    card_delete_btn.classList.add("btn");
    card_delete_btn.innerHTML = "送出";
    card_delete_btn.setAttribute("guid", temp_data.GUID);

    let card_enter_btn = document.createElement("div");
    card_enter_btn.classList.add("card_enter_btn");
    card_enter_btn.classList.add("btn");
    card_enter_btn.innerHTML = "刪除";
    card_enter_btn.setAttribute("guid", temp_data.GUID);
  
    card_btn_container.appendChild(card_enter_btn);
    card_btn_container.appendChild(card_delete_btn);

    anal_card.appendChild(card_btn_container)
  
    anal_result_container.appendChild(anal_card);
    return;
  }
}
function init_anal_result() {
  anal_result_container_init();
  batch_id = "";
  batch_id_return = [];
}
async function submit_all_po() {
  if(batch_id_return.length == 0) {
    alert("尚未辨識任何單據");
    return;
  }
  let anal_card = document.querySelectorAll(".anal_card");
  anal_card.forEach(element => {
    let guid = element.getAttribute("GUID");
    let po_num = element.getAttribute("po_num");
    if(po_num) {
      // 送出驗收單api放這
      batch_id_return = batch_id_return.splice(batch_id_return.indexOf(guid), 1);
    }
  });

  for (let i = 0; i < batch_id_return.length; i++) {
    const element = batch_id_return[i];
    let anal_post_data = {
      ValueAry: [element]
    }
    console.log("anal_post_data", anal_post_data);

    let anal_return_data = await img_to_analysis(anal_post_data);
    console.log(anal_return_data);

    if(anal_return_data.Code == -200) {
      console.log("伺服器連接錯誤!", anal_return_data.Result);
    } else {
      set_anal_result_card(anal_return_data, i);
    }
  }
}

function set_batch_id() {
  let now = new Date();

  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份補零
  let day = String(now.getDate()).padStart(2, '0');        // 日期補零
  let hour = String(now.getHours()).padStart(2, '0');      // 小時補零（24 小時制）
  let minute = String(now.getMinutes()).padStart(2, '0');  // 分鐘補零
  let second = String(now.getSeconds()).padStart(2, '0');  // 秒數補零

  return `${year}${month}${day}${hour}${minute}${second}`;
}
async function processImage(file) {
  return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              // 設定轉換為 JPG 格式
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              // 以 JPG 格式輸出，並轉換成 Base64
              const base64 = canvas.toDataURL("image/jpeg", 0.8); // 壓縮品質 0.8
              resolve(base64);
          };
      };

      // 如果是 PNG 或 HEIC，讀取後再轉換
      reader.readAsDataURL(file);
  });
}
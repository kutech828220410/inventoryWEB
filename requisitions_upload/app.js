window.onload = load;
// window.addEventListener('resize', handleResize);
let base64_img = "";

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

    header.appendChild(header_title_container);
    header.appendChild(header_btn_container);
    body.appendChild(header);
}
function get_main_div() {
    let body = document.querySelector("body");
    const main_div = document.createElement("div");
    main_div.id = "main_div";
    main_div.className = "main_div";

    let upload_container = set_taking_pic_div();
    let notice_container = set_notice_container();
    let display_img_container = set_display_container();
    let upload_btn = set_upload_btn();

    main_div.appendChild(upload_container);
    main_div.appendChild(notice_container);
    main_div.appendChild(display_img_container);
    main_div.appendChild(upload_btn);

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
function set_taking_pic_div() {
  let upload_img_container = document.createElement("div");
  upload_img_container.classList.add("upload_img_container");

  let pic_input = document.createElement("input");
  pic_input.id = "pic_input";
  pic_input.name = "pic_input";
  pic_input.type = "file";
  pic_input.accept = "image/*";
  pic_input.setAttribute('capture', '');
  pic_input.onchange = (e) => {
    previewImage(e);
    let upload_btn = document.querySelector(".upload_btn");
    upload_btn.classList.remove("unable_btn");
  };

  let take_pic_label = document.createElement("label");
  take_pic_label.classList.add("take_pic_label");
  take_pic_label.classList.add("btn");
  take_pic_label.setAttribute("for", "pic_input");
  take_pic_label.innerHTML = "拍照";

  upload_img_container.appendChild(pic_input);
  upload_img_container.appendChild(take_pic_label);

  return upload_img_container;
}
function set_notice_container() {
  let notice_container = document.createElement("div");
  notice_container.classList.add("notice_container");

  let notice_content = document.createElement("div");
  notice_content.classList.add("notice_content");
  notice_content.innerHTML = `
    拍照小技巧：將相機的左上角、左下角貼齊單據，保持裝置垂直方向
    </br>
    請將單據照片的<span>左上方、右上方、左下方、右下方</span>對齊紅點
  `;

  notice_container.appendChild(notice_content);

  return notice_container;
}
function set_display_container() {
  let display_container = document.createElement("div");
  display_container.classList.add("display_container");

  let display_img = document.createElement("img");
  display_img.classList.add("display_img");
  display_img.id = "display_img";

  display_container.appendChild(display_img);

  for (let i = 0; i < 4; i++) {
    let location_point = document.createElement("div");
    location_point.classList.add("location_point");
    location_point.classList.add(`l_${i}`);

    display_container.appendChild(location_point);
  }

  return display_container
}
function previewImage(event) {
  let file = event.target.files[0];
  // 確認input是否有上傳檔案
  if (!file) return;

  let img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    let MAX_PIXELS = 3145728; // 3,145,728 pixels => 2048px x 1536px
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    
    let width = img.width;
    let height = img.height;
    let pixels = width * height;

    if (pixels > MAX_PIXELS) {
        // Adjust the size to maintain the 3:4 aspect ratio
        let aspectRatio = 3 / 4;
        if (width / height > aspectRatio) {
            width = Math.sqrt(MAX_PIXELS * aspectRatio);
            height = width / aspectRatio;
        } else {
            height = Math.sqrt(MAX_PIXELS / aspectRatio);
            width = height * aspectRatio;
        }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    base64_img = canvas.toDataURL('image/jpeg');
    let display_img = document.getElementById('display_img');
    display_img.src = base64_img;
  };

}
function set_upload_btn() {
  let upload_btn = document.createElement("div");
  upload_btn.classList.add("upload_btn");
  upload_btn.classList.add("unable_btn");
  upload_btn.classList.add("btn");
  upload_btn.innerHTML = "上傳";

  upload_btn.addEventListener("click", async e => {
    if(e.target.classList.contains("unable_btn")) {
      alert("請先將單據拍照後進行確認");
      return;
    } else {
      let loggedID = sessionStorage.getItem('loggedID');
      let loggedName = sessionStorage.getItem('loggedName');
      
      if(!loggedID) {
        alert("未登入使用者，請先登入後再進行操作");
        return;
      }

      let post_data = {
        Data: [
          {
            op_id: loggedID,
            op_name: loggedName,
            base64: base64_img
          }
        ]
      };

      console.log(post_data);
      let responce = await upload_img_to_analysis(post_data);
      console.log(responce);

      set_analysis_result(responce);
    }
  });

  return upload_btn;
}

async function set_analysis_result(data) {
  let info_data = data.Data[0];
  if(data == undefined || data.Code == -200) {
    alert("Oops！資料發生不可預期的錯誤");
    return;
  }
  if(data.Result == "AI辨識未啟動") {
    alert("請聯絡工程師確認軟體運行狀況");
    return;
  }

  let dateTime = info_data.expirydate;
  let dateOnly = dateTime.split(' ')[0];

  let prc_code_content = document.querySelector("#prc_code_content");
  let prc_name_content = document.querySelector("#prc_name_content");
  let prc_cht_name_content = document.querySelector("#prc_cht_name_content");
  let prc_deadtime_input = document.querySelector("#prc_deadtime_input");
  let prc_qty_input = document.querySelector("#prc_qty_input");
  let prc_batch_num_input = document.querySelector("#prc_batch_num_input");
  let prc_list_num_input = document.querySelector("#prc_list_num_input");
  let prc_cancel_btn = document.querySelector(".prc_cancel_btn");
  let prc_double_confirm_btn = document.querySelector(".prc_double_confirm_btn");
  
  let pcc_code_input = document.querySelector("#pcc_code_input");
  let pcc_name_content = document.querySelector("#pcc_name_content");
  let pcc_cht_name_content = document.querySelector("#pcc_cht_name_content");
  let pcc_code_compare_confirm_btn = document.querySelector(".pcc_code_compare_confirm_btn");
  let pcc_h_close_btn = document.querySelector(".pcc_h_close_btn");
  
  prc_code_content.innerHTML = info_data.code;
  prc_name_content.innerHTML = info_data.name;
  prc_cht_name_content.innerHTML = info_data.cht_name;
  prc_deadtime_input.value = dateOnly;
  prc_qty_input.value = info_data.qty;
  prc_batch_num_input.value = info_data.batch_num;
  prc_list_num_input.value = info_data.po_num;
  prc_cancel_btn.setAttribute("guid", info_data.GUID);
  prc_double_confirm_btn.setAttribute("guid", info_data.GUID);
  
  pcc_name_content.innerHTML = info_data.name;
  pcc_cht_name_content.innerHTML = info_data.cht_name;
  pcc_code_compare_confirm_btn.setAttribute("guid", info_data.GUID);
  pcc_h_close_btn.setAttribute("guid", info_data.GUID);
  prc_cancel_btn.setAttribute("guid", info_data.GUID);

  popup_result_confirm_div_open();

  if(prc_deadtime_input.value == "") prc_deadtime_input.classList.add("border_red");
  if(prc_qty_input.value == "") prc_qty_input.classList.add("border_red");
  if(prc_batch_num_input.value == "") prc_batch_num_input.classList.add("border_red");
  if(prc_list_num_input.value == "") prc_list_num_input.classList.add("border_red");

  if(info_data.code == "") {
    console.log("開啟code比對輸入");
    popup_code_compare_div_open();
  }
}
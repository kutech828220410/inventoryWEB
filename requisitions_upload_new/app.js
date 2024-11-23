let base64_data = ""; // 儲存 Base64 格式影像資料的變數
let stream;
let isRunning = true;
let temp_guid = "";
let isExpanded = false; // 是否展開
let startY = 0; // 觸摸起點 Y

window.onload = load;
// window.addEventListener('resize', handleResize);
let base64_img = "";
let medicine_page = [];
let info_arr = [
  "藥碼","藥名(英)","藥名(中)","數量","效期","批號","單號",
]

function handleResize() 
{
   //Set_popup_find_position();
}
async function load()
{
  let temp_str = window.location.protocol;
  console.log("https", temp_str.includes("s"));
  if (!temp_str.includes("s")) {
    alert("連線協議非https，無法使用");
    window.location.href = "../../frontpage";
  };

  if(!isMobileOrTablet()) {
    alert("請使用行動裝置");
    window.location.href = "../../frontpage";
  };

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
   
 
  createUpdatedUI();

  // nav_bar_create("requisitions_upload", test_user_data);
  // 啟動相機
  await startCamera();

  
  let triggerButton = document.querySelector('.trigger');
  // 按下按鈕後執行擷取影像
  triggerButton.addEventListener('click', () => {
    captureAndSend();
  });
  

  Set_main_div_enable(false);
  // show_result_div(true);
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

async function startCamera() {
  const videoElement = document.getElementById("steam_container");
  const canvas = document.querySelector(".draw_canvas");
  const context = canvas.getContext("2d");

  try {
    // 啟用相機
    videoElement.setAttribute("playsinline", "true");
    videoElement.muted = true;

    // 請求相機，指定高解析度
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { ideal: 4032 }, // 指定寬度
        height: { ideal: 3024 } // 指定高度
      }
    });

    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
      videoElement.play();
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // 開始以20fps繪製到畫布
      animationFrameId = setInterval(() => drawToCanvas(), 1000 / 20);
    };
  } catch (error) {
    alert("無法啟動相機:", error);
    console.error("無法啟動相機:", error);
  }
}

function drawToCanvas() {
  const videoElement = document.getElementById("steam_container");
  const canvas = document.querySelector(".draw_canvas");
  const context = canvas.getContext("2d");

  if (videoElement.readyState === 4) {
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  }
}

async function captureAndSend() {
  let result_container = document.querySelector(".result_container");

  if(result_container.classList.contains("show_result_container")) return;

  const videoElement = document.getElementById("steam_container");
  const canvas = document.querySelector(".draw_canvas");
  const context = canvas.getContext("2d");

  // 停止實時畫面展示
  clearInterval(animationFrameId);

  // 調整畫布大小到 4032x3024 並將畫面定格
  canvas.width = 4032;
  canvas.height = 3024;
  
  context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight, 0, 0, canvas.width, canvas.height);

  // 將成像轉為 base64 格式
  base64_data = canvas.toDataURL("image/jpeg");
  console.log("Base64 Data Captured:", base64_data);

  // 停止相機
  stopCamera();

  // 將 base64 資料傳送到後端
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
        base64: base64_data
      }
    ]
  };

  console.log(post_data);
  let return_data = await upload_img_to_analysis(post_data);
  console.log("辨識結果:", return_data);

  if(return_data.Code == 200) {
    renderResult(return_data.Data);
  } else {
    console.log(return_data);
  }
}

function stopCamera() {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    stream = null;
  }
  console.log("相機已停止");
}

// function sendToAPI(base64Image) {
//   fetch("/api/recognize", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ image: base64Image })
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log("辨識結果:", data);
//       renderResult(data);
//     })
//     .catch(error => {
//       console.error("API 請求失敗:", error);
//       // startCamera();
//       temp_guid = "";
//       console.log("asdf");
//       renderResult("");
//     });
// }

// 這邊把辨識結果執行
function renderResult(data) {
  const resultContainer = document.querySelector(".draw_result");
  resultContainer.innerHTML = ""; // 清空結果
  // resultContainer.textContent = JSON.stringify(data, null, 2); // 顯示辨識結果

  let temp_data = data[0];

  temp_guid = temp_data.GUID;

  let med_code = document.querySelector("#code");
  let med_name = document.querySelector("#name");
  let med_cht_name = document.querySelector("#cht_name");
  let med_qty = document.querySelector("#qty");
  let med_deadtime = document.querySelector("#deadtime");
  let med_batch_num = document.querySelector("#cht_name");
  let med_order_num = document.querySelector("#order_num");

  med_code.value = temp_data.code;
  med_name.value = temp_data.name;
  med_cht_name.value = temp_data.cht_name;
  med_qty.value = temp_data.qty;
  med_deadtime.value = temp_data.expirydate;
  med_batch_num.value = temp_data.batch_num;
  med_order_num.value = temp_data.po_num;

  let re_name = document.querySelector(".re_name");

  if(temp_data.code = "") {
    re_name.classList.remove("unable_btn");
    temp_data.code.innerHTML = "資料庫比對";
  } else {
    re_name.classList.add("unable_btn");
    temp_data.code.innerHTML = "比對成功";
  }

  show_result_div(true);
}

function createUpdatedUI() {
  const mainDiv = document.createElement("div");
  mainDiv.className = "main";

  // Draw container
  const drawContainer = document.createElement("div");
  drawContainer.className = "draw_container";

  const videoElement = document.createElement("video");
  videoElement.id = "steam_container";
  videoElement.src = "";
  videoElement.muted = true;
  videoElement.autoplay = true;

  const canvasElement = document.createElement("canvas");
  canvasElement.className = "draw_canvas";

  const drawResult = document.createElement("div");
  drawResult.className = "draw_result";

  drawContainer.append(videoElement, canvasElement, drawResult);

  // Trigger container
  const triggerContainer = document.createElement("div");
  triggerContainer.className = "tigger_container";

  const triggerDiv = document.createElement("div");
  triggerDiv.className = "trigger";

  let trigger_homepage = document.createElement("div");
  trigger_homepage.classList.add("trigger_homepage");
  trigger_homepage.innerHTML = `<img src="../../image/home_white.png" alt="">`;
  trigger_homepage.addEventListener("click", () => {
    window.location.href = '../../frontpage';
  })

  let trigger_reset = document.createElement("div");
  trigger_reset.classList.add("trigger_reset");
  trigger_reset.innerHTML = `<img src="../../image/reset_white.png" alt="">`;
  trigger_reset.addEventListener("click", async () => {
    show_result_div(false);
    result_div_init();
    await startCamera();
  })

  triggerContainer.appendChild(trigger_homepage);
  triggerContainer.appendChild(triggerDiv);
  triggerContainer.appendChild(trigger_reset);

  // Result container
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result_container");

  const scrollBar = document.createElement("div");
  scrollBar.className = "srcoll_bar";
  scrollBar.innerHTML = "<div></div>";

  // 滑動展開 srcollBar
  scrollBar.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY; // 記錄觸摸起點 Y
  });

  scrollBar.addEventListener("touchmove", (e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    
    if (deltaY < -20 && !isExpanded) {
      // 向上滑動展開
      resultContainer.classList.add("expanded");
      isExpanded = true;
    } else if (deltaY > 20 && isExpanded) {
      // 向下滑動收合
      resultContainer.classList.remove("expanded");
      isExpanded = false;
    }
  });

  const medInfoContainer = document.createElement("div");
  medInfoContainer.className = "med_info_container";

  const medInfoDiv = document.createElement("div");
  medInfoDiv.className = "med_info";

  const createLabelInputPair = (labelText, inputId, maxLength, disabled) => {
    const label = document.createElement("label");
    label.htmlFor = inputId;
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = "text";
    input.id = inputId;
    input.maxLength = maxLength;

    if(disabled) {
      input.disabled = true;
    }

    return [label, input];
  };

  // Add medicine info inputs
  const medInfoPairs = [
    ["藥碼", "code", 20],
    ["藥名(英)", "name", 60],
    ["藥名(中)", "cht_name", 40],
  ];
  medInfoPairs.forEach(([label, id, maxLength]) => {
    const [labelElement, inputElement] = createLabelInputPair(label, id, maxLength, true);
    medInfoDiv.append(labelElement, inputElement);
  });

  const reNameButton = document.createElement("div");
  reNameButton.className = "re_name btn";
  reNameButton.textContent = "資料庫比對";
  // reNameButton.className = "re_name btn unable_btn";
  // reNameButton.textContent = "比對成功";
  reNameButton.addEventListener('click', () => {
    if(reNameButton.classList.contains("unable_btn")) return

    popup_code_compare_div_open();
  })

  medInfoContainer.append(medInfoDiv, reNameButton);

  const listInfoContainer = document.createElement("div");
  listInfoContainer.className = "list_info_container";

  // Add list info inputs
  const listInfoPairs = [
    ["數量", "qty", 40],
    ["效期", "deadtime", 40],
    ["批號", "batch_num", 40],
    ["單號", "order_num", 40],
  ];
  listInfoPairs.forEach(([label, id, maxLength]) => {
    const [labelElement, inputElement] = createLabelInputPair(label, id, maxLength, false);
    listInfoContainer.append(labelElement, inputElement);
  });

  const listCheckContainer = document.createElement("div");
  listCheckContainer.className = "list_check_container";

  const listCheckButton = document.createElement("div");
  listCheckButton.className = "list_check btn";
  listCheckButton.textContent = "送出";
  listCheckButton.addEventListener("click", async () => {
    if(temp_guid == "") {
      alert("無請購單資料");
      return;
    }

    let med_code = document.querySelector("#code");
    let med_name = document.querySelector("#name");
    let med_cht_name = document.querySelector("#cht_name");
    let med_qty = document.querySelector("#qty");
    let med_deadtime = document.querySelector("#deadtime");
    let med_batch_num = document.querySelector("#cht_name");
    let med_order_num = document.querySelector("#order_num");

    let post_data = {
      Data: [
        {
          GUID: temp_guid,
          batch_num: med_batch_num.value,
          po_num: med_order_num.value,
          qty: med_qty.value,
          expirydate: med_deadtime.value,
          code: med_code.innerHTML,
          name: med_name.innerHTML,
          cht_name: med_cht_name.innerHTML
        }
      ]  
    };

    console.log(post_data);

    let res_data = await update_textvision(post_data);
    if(res_data.Code == 200) {
        alert("寫入成功");
        show_result_div(false);
        result_div_init();
        await startCamera();
    } else {
      alert("寫入失敗，請確認伺服器狀態");
    }
    return;
  });

  const listRetryButton = document.createElement("div");
  listRetryButton.className = "list_retry btn";
  listRetryButton.textContent = "重新辨識";
  listRetryButton.addEventListener("click", async () => {
    if(temp_guid == "") {
      alert("無請購單資料");
      return;
    }

    if(confirm("取消辨識結果?")) {
      console.log("這裡放取消辨識的API，並刪除DB資料");

      let post_data = {
          ValueAry: [temp_guid]
      };

      console.log(post_data);

      let res_data = await delete_textVision(post_data);
      console.log(res_data);
      if(res_data.Code == 200) {
        console.log("刪除辨識資料");
      } else {
        alert("刪除辨識資料失敗");
      }

      show_result_div(false);
      result_div_init();
      await startCamera();
    }
    return;
  });

  listCheckContainer.append(listCheckButton, listRetryButton);

  resultContainer.append(scrollBar, medInfoContainer, listInfoContainer, listCheckContainer);

  // Append everything to the main div
  mainDiv.append(drawContainer, triggerContainer, resultContainer);

  // Append to the body or a specific container
  document.body.appendChild(mainDiv);
}

function isMobileOrTablet() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 檢查常見行動裝置的 User Agent 關鍵字
  const mobileKeywords = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|Windows Phone|Kindle|Silk|Mobile|PlayBook|iPad/i;

  // 使用 navigator.userAgentData 判斷行動裝置（部分新版瀏覽器支援）
  const isMobileDevice = navigator.userAgentData?.mobile;

  // 判斷是否是 iPad（包括 iPad Air 和 iPad Pro），並考慮 Chrome 模擬環境特徵
  const isIPad = /iPad/i.test(userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || 
                 (navigator.platform === 'MacIntel' && screen.width >= 820 && screen.width <= 1366) || 
                 /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;

  // 綜合判斷是否為行動裝置或平板
  const result = mobileKeywords.test(userAgent) || isMobileDevice || isIPad;

  // 加入 console.log 來顯示判斷信息
  console.log("User Agent:", userAgent);
  console.log("Platform:", navigator.platform);
  console.log("Screen Width:", screen.width);
  console.log("Max Touch Points:", navigator.maxTouchPoints);
  console.log("是否判定為行動裝置或平板:", result);

  return result;
}

function show_result_div(boolean) {
  let result_container = document.querySelector(".result_container");
  if(boolean) {
    result_container.classList.add("show_result_container");
  } else {
    result_container.classList.remove("expanded");
    isExpanded = false;
    result_container.classList.remove("show_result_container");
  }
}

function result_div_init() {
  let med_code = document.querySelector("#code");
  let med_name = document.querySelector("#name");
  let med_cht_name = document.querySelector("#cht_name");
  let med_qty = document.querySelector("#qty");
  let med_deadtime = document.querySelector("#deadtime");
  let med_batch_num = document.querySelector("#cht_name");
  let med_order_num = document.querySelector("#order_num");

  temp_guid = "";

  med_code.value = "";
  med_name.value = "";
  med_cht_name.value = "";
  med_qty.value = "";
  med_deadtime.value = "";
  med_batch_num.value = "";
  med_order_num.value = "";
}
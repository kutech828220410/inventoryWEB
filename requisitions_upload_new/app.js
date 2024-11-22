let base64_data = ""; // 儲存 Base64 格式影像資料的變數
let stream;
let isRunning = true;
let temp_guid = "";

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
  if(!isMobileOrTablet()) {
    alert("請使用行動裝置");
    window.location.href = "../../frontpage";
  }

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

function captureAndSend() {
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
  sendToAPI(base64_data);
}

function stopCamera() {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    stream = null;
  }
  console.log("相機已停止");
}

function sendToAPI(base64Image) {
  fetch("/api/recognize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image })
  })
    .then(response => response.json())
    .then(data => {
      console.log("辨識結果:", data);
      renderResult(data);
    })
    .catch(error => {
      console.error("API 請求失敗:", error);
      // startCamera();
      temp_guid = "";
    });
}

// 這邊把辨識結果執行
function renderResult(data) {
  const resultContainer = document.querySelector(".draw_result");
  resultContainer.innerHTML = ""; // 清空結果
  resultContainer.textContent = JSON.stringify(data, null, 2); // 顯示辨識結果
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

  triggerContainer.appendChild(triggerDiv);

  // Result container
  const resultContainer = document.createElement("div");
  resultContainer.className = "result_container";

  const scrollBar = document.createElement("div");
  scrollBar.className = "srcoll_bar";

  const medInfoContainer = document.createElement("div");
  medInfoContainer.className = "med_info_container";

  const medInfoDiv = document.createElement("div");
  medInfoDiv.className = "med_info";

  const createLabelInputPair = (labelText, inputId, maxLength) => {
    const label = document.createElement("label");
    label.htmlFor = inputId;
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = "text";
    input.id = inputId;
    input.maxLength = maxLength;

    return [label, input];
  };

  // Add medicine info inputs
  const medInfoPairs = [
    ["藥碼", "code", 20],
    ["藥名(英)", "name", 60],
    ["藥名(中)", "cht_name", 40],
  ];
  medInfoPairs.forEach(([label, id, maxLength]) => {
    const [labelElement, inputElement] = createLabelInputPair(label, id, maxLength);
    medInfoDiv.append(labelElement, inputElement);
  });

  const reNameButton = document.createElement("div");
  reNameButton.className = "re_name btn unable_btn";
  // reNameButton.textContent = "資料庫比對";
  reNameButton.textContent = "比對成功";

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
    const [labelElement, inputElement] = createLabelInputPair(label, id, maxLength);
    listInfoContainer.append(labelElement, inputElement);
  });

  const listCheckContainer = document.createElement("div");
  listCheckContainer.className = "list_check_container";

  const listCheckButton = document.createElement("div");
  listCheckButton.className = "list_check btn";
  listCheckButton.textContent = "送出";

  const listRetryButton = document.createElement("div");
  listRetryButton.className = "list_retry btn";
  listRetryButton.textContent = "重新辨識";

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
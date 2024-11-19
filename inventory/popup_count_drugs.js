let steam = null; // 用來儲存相機串流
let captureIntervalId; // 用於控制每秒15張
let resultPollingId;
let isRunning = true;
let drugs_counts = 0; // 用於輪詢AI辨識結果
let count_done = "";
let border_color = [
    "#FF0000",  // 紅色 (強烈的暖色)
    "#00FF00",  // 綠色 (鮮明的對比)
    "#0000FF",  // 藍色 (冷色)
    "#FFFF00",  // 黃色 (暖色)
    "#00FFFF",  // 藍綠色 (冷色)
    "#FF00FF",  // 品紅色 (強烈對比)
    "#FFA500",  // 橙色 (暖色)
    "#800080",  // 紫色 (冷色)
    "#FFC0CB",  // 粉紅色 (柔和但對比明顯)
    "#A52A2A"   // 棕色 (暖色)
];
let test_data = {
    Data: [
        {
            type: "A",
            qty: "2",
            value: [
                {
                    width: "30",
                    height: "30",
                    center: "400,500",
                    score:"0.9"
                },
                {
                    width: "30",
                    height: "30",
                    center: "300,500",
                    score:"0.9"
                }
            ]
        },
        {
            type: "B",
            qty: "2",
            value: [
                {
                    width: "25",
                    height: "25",
                    center: "800,800",
                    score:"0.9"
                },
                {
                    width: "25",
                    height: "25",
                    center: "200,200",
                    score:"0.9"
                }
            ]
        }
    ],
    Result:"操作時間"
};

function isMobileOrTablet() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // 檢查常見行動裝置的 User Agent 關鍵字
    const mobileKeywords = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|Windows Phone|Kindle|Silk|Mobile|PlayBook/i;

    // 使用 navigator.userAgentData 判斷行動裝置（部分新版瀏覽器支援）
    const isMobileDevice = navigator.userAgentData?.mobile;

    // 判斷 iPad 的條件，包括 iPad 在桌面模式下的特徵
    const isIPad = /iPad/i.test(userAgent) || 
                   (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                   (navigator.platform === 'MacIntel' && screen.width <= 1024);

    // 綜合判斷行動裝置或平板
    const result = mobileKeywords.test(userAgent) || isMobileDevice || isIPad;

    // 加入 console.log 來顯示判斷信息
    console.log("User Agent:", userAgent);
    console.log("Platform:", navigator.platform);
    console.log("Screen Width:", screen.width);
    console.log("是否判定為行動裝置或平板:", result);

    return result;
}


function set_popup_container() {
    let popup_count_drugs_div = document.createElement("div");
    popup_count_drugs_div.classList.add("popup_count_drugs_div");

    let popup_count_drugs_container = document.createElement("div");
    popup_count_drugs_container.classList.add("popup_count_drugs_container");

    let ppcd_video_container = document.createElement("div");
    ppcd_video_container.classList.add("ppcd_video_container");


    let ppcd_video = document.createElement("video");
    ppcd_video.classList.add("ppcd_video");
    ppcd_video.autoplay = true;

    let ppcd_canvas = document.createElement("canvas");
    ppcd_canvas.classList.add("ppcd_canvas");

    let ppcd_result_container = document.createElement("div");
    ppcd_result_container.classList.add("ppcd_result_container");  
    
    let ppcd_video_top = document.createElement("div");
    ppcd_video_top.classList.add("ppcd_video_top");

    let ppcd_video_main_zone = document.createElement("div");
    ppcd_video_main_zone.classList.add("ppcd_video_main_zone");

    let main_zone_target = document.createElement("div");
    main_zone_target.classList.add("main_zone_target");

    ppcd_video_main_zone.appendChild(main_zone_target);
    ppcd_video_main_zone.appendChild(ppcd_canvas);
    ppcd_video_main_zone.appendChild(ppcd_result_container);
    
    let ppcd_video_bottom = document.createElement("div");
    ppcd_video_bottom.classList.add("ppcd_video_bottom");
    ppcd_video_bottom.innerHTML = "請將藥品對準紅匡<br>或者 將藥盤填滿畫面";

    ppcd_video_container.appendChild(ppcd_video_top);
    ppcd_video_container.appendChild(ppcd_video_main_zone);
    ppcd_video_container.appendChild(ppcd_video_bottom);

    ppcd_video_container.appendChild(ppcd_video);
    // ppcd_video_container.appendChild(ppcd_canvas);


    let ppcd_pic_trigger_container = document.createElement("div");
    ppcd_pic_trigger_container.classList.add("ppcd_pic_trigger_container");

    let ppcd_pic_drug_type = document.createElement("div");
    ppcd_pic_drug_type.classList.add("ppcd_pic_drug_type");

    let ppcd_pic_trigger = document.createElement("div");
    ppcd_pic_trigger.classList.add("ppcd_pic_trigger");
    ppcd_pic_trigger.innerHTML = "輸入盤點";
    ppcd_pic_trigger.addEventListener("click", async () => {
        await enter_count_result();
    });

    let ppcd_pic_qty = document.createElement("div");
    ppcd_pic_qty.classList.add("ppcd_pic_qty");


    ppcd_pic_trigger_container.appendChild(ppcd_pic_drug_type);
    ppcd_pic_trigger_container.appendChild(ppcd_pic_trigger);
    ppcd_pic_trigger_container.appendChild(ppcd_pic_qty);


    let ppcd_h_close_btn = document.createElement("img");
    ppcd_h_close_btn.classList.add("ppcd_h_close_btn");
    ppcd_h_close_btn.src = "../image/close.png";
    ppcd_h_close_btn.addEventListener("click", () => {
        tigger_count_drugs_container(false);
    });

    popup_count_drugs_container.appendChild(ppcd_video_container);
    popup_count_drugs_container.appendChild(ppcd_pic_trigger_container);
    popup_count_drugs_container.appendChild(ppcd_h_close_btn);

    popup_count_drugs_div.appendChild(popup_count_drugs_container);

    document.body.appendChild(popup_count_drugs_div);
}

function tigger_count_drugs_container(boolean) {
    let popup_count_drugs_div = document.querySelector(".popup_count_drugs_div");
    if(boolean) {
        popup_count_drugs_div.style.display = "flex";
        startCamera();
    } else {
        popup_count_drugs_div.style.display = "none";
        stopAllProcesses();
    }
}

let animationFrameId;

async function startCamera() {
    const videoElement = document.querySelector(".ppcd_video");
    const canvas = document.querySelector(".ppcd_canvas");
    const context = canvas.getContext("2d");

    isRunning = true;
  
    try {
      videoElement.setAttribute("playsinline", "true");
      videoElement.muted = true;
  
      // 啟動相機，設定分辨率
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
  
      videoElement.srcObject = stream;
  
      videoElement.onloadedmetadata = () => {
        videoElement.play();
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
  
        // 每秒15張
        captureIntervalId = setInterval(() => drawToCanvas(), 1000 / 15);
  
        // 開始AI辨識輪詢
        setTimeout(() => captureImage(), 500); // 首次延遲0.5秒
      };
    } catch (error) {
      console.error("無法啟動相機:", error);
    }
}
  
function drawToCanvas() {
    const videoElement = document.querySelector(".ppcd_video");
    const canvas = document.querySelector(".ppcd_canvas");
    const context = canvas.getContext("2d");

    if (videoElement.readyState === 4) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    }   
}
  
function captureImage() {
    if (!isRunning) return;
    const videoElement = document.querySelector(".ppcd_video");
    const canvas = document.createElement("canvas");
    const size = Math.min(videoElement.videoWidth, videoElement.videoHeight);
    canvas.width = 960;
    canvas.height = 960;
    const context = canvas.getContext("2d");

    // 中心裁切並縮放至960x960
    const sx = (videoElement.videoWidth - size) / 2;
    const sy = (videoElement.videoHeight - size) / 2;
    context.drawImage(videoElement, sx, sy, size, size, 0, 0, 960, 960);

    const base64Image = canvas.toDataURL("image/jpeg");

    console.log(
        JSON.stringify(
            {
                Data:[
                    { 
                        base64: "base64Image"
                    }
                ]
            }
        )
    );
    // 將圖片傳遞給後端
    fetch(`${api_ip}api/medCount/medCountAnalyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                Data:[
                    { 
                        base64: base64Image
                    }
                ]
            }
        )
    })
    .then(response => response.json())
    .then(data => handleRecognitionResult(data))
    .catch(error => {
        // console.error("辨識失敗:", error);
        if (isRunning) {
            // console.log(test_data);
            // handleRecognitionResult(test_data);
            setTimeout(() => captureImage(), 500); // 繼續輪詢
        }
    });
}
  
function handleRecognitionResult(data) {
    if (!isRunning) return; // 停止時直接返回

    console.log(data);
    drugs_counts = 0;
    if (data.Code == 200) {
        renderResult(data.Data);
        //   stopAllProcesses(); // 停止API輪詢與相機
        captureImage();
    } else {
        // captureImage();
        setTimeout(() => captureImage(), 500); // 繼續輪詢
    }
}
  
function renderResult(data) {
    let container = document.querySelector(".ppcd_result_container");
    let ppcd_pic_drug_type = document.querySelector(".ppcd_pic_drug_type");
    let ppcd_pic_qty = document.querySelector(".ppcd_pic_qty");

    container.innerHTML = ""; // 清除先前的結果
    ppcd_pic_drug_type.innerHTML = "";
    ppcd_pic_qty.innerHTML = "";

    let data_index = data.length - 1;
    count_done = false;

    data.forEach((item, index) => {
        let color = border_color[index % border_color.length];
        item.value.forEach(value => {
            let { width, height, center } = value;
            let [centerX, centerY] = center.split(",").map(Number);

            let div = document.createElement("div");
            div.className = "ppcd_result_block";
            div.style.position = "absolute";
            div.style.border = `1px solid ${color}`;
            div.style.width = `${(width / 960) * container.offsetWidth}px`;
            div.style.height = `${(height / 960) * container.offsetHeight}px`;
            div.style.left = `${(centerX / 960) * container.offsetWidth - div.style.width.replace("px", "") / 2}px`;
            div.style.top = `${(centerY / 960) * container.offsetHeight - div.style.height.replace("px", "") / 2}px`;

            drugs_counts += 1;

            container.appendChild(div);
        });
        if(index == data_index) {
            count_done = true;
        }
    });

    ppcd_pic_drug_type.innerHTML = `藥丸外型:${data.length}`;
    ppcd_pic_qty.innerHTML = `總量:${drugs_counts}`;
}
  
function stopAllProcesses() {
    let container = document.querySelector(".ppcd_result_container");
    let ppcd_pic_drug_type = document.querySelector(".ppcd_pic_drug_type");
    let ppcd_pic_qty = document.querySelector(".ppcd_pic_qty");

    container.innerHTML = "";
    ppcd_pic_drug_type.innerHTML = "";
    ppcd_pic_qty.innerHTML = "";

    console.log(drugs_counts);
    drugs_counts = 0;
    isRunning = false; // 停止API輪詢
    count_done = "";

    // 停止影像更新
    clearInterval(captureIntervalId);

    // 釋放相機資源
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
    }

    console.log("所有進程已停止");
}

async function enter_count_result() {
    if(count_done) {
        let END_QTY_input = document.querySelector('#END_QTY_input_popup_input');
        let GUID = popup_input_div_Content.GUID;
        let CODE = popup_input_div_Content.CODE;
        let END_QTY = drugs_counts;
    
        END_QTY_input.value = '';
        let OP = sessionData.Name;

        sub_content_add(GUID , END_QTY , OP, CODE);
        hide_popup_input();
        tigger_count_drugs_container(false);
        return;
    } else if(!count_done) {
        alert("計算更新中，請稍後");
        return;
    } else {
        console.log("沒有開始計算");
        return;
    }
}
  
// 監聽頁面關閉事件
window.addEventListener("beforeunload", stopAllProcesses);

// 監聽頁面可見性變化（例如切換到其他頁面時）
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopAllProcesses();
    }
});

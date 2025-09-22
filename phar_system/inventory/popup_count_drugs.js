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

    let ppcd_perf_btn = document.createElement("div");
    ppcd_perf_btn.classList.add("ppcd_perf_btn");
    ppcd_perf_btn.addEventListener("click", () => {
        let ppcd_perf_div = document.querySelector(".ppcd_perf_div");
        if(ppcd_perf_div.classList.contains("display_none")) {
            ppcd_perf_div.classList.remove("display_none");
        } else {
            ppcd_perf_div.classList.add("display_none");
        }
    });

    ppcd_video_top.appendChild(ppcd_perf_btn);

    let ppcd_video_main_zone = document.createElement("div");
    ppcd_video_main_zone.classList.add("ppcd_video_main_zone");

    let main_zone_target = document.createElement("div");
    main_zone_target.classList.add("main_zone_target");

    // ppcd_video_main_zone.appendChild(main_zone_target);
    ppcd_video_main_zone.appendChild(ppcd_canvas);
    ppcd_video_main_zone.appendChild(ppcd_result_container);
    
    let ppcd_video_bottom = document.createElement("div");
    ppcd_video_bottom.classList.add("ppcd_video_bottom");

    let ppcd_perf_draw_time = document.createElement("div");
    ppcd_perf_draw_time.classList.add("ppcd_perf_time");
    ppcd_perf_draw_time.classList.add("ppcd_perf_draw_time");
    ppcd_perf_draw_time.innerHTML = '繪製圖片:';

    let ppcd_perf_api_time = document.createElement("div");
    ppcd_perf_api_time.classList.add("ppcd_perf_time");
    ppcd_perf_api_time.classList.add("ppcd_perf_api_time");
    ppcd_perf_api_time.innerHTML = 'API呼叫:';

    let ppcd_perf_result_time = document.createElement("div");
    ppcd_perf_result_time.classList.add("ppcd_perf_time");
    ppcd_perf_result_time.classList.add("ppcd_perf_result_time");
    ppcd_perf_result_time.innerHTML = '結果輸出:';

    // let ppcd_perf_canvas_time = document.createElement("div");
    // ppcd_perf_canvas_time.classList.add("ppcd_perf_time");
    // ppcd_perf_canvas_time.classList.add("ppcd_perf_canvas_time");
    // ppcd_perf_canvas_time.innerHTML = 'Canvas繪圖:';

    // let ppcd_perf_base64_time = document.createElement("div");
    // ppcd_perf_base64_time.classList.add("ppcd_perf_time");
    // ppcd_perf_base64_time.classList.add("ppcd_perf_base64_time");
    // ppcd_perf_base64_time.innerHTML = 'canvase轉base64:';

    let ppcd_perf_total_time = document.createElement("div");
    ppcd_perf_total_time.classList.add("ppcd_perf_time");
    ppcd_perf_total_time.classList.add("ppcd_perf_total_time");
    ppcd_perf_total_time.innerHTML = '總時長:';

    let ppcd_perf_url = document.createElement("div");
    ppcd_perf_url.classList.add("ppcd_perf_time");
    ppcd_perf_url.classList.add("ppcd_perf_url");
    ppcd_perf_url.innerHTML = `ai:${ai_api_ip}`;

    let ppcd_perf_div = document.createElement("div");
    ppcd_perf_div.classList.add("ppcd_perf_div");
    ppcd_perf_div.classList.add("display_none");

    // ppcd_perf_div.appendChild(ppcd_perf_canvas_time);
    // ppcd_perf_div.appendChild(ppcd_perf_base64_time);
    ppcd_perf_div.appendChild(ppcd_perf_draw_time);
    ppcd_perf_div.appendChild(ppcd_perf_api_time);
    ppcd_perf_div.appendChild(ppcd_perf_result_time);
    ppcd_perf_div.appendChild(ppcd_perf_total_time);
    ppcd_perf_div.appendChild(ppcd_perf_url);

    ppcd_video_bottom.appendChild(ppcd_perf_div);

    ppcd_video_container.appendChild(ppcd_video_top);
    ppcd_video_container.appendChild(ppcd_video_main_zone);
    ppcd_video_container.appendChild(ppcd_video_bottom);

    ppcd_video_container.appendChild(ppcd_video);
    // ppcd_video_container.appendChild(ppcd_canvas);


    let ppcd_pic_trigger_container = document.createElement("div");
    ppcd_pic_trigger_container.classList.add("ppcd_pic_trigger_container");

    let ppcd_pic_result_container = document.createElement("div");
    ppcd_pic_result_container.classList.add("ppcd_pic_result_container");

    let ppcd_pic_drug_type = document.createElement("div");
    ppcd_pic_drug_type.classList.add("ppcd_pic_drug_type");

    let ppcd_pic_qty = document.createElement("div");
    ppcd_pic_qty.classList.add("ppcd_pic_qty");

    ppcd_pic_result_container.appendChild(ppcd_pic_drug_type);
    ppcd_pic_result_container.appendChild(ppcd_pic_qty);

    let ppcd_pic_trigger = document.createElement("div");
    ppcd_pic_trigger.classList.add("ppcd_pic_trigger");
    ppcd_pic_trigger.innerHTML = "";
    ppcd_pic_trigger.addEventListener("click", async () => {
        await enter_count_result();
    });

    let ppcd_training_trigger = document.createElement("div");
    ppcd_training_trigger.classList.add("ppcd_training_trigger");
    ppcd_training_trigger.innerHTML = "採樣上傳";
    ppcd_training_trigger.addEventListener("click", async() => {
        await enter_count_training();
    })

    ppcd_pic_trigger_container.appendChild(ppcd_pic_result_container);
    ppcd_pic_trigger_container.appendChild(ppcd_pic_trigger);
    ppcd_pic_trigger_container.appendChild(ppcd_training_trigger);


    let ppcd_h_close_btn = document.createElement("img");
    ppcd_h_close_btn.classList.add("ppcd_h_close_btn");
    ppcd_h_close_btn.src = "../image/cancel_white.png";
    ppcd_h_close_btn.addEventListener("click", () => {
        tigger_count_drugs_container(false);
    });

    popup_count_drugs_container.appendChild(ppcd_video_container);
    popup_count_drugs_container.appendChild(ppcd_pic_trigger_container);
    popup_count_drugs_container.appendChild(ppcd_h_close_btn);

    let popup_count_drugs_notice_div = document.createElement("div");
    popup_count_drugs_notice_div.classList.add("popup_count_drugs_notice_div");
    popup_count_drugs_notice_div.innerHTML = '已加入';

    popup_count_drugs_div.appendChild(popup_count_drugs_container);
    popup_count_drugs_div.appendChild(popup_count_drugs_notice_div);

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
let steam = null; // 用來儲存相機串流
let captureIntervalId; // 用於控制每秒15張
let resultPollingId;
let isRunning = true;
let drugs_counts = 0; // 用於輪詢AI辨識結果
let count_done = "";
let training_64;
let hideTimeout;

let capture_sp;
let capture_ep;
let capture_time;

let api_sp;
let api_ep;
let api_time;

let handle_sp;
let handle_ep;
let handle_time;

let canvas_sp;
let canvas_ep;
let canvas_time;

let base64_sp;
let base64_ep;
let base64_time;

async function startCamera() {
    const videoElement = document.querySelector(".ppcd_video");
    const canvas = document.querySelector(".ppcd_canvas");
    const context = canvas.getContext("2d");

    isRunning = true;
  
    try {
      videoElement.setAttribute("playsinline", "true");
      videoElement.muted = true;
  
      // 請求相機，指定高解析度
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 4032 }, // 指定寬度
          height: { ideal: 3024 }, // 指定高度
          frameRate: { ideal: 30, max: 120 },
        }
      });
  
      videoElement.srcObject = stream;
  
      videoElement.onloadedmetadata = () => {
        setTimeout(() => videoElement.play(), 100);
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
  
        // 每秒15張
        // captureIntervalId = setInterval(() => drawToCanvas(), 1000 / 15);
  
        // 開始AI辨識輪詢
        setTimeout(() => captureImage(), 300); // 首次延遲0.5秒
      };
    } catch (error) {
        alert("無法啟動相機:", error);
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

    // AI訓練截圖
    const canvas_1 = document.createElement("canvas");
    const size = Math.min(videoElement.videoWidth, videoElement.videoHeight);
    canvas_1.width = 960;
    canvas_1.height = 960;
    const context_1 = canvas_1.getContext("2d");

    // 中心裁切並縮放至960x960
    const sx = (videoElement.videoWidth - size) / 2;
    const sy = (videoElement.videoHeight - size) / 2;
    context_1.drawImage(videoElement, sx, sy, size, size, 0, 0, 960, 960);

    const base64Image = canvas_1.toDataURL("image/jpeg");
    training_64 = base64Image;
}

function getTimestampFilename() {
  const now = new Date();

  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(2, "0"); // 毫秒(兩位數)

  // 檔名格式：YYYYMMDD_HH-mm-ss-ss.jpg
  return `${yyyy}${MM}${dd}_${HH}-${mm}-${ss}-${ms}.jpg`;
}

function captureImage() {
    if (!isRunning) return;
    const videoElement = document.querySelector(".ppcd_video");
    const canvas = document.createElement("canvas");
    const size = Math.min(videoElement.videoWidth, videoElement.videoHeight);
    canvas.width = 960;
    canvas.height = 960;
    const context = canvas.getContext("2d");
    
    capture_sp = performance.now();
    // 中心裁切並縮放至960x960
    const sx = (videoElement.videoWidth - size) / 2;
    const sy = (videoElement.videoHeight - size) / 2;
    context.drawImage(videoElement, sx, sy, size, size, 0, 0, 960, 960);
    
    capture_ep = performance.now();
    capture_time = capture_ep - capture_sp;
    console.log("傳圖繪製", capture_time, "ms");

    api_sp = performance.now();
    // `${api_ip}api/medCount/medCountAnalyze`;
    console.log("辨識AI api_url", ai_api_ip);


    // 轉成 JPG Blob
    // canvas.toBlob(async (blob) => {
    //     const formData = new FormData();
    //     let frontEndCountDrug = getTimestampFilename();
    //     formData.append("file", blob, frontEndCountDrug);

    //     try {
    //         const res = await fetch(ai_api_ip, {
    //             method: "POST",
    //             body: formData, // 不用設 Content-Type，瀏覽器會自動帶上 multipart/form-data
    //         });

    //         const data = await res.json();
    //         handleRecognitionResult(data);
    //     } catch (err) {
    //         console.error("辨識失敗:", err);  
    //         api_ep = performance.now();
    //         api_time = api_ep - api_sp;
    //         console.log("api時間：", api_time, "ms");
    //         performance_result();
    //         if (isRunning) {
    //             // console.log(test_data);
    //             // handleRecognitionResult(test_data);
    //             // captureImage();
    //             setTimeout(() => captureImage(), 500); // 繼續輪詢
    //         }  
    //     }
    // }, "image/jpeg", 0.9);

    // base64解法
    // let temp_test = "https://www.kutech.tw:3000/pill_rec_fast";

    fetch(ai_api_ip, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                Data:[
                    { 
                        base64: canvas.toDataURL("image/jpeg")
                    }
                ],
                Value: "",

            }
        )
    })
    .then(response => response.json())
    .then(data => handleRecognitionResult(data))
    .catch(error => {
        console.error("辨識失敗:", error);
        api_ep = performance.now();
        api_time = api_ep - api_sp;
        console.log("api時間：", api_time, "ms");
        performance_result();
        if (isRunning) {
            // console.log(test_data);
            // handleRecognitionResult(test_data);
            captureImage();
            // setTimeout(() => captureImage(), 500); // 繼續輪詢
        }
    });

    training_64 = canvas.toDataURL("image/jpeg");
}
  
function handleRecognitionResult(data) {
    if (!isRunning) return; // 停止時直接返回

    api_ep = performance.now();
    api_time = api_ep - api_sp;
    console.log("api時間：", api_time, "ms");

    handle_sp = performance.now();
    
    console.log(data);
    drugs_counts = 0;
    if (data.Code == 200) {
        renderResult(data.Data);
        handle_ep = performance.now();
        handle_time = handle_ep - handle_sp;
        console.log("框框時間：", handle_time, "ms");
        //   stopAllProcesses(); // 停止API輪詢與相機
        performance_result();
        captureImage();
    } else {
        handle_ep = performance.now();
        handle_time = handle_ep - handle_sp;

        let container = document.querySelector(".ppcd_result_container");
        container.innerHTML = ""; // 清除先前的結果

        drugs_counts = 0;
        let ppcd_pic_qty = document.querySelector(".ppcd_pic_qty");
        ppcd_pic_qty.innerHTML = `總量:${drugs_counts}`;

        console.log("框框時間：", handle_time, "ms");
        performance_result();
        captureImage();
        // setTimeout(() => captureImage(), 500); // 繼續輪詢
        drugs_counts = 0;
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

            // div.innerHTML = "+";
            // div.style.fontSize = "16px";
            // div.style.color = `${color}`;

            div.style.width = `10px`;
            div.style.height = `10px`;
            div.style.borderRadius = `50%`;
            div.style.backgroundColor = `${color}`;

            // div.style.border = `1px solid ${color}`;
            // div.style.width = `${(width / 960) * container.offsetWidth}px`;
            // div.style.height = `${(height / 960) * container.offsetHeight}px`;

            // div.style.border = `1px solid ${color}`;
            // div.style.width = `20px`;
            // div.style.height = `20px`;

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
    console.log("三小", drugs_counts);
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

// 確認相機畫面盤點
async function enter_count_result() {
    const videoElement = document.querySelector(".ppcd_video");
    const canvas = document.querySelector(".ppcd_canvas");
    const context = canvas.getContext("2d");

    drawToCanvas();
    // 停止實時畫面展示
    clearInterval(captureIntervalId);

    // 抓去當下畫面
    const size = Math.min(videoElement.videoWidth, videoElement.videoHeight);
    canvas.width = 960;
    canvas.height = 960;

    // 中心裁切並縮放至960x960
    const sx = (videoElement.videoWidth - size) / 2;
    const sy = (videoElement.videoHeight - size) / 2;
    context.drawImage(videoElement, sx, sy, size, size, 0, 0, 960, 960);

    // const base64Image = canvas.toDataURL("image/jpeg");

    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
    }

    let return_data = await pic_analyze_api(canvas.toDataURL("image/jpeg"), "");

    console.log("辨識trigger", return_data.Data);
    drugs_counts = 0;
    if (return_data.Code == 200) {
        console.log("近來數數");
        renderResult(return_data.Data);
        console.log('數完', drugs_counts);
    } else {
        alert(`辨識錯誤，重新開始辨識${return_data.Result}`);
        stopAllProcesses();
        setTimeout(() => startCamera(), 500);
        return;
    }

    if(confirm(`辨識數量: ${drugs_counts}，是否正確?`)) {
        let END_QTY_input_popup_input = document.querySelector('#END_QTY_input_popup_input');
        let GUID = popup_input_div_Content.GUID;
        let CODE = popup_input_div_Content.CODE;
        let END_QTY = drugs_counts;

        if(+END_QTY == 0) {
            alert("沒有辨識到藥品，請持續辨識");
            return
        }

        // END_QTY_input_popup_input.value = '';
        let OP = sessionData.Name;

        let temp_str = END_QTY_input_popup_input.value;
        let input_lastChar = "";

        if(temp_str == "") {
            END_QTY_input_popup_input.value = END_QTY;
        } else {
            input_lastChar = END_QTY_input_popup_input.value.slice(-1);
            let isSymbol = ["+", "-", "*"].includes(input_lastChar);
            if(isSymbol) {
                temp_str += END_QTY;
            } else {
                temp_str += `+${+END_QTY}`;
            }
            END_QTY_input_popup_input.value = temp_str;
        }

        // sub_content_add(GUID , temp_sum , OP, CODE);
        // hide_popup_input();
        tigger_count_drugs_container(false);
        return;
    } else {
        await pic_analyze_api(canvas.toDataURL("image/jpeg"), "True");
        stopAllProcesses();
        setTimeout(() => startCamera(), 500);
        return;
    }
}

// 輸入AI學習
async function enter_count_training() {
    let return_data = await pic_analyze_api(training_64, "True");
    if(return_data.Code == 200 || return_data["Result"].includes("AI辨識失敗")) {
        display_notice_func(true, "");
    } else {
        display_notice_func(false, return_data.Result);
    }

    console.log("====================================================");
    console.log(return_data);
    return;
}

async function pic_analyze_api(base64_data, training_trigger) {
    // 將圖片傳遞給後端
    // ${api_ip}api/medCount/medCountAnalyze
    // https://6d2f-220-135-128-247.ngrok-free.app/Pill_recognition
    // https://ai.kutech.tw:3200/Pill_recognition
    let temp_url;
    
    if(training_trigger =="True") {
        temp_url = `${api_ip}api/medCount/medCountAnalyze`;
        console.log("採樣上傳", temp_url);
    } else {
        temp_url = ai_api_ip;
        console.log("一般辨識", temp_url);
    }
    let return_data = await fetch(temp_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                Data:[
                    { 
                        base64: base64_data
                    }
                ],
                Value: training_trigger,

            }
        )
    })
    .then(response => {
        return response.json()
    }).catch(error => {
        console.error("錯誤 : ", error);
        let temp_err = {
            Data:[],
            Code: -200,
            Result: error
        }
        return temp_err
    });

    return return_data;
}
function display_notice_func(boolean, str) {
    let notice = document.querySelector(".popup_count_drugs_notice_div");
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }

    if(boolean) {
        notice.style.backgroundColor = "#00b718";
        notice.innerHTML = "已加入";
    } else {
        notice.style.backgroundColor = "#b72800";
        notice.innerHTML = `存入失敗：\n${str}`;
    }

    // 將通知從上方移到畫面內
    notice.style.top = "60px";

    // 設定 3 秒後將通知移回上方隱藏
    hideTimeout = setTimeout(() => {
    notice.style.top = "-40px";
    }, 3000);
}
  
// 監聽頁面關閉事件
window.addEventListener("beforeunload", stopAllProcesses);

// 監聽頁面可見性變化（例如切換到其他頁面時）
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopAllProcesses();
    }
});

function performance_result() {
    // if(canvas_time) {
    //     let ppcd_perf_canvas_time = document.querySelector(".ppcd_perf_canvas_time");
    //     ppcd_perf_canvas_time.innerHTML = `Canvas繪圖: ${canvas_time}ms`;
    // }

    // if(base64_time) {
    //     let ppcd_perf_base64_time = document.querySelector(".ppcd_perf_base64_time");
    //     ppcd_perf_base64_time.innerHTML = `canvase轉base64: ${base64_time}ms`;
    // }

    if(capture_time) {
        let ppcd_perf_draw_time = document.querySelector(".ppcd_perf_draw_time");
        ppcd_perf_draw_time.innerHTML = `繪製圖片: ${capture_time.toFixed(1)}ms`;
    }

    if(api_time) {
        let ppcd_perf_api_time = document.querySelector(".ppcd_perf_api_time");
        ppcd_perf_api_time.innerHTML = `API呼叫: ${api_time.toFixed(1)}ms`;
    }

    if(handle_time) {
        let ppcd_perf_result_time = document.querySelector(".ppcd_perf_result_time");
        ppcd_perf_result_time.innerHTML = `結果輸出: ${handle_time.toFixed(1)}ms`;

        let temp_total_time = capture_time + api_time + handle_time;
        let ppcd_perf_total_time = document.querySelector(".ppcd_perf_total_time");
        ppcd_perf_total_time.innerHTML = `總時長: ${temp_total_time.toFixed(1)}ms`;
    } else {
        let ppcd_perf_result_time = document.querySelector(".ppcd_perf_result_time");
        ppcd_perf_result_time.innerHTML = `結果輸出:`;

        let temp_total_time = capture_time + api_time;
        let ppcd_perf_total_time = document.querySelector(".ppcd_perf_total_time");
        ppcd_perf_total_time.innerHTML = `總時長: ${temp_total_time.toFixed(1)}ms`;
    }

    let ppcd_perf_url = document.querySelector(".ppcd_perf_url");
    ppcd_perf_url.innerHTML = `ai_url: ${ai_api_ip}`;
}

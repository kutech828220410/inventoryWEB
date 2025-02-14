let popup_retake_div;
let stream;

async function get_popup_retake()
{
    popup_retake_div = new Basic_popup_Div('popup_retake_div','popup_retake_div','','');
    popup_retake_div._popup_div.style.border = '10px solid white';

    let header = get_ppr_header();
    let main = await get_ppr_main();
    let footer = get_ppr_footer();

    popup_retake_div.AddControl(header);
    popup_retake_div.AddControl(main);
    popup_retake_div.AddControl(footer);

    return popup_retake_div;
};
function get_ppr_header() {
    let ppr_header_container = document.createElement("div");
    ppr_header_container.classList.add("ppr_header_container");

    // let ppr_h_title = document.createElement("div");
    // ppr_h_title.classList.add("ppr_h_title");
    // ppr_h_title.innerText = "重新拍照";

    let ppr_h_close_btn = document.createElement("img");
    ppr_h_close_btn.classList.add("ppr_h_close_btn");
    ppr_h_close_btn.src = "../image/cancel_white.png";
    ppr_h_close_btn.addEventListener("click", () => {
        popup_retake_div_close();
    });

    // ppr_header_container.appendChild(ppr_h_title);
    ppr_header_container.appendChild(ppr_h_close_btn);

    return ppr_header_container;
}
async function get_ppr_main() {
    let ppr_main_container = document.createElement("div");
    ppr_main_container.classList.add("ppr_main_container");

    // Create video element
    const video = document.createElement('video');
    video.id = 'video';
    video.autoplay = true;
    video.playsInline = true;
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    ppr_main_container.appendChild(video);
    ppr_main_container.appendChild(canvas);

    return ppr_main_container;
}
function get_ppr_footer() {
    let ppr_footer_container = document.createElement("div");
    ppr_footer_container.classList.add("ppr_footer_container");

    let ppr_f_retake_btn = document.createElement("div");
    ppr_f_retake_btn.classList.add("ppr_f_retake_btn");
    ppr_f_retake_btn.addEventListener("click", async () => {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        let ppr_header_container = document.querySelector(".ppr_header_container");
        let guid = ppr_header_container.getAttribute("guid");
        const ctx = canvas.getContext('2d');
        if (!stream) return;

        // Set canvas size to match video resolution
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame onto the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas content to Base64
        const base64Image = canvas.toDataURL('image/jpeg');

        console.log('Captured Base64 Image:', base64Image);
        switch_video_canvas_display("");

        // Stop the camera
        stopCamera();
        Set_main_div_enable(true);

        let post_data = {
            ValueAry: [
                guid,
                base64Image
            ]
        }
        console.log("更新圖片post", post_data);
        let return_data = await update_pic_by_GUID(post_data);
        if(return_data.Code == -200) {
            alert(`${return_data.Result}`);
            Set_main_div_enable(false);
            return;
        }
        console.log("更新圖片return", return_data);

        post_data = {
            ValueAry:[guid]
        };

        console.log(post_data);
        return_data = await img_to_analysis(post_data);

        if(return_data.Data[0].Code_status == 200 || return_data.Data[0].Code_status == -5 || return_data.Data[0].Code_status == -4 || return_data.Data[0].Code_status == -2 || return_data.Data[0].Code_status == -1) {
            let card_container = document.querySelector(`.card_container[guid="${guid}"]`);

            if(return_data.Data[0].Code_status == -5 || return_data.Data[0].Code_status == -4 || return_data.Data[0].Code_status == -2 || return_data.Data[0].Code_status == -1) {
                alert(`${return_data.Data[0].Result}`);
                switch_video_canvas_display("video");
                startCamera();
                Set_main_div_enable(false);
                return;
            }
            console.log("以圖片更新", return_data);
            orgin_list_data = change_object_by_GUID(orgin_list_data, return_data);
        
            update_card(card_container, return_data.Data[0]);

            popup_retake_div_close();
        } else {
            alert("更新失敗，請確認伺服器狀態");
            console.error(return_data.Result);
            switch_video_canvas_display("video");
            startCamera();
        }

        Set_main_div_enable(false);
    });

    ppr_footer_container.appendChild(ppr_f_retake_btn);

    return ppr_footer_container;
}
function popup_retake_div_close() {
    let ppr_header_container = document.querySelector(".ppr_header_container");
    ppr_header_container.setAttribute("GUID", "");
    popup_retake_div.Set_Visible(false);
    stopCamera();
}
function popup_retake_div_open(GUID) {
    switch_video_canvas_display("video");
    let ppr_header_container = document.querySelector(".ppr_header_container");
    ppr_header_container.setAttribute("GUID", GUID);
    startCamera();
    popup_retake_div.Set_Visible(true);
}

async function startCamera() {
    let video = document.getElementById('video');
    video.setAttribute("playsinline", "true");
    video.muted = true;

    try {
        // 檢查瀏覽器是否支援 getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('您的瀏覽器不支援相機功能。');
            popup_retake_div_close();
            return;
        }

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 4000 }, // Request the maximum width
                height: { ideal: 3000 }, // Request the maximum height
                frameRate: { max: 60 },
            }
        });
        video.srcObject = stream;
    } catch (error) {
        alert('無法啟動相機，請確認是否已授權使用相機');
        console.error('Error accessing the camera:', error);
        popup_retake_div_close();
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}
function switch_video_canvas_display(str) {
    if(str == 'video') {
        document.getElementById('video').style.display = 'block';
        document.getElementById('canvas').style.display = 'none';
    } else {
        document.getElementById('video').style.display = 'none';
        document.getElementById('canvas').style.display = 'block';
    }
}
let popup_update_info_div;

function get_popup_update_info() {
    popup_update_info_div = new Basic_popup_Div('popup_update_info_div','popup_update_info_div','','');
    popup_update_info_div._popup_div.style.border = '10px solid white';

    let header = get_pp_update_info_header();
    let main = get_pp_update_info_main();
    let footer = get_pp_update_info_footer();

    popup_update_info_div.AddControl(header);
    popup_update_info_div.AddControl(main);
    popup_update_info_div.AddControl(footer);

    return popup_update_info_div;
};
function get_pp_update_info_header() {
    let ppui_header_container = document.createElement("div");
    ppui_header_container.classList.add("ppui_header_container");

    let ppui_h_title = document.createElement("div");
    ppui_h_title.classList.add("ppui_h_title");
    ppui_h_title.innerHTML = `編輯單據`;

    let ppui_h_close_btn = document.createElement("img");
    ppui_h_close_btn.classList.add("ppui_h_close_btn");
    ppui_h_close_btn.src = "../image/close.png";
    ppui_h_close_btn.addEventListener("click", () => {
        popup_update_info_div_close();
    });

    ppui_header_container.appendChild(ppui_h_title);
    ppui_header_container.appendChild(ppui_h_close_btn);

    return ppui_header_container;
}
function get_pp_update_info_main() {
    let ppui_main_container = document.createElement("div");
    ppui_main_container.classList.add("ppui_main_container");

    let ppui_img_container = document.createElement("div");
    ppui_img_container.classList.add("ppui_img_container");

    let ppui_img = document.createElement("img");
    ppui_img.classList.add("ppui_img");

    let ppui_img_zoom_container = document.createElement("div");
    ppui_img_zoom_container.classList.add("ppui_img_zoom_container");

    let ppui_img_zoom_in = document.createElement("div");
    ppui_img_zoom_in.classList.add("ppui_img_zoom_in");
    ppui_img_zoom_in.innerHTML = `<img class="ppui_img_zoom_in_pic" src="../image/plus.png" alt="zoom in">`;

    let ppui_img_zoom_out = document.createElement("div");
    ppui_img_zoom_out.classList.add("ppui_img_zoom_out");
    ppui_img_zoom_out.innerHTML = `<img class="ppui_img_zoom_out_pic" src="../image/minimize-sign.png" alt="zoom out">`;

    ppui_img_zoom_container.appendChild(ppui_img_zoom_in);
    ppui_img_zoom_container.appendChild(ppui_img_zoom_out);

    ppui_img_container.appendChild(ppui_img);
    ppui_img_container.appendChild(ppui_img_zoom_container);

    let ppui_content_container = document.createElement("div");
    ppui_content_container.classList.add("ppui_content_container");

    ppui_label_data.forEach(element => {
        let ppui_text_container = document.createElement("div");
        ppui_text_container.classList.add("ppui_text_container");

        if(element.type == "text") {
            let ppui_text = document.createElement("div");
            ppui_text.classList.add("ppui_text");
            ppui_text.classList.add(`ppui_${element.value}`);

            ppui_text_container.appendChild(ppui_text);
            ppui_content_container.appendChild(ppui_text_container);
        } else if(element.type == "input") {
            let ppui_label = document.createElement("label");
            ppui_label.classList.add("ppui_label");
            ppui_label.innerHTML = element.name;
            ppui_label.setAttribute("for", `ppui_${element.value}_input`);

            let ppui_input = document.createElement("input");
            ppui_input.classList.add("ppui_input");
            ppui_input.classList.add(`ppui_${element.value}_input`);
            ppui_input.type = "text";
            ppui_input.id = `ppui_${element.value}_input`;

            ppui_text_container.appendChild(ppui_label);
            ppui_text_container.appendChild(ppui_input);

            ppui_content_container.appendChild(ppui_text_container);
        } else if(element.type == "date") {
            let ppui_label = document.createElement("label");
            ppui_label.classList.add("ppui_label");
            ppui_label.innerHTML = element.name;
            ppui_label.setAttribute("for", `ppui_${element.value}_input`);

            let ppui_input = document.createElement("input");
            ppui_input.classList.add("ppui_input");
            ppui_input.classList.add(`ppui_${element.value}_input`);
            ppui_input.type = "date";
            ppui_input.id = `ppui_${element.value}_input`;

            ppui_text_container.appendChild(ppui_label);
            ppui_text_container.appendChild(ppui_input);

            ppui_content_container.appendChild(ppui_text_container);
        } else {
            let ppui_po_num_container = document.createElement("div");
            ppui_po_num_container.classList.add("ppui_po_num_container");
        
            let ppui_po_num_div = document.createElement("div");
            ppui_po_num_div.classList.add("ppui_po_num_div");
            ppui_po_num_div.innerHTML = "";
        
            let ppui_po_num_div_update_btn = document.createElement("div");
            ppui_po_num_div_update_btn.classList.add("ppui_po_num_div_update_btn");
            ppui_po_num_div_update_btn.classList.add("btn");
            ppui_po_num_div_update_btn.innerHTML = "變更";
            ppui_po_num_div_update_btn.setAttribute("updateable", false);
            ppui_po_num_div_update_btn.addEventListener("click", async () => {
                // 這邊開啟編輯單號更新功能
                Set_main_div_enable(true);
                let ppui_f_btn = document.querySelector(".ppui_f_btn");
                let GUID = ppui_f_btn.getAttribute("guid");
                await set_popup_input_po_num(GUID);
        
                Set_main_div_enable(false);
            });

            ppui_po_num_container.appendChild(ppui_po_num_div);
            ppui_po_num_container.appendChild(ppui_po_num_div_update_btn);
        
            ppui_content_container.appendChild(ppui_po_num_container);
        }
    });

    ppui_main_container.appendChild(ppui_img_container);
    ppui_main_container.appendChild(ppui_content_container);

    return ppui_main_container;
}
function get_pp_update_info_footer() {
    let ppui_footer_container = document.createElement("div");
    ppui_footer_container.classList.add("ppui_footer_container");

    let ppui_f_btn = document.createElement("div");
    ppui_f_btn.classList.add("ppui_f_btn");
    ppui_f_btn.classList.add("btn");
    ppui_f_btn.setAttribute("guid", "");
    ppui_f_btn.innerHTML = "更新";
    ppui_f_btn.addEventListener("click", async () => {
        Set_main_div_enable(true);
        let ppui_po_num_div = document.querySelector(".ppui_po_num_div");
        let ppui_batch_num = document.querySelector(".ppui_batch_num_input");
        let ppui_expirydate = document.querySelector(".ppui_expirydate_input");
        let ppui_qty = document.querySelector(".ppui_qty_input");


        let GUID = ppui_f_btn.getAttribute("guid");
        let BATCH_NUM = ppui_batch_num.value;
        let QTY = ppui_qty.value;
        let expirydate = ppui_expirydate.value;
        let formattedDate = expirydate.replace(/-/g, "/");
        let DATE_TIME = formattedDate + " 00:00:00";

        let card_container = document.querySelector(`.card_container[guid="${GUID}"]`);

        let post_data = {
            Data: {
                GUID: GUID,
                qty: QTY,
                batch_num: BATCH_NUM,
                expirydate: DATE_TIME,
            },
        };

        let return_data = await update_po_by_GUID(post_data);
        console.log("回饋資料", return_data);

        if(return_data.Code == -200) {
            alert("伺服器錯誤，請稍後再試", return_data.Result);
            Set_main_div_enable(false);
            return;
        }
        if(return_data.Data[0].Code_status == -5 || return_data.Data[0].Code_status == -4 || return_data.Data[0].Code_status == -2 || return_data.Data[0].Code_status == -1) {
            alert(`${return_data.Data[0].Result}`);
            Set_main_div_enable(false);
            return;
        } else {
            console.log("以單號更新", return_data);
            orgin_list_data = change_object_by_GUID(orgin_list_data, return_data);
        
            if(return_data.Data[0].Code_status == 200) {
                update_card(card_container, return_data.Data[0]);
                // trigger_popup_input_po_num(false);
                popup_update_info_div_close();
                await set_update_info(return_data.Data[0]);
                alert("更新完成");
            }
            Set_main_div_enable(false);
            return;
        }

    });

    ppui_footer_container.appendChild(ppui_f_btn);

    return ppui_footer_container;
}
function popup_update_info_div_close() {
    popup_update_info_div.Set_Visible(false);
}
async function popup_update_info_div_open(guid) {
    let post_data = {
        ValueAry:[guid]
    }
    let return_data = await get_by_GUID(post_data);
    console.log("照片資料", return_data);

    await set_update_info(return_data.Data[0]);
    popup_update_info_div.Set_Visible(true);
}

async function set_update_info(element) {
    let ppui_img = document.querySelector(".ppui_img");
    let ppui_f_btn = document.querySelector(".ppui_f_btn");
    let ppui_po_num_div = document.querySelector(".ppui_po_num_div");
    let ppui_name = document.querySelector(".ppui_name");
    let ppui_cht_name = document.querySelector(".ppui_cht_name");
    let ppui_batch_num = document.querySelector(".ppui_batch_num_input");
    let ppui_expirydate = document.querySelector(".ppui_expirydate_input");
    let ppui_qty = document.querySelector(".ppui_qty_input");

    const img = new Image();
    img.src = element.base64;

    img.onload = () => {
        const degree = parseInt(element.degree, 10) || 0; // 取得旋轉角度並轉為數字
        const radians = (degree * Math.PI) / 180; // 角度轉換為弧度

        // 創建 canvas 並設置大小
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 根據旋轉角度設定 canvas 寬高
        if (degree === 90 || degree === 270) {
            canvas.width = img.height;
            canvas.height = img.width;
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }

        // 旋轉畫布
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(radians);
        
        // 設定正確的繪製偏移量
        if (degree === 90) {
            ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        } else if (degree === 180) {
            ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        } else if (degree === 270) {
            ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        } else {
            ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        }

        // 轉為 Base64
        const rotatedBase64 = canvas.toDataURL();

        // 將旋轉後的 Base64 圖片放入 img 元素
        ppui_img.src = rotatedBase64;
    };
    
    ppui_f_btn.setAttribute("guid", element.GUID);

    let expirydate = element.expirydate;
    let formattedDate = expirydate.split(" ")[0].replace(/\//g, "-");

    // ppui_img.src = element.base64;
    ppui_po_num_div.innerHTML = element.po_num;
    ppui_name.innerHTML = element.name;
    ppui_cht_name.innerHTML = element.cht_name;
    ppui_batch_num.value = element.batch_num;
    ppui_expirydate.value = formattedDate;
    ppui_qty.value = element.qty;
}
function initializeImageZoom_ppui() {
    let container_ppui = document.querySelector('.ppui_img_container');
    let img_ppui = container_ppui.querySelector('.ppui_img');
    let zoomInBtn_ppui = container_ppui.querySelector('.ppui_img_zoom_in');
    let zoomOutBtn_ppui = container_ppui.querySelector('.ppui_img_zoom_out');

    let scaleLevels = [1, 1.75, 2.5, 3.5]; // 可能的縮放比例
    let currentScaleIndex = 0; // 預設大小
    let scale = scaleLevels[currentScaleIndex];

    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;

    // 限制圖片邊界
    function limitBounds() {
        const maxOffsetX = (scale - 1) * container_ppui.clientWidth / 2;
        const maxOffsetY = (scale - 1) * container_ppui.clientHeight / 2;
        translateX = Math.min(Math.max(translateX, -maxOffsetX), maxOffsetX);
        translateY = Math.min(Math.max(translateY, -maxOffsetY), maxOffsetY);
    }

    // 更新圖片縮放與位置
    function updateTransform() {
        img_ppui.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
    }

    // 放大
    zoomInBtn_ppui.addEventListener('click', () => {
        if (currentScaleIndex < scaleLevels.length - 1) {
            currentScaleIndex++;
            scale = scaleLevels[currentScaleIndex];
            translateX = 0;
            translateY = 0;
            updateTransform();
        }
    });

    // 縮小
    zoomOutBtn_ppui.addEventListener('click', () => {
        if (currentScaleIndex > 0) {
            currentScaleIndex--;
            scale = scaleLevels[currentScaleIndex];
            translateX = 0;
            translateY = 0;
            updateTransform();
        }
    });

    // **電腦滑鼠拖曳**
    container_ppui.addEventListener('mousedown', (e) => {
        if (currentScaleIndex === 0) return; // 預設大小不允許拖曳
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img_ppui.style.cursor = "grabbing";
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        limitBounds();
        updateTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        img_ppui.style.cursor = "grab";
    });

    // **手機觸控拖曳**
    container_ppui.addEventListener('touchstart', (e) => {
        if (currentScaleIndex === 0) return;
        isDragging = true;
        let touch = e.touches[0];
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
    });

    container_ppui.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        let touch = e.touches[0];
        translateX = touch.clientX - startX;
        translateY = touch.clientY - startY;
        limitBounds();
        updateTransform();
    });

    container_ppui.addEventListener('touchend', () => {
        isDragging = false;
    });

    // 初始化
    updateTransform();
}
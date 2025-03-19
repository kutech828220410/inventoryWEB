function trigger_popup_input_po_num(boolean) {
    let popup_input_po_num_div = document.querySelector(".popup_input_po_num_div");
    let body = document.querySelector("body");

    if(boolean) {
        popup_input_po_num_div.style.display = "block";
        popup_input_po_num_div.style.visibility = "visible";

        body.style.overflowY = "hidden";
    } else {
        popup_input_po_num_div.style.display = "none";
        popup_input_po_num_div.style.visibility = "hidden";

        body.style.overflowY = "auto";
        init_popup_input_po_num();
    }
}

async function set_popup_input_po_num(guid) {
    let ppipn_f_revise_btn = document.querySelector(".ppipn_f_revise_btn");
    ppipn_f_revise_btn.setAttribute("guid", guid);
    let post_data = {
        ValueAry:[guid]
    }
    let return_data = await get_by_GUID(post_data);
    console.log(return_data);
    temp_object_aa = return_data.Data[0];
    let ppipn_main_img = document.querySelector(".ppipn_main_img");
    if(return_data.Code == 200) {
         // // 創建一個 Image 對象
        // const img = new Image();
        // img.src = return_data.Data[0].base64;

        // img.onload = () => {
        //     // 創建 canvas 並設置大小
        //     const canvas = document.createElement("canvas");
        //     const ctx = canvas.getContext("2d");

        //     // 設置 canvas 的寬高為旋轉後的尺寸
        //     canvas.width = img.height;
        //     canvas.height = img.width;

        //     // 旋轉畫布
        //     ctx.translate(canvas.width / 2, canvas.height / 2);
        //     ctx.rotate(-Math.PI / 2); // 逆時針旋轉90度
        //     ctx.drawImage(img, -img.width / 2, -img.height / 2);

        //     // 將旋轉後的圖像轉為 Base64
        //     const rotatedBase64 = canvas.toDataURL();

        //     // 將旋轉後的 Base64 圖片放入 img 元素
        //     let ppipn_main_img = document.querySelector(".ppipn_main_img");
        //     ppipn_main_img.src = rotatedBase64;
        //     trigger_popup_input_po_num(true);
        //     Set_main_div_enable(false);
        // };
        // 創建一個 Image 對象
        const img = new Image();
        img.src = return_data.Data[0].base64;
    
        img.onload = () => {
            const degree = parseInt(return_data.Data[0].degree, 10) || 0; // 取得旋轉角度並轉為數字
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
    
            // 掛載到 img 元素
            let ppipn_main_img = document.querySelector(".ppipn_main_img");
            if (ppipn_main_img) {
                console.log("轉轉轉轉轉====================================");
                ppipn_main_img.src = rotatedBase64;
                trigger_popup_input_po_num(true);
                Set_main_div_enable(false);
            } else {
                trigger_popup_input_po_num(true);
                Set_main_div_enable(false);
            }
        };
    } else {
        alert("讀取圖片失敗");
        trigger_popup_input_po_num(true);
        Set_main_div_enable(false);
    }

}

function init_popup_input_po_num() {
    let ppipn_main_img = document.querySelector(".ppipn_main_img");
    let ppipn_main_input = document.querySelector(".ppipn_main_input");
 
    ppipn_main_img.src = "";
    ppipn_main_input.value = "";
}

async function update_by_GUID_po_num() {
    Set_main_div_enable(true);
    let ppipn_main_input = document.querySelector(".ppipn_main_input");
    let ppipn_f_revise_btn = document.querySelector(".ppipn_f_revise_btn");
    if(ppipn_main_input.value == "") {
        Set_main_div_enable(false); 
        return;
    }

    let guid = ppipn_f_revise_btn.getAttribute("guid");
    let input_value = ppipn_main_input.value;
    let card_container = document.querySelector(`.card_container[guid="${guid}"]`);

    let post_data =  {
        ValueAry: [
            guid,
            input_value
        ]
    };
    
    let return_data = await update_by_GUID_poNum(post_data);
    console.log(return_data);
    if(return_data.Data[0].Code_status == -5 || return_data.Data[0].Code_status == -4 || return_data.Data[0].Code_status == -2 || return_data.Data[0].Code_status == -1) {
        alert(`${return_data.Data[0].Result}`);
        Set_main_div_enable(false);
        return;
    } else {
        console.log("以單號更新", return_data);
        orgin_list_data = change_object_by_GUID(orgin_list_data, return_data);
    
        if(return_data.Data[0].Code_status == 200) {
            update_card(card_container, return_data.Data[0]);
            trigger_popup_input_po_num(false);
            await set_update_info(return_data.Data[0]);
            alert("更新完成");
        }
        Set_main_div_enable(false);
        return;
    }
}
function initializeImageZoom() {
    const container = document.querySelector('.ppipn_img_container');
    const img = container.querySelector('.ppipn_main_img');
    const zoomInBtn = container.querySelector('.ppipn_img_zoom_in');
    const zoomOutBtn = container.querySelector('.ppipn_img_zoom_out');

    let scaleLevels = [1, 1.75, 2.5, 3.5]; // 可能的縮放比例
    let currentScaleIndex = 0; // 預設大小
    let scale = scaleLevels[currentScaleIndex];

    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;

    // 限制圖片邊界
    function limitBounds() {
        const maxOffsetX = (scale - 1) * container.clientWidth / 2;
        const maxOffsetY = (scale - 1) * container.clientHeight / 2;
        translateX = Math.min(Math.max(translateX, -maxOffsetX), maxOffsetX);
        translateY = Math.min(Math.max(translateY, -maxOffsetY), maxOffsetY);
    }

    // 更新圖片縮放與位置
    function updateTransform() {
        img.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
    }

    // 放大
    zoomInBtn.addEventListener('click', () => {
        if (currentScaleIndex < scaleLevels.length - 1) {
            currentScaleIndex++;
            scale = scaleLevels[currentScaleIndex];
            translateX = 0;
            translateY = 0;
            updateTransform();
        }
    });

    // 縮小
    zoomOutBtn.addEventListener('click', () => {
        if (currentScaleIndex > 0) {
            currentScaleIndex--;
            scale = scaleLevels[currentScaleIndex];
            translateX = 0;
            translateY = 0;
            updateTransform();
        }
    });

    // **電腦滑鼠拖曳**
    container.addEventListener('mousedown', (e) => {
        if (currentScaleIndex === 0) return; // 預設大小不允許拖曳
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = "grabbing";
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
        img.style.cursor = "grab";
    });

    // **手機觸控拖曳**
    container.addEventListener('touchstart', (e) => {
        if (currentScaleIndex === 0) return;
        isDragging = true;
        let touch = e.touches[0];
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        let touch = e.touches[0];
        translateX = touch.clientX - startX;
        translateY = touch.clientY - startY;
        limitBounds();
        updateTransform();
    });

    container.addEventListener('touchend', () => {
        isDragging = false;
    });

    // 初始化
    updateTransform();
}
